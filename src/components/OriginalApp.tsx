import React, { useState, useEffect } from 'react';
import { MessageSquare, TrendingUp, Users, CheckCircle, ArrowRight, Play, Shield, RotateCcw, AlertCircle, Gamepad2 } from 'lucide-react';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Footer from './Footer';

// TypeScript declaration for Wistia player
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'media-id': string;
        aspect?: string;
      };
    }
  }
}

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


const OriginalDMChampFunnel = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState<string | undefined>('+31');

  // Load Wistia player scripts
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://fast.wistia.com/player.js';
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/embed/daai3juhjx.js';
    script2.async = true;
    script2.type = 'module';
    document.head.appendChild(script2);

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);
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
  

  
  // Interactive conversation simulator
  const [conversationStep, setConversationStep] = useState(0);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState(false);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);

  // Real conversation from FueGenix - shortened version
  const conversationFlow = [
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Hoi, ik zou graag meer willen weten",
      timestamp: "21:40"
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Ik wil een idee krijgen van de kosten",
      timestamp: "21:40"
    },
    {
      type: 'ai',
      platform: 'whatsapp', 
      message: "Hallo! Ik ben Sohaib, Dr. Munib's assistent",
      timestamp: "21:41",
      typing: true
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Mag ik je naam? En kun je delen wat je specifiek interesseert aan FueGenix?",
      timestamp: "21:41",
      typing: true
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Ik heb goede reviews gelezen van Dr. Munib",
      timestamp: "21:45"
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Maar ik wil zeker weten dat de kosten haalbaar zijn voor mij",
      timestamp: "21:45"
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Ik heb een andere kliniek in Istanbul gezien voor €3.000",
      timestamp: "21:45"
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Bij FueGenix is de startprijs voor een transplantatie €40.000",
      timestamp: "21:51",
      typing: true
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Valt dit binnen je budget?",
      timestamp: "21:51",
      typing: true
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Eerlijk gezegd helaas niet. Het maximum wat ik kan is €10.000",
      timestamp: "21:54"
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Ik begrijp het. Als je situatie verandert, neem gerust contact op",
      timestamp: "21:56",
      typing: true
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Zou het mogelijk zijn om mijn zaak aan Dr. Munib voor te leggen?",
      timestamp: "21:57"
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Onze prijsstructuur is vast vanwege de hoge vraag en kwaliteit",
      timestamp: "21:58",
      typing: true
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "[3 dagen later] Ik heb nog een vraag...",
      timestamp: "23:05"
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Fijn om weer van je te horen! Wat wil je weten?",
      timestamp: "23:06",
      typing: true
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "Is er een beoordeling om te zien of ik überhaupt kwalificeer?",
      timestamp: "23:07"
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Ja, we doen virtuele consulten via Zoom voor €1.000",
      timestamp: "23:12",
      typing: true
    },
    {
      type: 'customer',
      platform: 'whatsapp',
      message: "[1 week later] Ik heb de betaling voltooid",
      timestamp: "21:57"
    },
    {
      type: 'ai',
      platform: 'whatsapp',
      message: "Dank je! Dr. Munib zal binnen 1-2 weken contact opnemen",
      timestamp: "21:59",
      typing: true,
      isBooking: true
    }
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [conversationStep]);

  const startSimulator = () => {
    setIsSimulatorRunning(true);
    setConversationStep(0);
    
    const interval = setInterval(() => {
      setConversationStep(prev => {
        if (prev >= conversationFlow.length - 1) {
          setIsSimulatorRunning(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 2500);
  };

  const resetSimulator = () => {
    setConversationStep(0);
    setIsSimulatorRunning(false);
  };

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
            <div className="inline-flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 mb-8 shadow-2xl">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-white font-medium">Van Counter-Strike video editor naar €100K software business</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-black leading-tight mb-8 text-white">
              Iemand Verdient €2.500/Maand
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient"> Met Mijn Software</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-4xl mx-auto">
              En ik ga je exact laten zien hoe ze het doen. Maar eerst moet ik je vertellen waarom dit überhaupt bestaat. 
              <span className="text-purple-300"> Want als jij bent zoals ik was, heb je waarschijnlijk al van alles geprobeerd - dropshipping, crypto, cursussen - en ben je nog steeds op zoek naar iets dat écht werkt.</span>
            </p>

            {/* Real $40K conversation demo */}
            <div className="max-w-4xl mx-auto mb-16">
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Deze echte conversatie genereerde €40K+ omzet</h3>
                  <div className="flex space-x-3">
                    <button
                      onClick={startSimulator}
                      disabled={isSimulatorRunning}
                      className="bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-300 px-3 py-1.5 rounded-lg transition-all disabled:opacity-50 flex items-center text-sm"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      {isSimulatorRunning ? 'Speelt af...' : 'Bekijk'}
                    </button>
                    <button
                      onClick={resetSimulator}
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-300 px-3 py-1.5 rounded-lg transition-all flex items-center text-sm"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      Reset
                    </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-4 border border-white/10 min-h-[350px]">
                  <div className="flex items-center mb-4">
                    <div className="w-6 h-6 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                      <MessageSquare className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm">WhatsApp Business - FueGenix</span>
                    <div className="ml-auto text-xs text-gray-400">
                      Haartransplantatie kliniek
                    </div>
                  </div>

                  <div 
                    ref={chatContainerRef}
                    className="space-y-1 max-h-64 overflow-y-auto hide-scrollbar"
                  >
                    {conversationFlow.slice(0, conversationStep + 1).map((msg, index) => {
                      const prevMsg = index > 0 ? conversationFlow[index - 1] : null;
                      const isGrouped = prevMsg && prevMsg.type === msg.type;
                      
                      return (
                        <div key={index} className={`flex ${msg.type === 'ai' ? 'justify-end' : 'justify-start'} animate-fadeIn ${isGrouped ? 'mt-1' : 'mt-3'}`}>
                          <div className={`max-w-xs px-3 py-2 rounded-2xl text-sm ${
                            msg.type === 'ai' 
                              ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-left' 
                              : 'bg-white/20 backdrop-blur-xl text-gray-100 border border-white/20 text-left'
                          }`}>
                            {msg.typing && index === conversationStep && (
                              <div className="flex items-center mb-1">
                                <div className="animate-pulse text-xs text-purple-200">AI typt...</div>
                              </div>
                            )}
                            <p className="leading-relaxed">{msg.message}</p>
                            <div className="text-xs opacity-60 mt-1">{msg.timestamp}</div>
                            {msg.isBooking && (
                              <div className="mt-2 bg-white/20 backdrop-blur-xl rounded-lg p-2 text-center border border-white/30">
                                <div className="text-green-300 font-semibold text-xs">$1K Consultatie → $40K Procedure</div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {!isSimulatorRunning && conversationStep >= conversationFlow.length - 1 && (
                    <div className="mt-4 text-center">
                      <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/50 rounded-xl p-3">
                        <div className="text-lg font-bold text-purple-300 mb-1">€40,000+ Procedure Geboekt</div>
                        <div className="text-xs text-gray-300">"Budget te laag" lead → Betalende klant in 14 dagen</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Real Sohaib journey */}
            <div className="space-y-6">
              {/* Real story beginning */}
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Gamepad2 className="w-5 h-5 mr-2 text-purple-400" />
                  Mijn Naam is Sohaib
                </h3>
                
                <div className="space-y-4 text-gray-300">
                  <p className="text-sm leading-relaxed">
                    Mijn journey begon op de vreemdste manier mogelijk. Toen ik 14 was, was ik die jongen die Counter-Strike video edits maakte, probeerde wat geld te verdienen online. 
                    <span className="text-red-400"> Niet bepaald een traditionele ondernemersstart.</span>
                  </p>
                  
                  <p className="text-sm leading-relaxed">
                    Daarna probeerde ik alles. En met alles bedoel ik <span className="text-purple-300">echt alles:</span>
                  </p>
                  
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center p-2 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                      <span><strong>Dropshipping:</strong> €15K eerste maand en daarna niets</span>
                    </div>
                    <div className="flex items-center p-2 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                      <span><strong>Crypto:</strong> Verloor geen geld, maar kreeg constante stress</span>
                    </div>
                    <div className="flex items-center p-2 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      <span><strong>9-to-5:</strong> Thuiskomen uitgeput, nauwelijks energie over</span>
                    </div>
                  </div>
                  
                  <p className="text-sm">
                    Terwijl mijn vrienden carrière maakten, sprong ik van het ene naar het andere. Altijd op zoek naar die ene doorbraak. <span className="text-cyan-400">Altijd net niet.</span>
                  </p>
                </div>
              </div>

              {/* The turning point */}
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Toen Veranderde Alles</h3>
                
                <div className="space-y-4 text-gray-300">
                  <p className="text-sm leading-relaxed">
                    Ongeveer 5 jaar geleden kwam mijn gym partner met een idee. Hij wilde een haartransplantatie kliniek beginnen. Hij vroeg me om te helpen met de digitale kant - website, marketing, het hele pakket.
                  </p>
                  
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <p className="text-green-300 text-sm font-medium">
                      Het werd een gigantisch succes. Voor het eerst in mijn leven was ik betrokken bij iets dat echt werkte.
                    </p>
                  </div>
                  
                  <p className="text-sm leading-relaxed">
                    Na 2 jaar van dit succes dacht ik: "Waarom help ik niet andere klinieken ook?" Leek logisch, toch?
                  </p>
                  
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <p className="text-red-300 text-sm font-medium">
                      Maar hier faalde ik compleet. Deze andere klinieken konden de follow-up niet aan. Uren of dagen om te reageren. Tegen die tijd waren klanten al verder gegaan.
                    </p>
                  </div>
                  
                  <p className="text-sm">
                    Ik zag bedrijven letterlijk geld weggooien omdat ze niet snel genoeg konden reageren op berichten.
                  </p>
                </div>
              </div>

              {/* Current real results */}
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h3 className="text-xl font-bold text-white mb-4">Waar Ik Nu Sta (Echte Cijfers)</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10">
                    <span className="text-gray-300 text-sm">DM Champ jaarlijkse omzet</span>
                    <span className="text-green-400 font-semibold text-sm">~€100.000</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10">
                    <span className="text-gray-300 text-sm">Klanten wereldwijd</span>
                    <span className="text-cyan-400 font-semibold text-sm">Klinieken, restaurants, winkels</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl border border-white/10">
                    <span className="text-gray-300 text-sm">Eerste whitelabel partner</span>
                    <span className="text-purple-400 font-semibold text-sm">€2.500/maand</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-yellow-300 text-xs">
                      2 jaar ontwikkeling. Computer Engineering achtergrond. Dit is geen overnight success verhaal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Honest skepticism */}
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <h4 className="text-white font-semibold mb-3">Je Denkt Waarschijnlijk...</h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>"Waarom zou hij dit delen als het zo goed werkt?"</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>"1 succesvolle partner is geen bewijs"</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>"Dit klinkt te goed om waar te zijn"</span>
                  </div>
                </div>
                <p className="text-purple-300 text-sm mt-4 font-medium">
                  Fair enough. Ik zou hetzelfde denken. Daarom ga ik je mijn hele verhaal vertellen en exact laten zien hoe dit werkt...
                </p>
              </div>
            </div>

            {/* Right: Honest lead capture */}
            <div className="sticky top-8">
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 shadow-2xl">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-4">
                    <span className="text-purple-300 font-medium text-sm">Het Complete Verhaal</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-3">Van Counter-Strike naar €100K Business</h2>
                  <p className="text-gray-300 text-sm mb-4">
                    Hoe ik in 2 jaar een chat automation software bouwde die nu €100K/jaar maakt (en waarom ik nu partners zoek)
                  </p>

                  <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-xl border border-purple-500/50 rounded-2xl p-4 mb-4">
                    <div className="text-2xl font-bold text-white mb-1">20 Minuten</div>
                    <div className="text-xs text-gray-400">Mijn complete journey + live demo</div>
                    <div className="text-purple-400 font-semibold text-sm">Alleen voor serieuze mensen</div>
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
                        Vertel Me Het Complete Verhaal
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
                        <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                        <span>Hoe ik van mislukkingen naar $100K business ging</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                        <span>Waarom één partner €2.500/maand verdient</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-2 text-purple-400" />
                        <span>De eerlijke tijdlijn en investeringen</span>
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
          <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden mb-6 border border-white/10" style={{ aspectRatio: '1.7777777777777777' }}>
            {React.createElement('wistia-player', {
              'media-id': 'daai3juhjx',
              'aspect': '1.7777777777777777',
              className: 'absolute inset-0 w-full h-full rounded-2xl'
            })}
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
      
      <style dangerouslySetInnerHTML={{
        __html: `
          wistia-player[media-id='daai3juhjx']:not(:defined) { 
            background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/daai3juhjx/swatch'); 
            display: block; 
            filter: blur(5px); 
            padding-top: 56.25%; 
          }
          
          /* Increased word-spacing for all text */
          * {
            word-spacing: 0.1em !important;
          }
          
          /* Extra word spacing for headings */
          h1, h2, h3, h4, h5, h6 {
            word-spacing: 0.15em !important;
          }
          
          /* Button text word spacing */
          button, .button {
            word-spacing: 0.12em !important;
          }
        `
      }} />
    </div>
  );
};

export default OriginalDMChampFunnel;