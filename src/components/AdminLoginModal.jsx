import React, { useState } from 'react';
import { Lock, ShieldAlert, KeyRound, X, ArrowRight } from 'lucide-react';

// Cryptographic SHA-256 Digest of Authorized Passcode (Plaintext is never shipped in bundle)
const ADMIN_PASSCODE_HASH = '4d0ff812acfaf37390b69df382c37f7651b3700443faf989803c3976409d894e';
const LOCKOUT_STORAGE_KEY = 'mva_auth_lockout_ts';
const ATTEMPTS_STORAGE_KEY = 'mva_auth_attempts_cnt';

async function hashInput(str) {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const buf = new TextEncoder().encode(str);
    const digest = await crypto.subtle.digest('SHA-256', buf);
    return Array.from(new Uint8Array(digest))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  return '';
}

export default function AdminLoginModal({ isOpen, onClose, onAuthenticated }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const getLockoutRemaining = () => {
    try {
      const lockUntil = parseInt(sessionStorage.getItem(LOCKOUT_STORAGE_KEY) || '0', 10);
      const remainingMs = lockUntil - Date.now();
      return remainingMs > 0 ? Math.ceil(remainingMs / 60000) : 0;
    } catch {
      return 0;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passcode) return;

    const remainingMinutes = getLockoutRemaining();
    if (remainingMinutes > 0) {
      setError(`Access temporarily restricted. Please retry in ${remainingMinutes} minute(s).`);
      return;
    }

    setIsVerifying(true);
    const inputHash = await hashInput(passcode);
    setIsVerifying(false);

    if (inputHash === ADMIN_PASSCODE_HASH) {
      setError('');
      setPasscode('');
      sessionStorage.removeItem(LOCKOUT_STORAGE_KEY);
      sessionStorage.removeItem(ATTEMPTS_STORAGE_KEY);
      sessionStorage.setItem('mva_admin_auth', 'true');
      onAuthenticated();
    } else {
      let attempts = parseInt(sessionStorage.getItem(ATTEMPTS_STORAGE_KEY) || '0', 10) + 1;
      sessionStorage.setItem(ATTEMPTS_STORAGE_KEY, String(attempts));

      if (attempts >= 5) {
        // Enforce 15-minute brute-force lockout
        const lockUntil = Date.now() + 15 * 60 * 1000;
        sessionStorage.setItem(LOCKOUT_STORAGE_KEY, String(lockUntil));
        setError('Too many failed attempts. Vault locked for 15 minutes.');
      } else {
        setError(`Invalid administrative passcode. Attempt ${attempts} of 5.`);
      }
      setPasscode('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 sm:p-7 shadow-2xl text-left text-white animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-base font-bold text-white">Administrator Access</h3>
              <p className="text-[11px] text-slate-400">Protected Legal Lead Vault</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Consumer privacy and HIPAA/TCPA regulations require authenticated authorization to view claimant records and export lead spreadsheets.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center">
              <KeyRound className="w-3.5 h-3.5 mr-1 text-amber-400" />
              <span>Admin Passcode:</span>
            </label>
            <input
              type="password"
              autoFocus
              placeholder="Enter passcode..."
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-hidden focus:border-red-500 font-mono tracking-wider"
            />
            {error && (
              <p className="text-xs text-red-400 font-semibold mt-2 flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 mr-1 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[10px] text-slate-500 font-mono flex items-center">
              <Lock className="w-2.5 h-2.5 mr-1 text-slate-600" />
              Authorized Access Only
            </span>
            <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold transition-all cursor-pointer shadow-md"
            >
              <span>Unlock Vault</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
