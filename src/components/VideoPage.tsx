import React, { useEffect } from 'react';
import { CheckCircle, Clock, MessageCircle, TrendingUp, Users, Target, PlayCircle, UserMinus, Briefcase, Zap, Home } from 'lucide-react';
import Footer from './Footer';


const VideoPage: React.FC = () => {

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Load Voomly player script
    const script = document.createElement('script');
    script.src = 'https://embed.voomly.com/embed/embed-build.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.head.removeChild(script);
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-5xl font-black mb-6 text-white leading-tight">
            <span className="text-red-400">BEWIJS:</span> Het 'Verboden' WhatsApp Systeem Dat 
            <span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"> FueGenix €3 Miljoen Extra</span> Opleverde
          </h1>
          
          <div className="bg-orange-500/20 backdrop-blur-xl border border-orange-500/50 rounded-2xl px-6 py-4 mb-8 shadow-2xl max-w-4xl mx-auto">
            <p className="text-orange-300 font-medium text-lg">
              ⏰ Deze Presentatie Duurt 15 Minuten. Bevat Informatie Die Marketing Bureaus Liever Geheim Houden. Zet Je Telefoon Op Stil.
            </p>
          </div>
        </div>

        {/* WhatsApp AI Business Video */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-2 sm:p-8 mb-12 shadow-2xl">
          <div className="relative bg-black/50 backdrop-blur-xl rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-white/10" style={{ aspectRatio: '1.777778' }}>
            <div 
              className="voomly-embed absolute inset-0 w-full h-full rounded-2xl" 
              data-id="x6-RLg9cnUQPU_JYBfBvNE88VGAUpw5j9hNvSVS8fzrICF8MA" 
              data-ratio="1.777778" 
              data-type="v" 
              data-skin-color="rgba(37,211,102,1)" 
              data-shadow="" 
              style={{ width: '100%', aspectRatio: '1.77778 / 1', background: 'linear-gradient(45deg, rgb(142, 150, 164) 0%, rgb(201, 208, 222) 100%)', borderRadius: '10px' }}
            />
          </div>

          <div className="mb-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Wat Je Gaat Ontdekken:</h3>
            <p className="text-gray-300 text-left mb-6">
              In deze presentatie laat Sohaib je zien hoe hij FueGenix hielp groeien met €3 miljoen extra omzet, terwijl de eigenaar zijn werkweek halveerde.
            </p>
            <p className="text-gray-300 text-left">
              Geen theorie. Geen hype. Gewoon bewezen resultaten.
            </p>
          </div>
        </div>

        {/* Video Moments + Reflection Questions - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Video Moments */}
          <div className="bg-blue-500/10 backdrop-blur-3xl border border-blue-500/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Belangrijke Momenten In De Video:</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start text-left">
                <Clock className="w-5 h-5 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span><strong>3:14</strong> - Waarom harder werken NIET de oplossing is</span>
              </div>
              <div className="flex items-start text-left">
                <MessageCircle className="w-5 h-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <span><strong>3:47</strong> - Het €40.000 WhatsApp gesprek (met screenshots)</span>
              </div>
              <div className="flex items-start text-left">
                <TrendingUp className="w-5 h-5 text-purple-400 mt-1 mr-3 flex-shrink-0" />
                <span><strong>7:15</strong> - Sohaib's verhaal: van €100 op zijn 14e tot €30.000/maand op zijn 17e</span>
              </div>
              <div className="flex items-start text-left">
                <Target className="w-5 h-5 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span><strong>11:23</strong> - De exacte 3 stappen om het systeem te implementeren</span>
              </div>
              <div className="flex items-start text-left">
                <Users className="w-5 h-5 text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                <span><strong>13:45</strong> - Voorbeelden uit verschillende branches</span>
              </div>
              <div className="flex items-start text-left">
                <PlayCircle className="w-5 h-5 text-red-400 mt-1 mr-3 flex-shrink-0" />
                <span><strong>14:30</strong> - Hoe je het systeem LIVE kunt testen</span>
              </div>
            </div>
          </div>
          
          {/* Reflection Questions */}
          <div className="bg-orange-500/10 backdrop-blur-3xl border border-orange-500/30 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Terwijl Je Kijkt, Bedenk:</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start text-left">
                <UserMinus className="w-4 h-4 text-orange-400 mt-1 mr-3 flex-shrink-0" />
                <span>Hoeveel leads mis je nu per week?</span>
              </div>
              <div className="flex items-start text-left">
                <TrendingUp className="w-4 h-4 text-red-400 mt-1 mr-3 flex-shrink-0" />
                <span>Wat kost je dat aan omzet?</span>
              </div>
              <div className="flex items-start text-left">
                <Briefcase className="w-4 h-4 text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                <span>Hoeveel avonden werk je nog door?</span>
              </div>
              <div className="flex items-start text-left">
                <Home className="w-4 h-4 text-green-400 mt-1 mr-3 flex-shrink-0" />
                <span>Wanneer had je voor het laatst écht vrij?</span>
              </div>
            </div>
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mt-6">
              <p className="text-white font-semibold text-center">Dit systeem lost al deze problemen op. Permanent.</p>
            </div>
          </div>
        </div>

        {/* WhatsApp Demo CTA */}
        <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur-3xl border border-green-500/50 rounded-3xl p-6 text-center shadow-2xl mb-12">
          <h3 className="text-3xl font-black mb-6 text-white">
            👇 Klaar Voor De Volgende Stap? 👇
          </h3>
          
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 mb-6">
            <h4 className="text-2xl font-bold text-white mb-4">Test Het WhatsApp Systeem LIVE</h4>
            <p className="text-gray-300 text-left mb-6 max-w-2xl mx-auto">
              Ervaar zelf hoe snel het reageert. Zie hoe het jouw vragen beantwoordt. Ontdek wat het voor jouw business kan betekenen.
            </p>
            
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500/50 rounded-xl p-6 mb-6 max-w-md mx-auto">
              <div className="text-2xl font-bold text-white mb-2">Stuur "DEMO" naar:</div>
              <div className="text-3xl font-black text-green-400 mb-4 break-all">+31 6 16834455</div>
              <div className="text-gray-300 text-sm">Je krijgt direct een persoonlijke demonstratie</div>
            </div>
            
            <a 
              href="https://wa.me/31616834455?text=DEMO" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-2xl text-xl transform hover:scale-105 transition-all shadow-2xl mb-4"
              onClick={() => {
                // Track Meta Pixel Contact event
                if (window.fbq) {
                  window.fbq('track', 'Contact', {
                    content_name: 'WhatsApp Demo Request',
                    content_category: 'Video Page Demo',
                    value: 47.00,
                    currency: 'EUR',
                  });
                }
              }}
            >
              📱 KLIK HIER & TEST HET SYSTEEM LIVE
            </a>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>Geen verplichtingen</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>100% gratis demo</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                <span>Specifiek voor jouw business</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Statistics */}
        <div className="bg-purple-500/10 backdrop-blur-3xl border border-purple-500/30 rounded-3xl p-6 mb-12 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">De Cijfers Liegen Niet:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">25%</div>
              <div className="text-white text-sm mb-1">van bedrijven gebruikt nu AI</div>
              <div className="text-xs text-gray-400">(CBS, 2025)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">67%</div>
              <div className="text-white text-sm mb-1">van het werk wordt in 2030 door AI gedaan</div>
              <div className="text-xs text-gray-400">(UvA)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">21x</div>
              <div className="text-white text-sm mb-1">hogere conversie bij snelle reactie</div>
              <div className="text-xs text-gray-400">(onderzoek)</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">€3M</div>
              <div className="text-white text-sm mb-1">extra omzet voor FueGenix</div>
              <div className="text-xs text-gray-400">in 240 dagen</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 mb-12 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Veelgestelde Vragen:</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h4 className="text-lg font-bold text-yellow-300 mb-3">"Is dit niet onpersoonlijk?"</h4>
              <p className="text-gray-300 text-left">Integendeel. Het systeem reageert 24/7 met empathie en aandacht. Jouw klanten voelen zich gehoord, altijd.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h4 className="text-lg font-bold text-blue-300 mb-3">"Werkt dit voor mijn branche?"</h4>
              <p className="text-gray-300 text-left">In de video zie je voorbeelden van klinieken, coaches, fietsenmakers, restaurants en meer.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:col-span-2 lg:col-span-1">
              <h4 className="text-lg font-bold text-green-300 mb-3">"Is het moeilijk te implementeren?"</h4>
              <p className="text-gray-300 text-left">5 minuten setup. Echt waar. Sohaib laat het stap voor stap zien.</p>
            </div>
          </div>
        </div>
        
        {/* Final Urgency CTA */}
        <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 backdrop-blur-3xl border border-red-500/50 rounded-3xl p-6 text-center shadow-2xl">
          <div className="bg-orange-500/20 backdrop-blur-xl border border-orange-500/50 rounded-2xl px-6 py-4 mb-8">
            <h3 className="text-2xl font-black mb-2 text-white">⏰ Nu Is Het Moment:</h3>
          </div>
          
          <div className="text-left max-w-3xl mx-auto mb-8">
            <p className="text-gray-300 mb-4">
              De EU onderzoekt al of deze systemen "te veel voordeel" geven. WhatsApp test AI-detectie features. Marketing bureaus lobbyen tegen deze technologie.
            </p>
            <p className="text-red-300 font-semibold mb-6">
              Het raam van mogelijkheid wordt kleiner.
            </p>
            
            <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-6">
              <h4 className="text-white font-bold mb-4 text-left">Elke dag uitstel betekent:</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center text-left">
                  <UserMinus className="w-4 h-4 text-red-400 mr-3 flex-shrink-0" />
                  <span>Meer gemiste leads</span>
                </div>
                <div className="flex items-center text-left">
                  <Briefcase className="w-4 h-4 text-orange-400 mr-3 flex-shrink-0" />
                  <span>Meer overwerk</span>
                </div>
                <div className="flex items-center text-left">
                  <Zap className="w-4 h-4 text-yellow-400 mr-3 flex-shrink-0" />
                  <span>Meer stress</span>
                </div>
                <div className="flex items-center text-left">
                  <Home className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                  <span>Minder tijd met familie</span>
                </div>
              </div>
            </div>
            
            <p className="text-white font-bold text-center mb-8">
              Stop met uitstellen. Start met automatiseren.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-500/50 rounded-xl p-6 mb-6">
            <div className="text-xl font-bold text-white mb-2">Test Het Nu - Stuur "DEMO" naar:</div>
            <div className="text-2xl font-black text-green-400 mb-4 break-all">+31 6 16834455</div>
          </div>
          
          <a 
            href="https://wa.me/31616834455?text=DEMO" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-6 px-8 rounded-2xl text-xl transform hover:scale-105 transition-all shadow-2xl mb-6"
            onClick={() => {
              // Track Meta Pixel Contact event
              if (window.fbq) {
                window.fbq('track', 'Contact', {
                  content_name: 'WhatsApp Final Demo Request',
                  content_category: 'Video Page Final CTA',
                  value: 97.00,
                  currency: 'EUR',
                });
              }
            }}
          >
            📱 TEST HET SYSTEEM NU LIVE
          </a>
          
          <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mb-6">
            <p className="text-gray-300 text-sm">
              <strong>Garantie:</strong> Als de demo je niet overtuigt, geen probleem. Geen spam, geen verkooppraatjes. Gewoon een eerlijke demonstratie van wat mogelijk is.
            </p>
          </div>
          
          <div className="border-t border-white/20 pt-6">
            <p className="text-xs text-gray-400 mb-2 text-left"><strong>P.S.</strong> Sohaib's eigen verhaal is fascinerend - van YouTube op zijn 14e tot het runnen van een €100k+ marketing bureau. Maar belangrijker: hij heeft dit systeem voor tientallen bedrijven geïmplementeerd. Het werkt. Punt.</p>
            
            <p className="text-xs text-orange-300 text-left"><strong>P.P.S.</strong> Die €40.000 deal die werd gesloten terwijl de eigenaar thuis was? Dat gebeurt elke dag bij bedrijven die dit systeem gebruiken. De vraag is: wanneer begin jij? (Voordat de regels veranderen...)</p>
          </div>
        </div>
      </div>
      
      <Footer />
      
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Extra word spacing for headings */
          h1, h2, h3, h4, h5, h6 {
            word-spacing: 0.1em !important;
          }
        `
      }} />
    </div>
  );
};

export default VideoPage;