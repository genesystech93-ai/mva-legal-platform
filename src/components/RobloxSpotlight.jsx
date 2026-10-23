import React from 'react';
import { ShieldAlert, Users, Gamepad2, AlertTriangle, CheckCircle2, ArrowRight, HeartHandshake, DollarSign, Clock, Lock } from 'lucide-react';

export default function RobloxSpotlight({ onSelectCase }) {
  const campaignPillars = [
    {
      title: "Predatory Contact & Exploitation",
      desc: "Minors subjected to inappropriate communications, grooming, or coercive contact due to bypassed chat filters and lack of parental monitoring tools.",
      icon: AlertTriangle,
      tag: "Priority Filing",
      tagColor: "bg-red-500/20 text-red-300 border-red-500/30"
    },
    {
      title: "Deceptive Robux Financial Harms",
      desc: "Dark patterns and algorithmic loops inducing children into unauthorized in-game microtransactions without verifiable parental consent.",
      icon: DollarSign,
      tag: "Financial Recovery",
      tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/30"
    },
    {
      title: "Illicit & Adult Content Exposure",
      desc: "Minors exposed to user-generated rooms featuring graphic themes, simulated violence, or mature content disguised from basic platform moderation.",
      icon: Gamepad2,
      tag: "Safety Failure",
      tagColor: "bg-rose-500/20 text-rose-300 border-rose-500/30"
    },
    {
      title: "Severe Mental Health & Trauma",
      desc: "Documented psychiatric distress, severe anxiety, depression, or self-harm triggers resulting from online harassment or extortion on the platform.",
      icon: HeartHandshake,
      tag: "Therapy Restitution",
      tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30"
    }
  ];

  return (
    <section id="roblox-campaign" className="relative py-20 bg-[#070D1E] text-white border-b border-slate-800 overflow-hidden text-left">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#F43F5E_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          
          {/* Left Column: Legal Context & Editorial Authority */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>Active 2026 Legal Campaign: Child Digital Safety</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-5">
              Roblox Minor Exploitation & Negligence Lawsuits: <br />
              <span className="text-rose-400">Holding Tech Platforms Accountable.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              Lawsuits filed nationwide on behalf of parents and legal guardians allege that Roblox Corporation knowingly designed algorithmic platforms that prioritized engagement and microtransaction revenue over child safety controls—enabling predatory contact, unmoderated adult content exposure, and severe psychological distress.
            </p>

            {/* Checklist of What Attorneys Seek */}
            <div className="bg-slate-900/90 p-6 rounded-xl border border-slate-800 shadow-xl mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-rose-200 mb-4 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" />
                Key Qualification Criteria for Affected Families:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 border border-rose-500/30">1</span>
                  <span><strong>Minor Under Age 18:</strong> Incident or exposure occurred while the child was a minor during the past 5 years.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 border border-rose-500/30">2</span>
                  <span><strong>Documented Harm:</strong> Predatory grooming, illicit material, unauthorized Robux charges, or severe trauma.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 border border-rose-500/30">3</span>
                  <span><strong>Parental Legal Standing:</strong> Parents or guardians can seek financial restitution and therapeutic care funds.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center shrink-0 border border-rose-500/30">4</span>
                  <span><strong>Zero Out-of-Pocket Expense:</strong> Handled on a strict contingency fee basis—no recovery, no legal fee.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onSelectCase("roblox-youth")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-md bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-sm shadow-lg shadow-rose-950/40 hover:from-rose-500 hover:to-red-500 active:scale-95 transition-all cursor-pointer"
              >
                <span>Assess Roblox Minor Claim</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <div className="flex items-center text-xs text-slate-400">
                <Lock className="w-4 h-4 text-emerald-400 mr-1.5 shrink-0" />
                <span>100% Confidential • Privileged Family Consultation</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Core Harm Profiles */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {campaignPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  onClick={() => onSelectCase("roblox-youth")}
                  className="bg-slate-900/70 p-5 rounded-xl border border-slate-800 hover:border-rose-500/60 hover:bg-slate-800/80 transition-all cursor-pointer group shadow-md"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors border border-rose-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-white text-sm group-hover:text-rose-300 transition-colors">
                        {pillar.title}
                      </h4>
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${pillar.tagColor}`}>
                      {pillar.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-12 group-hover:text-slate-300 transition-colors">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
