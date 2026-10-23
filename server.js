import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as XLSX from 'xlsx';
import { 
  formatLeadForHuman, 
  formatLeadForCompliance 
} from './src/utils/leadStorage.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5174;
const isDev = process.argv.includes('--dev') || process.env.NODE_ENV === 'development';

// Middleware for parsing JSON & URL-encoded request bodies
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Persistent server-side leads database (saved to real disk file)
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadLeadsFromDisk() {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Node.js Server] Error reading leads from disk:', err.message);
  }
  saveLeadsToDisk([]);
  return [];
}

function saveLeadsToDisk(leads) {
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Node.js Server] Error writing leads to disk:', err.message);
  }
}

let activeLeads = loadLeadsFromDisk();

// -------------------------------------------------------------
// REST API Endpoints (Pure Node.js Backend)
// -------------------------------------------------------------

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    engine: 'Node.js Express Server',
    leadsCount: activeLeads.length,
    uptime: `${Math.round(process.uptime())}s`,
    timestamp: new Date().toISOString()
  });
});

// 2. Fetch all leads
app.get('/api/leads', (req, res) => {
  res.json(activeLeads);
});

// 3. Save single lead
app.post('/api/leads', (req, res) => {
  const newLead = req.body;
  if (!newLead || !newLead.caseReferenceNumber) {
    return res.status(400).json({ error: 'Valid lead with caseReferenceNumber required' });
  }
  activeLeads = [newLead, ...activeLeads.filter(l => l.caseReferenceNumber !== newLead.caseReferenceNumber)];
  saveLeadsToDisk(activeLeads);
  res.json({ success: true, count: activeLeads.length, lead: newLead });
});

// 4. Synchronize multiple leads from client localStorage
app.post('/api/sync-leads', (req, res) => {
  const incoming = req.body;
  if (Array.isArray(incoming) && incoming.length > 0) {
    activeLeads = incoming;
    saveLeadsToDisk(activeLeads);
  }
  res.json({ success: true, count: activeLeads.length });
});

// 5. Delete lead by case reference number
app.delete('/api/leads/:docket', (req, res) => {
  const { docket } = req.params;
  activeLeads = activeLeads.filter(l => l.caseReferenceNumber !== docket);
  saveLeadsToDisk(activeLeads);
  res.json({ success: true, count: activeLeads.length });
});

// 6. Reset / clear leads
app.post('/api/reset-leads', (req, res) => {
  activeLeads = [];
  saveLeadsToDisk(activeLeads);
  res.json({ success: true, count: 0 });
});

// 7. Core Export Endpoint: Direct Node.js File Downloader with Content-Disposition
app.all('/api/export-leads', (req, res) => {
  const params = req.method === 'POST' ? req.body : req.query;
  const format = (params.format || 'excel').toLowerCase();
  const docket = params.docket;
  const category = params.category;
  const search = params.search;

  let leads = [...activeLeads];

  // Docket filter (individual claimant dossier)
  if (docket) {
    leads = leads.filter(l => l.caseReferenceNumber === docket);
  } else {
    // Category filter
    if (category && category !== 'all') {
      const filtered = leads.filter(l => l.claimType === category);
      if (filtered.length > 0) leads = filtered;
    }
    // Search filter
    if (search && search.trim()) {
      const s = search.trim().toLowerCase();
      const filtered = leads.filter(l =>
        (l.firstName && l.firstName.toLowerCase().includes(s)) ||
        (l.lastName && l.lastName.toLowerCase().includes(s)) ||
        (l.phone && l.phone.includes(s)) ||
        (l.email && l.email.toLowerCase().includes(s)) ||
        (l.caseReferenceNumber && l.caseReferenceNumber.toLowerCase().includes(s))
      );
      if (filtered.length > 0) leads = filtered;
    }
  }

  const today = new Date().toISOString().split('T')[0];
  const filePrefix = docket ? `${docket}_Legal_Dossier` : `MVA_Legal_Leads_${today}`;

  // If accessed directly in a browser without download=1, serve an interactive export & download hub
  const isHtmlRequest = req.headers.accept && req.headers.accept.includes('text/html') && params.download !== '1';
  if (isHtmlRequest) {
    const rowsData = leads.map(formatLeadForHuman);
    const schema = formatLeadForHuman({});
    const headers = Object.keys(schema);
    
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Export Leads (${leads.length}) | MVA Legal Intake</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&family=Merriweather:wght@700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0B132B; color: #F8FAFC; min-height: 100vh; padding: 32px 20px; }
    .container { max-width: 1400px; margin: 0 auto; }
    .header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #1E293B; }
    h1 { font-family: 'Merriweather', serif; font-size: 22px; color: #FFFFFF; }
    .subtitle { font-size: 13px; color: #94A3B8; margin-top: 4px; }
    .btn-group { display: flex; flex-wrap: wrap; gap: 10px; }
    .btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 18px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; cursor: pointer; border: none; transition: all 0.15s ease; }
    .btn-csv { background: #2563EB; color: white; }
    .btn-csv:hover { background: #1D4ED8; }
    .btn-excel { background: #059669; color: white; }
    .btn-excel:hover { background: #047857; }
    .btn-copy { background: #4F46E5; color: white; }
    .btn-copy:hover { background: #4338CA; }
    .btn-back { background: #1E293B; color: #CBD5E1; border: 1px solid #334155; }
    .btn-back:hover { background: #334155; color: white; }
    .alert { background: rgba(5, 150, 105, 0.15); border: 1px solid rgba(5, 150, 105, 0.4); color: #34D399; padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 20px; display: flex; align-items: center; justify-content: space-between; }
    .table-card { background: #111C38; border-radius: 12px; border: 1px solid #1E293B; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .table-wrap { overflow-x: auto; max-height: 70vh; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
    th { background: #070D1F; color: #94A3B8; font-weight: 700; text-transform: uppercase; font-size: 10px; letter-spacing: 0.5px; padding: 12px 14px; position: sticky; top: 0; z-index: 10; border-bottom: 1px solid #1E293B; white-space: nowrap; }
    td { padding: 12px 14px; border-bottom: 1px solid #1E293B; color: #E2E8F0; white-space: nowrap; }
    tr:hover td { background: rgba(255,255,255,0.03); }
    .mono { font-family: 'JetBrains Mono', monospace; font-size: 11px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1>⚖️ Legal Leads Export Center</h1>
        <p class="subtitle">Showing ${leads.length} recorded intake claimant dossier(s) with compliance certs.</p>
      </div>
      <div class="btn-group">
        <a href="/api/export-leads?format=csv&download=1${category ? '&category=' + encodeURIComponent(category) : ''}${search ? '&search=' + encodeURIComponent(search) : ''}" class="btn btn-csv" download="${filePrefix}.csv">⬇️ Download CSV (.csv)</a>
        <a href="/api/export-leads?format=excel&download=1${category ? '&category=' + encodeURIComponent(category) : ''}${search ? '&search=' + encodeURIComponent(search) : ''}" class="btn btn-excel" download="${filePrefix}.xlsx">📊 Download Excel (.xlsx)</a>
        <button onclick="copyToClipboard()" id="copyBtn" class="btn btn-copy">📋 Copy for Excel</button>
        <a href="/#admin" class="btn btn-back">🔒 Admin Vault</a>
      </div>
    </div>
    
    <div id="notice" class="alert">
      <span>✅ Export ready: <strong>${leads.length} leads loaded</strong>. Click any button above to download or copy directly into Excel.</span>
      <span style="font-size: 11px; color: #94A3B8;">Auto-download initiated</span>
    </div>

    <div class="table-card">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rowsData.map(r => `
              <tr>
                ${headers.map(h => `<td class="${h.includes('Docket') || h.includes('IP') || h.includes('Cert') ? 'mono' : ''}">${r[h] || '-'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    // Trigger download automatically
    window.addEventListener('load', () => {
      const a = document.createElement('a');
      a.href = '/api/export-leads?format=${format}&download=1${category ? '&category=' + encodeURIComponent(category) : ''}${search ? '&search=' + encodeURIComponent(search) : ''}';
      a.download = '${filePrefix}.${format === "excel" ? "xlsx" : "csv"}';
      a.style.position = 'fixed';
      a.style.left = '-9999px';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 2000);
    });

    function copyToClipboard() {
      const rows = ${JSON.stringify(rowsData)};
      const headers = ${JSON.stringify(headers)};
      const tsv = [headers.join('\\t'), ...rows.map(r => headers.map(h => String(r[h] || '').replace(/\\t/g, ' ')).join('\\t'))].join('\\r\\n');
      navigator.clipboard.writeText(tsv).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.innerText = '✅ Copied to Clipboard!';
        btn.style.background = '#059669';
        setTimeout(() => {
          btn.innerText = '📋 Copy for Excel';
          btn.style.background = '#4F46E5';
        }, 3000);
      });
    }
  </script>
</body>
</html>`;
    return res.send(html);
  }

  if (format === 'csv') {
    // -------------------------------------------------------------
    // Universal RFC 4180 CSV with UTF-8 BOM
    // -------------------------------------------------------------
    const rowsData = leads.map(formatLeadForHuman);
    const schema = formatLeadForHuman({});
    const headers = Object.keys(schema);

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      let str = String(val);
      // OWASP Formula Injection defense (CWE-1236)
      if (/^[=+\-@\t\r]/.test(str)) {
        str = "'" + str;
      }
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvRows = rowsData.map(row => headers.map(h => escapeCsv(row[h])).join(','));
    const csvContent = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...csvRows].join('\r\n');
    const filename = `${filePrefix}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.send(Buffer.from(csvContent, 'utf-8'));
  } else if (format === 'json') {
    // -------------------------------------------------------------
    // JSON Backup / Webhook Payload
    // -------------------------------------------------------------
    const filename = `${filePrefix}.json`;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache');
    return res.send(JSON.stringify(leads, null, 2));
  } else {
    // -------------------------------------------------------------
    // Native Microsoft Excel (.xlsx) Multi-Tab Workbook
    // -------------------------------------------------------------
    const wb = XLSX.utils.book_new();

    // Tab 1: Case Intake Records
    const wsHuman = leads.length > 0
      ? XLSX.utils.json_to_sheet(leads.map(formatLeadForHuman))
      : XLSX.utils.aoa_to_sheet([Object.keys(formatLeadForHuman({}))]);
    wsHuman['!cols'] = [
      { wch: 18 }, { wch: 22 }, { wch: 36 }, { wch: 15 }, { wch: 15 },
      { wch: 16 }, { wch: 26 }, { wch: 25 }, { wch: 16 }, { wch: 14 },
      { wch: 10 }, { wch: 24 }, { wch: 24 }, { wch: 40 }, { wch: 22 },
      { wch: 30 }, { wch: 16 }, { wch: 65 }, { wch: 65 }, { wch: 20 },
      { wch: 22 }, { wch: 16 }, { wch: 16 }, { wch: 15 }, { wch: 20 }
    ];
    XLSX.utils.book_append_sheet(wb, wsHuman, 'Case Intake Records');

    // Tab 2: TCPA & Compliance Audit
    const wsComp = leads.length > 0
      ? XLSX.utils.json_to_sheet(leads.map(formatLeadForCompliance))
      : XLSX.utils.aoa_to_sheet([Object.keys(formatLeadForCompliance({}))]);
    wsComp['!cols'] = [
      { wch: 20 }, { wch: 65 }, { wch: 65 }, { wch: 18 }, { wch: 24 },
      { wch: 22 }, { wch: 16 }, { wch: 26 }, { wch: 28 }, { wch: 70 },
      { wch: 18 }, { wch: 18 }, { wch: 45 }, { wch: 25 }, { wch: 16 }, { wch: 20 }
    ];
    XLSX.utils.book_append_sheet(wb, wsComp, 'TCPA & Compliance Audit');

    const excelBuf = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    const filename = `${filePrefix}.xlsx`;

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.send(excelBuf);
  }
});

// -------------------------------------------------------------
// Frontend Integration (Development Vite Middleware OR Production Static Serving)
// -------------------------------------------------------------
async function setupFrontend() {
  if (isDev) {
    console.log('[Node.js Server] Attaching development compiler with HMR...');
    const { createServer: createViteServer } = await import('vite');
    const react = (await import('@vitejs/plugin-react')).default;
    const tailwindcss = (await import('@tailwindcss/vite')).default;
    const vite = await createViteServer({
      plugins: [react(), tailwindcss()],
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      console.log('[Node.js Server] Serving production build from /dist...');
      app.use(express.static(distPath));
      app.use((req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    } else {
      console.warn('[Node.js Server] Warning: /dist not found. Please run "npm run build".');
      app.use((req, res) => {
        res.send('<h1>Node.js Server Active</h1><p>Frontend bundle not found. Please run: <code>npm run build</code></p>');
      });
    }
  }

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`=======================================================`);
    console.log(`🚀 Node.js Express Server running at http://127.0.0.1:${PORT}`);
    console.log(`📁 Leads database location: ${LEADS_FILE}`);
    console.log(`📥 Direct Excel download: http://127.0.0.1:${PORT}/api/export-leads?format=excel`);
    console.log(`📥 Direct CSV download:   http://127.0.0.1:${PORT}/api/export-leads?format=csv`);
    console.log(`=======================================================`);
  });
}

setupFrontend().catch(err => {
  console.error('[Node.js Server] Failed to start server:', err);
});
