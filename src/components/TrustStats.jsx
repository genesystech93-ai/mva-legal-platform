import React from 'react';
import { DollarSign, Award, Clock3, Scale, Shield, Users, HeartHandshake, Check } from 'lucide-react';

export default function TrustStats() {
  const stats = [
    {
      figure: "$950M+",
      label: "Damages Recovered",
      desc: "Recovered by our nationwide affiliate trial law firms for injured claimants and mass tort plaintiffs.",
      icon: DollarSign,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200"
    },
    {
      figure: "50 States",
      label: "Jurisdictions Covered",
      desc: "Affiliate counsel licensed across state and federal civil litigation forums from coast to coast.",
      icon: Scale,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      figure: "24 Hours",
      label: "Intake Review Window",
      desc: "Case assessments conducted promptly to protect critical evidence before insurance adjusters intercede.",
      icon: Clock3,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      figure: "$0 Risk",
      label: "Contingency Retainer",
      desc: "You pay absolutely zero out-of-pocket costs. Legal fees are contingent solely upon winning your recovery.",
      icon: Award,
      color: "text-red-600 bg-red-50 border-red-200"
    }
  ];

  const pillars = [
    {
      title: "Free Initial Consultation",
      detail: "Your comprehensive legal claim evaluation is completely cost-free and carries no obligation to proceed."
    },
    {
      title: "Confidentiality Guaranteed",
      detail: "Your submission is protected under strict attorney-client confidentiality rules and 256-bit SSL encryption."
    },
    {
      title: "No Out-of-Pocket Expenses",
      detail: "All court filing costs, medical record subpoenas, and expert witness retainers are advanced by counsel."
    },
    {
      title: "Dedicated Intake Advocacy",
      detail: "Clear, transparent communication guiding you through medical documentation and insurer negotiation."
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 -mt-24 relative z-10 mb-16">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-lg legal-card-hover text-left flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} border flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-slate-900 tracking-tight mb-1">
                    {stat.figure}
                  </div>
                  <div className="text-sm font-bold text-[#DC2626] uppercase tracking-wider mb-2">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Human Editorial Core Principles */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
            Why Injured Victims Choose Our Legal Intake Portal
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 mt-2 mb-4">
            Protecting Your Rights Against Billion-Dollar Insurers & Drug Manufacturers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            When life is disrupted by a devastating collision or a corporate cover-up, navigating legal complexities alone puts you at an immense disadvantage. Our platform bridges the gap directly to vetted trial attorneys.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="p-5 rounded-lg bg-slate-50 border border-slate-200/70 text-left">
              <div className="flex items-center space-x-2 text-[#0B132B] font-bold text-sm mb-2">
                <span className="w-5 h-5 rounded-full bg-[#0B132B] text-white flex items-center justify-center text-xs">
                  <Check className="w-3.5 h-3.5" />
                </span>
                <span>{pillar.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {pillar.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
