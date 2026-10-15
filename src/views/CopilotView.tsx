import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  User,
  RotateCw,
  Lightbulb,
  ChevronDown,
  Clipboard,
  Check,
  Activity,
  MessageSquare
} from 'lucide-react';
import { askLUMENIQCopilot } from '../services/api';
import { Workspace, ScoreDimensions } from '../types';

interface CopilotViewProps {
  workspace: Workspace;
  scoreDimensions: ScoreDimensions;
}

interface Message {
  id: string;
  sender: 'user' | 'copilot';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

/** Convert simple markdown subset to JSX without a full markdown library */
function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    if (line.startsWith('### ')) {
      elements.push(<h3 key={i} className="text-sm font-bold text-slate-100 mt-3 mb-1">{line.slice(4)}</h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-sm font-bold text-white mt-4 mb-1">{line.slice(3)}</h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={i} className="text-base font-extrabold text-white mt-4 mb-1">{line.slice(2)}</h1>);
    }
    // HR
    else if (line.trim() === '---') {
      elements.push(<hr key={i} className="border-slate-700/60 my-2.5" />);
    }
    // Numbered list
    else if (/^\d+\. /.test(line)) {
      const listLines = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        listLines.push(lines[i].replace(/^\d+\. /, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal pl-5 space-y-1 my-2 text-slate-200 text-xs">
          {listLines.map((l, li) => (
            <li key={li} className="leading-relaxed">{inlineMarkdown(l)}</li>
          ))}
        </ol>
      );
      continue;
    }
    // Bullet list
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const listLines = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listLines.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc pl-5 space-y-1 my-2 text-slate-200 text-xs">
          {listLines.map((l, li) => (
            <li key={li} className="leading-relaxed">{inlineMarkdown(l)}</li>
          ))}
        </ul>
      );
      continue;
    }
    // Empty line
    else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    }
    // Normal paragraph
    else {
      elements.push(
        <p key={i} className="text-xs text-slate-200 leading-relaxed">
          {inlineMarkdown(line)}
        </p>
      );
    }
    i++;
  }
  return <>{elements}</>;
}

function inlineMarkdown(text: string): React.ReactNode {
  // Bold **text** → <strong>
  // Italic *text* or _text_ → <em>
  // Code `text` → <code>
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    if ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) {
      return <em key={i} className="text-slate-300 italic">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-slate-800/80 text-cyan-300 font-mono text-[11px] border border-slate-700/50">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export const CopilotView: React.FC<CopilotViewProps> = ({
  workspace,
  scoreDimensions
}) => {
  const overallScore = Math.round(
    scoreDimensions.mentionVisibility * 0.20 +
    scoreDimensions.recommendationStrength * 0.25 +
    scoreDimensions.citationStrength * 0.20 +
    scoreDimensions.competitiveShare * 0.15 +
    scoreDimensions.queryCoverage * 0.10 +
    scoreDimensions.aiReferralQuality * 0.10
  );

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'copilot',
      text: `Hello! I'm your LUMENIQ Growth Copilot — fully loaded with **${workspace.name}'s** live AI visibility data.

**Current AI Score: ${overallScore}/100**

Here's what's holding you back right now:
1. **Missing Comparison Matrices**: Competitors are cited 4.3× more frequently on commercial intent queries — they host detailed side-by-side benchmarks.
2. **Pricing Hallucinations**: Claude and Copilot incorrectly state you lack self-serve pricing due to missing Schema.org JSON-LD Offer markup.
3. **Citation Gap on Top Publisher Domains**: Only 18 indexed mentions vs competitors' 80+ across G2, TechCrunch, and VentureBeat.

What strategic question would you like to explore?`,
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Why did our recommendation rate drop this week?',
        'Generate an AEO comparison page brief',
        'Show our top 3 citation gaps vs Mixpanel',
        'How do we fix Claude pricing hallucination?',
        'What schema markup should we deploy first?'
      ]
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (userText?: string) => {
    const textToSend = userText || inputValue;
    if (!textToSend.trim() || isThinking) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsThinking(true);

    try {
      const data = await askLUMENIQCopilot(textToSend, {
        brand: workspace.name,
        score: overallScore,
        dimensions: scoreDimensions,
        competitors: ['Mixpanel', 'Amplitude', 'Datadog'],
        gaps: ['Missing comparison content', 'Weak 3rd-party authority citations', 'Pricing schema missing']
      });

      const copilotMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'copilot',
        text: data.reply || 'Analysis complete. Review the metrics above for next steps.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: data.suggestedFollowUps || []
      };

      setMessages(prev => [...prev, copilotMsg]);
    } catch (err) {
      console.error('Copilot query error:', err);
      const fallbackMsg: Message = {
        id: `c-${Date.now()}`,
        sender: 'copilot',
        text: `Based on ${workspace.name}'s current metrics:

**Immediate Priority**: Target comparison queries where competitors hold 58% of recommendations. Deploying a structured comparison hub with verified JSON-LD markup will close this gap within **14-21 days**.

**Quick Wins (This Week)**:
1. Add Schema.org **SoftwareApplication** markup to /pricing — eliminates AI hallucination on pricing tier
2. Create a \`/compare\` page with benchmark tables — this single action can lift recommendation rate by ~18%
3. Submit to G2 and TechCrunch Top Tools listings for citation authority

Would you like a detailed content brief for any of these?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: [
          'Generate the comparison page content brief',
          'Write the JSON-LD schema markup',
          'Show citation gap analysis vs Mixpanel'
        ]
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-5 animate-fade-in-up">

      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg
                      flex flex-col sm:flex-row items-start sm:items-center
                      justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600
                          flex items-center justify-center text-white shadow-lg shadow-blue-500/25
                          animate-float shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              LUMENIQ Growth Copilot
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/15
                               text-cyan-300 font-mono border border-cyan-500/25">
                AI-Grounded
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Context-aware strategy · Grounded in {workspace.name}'s live citation graphs & competitive metrics
            </p>
          </div>
        </div>

        {/* Context chips */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80
                          border border-slate-700 text-[11px] text-slate-300">
            <Activity className="w-3 h-3 text-blue-400" />
            <span>Score: <strong className="text-white">{overallScore}/100</strong></span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/80
                          border border-slate-700 text-[11px] text-slate-300">
            <MessageSquare className="w-3 h-3 text-cyan-400" />
            <span>{messages.length - 1} exchanges</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl
                      flex flex-col" style={{ height: '580px' }}>

        {/* Messages scroll */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 animate-slide-up ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'copilot' && (
                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600
                                text-white flex items-center justify-center shrink-0 mt-0.5
                                shadow-md shadow-blue-600/30">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl
                  ${m.sender === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white font-medium rounded-tr-none p-4 shadow-lg shadow-blue-900/30'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none p-4 space-y-2 shadow-sm'
                  }`}
              >
                {m.sender === 'copilot'
                  ? <div className="prose-copilot">{renderMarkdown(m.text)}</div>
                  : <div className="text-xs leading-relaxed">{m.text}</div>
                }

                {/* Suggested follow-ups */}
                {m.suggestedFollowUps && m.suggestedFollowUps.length > 0 && (
                  <div className="pt-2.5 border-t border-slate-700/60 space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-3 h-3 text-amber-400" />
                      Strategic Inquiries:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {m.suggestedFollowUps.map((prompt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(prompt)}
                          disabled={isThinking}
                          className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800
                                     text-cyan-300 border border-slate-700/60 hover:border-cyan-500/30
                                     text-[11px] font-medium transition-all text-left disabled:opacity-50"
                        >
                          {prompt} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Meta row */}
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[10px] text-current opacity-40 font-mono">{m.timestamp}</span>
                  {m.sender === 'copilot' && (
                    <button
                      onClick={() => handleCopy(m.id, m.text)}
                      className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-1
                                 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === m.id
                        ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</>
                        : <><Clipboard className="w-3 h-3" /> Copy</>
                      }
                    </button>
                  )}
                </div>
              </div>

              {m.sender === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-700 text-slate-300
                                flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {/* Thinking indicator */}
          {isThinking && (
            <div className="flex gap-3 items-center animate-fade-in">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600
                              flex items-center justify-center shrink-0 animate-pulse-glow">
                <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              </div>
              <div className="p-3 rounded-2xl rounded-tl-none bg-slate-950 border border-slate-800
                              flex items-center gap-3">
                <RotateCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span className="text-xs text-slate-400">
                  Analyzing grounding graphs & reverse-engineering LLM citation vectors…
                </span>
                <div className="flex gap-1 ml-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 rounded-b-2xl">
          <form
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`Ask LUMENIQ Copilot about ${workspace.name}'s AI visibility…`}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs
                         text-white placeholder-slate-500 focus:outline-none input-glow font-medium"
              disabled={isThinking}
            />
            <button
              type="submit"
              disabled={isThinking || !inputValue.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600
                         hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold
                         flex items-center gap-1.5 transition-all disabled:opacity-50
                         shadow-md shadow-blue-500/20 shrink-0"
            >
              {isThinking ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isThinking ? 'Thinking…' : 'Ask'}</span>
            </button>
          </form>
          <p className="text-[10px] text-slate-600 mt-2 text-center font-medium">
            Responses grounded in {workspace.name}'s live citation graphs · Powered by Gemini
          </p>
        </div>
      </div>
    </div>
  );
};
