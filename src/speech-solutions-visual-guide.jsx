import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
  </div>
);

const ConceptIntro = () => {
  const [direction, setDirection] = useState("stt");

  return (
    <Section title="🎤 What are Speech-Enabled Solutions?" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Speech technologies enable natural voice interactions with AI. There are
        two core capabilities:
      </p>

      <div className="flex gap-2 justify-center mb-6">
        <button
          onClick={() => setDirection("stt")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            direction === "stt"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🎤 Speech-to-Text
        </button>
        <button
          onClick={() => setDirection("tts")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            direction === "tts"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          🔊 Text-to-Speech
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {direction === "stt" ? (
          <div className="flex flex-col md:flex-row items-center justify-center gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-4xl">🗣️</span>
              </div>
              <div className="font-medium text-blue-700">Spoken Words</div>
              <div className="text-sm text-gray-500">"Hello, how are you?"</div>
            </div>

            <div className="flex flex-col items-center">
              <svg width="80" height="40" viewBox="0 0 80 40">
                <defs>
                  <linearGradient
                    id="sttGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5,20 L 65,20"
                  stroke="url(#sttGrad)"
                  strokeWidth="3"
                  fill="none"
                />
                <polygon points="65,15 75,20 65,25" fill="#8B5CF6" />
              </svg>
              <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium mt-1">
                Speech Recognition
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-4xl">📝</span>
              </div>
              <div className="font-medium text-purple-700">Text Output</div>
              <div className="text-sm text-gray-500 font-mono">
                "Hello, how are you?"
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center justify-center gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-4xl">📝</span>
              </div>
              <div className="font-medium text-green-700">Text Input</div>
              <div className="text-sm text-gray-500 font-mono">
                "Welcome to our service"
              </div>
            </div>

            <div className="flex flex-col items-center">
              <svg width="80" height="40" viewBox="0 0 80 40">
                <defs>
                  <linearGradient
                    id="ttsGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path
                  d="M 5,20 L 65,20"
                  stroke="url(#ttsGrad)"
                  strokeWidth="3"
                  fill="none"
                />
                <polygon points="65,15 75,20 65,25" fill="#10B981" />
              </svg>
              <div className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium mt-1">
                Speech Synthesis
              </div>
            </div>

            <div className="text-center">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mb-2 mx-auto">
                <span className="text-4xl">🔊</span>
              </div>
              <div className="font-medium text-teal-700">Audio Output</div>
              <div className="text-sm text-gray-500">
                Natural-sounding voice
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "♿", title: "Accessibility", desc: "Serve all users" },
          { icon: "⚡", title: "Productivity", desc: "Hands-free operation" },
          { icon: "💬", title: "Natural UX", desc: "Human-like conversations" },
          { icon: "🌍", title: "Global Reach", desc: "Multiple languages" },
        ].map((item, i) => (
          <div key={i} className="bg-purple-50 rounded-lg p-3 text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-sm text-purple-800">
              {item.title}
            </div>
            <div className="text-xs text-purple-600">{item.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const SpeechRecognitionScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState("customer");

  const scenarios = {
    customer: {
      title: "Customer Service & Support",
      icon: "📞",
      color: "#3B82F6",
      uses: [
        "Transcribe customer calls in real time",
        "Route callers based on what they say",
        "Analyze call sentiment",
        "Generate searchable call records",
      ],
      value: "Reduces manual note-taking, improves response accuracy",
      visual: (
        <svg viewBox="0 0 200 100" className="w-full h-24">
          <circle cx="30" cy="50" r="20" fill="#3B82F6" opacity="0.2" />
          <text x="30" y="55" textAnchor="middle" fontSize="20">
            👤
          </text>

          <path
            d="M 55,50 Q 80,30 100,50 Q 120,70 145,50"
            stroke="#3B82F6"
            strokeWidth="2"
            fill="none"
            strokeDasharray="4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-16"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
          <text x="100" y="35" textAnchor="middle" fontSize="8" fill="#3B82F6">
            "I need help with..."
          </text>

          <rect x="150" y="35" width="40" height="30" rx="5" fill="#3B82F6" />
          <text x="170" y="55" textAnchor="middle" fontSize="16" fill="white">
            🤖
          </text>
        </svg>
      ),
    },
    assistant: {
      title: "Voice Assistants & Agents",
      icon: "🎙️",
      color: "#8B5CF6",
      uses: [
        "Accept voice commands hands-free",
        "Answer questions naturally",
        "Complete tasks like reminders & messages",
        "Control smart home devices",
      ],
      value: "Enables operation when screens aren't practical",
      visual: (
        <svg viewBox="0 0 200 100" className="w-full h-24">
          <circle cx="100" cy="50" r="35" fill="#8B5CF6" opacity="0.2" />
          <circle cx="100" cy="50" r="25" fill="#8B5CF6" opacity="0.3" />
          <circle cx="100" cy="50" r="15" fill="#8B5CF6" />
          <text x="100" y="55" textAnchor="middle" fontSize="16" fill="white">
            🎙️
          </text>

          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 100 + Math.cos(rad) * 45;
            const y = 50 + Math.sin(rad) * 35;
            const icons = ["💡", "🔊", "📅", "🏠", "📱", "🚗"];
            return (
              <text key={i} x={x} y={y + 5} textAnchor="middle" fontSize="14">
                {icons[i]}
              </text>
            );
          })}
        </svg>
      ),
    },
    meeting: {
      title: "Meeting & Interview Transcription",
      icon: "📋",
      color: "#22C55E",
      uses: [
        "Create searchable meeting notes",
        "Provide real-time captions",
        "Generate interview summaries",
        "Extract key discussion points",
      ],
      value: "Saves hours of manual transcription work",
      visual: (
        <svg viewBox="0 0 200 100" className="w-full h-24">
          {[40, 80, 120, 160].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="30" r="12" fill="#22C55E" opacity="0.3" />
              <text x={x} y="35" textAnchor="middle" fontSize="12">
                👤
              </text>
            </g>
          ))}

          <rect
            x="30"
            y="55"
            width="140"
            height="35"
            rx="5"
            fill="#22C55E"
            opacity="0.1"
            stroke="#22C55E"
            strokeWidth="1"
          />
          <text x="40" y="70" fontSize="8" fill="#22C55E">
            Meeting transcript...
          </text>
          <text x="40" y="82" fontSize="8" fill="#22C55E">
            Action items: 1. Review... 2. Follow up...
          </text>
        </svg>
      ),
    },
    healthcare: {
      title: "Healthcare Documentation",
      icon: "🏥",
      color: "#EF4444",
      uses: [
        "Dictate patient notes to EHR",
        "Update treatment plans hands-free",
        "Reduce administrative burden",
        "Capture details in the moment",
      ],
      value: "Increases time for patient care, improves accuracy",
      visual: (
        <svg viewBox="0 0 200 100" className="w-full h-24">
          <circle cx="50" cy="50" r="25" fill="#EF4444" opacity="0.2" />
          <text x="50" y="55" textAnchor="middle" fontSize="24">
            👨‍⚕️
          </text>

          <path
            d="M 80,50 L 120,50"
            stroke="#EF4444"
            strokeWidth="2"
            strokeDasharray="4"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-8"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </path>

          <rect
            x="130"
            y="25"
            width="50"
            height="50"
            rx="5"
            fill="#EF4444"
            opacity="0.1"
            stroke="#EF4444"
          />
          <text x="155" y="45" textAnchor="middle" fontSize="8" fill="#EF4444">
            Patient Notes
          </text>
          <text x="155" y="58" textAnchor="middle" fontSize="6" fill="#666">
            Diagnosis: ...
          </text>
          <text x="155" y="68" textAnchor="middle" fontSize="6" fill="#666">
            Treatment: ...
          </text>
        </svg>
      ),
    },
  };

  const current = scenarios[selectedScenario];

  return (
    <Section title="🎤 Speech Recognition Scenarios" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        <strong>Speech-to-text</strong> converts spoken words into written text.
        Click to explore common use cases:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelectedScenario(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedScenario === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedScenario === key ? scenario.color : undefined,
            }}
          >
            {scenario.icon} {scenario.title}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-5 border-2"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{current.icon}</span>
              <h3
                className="font-bold text-lg"
                style={{ color: current.color }}
              >
                {current.title}
              </h3>
            </div>

            <div className="space-y-2 mb-4">
              {current.uses.map((use, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <span style={{ color: current.color }}>✓</span>
                  <span className="text-gray-700">{use}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg p-3">
              <span className="text-xs font-semibold text-gray-500">
                BUSINESS VALUE:
              </span>
              <p className="text-sm text-gray-700">{current.value}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 flex items-center justify-center">
            {current.visual}
          </div>
        </div>
      </div>
    </Section>
  );
};

const SpeechSynthesisScenarios = () => {
  const [selectedScenario, setSelectedScenario] = useState("chatbot");

  const scenarios = {
    chatbot: {
      title: "Conversational AI & Chatbots",
      icon: "🤖",
      color: "#22C55E",
      uses: [
        "Respond with natural-sounding voices",
        "Adjust tone, pace, and speaking style",
        "Handle phone-based customer inquiries",
        "Consistent brand voice experience",
      ],
      value: "Makes AI agents more approachable and human-like",
    },
    accessibility: {
      title: "Accessibility & Content",
      icon: "♿",
      color: "#8B5CF6",
      uses: [
        "Read content aloud for visual impairments",
        "Support users with dyslexia",
        "Enable content consumption while multitasking",
        "Provide audio alternatives to text",
      ],
      value: "Expands audience reach and demonstrates inclusion",
    },
    notifications: {
      title: "Notifications & Alerts",
      icon: "🔔",
      color: "#F59E0B",
      uses: [
        "Announce important alerts and reminders",
        "Provide navigation instructions (GPS)",
        "Deliver time-sensitive information",
        "Communicate system status",
      ],
      value: "Ensures critical info reaches users without visual attention",
    },
    elearning: {
      title: "E-Learning & Training",
      icon: "📚",
      color: "#3B82F6",
      uses: [
        "Create narrated lessons without recording studios",
        "Provide pronunciation examples",
        "Generate audio versions of materials",
        "Scale content across languages",
      ],
      value: "Reduces content creation costs significantly",
    },
    entertainment: {
      title: "Entertainment & Media",
      icon: "🎬",
      color: "#EF4444",
      uses: [
        "Generate character voices for games",
        "Produce podcast and audiobook drafts",
        "Create video voiceovers",
        "Personalize audio content",
      ],
      value: "Lowers production costs, enables rapid prototyping",
    },
  };

  const current = scenarios[selectedScenario];

  return (
    <Section title="🔊 Speech Synthesis Scenarios" color="#22c55e">
      <p className="text-gray-700 mb-4">
        <strong>Text-to-speech</strong> converts written text into
        natural-sounding audio. Click to explore:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelectedScenario(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedScenario === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedScenario === key ? scenario.color : undefined,
            }}
          >
            {scenario.icon} {scenario.title.split(" & ")[0]}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-5 border-2"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{current.icon}</span>
          <h3 className="font-bold text-lg" style={{ color: current.color }}>
            {current.title}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            {current.uses.map((use, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm bg-white rounded-lg p-2"
              >
                <span style={{ color: current.color }}>🔊</span>
                <span className="text-gray-700">{use}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg p-4 text-center">
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5, 4, 3, 2, 3, 4, 5, 3, 2].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 rounded-full transition-all"
                    style={{
                      height: `${h * 8}px`,
                      backgroundColor: current.color,
                      opacity: 0.4 + h * 0.12,
                    }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">
                Natural-sounding audio waveform
              </p>
            </div>

            <div className="mt-4 bg-white rounded-lg p-3">
              <span className="text-xs font-semibold text-gray-500">
                BUSINESS VALUE:
              </span>
              <p className="text-sm text-gray-700">{current.value}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const CombinedExperience = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const conversation = [
    { type: "user-speech", text: '"What\'s my account balance?"', icon: "🗣️" },
    { type: "stt", text: "Speech → Text", icon: "🎤" },
    { type: "processing", text: "AI Processing...", icon: "🧠" },
    { type: "tts", text: "Text → Speech", icon: "🔊" },
    { type: "ai-speech", text: '"Your balance is $2,450.00"', icon: "🤖" },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && step < conversation.length - 1) {
      interval = setInterval(() => {
        setStep((s) => {
          const newStep = s + 1;
          if (newStep >= conversation.length - 1) {
            setIsPlaying(false);
          }
          return newStep;
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step, conversation.length]);

  const examples = [
    {
      icon: "📞",
      title: "Voice Customer Service",
      desc: "Listen → Process → Respond",
    },
    { icon: "📱", title: "IVR Systems", desc: "Natural phone dialogue" },
    { icon: "🗣️", title: "Language Learning", desc: "Practice → Feedback" },
    {
      icon: "🚗",
      title: "Voice-Controlled Vehicles",
      desc: "Hands-free commands",
    },
  ];

  return (
    <Section title="🔄 Combining Both: Conversational AI" color="#6366f1">
      <p className="text-gray-700 mb-4">
        The most powerful applications combine <strong>both</strong> speech
        recognition and synthesis to create natural, two-way conversations:
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsPlaying(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          ▶️ Play Conversation
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-indigo-50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          {conversation.map((item, i) => (
            <div
              key={i}
              className={`flex flex-col items-center transition-all ${
                i <= step ? "opacity-100 scale-100" : "opacity-30 scale-90"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  i <= step
                    ? item.type.includes("user")
                      ? "bg-blue-500"
                      : item.type === "stt"
                      ? "bg-blue-400"
                      : item.type === "processing"
                      ? "bg-purple-500"
                      : item.type === "tts"
                      ? "bg-green-400"
                      : "bg-green-500"
                    : "bg-gray-300"
                } ${i === step ? "ring-4 ring-indigo-300" : ""}`}
              >
                {item.icon}
              </div>
              <div className="text-xs text-center mt-1 max-w-16 text-gray-600">
                {item.text.length > 20
                  ? item.text.substring(0, 18) + "..."
                  : item.text}
              </div>
            </div>
          ))}
        </div>

        {/* Flow arrows */}
        <div className="flex justify-between px-8">
          {[0, 1, 2, 3].map((i) => (
            <svg
              key={i}
              width="40"
              height="20"
              viewBox="0 0 40 20"
              className={step > i ? "opacity-100" : "opacity-30"}
            >
              <path d="M 0,10 L 30,10" stroke="#6366F1" strokeWidth="2" />
              <polygon points="30,5 40,10 30,15" fill="#6366F1" />
            </svg>
          ))}
        </div>

        <div className="mt-4 text-center">
          <div
            className={`inline-block px-4 py-2 rounded-lg ${
              step === 0
                ? "bg-blue-100 text-blue-800"
                : step === 4
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {conversation[step].text}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {examples.map((ex, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{ex.icon}</span>
            <div className="font-medium text-sm text-gray-800">{ex.title}</div>
            <div className="text-xs text-gray-500">{ex.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ConsiderationsSection = () => {
  const [selectedFactor, setSelectedFactor] = useState("audio");

  const factors = {
    audio: {
      title: "Audio Quality",
      icon: "🎧",
      color: "#3B82F6",
      desc: "Background noise, microphone quality, and network bandwidth affect recognition accuracy.",
      tip: "Test with realistic audio conditions, not just quiet studios.",
    },
    language: {
      title: "Language & Dialects",
      icon: "🌍",
      color: "#22C55E",
      desc: "Verify that your target languages and regional variations are supported.",
      tip: "Consider accents, slang, and domain-specific vocabulary.",
    },
    privacy: {
      title: "Privacy & Compliance",
      icon: "🔒",
      color: "#8B5CF6",
      desc: "Understand how audio data is processed, stored, and protected.",
      tip: "Check GDPR, HIPAA, or other regulatory requirements.",
    },
    latency: {
      title: "Latency",
      icon: "⏱️",
      color: "#F59E0B",
      desc: "Real-time conversations require low-latency processing.",
      tip: "Batch transcription can tolerate delays; live chat cannot.",
    },
    accessibility: {
      title: "Accessibility Standards",
      icon: "♿",
      color: "#EF4444",
      desc: "Ensure implementation meets WCAG guidelines.",
      tip: "Always provide alternative input/output methods!",
    },
  };

  const current = factors[selectedFactor];

  return (
    <Section title="⚠️ Key Considerations" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Before implementing speech capabilities, evaluate these important
        factors:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(factors).map(([key, factor]) => (
          <button
            key={key}
            onClick={() => setSelectedFactor(key)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedFactor === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedFactor === key ? factor.color : undefined,
            }}
          >
            {factor.icon} {factor.title}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-5 border-2"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{current.icon}</span>
          <h3 className="font-bold text-lg" style={{ color: current.color }}>
            {current.title}
          </h3>
        </div>

        <p className="text-gray-700 mb-4">{current.desc}</p>

        <div className="bg-white rounded-lg p-3 flex items-start gap-2">
          <span className="text-xl">💡</span>
          <div>
            <span className="font-semibold text-sm text-gray-600">TIP: </span>
            <span className="text-sm text-gray-700">{current.tip}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-red-50 rounded-lg p-4 border border-red-200">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🚨</span>
          <div>
            <h4 className="font-bold text-red-800">Important</h4>
            <p className="text-sm text-red-700">
              Always provide alternative input and output methods. Some users
              may prefer or require text-based interfaces even when speech is
              available.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const AzureIntegration = () => (
  <Section title="☁️ Azure Speech Services" color="#0078d4">
    <p className="text-gray-700 mb-4">
      At Microsoft, you'll work with <strong>Azure AI Speech Services</strong>{" "}
      to implement these capabilities:
    </p>

    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
          🎤 Speech-to-Text
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Real-time transcription</li>
          <li>• Batch transcription for recordings</li>
          <li>• Custom speech models</li>
          <li>• 100+ languages supported</li>
        </ul>
      </div>

      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
          🔊 Text-to-Speech
        </h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Neural voices (natural-sounding)</li>
          <li>• Custom voice creation</li>
          <li>• SSML for fine control</li>
          <li>• Emotion and style adjustments</li>
        </ul>
      </div>
    </div>

    <div className="bg-gray-50 rounded-xl p-4">
      <h4 className="font-semibold text-gray-800 mb-2">
        🔧 Related Azure Services:
      </h4>
      <div className="flex flex-wrap gap-2">
        {[
          "Azure AI Speech",
          "Azure Bot Service",
          "Azure Communication Services",
          "Copilot Studio",
          "Power Virtual Agents",
        ].map((service, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-white rounded-full text-sm border border-blue-200 text-blue-700"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  </Section>
);

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">
          🎤 Speech Recognition (STT)
        </h3>
        <p className="text-sm text-blue-700">
          Converts spoken words to text. Powers call centers, voice assistants,
          meeting transcription, and healthcare documentation.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">
          🔊 Speech Synthesis (TTS)
        </h3>
        <p className="text-sm text-green-700">
          Converts text to natural audio. Powers chatbots, accessibility tools,
          alerts, e-learning, and entertainment.
        </p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">
          🔄 Combined Experience
        </h3>
        <p className="text-sm text-purple-700">
          Both together enable natural two-way conversations: voice customer
          service, IVR, language learning, vehicle controls.
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">⚠️ Key Considerations</h3>
        <p className="text-sm text-amber-700">
          Audio quality, language support, privacy/compliance, latency, and
          accessibility. Always offer alternatives!
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 Pro Tip</h3>
      <p className="text-gray-700">
        Start with a single speech capability focused on your highest-value
        scenario. Prove the concept works before expanding to more complex
        conversational flows. This approach reduces risk and builds stakeholder
        confidence!
      </p>
    </div>
  </Section>
);

export default function SpeechSolutionsGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎤 Speech-Enabled Solutions
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Voice AI Technologies
          </p>
        </div>

        <ConceptIntro />
        <SpeechRecognitionScenarios />
        <SpeechSynthesisScenarios />
        <CombinedExperience />
        <ConsiderationsSection />
        <AzureIntegration />
        <SummarySection />
      </div>
    </div>
  );
}
