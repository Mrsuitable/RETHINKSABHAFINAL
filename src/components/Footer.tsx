import { Mail, Mic } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <a href="/" className="flex items-center mb-4 hover:opacity-80 transition-opacity">
              <Mic className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-2xl font-bold tracking-tight">Rethink Sabha</span>
            </a>
            <p className="text-slate-400 max-w-xs">
              Empowering individuals to research, plan, and deliver meaningful arguments in a mediated 1-on-1 environment.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2 md:items-center">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <a href="#debates" className="text-slate-400 hover:text-white transition-colors">Active Debates</a>
            <a href="#learn" className="text-slate-400 hover:text-white transition-colors">Learning Modules</a>
            <a href="#about" className="text-slate-400 hover:text-white transition-colors">About Us</a>
          </div>

          <div className="flex flex-col md:items-end">
            <h4 className="text-lg font-semibold mb-4">Contact & Support</h4>
            <a href="mailto:rethinksabha9@gmail.com" className="flex items-center text-slate-300 hover:text-white transition-colors bg-slate-800 px-4 py-2 rounded-lg">
              <Mail className="h-5 w-5 mr-3 text-indigo-400" />
              rethinksabha9@gmail.com
            </a>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Rethink Sabha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
