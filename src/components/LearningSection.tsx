import { BookOpen, Search, Target, Zap } from 'lucide-react';

const learningModules = [
  {
    title: "1. Research",
    icon: <Search className="h-8 w-8 text-blue-600" />,
    description: "Learn how to find credible sources, identify biases, and gather compelling evidence to support your stance.",
    color: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    title: "2. Plan",
    icon: <Target className="h-8 w-8 text-emerald-600" />,
    description: "Structure your arguments logically. Master the art of the opening statement, rebuttals, and closing remarks.",
    color: "bg-emerald-50",
    borderColor: "border-emerald-200"
  },
  {
    title: "3. Deliver",
    icon: <Zap className="h-8 w-8 text-amber-600" />,
    description: "Improve your public speaking, manage your tone, and learn how to communicate your points clearly under pressure.",
    color: "bg-amber-50",
    borderColor: "border-amber-200"
  }
];

export default function LearningSection() {
  return (
    <section id="learn" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">The Core Focus</h2>
          <p className="mt-4 text-xl text-slate-500 max-w-3xl mx-auto">
            Rethink Sabha isn't just about winning arguments. It's a platform dedicated to helping you develop critical thinking and communication skills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {learningModules.map((module, index) => (
            <div key={index} className={`rounded-2xl p-8 border ${module.borderColor} ${module.color} transition-transform hover:-translate-y-1`}>
              <div className="bg-white w-16 h-16 rounded-xl flex items-center justify-center shadow-sm mb-6">
                {module.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{module.title}</h3>
              <p className="text-slate-700 leading-relaxed">
                {module.description}
              </p>
              <a href="#" className="inline-flex items-center mt-6 text-indigo-600 font-medium hover:text-indigo-800">
                Explore module <span className="ml-2">→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
