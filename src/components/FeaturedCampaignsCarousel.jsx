import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Truck, 
  Bike, 
  ShieldAlert, 
  AlertCircle, 
  FileText, 
  Stethoscope, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  Lock, 
  ExternalLink, 
  Sparkles,
  Gamepad2,
  DollarSign,
  AlertTriangle,
  HeartHandshake,
  Droplets,
  Flame,
  Pill,
  Award,
  Layers,
  Scale
} from 'lucide-react';
import { LAWSUITS } from '../data/lawsuitsData';

export default function FeaturedCampaignsCarousel({ onSelectCase, onOpenDetailsModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // 6 Priority Featured Campaigns
  const campaigns = [
    {
      id: "mva",
      caseId: "mva-auto",
      tabLabel: "Auto & Truck Crashes",
      tabIcon: Car,
      tag: "Priority Practice Area",
      tagColor: "bg-red-500/15 text-red-700 border-red-500/30",
      themeAccent: "from-red-600 to-slate-900",
      accentColor: "#DC2626",
      statusText: "Priority Intake 2026",
      docket: "State & Federal Civil Jurisdictions",
      title: "Injured in a Serious Auto or Truck Crash?",
      subtitle: "Do Not Let Insurance Adjusters Undervalue Your Claim.",
      description: "Insurance carriers deploy claim adjusters trained to extract recorded admissions and push fast, premature settlements before the permanent nature of spinal, brain, or orthopedic damage is documented. Network litigation attorneys investigate black box data, carrier logs, and commercial umbrella limits to secure full restitution.",
      criteria: [
        { num: 1, title: "Emergency Medical Records", text: "Immediate ER, trauma center, or surgical care establishing injury causation." },
        { num: 2, title: "Telemetry & Police Reports", text: "Crash reports citing the opposing driver's speed, DUI, or traffic infractions." },
        { num: 3, title: "Commercial Policy Discovery", text: "Tapping $1M+ corporate policies on delivery trucks, 18-wheelers, and rideshares." },
        { num: 4, title: "Future Care & Wage Loss", text: "Detailed financial quantification of vocational loss and future rehabilitation." }
      ],
      pillars: [
        {
          title: "Passenger Car & SUV Collisions",
          desc: "Rear-end impacts, intersection T-bones, and highway pileups caused by distracted, speeding, or reckless drivers.",
          icon: Car,
          tag: "Full Tort",
          highlight: "Comparative Fault"
        },
        {
          title: "Commercial 18-Wheeler Trucking",
          desc: "FMCSA federal safety violations, driver fatigue, falsified logbooks, overweight freight, and maintenance failures.",
          icon: Truck,
          tag: "Federal Logs",
          highlight: "$1M+ Commercial Policies"
        },
        {
          title: "Rideshare (Uber & Lyft) Crashes",
          desc: "Crashes occurring while riding as a passenger or collisions caused by on-duty drivers carrying multi-million coverage.",
          icon: ShieldAlert,
          tag: "App Coverage",
          highlight: "Tier 3 Policy Triage"
        },
        {
          title: "Motorcycle & Pedestrian Impacts",
          desc: "Vulnerable road users subjected to severe orthopedic fractures, paralysis, spinal cord injury, or traumatic brain injuries.",
          icon: Bike,
          tag: "Catastrophic",
          highlight: "Maximum Evaluation"
        }
      ]
    },
    {
      id: "roblox",
      caseId: "roblox-youth",
      tabLabel: "Roblox Minor Safety",
      tabIcon: Gamepad2,
      tag: "Active 2026 Campaign",
      tagColor: "bg-rose-500/20 text-rose-700 border-rose-500/30",
      themeAccent: "from-rose-600 to-indigo-950",
      accentColor: "#F43F5E",
      statusText: "Active Nationwide Filings",
      docket: "Multi-District State & Federal Class Complaints",
      title: "Roblox Minor Safety & Exploitation Lawsuits",
      subtitle: "Holding Tech Platforms Accountable for Child Safety Failures.",
      description: "Lawsuits filed nationwide on behalf of parents and guardians allege Roblox Corporation knowingly designed algorithmic platforms that prioritized engagement and microtransaction revenue over child safety controls—enabling predatory contact, unmoderated adult content exposure, and severe psychological distress.",
      criteria: [
        { num: 1, title: "Minor Under Age 18", text: "Incident or exposure occurred while the child was a minor during the past 5 years." },
        { num: 2, title: "Documented Harm or Trauma", text: "Predatory grooming, illicit material, unauthorized Robux charges, or severe trauma." },
        { num: 3, title: "Parental Legal Standing", text: "Parents or legal guardians can seek financial restitution and therapeutic care funds." },
        { num: 4, title: "Zero Out-of-Pocket Expense", text: "Handled on a strict contingency fee basis—no financial recovery, no legal fee." }
      ],
      pillars: [
        {
          title: "Predatory Contact & Grooming",
          desc: "Minors subjected to inappropriate communications or coercive contact due to bypassed chat filters and lack of parental alerts.",
          icon: AlertTriangle,
          tag: "Child Safety",
          highlight: "Priority Filing"
        },
        {
          title: "Deceptive Robux Microtransactions",
          desc: "Dark patterns and behavioral loops inducing minors into unauthorized in-game charges without verifiable parental consent.",
          icon: DollarSign,
          tag: "Restitution",
          highlight: "Financial Recovery"
        },
        {
          title: "Illicit & Adult Content Exposure",
          desc: "Minors exposed to user-generated rooms featuring graphic mature themes disguised from platform moderation algorithms.",
          icon: Gamepad2,
          tag: "Safety Failure",
          highlight: "Content Negligence"
        },
        {
          title: "Severe Mental Health Distress",
          desc: "Documented psychiatric distress, severe anxiety, depression, or self-harm triggers resulting from extortion on the platform.",
          icon: HeartHandshake,
          tag: "Therapy Fund",
          highlight: "Medical Support"
        }
      ]
    },
    {
      id: "camp-lejeune",
      caseId: "camp-lejeune",
      tabLabel: "Camp Lejeune Water",
      tabIcon: Droplets,
      tag: "Federal PACT Act Track",
      tagColor: "bg-amber-500/20 text-amber-800 border-amber-500/30",
      themeAccent: "from-amber-600 to-slate-900",
      accentColor: "#D97706",
      statusText: "$21B+ Elective Track",
      docket: "Camp Lejeune Justice Act (U.S. Dist. Court E.D.N.C.)",
      title: "Camp Lejeune Toxic Water Contamination",
      subtitle: "Government Elective Settlement Options for Veterans & Families.",
      description: "For over 30 years, tap water at Marine Corps Base Camp Lejeune was saturated with lethal industrial solvents including trichloroethylene (TCE), perchloroethylene (PCE), benzene, and vinyl chloride. The federal Camp Lejeune Justice Act allows veterans, family members, and civilian workers to obtain direct elective payouts up to $550,000+ or pursue uncapped civil damages.",
      criteria: [
        { num: 1, title: "30+ Cumulative Days on Base", text: "Stationed, worked, or resided at Camp Lejeune between August 1, 1953 and December 31, 1987." },
        { num: 2, title: "Presumptive Medical Diagnosis", text: "Kidney cancer, bladder cancer, leukemia, non-Hodgkin lymphoma, liver cancer, or Parkinson's." },
        { num: 3, title: "Surviving Heirs & Dependents", text: "Family members of deceased veterans or civilian workers are fully eligible to file claims." },
        { num: 4, title: "Elective Fast-Track Option", text: "Department of Navy elective settlement payouts expedited without prolonged court trials." }
      ],
      pillars: [
        {
          title: "Carcinogenic Solvents Exposure",
          desc: "Base drinking water wells contained toxic solvents at up to 280 times the maximum safe EPA regulatory thresholds.",
          icon: Droplets,
          tag: "Toxic Water",
          highlight: "280x Safe Limit"
        },
        {
          title: "Presumptive Cancer Class",
          desc: "Federal statute recognizes direct biological links to kidney cancer, bladder cancer, multiple myeloma, and Parkinson's.",
          icon: Stethoscope,
          tag: "Tier 1 Diagnosis",
          highlight: "Presumptive Link"
        },
        {
          title: "Direct Elective Settlement",
          desc: "Qualifying claimants can receive fast-track elective cash settlements ranging from $150,000 to $550,000+.",
          icon: DollarSign,
          tag: "Fast Track",
          highlight: "$150k - $550k+"
        },
        {
          title: "VA Benefits Protected",
          desc: "CLJA compensation does not reduce or forfeit existing VA healthcare access, pensions, or disability ratings.",
          icon: Scale,
          tag: "Protected Rights",
          highlight: "VA Unaffected"
        }
      ]
    },
    {
      id: "rideshare-assault",
      caseId: "rideshare-abuse",
      tabLabel: "Rideshare Driver Assault",
      tabIcon: ShieldAlert,
      tag: "Active MDL Action",
      tagColor: "bg-emerald-500/20 text-emerald-800 border-emerald-500/30",
      themeAccent: "from-emerald-600 to-slate-900",
      accentColor: "#059669",
      statusText: "In Re Uber Tech Litigation",
      docket: "In re Uber Technologies Passenger Safety Litigation",
      title: "Rideshare Driver Assault & Safety Negligence",
      subtitle: "Uncovering Corporate Failures in Passenger Protection.",
      description: "Lawsuits against major rideshare conglomerates assert that platforms failed to implement mandatory continuous background checks, biometric identity verification, and physical safety barriers—while suppressing thousands of customer safety complaints to maintain ride volume and market dominance.",
      criteria: [
        { num: 1, title: "Trip Dispatched Through App", text: "Incident occurred during an active ride booked through a licensed rideshare application." },
        { num: 2, title: "Documented Grievance or Report", text: "Police report, hospital record, or internal platform customer safety report filed." },
        { num: 3, title: "Physical or Psychological Harm", text: "Assault, battery, unlawful restraint, severe trauma, or psychological distress." },
        { num: 4, title: "Strict Confidentiality", text: "Confidential case reviews conducted by specialized female-led intake advocates if requested." }
      ],
      pillars: [
        {
          title: "Driver Assault & Battery",
          desc: "Passengers subjected to physical assault, verbal threats, intimidation, or battery by dispatched drivers.",
          icon: AlertTriangle,
          tag: "Active MDL",
          highlight: "Priority Intake"
        },
        {
          title: "Bypassed Background Screenings",
          desc: "Platforms permitted drivers with criminal records or fraudulent account sharing to transport vulnerable passengers.",
          icon: ShieldAlert,
          tag: "Corporate Fault",
          highlight: "Screening Failure"
        },
        {
          title: "Suppressed Safety Complaints",
          desc: "Internal disclosures reveal prior misconduct complaints against drivers were dismissed to preserve fleet availability.",
          icon: FileText,
          tag: "Discovery",
          highlight: "Suppressed Flags"
        },
        {
          title: "Trauma Restitution & Counseling",
          desc: "Securing substantial awards for specialized post-traumatic therapy, loss of safety, and punitive damages.",
          icon: HeartHandshake,
          tag: "Restitution",
          highlight: "Therapy Funding"
        }
      ]
    },
    {
      id: "ozempic-glp1",
      caseId: "glp1-ozempic",
      tabLabel: "Ozempic Gastroparesis",
      tabIcon: Pill,
      tag: "MDL 3094 Active",
      tagColor: "bg-indigo-500/20 text-indigo-800 border-indigo-500/30",
      themeAccent: "from-indigo-600 to-slate-900",
      accentColor: "#6366F1",
      statusText: "Federal Product Liability",
      docket: "MDL No. 3094 — Glucagon-like Peptide-1 Agonists Products Liability",
      title: "GLP-1 Injections & Stomach Paralysis Lawsuits",
      subtitle: "Failure to Warn Patients of Irreversible Motility Disorders.",
      description: "Federal MDL 3094 in the Eastern District of Pennsylvania coordinates claims against pharmaceutical manufacturers for failing to warn physicians and consumers that GLP-1 receptor agonist medications (Ozempic, Wegovy, Rybelsus, Mounjaro) can cause severe stomach paralysis (gastroparesis), intestinal blockage, and cyclic vomiting.",
      criteria: [
        { num: 1, title: "Brand-Name GLP-1 Prescription", text: "Prescribed Ozempic, Wegovy, Mounjaro, or Rybelsus for weight management or diabetes." },
        { num: 2, title: "Clinical Gastroparesis Diagnosis", text: "Diagnosed with severe gastroparesis, gastric emptying delay, or intestinal ileus." },
        { num: 3, title: "Hospital or ER Treatment", text: "Required hospitalization, endoscopic intervention, or nasogastric tube placement." },
        { num: 4, title: "Adequate Warning Deprivation", text: "Manufacturer labels concealed the chronic and irreversible nature of stomach paralysis." }
      ],
      pillars: [
        {
          title: "Permanent Stomach Paralysis",
          desc: "Vagus nerve dysfunction resulting in food remaining in the stomach for days, leading to chronic intractable vomiting.",
          icon: AlertCircle,
          tag: "Gastroparesis",
          highlight: "Delayed Emptying"
        },
        {
          title: "Bowel Obstruction & Ileus",
          desc: "Complete intestinal standstill and bowel blockage requiring emergency surgical resection or intensive ICU therapy.",
          icon: Stethoscope,
          tag: "Intestinal Ileus",
          highlight: "Emergency Care"
        },
        {
          title: "Gallbladder Removal (Cholecystectomy)",
          desc: "Severe biliary disease, acute cholecystitis, and gallstone complications forcing emergent surgical organ removal.",
          icon: Flame,
          tag: "Organ Surgery",
          highlight: "Surgical Loss"
        },
        {
          title: "Manufacturer Concealment",
          desc: "Litigation focuses on pharmaceutical marketing prioritizing multi-billion blockbuster profits over user safety.",
          icon: Scale,
          tag: "MDL 3094",
          highlight: "Failure to Warn"
        }
      ]
    },
    {
      id: "mesothelioma",
      caseId: "mesothelioma-asbestos",
      tabLabel: "Mesothelioma Trusts",
      tabIcon: Award,
      tag: "Active Trust Payouts",
      tagColor: "bg-teal-500/20 text-teal-800 border-teal-500/30",
      themeAccent: "from-teal-600 to-slate-900",
      accentColor: "#0D9488",
      statusText: "$30B+ Court-Ordered Trusts",
      docket: "U.S. Bankruptcy Code Section 524(g) Asbestos Trusts",
      title: "Mesothelioma & Asbestos Bankruptcy Trusts",
      subtitle: "Direct Cash Payouts Without Lawsuits Against the Military.",
      description: "More than 60 solvent asbestos trust funds containing over $30 Billion were established by federal bankruptcy courts to provide expedited, guaranteed financial recovery for military veterans, shipyard trades, and workers exposed to toxic asbestos fibers. Average recoveries range from $1,000,000 to $2,400,000+ without lengthy court appearances.",
      criteria: [
        { num: 1, title: "Confirmed Medical Diagnosis", text: "Pleural, Peritoneal, or Pericardial Mesothelioma, Lung Cancer, or Asbestosis." },
        { num: 2, title: "Military or Occupational Exposure", text: "Service in U.S. Navy/Army, shipyards, construction, boiler rooms, pipefitting, or automotive." },
        { num: 3, title: "Direct Payouts Without Court", text: "Claims are processed directly against funded trust pools with zero litigation against the military." },
        { num: 4, title: "Surviving Family & Heirs", text: "Spouses, children, and estate representatives can claim wrongful death trust proceeds." }
      ],
      pillars: [
        {
          title: "60+ Solvent Federal Trusts",
          desc: "Over $30 Billion set aside in court-mandated trust funds dedicated exclusively to paying victims and their families.",
          icon: DollarSign,
          tag: "$30B Available",
          highlight: "Direct Payment"
        },
        {
          title: "U.S. Navy & Trade Workers",
          desc: "Veterans exposed aboard naval vessels, engine rooms, boilermakers, and commercial construction trades.",
          icon: ShieldAlert,
          tag: "Veterans Fast-Track",
          highlight: "Military Priority"
        },
        {
          title: "Expedited Processing",
          desc: "Most claims receive expedited trust reviews and payments without the delays of traditional court trials.",
          icon: Clock,
          tag: "No Depositions",
          highlight: "Fast Recovery"
        },
        {
          title: "Substantial Financial Relief",
          desc: "Combined recoveries across multiple trusts typically range between $1,000,000 and $2,400,000+.",
          icon: Award,
          tag: "Uncapped Trusts",
          highlight: "$1M - $2.4M Avg"
        }
      ]
    }
  ];

  const currentCampaign = campaigns[currentIndex];
  const activeLawsuitObj = LAWSUITS.find(l => l.id === currentCampaign.caseId) || LAWSUITS[0];

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % campaigns.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, campaigns.length]);

  // Support URL Hash Navigation (e.g. #mva-section, #roblox-campaign, #camp-lejeune)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#mva-section' || hash === '#mva') {
        setCurrentIndex(0);
      } else if (hash === '#roblox-campaign' || hash === '#roblox') {
        setCurrentIndex(1);
      } else if (hash === '#camp-lejeune' || hash === '#water') {
        setCurrentIndex(2);
      } else if (hash === '#rideshare-abuse' || hash === '#rideshare') {
        setCurrentIndex(3);
      } else if (hash === '#glp1-ozempic' || hash === '#ozempic') {
        setCurrentIndex(4);
      } else if (hash === '#mesothelioma' || hash === '#asbestos') {
        setCurrentIndex(5);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? campaigns.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % campaigns.length);
  };

  const handleSelectTab = (idx) => {
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) {
      handleNext();
    } else if (distance < -50) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section 
      id="featured-campaigns" 
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative py-16 sm:py-20 bg-slate-900 text-white border-b border-slate-800 overflow-hidden text-left focus:outline-none"
    >
      {/* Anchor Targets for Direct and Header Navigation */}
      <div id="mva-section" className="absolute -top-24 pointer-events-none" tabIndex={-1}></div>
      <div id="roblox-campaign" className="absolute -top-24 pointer-events-none" tabIndex={-1}></div>
      <div id="camp-lejeune" className="absolute -top-24 pointer-events-none" tabIndex={-1}></div>
      <div id="rideshare-abuse" className="absolute -top-24 pointer-events-none" tabIndex={-1}></div>
      <div id="glp1-ozempic" className="absolute -top-24 pointer-events-none" tabIndex={-1}></div>
      <div id="mesothelioma" className="absolute -top-24 pointer-events-none" tabIndex={-1}></div>

      {/* Dynamic Background Glows Based On Active Campaign */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div 
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-25"
        style={{ backgroundColor: currentCampaign.accentColor }}
      ></div>
      <div 
        className="absolute bottom-0 left-10 w-[450px] h-[450px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: currentCampaign.accentColor }}
      ></div>

      <div className="relative max-w-7xl 2xl:max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        
        {/* Section Header & Interactive Campaign Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Priority Litigation Dossiers • 2026 Nationwide Campaigns</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Featured Legal Campaigns & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                  Active Multi-District Litigations
                </span>
              </h2>
            </div>

            {/* Carousel Controls Bar */}
            <div className="flex items-center space-x-3 shrink-0">
              {/* Play/Pause Auto-Advance Button */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                title={isAutoPlaying ? "Pause Auto-Advance" : "Resume Auto-Advance"}
                aria-label={isAutoPlaying ? "Pause Auto-Advance" : "Resume Auto-Advance"}
              >
                {isAutoPlaying ? <Pause className="w-4 h-4 text-amber-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer active:scale-95"
                title="Previous Campaign"
                aria-label="Previous Campaign"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="text-xs font-bold text-slate-400 font-mono px-1">
                {String(currentIndex + 1).padStart(2, '0')} / {String(campaigns.length).padStart(2, '0')}
              </span>

              <button
                onClick={handleNext}
                className="p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer active:scale-95"
                title="Next Campaign"
                aria-label="Next Campaign"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Interactive Campaign Selection Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
            {campaigns.map((camp, idx) => {
              const TabIcon = camp.tabIcon;
              const isActive = idx === currentIndex;
              return (
                <button
                  key={camp.id}
                  onClick={() => handleSelectTab(idx)}
                  className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border-t border-x ${
                    isActive
                      ? 'bg-slate-800/95 text-white border-slate-700 shadow-md relative -mb-[1px]'
                      : 'bg-slate-900/40 text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <TabIcon 
                    className="w-4 h-4" 
                    style={{ color: isActive ? camp.accentColor : 'inherit' }} 
                  />
                  <span>{camp.tabLabel}</span>
                  {isActive && (
                    <span 
                      className="w-2 h-2 rounded-full animate-pulse ml-1"
                      style={{ backgroundColor: camp.accentColor }}
                    ></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Carousel Main Slide Panel */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm transition-all duration-300">
          
          {/* Top Campaign Dossier Meta Bar */}
          <div className="bg-slate-950/80 px-6 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center space-x-3">
              <span className={`px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border ${currentCampaign.tagColor}`}>
                {currentCampaign.tag}
              </span>
              <span className="text-slate-400 hidden sm:inline">|</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {currentCampaign.docket}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <span className="flex items-center text-emerald-400 font-semibold text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                {currentCampaign.statusText}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[11px] text-slate-400">
                100% Confidential Client Privilege
              </span>
            </div>
          </div>

          {/* Slide Body: Split-Panel Layout */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
              
              {/* Left Column: Case Facts & Qualification Checklist */}
              <div className="lg:col-span-7">
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug mb-3">
                  {currentCampaign.title} <br />
                  <span 
                    className="font-sans font-semibold text-lg sm:text-xl block mt-1"
                    style={{ color: currentCampaign.accentColor }}
                  >
                    {currentCampaign.subtitle}
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {currentCampaign.description}
                </p>

                {/* Checklist Box */}
                <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 shadow-inner mb-7">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3.5 flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2" />
                    Essential Qualification Checklist For This Campaign:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                    {currentCampaign.criteria.map((item) => (
                      <div key={item.num} className="flex items-start space-x-2.5">
                        <span 
                          className="w-5 h-5 rounded-full font-bold flex items-center justify-center shrink-0 text-[10px] text-white"
                          style={{ backgroundColor: currentCampaign.accentColor }}
                        >
                          {item.num}
                        </span>
                        <div>
                          <strong className="text-white block">{item.title}</strong>
                          <span className="text-slate-400 text-[11px] leading-tight block mt-0.5">{item.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary & Secondary Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={() => onSelectCase(currentCampaign.caseId)}
                    className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-white font-bold text-sm shadow-xl transition-all cursor-pointer hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: currentCampaign.accentColor }}
                  >
                    <span>Assess My {currentCampaign.tabLabel} Claim</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>

                  <button
                    onClick={() => onOpenDetailsModal(activeLawsuitObj)}
                    className="inline-flex items-center justify-center px-5 py-3.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700 text-sm font-semibold transition-all cursor-pointer"
                  >
                    <FileText className="w-4 h-4 mr-2 text-slate-400" />
                    <span>View Docket & Evidence</span>
                  </button>
                </div>

                <div className="flex items-center space-x-4 mt-4 text-[11px] text-slate-400">
                  <span className="flex items-center">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                    256-Bit Encrypted Intake
                  </span>
                  <span>•</span>
                  <span>Zero Out-of-Pocket Costs</span>
                  <span>•</span>
                  <span>No Recovery, No Fee</span>
                </div>
              </div>

              {/* Right Column: 4 Tailored Harm / Practice Pillar Cards */}
              <div className="lg:col-span-5 grid grid-cols-1 gap-3.5">
                {currentCampaign.pillars.map((pillar, idx) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={idx}
                      onClick={() => onSelectCase(currentCampaign.caseId)}
                      className="bg-slate-950/70 p-4.5 rounded-xl border border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/70 transition-all cursor-pointer group shadow-sm text-left"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors border"
                            style={{ 
                              backgroundColor: `${currentCampaign.accentColor}18`,
                              borderColor: `${currentCampaign.accentColor}35`,
                              color: currentCampaign.accentColor
                            }}
                          >
                            <PillarIcon className="w-4 h-4" />
                          </div>
                          <h5 className="font-serif font-bold text-white text-sm group-hover:text-slate-100 transition-colors">
                            {pillar.title}
                          </h5>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {pillar.highlight}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed pl-11 group-hover:text-slate-300 transition-colors">
                        {pillar.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Bottom Carousel Indicator Bar */}
          <div className="bg-slate-950/90 px-6 py-3 border-t border-slate-800 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center space-x-2">
              {campaigns.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => handleSelectTab(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentIndex ? 'w-8' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  style={{ backgroundColor: i === currentIndex ? c.accentColor : undefined }}
                  aria-label={`Jump to ${c.tabLabel}`}
                />
              ))}
            </div>

            {/* Quick Switch Links */}
            <div className="hidden md:flex items-center space-x-4 text-xs text-slate-400">
              <span>Quick switch:</span>
              <button 
                onClick={() => setCurrentIndex(0)} 
                className="hover:text-white transition-colors cursor-pointer text-slate-300"
              >
                Auto & MVA
              </button>
              <span>•</span>
              <button 
                onClick={() => setCurrentIndex(1)} 
                className="hover:text-rose-400 transition-colors cursor-pointer text-slate-300"
              >
                Roblox 2026
              </button>
              <span>•</span>
              <button 
                onClick={() => setCurrentIndex(2)} 
                className="hover:text-amber-400 transition-colors cursor-pointer text-slate-300"
              >
                Camp Lejeune
              </button>
              <span>•</span>
              <button 
                onClick={() => setCurrentIndex(4)} 
                className="hover:text-indigo-400 transition-colors cursor-pointer text-slate-300"
              >
                Ozempic MDL
              </button>
              <span>•</span>
              <button 
                onClick={() => setCurrentIndex(5)} 
                className="hover:text-teal-400 transition-colors cursor-pointer text-slate-300"
              >
                Mesothelioma $30B
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
