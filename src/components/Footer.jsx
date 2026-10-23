import React from 'react';
import { Scale, Phone, Mail, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

export default function Footer({ onOpenWizard, onOpenAdmin }) {
  return (
    <footer className="bg-[#060A17] text-slate-400 border-t border-slate-800 text-left">
      {/* Upper Footer CTA Strip */}
      <div className="bg-[#0B132B] border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Immediate Assistance Available
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
              Speak With An Intake Coordinator Today
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Case reviews are free, 100% confidential, and subject to preliminary attorney-client privilege.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <a
              href="tel:18005550142"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-slate-800 border border-slate-700 text-white text-sm font-bold hover:bg-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4 mr-2 text-amber-400" />
              <span>(800) 555-0142</span>
            </a>
            <button
              onClick={() => onOpenWizard(null)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-md bg-[#DC2626] text-white text-sm font-bold shadow-md hover:bg-[#B91C1C] transition-all cursor-pointer"
            >
              Start Free Case Evaluation
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-[#DC2626] flex items-center justify-center text-white shadow-md">
                <Scale className="w-5 h-5" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                INJURY<span className="text-[#DC2626]">CLAIMS</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              InjuryClaims connects individuals harmed by reckless drivers, defective pharmaceuticals, toxic environmental chemicals, and manufacturer negligence with experienced litigation counsel nationwide.
            </p>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-500" />
                <span>intake@injuryclaimslegal.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-500" />
                <span>(800) 555-0142 (Available 24/7)</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Core Practice Areas
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#mva-section" className="hover:text-white transition-colors">Motor Vehicle Accidents (MVA)</a></li>
              <li><a href="#roblox-campaign" className="text-rose-400 hover:text-white font-medium transition-colors">Roblox Minor Exploitation (2026 Campaign)</a></li>
              <li><a href="#mva-section" className="hover:text-white transition-colors">Commercial Truck Crashes</a></li>
              <li><a href="#rideshare-abuse" className="hover:text-white transition-colors">Rideshare Passenger Assault</a></li>
              <li><a href="#glp1-ozempic" className="hover:text-white transition-colors">Ozempic & GLP-1 Gastroparesis</a></li>
              <li><a href="#camp-lejeune" className="hover:text-white transition-colors">Toxic Exposure (Camp Lejeune Water)</a></li>
              <li><a href="#mesothelioma" className="hover:text-white transition-colors">Mesothelioma & Asbestos $30B Trusts</a></li>
            </ul>
          </div>

          {/* Legal Compliance */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Legal Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#active-lawsuits" className="hover:text-white transition-colors">Case Eligibility Review</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">Contingency Retainers</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Attorney Advertising Rules</a></li>
              <li><a href="#intake-form" className="hover:text-white transition-colors">ActiveProspect Verification</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">TCPA Consent Terms</a></li>
            </ul>
          </div>

          {/* Trust Guarantees */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Consumer Protections
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-2 text-slate-300">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Encryption</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Upfront Client Costs</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Independent Bar Counsel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Mandatory Disclaimers */}
        <div className="border-t border-slate-800/80 pt-8 text-[11px] text-slate-500 leading-relaxed space-y-3">
          <p>
            <strong>ATTORNEY ADVERTISING & INFORMATIONAL DISCLAIMER:</strong> InjuryClaims is a private legal marketing and consumer intake referral enterprise. InjuryClaims is not a law firm, does not provide legal advice or legal services, and is not a certified lawyer referral service. Submitting an inquiry through this site does not establish an attorney-client relationship. An attorney-client relationship is only created when you sign a formal written legal engagement or retainer agreement with an independent participating law firm.
          </p>
          <p>
            <strong>NO GUARANTEE OF OUTCOME:</strong> Prior case results, verdicts, and settlements listed on this website or discussed by participating counsel do not guarantee, warranty, or predict a similar outcome in your individual claim. Every legal case is unique and depends entirely upon its own factual merits, liability determinations, and applicable jurisdiction.
          </p>
          <p>
            <strong>CONTINGENCY FEES & EXPENSES:</strong> Participating law firms typically operate on a contingency fee basis, meaning there is no attorney fee unless monetary compensation is obtained. Court filing fees, expert witness costs, medical record retrieval charges, and litigation expenses may be advanced by counsel and recouped from the gross settlement or award.
          </p>
          <p>
            <strong>STATE COMPLIANCE NOTICES:</strong> Services may not be available in all jurisdictions. Free background information is available upon request. In the event of legal representation, counsel may associate with or refer claims to licensed co-counsel in your jurisdiction in accordance with state ethics rules.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-800/50 gap-4 text-slate-500">
            <div className="flex items-center space-x-2">
              <span>© {new Date().getFullYear()} InjuryClaims Legal Network. All Rights Reserved. ActiveProspect TrustedForm™ Certified.</span>
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-slate-700 hover:text-slate-400 p-1 rounded transition-colors cursor-pointer"
                title="Staff Portal (Password Protected)"
                aria-label="Staff Portal"
              >
                <Lock className="w-3 h-3 inline" />
              </button>
            </div>
            <div className="flex space-x-6 text-[11px]">
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">TCPA Policy</a>
              <a href="#" className="hover:text-slate-300">Do Not Sell My Info</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
