import React, { useState } from 'react';
import { Scale, Phone, ShieldCheck, Clock, Menu, X, ArrowRight, FileSpreadsheet } from 'lucide-react';

export default function Header({ onOpenWizard, onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Utility Legal Bar */}
      <div className="bg-[#0B132B] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-2"></span>
              24/7 Intake Attorneys Available
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:flex items-center text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-slate-400" />
              100% Confidential • Attorney-Client Privilege
            </span>
          </div>
          <div className="flex items-center space-x-5">
            <a 
              href="tel:9289384298" 
              className="flex items-center font-semibold text-white hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              <span>(928) 938-4298</span>
            </a>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-300 text-[11px]">
              No Upfront Fees • Free Consultation
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group text-left">
            <div className="w-11 h-11 rounded-lg bg-[#0B132B] flex items-center justify-center text-white shadow-md group-hover:bg-[#1E3A8A] transition-colors">
              <Scale className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0B132B]">
                  INJURY<span className="text-[#DC2626]">CLAIMS</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-600 border border-slate-200">
                  LEGAL
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
                Trusted Representation • Nationwide Intake
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold text-slate-700">
            <a href="#mva-section" className="hover:text-[#DC2626] transition-colors py-1">
              MVA
            </a>
            <a href="#roblox-campaign" className="hover:text-[#DC2626] transition-colors py-1">
              Roblox
            </a>
            <a href="#active-lawsuits" className="hover:text-[#DC2626] transition-colors py-1">
              All Lawsuits
            </a>
            <a href="#how-it-works" className="hover:text-[#DC2626] transition-colors py-1">
              How It Works
            </a>
            <a href="#faq" className="hover:text-[#DC2626] transition-colors py-1">
              Legal FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center space-x-3">
            <button
              onClick={() => onOpenWizard(null)}
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-[#DC2626] text-white text-sm font-bold shadow-md hover:bg-[#B91C1C] active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Free Case Review</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2 text-base font-medium text-slate-700">
            <a 
              href="#mva-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-50 hover:text-[#DC2626]"
            >
              MVA
            </a>
            <a 
              href="#roblox-campaign" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-50 hover:text-[#DC2626]"
            >
              Roblox
            </a>
            <a 
              href="#active-lawsuits" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-50 hover:text-[#DC2626]"
            >
              Active Lawsuits & Investigations
            </a>
            <a 
              href="#how-it-works" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-50 hover:text-[#DC2626]"
            >
              How It Works
            </a>
            <a 
              href="#faq" 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded hover:bg-slate-50 hover:text-[#DC2626]"
            >
              Legal Questions (FAQ)
            </a>
          </nav>
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWizard(null);
              }}
              className="w-full flex items-center justify-center py-3 rounded-md bg-[#DC2626] text-white font-bold text-center shadow-md hover:bg-[#B91C1C]"
            >
              Start Free Case Evaluation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
