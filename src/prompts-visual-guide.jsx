import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
  </div>
);

const ConceptIntro = () => (
  <Section title="💬 What is a Prompt?" color="#8b5cf6">
    <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div>
        <p className="text-gray-700 mb-4">
          A <strong>prompt</strong> is simply the input you give to an LLM. The
          model responds with a <strong>completion</strong>.
        </p>
        <div className="space-y-3">
          <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
            <div className="text-sm text-purple-600 mb-1">Your Prompt →</div>
            <p className="font-medium">"What's the capital of France?"</p>
          </div>
          <div className="flex justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-400"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="text-sm text-green-600 mb-1">
              ← Model Completion
            </div>
            <p className="font-medium">"The capital of France is Paris."</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Prompts can be:</h3>
        <div className="space-y-2">
          {[
            {
              icon: "❓",
              text: "Questions",
              example: '"How do I make pasta?"',
            },
            {
              icon: "📝",
              text: "Commands",
              example: '"Write a poem about the ocean"',
            },
            {
              icon: "💬",
              text: "Conversations",
              example: '"Hey, how\'s it going?"',
            },
            {
              icon: "🔄",
              text: "Completions",
              example: '"The best way to learn is..."',
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 font-medium">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
              <p className="text-sm text-gray-500 ml-7">{item.example}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const PromptTypes = () => {
  const [activeType, setActiveType] = useState("system");

  return (
    <Section title="🎭 Two Types of Prompts" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        LLMs work with two main types of prompts that work together:
      </p>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveType("system")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeType === "system"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🔧 System Prompt
        </button>
        <button
          onClick={() => setActiveType("user")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeType === "user"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          👤 User Prompt
        </button>
      </div>

      <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div
          className={`rounded-xl p-5 border-2 transition-all ${
            activeType === "system"
              ? "bg-blue-50 border-blue-400 scale-105"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
            🔧 System Prompt
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Sets the <strong>personality, tone, and rules</strong> for the AI.
            Usually set by developers, not users.
          </p>
          <div className="bg-white rounded-lg p-3 border border-blue-200 font-mono text-sm">
            "You are a helpful assistant that responds in a cheerful, friendly
            manner. Always be concise and use simple language."
          </div>
          <div className="mt-3 text-xs text-blue-600">
            ✓ Defines behavior &nbsp; ✓ Sets constraints &nbsp; ✓ Establishes
            tone
          </div>
        </div>

        <div
          className={`rounded-xl p-5 border-2 transition-all ${
            activeType === "user"
              ? "bg-green-50 border-green-400 scale-105"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
            👤 User Prompt
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            The <strong>actual question or request</strong> from the user. This
            is what you type in a chat.
          </p>
          <div className="bg-white rounded-lg p-3 border border-green-200 font-mono text-sm">
            "Summarize the key points of this article for a corporate executive.
            Use no more than 6 bullet points."
          </div>
          <div className="mt-3 text-xs text-green-600">
            ✓ Asks questions &nbsp; ✓ Gives instructions &nbsp; ✓ Provides
            context
          </div>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          🎯 How They Work Together
        </h4>
        <svg viewBox="0 0 500 100" className="w-full h-24">
          {/* System prompt box */}
          <rect x="10" y="20" width="140" height="60" rx="8" fill="#3B82F6" />
          <text
            x="80"
            y="45"
            textAnchor="middle"
            fontSize="10"
            fill="white"
            fontWeight="bold"
          >
            System Prompt
          </text>
          <text x="80" y="60" textAnchor="middle" fontSize="8" fill="#BFDBFE">
            "Be helpful & friendly"
          </text>

          {/* Plus sign */}
          <text x="170" y="55" fontSize="20" fill="#9CA3AF">
            +
          </text>

          {/* User prompt box */}
          <rect x="190" y="20" width="140" height="60" rx="8" fill="#22C55E" />
          <text
            x="260"
            y="45"
            textAnchor="middle"
            fontSize="10"
            fill="white"
            fontWeight="bold"
          >
            User Prompt
          </text>
          <text x="260" y="60" textAnchor="middle" fontSize="8" fill="#BBF7D0">
            "How do I bake a cake?"
          </text>

          {/* Arrow */}
          <line
            x1="340"
            y1="50"
            x2="370"
            y2="50"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <polygon points="370,45 380,50 370,55" fill="#9CA3AF" />

          {/* LLM */}
          <rect x="390" y="30" width="50" height="40" rx="8" fill="#8B5CF6" />
          <text
            x="415"
            y="55"
            textAnchor="middle"
            fontSize="10"
            fill="white"
            fontWeight="bold"
          >
            LLM
          </text>

          {/* Arrow to response */}
          <line
            x1="450"
            y1="50"
            x2="480"
            y2="50"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <polygon points="480,45 490,50 480,55" fill="#9CA3AF" />
        </svg>
        <p className="text-sm text-yellow-700 text-center">
          The model combines system rules + user request to generate the perfect
          response!
        </p>
      </div>
    </Section>
  );
};

const ConversationHistory = () => {
  const [step, setStep] = useState(0);

  const conversation = [
    {
      role: "system",
      text: "You are a helpful AI assistant for corporate policy questions.",
    },
    {
      role: "user",
      text: "What are key considerations for adopting generative AI?",
    },
    {
      role: "assistant",
      text: "• Establish Clear Governance\n• Prioritize High-Value Use Cases\n• Mitigate Privacy Risks\n• Foster Organizational Readiness",
    },
    { role: "user", text: "What are common privacy-related risks?" },
    {
      role: "assistant",
      text: "Common privacy risks include:\n• Data leakage through prompts\n• Training data exposure\n• Third-party data sharing\n• Compliance with GDPR/CCPA",
    },
  ];

  const visibleConversation = conversation.slice(0, step + 1);

  return (
    <Section title="📜 Conversation History" color="#10b981">
      <p className="text-gray-700 mb-4">
        LLMs don't have memory between requests! Apps keep track of the
        conversation and include it in each prompt for context.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setStep(0)}
          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
        >
          Reset
        </button>
        <button
          onClick={() =>
            setStep((s) => Math.min(conversation.length - 1, s + 1))
          }
          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm"
          disabled={step >= conversation.length - 1}
        >
          Next Message →
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold mb-3 text-gray-700">Chat View:</h3>
          <div className="space-y-3 max-h-64 overflow-auto">
            {visibleConversation
              .filter((m) => m.role !== "system")
              .map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    msg.role === "user"
                      ? "bg-green-100 ml-8"
                      : "bg-white border mr-8"
                  }`}
                >
                  <div className="text-xs text-gray-500 mb-1">
                    {msg.role === "user" ? "👤 You" : "🤖 Assistant"}
                  </div>
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h3 className="font-semibold mb-3 text-green-800">
            What's Actually Sent to the LLM:
          </h3>
          <div className="bg-white rounded-lg p-3 font-mono text-xs max-h-64 overflow-auto">
            <div className="text-blue-600 mb-2">
              // System Prompt (always included)
            </div>
            <div className="bg-blue-50 p-2 rounded mb-2">
              {conversation[0].text}
            </div>

            <div className="text-green-600 mb-2">// Conversation History</div>
            {visibleConversation
              .filter((m) => m.role !== "system")
              .map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded mb-1 ${
                    msg.role === "user" ? "bg-green-50" : "bg-gray-50"
                  }`}
                >
                  <span className="text-gray-500">{msg.role}:</span>{" "}
                  {msg.text.substring(0, 50)}...
                </div>
              ))}
          </div>
          <p className="text-xs text-green-700 mt-2">
            ⚠️ The entire history is sent each time! This is how the model
            "remembers" context.
          </p>
        </div>
      </div>
    </Section>
  );
};

const RAGSection = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { title: "User asks a question", highlight: "query" },
    { title: "App searches knowledge base", highlight: "search" },
    { title: "Relevant docs retrieved", highlight: "retrieve" },
    { title: "Docs + question sent to LLM", highlight: "augment" },
    { title: "Grounded response generated", highlight: "respond" },
  ];

  useEffect(() => {
    if (!isAnimating || step >= steps.length - 1) return;

    const interval = setInterval(() => {
      setStep((s) => {
        const nextStep = s + 1;
        if (nextStep >= steps.length - 1) {
          setIsAnimating(false);
        }
        return nextStep;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isAnimating, step, steps.length]);

  return (
    <Section title="📚 RAG: Retrieval Augmented Generation" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        RAG adds <strong>real, specific knowledge</strong> to prompts so the
        model can give accurate, grounded answers instead of generic ones.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsAnimating(true);
          }}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          ▶️ Show RAG Process
        </button>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <div className="text-center font-semibold text-amber-800 mb-4">
          Step {step + 1}: {steps[step].title}
        </div>

        <svg viewBox="0 0 500 180" className="w-full h-44">
          {/* User */}
          <g opacity={step >= 0 ? 1 : 0.3}>
            <circle cx="50" cy="90" r="25" fill="#22C55E" />
            <text x="50" y="95" textAnchor="middle" fontSize="20">
              👤
            </text>
            <text
              x="50"
              y="130"
              textAnchor="middle"
              fontSize="9"
              fill="#6B7280"
            >
              User
            </text>
          </g>

          {/* Query arrow */}
          {step >= 0 && (
            <g>
              <line
                x1="75"
                y1="90"
                x2="120"
                y2="90"
                stroke={step === 0 ? "#F59E0B" : "#9CA3AF"}
                strokeWidth="2"
              />
              <polygon
                points="115,85 125,90 115,95"
                fill={step === 0 ? "#F59E0B" : "#9CA3AF"}
              />
            </g>
          )}

          {/* App / Query Processor */}
          <g opacity={step >= 1 ? 1 : 0.3}>
            <rect
              x="130"
              y="65"
              width="70"
              height="50"
              rx="8"
              fill={step === 1 ? "#F59E0B" : "#6366F1"}
            />
            <text
              x="165"
              y="85"
              textAnchor="middle"
              fontSize="9"
              fill="white"
              fontWeight="bold"
            >
              App
            </text>
            <text x="165" y="100" textAnchor="middle" fontSize="8" fill="white">
              Query
            </text>
            <text
              x="165"
              y="130"
              textAnchor="middle"
              fontSize="9"
              fill="#6B7280"
            >
              Processor
            </text>
          </g>

          {/* Search arrow to KB */}
          {step >= 1 && (
            <g>
              <path
                d="M 165,65 L 165,40 L 280,40"
                stroke={step === 1 ? "#F59E0B" : "#9CA3AF"}
                strokeWidth="2"
                fill="none"
              />
              <polygon
                points="275,35 285,40 275,45"
                fill={step === 1 ? "#F59E0B" : "#9CA3AF"}
              />
            </g>
          )}

          {/* Knowledge Base */}
          <g opacity={step >= 2 ? 1 : 0.3}>
            <rect
              x="290"
              y="15"
              width="80"
              height="50"
              rx="8"
              fill={step === 2 ? "#F59E0B" : "#3B82F6"}
            />
            <text
              x="330"
              y="35"
              textAnchor="middle"
              fontSize="9"
              fill="white"
              fontWeight="bold"
            >
              Knowledge
            </text>
            <text
              x="330"
              y="50"
              textAnchor="middle"
              fontSize="9"
              fill="white"
              fontWeight="bold"
            >
              Base
            </text>
            <text
              x="330"
              y="80"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              📄 Docs, Policies
            </text>
          </g>

          {/* Retrieved docs arrow */}
          {step >= 2 && (
            <g>
              <path
                d="M 330,65 L 330,90 L 200,90"
                stroke={step === 2 ? "#F59E0B" : "#9CA3AF"}
                strokeWidth="2"
                fill="none"
                strokeDasharray="4"
              />
              <polygon
                points="205,85 195,90 205,95"
                fill={step === 2 ? "#F59E0B" : "#9CA3AF"}
              />
              <text x="265" y="85" fontSize="8" fill="#F59E0B">
                relevant docs
              </text>
            </g>
          )}

          {/* Arrow to LLM */}
          {step >= 3 && (
            <g>
              <line
                x1="200"
                y1="90"
                x2="290"
                y2="130"
                stroke={step === 3 ? "#F59E0B" : "#9CA3AF"}
                strokeWidth="2"
              />
              <polygon
                points="285,125 295,132 287,137"
                fill={step === 3 ? "#F59E0B" : "#9CA3AF"}
              />
            </g>
          )}

          {/* LLM */}
          <g opacity={step >= 3 ? 1 : 0.3}>
            <rect
              x="300"
              y="110"
              width="70"
              height="50"
              rx="8"
              fill={step >= 3 ? "#8B5CF6" : "#9CA3AF"}
            />
            <text
              x="335"
              y="135"
              textAnchor="middle"
              fontSize="12"
              fill="white"
              fontWeight="bold"
            >
              LLM
            </text>
            <text
              x="335"
              y="150"
              textAnchor="middle"
              fontSize="8"
              fill="#DDD6FE"
            >
              + context
            </text>
          </g>

          {/* Response arrow */}
          {step >= 4 && (
            <g>
              <path
                d="M 370,135 L 420,135 L 420,90 L 450,90"
                stroke="#22C55E"
                strokeWidth="2"
                fill="none"
              />
              <polygon points="445,85 455,90 445,95" fill="#22C55E" />
            </g>
          )}

          {/* Response */}
          {step >= 4 && (
            <g>
              <rect
                x="460"
                y="70"
                width="35"
                height="40"
                rx="5"
                fill="#22C55E"
              />
              <text x="477" y="95" textAnchor="middle" fontSize="16">
                ✓
              </text>
            </g>
          )}
        </svg>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <h4 className="font-semibold text-red-800 mb-2">❌ Without RAG</h4>
          <p className="text-sm text-gray-600 mb-2">
            Q: "What's the max travel expense claim?"
          </p>
          <p className="text-sm text-red-700 italic">
            "I don't have access to your company's policies. Please consult your
            HR department..."
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2">✅ With RAG</h4>
          <p className="text-sm text-gray-600 mb-2">
            Q: "What's the max travel expense claim?"
          </p>
          <p className="text-sm text-green-700 italic">
            "According to your company's expense policy, the maximum daily
            travel expense is $150 for domestic and $250 for international..."
          </p>
        </div>
      </div>
    </Section>
  );
};

const PromptTipsSection = () => {
  const [selectedTip, setSelectedTip] = useState(0);

  const tips = [
    {
      title: "Be Clear & Specific",
      icon: "🎯",
      bad: "Tell me about dogs",
      good: "Explain the top 3 health considerations for adopting a Golden Retriever puppy",
      why: "Vague prompts get vague answers. Specificity = better results!",
    },
    {
      title: "Add Context",
      icon: "📋",
      bad: "Write a summary",
      good: "Write a 2-paragraph summary of this article for a busy executive who needs the key takeaways quickly",
      why: "Context about audience, purpose, and format guides the response.",
    },
    {
      title: "Use Examples",
      icon: "📝",
      bad: "Make it sound professional",
      good: 'Write in a professional tone like this example: "We are pleased to inform you that your application has been approved."',
      why: "Examples show exactly what you want instead of hoping the AI guesses right.",
    },
    {
      title: "Request Structure",
      icon: "📊",
      bad: "Give me information about project management",
      good: "List the 5 phases of project management as a numbered list with a brief description of each",
      why: "Asking for bullets, tables, or numbered lists makes output more usable.",
    },
  ];

  const current = tips[selectedTip];

  return (
    <Section title="✨ Tips for Better Prompts" color="#ec4899">
      <p className="text-gray-700 mb-4">
        The quality of your prompts directly affects the quality of responses.
        Here's how to write better prompts:
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {tips.map((tip, i) => (
          <button
            key={i}
            onClick={() => setSelectedTip(i)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedTip === i
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tip.icon} {tip.title}
          </button>
        ))}
      </div>

      <div className="bg-pink-50 rounded-xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <h3 className="text-xl font-bold text-pink-800 mb-4 flex items-center gap-2">
          {current.icon} {current.title}
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-red-500 text-xl">❌</span>
              <span className="font-semibold text-red-700">Vague Prompt</span>
            </div>
            <p className="font-mono text-sm bg-white p-2 rounded">
              {current.bad}
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500 text-xl">✅</span>
              <span className="font-semibold text-green-700">
                Better Prompt
              </span>
            </div>
            <p className="font-mono text-sm bg-white p-2 rounded">
              {current.good}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3 border border-pink-200">
          <span className="font-semibold text-pink-700">💡 Why it works: </span>
          <span className="text-gray-700">{current.why}</span>
        </div>
      </div>
    </Section>
  );
};

const InteractivePromptBuilder = () => {
  const [components, setComponents] = useState({
    role: false,
    task: true,
    context: false,
    format: false,
    example: false,
  });

  const buildPrompt = () => {
    let parts = [];
    if (components.role) parts.push("Act as a senior financial analyst.");
    if (components.task) parts.push("Analyze the Q3 earnings report");
    if (components.context)
      parts.push("for a board presentation to non-technical executives");
    if (components.format) parts.push(". Format as 5 bullet points");
    if (components.example)
      parts.push(', like: "• Revenue increased 15% YoY due to..."');
    return parts.join(" ") || "Click components above to build your prompt...";
  };

  const qualityScore = Object.values(components).filter(Boolean).length;

  return (
    <Section title="🛠️ Interactive Prompt Builder" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Click components to add them to your prompt and see how it improves:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { key: "role", label: "🎭 Role", desc: "Who should the AI be?" },
          { key: "task", label: "📝 Task", desc: "What to do?" },
          { key: "context", label: "📋 Context", desc: "Audience/purpose?" },
          { key: "format", label: "📊 Format", desc: "How to structure?" },
          { key: "example", label: "💡 Example", desc: "Show what you want" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() =>
              setComponents((c) => ({ ...c, [item.key]: !c[item.key] }))
            }
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              components[item.key]
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={item.desc}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-indigo-800">Your Prompt:</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-indigo-600">Quality:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full ${
                    i <= qualityScore ? "bg-indigo-500" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 font-mono text-sm border border-indigo-200 min-h-20">
          {buildPrompt()}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 text-center text-xs">
        {[
          { score: 1, label: "Basic" },
          { score: 2, label: "Okay" },
          { score: 3, label: "Good" },
          { score: 4, label: "Great" },
          { score: 5, label: "Expert!" },
        ].map((item) => (
          <div
            key={item.score}
            className={`p-2 rounded ${
              qualityScore >= item.score
                ? "bg-indigo-100 text-indigo-700"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">
          🔧 System vs User Prompts
        </h3>
        <p className="text-sm text-blue-700">
          System prompts set behavior/rules (developer-controlled). User prompts
          are the actual questions/requests.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">
          📜 Conversation History
        </h3>
        <p className="text-sm text-green-700">
          LLMs have no memory! Apps include past messages in each prompt to
          maintain context.
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">📚 RAG</h3>
        <p className="text-sm text-amber-700">
          Retrieval Augmented Generation adds real documents to prompts for
          accurate, grounded answers.
        </p>
      </div>
      <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
        <h3 className="font-bold text-pink-800 mb-2">✨ Better Prompts</h3>
        <p className="text-sm text-pink-700">
          Be specific, add context, use examples, and request structure for
          dramatically better results.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Prompt engineering is the art of communicating effectively with AI. A
        well-crafted prompt can be the difference between a useless response and
        exactly what you need. As you work with Azure AI services, mastering
        prompts will be one of your most valuable skills!
      </p>
    </div>
  </Section>
);

export default function PromptsGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-[1536px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            💬 Prompts & Prompt Engineering
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Communicating with AI
          </p>
        </div>

        <ConceptIntro />
        <PromptTypes />
        <ConversationHistory />
        <RAGSection />
        <PromptTipsSection />
        <InteractivePromptBuilder />
        <SummarySection />
      </div>
    </div>
  );
}
