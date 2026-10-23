import React from 'react';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, FileCheck, AlertTriangle } from 'lucide-react';

export default function Hero({ onOpenWizard }) {
  return (
    <section className="relative bg-[#080E21] text-white pt-12 pb-20 overflow-hidden border-b border-slate-800">
      {/* Background Architectural Aesthetic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3B82F6_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl 2xl:max-w-5xl mx-auto text-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-semibold text-amber-400 mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="tracking-wide uppercase">2026 Legal Investigation & Claim Review</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
            Holding Negligent Drivers & Corporations <span className="text-[#DC2626]">Accountable</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl 2xl:max-w-4xl mx-auto">
            Harmed in a motor vehicle collision, by a defective prescription medication, toxic exposure, or manufacturer negligence? Experienced litigation attorneys are reviewing claims nationwide. Learn if you are entitled to financial compensation.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button
              onClick={() => onOpenWizard(null)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#DC2626] text-white text-base font-bold shadow-lg shadow-red-900/30 hover:bg-[#B91C1C] hover:shadow-xl active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Start 60-Second Case Review</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <a
              href="#active-lawsuits"
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-md bg-slate-900/80 border border-slate-700 text-slate-200 text-base font-semibold hover:bg-slate-800 hover:text-white transition-colors"
            >
              Browse Active Lawsuits
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-left">
            <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <Lock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">100% Confidential</p>
                <p className="text-[11px] text-slate-400">Strict privacy & security</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">No Upfront Cost</p>
                <p className="text-[11px] text-slate-400">Contingency fee basis</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Licensed Counsel</p>
                <p className="text-[11px] text-slate-400">50-State legal network</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/40 border border-slate-800/50">
              <FileCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">TrustedForm™ Active</p>
                <p className="text-[11px] text-slate-400">Verified TCPA consent</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statute Alert Banner */}
      <div className="mt-12 bg-amber-500/10 border-y border-amber-500/20 py-2.5 px-4 text-center">
        <div className="max-w-4xl mx-auto flex items-center justify-center text-xs sm:text-sm text-amber-200 font-medium">
          <AlertTriangle className="w-4 h-4 mr-2 text-amber-400 shrink-0" />
          <span>
            <strong>Statute of Limitations Notice:</strong> Personal injury and mass tort claims are subject to strict state deadlines. Inquiries made after the expiration date forfeit the right to financial recovery.
          </span>
        </div>
      </div>
    </section>
  );
}
