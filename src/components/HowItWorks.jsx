import React from 'react';
import { ClipboardCheck, Stethoscope, Scale, ShieldCheck, ArrowRight } from 'lucide-react';

export default function HowItWorks({ onOpenWizard }) {
  const steps = [
    {
      stepNum: "01",
      title: "Submit Confidential Inquiry",
      desc: "Complete our secure, 60-second questionnaire. We capture your accident timeline, injury details, and treatment history.",
      icon: ClipboardCheck,
      highlight: "Takes under 60 seconds"
    },
    {
      stepNum: "02",
      title: "Preliminary Legal Review",
      desc: "An experienced personal injury or mass tort attorney reviews your submission against current court precedents and insurance limits.",
      icon: Stethoscope,
      highlight: "Within 24 business hours"
    },
    {
      stepNum: "03",
      title: "Contingency Representation",
      desc: "If your claim qualifies, legal counsel handles all paperwork, negotiations, and trial proceedings. You pay $0 unless you win.",
      icon: Scale,
      highlight: "Zero out-of-pocket risk"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparent Three-Stage Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            How Your Case Evaluation Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            We eliminate the intimidation and red tape of legal claims. From initial triage to connecting you with seasoned courtroom advocates, here is what you can expect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200/80 relative text-left flex flex-col justify-between legal-card-hover"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-3xl font-bold text-[#DC2626]">
                      {st.stepNum}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#0B132B] shadow-xs">
                      <Icon className="w-6 h-6 text-[#0B132B]" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {st.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span>Timeline:</span>
                  <span className="text-[#0B132B] font-bold">{st.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => onOpenWizard(null)}
            className="inline-flex items-center justify-center px-8 py-4 rounded-md bg-[#DC2626] text-white font-bold text-sm shadow-md hover:bg-[#B91C1C] transition-all cursor-pointer"
          >
            <span>Start Step 1: Submit Your Case Now</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}
