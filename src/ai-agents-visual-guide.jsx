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
  <Section title="🤖 What are AI Agents?" color="#8b5cf6">
    <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div>
        <p className="text-gray-700 mb-4">
          AI agents aren't just chatbots that <em>answer</em> questions —
          they're digital assistants that
          <strong> actually get things done</strong>!
        </p>

        <div className="space-y-3">
          <div className="bg-gray-50 rounded-xl p-4 border-l-4 border-gray-300">
            <div className="text-sm text-gray-500 mb-1">💬 Regular Chatbot</div>
            <p className="font-medium">"Here's how to book a flight..."</p>
            <p className="text-sm text-gray-500 mt-1">Just gives information</p>
          </div>

          <div className="flex justify-center">
            <span className="text-2xl">⬇️</span>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border-l-4 border-purple-500">
            <div className="text-sm text-purple-600 mb-1">🤖 AI Agent</div>
            <p className="font-medium">
              "Done! I've booked your flight to Tokyo, added it to your
              calendar, and sent the confirmation to your email."
            </p>
            <p className="text-sm text-purple-500 mt-1">Takes action!</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3">What makes an agent special:</h3>
        <div className="space-y-2">
          {[
            {
              icon: "🧠",
              title: "Reasons",
              desc: "Understands context and makes decisions",
            },
            {
              icon: "🔧",
              title: "Uses Tools",
              desc: "Interacts with external systems and APIs",
            },
            {
              icon: "🎯",
              title: "Takes Action",
              desc: "Actually does things, not just suggests",
            },
            {
              icon: "🔄",
              title: "Adapts",
              desc: "Responds to conditions and adjusts approach",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
            >
              <span className="text-xl">{item.icon}</span>
              <div>
                <span className="font-medium text-gray-800">{item.title}</span>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const AgentComponents = () => {
  const [activeComponent, setActiveComponent] = useState("llm");

  const components = {
    llm: {
      title: "Large Language Model",
      icon: "🧠",
      color: "#8B5CF6",
      desc: 'The agent\'s "brain" — provides language understanding, reasoning, and decision-making capabilities.',
      details: [
        "Understands natural language input",
        "Reasons about what needs to be done",
        "Generates natural language responses",
        "Decides which tools to use and when",
      ],
    },
    instructions: {
      title: "Instructions (System Prompt)",
      icon: "📋",
      color: "#3B82F6",
      desc: 'The agent\'s "job description" — defines its role, personality, and behavioral guidelines.',
      details: [
        "Defines the agent's purpose and scope",
        "Sets behavioral constraints",
        "Specifies tone and communication style",
        "Establishes what the agent can/cannot do",
      ],
    },
    tools: {
      title: "Tools",
      icon: "🔧",
      color: "#22C55E",
      desc: 'The agent\'s "hands" — capabilities to interact with the real world and external systems.',
      details: [
        "Knowledge tools: Search, databases, documents",
        "Action tools: Send emails, update calendars",
        "Integration tools: APIs, external services",
        "Control tools: Manage devices, systems",
      ],
    },
  };

  const current = components[activeComponent];

  return (
    <Section title="🔩 Components of an AI Agent" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Every AI agent is built from three key components. Click each to
        explore:
      </p>

      <div className="flex flex-col md:flex-row gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        {/* Visual diagram */}
        <div className="md:w-1/2">
          <svg viewBox="0 0 300 280" className="w-full h-72">
            {/* Agent container */}
            <rect
              x="30"
              y="20"
              width="240"
              height="240"
              rx="20"
              fill="#F3F4F6"
              stroke="#E5E7EB"
              strokeWidth="2"
            />
            <text
              x="150"
              y="50"
              textAnchor="middle"
              fontSize="14"
              fill="#374151"
              fontWeight="bold"
            >
              AI Agent
            </text>

            {/* LLM - Brain */}
            <g
              onClick={() => setActiveComponent("llm")}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx="150"
                cy="100"
                r="35"
                fill={activeComponent === "llm" ? "#8B5CF6" : "#C4B5FD"}
                stroke={activeComponent === "llm" ? "#6D28D9" : "none"}
                strokeWidth="3"
              />
              <text x="150" y="95" textAnchor="middle" fontSize="24">
                🧠
              </text>
              <text
                x="150"
                y="115"
                textAnchor="middle"
                fontSize="8"
                fill="white"
                fontWeight="bold"
              >
                LLM
              </text>
            </g>

            {/* Instructions */}
            <g
              onClick={() => setActiveComponent("instructions")}
              style={{ cursor: "pointer" }}
            >
              <rect
                x="50"
                y="160"
                width="80"
                height="50"
                rx="8"
                fill={
                  activeComponent === "instructions" ? "#3B82F6" : "#93C5FD"
                }
                stroke={activeComponent === "instructions" ? "#1D4ED8" : "none"}
                strokeWidth="3"
              />
              <text x="90" y="182" textAnchor="middle" fontSize="18">
                📋
              </text>
              <text
                x="90"
                y="200"
                textAnchor="middle"
                fontSize="7"
                fill="white"
                fontWeight="bold"
              >
                Instructions
              </text>
            </g>

            {/* Tools */}
            <g
              onClick={() => setActiveComponent("tools")}
              style={{ cursor: "pointer" }}
            >
              <rect
                x="170"
                y="160"
                width="80"
                height="50"
                rx="8"
                fill={activeComponent === "tools" ? "#22C55E" : "#86EFAC"}
                stroke={activeComponent === "tools" ? "#166534" : "none"}
                strokeWidth="3"
              />
              <text x="210" y="182" textAnchor="middle" fontSize="18">
                🔧
              </text>
              <text
                x="210"
                y="200"
                textAnchor="middle"
                fontSize="7"
                fill="white"
                fontWeight="bold"
              >
                Tools
              </text>
            </g>

            {/* Connecting lines */}
            <line
              x1="130"
              y1="130"
              x2="100"
              y2="160"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            <line
              x1="170"
              y1="130"
              x2="200"
              y2="160"
              stroke="#9CA3AF"
              strokeWidth="2"
            />

            {/* External arrows for tools */}
            <path
              d="M 250,185 L 280,185"
              stroke="#22C55E"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <text x="285" y="180" fontSize="8" fill="#22C55E">
              APIs
            </text>
            <text x="285" y="192" fontSize="8" fill="#22C55E">
              Services
            </text>
          </svg>
        </div>

        {/* Details panel */}
        <div className="md:w-1/2">
          <div
            className="rounded-xl p-5 border-2 transition-all"
            style={{
              backgroundColor: `${current.color}10`,
              borderColor: current.color,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{current.icon}</span>
              <h3
                className="font-bold text-lg"
                style={{ color: current.color }}
              >
                {current.title}
              </h3>
            </div>

            <p className="text-gray-700 mb-4">{current.desc}</p>

            <div className="space-y-2">
              {current.details.map((detail, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: current.color }}
                  />
                  <span className="text-gray-600">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const ToolsDeepDive = () => {
  const [selectedCategory, setSelectedCategory] = useState("knowledge");

  const toolCategories = {
    knowledge: {
      title: "Knowledge Tools",
      icon: "📚",
      color: "#3B82F6",
      desc: "Access and retrieve information",
      examples: [
        {
          name: "Web Search",
          icon: "🔍",
          action: "Search the internet for current info",
        },
        {
          name: "Database Query",
          icon: "🗄️",
          action: "Look up records and data",
        },
        {
          name: "Document Reader",
          icon: "📄",
          action: "Read and understand files",
        },
        {
          name: "Knowledge Base",
          icon: "📖",
          action: "Access company documentation",
        },
      ],
    },
    action: {
      title: "Action Tools",
      icon: "⚡",
      color: "#22C55E",
      desc: "Perform tasks and make changes",
      examples: [
        { name: "Send Email", icon: "📧", action: "Compose and send messages" },
        { name: "Calendar", icon: "📅", action: "Create/modify appointments" },
        {
          name: "File Manager",
          icon: "📁",
          action: "Create, move, delete files",
        },
        {
          name: "API Calls",
          icon: "🔗",
          action: "Interact with external services",
        },
      ],
    },
  };

  const current = toolCategories[selectedCategory];

  return (
    <Section title="🛠️ Types of Tools" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Tools are what give agents their superpowers. There are two main
        categories:
      </p>

      <div className="flex gap-2 mb-6">
        {Object.entries(toolCategories).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => setSelectedCategory(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedCategory === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedCategory === key ? cat.color : undefined,
            }}
          >
            {cat.icon} {cat.title}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-5 border-2"
        style={{
          backgroundColor: `${current.color}10`,
          borderColor: current.color,
        }}
      >
        <h3
          className="font-bold text-lg mb-2 flex items-center gap-2"
          style={{ color: current.color }}
        >
          {current.icon} {current.title}
        </h3>
        <p className="text-gray-600 mb-4">{current.desc}</p>

        <div className="grid grid-cols-2 gap-3">
          {current.examples.map((tool, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-3 border flex items-start gap-3"
            >
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <div className="font-medium text-gray-800">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.action}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const AgentInAction = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    {
      title: "User Request",
      icon: "👤",
      desc: '"Book a flight to Tokyo next Friday and add it to my calendar"',
      thinking: null,
    },
    {
      title: "Agent Reasons",
      icon: "🧠",
      desc: "Breaking down the task...",
      thinking:
        "1. Search for flights to Tokyo\n2. Find options for next Friday\n3. Book the best option\n4. Add to calendar",
    },
    {
      title: "Search Flights",
      icon: "🔍",
      desc: "Using flight search tool...",
      thinking:
        'Tool: search_flights("Tokyo", "next Friday")\nResult: Found 5 options, cheapest is $450',
    },
    {
      title: "Book Flight",
      icon: "✈️",
      desc: "Using booking tool...",
      thinking:
        'Tool: book_flight(flight_id: "JL123")\nResult: Booking confirmed! Confirmation #TK789',
    },
    {
      title: "Update Calendar",
      icon: "📅",
      desc: "Using calendar tool...",
      thinking:
        'Tool: create_event("Flight to Tokyo", date, time)\nResult: Event added to calendar',
    },
    {
      title: "Response",
      icon: "✅",
      desc: "\"Done! I've booked flight JL123 to Tokyo for next Friday at 10:30 AM ($450). It's been added to your calendar with all the details.\"",
      thinking: null,
    },
  ];

  useEffect(() => {
    let interval;
    if (isRunning && step < steps.length - 1) {
      interval = setInterval(() => {
        setStep((s) => {
          const nextStep = s + 1;
          if (nextStep >= steps.length - 1) {
            // Defer state update to avoid cascading renders
            setTimeout(() => setIsRunning(false), 0);
          }
          return nextStep;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isRunning, step, steps.length]);

  return (
    <Section title="⚡ Agent in Action" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Watch an AI agent complete a multi-step task using multiple tools:
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsRunning(true);
          }}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          ▶️ Run Agent
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`flex-1 h-2 rounded-full transition-all ${
              i <= step ? "bg-amber-500" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Current step */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{steps[step].icon}</span>
            <div>
              <div className="text-sm text-amber-600">
                Step {step + 1} of {steps.length}
              </div>
              <div className="font-bold text-amber-800">
                {steps[step].title}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="text-gray-700">{steps[step].desc}</p>
          </div>
        </div>

        {/* Agent thinking */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="text-sm font-semibold text-gray-600 mb-2">
            🧠 Agent's Internal Process:
          </div>
          <div className="bg-white rounded-lg p-3 border font-mono text-sm min-h-24">
            {steps[step].thinking ? (
              <pre className="whitespace-pre-wrap text-gray-600">
                {steps[step].thinking}
              </pre>
            ) : (
              <span className="text-gray-400 italic">
                {step === 0 ? "Waiting for task..." : "Task complete!"}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tool usage visualization */}
      <div className="mt-4 flex justify-center gap-4">
        {["🔍", "✈️", "📅"].map((tool, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
              (i === 0 && step >= 2) ||
              (i === 1 && step >= 3) ||
              (i === 2 && step >= 4)
                ? "bg-green-100 border-2 border-green-500 scale-110"
                : "bg-gray-100 border-2 border-gray-200"
            }`}
          >
            {tool}
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-500 mt-2">Tools Used</div>
    </Section>
  );
};

const MultiAgentSystem = () => {
  const [activeAgent, setActiveAgent] = useState(null);
  const [showCommunication, setShowCommunication] = useState(false);

  const agents = [
    {
      id: "researcher",
      name: "Research Agent",
      icon: "🔍",
      color: "#3B82F6",
      role: "Gathers and analyzes information",
      tools: ["Web Search", "Database", "Documents"],
    },
    {
      id: "analyst",
      name: "Analyst Agent",
      icon: "📊",
      color: "#8B5CF6",
      role: "Processes data and finds insights",
      tools: ["Data Analysis", "Charts", "Reports"],
    },
    {
      id: "executor",
      name: "Action Agent",
      icon: "⚡",
      color: "#22C55E",
      role: "Takes action based on decisions",
      tools: ["Email", "Calendar", "APIs"],
    },
  ];

  return (
    <Section title="🤝 Multi-Agent Systems" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Instead of one agent doing everything, multiple specialized agents can{" "}
        <strong>collaborate</strong> like a team!
      </p>

      <div className="bg-indigo-50 rounded-xl p-6 mb-4">
        <svg viewBox="0 0 400 200" className="w-full h-48">
          {/* Orchestrator */}
          <g>
            <circle cx="200" cy="40" r="30" fill="#1E293B" />
            <text x="200" y="35" textAnchor="middle" fontSize="20">
              🎯
            </text>
            <text x="200" y="50" textAnchor="middle" fontSize="7" fill="white">
              Orchestrator
            </text>
          </g>

          {/* Connecting lines */}
          {showCommunication && (
            <>
              <line
                x1="175"
                y1="60"
                x2="100"
                y2="100"
                stroke="#6366F1"
                strokeWidth="2"
                strokeDasharray="5,3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="200"
                y1="70"
                x2="200"
                y2="100"
                stroke="#6366F1"
                strokeWidth="2"
                strokeDasharray="5,3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="225"
                y1="60"
                x2="300"
                y2="100"
                stroke="#6366F1"
                strokeWidth="2"
                strokeDasharray="5,3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </>
          )}
          {!showCommunication && (
            <>
              <line
                x1="175"
                y1="60"
                x2="100"
                y2="100"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <line
                x1="200"
                y1="70"
                x2="200"
                y2="100"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <line
                x1="225"
                y1="60"
                x2="300"
                y2="100"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
            </>
          )}

          {/* Agent connections */}
          {showCommunication && (
            <>
              <line
                x1="130"
                y1="140"
                x2="170"
                y2="140"
                stroke="#6366F1"
                strokeWidth="2"
                strokeDasharray="5,3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </line>
              <line
                x1="230"
                y1="140"
                x2="270"
                y2="140"
                stroke="#6366F1"
                strokeWidth="2"
                strokeDasharray="5,3"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </line>
            </>
          )}

          {/* Agents */}
          {agents.map((agent, i) => {
            const x = 100 + i * 100;
            const isActive = activeAgent === agent.id;
            return (
              <g
                key={agent.id}
                onClick={() => setActiveAgent(isActive ? null : agent.id)}
                style={{ cursor: "pointer" }}
              >
                <circle
                  cx={x}
                  cy="140"
                  r={isActive ? 35 : 30}
                  fill={agent.color}
                  stroke={isActive ? "#1E293B" : "none"}
                  strokeWidth="3"
                  className="transition-all"
                />
                <text x={x} y="135" textAnchor="middle" fontSize="24">
                  {agent.icon}
                </text>
                <text
                  x={x}
                  y="155"
                  textAnchor="middle"
                  fontSize="7"
                  fill="white"
                >
                  {agent.name.split(" ")[0]}
                </text>
              </g>
            );
          })}

          {/* Labels */}
          <text
            x="200"
            y="190"
            textAnchor="middle"
            fontSize="10"
            fill="#6B7280"
          >
            Click an agent to learn more
          </text>
        </svg>

        <div className="flex justify-center">
          <button
            onClick={() => setShowCommunication(!showCommunication)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              showCommunication
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-300"
            }`}
          >
            {showCommunication ? "🔴 Stop" : "▶️ Show"} Agent Communication
          </button>
        </div>
      </div>

      {/* Agent details */}
      {activeAgent && (
        <div
          className="rounded-xl p-4 border-2 transition-all"
          style={{
            backgroundColor: `${
              agents.find((a) => a.id === activeAgent).color
            }10`,
            borderColor: agents.find((a) => a.id === activeAgent).color,
          }}
        >
          {(() => {
            const agent = agents.find((a) => a.id === activeAgent);
            return (
              <div className="flex items-start gap-4">
                <span className="text-4xl">{agent.icon}</span>
                <div>
                  <h3
                    className="font-bold text-lg"
                    style={{ color: agent.color }}
                  >
                    {agent.name}
                  </h3>
                  <p className="text-gray-600 mb-2">{agent.role}</p>
                  <div className="flex flex-wrap gap-2">
                    {agent.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-white rounded text-sm border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          💡 How They Communicate
        </h4>
        <p className="text-sm text-yellow-700">
          Agents communicate through <strong>prompts</strong>! The orchestrator
          uses natural language to delegate tasks, and agents use generative AI
          to determine what's needed and who should do it.
        </p>
      </div>
    </Section>
  );
};

const RealWorldExamples = () => {
  const examples = [
    {
      title: "Customer Service Agent",
      icon: "💬",
      color: "#3B82F6",
      tasks: [
        "Answer questions",
        "Look up orders",
        "Process returns",
        "Escalate issues",
      ],
    },
    {
      title: "Coding Assistant",
      icon: "💻",
      color: "#22C55E",
      tasks: ["Write code", "Run tests", "Fix bugs", "Deploy changes"],
    },
    {
      title: "Research Agent",
      icon: "🔬",
      color: "#8B5CF6",
      tasks: [
        "Search papers",
        "Summarize findings",
        "Compare data",
        "Generate reports",
      ],
    },
    {
      title: "Personal Assistant",
      icon: "📱",
      color: "#F59E0B",
      tasks: ["Manage calendar", "Send emails", "Book travel", "Set reminders"],
    },
  ];

  return (
    <Section title="🌍 Real-World AI Agents" color="#ec4899">
      <p className="text-gray-700 mb-4">
        AI agents are already being used in many domains. Here are some
        examples:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {examples.map((example, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border-2 hover:scale-102 transition-all"
            style={{
              backgroundColor: `${example.color}10`,
              borderColor: `${example.color}40`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{example.icon}</span>
              <h3 className="font-bold" style={{ color: example.color }}>
                {example.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {example.tasks.map((task, j) => (
                <span
                  key={j}
                  className="px-2 py-1 bg-white rounded-full text-xs border"
                  style={{ borderColor: `${example.color}40` }}
                >
                  {task}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-pink-50 rounded-lg p-4 border border-pink-200">
        <p className="text-sm text-pink-700">
          <strong>🚀 At Microsoft:</strong> Azure AI Agent Service, Copilot, and
          Power Automate all leverage agent capabilities to automate workflows
          and boost productivity!
        </p>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">🤖 Beyond Chatbots</h3>
        <p className="text-sm text-purple-700">
          AI agents don't just answer — they reason, plan, and take action to
          complete complex tasks autonomously.
        </p>
      </div>
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🔩 Three Components</h3>
        <p className="text-sm text-blue-700">
          LLM (brain) + Instructions (job description) + Tools (capabilities) =
          Powerful AI Agent
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">🛠️ Tools Are Key</h3>
        <p className="text-sm text-green-700">
          Knowledge tools retrieve info; Action tools make changes. Tools let
          agents interact with the real world.
        </p>
      </div>
      <div className="bg-linear-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
        <h3 className="font-bold text-indigo-800 mb-2">
          🤝 Multi-Agent Systems
        </h3>
        <p className="text-sm text-indigo-700">
          Specialized agents can collaborate, communicating through prompts to
          tackle complex workflows as a team.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Agentic AI represents the next frontier — moving from AI that{" "}
        <em>informs</em> to AI that <em>acts</em>.
      </p>
    </div>
  </Section>
);

export default function AIAgentsGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🤖 AI Agents
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Autonomous AI Systems
          </p>
        </div>

        <ConceptIntro />
        <AgentComponents />
        <ToolsDeepDive />
        <AgentInAction />
        <MultiAgentSystem />
        <RealWorldExamples />
        <SummarySection />
      </div>
    </div>
  );
}
