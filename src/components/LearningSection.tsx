import { Search, Target, Zap, Bot, Sparkles, User } from 'lucide-react';
import { useState } from 'react';
import Markdown from 'react-markdown';

const learningModules = [
  {
    title: '1. Research',
    icon: <Search className="h-8 w-8 text-blue-600" />,
    description: 'Learn how to find credible sources, identify biases, and gather compelling evidence to support your stance.',
    color: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    title: '2. Plan',
    icon: <Target className="h-8 w-8 text-emerald-600" />,
    description: 'Structure your arguments logically. Master the art of the opening statement, rebuttals, and closing remarks.',
    color: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
  },
  {
    title: '3. Deliver',
    icon: <Zap className="h-8 w-8 text-amber-600" />,
    description: 'Improve your public speaking, manage your tone, and learn how to communicate your points clearly under pressure.',
    color: 'bg-amber-50',
    borderColor: 'border-amber-200',
  },
];

function buildPrompt(topic: string) {
  return [
    'Act as an expert debate coach for students.',
    'Use clear markdown headings and concise bullet points.',
    `Topic: ${topic}`,
    '',
    'Provide:',
    '1. A one-sentence framing of the debate',
    '2. Three strong arguments FOR the topic',
    '3. Three strong arguments AGAINST the topic',
    '4. Two likely rebuttals for each side',
    '5. A short opening statement for each side',
    '6. Search keywords students can use to find evidence',
  ].join('\n');
}

function detectDomain(topic: string) {
  const text = topic.toLowerCase();

  if (text.includes('school') || text.includes('education') || text.includes('classroom')) {
    return {
      lens: 'education',
      forPoints: ['personalized support', 'teacher workload reduction', 'future-ready skills'],
      againstPoints: ['overdependence', 'unequal access', 'weaker original thinking'],
      evidence: ['student learning outcomes', 'teacher workload studies', 'digital access data'],
    };
  }

  if (text.includes('ai') || text.includes('artificial intelligence')) {
    return {
      lens: 'technology',
      forPoints: ['higher productivity', 'faster feedback', 'wider access to expert help'],
      againstPoints: ['bias and hallucination risk', 'privacy concerns', 'loss of human judgment'],
      evidence: ['AI accuracy studies', 'case studies', 'AI safety policies'],
    };
  }

  if (text.includes('climate') || text.includes('energy') || text.includes('environment')) {
    return {
      lens: 'environment',
      forPoints: ['long-term resilience', 'public health benefits', 'lower future costs'],
      againstPoints: ['short-term cost', 'implementation difficulty', 'uneven local impact'],
      evidence: ['emissions data', 'cost-benefit analysis', 'local climate impact reports'],
    };
  }

  return {
    lens: 'public policy',
    forPoints: ['fairness', 'efficiency', 'long-term social value'],
    againstPoints: ['unintended consequences', 'cost', 'implementation challenges'],
    evidence: ['credible statistics', 'expert reports', 'real-world examples'],
  };
}

function buildBackupCoach(topic: string) {
  const domain = detectDomain(topic);

  return [
    '## Debate framing',
    `This debate asks whether **${topic}** creates more public benefit than risk when applied in the real world.`,
    '',
    '## Strong arguments FOR',
    `- **${domain.forPoints[0]}:** Explain who benefits immediately and why that benefit matters.`,
    `- **${domain.forPoints[1]}:** Connect the idea to practical improvements in schools, families, or society.`,
    `- **${domain.forPoints[2]}:** Show why the long-term benefit is worth planning for now.`,
    '',
    '## Strong arguments AGAINST',
    `- **${domain.againstPoints[0]}:** Point out the main harm if the idea is used carelessly.`,
    `- **${domain.againstPoints[1]}:** Explain who may be left out or harmed by poor implementation.`,
    `- **${domain.againstPoints[2]}:** Argue that the risks may outweigh the promised benefits.`,
    '',
    '## Rebuttal strategy',
    '- FOR side: Accept the risks, then argue for rules, training, and measured rollout.',
    '- AGAINST side: Accept the potential benefits, then argue that safeguards are not strong enough yet.',
    '',
    '## Evidence to search',
    `- ${domain.evidence[0]} for ${domain.lens}`,
    `- ${domain.evidence[1]} from credible institutions`,
    `- ${domain.evidence[2]} in India or your local context`,
    '',
    '## Closing line',
    'The winning side is the one that proves not only what sounds ideal, but what works fairly, safely, and measurably.',
  ].join('\n');
}

async function askPublicAI(topic: string) {
  const prompt = buildPrompt(topic);
  const url = `https://text.pollinations.ai/${encodeURIComponent(prompt)}?seed=${Date.now()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('The public AI provider is busy. Please try again.');
  }

  const text = (await response.text()).trim();
  if (!text) {
    throw new Error('The public AI provider returned an empty response.');
  }

  return text;
}

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
      const response = await askPublicAI(topic.trim());
      setAiResponse(response);
    } catch (err: any) {
      console.error('AI Error:', err);
      setError('Live AI is busy right now, so the built-in coach generated a prep sheet below.');
      setAiResponse(buildBackupCoach(topic.trim()));
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
              <a href="#learn" className="inline-flex items-center mt-6 text-indigo-600 font-medium hover:text-indigo-800">
                Explore module <span className="ml-2">-&gt;</span>
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-20">
          <div className="p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 p-3 rounded-xl mr-4">
                <Bot className="h-8 w-8 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">AI Debate Coach</h3>
                <p className="text-slate-500">Powered by public no-key AI</p>
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
                placeholder="e.g., Should AI be allowed in school?"
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
              <div className="p-4 bg-amber-50 text-amber-700 rounded-xl mb-6 border border-amber-100">
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

        <div id="about" className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl text-white">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="bg-indigo-500/20 p-6 rounded-full border border-indigo-500/30 flex-shrink-0">
              <User className="h-16 w-16 text-indigo-300" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">About the Creator</h3>
              <h4 className="text-xl text-indigo-300 font-medium mb-4">Sunit Prakash</h4>
              <p className="text-slate-300 leading-relaxed max-w-3xl text-lg">
                I am a 16-year-old student from India with a deep passion for building websites and a strong fascination for researching. My love for debate inspired me to create Rethink Sabha - a platform where people can engage in meaningful, structured arguments, learn from each other, and develop their critical thinking skills.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
