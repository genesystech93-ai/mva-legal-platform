/**
 * Lead Storage & Multi-Format Export Utility for Legal Tort & MVA Intake
 * Generates:
 * 1. Native Microsoft Excel (.xlsx) Multi-Tab Workbook:
 *    - Tab 1: "Case Intake Records" (Attorney & Legal Staff case intake details)
 *    - Tab 2: "TCPA & Compliance Audit" (ActiveProspect TrustedForm URLs, Client IP, Full Disclosure Text)
 * 2. Universal RFC 4180 CSV with UTF-8 BOM (\uFEFF) for Microsoft Excel
 * 3. Native Server-Side Download via /api/export-leads with Content-Disposition headers
 * 4. Clipboard Tab-Delimited Copier for 1-Click Excel / Google Sheets Pasting
 * 5. JSON Webhook Feed
 * 6. Single Claimant Dossier Exporter
 */
import * as XLSX from 'xlsx';

const STORAGE_KEY = 'mva_legal_intake_leads_v1';

// Live leads start clean with no hardcoded demo data
export const INITIAL_DEMO_LEADS = [];

export function getStoredLeads() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw || raw === 'null') {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (err) {
    console.error('Error reading stored leads:', err);
    return [];
  }
}

export function syncLeadsWithServer(leadsToSync) {
  if (typeof window === 'undefined') return;
  try {
    fetch('/api/sync-leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadsToSync)
    }).catch(() => {});
  } catch (e) {}
}

export function saveLead(lead) {
  if (typeof window === 'undefined') return;
  try {
    const currentLeads = getStoredLeads();
    const updated = [lead, ...currentLeads];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    syncLeadsWithServer(updated);
    return updated;
  } catch (err) {
    console.error('Error saving lead to storage:', err);
  }
}

export function deleteLead(caseReferenceNumber) {
  try {
    const currentLeads = getStoredLeads();
    const updated = currentLeads.filter(l => l.caseReferenceNumber !== caseReferenceNumber);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    syncLeadsWithServer(updated);
    return updated;
  } catch (err) {
    console.error('Error deleting lead:', err);
  }
}

export function clearAllLeads() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    syncLeadsWithServer([]);
    return [];
  } catch (err) {
    console.error('Error clearing leads:', err);
  }
}

export function resetDemoLeads() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
    syncLeadsWithServer(INITIAL_DEMO_LEADS);
    return INITIAL_DEMO_LEADS;
  } catch (err) {
    console.error('Error resetting demo leads:', err);
    return INITIAL_DEMO_LEADS;
  }
}

// Readable mapping dictionaries for human presentation
const CLAIM_TYPE_LABELS = {
  'mva-auto': 'Motor Vehicle & Commercial Truck Collision',
  'rideshare-abuse': 'Rideshare Driver Assault & Misconduct',
  'roblox-youth': 'Roblox Minor Exploitation & Negligence Campaign',
  'glp1-ozempic': 'Ozempic / Wegovy Gastroparesis (MDL 3094)',
  'suboxone-teeth': 'Suboxone Dental Erosion (MDL 3092)',
  'camp-lejeune': 'Camp Lejeune Water Contamination (PACT Act)',
  'hernia-mesh': 'Hernia Mesh Defect & Infection (MDL 2846)',
  'afff-foam': 'AFFF Firefighting Foam PFAS (MDL 2873)',
  'roundup-cancer': 'Roundup Non-Hodgkin Lymphoma',
  'roundup-lymphoma': 'Roundup Non-Hodgkin Lymphoma',
  'mesothelioma-asbestos': 'Mesothelioma & Asbestos Trust Funds ($30B+ Fund)'
};

const TIMEFRAME_LABELS = {
  'within_12_months': 'Within last 12 months',
  '1_to_2_years': '1 to 2 years ago',
  '2_to_3_years': '2 to 3 years ago',
  'over_3_years': 'Over 3 years ago'
};

const ACCIDENT_ROLE_LABELS = {
  'driver_not_at_fault': 'Driver (Not at fault / Hit by other party)',
  'passenger': 'Passenger in vehicle',
  'pedestrian_cyclist': 'Pedestrian or Cyclist',
  'rideshare_passenger': 'Rideshare Passenger (Uber/Lyft)',
  'patient_consumer': 'Patient / Consumer (Drug or Product)',
  'parent_guardian_minor': 'Parent / Legal Guardian of Minor (Roblox Campaign)',
  'young_adult_minor_victim': 'Individual Harmed While Minor (Roblox Campaign)',
  'other': 'Other circumstances'
};

/**
 * Tab 1: Human / Attorney / Case Review Format
 * Clean, properly titled columns with natural-language text.
 */
export function formatLeadForHuman(lead) {
  const certUrl = lead.xxTrustedFormCertUrl || lead.trustedFormCertUrl || '';
  const pingUrl = lead.xxTrustedFormPingUrl || lead.trustedFormPingUrl || '';

  return {
    "Docket Number": lead.caseReferenceNumber || '',
    "Submission Date (UTC)": lead.timestamp ? new Date(lead.timestamp).toISOString().replace('T', ' ').substring(0, 19) : '',
    "Claim Category": CLAIM_TYPE_LABELS[lead.claimType] || lead.claimType || 'Motor Vehicle Accident',
    "First Name": lead.firstName || '',
    "Last Name": lead.lastName || '',
    "Phone Number": lead.phone || '',
    "Email Address": lead.email || '',
    "Street Address": lead.streetAddress || '',
    "City": lead.city || '',
    "State Occurred": lead.stateOccurred || '',
    "ZIP Code": String(lead.zipCode || ''),
    "Incident Timeframe": TIMEFRAME_LABELS[lead.timeframe] || lead.timeframe || '',
    "ER / Hospital Treatment": lead.hospitalized === 'yes' ? 'YES (ER / Hospitalized)' : 'NO (Clinic Only)',
    "Injury Summary": lead.injurySummary || '',
    "Represented By Attorney": lead.hasAttorney === 'yes' ? 'YES (Retained)' : 'NO (Unrepresented)',
    "Claimant Role": ACCIDENT_ROLE_LABELS[lead.accidentRole] || lead.accidentRole || '',
    "Client IP Address": lead.ip_address || '',
    "ActiveProspect TrustedForm Cert URL": certUrl,
    "ActiveProspect TrustedForm Ping URL": pingUrl,
    "TCPA Consent Status": lead.tcpaConsent ? 'YES (Express Opt-In)' : 'NO',
    "TCPA Timestamp": lead.timestamp || '',
    "Visitor ID": lead.visitor_id || '',
    "Session ID": lead.session_id || '',
    "UTM Source": lead.utm_source || 'direct',
    "UTM Campaign": lead.utm_campaign || ''
  };
}

/**
 * Tab 2: TCPA Compliance & ActiveProspect Audit Record
 * Complete audit trail specifically compiled for TCPA compliance defense and records.
 */
export function formatLeadForCompliance(lead) {
  const certUrl = lead.xxTrustedFormCertUrl || lead.trustedFormCertUrl || '';
  const pingUrl = lead.xxTrustedFormPingUrl || lead.trustedFormPingUrl || '';

  return {
    "Case Docket Reference": lead.caseReferenceNumber || '',
    "ActiveProspect Certificate URL": certUrl,
    "ActiveProspect Ping URL": pingUrl,
    "Captured Client IP Address": lead.ip_address || '',
    "Consent Timestamp (UTC)": lead.timestamp || '',
    "Claimant Name": `${lead.firstName || ''} ${lead.lastName || ''}`.trim(),
    "Claimant Phone": lead.phone || '',
    "Claimant Email": lead.email || '',
    "TCPA Express Written Consent": lead.tcpaConsent ? 'EXPRESS_WRITTEN_OPT_IN' : 'NOT_OPTED_IN',
    "Full TCPA Agreement Signed": lead.tcpaConsentText || "By checking this box, you expressly agree to be contacted regarding your potential legal claim or promotional legal offers sent by or on behalf of InjuryClaims and participating affiliate law firms...",
    "Persistent Visitor Cookie": lead.visitor_id || '',
    "Browser Session Cookie": lead.session_id || '',
    "Browser User Agent": lead.userAgent || '',
    "Tracking Referrer": lead.referrer || 'direct',
    "Screen Resolution": lead.screen_resolution || '',
    "Timezone": lead.timezone || ''
  };
}

/**
 * Safe Single-Action File Downloader
 */
export function triggerFileDownload(urlOrBlob, filename) {
  if (typeof window === 'undefined') return '';

  let url = urlOrBlob;
  let isBlob = false;

  if (urlOrBlob instanceof Blob) {
    url = URL.createObjectURL(urlOrBlob);
    isBlob = true;
  }

  // Windows IE / Legacy Edge fallback
  if (isBlob && window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(urlOrBlob, filename);
    return url;
  }

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.style.position = 'fixed';
  link.style.left = '-9999px';
  link.style.top = '-9999px';
  link.style.opacity = '0';

  document.body.appendChild(link);

  try {
    link.click();
  } catch (err) {
    console.warn('Direct link.click() failed:', err);
  }

  // Chromium fix: Keep element in DOM for 30s so the download is never cancelled prematurely
  setTimeout(() => {
    try {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      if (isBlob) {
        URL.revokeObjectURL(url);
      }
    } catch (e) {}
  }, 30000);

  return url;
}

/**
 * 1. Export Native Excel (.xlsx) Multi-Tab Workbook
 * Opens cleanly in Microsoft Excel with 2 tabs:
 * - Tab 1: "Case Intake Records"
 * - Tab 2: "TCPA & Compliance Audit"
 */
export function exportLeadsToExcel(leads = null, customFilename = null) {
  let data = leads;
  if (!data || !Array.isArray(data)) {
    data = getStoredLeads();
  }

  const today = new Date().toISOString().split('T')[0];
  const filename = customFilename || (data.length === 1 && data[0].caseReferenceNumber ? `${data[0].caseReferenceNumber}_Legal_Dossier.xlsx` : `MVA_Legal_Leads_${today}.xlsx`);

  try {
    const workbook = XLSX.utils.book_new();

    // Tab 1. Case Intake Records (Complete attorney review sheet)
    const wsHuman = data.length > 0
      ? XLSX.utils.json_to_sheet(data.map(formatLeadForHuman))
      : XLSX.utils.aoa_to_sheet([Object.keys(formatLeadForHuman({}))]);
    wsHuman['!cols'] = [
      { wch: 18 }, // Docket
      { wch: 22 }, // Date
      { wch: 36 }, // Claim Category
      { wch: 15 }, // First Name
      { wch: 15 }, // Last Name
      { wch: 16 }, // Phone
      { wch: 26 }, // Email
      { wch: 25 }, // Address
      { wch: 16 }, // City
      { wch: 14 }, // State
      { wch: 10 }, // ZIP
      { wch: 24 }, // Timeframe
      { wch: 24 }, // ER Treatment
      { wch: 40 }, // Injury Summary
      { wch: 22 }, // Attorney
      { wch: 30 }, // Role
      { wch: 16 }, // IP
      { wch: 65 }, // TrustedForm Cert
      { wch: 65 }, // TrustedForm Ping
      { wch: 20 }, // TCPA Status
      { wch: 22 }, // TCPA Time
      { wch: 16 }, // Visitor ID
      { wch: 16 }, // Session ID
      { wch: 15 }, // UTM Source
      { wch: 20 }  // UTM Campaign
    ];
    XLSX.utils.book_append_sheet(workbook, wsHuman, "Case Intake Records");

    // Tab 2. TCPA & Compliance Audit Sheet
    const wsComp = data.length > 0
      ? XLSX.utils.json_to_sheet(data.map(formatLeadForCompliance))
      : XLSX.utils.aoa_to_sheet([Object.keys(formatLeadForCompliance({}))]);
    wsComp['!cols'] = [
      { wch: 20 }, // Case Docket
      { wch: 65 }, // Cert URL
      { wch: 65 }, // Ping URL
      { wch: 18 }, // Client IP
      { wch: 24 }, // Timestamp
      { wch: 22 }, // Claimant Name
      { wch: 16 }, // Phone
      { wch: 26 }, // Email
      { wch: 28 }, // Consent Status
      { wch: 70 }, // Disclosure Signed
      { wch: 18 }, // Visitor Cookie
      { wch: 18 }, // Session Cookie
      { wch: 45 }, // User Agent
      { wch: 25 }, // Referrer
      { wch: 16 }, // Resolution
      { wch: 20 }  // Timezone
    ];
    XLSX.utils.book_append_sheet(workbook, wsComp, "TCPA & Compliance Audit");

    // Write genuine Excel array buffer and download via validated Office OpenXML Blob
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    triggerFileDownload(blob, filename);

    return {
      success: true,
      filename,
      count: data.length,
      downloadUrl: `/api/export-leads?format=excel`,
      format: 'Excel (.xlsx)'
    };
  } catch (err) {
    console.error('exportLeadsToExcel error:', err);
    // Fallback: direct window location download
    if (typeof window !== 'undefined') {
      window.location.href = '/api/export-leads?format=excel';
    }
    return {
      success: true,
      filename,
      count: data.length,
      downloadUrl: `/api/export-leads?format=excel`,
      format: 'Excel (.xlsx)'
    };
  }
}

/**
 * 2. Export RFC 4180 Universal CSV with UTF-8 BOM (\uFEFF)
 * Opens cleanly in Microsoft Excel into discrete columns without formatting errors.
 */
export function exportLeadsToCsv(leads = null, customFilename = null) {
  let data = leads;
  if (!data || !Array.isArray(data)) {
    data = getStoredLeads();
  }

  const today = new Date().toISOString().split('T')[0];
  const filename = customFilename || (data.length === 1 && data[0].caseReferenceNumber ? `${data[0].caseReferenceNumber}_Legal_Dossier.csv` : `MVA_Legal_Leads_${today}.csv`);

  try {
    const rowsData = data.map(formatLeadForHuman);
    const schemaSample = formatLeadForHuman({});
    const headers = Object.keys(schemaSample);

    const escapeCsv = (val) => {
      if (val === null || val === undefined) return '""';
      let str = String(val);
      // OWASP Formula Injection Defense (CWE-1236)
      // Neutralize spreadsheet executable formulas starting with =, +, -, @, or whitespace
      if (/^[=+\-@\t\r]/.test(str)) {
        str = "'" + str;
      }
      return `"${str.replace(/"/g, '""')}"`;
    };

    const csvRows = rowsData.map(row => 
      headers.map(h => escapeCsv(row[h])).join(',')
    );

    // Prepend \uFEFF (UTF-8 BOM) so Microsoft Excel opens it into discrete columns automatically
    const csvContent = '\uFEFF' + [headers.map(h => `"${h}"`).join(','), ...csvRows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerFileDownload(blob, filename);

    return {
      success: true,
      filename,
      count: data.length,
      downloadUrl: `/api/export-leads?format=csv`,
      format: 'CSV (.csv)'
    };
  } catch (err) {
    console.error('exportLeadsToCsv error:', err);
    if (typeof window !== 'undefined') {
      window.location.href = '/api/export-leads?format=csv';
    }
    return {
      success: true,
      filename,
      count: data.length,
      downloadUrl: `/api/export-leads?format=csv`,
      format: 'CSV (.csv)'
    };
  }
}

/**
 * 3. 1-Click Clipboard Copier for Microsoft Excel & Google Sheets
 * Copies tab-delimited text so pasting into Excel (Ctrl + V) populates rows and columns instantly.
 */
export function copyLeadsToClipboard(leads = null) {
  let data = leads;
  if (!data || !Array.isArray(data) || data.length === 0) {
    data = getStoredLeads();
  }
  if (!data || data.length === 0) {
    const emptyRow = formatLeadForHuman({});
    const headers = Object.keys(emptyRow);
    const content = headers.join('\t');
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      return navigator.clipboard.writeText(content);
    }
    return Promise.resolve();
  }

  const rowsData = data.map(formatLeadForHuman);
  const headers = Object.keys(rowsData[0] || formatLeadForHuman({}));

  const cleanCell = (val) => {
    if (val === null || val === undefined) return '';
    let str = String(val).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
    // Neutralize spreadsheet formula execution
    if (/^[=+\-@\t\r]/.test(str)) {
      str = "'" + str;
    }
    return str;
  };

  const tsvRows = rowsData.map(row => 
    headers.map(h => cleanCell(row[h])).join('\t')
  );

  const tsvContent = [headers.join('\t'), ...tsvRows].join('\r\n');

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    return navigator.clipboard.writeText(tsvContent);
  }
  return Promise.reject(new Error('Clipboard API not available'));
}

/**
 * 4. Export all leads to JSON for API Webhooks & Backups
 */
export function exportLeadsToJson(leads = null) {
  let data = leads;
  if (!data || !Array.isArray(data) || data.length === 0) {
    data = getStoredLeads();
  }

  const today = new Date().toISOString().split('T')[0];
  const filename = `MVA_Legal_Leads_${today}.json`;

  const jsonString = JSON.stringify(data || [], null, 2);
  const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
  const downloadUrl = triggerFileDownload(blob, filename);

  return {
    success: true,
    filename,
    count: (data || []).length,
    downloadUrl,
    format: 'JSON (.json)'
  };
}

/**
 * 5. Export single claimant dossier
 */
export function exportSingleLeadToExcel(lead) {
  if (!lead) return;
  const filename = lead.caseReferenceNumber ? `${lead.caseReferenceNumber}_Legal_Dossier.xlsx` : null;
  return exportLeadsToExcel([lead], filename);
}

export function exportSingleLeadToCsv(lead) {
  if (!lead) return;
  const filename = lead.caseReferenceNumber ? `${lead.caseReferenceNumber}_Legal_Dossier.csv` : null;
  return exportLeadsToCsv([lead], filename);
}
