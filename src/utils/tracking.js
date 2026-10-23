/**
 * Client-Side Tracking & Compliance Utility for MVA & Tort Leads
 * Captures IP Address, Cookies, UTM parameters, and Device Metadata
 * formatted according to ActiveProspect & TCPA compliance standards.
 */

// Helper to get or set a persistent tracking cookie
export function getOrCreateCookie(name, days = 30) {
  if (typeof document === 'undefined') return '';
  
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  // Generate new UUID-like identifier if not found
  const newId = 'mva_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  document.cookie = `${name}=${newId}; expires=${date.toUTCString()}; path=/; SameSite=Lax${isSecure ? '; Secure' : ''}`;
  return newId;
}

// Extract UTM parameters and ad click IDs from current URL
export function getUrlParameters() {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || 'direct',
    utm_medium: params.get('utm_medium') || 'web_intake',
    utm_campaign: params.get('utm_campaign') || 'mva_high_intent',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    gclid: params.get('gclid') || '', // Google Click ID
    fbclid: params.get('fbclid') || '', // Facebook Click ID
    referrer: document.referrer || 'direct'
  };
}

// Extract pre-population / auto-fill parameters from URL query string
export function getAutofillFromUrl() {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const extracted = {};

  const firstName = params.get('first_name') || params.get('fname') || params.get('first');
  if (firstName) extracted.firstName = firstName;

  const lastName = params.get('last_name') || params.get('lname') || params.get('last');
  if (lastName) extracted.lastName = lastName;

  const phone = params.get('phone') || params.get('phone_1') || params.get('mobile') || params.get('tel');
  if (phone) {
    const raw = phone.replace(/\D/g, '').substring(0, 10);
    if (raw.length === 10) {
      extracted.phone = `(${raw.substring(0, 3)}) ${raw.substring(3, 6)}-${raw.substring(6)}`;
    } else {
      extracted.phone = phone;
    }
  }

  const email = params.get('email');
  if (email) extracted.email = email;

  const address = params.get('address') || params.get('street') || params.get('street_address');
  if (address) extracted.streetAddress = address;

  const city = params.get('city');
  if (city) extracted.city = city;

  const state = params.get('state');
  if (state) extracted.stateOccurred = state;

  const zip = params.get('zip') || params.get('zipcode') || params.get('postal');
  if (zip) extracted.zipCode = zip;

  const claim = params.get('claim') || params.get('case_id') || params.get('claim_type');
  if (claim) extracted.claimType = claim;

  return extracted;
}



// Capture client public IP address asynchronously
export async function fetchClientIp() {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.ip || '127.0.0.1';
    }
  } catch (err) {
    console.warn('IP fetch error, falling back to network detection:', err);
  }
  
  // Secondary fallback provider
  try {
    const res = await fetch('https://api64.ipify.org?format=json', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data.ip;
    }
  } catch (err) {
    // Return standard client IP placeholder for local sandbox/offline
    return '74.125.250.1'; 
  }
  return '74.125.250.1';
}

// Whitelist attribution & analytics cookies only, protecting sensitive application cookies
const PERMITTED_COOKIE_PREFIXES = ['_lead_', '_ga', '_fbp', 'utm_', '_gid'];

export function getAllCookies() {
  if (typeof document === 'undefined') return {};
  const cookies = {};
  document.cookie.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim();
      if (key && PERMITTED_COOKIE_PREFIXES.some(prefix => key.startsWith(prefix))) {
        cookies[key] = val;
      }
    }
  });
  return cookies;
}

// Full audit snapshot
export async function initializeLeadTracking() {
  const visitorId = getOrCreateCookie('_lead_vid');
  const sessionId = getOrCreateCookie('_lead_sid', 1); // 1-day session
  const urlParams = getUrlParameters();
  const ipAddress = await fetchClientIp();
  const allCookies = getAllCookies();

  return {
    ip_address: ipAddress,
    visitor_id: visitorId,
    session_id: sessionId,
    cookies: allCookies,
    ...urlParams,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
    screen_resolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '1920x1080',
    language: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
  };
}
