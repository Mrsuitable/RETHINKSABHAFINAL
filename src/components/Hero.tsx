import { ArrowRight, BookOpen, Target, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-slate-50 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32 pt-20">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Master the art of</span>{' '}
                <span className="block text-indigo-600 xl:inline">meaningful debate</span>
              </h1>
              <p className="mt-3 text-base text-slate-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join 1-on-1 live mediated debates on trending topics. Our main focus is not just arguing, but learning how to <strong>research, plan, and deliver</strong> your thoughts effectively.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#debates" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors">
                    View Trending Debates
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-200 flex items-center justify-center">
        {/* Abstract representation of a debate/learning */}
        <div className="grid grid-cols-2 gap-4 p-8 opacity-80">
           <div className="bg-white p-6 rounded-2xl shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
              <BookOpen className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Research</h3>
              <p className="text-sm text-slate-600">Gather facts and build a strong foundation.</p>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-lg transform translate-y-8 rotate-3 hover:rotate-0 transition-transform">
              <Target className="h-10 w-10 text-emerald-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Plan</h3>
              <p className="text-sm text-slate-600">Structure your arguments logically.</p>
           </div>
           <div className="bg-white p-6 rounded-2xl shadow-lg transform translate-x-4 -rotate-2 hover:rotate-0 transition-transform col-span-2 mt-4">
              <Zap className="h-10 w-10 text-amber-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">Deliver</h3>
              <p className="text-sm text-slate-600">Present with confidence and clarity in a live 1-on-1 setting with a mediator.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
