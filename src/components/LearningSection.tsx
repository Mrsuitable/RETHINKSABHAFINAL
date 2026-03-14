import { BookOpen, Search, Target, Zap, Bot, Sparkles, User } from 'lucide-react';
import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import Markdown from 'react-markdown';

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
  const [topic, setTopic] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError('');
    setAiResponse('');

    try {
      // Using the API key you provided. 
      // NOTE: For a live public website, it is safer to call the Gemini API from a backend server so users cannot see your key.
      const apiKey = "AIzaSyDw_9EFPSI9Z6_QQULnZb8QCCNZFlowGGs";
      const ai = new GoogleGenAI({ apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as an expert debate coach. Provide 3 strong arguments FOR and 3 strong arguments AGAINST the following topic: "${topic}". Keep it concise, structured, and use markdown formatting.`,
      });
      setAiResponse(response.text || "No response generated.");
    } catch (err: any) {
      console.error("AI Error:", err);
      setError(`Error: ${err.message || "Failed to get advice from the AI coach."}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="learn" className="py-20 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">The Core Focus</h2>
          <p className="mt-4 text-xl text-slate-500 max-w-3xl mx-auto">
            Rethink Sabha isn't just about winning arguments. It's a platform dedicated to helping you develop critical thinking and communication skills.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
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

        {/* AI Debate Coach Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-20">
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                <Bot className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">AI Debate Coach</h3>
                <p className="text-slate-500">Powered by Google Gemini</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-8 max-w-3xl">
              Need help preparing for a debate? Enter your topic below, and our AI coach will generate strong arguments for both sides to help you see the full picture and prepare your rebuttals.
            </p>

            <form onSubmit={handleAskAI} className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Artificial Intelligence will replace human jobs"
                className="flex-grow px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center min-w-[160px]"
              >
                {isLoading ? (
                  <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Ask Coach
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-xl mb-6 border border-red-100">
                {error}
              </div>
            )}

            {aiResponse && (
              <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-indigo-600" />
                  Coach's Analysis:
                </h4>
                <div className="markdown-body prose prose-slate max-w-none text-slate-700">
                  <Markdown>{aiResponse}</Markdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* About Me Section */}
        <div id="about" className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl text-white">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-indigo-500/20 p-6 rounded-full border border-indigo-500/30 flex-shrink-0">
              <User className="h-16 w-16 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">About the Creator</h3>
              <h4 className="text-xl text-indigo-300 font-medium mb-4">Sunit Prakash</h4>
              <p className="text-slate-300 leading-relaxed max-w-3xl text-lg">
                I am a 16-year-old student from India with a deep passion for building websites and a strong fascination for researching. My love for debate inspired me to create Rethink Sabha—a platform where people can engage in meaningful, structured arguments, learn from each other, and develop their critical thinking skills.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
