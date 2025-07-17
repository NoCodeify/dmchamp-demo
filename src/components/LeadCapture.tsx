import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Footer from './Footer';

// Meta Pixel utilities
declare global {
  interface Window {
    fbq: (action: string, event: string, params?: Record<string, unknown>, options?: Record<string, unknown>) => void;
  }
}

const generateEventId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// Utility to get UTM parameters from URL
const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_term: urlParams.get('utm_term') || '',
    utm_content: urlParams.get('utm_content') || '',
  };
};

// Utility to get Facebook Click ID from URL
const getFacebookClickId = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('fbclid') || '';
};

// Utility to get Facebook Browser ID from cookies
const getFacebookBrowserId = () => {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbp') {
      return value;
    }
  }
  return '';
};

// Utility to get client IP address
const getClientIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || '';
  } catch (error) {
    console.warn('Could not fetch IP address:', error);
    return '';
  }
};

// Utility to get comprehensive tracking data
const getTrackingData = async () => {
  const utmParams = getUTMParameters();
  const fbc = getFacebookClickId();
  const fbp = getFacebookBrowserId();
  const clientIP = await getClientIP();
  
  return {
    ...utmParams,
    fbc,
    fbp,
    client_ip_address: clientIP,
    client_user_agent: navigator.userAgent,
    page_url: window.location.href,
    page_referrer: document.referrer,
    page_title: document.title,
  };
};

const LeadCapture: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<string | undefined>('+31');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventId, setEventId] = useState<string>('');
  const [trackingData, setTrackingData] = useState<Record<string, unknown>>({});

  // Generate unique event ID and collect tracking data
  useEffect(() => {
    setEventId(generateEventId());
    
    // Collect tracking data on component mount
    getTrackingData().then(data => {
      setTrackingData(data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !phone || (phone && !isValidPhoneNumber(phone))) return;
    setIsSubmitting(true);
    
    // Track Meta Pixel Lead event with comprehensive attribution data
    if (window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'WhatsApp AI Whitelabel Partner Application',
        content_category: 'Lead Form',
        value: 47.00,
        currency: 'EUR',
        // Add attribution data for better tracking
        external_id: eventId,
        fbc: trackingData.fbc || '',
        fbp: trackingData.fbp || '',
        client_ip_address: trackingData.client_ip_address || '',
        client_user_agent: trackingData.client_user_agent || '',
        page_url: trackingData.page_url || '',
        page_referrer: trackingData.page_referrer || '',
        custom_data: {
          utm_source: trackingData.utm_source || '',
          utm_medium: trackingData.utm_medium || '',
          utm_campaign: trackingData.utm_campaign || '',
          utm_term: trackingData.utm_term || '',
          utm_content: trackingData.utm_content || '',
        }
      }, {
        eventID: eventId
      });
    }
    
    // Submit to Formspark with comprehensive tracking data
    try {
      const response = await fetch('https://submit-form.com/3lpsJaFF8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          source: 'WhatsApp AI Whitelabel Partner Funnel',
          // Meta conversion API data
          meta_event_id: eventId,
          meta_pixel_id: '1533692663974167',
          // Attribution data
          ...trackingData,
          // Additional tracking
          submitted_at: new Date().toISOString(),
          page_title: document.title,
        }),
      });
      
      if (response.ok) {
        // Navigate to video page with user name
        navigate(`/video?name=${encodeURIComponent(name)}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      // Navigate to video page even on error
      navigate(`/video?name=${encodeURIComponent(name)}`);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-12">
        {/* WhatsApp AI Whitelabel hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-red-500/20 backdrop-blur-xl border border-red-500/50 rounded-full px-6 py-3 mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-3 flex-shrink-0"></div>
            <span className="text-white font-medium text-center">WAARSCHUWING: Deze video gaat binnenkort offline</span>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-8 text-white">
            <span className="text-red-400">DRINGEND: ONTHULD! 💡</span><br/>
            Het WhatsApp AI Whitelabel Programma Waarmee Je 
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient"> Maandelijks €2.000 Tot €5.000+</span> Kunt Verdienen
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
            <span className="text-purple-300 font-bold">Door Lokale Bedrijven Te Helpen 💸</span><br/>
            <span className="text-gray-400">(Terwijl Jij Alleen Klanten Werft En Wij Al Het Technische Werk Doen!)</span>
          </p>
          
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
              <p className="text-lg text-white mb-4">
                <strong>Klinkt bizar, maar...</strong>
              </p>
              <p className="text-gray-300 mb-6">
                Toen ik dit voor het eerst zag, dacht ik dat het onmogelijk was. Tot ik zag hoe normale mensen €200-€500 per maand per klant verdienen zonder technische kennis.
              </p>
              <p className="text-yellow-300 font-semibold">
                Ik toon je een manier om geld te verdienen die zo makkelijk is dat het bijna 'oneerlijk' lijkt.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Simple opportunity */}
          <div className="space-y-6">
            {/* What you'll learn */}
            <div className="bg-purple-500/10 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">Ik ontvang €1.500 per maand van één klant, en jij kunt hetzelfde doen.</h3>
              
              <div className="space-y-4 text-gray-300">
                <p className="text-sm leading-relaxed text-white font-medium mb-4">
                  In deze korte video zie je:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Hoe je €200-€500 per maand per klant verdient met jouw eigen gebrandede WhatsApp AI systeem</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Waarom 75% van de bedrijven nog moet beginnen met AI (CBS-rapport) - een goudmijn aan klanten!</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Hoe je in 3 simpele stappen start zonder technische kennis</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Echte voorbeelden van partners die €2.000-€5.000 per maand verdienen</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm">Complete strategie voor kappers, restaurants, coaches, schoonheidssalons en meer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency warning */}
            <div className="bg-red-500/10 backdrop-blur-3xl border border-red-500/30 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-red-300 mb-4">⚠️ WAARSCHUWING</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                Deze video gaat binnenkort offline. Deze exclusieve kans is beperkt tot slechts <span className="text-red-400 font-bold">17 whitelabel partners</span> om concurrentie te voorkomen.
              </p>
              <p className="text-sm text-yellow-300 mt-3">
                Grote spelers proberen ons systeem al te kopiëren!
              </p>
            </div>

          </div>

          {/* Right: Honest lead capture */}
          <div className="sticky top-8">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-4">
                  <span className="text-purple-300 font-medium text-sm">Direct Toegang Tot Het Whitelabel Partnerprogramma</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">Vul Je Gegevens In Om Direct Toegang Te Krijgen</h2>
                <p className="text-gray-300 text-sm mb-4">
                  <strong>Whitelabel Partnerprogramma:</strong> Verdien €2.000-€5.000 per maand door lokale bedrijven te helpen met hun WhatsApp AI systeem.
                </p>

                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-500/50 rounded-2xl p-4 mb-4">
                  <div className="text-2xl font-bold text-white mb-1">BEPERKT TOT 17 PARTNERS</div>
                  <div className="text-xs text-gray-400">Exclusieve kans om concurrentie te voorkomen</div>
                  <div className="text-red-400 font-semibold text-sm">Daarna definitief gestopt</div>
                </div>

                {/* Thumbnail Image */}
                <div className="mb-4">
                  <img 
                    src="/thumbnew.avif" 
                    alt="Preview" 
                    className="w-full rounded-2xl shadow-lg border border-white/10"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Hidden fields for Meta Conversion API deduplication and attribution */}
                <input type="hidden" name="meta_event_id" value={eventId} />
                <input type="hidden" name="meta_pixel_id" value="1533692663974167" />
                
                {/* UTM and attribution data */}
                <input type="hidden" name="utm_source" value={trackingData.utm_source as string || ''} />
                <input type="hidden" name="utm_medium" value={trackingData.utm_medium as string || ''} />
                <input type="hidden" name="utm_campaign" value={trackingData.utm_campaign as string || ''} />
                <input type="hidden" name="utm_term" value={trackingData.utm_term as string || ''} />
                <input type="hidden" name="utm_content" value={trackingData.utm_content as string || ''} />
                
                {/* Facebook tracking IDs */}
                <input type="hidden" name="fbc" value={trackingData.fbc as string || ''} />
                <input type="hidden" name="fbp" value={trackingData.fbp as string || ''} />
                
                {/* Client data */}
                <input type="hidden" name="client_ip_address" value={trackingData.client_ip_address as string || ''} />
                <input type="hidden" name="client_user_agent" value={trackingData.client_user_agent as string || ''} />
                <input type="hidden" name="page_url" value={trackingData.page_url as string || ''} />
                <input type="hidden" name="page_referrer" value={trackingData.page_referrer as string || ''} />
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50 transition-all">
                  <input
                    type="text"
                    placeholder="Voornaam..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="given-name"
                    className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm autofill-transparent"
                  />
                </div>
                
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50 transition-all">
                  <input
                    type="email"
                    placeholder="Emailadres..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm autofill-transparent"
                  />
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50 transition-all">
                  <PhoneInput
                    placeholder="WhatsApp Nummer..."
                    value={phone}
                    onChange={setPhone}
                    defaultCountry="NL"
                    international
                    countryCallingCodeEditable={false}
                    autoComplete="tel"
                    className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm phone-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={Boolean(isSubmitting || !email || !name || !phone || (phone && !isValidPhoneNumber(phone)))}
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-600 hover:from-purple-600 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-2xl text-sm"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Even geduld...
                    </div>
                  ) : (
                    <>
                      JA, TOON MIJ HOE IK €2.000-€5.000 PER MAAND KAN VERDIENEN ALS WHITELABEL PARTNER!
                      <ArrowRight className="w-4 h-4 ml-2 inline" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4">
                <div className="flex items-center justify-center text-gray-400 text-xs mb-3">
                  <Shield className="w-3 h-3 mr-2" />
                  <span>Geen spam • Eerlijk verhaal • Echte cijfers</span>
                </div>
                
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3">
                  <div className="text-white font-medium mb-2 text-sm">Door je in te schrijven krijg je toegang tot het complete whitelabel pakket inclusief:</div>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                      <span><strong>Je eigen gebrandede systeem</strong></span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                      <span><strong>100+ voorgeselecteerde leads</strong></span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                      <span><strong>Bewezen verkoopscripts</strong></span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                      <span><strong>Persoonlijke strategie-sessie</strong></span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                      <span><strong>Alle exclusieve bonussen</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
          .animate-gradient { 
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
          .autofill-transparent:-webkit-autofill,
          .autofill-transparent:-webkit-autofill:hover,
          .autofill-transparent:-webkit-autofill:focus,
          .autofill-transparent:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: white !important;
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: white !important;
            background: transparent !important;
            background-color: transparent !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
          
          /* Extra word spacing for headings */
          h1, h2, h3, h4, h5, h6 {
            word-spacing: 0.1em !important;
          }
        `
      }} />
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Global autofill override - nuclear option */
          * {
            -webkit-box-shadow: none !important;
          }
          *:-webkit-autofill,
          *:-webkit-autofill:hover,
          *:-webkit-autofill:focus,
          *:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: white !important;
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
          .phone-input .PhoneInputInput {
            background: transparent !important;
            border: none !important;
            color: white !important;
            font-size: 0.875rem !important;
            padding: 0 !important;
            outline: none !important;
          }
          .phone-input .PhoneInputInput:-webkit-autofill,
          .phone-input .PhoneInputInput:-webkit-autofill:hover,
          .phone-input .PhoneInputInput:-webkit-autofill:focus,
          .phone-input .PhoneInputInput:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
            -webkit-text-fill-color: white !important;
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            transition: background-color 5000s ease-in-out 0s !important;
          }
          .phone-input .PhoneInputInput[data-com-onepassword-filled],
          .phone-input .PhoneInputInput[data-com-onepassword-filled]:hover,
          .phone-input .PhoneInputInput[data-com-onepassword-filled]:focus {
            background: transparent !important;
            background-color: transparent !important;
            box-shadow: none !important;
          }
          .phone-input .PhoneInputInput::placeholder {
            color: rgb(156, 163, 175) !important;
          }
          .phone-input .PhoneInputCountrySelect {
            background: transparent !important;
            border: none !important;
            color: white !important;
            outline: none !important;
            margin-right: 0.5rem !important;
          }
          .phone-input .PhoneInputCountrySelectArrow {
            color: white !important;
          }
          .phone-input .PhoneInputCountryIcon {
            width: 1.2em !important;
            height: 1.2em !important;
            background: transparent !important;
            border-radius: 0 !important;
          }
          .phone-input .PhoneInputCountryIcon img {
            background: transparent !important;
            border-radius: 0 !important;
          }
          .phone-input .PhoneInputCountryIconImg {
            background: transparent !important;
            border-radius: 0 !important;
          }
        `
      }} />
    </div>
  );
};

export default LeadCapture;