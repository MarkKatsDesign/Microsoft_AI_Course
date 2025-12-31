import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const OverviewSection = () => {
  const [activeComponent, setActiveComponent] = useState("user");

  const components = {
    user: {
      name: "User",
      icon: "👤",
      desc: "Asks questions or requests tasks",
    },
    app: {
      name: "Application",
      icon: "📱",
      desc: "Interface that connects user to AI",
    },
    model: {
      name: "Language Model",
      icon: "🧠",
      desc: "Powers reasoning and understanding",
    },
  };

  return (
    <Section title="🤖 Generative AI Applications Overview" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Generative AI applications are built with{" "}
        <strong>language models</strong> that power the app logic. These models
        enable natural interaction between users and AI.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-center gap-4 flex-wrap">
          {Object.entries(components).map(([key, comp], i) => (
            <React.Fragment key={key}>
              <button
                onClick={() => setActiveComponent(key)}
                className={`text-center p-4 rounded-xl transition-all ${
                  activeComponent === key
                    ? "ring-4 ring-purple-300 scale-105"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    activeComponent === key ? "#8B5CF620" : "white",
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center text-3xl text-white mx-auto mb-2">
                  {comp.icon}
                </div>
                <div className="font-medium text-gray-800">{comp.name}</div>
              </button>
              {i < Object.keys(components).length - 1 && (
                <svg
                  width="40"
                  height="30"
                  viewBox="0 0 40 30"
                  className="text-purple-400"
                >
                  <path
                    d="M 5,15 L 30,15 M 25,10 L 30,15 L 25,20"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4 bg-purple-100 rounded-lg p-3 text-center">
          <span className="text-2xl mr-2">
            {components[activeComponent].icon}
          </span>
          <span className="text-purple-800">
            {components[activeComponent].desc}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💬</span>
            <h3 className="font-bold text-blue-800">Assistants</h3>
          </div>
          <p className="text-sm text-blue-700">
            Help users find information and perform tasks
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🤖</span>
            <h3 className="font-bold text-green-800">Agents</h3>
          </div>
          <p className="text-sm text-green-700">
            Execute tasks autonomously and take actions
          </p>
        </div>
      </div>
    </Section>
  );
};

const AssistantsSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [showResponse, setShowResponse] = useState(false);

  const handleDemo = () => {
    setIsTyping(true);
    setShowResponse(false);
    setTimeout(() => {
      setIsTyping(false);
      setShowResponse(true);
    }, 1500);
  };

  return (
    <Section title="💬 Understanding Assistants" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Assistants are chat-based AI integrated into applications to help users
        find information and perform tasks efficiently.{" "}
        <strong>Microsoft Copilot</strong> is a prime example.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="font-bold text-blue-800">Microsoft Copilot</h3>
            <p className="text-sm text-blue-600">
              AI-powered productivity assistant
            </p>
          </div>
        </div>

        {/* Chat demo */}
        <div className="bg-white rounded-lg border overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="ml-2 text-sm text-gray-600">Copilot Chat</span>
          </div>

          <div className="p-4 min-h-40">
            {/* User message */}
            <div className="flex justify-end mb-3">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-tr-sm max-w-xs">
                What meetings do I have today?
              </div>
            </div>

            {/* AI response */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 px-4 py-2 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {showResponse && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-2 rounded-2xl rounded-tl-sm max-w-sm">
                  <p className="text-sm">You have 3 meetings today:</p>
                  <ul className="text-sm mt-2 space-y-1">
                    <li>📅 9:00 AM - Team Standup</li>
                    <li>📅 11:00 AM - Project Review</li>
                    <li>📅 2:00 PM - Client Call</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <div className="border-t p-3">
            <button
              onClick={handleDemo}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              🔄 Demo Assistant Response
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "📊", name: "Excel", desc: "Data analysis" },
          { icon: "📝", name: "Word", desc: "Document drafting" },
          { icon: "📧", name: "Outlook", desc: "Email management" },
        ].map((app, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{app.icon}</span>
            <div className="font-medium text-sm text-gray-800">{app.name}</div>
            <div className="text-xs text-gray-500">{app.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const AgentsSection = () => {
  const [activeComponent, setActiveComponent] = useState("model");
  const [taskStep, setTaskStep] = useState(0);

  const components = {
    model: {
      name: "Language Model",
      icon: "🧠",
      color: "#8B5CF6",
      desc: "Powers reasoning and language understanding",
      example: 'Understands "Book me a taxi to my meeting"',
    },
    instructions: {
      name: "Instructions",
      icon: "📋",
      color: "#3B82F6",
      desc: "Define goals, behavior, and constraints",
      example: "Always confirm before booking, stay within budget",
    },
    tools: {
      name: "Tools/Functions",
      icon: "🔧",
      color: "#22C55E",
      desc: "Enable the agent to complete tasks",
      example: "Calendar API, Maps API, Rideshare API",
    },
  };

  const taskSteps = [
    {
      icon: "🗣️",
      action: 'User: "Get me to my 2pm meeting"',
      component: "model",
    },
    {
      icon: "🧠",
      action: "Agent: Looks up meeting location",
      component: "tools",
    },
    {
      icon: "📍",
      action: "Agent: Finds address from calendar",
      component: "tools",
    },
    {
      icon: "🚕",
      action: "Agent: Books rideshare service",
      component: "tools",
    },
    {
      icon: "✅",
      action: 'Agent: "Taxi booked for 1:30 PM!"',
      component: "model",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTaskStep((s) => (s + 1) % taskSteps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [taskSteps.length]);

  const current = components[activeComponent];

  return (
    <Section title="🤖 Understanding Agents" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Agents are AI applications that can{" "}
        <strong>execute tasks autonomously</strong> and take appropriate actions
        — like filing taxes or booking transportation.
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-green-800 mb-3">
          Three Main Components of an Agent:
        </h4>

        <div className="flex gap-2 mb-4 justify-center flex-wrap">
          {Object.entries(components).map(([key, comp]) => (
            <button
              key={key}
              onClick={() => setActiveComponent(key)}
              className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeComponent === key
                  ? "text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              style={{
                backgroundColor:
                  activeComponent === key ? comp.color : undefined,
              }}
            >
              {comp.icon} {comp.name}
            </button>
          ))}
        </div>

        <div
          className="rounded-xl p-4 border-2 bg-white"
          style={{ borderColor: current.color }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white"
              style={{ backgroundColor: current.color }}
            >
              {current.icon}
            </div>
            <div>
              <h4 className="font-bold" style={{ color: current.color }}>
                {current.name}
              </h4>
              <p className="text-sm text-gray-600">{current.desc}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 mt-2">
            <span className="text-xs text-gray-500">Example: </span>
            <span className="text-sm text-gray-700">{current.example}</span>
          </div>
        </div>
      </div>

      {/* Agent in action */}
      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-700 mb-3">
          🎬 Agent in Action: "Executive Assistant"
        </h4>

        <div className="bg-white rounded-lg p-4">
          <div className="space-y-2">
            {taskSteps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                  taskStep === i ? "bg-green-100 scale-102" : "opacity-50"
                }`}
              >
                <span className="text-xl">{step.icon}</span>
                <span
                  className={`text-sm ${taskStep === i ? "font-medium" : ""}`}
                >
                  {step.action}
                </span>
                {taskStep === i && (
                  <span
                    className="ml-auto text-xs px-2 py-1 rounded text-white"
                    style={{
                      backgroundColor: components[step.component].color,
                    }}
                  >
                    {components[step.component].name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const OrchestrationSection = () => {
  const [isOrchestrating, setIsOrchestrating] = useState(false);
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: "user", name: "User Query", icon: "👤", x: 50, y: 20 },
    { id: "orchestrator", name: "Orchestrator", icon: "🎯", x: 50, y: 50 },
    { id: "model", name: "Language Model", icon: "🧠", x: 20, y: 80 },
    { id: "data", name: "Data Sources", icon: "📊", x: 50, y: 80 },
    { id: "tools", name: "Tools", icon: "🔧", x: 80, y: 80 },
  ];

  useEffect(() => {
    let interval;
    if (isOrchestrating) {
      const sequence = [
        "user",
        "orchestrator",
        "model",
        "orchestrator",
        "data",
        "orchestrator",
        "tools",
        "orchestrator",
        "user",
      ];
      let index = 0;
      interval = setInterval(() => {
        setActiveNode(sequence[index]);
        index = (index + 1) % sequence.length;
      }, 600);
    }
    return () => clearInterval(interval);
  }, [isOrchestrating]);

  return (
    <Section title="🎭 Understanding Orchestration" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        <strong>Orchestration</strong> is the process of coordinating multiple
        AI components — models, data sources, tools, and workflows — to work
        together in a unified solution.
      </p>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setIsOrchestrating(!isOrchestrating)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {isOrchestrating ? "⏸️ Pause" : "▶️ Animate Orchestration"}
          </button>
        </div>

        <div className="relative bg-white rounded-xl p-8 min-h-64">
          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <line
              x1="50"
              y1="28"
              x2="50"
              y2="45"
              stroke="#DDD"
              strokeWidth="0.5"
            />
            <line
              x1="45"
              y1="55"
              x2="25"
              y2="72"
              stroke="#DDD"
              strokeWidth="0.5"
            />
            <line
              x1="50"
              y1="58"
              x2="50"
              y2="72"
              stroke="#DDD"
              strokeWidth="0.5"
            />
            <line
              x1="55"
              y1="55"
              x2="75"
              y2="72"
              stroke="#DDD"
              strokeWidth="0.5"
            />
          </svg>

          {/* Nodes */}
          {nodes.map((node) => (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                activeNode === node.id ? "scale-125 z-10" : ""
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-all ${
                  activeNode === node.id
                    ? "bg-purple-600 text-white ring-4 ring-purple-300"
                    : node.id === "orchestrator"
                    ? "bg-purple-500 text-white"
                    : "bg-white border"
                }`}
              >
                {node.icon}
              </div>
              <div className="text-xs text-center mt-1 font-medium text-gray-600">
                {node.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Key Insight:</strong> Modern AI solutions often combine
          assistant, agentic, and other AI capabilities. The orchestrator
          coordinates them all to deliver a unified experience!
        </p>
      </div>
    </Section>
  );
};

const FrameworkSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("ready");

  const categories = {
    ready: {
      name: "Ready-to-Use",
      icon: "🎁",
      color: "#22C55E",
      customization: "None",
      effort: "Low",
      desc: "Start immediately — no programming required",
      examples: ["ChatGPT", "Microsoft Copilot", "Google Gemini"],
      howTo: "Just start asking questions!",
      visual: "box",
    },
    extend: {
      name: "Extendable",
      icon: "🔌",
      color: "#F59E0B",
      customization: "Medium",
      effort: "Medium",
      desc: "Customize with your own data and integrations",
      examples: ["Copilot + Your Data", "Custom GPTs", "Copilot Studio"],
      howTo: "Connect your data sources and configure behavior",
      visual: "plug",
    },
    build: {
      name: "Build from Foundation",
      icon: "🏗️",
      color: "#8B5CF6",
      customization: "Full",
      effort: "High",
      desc: "Create custom assistants and agents from scratch",
      examples: ["Azure AI Foundry", "Custom LLM Apps", "Agent Frameworks"],
      howTo: "Use APIs and SDKs to build your own solution",
      visual: "build",
    },
  };

  const current = categories[selectedCategory];

  return (
    <Section
      title="📊 Framework: Categories of GenAI Applications"
      color="#f59e0b"
    >
      <p className="text-gray-700 mb-4">
        Generative AI applications can be grouped into three categories based on
        customization level:
      </p>

      {/* Visual spectrum */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">Less Customization</span>
          <span className="text-xs text-gray-500">More Customization</span>
        </div>
        <div className="flex gap-2">
          {Object.entries(categories).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex-1 p-4 rounded-xl transition-all text-center ${
                selectedCategory === key
                  ? "ring-4 ring-opacity-50 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
              style={{
                backgroundColor: `${cat.color}20`,
                ringColor: cat.color,
              }}
            >
              <span className="text-3xl">{cat.icon}</span>
              <div
                className="font-medium text-sm mt-2"
                style={{ color: cat.color }}
              >
                {cat.name}
              </div>
            </button>
          ))}
        </div>
        <div className="mt-2 h-2 rounded-full bg-gradient-to-r from-green-400 via-amber-400 to-purple-500" />
      </div>

      <div
        className="rounded-xl p-4 border-2"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl text-white flex-shrink-0"
            style={{ backgroundColor: current.color }}
          >
            {current.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: current.color }}>
              {current.name}
            </h3>
            <p className="text-gray-600">{current.desc}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500">Customization:</div>
            <div className="font-bold" style={{ color: current.color }}>
              {current.customization}
            </div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500">Effort Required:</div>
            <div className="font-bold" style={{ color: current.color }}>
              {current.effort}
            </div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500">How to Start:</div>
            <div className="text-sm text-gray-700">{current.howTo}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-2">Examples:</div>
          <div className="flex flex-wrap gap-2">
            {current.examples.map((ex, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm text-white"
                style={{ backgroundColor: current.color }}
              >
                {ex}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const MicrosoftServicesSection = () => {
  const [selectedService, setSelectedService] = useState("copilot");

  const services = {
    copilot: {
      name: "Microsoft Copilot",
      icon: "🤖",
      color: "#0078D4",
      type: "Ready-to-Use + Extendable",
      desc: "AI-powered productivity assistant integrated into Microsoft 365",
      features: [
        "Chat assistant",
        "Document generation",
        "Email drafting",
        "Data analysis",
      ],
      extendable: true,
    },
    studio: {
      name: "Copilot Studio",
      icon: "🎨",
      color: "#742774",
      type: "Extendable",
      desc: "Extend Microsoft 365 Copilot with custom plugins and connectors",
      features: [
        "Custom plugins",
        "Business process integration",
        "Data connectors",
        "Low-code builder",
      ],
      extendable: true,
    },
    foundry: {
      name: "Azure AI Foundry",
      icon: "🏗️",
      color: "#00BCF2",
      type: "Build from Foundation",
      desc: "Build custom AI applications from different models",
      features: [
        "Multiple models",
        "Custom agents",
        "Full API access",
        "Enterprise features",
      ],
      extendable: false,
    },
  };

  const current = services[selectedService];

  return (
    <Section title="☁️ Microsoft Services for GenAI" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Microsoft provides services across all categories to extend and build
        generative AI applications:
      </p>

      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {Object.entries(services).map(([key, service]) => (
          <button
            key={key}
            onClick={() => setSelectedService(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedService === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedService === key ? service.color : undefined,
            }}
          >
            {service.icon} {service.name}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-4 border-2"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white"
            style={{ backgroundColor: current.color }}
          >
            {current.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg" style={{ color: current.color }}>
              {current.name}
            </h3>
            <span
              className="text-xs px-2 py-1 rounded text-white"
              style={{ backgroundColor: current.color }}
            >
              {current.type}
            </span>
            <p className="text-sm text-gray-600 mt-1">{current.desc}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-2">Key Features:</div>
          <div className="grid grid-cols-2 gap-2">
            {current.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span style={{ color: current.color }}>✓</span>
                {feat}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

const InteractiveQuizSection = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      question: 'What powers the "app logic" in generative AI applications?',
      options: ["Database", "Language Model", "Web Server", "API Gateway"],
      correct: 1,
    },
    {
      question: "Which component defines an agent's goals and constraints?",
      options: ["Tools", "Language Model", "Instructions", "Data Sources"],
      correct: 2,
    },
    {
      question: 'What is "orchestration" in AI solutions?',
      options: [
        "Training models",
        "Coordinating multiple AI components",
        "Storing data",
        "User interface design",
      ],
      correct: 1,
    },
    {
      question: "Which category requires no programming to use?",
      options: [
        "Build from Foundation",
        "Extendable",
        "Ready-to-Use",
        "Custom Agents",
      ],
      correct: 2,
    },
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    if (index === questions[currentQ].correct) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ((q) => q + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const reset = () => {
    setCurrentQ(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <Section title="🧠 Quick Knowledge Check" color="#6366f1">
      {!showResult ? (
        <div className="bg-indigo-50 rounded-xl p-4">
          <div className="text-sm text-gray-500 mb-2">
            Question {currentQ + 1} of {questions.length}
          </div>
          <div className="text-lg font-medium text-indigo-800 mb-4">
            {questions[currentQ].question}
          </div>

          <div className="space-y-2">
            {questions[currentQ].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectedAnswer === null && handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`w-full p-3 rounded-lg text-left transition-all ${
                  selectedAnswer === null
                    ? "bg-white hover:bg-indigo-100 border"
                    : selectedAnswer === i
                    ? i === questions[currentQ].correct
                      ? "bg-green-100 border-green-500 border-2"
                      : "bg-red-100 border-red-500 border-2"
                    : i === questions[currentQ].correct
                    ? "bg-green-100 border-green-500 border-2"
                    : "bg-white border opacity-50"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === currentQ
                    ? "bg-indigo-600"
                    : i < currentQ
                    ? "bg-indigo-300"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <div className="text-4xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-indigo-800">
            Score: {score}/{questions.length}
          </div>
          <div className="text-gray-600 mb-4">
            {score === questions.length
              ? "Perfect!"
              : score >= questions.length / 2
              ? "Great job!"
              : "Keep learning!"}
          </div>
          <button
            onClick={reset}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💬</span>
          <h3 className="font-bold text-blue-800">Assistants</h3>
        </div>
        <p className="text-sm text-blue-700">
          Chat-based AI that helps users find information and perform tasks
          (e.g., Microsoft Copilot)
        </p>
      </div>
      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🤖</span>
          <h3 className="font-bold text-green-800">Agents</h3>
        </div>
        <p className="text-sm text-green-700">
          AI that executes tasks autonomously using: Language Model +
          Instructions + Tools
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4 mb-4">
      <h3 className="font-bold text-gray-800 mb-3">📊 Three Categories:</h3>
      <div className="flex gap-2 flex-wrap">
        {[
          { icon: "🎁", name: "Ready-to-Use", color: "#22C55E" },
          { icon: "🔌", name: "Extendable", color: "#F59E0B" },
          { icon: "🏗️", name: "Build from Foundation", color: "#8B5CF6" },
        ].map((cat, i) => (
          <div
            key={i}
            className="px-3 py-2 rounded-lg text-white text-sm font-medium"
            style={{ backgroundColor: cat.color }}
          >
            {cat.icon} {cat.name}
          </div>
        ))}
      </div>
    </div>

    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
      <h3 className="font-bold text-purple-800 mb-2">💡 The Big Picture</h3>
      <p className="text-sm text-purple-700">
        Generative AI applications are powered by language models and come in
        different forms — from ready-to-use assistants to fully custom agents.{" "}
        <strong>Orchestration</strong> coordinates multiple AI components to
        work together. Microsoft provides tools across all categories: Copilot
        for productivity, Copilot Studio for extensions, and Azure AI Foundry
        for building from scratch!
      </p>
    </div>
  </Section>
);

export default function GenAIApplicationsGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🤖 Understanding Generative AI Applications
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Assistants, Agents, and AI Frameworks
          </p>
          <div className="mt-2 inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure AI Fundamentals
          </div>
        </div>

        <OverviewSection />
        <AssistantsSection />
        <AgentsSection />
        <OrchestrationSection />
        <FrameworkSection />
        <MicrosoftServicesSection />
        <InteractiveQuizSection />
        <SummarySection />
      </div>
    </div>
  );
}
