import { Users, Video, X } from 'lucide-react';
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const debates = [
  {
    id: 1,
    title: "The Global War Impact: Economic and Social Consequences",
    description: "A deep dive into the ongoing global conflicts and their cascading effects on international relations, economies, and humanitarian crises. Are current diplomatic efforts enough?",
    participants: "1 vs 1",
    status: "Upcoming",
    category: "Geopolitics",
    meetLink: "https://zoom.us/j/example1"
  },
  {
    id: 2,
    title: "The Future of the Oil Situation in India",
    description: "With fluctuating global oil prices and the push for renewable energy, what is the realistic roadmap for India's energy security in the next decade?",
    participants: "1 vs 1",
    status: "Open for Registration",
    category: "Economy & Environment",
    meetLink: "https://meet.google.com/example2"
  }
];

export default function DebateList() {
  const [selectedDebate, setSelectedDebate] = useState<typeof debates[0] | null>(null);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegisterClick = (debate: typeof debates[0]) => {
    setSelectedDebate(debate);
    setIsSuccess(false);
    setError(null);
    setEmail('');
  };

  const closeModal = () => {
    setSelectedDebate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await emailjs.send(
        'service_hkqjqev',
        'template_y9rf1rr',
        {
          to_email: email, // This needs to match the variable in the EmailJS template
          to_name: email.split('@')[0], // Optional: adds a name based on email
          debate_title: selectedDebate?.title,
          reply_to: 'rethinksabha9@gmail.com',
        },
        'RoOYxFSt62wTUS4jV'
      );
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Failed to send email:', err);
      // Display the actual error from EmailJS to help debug
      const errorMessage = err?.text || err?.message || 'Failed to send email. Please check your EmailJS configuration.';
      setError(`EmailJS Error: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="debates" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Trending Debates</h2>
          <p className="mt-4 text-xl text-slate-500">Join a live 1-on-1 session with an expert mediator.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {debates.map((debate) => (
            <div key={debate.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-8 flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                    {debate.category}
                  </span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    debate.status === 'Upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {debate.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{debate.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-3">{debate.description}</p>
                
                <div className="space-y-3 text-sm text-slate-500">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-slate-400" />
                    {debate.participants} • Mediated Session
                  </div>
                </div>
              </div>
              <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center text-indigo-600 font-medium">
                  <Video className="h-5 w-5 mr-2" />
                  Live Video Session
                </div>
                <button 
                  onClick={() => handleRegisterClick(debate)}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                >
                  Register to Debate
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {selectedDebate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900">Register for Debate</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 mb-4">
                    <svg className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Registration Successful!</h4>
                  <p className="text-slate-500 mb-6">
                    We've sent a welcome email to <strong className="text-slate-700">{email}</strong> with the next steps and debate guidelines.
                  </p>
                  <button 
                    onClick={closeModal}
                    className="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <div className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-100">
                      <p className="text-xs text-slate-500 uppercase font-semibold tracking-wider mb-1">Selected Topic</p>
                      <p className="text-slate-900 font-medium">{selectedDebate.title}</p>
                    </div>
                    
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                      placeholder="you@example.com"
                    />
                    <p className="text-xs text-slate-500 mt-2">
                      We'll send your debate schedule and guidelines to this email.
                    </p>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 text-white px-4 py-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
