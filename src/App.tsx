import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, CheckCircle, ArrowRight, Shield, AlertCircle, Gamepad2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Footer from './components/Footer';

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


const DMChampFunnel = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
        content_name: 'DM Champ Partner Application',
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
          source: 'DM Champ Real Story Funnel',
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
        setCurrentPage(2);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setCurrentPage(2);
    }
    
    setIsSubmitting(false);
  };

  if (currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12">
          {/* Real story-driven hero */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-red-500/20 backdrop-blur-xl border border-red-500/50 rounded-full px-6 py-3 mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mr-3 flex-shrink-0"></div>
              <span className="text-white font-medium text-center">WAARSCHUWING: Dit bericht wordt binnenkort offline gehaald</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-8 text-white">
              Ik Maak Een Paar Mensen
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent animate-gradient"> €2.500/Maand Rijker</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
              <span className="text-red-300 font-bold">Brutaal eerlijk:</span> Terwijl jij dit leest, verdient mijn eerste partner €2.500/maand met software die ik hem heb gegeven.
              <span className="text-yellow-300"> En ja, ik ga dit nog een paar keer doen voor de juiste mensen.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Simple opportunity */}
            <div className="space-y-6">
              {/* The brutal truth */}
              <div className="bg-red-500/10 backdrop-blur-3xl border border-red-500/30 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">De Harde Waarheid</h3>
                
                <div className="space-y-4 text-gray-300">
                  <p className="text-sm leading-relaxed">
                    <span className="text-red-300 font-bold">Feit:</span> Bedrijven verliezen dagelijks duizenden euro's omdat ze te langzaam reageren op klanten.
                  </p>
                  
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm font-medium">
                      Mijn software lost dat op. Mijn partner verdient €2.500/maand door het te verkopen.
                    </p>
                  </div>
                  
                  <p className="text-sm">
                    <span className="text-yellow-400">De keuze is simpel:</span> Jij pakt deze kans, of iemand anders doet het.
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Honest lead capture */}
            <div className="sticky top-8">
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-4">
                    <span className="text-purple-300 font-medium text-sm">Het Complete Verhaal</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">€2.500/Maand. Bewezen. Echt.</h2>
                  <p className="text-gray-300 text-sm mb-4">
                    <strong>Geen bullshit. Geen valse beloftes.</strong> Ik laat je de bankafschriften zien van mijn partner.
                  </p>

                  <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-500/50 rounded-2xl p-4 mb-4">
                    <div className="text-2xl font-bold text-white mb-1">BEPERKTE PLEKKEN</div>
                    <div className="text-xs text-gray-400">Nog maar een paar partners</div>
                    <div className="text-red-400 font-semibold text-sm">Daarna definitief gestopt</div>
                  </div>

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
                      placeholder="Je voornaam"
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
                      placeholder="Je email adres"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-sm autofill-transparent"
                    />
                  </div>

                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500/50 focus-within:border-purple-500/50 transition-all">
                    <PhoneInput
                      placeholder="Je telefoonnummer"
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
                        LAAT ZIEN DAT HET ECHT IS
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
                    <div className="text-white font-medium mb-2 text-sm">Wat je zult leren:</div>
                    <div className="space-y-1 text-xs text-gray-300">
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-red-400" />
                        <span><strong>Bankafschriften</strong> van €2.500/maand partner</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-red-400" />
                        <span><strong>Exacte blueprint</strong> die hij gebruikt</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-red-400" />
                        <span><strong>Waarom dit</strong> de laatste keer is</span>
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
  }

  // Page 2: Full honest VSL based on real script
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16">
        {/* Honest VSL Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 shadow-2xl">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse mr-3"></div>
            <span className="text-white font-medium">Hoi {name}, hier is waarom dit video bestaat...</span>
          </div>
          
            <h1 className="text-4xl lg:text-5xl font-black mb-6 text-white">
            Van Counter-Strike Video Editor naar
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> €100K Software Business</span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Mijn complete journey, waarom ik dit deel, en hoe jij de tweede succesvolle partner kunt worden
          </p>
        </div>

        {/* Authentic story-driven VSL */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-8 mb-12 shadow-2xl">
          <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden mb-6 border border-white/10" style={{ aspectRatio: '1.775926' }}>
            <iframe
              src="https://embed.voomly.com/embed/assets/embed.html?videoId=BojbJA4KXK7IxxxxCBGQr5raGMDBEyGhmN5UxgIoXJLocH86Z&videoRatio=1.775926&type=v&skinColor=rgba(37%2C211%2C102%2C1)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full rounded-2xl"
              style={{
                border: 'none'
              }}
            />
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-lg mb-4">
              Geen verkoop tactieken. Geen nep urgentie. Gewoon mijn verhaal en waarom ik nu een tweede partner zoek.
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Gamepad2 className="w-4 h-4 mr-2 text-purple-400" />
                <span>Counter-Strike start</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-2 text-cyan-400" />
                <span>€100K/jaar business</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-pink-400" />
                <span>1 succesvolle partner</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brutal honesty section */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Dit IS Voor Jou Als:
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je hebt minstens €50 om te investeren</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je begrijpt dat dit geen overnight success is</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je kunt 6 maanden consistent werken</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je wilt echte waarde leveren aan bedrijven</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              Dit is NIET Voor Jou Als:
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je hebt €0 op je rekening staan</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je zoekt 'passive income' zonder werk</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je wilt binnen een maand resultaten</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je kunt geen 'nee' van prospects hanteren</span>
              </div>
            </div>
          </div>
        </div>

        {/* Community invitation (not sales pitch) */}
        <div className="bg-gradient-to-br from-purple-900/50 to-cyan-900/50 backdrop-blur-3xl border border-purple-500/50 rounded-3xl p-8 text-center shadow-2xl">
          <h3 className="text-3xl font-black mb-4 text-white">Word De Tweede Succesvolle Partner</h3>
          <p className="text-xl text-purple-200 mb-8">
            Onze eerste partner verdient €2.500/maand. Het is bewezen dat het werkt. De vraag is: ben jij de volgende?
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-purple-400 mb-2">€47</div>
              <div className="text-white text-sm">Per maand</div>
              <div className="text-xs text-gray-400 mt-1">Community toegang</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-white text-sm">Whitelabel</div>
              <div className="text-xs text-gray-400 mt-1">Jouw merk, jouw klanten</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-pink-400 mb-2">Echt</div>
              <div className="text-white text-sm">Support</div>
              <div className="text-xs text-gray-400 mt-1">Wekelijkse calls</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-white mb-2">Klaar om te starten?</div>
              <div className="text-gray-300 text-sm mb-4">Stuur me het woord hieronder via WhatsApp:</div>
              
              <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-2 border-purple-500/50 rounded-xl p-4 mb-4">
                <div className="text-3xl font-black text-white mb-2">PARTNER</div>
                <div className="text-xs text-gray-300">Kopieer en plak dit woord in WhatsApp</div>
              </div>
              
              <a 
                href="https://wa.me/31616834455?text=PARTNER" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:text-white font-bold py-4 px-8 rounded-2xl text-lg transform hover:scale-105 transition-all shadow-2xl mb-4"
              >
                📱 Open WhatsApp & Stuur "PARTNER"
              </a>
            </div>
          </div>
          
          <p className="text-sm text-purple-200 mb-4">
            Eerlijk: Ik verwacht dat de meeste mensen dit niet zullen doen. En dat is prima.
          </p>
          
          <div className="text-gray-400 text-sm">
            Na je bericht krijg je direct toegang tot:<br/>
            • Complete partner onboarding<br/>
            • Whitelabel software demo<br/>
            • Eerste maand strategie call
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );

};

export default DMChampFunnel;