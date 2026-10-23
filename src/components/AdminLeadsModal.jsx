import React, { useState, useEffect } from 'react';
import { 
  getStoredLeads, 
  deleteLead, 
  clearAllLeads,
  copyLeadsToClipboard,
  exportLeadsToExcel,
  exportLeadsToCsv,
  exportLeadsToJson,
  exportSingleLeadToExcel,
  exportSingleLeadToCsv,
  triggerFileDownload
} from '../utils/leadStorage';
import { 
  X, Download, Search, Trash2, ExternalLink, 
  FileSpreadsheet, Code, Lock, FileDown, 
  Maximize2, Minimize2, CheckCircle, AlertCircle, Copy, Check, User
} from 'lucide-react';

export default function AdminLeadsModal({ isOpen, onClose, onLogout }) {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Export status feedback state
  const [exportNotice, setExportNotice] = useState(null);
  const [clipboardCopied, setClipboardCopied] = useState(false);

  const syncServer = (currentLeads) => {
    if (typeof window !== 'undefined') {
      fetch('/api/sync-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentLeads)
      }).catch(err => console.warn('Lead sync error:', err));
    }
  };

  useEffect(() => {
    if (isOpen) {
      const loaded = getStoredLeads();
      setLeads(loaded);
      syncServer(loaded);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.firstName && lead.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.lastName && lead.lastName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.phone && lead.phone.includes(searchTerm)) ||
      (lead.email && lead.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.caseReferenceNumber && lead.caseReferenceNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || lead.claimType === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalMva = leads.filter(l => l.claimType === 'mva-auto').length;
  const totalMeso = leads.filter(l => l.claimType === 'mesothelioma-asbestos').length;
  const totalRoblox = leads.filter(l => l.claimType === 'roblox-youth').length;
  const today = new Date().toISOString().split('T')[0];

  const categoryParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
  const searchParam = searchTerm.trim() ? `&search=${encodeURIComponent(searchTerm.trim())}` : '';
  const excelDownloadUrl = `/api/export-leads?format=excel${categoryParam}${searchParam}`;
  const csvDownloadUrl = `/api/export-leads?format=csv${categoryParam}${searchParam}`;
  const jsonDownloadUrl = `/api/export-leads?format=json${categoryParam}${searchParam}`;

  const handleExportExcel = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetLeads = filteredLeads.length > 0 ? filteredLeads : leads;
    const filename = `MVA_Legal_Leads_${today}.xlsx`;
    try {
      exportLeadsToExcel(targetLeads, filename);
      setExportNotice({
        type: 'success',
        filename,
        count: targetLeads.length,
        format: 'Excel (.xlsx)',
        downloadUrl: excelDownloadUrl,
        message: `Saved Microsoft Excel (.xlsx) workbook directly to your computer.`
      });
    } catch (err) {
      console.warn('Direct Excel export failed, attempting server fetch fallback:', err);
      fetch(excelDownloadUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then(blob => {
          triggerFileDownload(blob, filename);
          setExportNotice({
            type: 'success',
            filename,
            count: targetLeads.length,
            format: 'Excel (.xlsx)',
            downloadUrl: excelDownloadUrl,
            message: `Downloaded Microsoft Excel (.xlsx) file directly to your computer.`
          });
        })
        .catch(fetchErr => {
          console.error('All Excel export attempts failed:', fetchErr);
          window.open(excelDownloadUrl, '_blank');
        });
    }
  };

  const handleExportCsv = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetLeads = filteredLeads.length > 0 ? filteredLeads : leads;
    const filename = `MVA_Legal_Leads_${today}.csv`;
    try {
      exportLeadsToCsv(targetLeads, filename);
      setExportNotice({
        type: 'success',
        filename,
        count: targetLeads.length,
        format: 'CSV (.csv)',
        downloadUrl: csvDownloadUrl,
        message: `Saved Universal UTF-8 CSV file directly to your computer.`
      });
    } catch (err) {
      console.warn('Direct CSV export failed, attempting server fetch fallback:', err);
      fetch(csvDownloadUrl)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.blob();
        })
        .then(blob => {
          triggerFileDownload(blob, filename);
          setExportNotice({
            type: 'success',
            filename,
            count: targetLeads.length,
            format: 'CSV (.csv)',
            downloadUrl: csvDownloadUrl,
            message: `Downloaded Universal UTF-8 CSV file directly to your computer.`
          });
        })
        .catch(fetchErr => {
          console.error('All CSV export attempts failed:', fetchErr);
          window.open(csvDownloadUrl, '_blank');
        });
    }
  };

  const handleExportJson = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetLeads = filteredLeads.length > 0 ? filteredLeads : leads;
    const filename = `MVA_Legal_Leads_${today}.json`;
    try {
      exportLeadsToJson(targetLeads);
      setExportNotice({
        type: 'success',
        filename,
        count: targetLeads.length,
        format: 'JSON (.json)',
        downloadUrl: jsonDownloadUrl,
        message: `Saved raw JSON file directly to your computer.`
      });
    } catch (err) {
      window.open(jsonDownloadUrl, '_blank');
    }
  };

  const handleCopyClipboard = () => {
    const targetLeads = filteredLeads.length > 0 ? filteredLeads : leads;
    copyLeadsToClipboard(targetLeads)
      .then(() => {
        setClipboardCopied(true);
        setExportNotice({
          type: 'success',
          filename: 'Copied to Clipboard',
          count: targetLeads.length,
          format: 'Excel Compatible Tab-Separated Data',
          downloadUrl: null,
          message: `Copied ${targetLeads.length} leads. Open Microsoft Excel or Google Sheets and press Ctrl + V to paste into columns!`
        });
        setTimeout(() => setClipboardCopied(false), 3000);
      })
      .catch((err) => {
        console.error('Clipboard copy error:', err);
      });
  };

  const handleDelete = (caseRef) => {
    if (confirm(`Are you sure you want to delete lead ${caseRef}?`)) {
      const updated = deleteLead(caseRef);
      setLeads(updated || []);
      syncServer(updated || []);
    }
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all leads? This cannot be undone.")) {
      const updated = clearAllLeads();
      setLeads(updated);
      syncServer([]);
      setExportNotice(null);
    }
  };



  return (
    <div className={
      isFullScreen 
        ? "fixed inset-0 z-50 bg-slate-950 flex flex-col w-screen h-screen max-w-none max-h-screen overflow-hidden"
        : "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-slate-950/85 backdrop-blur-sm overflow-y-auto"
    }>
      <div className={
        isFullScreen
          ? "bg-white w-full h-full border-0 rounded-none shadow-none text-left flex flex-col overflow-hidden"
          : "bg-white rounded-2xl w-full max-w-[98vw] 2xl:max-w-[1780px] border border-slate-200 shadow-2xl overflow-hidden text-left flex flex-col h-[94vh] max-h-[94vh] animate-in fade-in zoom-in-95 duration-200"
      }>
        {/* Header */}
        <div className="bg-[#0B132B] text-white p-4 sm:p-6 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-[#DC2626] flex items-center justify-center text-white shadow-md shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-2xl font-bold text-white">
                  Lead Intake & TrustedForm Manager
                </h3>
                <span className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Encrypted Vault
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Secure vault containing captured claimant data, client IPs, and ActiveProspect certificates.
              </p>
            </div>
          </div>

          {/* Top Export Actions: Instant Client-Side Generation via SheetJS + Direct Link */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportExcel}
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              title="Save Microsoft Excel .xlsx workbook directly to your computer"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5" />
              <span>Download Excel (.xlsx)</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
              title="Save Universal UTF-8 BOM CSV directly to your computer"
            >
              <FileDown className="w-4 h-4 mr-1.5" />
              <span>Download CSV (.csv)</span>
            </button>

            <button
              type="button"
              onClick={handleCopyClipboard}
              className="inline-flex items-center px-3.5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
              title="Copy all leads formatted for Excel pasting (Ctrl + V)"
            >
              {clipboardCopied ? <Check className="w-3.5 h-3.5 mr-1 text-emerald-300" /> : <Copy className="w-3.5 h-3.5 mr-1" />}
              <span>{clipboardCopied ? 'Copied to Clipboard!' : 'Copy for Excel'}</span>
            </button>

            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer"
              title="Download raw JSON for backups and webhooks"
            >
              <Code className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span>JSON</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-red-950/70 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Lock vault and sign out"
            >
              <Lock className="w-3.5 h-3.5 mr-1 text-red-400" />
              <span className="hidden sm:inline">Lock Vault</span>
            </button>

            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              title={isFullScreen ? "Exit Full Screen" : "Expand to Full Screen"}
            >
              {isFullScreen ? <Minimize2 className="w-5 h-5 text-amber-400" /> : <Maximize2 className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Export Notification Banner & Direct Clickable Fallback */}
        {exportNotice && (
          <div className={
            exportNotice.type === 'error'
              ? "bg-red-50 border-b border-red-200 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-red-800 animate-in fade-in slide-in-from-top-1"
              : "bg-emerald-50 border-b border-emerald-200 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900 animate-in fade-in slide-in-from-top-1"
          }>
            <div className="flex items-center space-x-2.5">
              {exportNotice.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              <div>
                <span className="font-bold">
                  {exportNotice.type === 'error' ? 'Notice: ' : '✅ Export Completed: '}
                </span>
                <span className="font-mono font-semibold">{exportNotice.filename}</span>
                <span className="ml-2 text-slate-600">({exportNotice.message})</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={exportNotice.format?.includes('CSV') ? handleExportCsv : exportNotice.format?.includes('JSON') ? handleExportJson : handleExportExcel}
                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs cursor-pointer transition-colors"
                title="Click here to download file again"
              >
                <Download className="w-3.5 h-3.5 mr-1" />
                <span>Download Again</span>
              </button>

              <button
                onClick={handleCopyClipboard}
                className="inline-flex items-center px-2.5 py-1.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-semibold text-xs shadow-xs cursor-pointer transition-colors"
                title="Copy directly to clipboard to paste in Excel"
              >
                <Copy className="w-3 h-3 mr-1" />
                <span>Copy for Excel</span>
              </button>

              <button
                onClick={() => setExportNotice(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded cursor-pointer ml-1"
                title="Dismiss notice"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Metric Summary Cards */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Leads Logged</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-slate-900">{leads.length}</span>
          </div>
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">MVA Collisions</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#DC2626]">{totalMva}</span>
          </div>
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-rose-200 shadow-xs bg-rose-50/30">
            <span className="text-[10px] sm:text-[11px] font-bold text-rose-700 uppercase tracking-wider block">Roblox Child Safety</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-rose-600">{totalRoblox}</span>
          </div>
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Mesothelioma $30B</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-amber-600">{totalMeso}</span>
          </div>
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider block">TrustedForm Certs</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-emerald-600">100% Valid</span>
          </div>
        </div>

        {/* Filters & Actions Bar */}
        <div className="p-3 sm:px-6 border-b border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search by name, phone, email, or docket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-800 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end flex-wrap gap-y-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-700 font-medium cursor-pointer"
            >
              <option value="all">All Practice Areas ({leads.length})</option>
              <option value="roblox-youth">Roblox Child Safety Campaign ({totalRoblox})</option>
              <option value="mva-auto">Motor Vehicle Accident ({totalMva})</option>
              <option value="mesothelioma-asbestos">Mesothelioma & Asbestos ($30B+ Fund) ({totalMeso})</option>
              <option value="rideshare-abuse">Rideshare Misconduct</option>
              <option value="glp1-ozempic">Ozempic Gastroparesis</option>
              <option value="camp-lejeune">Camp Lejeune Water</option>
              <option value="afff-foam">AFFF Firefighting Foam</option>
            </select>

            <button
              onClick={handleCopyClipboard}
              className="inline-flex items-center text-xs text-indigo-700 hover:text-indigo-900 font-semibold px-2.5 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-50 transition-colors cursor-pointer"
              title="Copy all leads formatted for Excel pasting"
            >
              <Copy className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              <span>Copy for Excel</span>
            </button>

            {leads.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto p-4 sm:p-6">
          {filteredLeads.length === 0 ? (
            <div className="py-16 text-center text-slate-500 space-y-3">
              <User className="w-10 h-10 mx-auto text-slate-300" />
              <p className="font-semibold text-sm">
                {leads.length === 0 ? "No intake leads recorded yet." : "No leads match your search criteria."}
              </p>
              <p className="text-xs text-slate-400">
                {leads.length === 0 
                  ? "Incoming case reviews submitted through the legal intake wizard will automatically appear here." 
                  : "Try clearing your search query or selecting a different case category."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 text-slate-700 uppercase font-bold tracking-wider text-[10px] border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Docket / Ref</th>
                    <th className="p-3.5">Claimant</th>
                    <th className="p-3.5">Category & State</th>
                    <th className="p-3.5">Client IP</th>
                    <th className="p-3.5">ActiveProspect TrustedForm Certificate</th>
                    <th className="p-3.5">TCPA</th>
                    <th className="p-3.5 text-right">Download Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredLeads.map((lead) => {
                    const certUrl = lead.xxTrustedFormCertUrl || lead.trustedFormCertUrl || '';
                    const isMeso = lead.claimType === 'mesothelioma-asbestos';
                    const isRoblox = lead.claimType === 'roblox-youth';
                    const leadExcelUrl = `/api/export-leads?format=excel&docket=${lead.caseReferenceNumber}`;
                    const leadCsvUrl = `/api/export-leads?format=csv&docket=${lead.caseReferenceNumber}`;
                    
                    return (
                      <tr key={lead.caseReferenceNumber} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-slate-900 whitespace-nowrap">
                          {lead.caseReferenceNumber}
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {lead.timestamp ? new Date(lead.timestamp).toLocaleDateString() : 'Today'}
                          </span>
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-bold text-slate-900 block">{lead.firstName} {lead.lastName}</span>
                          <span className="text-slate-600 block">{lead.phone}</span>
                          <span className="text-slate-400 text-[11px] block">{lead.email}</span>
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className={
                            isRoblox
                              ? "font-semibold text-rose-700 block"
                              : (isMeso 
                                ? "font-semibold text-amber-800 block capitalize"
                                : "font-semibold text-blue-800 block capitalize")
                          }>
                            {isRoblox 
                              ? 'Roblox Child Safety' 
                              : (lead.claimType === 'mesothelioma-asbestos' ? 'Mesothelioma ($30B Trust)' : (lead.claimType ? lead.claimType.replace('-', ' ') : 'MVA'))}
                          </span>
                          <span className="text-slate-500 text-[11px] block">
                            {lead.stateOccurred} • {isRoblox ? (lead.hospitalized === 'yes' ? 'Therapy / Counseling' : 'In-Home Distress') : (lead.hospitalized === 'yes' ? 'ER / Hospital' : 'Clinic')}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                          {lead.ip_address || '127.0.0.1'}
                        </td>
                        <td className="p-3.5 max-w-xs">
                          {certUrl ? (
                            <div className="flex items-center space-x-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                              <a
                                href={certUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[10px] text-emerald-700 hover:text-emerald-900 hover:underline truncate block"
                                title={certUrl}
                              >
                                {certUrl}
                              </a>
                              <ExternalLink className="w-3 h-3 text-emerald-600 shrink-0" />
                            </div>
                          ) : (
                            <span className="text-slate-400 italic">No cert url</span>
                          )}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Verified
                          </span>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap space-x-1">
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                exportSingleLeadToExcel(lead);
                                setExportNotice({
                                  type: 'success',
                                  filename: `${lead.caseReferenceNumber}_Legal_Dossier.xlsx`,
                                  count: 1,
                                  format: 'Excel (.xlsx)',
                                  downloadUrl: leadExcelUrl,
                                  message: `Saved dossier for ${lead.firstName} ${lead.lastName} to Excel (.xlsx)!`
                                });
                              } catch (err) {
                                window.open(leadExcelUrl, '_blank');
                              }
                            }}
                            className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded transition-colors cursor-pointer inline-flex items-center"
                            title="Direct download of this lead's dossier to Excel (.xlsx)"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              try {
                                exportSingleLeadToCsv(lead);
                                setExportNotice({
                                  type: 'success',
                                  filename: `${lead.caseReferenceNumber}_Legal_Dossier.csv`,
                                  count: 1,
                                  format: 'CSV (.csv)',
                                  downloadUrl: leadCsvUrl,
                                  message: `Saved dossier for ${lead.firstName} ${lead.lastName} to CSV!`
                                });
                              } catch (err) {
                                window.open(leadCsvUrl, '_blank');
                              }
                            }}
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded transition-colors cursor-pointer inline-flex items-center"
                            title="Direct download of this lead's dossier to CSV (.csv)"
                          >
                            <FileDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(lead.caseReferenceNumber)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer inline-flex items-center"
                            title="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
          <span>Showing {filteredLeads.length} of {leads.length} total leads in storage.</span>
          <div className="flex items-center space-x-2">
            <span>RFC 4180 Universal CSV (Excel Ready) • Microsoft Excel (.xlsx) Multi-Tab Workbooks</span>
          </div>
        </div>
      </div>
    </div>
  );
}
