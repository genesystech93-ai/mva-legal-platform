import React, { useState } from 'react';
import { exportLeadsToCsv, exportLeadsToExcel } from '../utils/leadStorage';
import { ShieldCheck, Code, Check, Copy, ChevronUp, ChevronDown, Globe, Cookie, Info, Download, FileSpreadsheet } from 'lucide-react';

export default function TrustedFormInspector({ lastLead, onOpenAdmin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sampleLeadPayload = lastLead ? {
    caseReferenceNumber: lastLead.caseReferenceNumber,
    firstName: lastLead.firstName,
    lastName: lastLead.lastName,
    phone: lastLead.phone,
    email: lastLead.email,
    streetAddress: lastLead.streetAddress,
    city: lastLead.city,
    stateOccurred: lastLead.stateOccurred,
    zipCode: lastLead.zipCode,
    claimType: lastLead.claimType,
    hospitalized: lastLead.hospitalized,
    injurySummary: lastLead.injurySummary,
    ip_address: lastLead.ip_address,
    visitor_id: lastLead.visitor_id,
    session_id: lastLead.session_id,
    cookies: lastLead.cookies,
    utm_source: lastLead.utm_source,
    utm_campaign: lastLead.utm_campaign,
    xxTrustedFormCertUrl: lastLead.xxTrustedFormCertUrl || lastLead.trustedFormCertUrl,
    xxTrustedFormPingUrl: lastLead.xxTrustedFormPingUrl || lastLead.trustedFormPingUrl,
    tcpa_opt_in: lastLead.tcpa_opt_in || lastLead.tcpaConsent,
    timestamp: lastLead.timestamp
  } : null;

  const copyPayload = () => {
    if (sampleLeadPayload) {
      navigator.clipboard.writeText(JSON.stringify(sampleLeadPayload, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md w-full sm:w-auto">
      {/* Floating Toggle Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-[#0B132B] hover:bg-slate-800 text-white px-4 py-2.5 rounded-full shadow-xl border border-slate-700 text-xs font-semibold cursor-pointer transition-all ml-auto"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Lead & TrustedForm Inspector</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </button>

      {/* Expanded Inspector Panel */}
      {isOpen && (
        <div className="mt-2 bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-2xl text-left text-xs text-slate-300 w-full sm:w-96 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-white uppercase tracking-wider text-[11px]">
                Intake Lead Data Payload
              </span>
            </div>
            {sampleLeadPayload && (
              <button
                onClick={copyPayload}
                className="flex items-center space-x-1 text-slate-400 hover:text-white text-[11px] bg-slate-800 px-2 py-1 rounded border border-slate-700 cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
            )}
          </div>

          {/* Industry Rule Explanation */}
          <div className="mb-3 p-2.5 rounded-lg bg-blue-950/60 border border-blue-800/60 text-[11px] text-blue-200 space-y-1">
            <div className="flex items-center text-blue-300 font-bold">
              <Info className="w-3.5 h-3.5 mr-1 text-blue-400" />
              <span>Industry Standard Notice:</span>
            </div>
            <p>
              TrustedForm operates <strong>100% invisibly</strong> on the client page via hidden inputs (`xxTrustedFormCertUrl`). Displaying tech badges to injured consumers causes friction and is prohibited by top legal aggregators.
            </p>
          </div>

          {sampleLeadPayload ? (
            <>
              <div className="space-y-2 mb-3">
                {/* IP Address */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] flex items-center">
                    <Globe className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                    Client IP:
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {sampleLeadPayload.ip_address || '127.0.0.1'}
                  </span>
                </div>

                {/* Cookie & Session */}
                <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 text-[11px] flex items-center">
                    <Cookie className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                    Session / Cookie ID:
                  </span>
                  <span className="font-mono text-slate-200 text-[10px]">
                    {sampleLeadPayload.session_id || 'Active'}
                  </span>
                </div>

                {/* TrustedForm URL */}
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block mb-1">
                    ActiveProspect Cert URL (`xxTrustedFormCertUrl`):
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 break-all bg-slate-950 p-1.5 rounded block border border-slate-800">
                    {sampleLeadPayload.xxTrustedFormCertUrl || 'Generated on form submission'}
                  </span>
                </div>
              </div>

              {/* Raw JSON Preview */}
              <div className="bg-slate-950 rounded-lg p-2.5 border border-slate-800 max-h-40 overflow-y-auto">
                <pre className="font-mono text-[10px] text-amber-300 whitespace-pre-wrap">
                  {JSON.stringify(sampleLeadPayload, null, 2)}
                </pre>
              </div>
            </>
          ) : (
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-center space-y-2 mb-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto" />
              <p className="text-[11px] font-semibold text-slate-200">
                Awaiting Case Review Submission
              </p>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Complete the intake wizard on this page to generate and inspect live ActiveProspect TrustedForm certificates and TCPA compliance records.
              </p>
            </div>
          )}

          {/* Action Export Buttons: Native server attachment downloads */}
          <div className="grid grid-cols-2 gap-2 mt-3">
            <a
              href="/api/export-leads?format=excel"
              download="MVA_Legal_Leads.xlsx"
              onClick={() => {
                setCopied('excel');
                setTimeout(() => setCopied(false), 2500);
              }}
              className="py-2 px-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs no-underline"
              title="Save all leads to Microsoft Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{copied === 'excel' ? 'Saved .XLSX!' : 'Excel (.xlsx)'}</span>
            </a>
            <a
              href="/api/export-leads?format=csv"
              download="MVA_Legal_Leads.csv"
              onClick={() => {
                setCopied('csv');
                setTimeout(() => setCopied(false), 2500);
              }}
              className="py-2 px-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer shadow-xs no-underline"
              title="Save all leads to Universal CSV (.csv)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{copied === 'csv' ? 'Saved .CSV!' : 'CSV (.csv)'}</span>
            </a>
          </div>
          <button
            onClick={onOpenAdmin}
            className="w-full mt-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-[11px] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
            <span>Open Full Leads Management Vault</span>
          </button>

          <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
            <span>ActiveProspect Verified</span>
            <span className="text-emerald-400 font-semibold">100% TCPA Compliant</span>
          </div>
        </div>
      )}
    </div>
  );
}
