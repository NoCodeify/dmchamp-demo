import React, { useEffect } from 'react';
import { TrendingUp, Users, CheckCircle, AlertCircle } from 'lucide-react';
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

const VideoPage: React.FC = () => {

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Load Wistia player scripts
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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-16">
        {/* Urgent Warning Header */}
        <div className="text-center mb-12">
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/50 rounded-2xl px-6 py-4 mb-8 shadow-2xl">
            <div className="flex items-center justify-center mb-2">
              <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse mr-3"></div>
              <span className="text-red-300 font-bold text-lg">⚠️ WAARSCHUWING</span>
            </div>
            <p className="text-white font-medium text-sm">
              ALS JE DEZE PAGINA VERLAAT, VERLIES JE VOORGOED TOEGANG TOT DEZE EXCLUSIEVE KANS
            </p>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-black mb-6 text-white leading-tight">
            🔥 ALS JE DIT OP {new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' }).toUpperCase()} BEKIJKT, KUN JE AL 
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> 5-10 BETALENDE KLANTEN</span> HEBBEN VÓÓR {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long' }).toUpperCase()} TERWIJL WIJ AL HET TECHNISCHE WERK DOEN! 🔥
          </h1>
          
          <div className="bg-yellow-500/20 backdrop-blur-xl border border-yellow-500/50 rounded-2xl px-6 py-4 mb-8 shadow-2xl max-w-3xl mx-auto">
            <p className="text-yellow-300 font-bold text-lg">
              (JIJ BENT 1 VAN DE SLECHTS 17 MENSEN DIE VANDAAG DEZE VIDEO MAG BEKIJKEN! - NIET DELEN AUB!)
            </p>
          </div>
          
          <div className="bg-purple-500/20 backdrop-blur-xl border border-purple-500/50 rounded-2xl px-6 py-4 mb-8 shadow-2xl">
            <p className="text-purple-300 font-bold text-lg mb-2">
              ⏱️ KIJK TOT HET EINDE VOOR IETS ECHT GEKS
            </p>
            <p className="text-white font-medium text-xl">
              START NU JOUW €2.000-€5.000/MAAND PASSIEVE INKOMSTENSTROOM ZONDER TECHNISCHE KENNIS
            </p>
          </div>
        </div>

        {/* WhatsApp AI Business Video */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-2 sm:p-8 mb-12 shadow-2xl">
          <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-white/10" style={{ aspectRatio: '1.7777777777777777' }}>
            {React.createElement('wistia-player', {
              'media-id': 'daai3juhjx',
              'aspect': '1.7777777777777777',
              className: 'absolute inset-0 w-full h-full rounded-2xl'
            })}
          </div>

          <div className="text-center">
            <p className="text-yellow-300 text-lg mb-4 font-bold">
              🎯 EXCLUSIEVE TRAINING: Van €0 naar €5.000/maand in 30 dagen met WhatsApp AI
            </p>
            <p className="text-gray-300 text-sm mb-4">
              Ontdek hoe jij zonder technische kennis een passieve inkomstenstroom opbouwt door lokale bedrijven te helpen met hun WhatsApp AI automatisering.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-400" />
                <span>€2.000-€5.000/maand</span>
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
                <span>Whitelabel systeem</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-purple-400" />
                <span>Geen technische kennis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Before / After Transformation */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-red-500/10 backdrop-blur-3xl border border-red-500/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
              VOOR Je WhatsApp AI Partner Wordt:
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Constant stress over geld en hoe je eindelijk financiële vrijheid kunt bereiken...</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Tijd ruilen voor geld in een 9-to-5 job zonder echte toekomstperspectief...</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Gefrustreerd kijken naar anderen die wél online geld verdienen...</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Geen idee hebben hoe je moet beginnen met ondernemen...</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Bang zijn om geld te investeren in jezelf en je toekomst...</span>
              </div>
            </div>
          </div>

          <div className="bg-green-500/10 backdrop-blur-3xl border border-green-500/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              NA Je WhatsApp AI Partner Wordt:
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Zelfvertrouwen om bedrijven te benaderen met een waardevolle oplossing!</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Passief inkomen van €2.000-€5.000 per maand zonder technische kennis!</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Eindelijk financiële vrijheid en tijd om te doen wat je leuk vindt!</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je eigen business waar JIJ de baas bent en je eigen uurloon bepaalt!</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Trots kunnen zijn op je ondernemersucces en anderen kunnen inspireren!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Traditional For You / Not For You */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-green-500/10 backdrop-blur-3xl border border-green-500/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
              Dit IS Voor Jou Als:
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je GELOOFT dat je meer verdient dan je huidige situatie</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je bent KLAAR om actie te ondernemen voor je financiële vrijheid</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je wilt deel uitmaken van een ELITE groep van €5.000/maand verdienende partners</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je hebt de AMBITIE om jezelf te bewijzen als succesvolle ondernemer</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je bent BEREID om de stappen te volgen die anderen al succesvol hebben gemaakt</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-500/10 backdrop-blur-3xl border border-yellow-500/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-yellow-400" />
              Dan Kun Je Beter Wegklikken Als:
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je bent tevreden met je huidige financiële situatie</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je wilt liever klagen dan actie ondernemen</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je gelooft niet dat JIJ ook €2.000-€5.000 per maand kunt verdienen</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je bent bang voor succes en wat mensen zullen denken</span>
              </div>
              <div className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Je zoekt excuses in plaats van mogelijkheden</span>
              </div>
            </div>
          </div>
        </div>

        {/* URGENT WhatsApp AI Business CTA */}
        <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 backdrop-blur-3xl border border-red-500/50 rounded-3xl p-8 text-center shadow-2xl">
          <div className="bg-yellow-500/20 backdrop-blur-xl border border-yellow-500/50 rounded-2xl px-6 py-4 mb-6">
            <h3 className="text-2xl font-black mb-2 text-white">🚨 LAATSTE KANS - SLUIT VANDAAG NOG AAN! 🚨</h3>
            <p className="text-yellow-300 font-bold text-lg">
              Er zijn nog maar 3 plekken over van de 17 exclusieve whitelabel partners
            </p>
          </div>
          
          <h3 className="text-4xl font-black mb-6 text-white">
            START NU JOUW €2.000-€5.000/MAAND WHITELABEL AI BUSINESS
          </h3>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
            <div className="text-center">
              <div className="text-xl font-bold text-white mb-4">
                Stuur simpelweg "WHITELABEL" naar +31 6 16834455 en ontvang direct toegang tot jouw eigen WhatsApp AI business
              </div>
              
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500/50 rounded-xl p-4 sm:p-6 mb-6">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-2 break-words">WHITELABEL</div>
                <div className="text-xs sm:text-sm text-gray-300">👆 Kopieer dit woord en stuur naar WhatsApp</div>
              </div>
              
              <a 
                href="https://wa.me/31616834455?text=WHITELABEL" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:text-white font-bold py-6 px-8 rounded-2xl text-xl transform hover:scale-105 transition-all shadow-2xl mb-4"
                onClick={() => {
                  // Track Meta Pixel Contact event
                  if (window.fbq) {
                    window.fbq('track', 'Contact', {
                      content_name: 'WhatsApp Whitelabel Contact',
                      content_category: 'Video Page Contact',
                      value: 97.00,
                      currency: 'EUR',
                    });
                  }
                }}
              >
                📱 KLIK HIER & STUUR "WHITELABEL" → START VANDAAG
              </a>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-green-400 mb-2">€2.000+</div>
              <div className="text-white text-sm">Per maand mogelijk</div>
              <div className="text-xs text-gray-400 mt-1">Na 30 dagen</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-white text-sm">Whitelabel</div>
              <div className="text-xs text-gray-400 mt-1">Jouw merk, jouw klanten</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="text-2xl font-bold text-purple-400 mb-2">WIJ</div>
              <div className="text-white text-sm">Doen het tech werk</div>
              <div className="text-xs text-gray-400 mt-1">Jij verkoopt alleen</div>
            </div>
          </div>
          
          <p className="text-sm text-red-200 mb-4 font-bold">
            ⚠️ WAARSCHUWING: Deze kans verdwijnt als alle 17 plekken vol zijn!
          </p>
          
          <div className="text-gray-300 text-sm">
            <div className="text-center mb-2">Direct na je WhatsApp bericht ontvang je:</div>
            <div className="text-left sm:text-center">
              • Jouw eigen gebrandede WhatsApp AI systeem<br/>
              • 100+ voorgeselecteerde leads van lokale bedrijven<br/>
              • Bewezen verkoopscripts die werken<br/>
              • Persoonlijke strategie-sessie binnen 24 uur
            </div>
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

export default VideoPage;