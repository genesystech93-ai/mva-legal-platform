import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, FileQuestion } from 'lucide-react';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: "How much does it cost to have an attorney evaluate my case?",
      a: "It costs absolutely nothing. Our case reviews are 100% free and confidential with zero obligation. If our network law firms represent you, they operate under a contingency fee contract. That means the attorney advances all filing costs, medical review fees, and investigation expenses. You never pay a dime out of pocket, and legal fees are only deducted as an agreed percentage if and when financial recovery is secured."
    },
    {
      q: "How long do I have to file a claim for a motor vehicle accident or medical harm?",
      a: "Every state enforces a strict Statute of Limitations. In most jurisdictions, personal injury claims must be filed between 1 to 3 years from the date of the collision or medical discovery. In claims against municipal transit authorities or government agencies, notices of claim are often due in as little as 90 to 180 days. Once the statutory deadline passes, you permanently lose all rights to legal restitution."
    },
    {
      q: "Will my current employer or insurance carrier know I submitted an inquiry?",
      a: "No. Your consultation is private, securely encrypted, and subject to preliminary attorney-client privilege. We do not contact your employer or insurer without your explicit written authorization."
    },
    {
      q: "What is an ActiveProspect TrustedForm certificate and why is it used?",
      a: "TrustedForm is the premier legal verification technology that certifies genuine consumer consent and protects consumers against unwanted robocalls. It creates an independent, tamper-proof record certifying that you requested to be connected with a licensed attorney, keeping your data compliant under federal TCPA rules."
    },
    {
      q: "What if my accident or injury occurred in another state?",
      a: "Our network connects plaintiffs with licensed trial counsel across all 50 states. Personal injury claims are generally governed by the state where the crash or harm took place, and our affiliate firms maintain admission in federal and state courts nationwide."
    },
    {
      q: "What if I am already receiving insurance settlement offers?",
      a: "Insurance companies frequently make quick, low settlement offers immediately following a crash before the true extent of bodily damage, lost earning capacity, or future surgical needs are fully known. Accepting an insurance check typically requires signing a full liability release that forever bars you from seeking additional compensation. You should always have an independent attorney review any release before signing."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-4xl 2xl:max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Legal Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-3">
            Answers From Experienced Litigation Teams
          </h2>
          <p className="text-sm text-slate-600">
            Have questions about your legal rights or the claims process? Explore our answers below.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-left transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between font-serif font-bold text-slate-900 text-base sm:text-lg hover:text-[#DC2626] transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#DC2626]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
