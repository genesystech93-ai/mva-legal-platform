import React, { useState } from 'react';
import { LAWSUITS } from '../data/lawsuitsData';
import { Filter, ArrowUpRight, CheckCircle2, Shield, AlertCircle, Info, Calendar } from 'lucide-react';

export default function LawsuitsGrid({ onSelectCase, onOpenDetailsModal }) {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { key: 'all', label: 'All Inquiries' },
    { key: 'consumer', label: '🛡️ Roblox & Child Safety' },
    { key: 'mva', label: 'Auto & Transportation' },
    { key: 'pharma', label: 'Defective Medications' },
    { key: 'device', label: 'Medical Devices' },
    { key: 'toxic', label: 'Toxic Chemical Exposure' },
  ];

  const filteredLawsuits = activeTab === 'all' 
    ? LAWSUITS 
    : LAWSUITS.filter(item => item.category === activeTab);

  return (
    <section id="active-lawsuits" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <div className="max-w-3xl 2xl:max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-red-50 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Active Nationwide Dockets & Investigations</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Current Mass Tort & Personal Injury Practice Areas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our participating legal coalition is accepting initial client inquiries across the following high-priority litigations. Click any docket to review specific qualification criteria and initiate an expedited review.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === cat.key
                  ? 'bg-[#0B132B] text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Lawsuits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filteredLawsuits.map((lawsuit) => {
            const isRoblox = lawsuit.id === 'roblox-youth';
            return (
              <div
                key={lawsuit.id}
                className={`bg-white rounded-xl border p-6 flex flex-col justify-between legal-card-hover text-left group ${
                  isRoblox ? 'border-rose-300 ring-1 ring-rose-200 hover:border-rose-500 shadow-xs' : 'border-slate-200'
                }`}
              >
                <div>
                  {/* Case Code & Status */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#DC2626] uppercase tracking-wider">
                      {lawsuit.code}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      isRoblox ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      {isRoblox ? '🔥 2026 Priority Campaign' : lawsuit.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-[#DC2626] transition-colors mb-2">
                    {lawsuit.title}
                  </h3>

                  {/* Practice Area Tag */}
                  <div className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider mb-3">
                    {lawsuit.categoryLabel}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">
                    {lawsuit.shortDesc}
                  </p>

                  {/* Key Qualifiers Box */}
                  <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-100 mb-6">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
                      Key Eligibility Indicators:
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-slate-600">
                      {lawsuit.keyQualifiers.slice(0, 2).map((item, qIdx) => (
                        <li key={qIdx} className="flex items-start">
                          <span className="text-slate-400 mr-1.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenDetailsModal(lawsuit)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center py-2 px-1 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    <span>Docket Details</span>
                  </button>
                  <button
                    onClick={() => onSelectCase(lawsuit.id)}
                    className="inline-flex items-center text-xs font-bold px-3.5 py-2 rounded-md bg-[#0B132B] text-white hover:bg-[#DC2626] transition-colors cursor-pointer"
                  >
                    <span>Assess Case</span>
                    <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
