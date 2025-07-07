import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900/50 backdrop-blur-xl border-t border-white/10 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <img 
              src="/DM_Champ_Logo_Black.png" 
              alt="DM Champ Logo" 
              className="h-8 w-auto filter invert"
            />
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://dmchamp.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"
            >
              Terms of Service
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            <a 
              href="https://dmchamp.com/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center text-sm"
            >
              Privacy Policy
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8">
          <div className="text-center space-y-3 text-gray-400 text-xs">
            <p>© {new Date().getFullYear()} DM Champ. Alle rechten voorbehouden.</p>
            <p>DM Champ is een eigen tool van OneGlimpse B.V.</p>
            <p>Ongeoorloofd delen of kopiëren is ten strengste verboden.</p>
            <p>Deze site heeft geen banden met Google LLC of Meta LLC.</p>
            <p className="text-yellow-400">
              <strong>LET OP:</strong> Resultaten kunnen verschillen. Het succee hangt af van verschillende factoren zoals je branche, doelgroep, en hoe je de verstrekte informatie toepast.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;