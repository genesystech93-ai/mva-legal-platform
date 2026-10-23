import React from 'react';
import { Car, Truck, Bike, ShieldAlert, AlertCircle, FileText, Stethoscope, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function MvaSpotlight({ onSelectCase }) {
  const mvaTypes = [
    {
      title: "Passenger Car & SUV Collisions",
      desc: "Rear-end impacts, intersection T-bones, and high-speed highway pileups caused by distracted or reckless drivers.",
      icon: Car,
      highlight: "Full Tort & Comparative Fault"
    },
    {
      title: "Commercial 18-Wheeler Trucking",
      desc: "Federal Motor Carrier Safety Administration (FMCSA) violations, driver fatigue, overweight cargo, and brake failures.",
      icon: Truck,
      highlight: "$1M+ Commercial Policies"
    },
    {
      title: "Rideshare (Uber & Lyft) Accidents",
      desc: "Crashes occurring while a passenger, or collisions caused by on-duty rideshare drivers carrying multi-million dollar umbrella coverage.",
      icon: ShieldAlert,
      highlight: "Tier 3 App Policy Triage"
    },
    {
      title: "Motorcycle & Pedestrian Impacts",
      desc: "Vulnerable road users subjected to catastrophic orthopedic, spinal cord, or traumatic brain injuries (TBI).",
      icon: Bike,
      highlight: "Maximum Injury Evaluation"
    }
  ];

  return (
    <section id="mva-section" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left Column: Context & Editorial Authority */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
              <Car className="w-3.5 h-3.5" />
              <span>Priority Practice Area: Auto & Truck Litigation</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-5">
              Injured in a Serious Auto Accident? <br />
              <span className="text-[#DC2626]">Do Not Let Insurance Adjusters Undervalue Your Claim.</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              Insurance companies employ adjusters trained to obtain recorded statements, minimize claim payouts, and rush injured victims into premature settlements before the permanent severity of spinal, neurological, or soft-tissue damage is fully diagnosed.
            </p>

            {/* Checklist of what attorneys seek */}
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-xs mb-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-4 flex items-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
                Key Factors That Maximize Your Settlement Recovery:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0">1</span>
                  <span><strong>Immediate ER / Hospital Records:</strong> Clear medical timeline linking physical injuries directly to the impact.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0">2</span>
                  <span><strong>Police Incident Telemetry:</strong> Crash reports establishing the opposing driver's speed, traffic citations, or DUI status.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0">3</span>
                  <span><strong>Commercial Policy Discovery:</strong> Uncovering corporate liability limits on delivery vans, rideshares, and big rigs.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 font-bold flex items-center justify-center shrink-0">4</span>
                  <span><strong>Future Medical Loss & Wages:</strong> Calculating long-term rehabilitation, lost earning capacity, and life care plans.</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onSelectCase("mva-auto")}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-md bg-[#DC2626] text-white font-bold text-sm shadow-md hover:bg-[#B91C1C] transition-all cursor-pointer"
              >
                <span>Assess My Auto Accident Claim</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <div className="text-xs text-slate-500 flex items-center">
                <Clock className="w-4 h-4 text-slate-400 mr-1.5" />
                Takes under 60 seconds • Zero obligation
              </div>
            </div>
          </div>

          {/* Right Column: 4 Collision Scenarios */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {mvaTypes.map((type, idx) => {
              const Icon = type.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => onSelectCase("mva-auto")}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-[#DC2626] hover:shadow-md transition-all cursor-pointer text-left group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-[#0B132B] flex items-center justify-center group-hover:bg-red-50 group-hover:text-[#DC2626] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif font-bold text-slate-900 text-sm group-hover:text-[#DC2626] transition-colors">
                        {type.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {type.highlight}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-12">
                    {type.desc}
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
