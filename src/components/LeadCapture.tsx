import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle, MessageCircle, TrendingUp, Target, Users, Zap, Eye, ThumbsDown, ThumbsUp, Clock } from 'lucide-react';
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

// Utility to get Facebook Click ID - check _fbc cookie first, then URL
const getFacebookClickId = () => {
  // First, try to get _fbc cookie (already properly formatted)
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === '_fbc' && value) {
      return value;
    }
  }
  
  // Fallback: get from URL and format properly
  const urlParams = new URLSearchParams(window.location.search);
  const fbclid = urlParams.get('fbclid');
  
  if (!fbclid) {
    return '';
  }
  
  // Format as fb.{subdomainIndex}.{timestamp}.{fbclid}
  // Use subdomain index 1 and current timestamp
  const timestamp = Math.floor(Date.now() / 1000);
  return `fb.1.${timestamp}.${fbclid}`;
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
      const response = await fetch('https://submit-form.com/5PhqtfLk0', {
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
          <h1 className="text-3xl lg:text-5xl font-black leading-tight mb-8 text-white">
            <span className="text-red-400">Dit 'Te Goed Om Legaal Te Blijven' WhatsApp Systeem</span><br/>
            Is Zo Oneerlijk Effectief, Het Voelt Als 
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent animate-gradient"> Valsspelen</span>
          </h1>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
            <span className="text-white font-bold">(Maar Is 100% Legaal... Nog. Gebruik Het Nu Het Nog Mag)</span>
          </p>
          
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left: Simple opportunity */}
          <div className="space-y-8">
            {/* What you'll learn */}
            <div className="bg-blue-500/10 backdrop-blur-3xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-blue-300 mb-4">In Deze 15-Minuten Presentatie Ontdek Je:</h3>
              
              <div className="space-y-4 text-gray-300">
                <div className="space-y-3">
                  <div className="flex items-start text-left">
                    <MessageCircle className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-sm"><strong>Minuut 3:47</strong> - Het exacte WhatsApp gesprek dat een €40.000 deal sloot (terwijl de eigenaar thuis was)</span>
                  </div>
                  <div className="flex items-start text-left">
                    <TrendingUp className="w-4 h-4 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-sm"><strong>Minuut 7:15</strong> - Waarom ik op mijn 17e al €30.000 per maand verdiende (en wat dit met jouw business te maken heeft)</span>
                  </div>
                  <div className="flex items-start text-left">
                    <Target className="w-4 h-4 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-sm"><strong>Minuut 11:23</strong> - De 3-stappen setup die je business automatiseert in letterlijk 5 minuten</span>
                  </div>
                  <div className="flex items-start text-left">
                    <Users className="w-4 h-4 text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-sm"><strong>Minuut 13:45</strong> - Live voorbeelden: van fietsenmaker tot online coach</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Not for everyone section */}
            <div className="bg-orange-500/10 backdrop-blur-3xl border border-orange-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-orange-300 mb-4">Dit Is Niet Voor Iedereen:</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-red-300 font-semibold mb-2 text-left">NIET kijken als je:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start text-left">
                      <Users className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Geen bestaande klantenstroom hebt</span>
                    </div>
                    <div className="flex items-start text-left">
                      <Clock className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Tevreden bent met 60+ uur werken</span>
                    </div>
                    <div className="flex items-start text-left">
                      <Eye className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Denkt dat AI "onpersoonlijk" is</span>
                    </div>
                    <div className="flex items-start text-left">
                      <ThumbsDown className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Vindt dat dit soort voordelen "oneerlijk" zijn</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-green-300 font-semibold mb-2 text-left">WEL kijken als je:</h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-start text-left">
                      <Zap className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Een oneerlijk voordeel wilt (en daar OK mee bent)</span>
                    </div>
                    <div className="flex items-start text-left">
                      <Clock className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Eindelijk je avonden terug wilt</span>
                    </div>
                    <div className="flex items-start text-left">
                      <TrendingUp className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Klaar bent om meer te verdienen met minder werk</span>
                    </div>
                    <div className="flex items-start text-left">
                      <ThumbsUp className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                      <span>Begrijpt dat "eerst komen, eerst malen" vooral met technologie geldt</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* AI truth section */}
            <div className="bg-purple-500/10 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
              <h3 className="text-xl font-bold text-purple-300 mb-4">De Waarheid Over AI in 2025:</h3>
              
              <div className="space-y-3 text-gray-300">
                <p className="text-sm text-left">Het CBS meldt: <span className="text-blue-300 font-semibold">25% van bedrijven gebruikt nu AI</span>.</p>
                <p className="text-sm text-left">De Universiteit van Amsterdam voorspelt: in 2030 wordt <span className="text-yellow-300 font-semibold">67% van het werk door AI gedaan</span>.</p>
                <p className="text-sm text-left">De EU onderzoekt al of AI systemen zoals deze <span className="text-red-300 font-semibold">"te veel voordeel" geven</span>.</p>
                
                <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mt-4">
                  <p className="text-white font-semibold text-sm mb-2 text-left">Dit is geen toekomstmuziek. Dit gebeurt NU.</p>
                  <p className="text-gray-300 text-sm text-left">En terwijl jij twijfelt, implementeren je concurrenten het al.</p>
                </div>
                
                <p className="text-red-300 font-semibold text-sm italic mt-4 text-center">"Als iedereen dit zou gebruiken, zou de hele marketing industrie instorten."</p>
              </div>
            </div>

          </div>

          {/* Right: Honest lead capture */}
          <div className="sticky top-8">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-white/10 transition-all duration-300">
              <div className="text-center mb-6">
                <div className="inline-flex items-center bg-green-500/20 border border-green-500/50 rounded-full px-4 py-2 mb-4">
                  <span className="text-green-300 font-medium text-sm">👇 Claim Je Gratis Presentatie + Live Demo</span>
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-3">Vul Je Gegevens In Voor Directe Toegang</h2>
                <p className="text-gray-300 text-sm mb-4 text-left">
                  Krijg direct toegang tot de volledige 15-minuten training van Sohaib, een persoonlijke demo van het WhatsApp systeem, en exacte stappen voor jouw business.
                </p>

                {/* Thumbnail Image */}
                <div className="mb-4">
                  <img 
                    src="/thumbnail.avif" 
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
                      Ja, Geef Mij Dit Oneerlijke Voordeel
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
                  <div className="text-white font-medium mb-2 text-sm text-left">Direct na aanmelding krijg je:</div>
                  <div className="space-y-1 text-xs text-gray-300">
                    <div className="flex items-center text-left">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      <span><strong>De volledige 15-minuten training van Sohaib</strong></span>
                    </div>
                    <div className="flex items-center text-left">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      <span><strong>Een persoonlijke demo van het WhatsApp systeem</strong></span>
                    </div>
                    <div className="flex items-center text-left">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      <span><strong>Exacte stappen voor jouw business</strong></span>
                    </div>
                    <div className="flex items-center text-left">
                      <CheckCircle className="w-3 h-3 mr-2 text-green-400" />
                      <span><strong>Onze speciale early-adopter aanbieding</strong></span>
                    </div>
                  </div>
                  
                  <div className="border-t border-white/10 mt-3 pt-3">
                    <p className="text-xs text-gray-400 mb-2 text-left"><strong>P.S.</strong> Sohaib heeft FueGenix persoonlijk geholpen groeien van €0 naar €8 miljoen. Hij heeft met klinieken van Miami tot Dubai gewerkt. Als premium praktijken willen groeien, komen ze naar hem. Nu deelt hij exact hetzelfde systeem met jou.</p>
                    
                    <p className="text-xs text-orange-300 mb-2 text-left"><strong>P.P.S.</strong> Marketing bureaus haten dit systeem. Logisch - hun klanten betalen €3000/maand voor wat jij straks zelf doet. We weten niet hoe lang we deze informatie kunnen blijven delen.</p>
                    
                    <p className="text-xs text-red-300 text-left"><strong>P.P.P.S.</strong> Elke dag uitstel = gemiste leads, verloren omzet, en nog een avond achter je laptop. De keuze is aan jou.</p>
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