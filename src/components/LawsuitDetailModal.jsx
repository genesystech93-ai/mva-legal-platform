import React from 'react';
import { X, CheckCircle2, Shield, Calendar, DollarSign, FileText, ArrowRight } from 'lucide-react';

export default function LawsuitDetailModal({ lawsuit, onClose, onSelectCase }) {
  if (!lawsuit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden text-left my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0B132B] text-white p-6 sm:p-7 relative border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2 mb-2">
            <span className="font-mono text-xs font-bold text-[#DC2626] uppercase">
              {lawsuit.code}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {lawsuit.status}
            </span>
          </div>

          <h3 className="font-serif text-2xl font-bold text-white mb-1">
            {lawsuit.title}
          </h3>
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
            {lawsuit.categoryLabel}
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Docket Reference */}
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center space-x-3 text-xs">
            <FileText className="w-4 h-4 text-slate-500 shrink-0" />
            <div>
              <span className="font-bold text-slate-900">Litigation Docket / Authority: </span>
              <span className="font-mono text-slate-700">{lawsuit.docket}</span>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
              Case Summary & Litigation Scope
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {lawsuit.details}
            </p>
          </div>

          {/* Key Qualifiers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2.5 flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5" />
              Essential Qualification Criteria
            </h4>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <ul className="space-y-2 text-xs text-slate-700">
                {lawsuit.keyQualifiers.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center mr-2 shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Timeline and Damages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs text-blue-900">
              <span className="font-bold block mb-1 flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1" />
                Timeframe Window:
              </span>
              <p>{lawsuit.timeWindow}</p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs text-emerald-900">
              <span className="font-bold block mb-1 flex items-center">
                <DollarSign className="w-3.5 h-3.5 mr-1" />
                Compensable Damages:
              </span>
              <p>{lawsuit.potentialDamages}</p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 p-5 sm:px-8 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Close Details
          </button>
          <button
            onClick={() => {
              onClose();
              onSelectCase(lawsuit.id);
            }}
            className="inline-flex items-center px-6 py-3 rounded-md bg-[#DC2626] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#B91C1C] transition-all cursor-pointer"
          >
            <span>Start Review For This Case</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
