import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TrustStats from './components/TrustStats';
import FeaturedCampaignsCarousel from './components/FeaturedCampaignsCarousel';
import LawsuitsGrid from './components/LawsuitsGrid';
import HowItWorks from './components/HowItWorks';
import IntakeWizard from './components/IntakeWizard';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import LawsuitDetailModal from './components/LawsuitDetailModal';
import TrustedFormInspector from './components/TrustedFormInspector';
import AdminLeadsModal from './components/AdminLeadsModal';
import AdminLoginModal from './components/AdminLoginModal';
import { LAWSUITS } from './data/lawsuitsData';

export default function App() {
  const [selectedCaseId, setSelectedCaseId] = useState('mva-auto');
  const [selectedStateName, setSelectedStateName] = useState('California');
  const [activeModalLawsuit, setActiveModalLawsuit] = useState(null);
  const [lastSubmittedLead, setLastSubmittedLead] = useState(null);
  
  // Security & Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Check existing session auth and listen for admin triggers
  useEffect(() => {
    const isAuthed = sessionStorage.getItem('mva_admin_auth') === 'true';
    if (isAuthed) {
      setIsAdminAuthenticated(true);
    }

    const checkAdminTrigger = () => {
      const hash = window.location.hash;
      const params = new URLSearchParams(window.location.search);
      if (hash === '#admin' || params.get('admin') === '1' || params.get('portal') === 'leads') {
        if (sessionStorage.getItem('mva_admin_auth') === 'true') {
          setIsAdminModalOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    checkAdminTrigger();
    window.addEventListener('hashchange', checkAdminTrigger);

    // Keyboard shortcut: Ctrl + Shift + L (Leads)
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'L' || e.key === 'l' || e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        handleRequestAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminTrigger);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleRequestAdmin = () => {
    const isAuthed = sessionStorage.getItem('mva_admin_auth') === 'true';
    if (isAuthed) {
      setIsAdminModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleAuthenticated = () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    setIsAdminModalOpen(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('mva_admin_auth');
    setIsAdminAuthenticated(false);
    setIsAdminModalOpen(false);
    // Clear #admin from URL without reloading page
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const scrollToWizard = (caseId = null) => {
    if (caseId) {
      setSelectedCaseId(caseId);
    }
    const wizardEl = document.getElementById('intake-form');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenDetails = (lawsuit) => {
    setActiveModalLawsuit(lawsuit);
  };

  const handleCloseDetails = () => {
    setActiveModalLawsuit(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans selection:bg-[#DC2626] selection:text-white">
      {/* Public Header: Zero Admin Buttons Visible To General Consumers */}
      <Header onOpenWizard={scrollToWizard} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenWizard={scrollToWizard} />

        {/* Value Metrics & Advocacy Pillars */}
        <TrustStats />

        {/* Priority Featured Campaigns Interactive Carousel (MVA, Roblox, Camp Lejeune, Rideshare, Ozempic, Mesothelioma) */}
        <FeaturedCampaignsCarousel 
          onSelectCase={scrollToWizard} 
          onOpenDetailsModal={handleOpenDetails} 
        />

        {/* Lawsuits Catalog with Category Filters */}
        <LawsuitsGrid 
          onSelectCase={scrollToWizard} 
          onOpenDetailsModal={handleOpenDetails} 
        />

        {/* Three-Stage Plaintiff Journey */}
        <HowItWorks onOpenWizard={scrollToWizard} />

        {/* Central High-Converting 3-Step Intake Wizard with ActiveProspect TrustedForm */}
        <IntakeWizard
          initialCaseId={selectedCaseId}
          initialStateName={selectedStateName}
          onLeadSubmitted={(lead) => setLastSubmittedLead(lead)}
        />

        {/* Legal FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer with Discreet Staff Portal Lock Trigger */}
      <Footer 
        onOpenWizard={scrollToWizard} 
        onOpenAdmin={handleRequestAdmin}
      />

      {/* Docket Details Modal */}
      <LawsuitDetailModal
        lawsuit={activeModalLawsuit}
        onClose={handleCloseDetails}
        onSelectCase={scrollToWizard}
      />

      {/* Passcode Protection Gate: Required to View or Export Leads */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />

      {/* Password-Protected Lead Manager & Export Dashboard */}
      <AdminLeadsModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        onLogout={handleLogout}
      />

      {/* Lead Inspector: ONLY visible if authenticated admin */}
      {isAdminAuthenticated && (
        <TrustedFormInspector 
          lastLead={lastSubmittedLead} 
          onOpenAdmin={() => setIsAdminModalOpen(true)}
        />
      )}
    </div>
  );
}
