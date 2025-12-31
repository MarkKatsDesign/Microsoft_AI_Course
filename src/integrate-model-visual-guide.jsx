import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const OverviewSection = () => (
  <Section title="🔌 Model Integration Overview" color="#1e293b">
    <p className="text-gray-700 mb-4">
      After training a model, you need to{" "}
      <strong>deploy it to an endpoint</strong> so applications can use it. An
      endpoint is simply a web address that applications call to get
      predictions.
    </p>

    <div className="bg-gray-50 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Training */}
        <div className="text-center">
          <div className="w-20 h-20 bg-purple-500 rounded-xl flex items-center justify-center text-3xl text-white">
            🏋️
          </div>
          <div className="text-sm mt-2 text-gray-600">Train Model</div>
        </div>

        <svg
          width="40"
          height="30"
          viewBox="0 0 40 30"
          className="text-gray-400"
        >
          <path
            d="M 5,15 L 30,15 M 26,10 L 30,15 L 26,20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Deploy */}
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-500 rounded-xl flex items-center justify-center text-3xl text-white">
            🚀
          </div>
          <div className="text-sm mt-2 text-gray-600">Deploy to Endpoint</div>
        </div>

        <svg
          width="40"
          height="30"
          viewBox="0 0 40 30"
          className="text-gray-400"
        >
          <path
            d="M 5,15 L 30,15 M 26,10 L 30,15 L 26,20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>

        {/* Integrate */}
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-xl flex items-center justify-center text-3xl text-white">
            📱
          </div>
          <div className="text-sm mt-2 text-gray-600">Use in Apps</div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">⚡</span>
          <h3 className="font-bold text-blue-800">Real-Time Predictions</h3>
        </div>
        <p className="text-sm text-blue-700">
          Score data immediately as it arrives
        </p>
      </div>
      <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📦</span>
          <h3 className="font-bold text-amber-800">Batch Predictions</h3>
        </div>
        <p className="text-sm text-amber-700">
          Score collected data on a schedule
        </p>
      </div>
    </div>
  </Section>
);

const RealTimeSection = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setStep((s) => (s + 1) % 5);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating]);

  const steps = [
    { actor: "customer", action: "Selects a shirt", highlight: "product" },
    {
      actor: "website",
      action: "Sends request to endpoint",
      highlight: "request",
    },
    { actor: "model", action: "Generates recommendations", highlight: "model" },
    { actor: "endpoint", action: "Returns predictions", highlight: "response" },
    {
      actor: "website",
      action: "Displays recommendations",
      highlight: "display",
    },
  ];

  return (
    <Section title="⚡ Real-Time Predictions" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Use real-time predictions when you need the model to score data{" "}
        <strong>immediately</strong> as it arrives — essential for mobile apps
        and websites.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {isAnimating ? "⏸️ Pause" : "▶️ Animate Flow"}
        </button>
        <button
          onClick={() => {
            setStep(0);
            setIsAnimating(false);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        {/* Web shop visualization */}
        <div className="grid md:grid-cols-3 gap-4 items-center">
          {/* Customer & Website */}
          <div className="text-center">
            <div
              className={`bg-white rounded-lg p-4 border-2 transition-all ${
                steps[step].highlight === "product" ||
                steps[step].highlight === "display"
                  ? "border-blue-500 ring-4 ring-blue-200"
                  : "border-gray-200"
              }`}
            >
              <div className="text-sm text-gray-500 mb-2">🌐 Website</div>

              {/* Product */}
              <div
                className={`bg-gray-100 rounded p-2 mb-2 ${
                  steps[step].highlight === "product" ? "bg-blue-100" : ""
                }`}
              >
                <span className="text-3xl">👕</span>
                <div className="text-xs">Blue Shirt - $29.99</div>
              </div>

              {/* Recommendations */}
              <div className="text-xs text-gray-500 mb-1">Recommendations:</div>
              <div
                className={`flex justify-center gap-1 ${
                  steps[step].highlight === "display"
                    ? "opacity-100"
                    : "opacity-30"
                }`}
              >
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm">
                  👖
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm">
                  🧢
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center text-sm">
                  👟
                </div>
              </div>
            </div>
            <div className="mt-2 text-2xl">👤</div>
            <div className="text-xs text-gray-500">Customer</div>
          </div>

          {/* Request/Response arrows */}
          <div className="flex flex-col items-center gap-4">
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                steps[step].highlight === "request"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <span>📤</span>
              <svg width="40" height="20" viewBox="0 0 40 20">
                <path
                  d="M 5,10 L 30,10 M 26,6 L 30,10 L 26,14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span className="text-xs">Request</span>
            </div>
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                steps[step].highlight === "response"
                  ? "bg-green-500 text-white"
                  : "bg-gray-100"
              }`}
            >
              <span className="text-xs">Response</span>
              <svg width="40" height="20" viewBox="0 0 40 20">
                <path
                  d="M 35,10 L 10,10 M 14,6 L 10,10 L 14,14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span>📥</span>
            </div>
          </div>

          {/* Endpoint & Model */}
          <div className="text-center">
            <div
              className={`bg-white rounded-lg p-4 border-2 transition-all ${
                steps[step].highlight === "model"
                  ? "border-purple-500 ring-4 ring-purple-200"
                  : "border-gray-200"
              }`}
            >
              <div className="text-sm text-gray-500 mb-2">🔌 Endpoint</div>
              <div
                className={`text-4xl mb-2 transition-all ${
                  steps[step].highlight === "model" ? "animate-pulse" : ""
                }`}
              >
                🤖
              </div>
              <div className="text-xs text-gray-600">Recommendation Model</div>
              <div className="text-xs text-blue-500 mt-1 font-mono">
                api.azure.com/predict
              </div>
            </div>
          </div>
        </div>

        {/* Current step indicator */}
        <div className="mt-4 text-center">
          <div
            className={`inline-block px-4 py-2 rounded-lg ${
              steps[step].actor === "customer"
                ? "bg-gray-800 text-white"
                : steps[step].actor === "website"
                ? "bg-blue-500 text-white"
                : steps[step].actor === "model"
                ? "bg-purple-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            <span className="font-medium">Step {step + 1}:</span>{" "}
            {steps[step].action}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          {
            icon: "📱",
            title: "Mobile Apps",
            example: "Product recommendations",
          },
          { icon: "🌐", title: "Websites", example: "Personalized content" },
          { icon: "💬", title: "Chatbots", example: "Instant responses" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-sm text-gray-800">
              {item.title}
            </div>
            <div className="text-xs text-gray-500">{item.example}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const BatchSection = () => {
  const [batchProgress, setBatchProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let interval;
    if (isProcessing && batchProgress < 100) {
      interval = setInterval(() => {
        setBatchProgress((p) => {
          const next = Math.min(p + 10, 100);
          if (next >= 100) {
            setIsProcessing(false);
          }
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isProcessing, batchProgress]);

  const weeklyData = [
    { week: "Week 1", sales: 1200, forecast: null },
    { week: "Week 2", sales: 1350, forecast: null },
    { week: "Week 3", sales: 1180, forecast: null },
    { week: "Week 4", sales: 1420, forecast: null },
    { week: "Week 5", sales: null, forecast: 1380 },
    { week: "Week 6", sales: null, forecast: 1450 },
  ];

  return (
    <Section title="📦 Batch Predictions" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Use batch predictions when you want to score{" "}
        <strong>collected data on a schedule</strong> and save results to a file
        or database.
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-3">
          📊 Example: Weekly Sales Forecast
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Data collection */}
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">
              📥 Collected Sales Data (Batch)
            </div>
            <div className="space-y-1">
              {weeklyData.slice(0, 4).map((week, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm bg-gray-50 p-2 rounded"
                >
                  <span>{week.week}</span>
                  <span className="font-mono text-gray-700">
                    {week.sales} units
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setBatchProgress(0);
                setIsProcessing(true);
              }}
              disabled={isProcessing}
              className="w-full mt-3 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
            >
              {isProcessing
                ? "⏳ Processing Batch..."
                : "🚀 Run Batch Prediction"}
            </button>

            {isProcessing && (
              <div className="mt-2">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 transition-all"
                    style={{ width: `${batchProgress}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 text-center mt-1">
                  {batchProgress}%
                </div>
              </div>
            )}
          </div>

          {/* Forecast output */}
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">📤 Forecast Output</div>

            {batchProgress >= 100 ? (
              <div className="space-y-1">
                {weeklyData.slice(4).map((week, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm bg-green-50 p-2 rounded border border-green-200"
                  >
                    <span>{week.week}</span>
                    <span className="font-mono text-green-700 font-bold">
                      {week.forecast} units 📈
                    </span>
                  </div>
                ))}
                <div className="mt-2 text-xs text-green-600 text-center">
                  ✅ Results saved to database/file
                </div>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center text-gray-400">
                <span>Run batch prediction to see results</span>
              </div>
            )}

            {/* Mini chart */}
            {batchProgress >= 100 && (
              <div className="mt-3">
                <svg viewBox="0 0 200 60" className="w-full h-16">
                  {/* Historical line */}
                  <path
                    d="M 20,40 L 50,35 L 80,42 L 110,30"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Forecast line */}
                  <path
                    d="M 110,30 L 140,33 L 170,28"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeDasharray="4"
                    fill="none"
                  />
                  {/* Divider */}
                  <line
                    x1="110"
                    y1="10"
                    x2="110"
                    y2="55"
                    stroke="#999"
                    strokeWidth="1"
                    strokeDasharray="2"
                  />
                  <text x="60" y="55" fontSize="8" fill="#F59E0B">
                    Historical
                  </text>
                  <text x="140" y="55" fontSize="8" fill="#22C55E">
                    Forecast
                  </text>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "📊", title: "Reports", example: "Weekly forecasts" },
          { icon: "🗄️", title: "Database", example: "Bulk scoring" },
          { icon: "📁", title: "File Export", example: "CSV predictions" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-sm text-gray-800">
              {item.title}
            </div>
            <div className="text-xs text-gray-500">{item.example}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const DecisionFactorsSection = () => {
  const [selectedFactor, setSelectedFactor] = useState(0);

  const factors = [
    {
      icon: "⏱️",
      name: "Frequency",
      question: "How often should predictions be generated?",
      realtime: "Every time new data arrives",
      batch: "On a schedule (daily, weekly, etc.)",
      color: "#3B82F6",
    },
    {
      icon: "⚡",
      name: "Urgency",
      question: "How soon are results needed?",
      realtime: "Immediately (milliseconds)",
      batch: "Can wait (hours, days)",
      color: "#8B5CF6",
    },
    {
      icon: "📊",
      name: "Volume",
      question: "Individual or batch predictions?",
      realtime: "One record at a time",
      batch: "Many records together",
      color: "#22C55E",
    },
    {
      icon: "💰",
      name: "Cost",
      question: "How much compute is acceptable?",
      realtime: "Always-on (continuous cost)",
      batch: "On-demand (pay per run)",
      color: "#F59E0B",
    },
  ];

  const current = factors[selectedFactor];

  return (
    <Section title="🤔 Deciding: Real-Time vs Batch" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Consider these factors when choosing between real-time and batch
        deployment:
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {factors.map((factor, i) => (
          <button
            key={i}
            onClick={() => setSelectedFactor(i)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedFactor === i
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedFactor === i ? factor.color : undefined,
            }}
          >
            {factor.icon} {factor.name}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-4 border-2 mb-4"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="text-center mb-4">
          <span className="text-3xl">{current.icon}</span>
          <h3 className="font-bold text-lg" style={{ color: current.color }}>
            {current.question}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-100 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">⚡</div>
            <div className="font-bold text-blue-800">Real-Time</div>
            <div className="text-sm text-blue-600">{current.realtime}</div>
          </div>
          <div className="bg-amber-100 rounded-lg p-4 text-center">
            <div className="text-2xl mb-2">📦</div>
            <div className="font-bold text-amber-800">Batch</div>
            <div className="text-sm text-amber-600">{current.batch}</div>
          </div>
        </div>
      </div>

      {/* Visual comparison */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Real-time visual */}
          <div className="text-center">
            <h4 className="font-semibold text-blue-800 mb-3">
              ⚡ Real-Time Pattern
            </h4>
            <svg viewBox="0 0 200 80" className="w-full h-20">
              {/* Individual requests */}
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i}>
                  <circle cx={30 + i * 35} cy="20" r="8" fill="#3B82F6" />
                  <line
                    x1={30 + i * 35}
                    y1="28"
                    x2={30 + i * 35}
                    y2="50"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  <circle cx={30 + i * 35} cy="60" r="6" fill="#22C55E" />
                </g>
              ))}
              <text
                x="100"
                y="75"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
              >
                Request → Response (immediate)
              </text>
            </svg>
          </div>

          {/* Batch visual */}
          <div className="text-center">
            <h4 className="font-semibold text-amber-800 mb-3">
              📦 Batch Pattern
            </h4>
            <svg viewBox="0 0 200 80" className="w-full h-20">
              {/* Collected data */}
              <rect
                x="20"
                y="10"
                width="80"
                height="35"
                rx="5"
                fill="#F59E0B"
                opacity="0.3"
                stroke="#F59E0B"
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <circle key={i} cx={35 + i * 12} cy="28" r="5" fill="#F59E0B" />
              ))}

              <path
                d="M 105,28 L 125,28"
                stroke="#6B7280"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />

              {/* Batch result */}
              <rect
                x="130"
                y="10"
                width="50"
                height="35"
                rx="5"
                fill="#22C55E"
                opacity="0.3"
                stroke="#22C55E"
              />
              <text
                x="155"
                y="32"
                textAnchor="middle"
                fontSize="10"
                fill="#22C55E"
              >
                Results
              </text>

              <text
                x="100"
                y="75"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
              >
                Collect → Process → Output (scheduled)
              </text>
            </svg>
          </div>
        </div>
      </div>
    </Section>
  );
};

const IndividualVsBatchSection = () => {
  const [mode, setMode] = useState("individual");

  const customers = [
    {
      id: 1,
      name: "Alice",
      purchases: 12,
      lastPurchase: "2 days ago",
      churn: false,
    },
    {
      id: 2,
      name: "Bob",
      purchases: 3,
      lastPurchase: "45 days ago",
      churn: true,
    },
    {
      id: 3,
      name: "Carol",
      purchases: 28,
      lastPurchase: "1 day ago",
      churn: false,
    },
    {
      id: 4,
      name: "Dave",
      purchases: 1,
      lastPurchase: "90 days ago",
      churn: true,
    },
  ];

  const [processedIndex, setProcessedIndex] = useState(-1);

  return (
    <Section title="📊 Individual vs Batch Predictions" color="#22c55e">
      <p className="text-gray-700 mb-4">
        You can generate predictions <strong>one at a time</strong> or{" "}
        <strong>in batches</strong>:
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => {
            setMode("individual");
            setProcessedIndex(-1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            mode === "individual"
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          👤 Individual
        </button>
        <button
          onClick={() => {
            setMode("batch");
            setProcessedIndex(-1);
          }}
          className={`px-4 py-2 rounded-lg font-medium ${
            mode === "batch"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          👥 Batch
        </button>
      </div>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-green-800 mb-3">
          🔮 Customer Churn Prediction -{" "}
          {mode === "individual" ? "Individual" : "Batch"} Mode
        </h4>

        <div className="bg-white rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Purchases</th>
                <th className="p-2 text-left">Last Purchase</th>
                <th className="p-2 text-left">Prediction</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, i) => (
                <tr
                  key={i}
                  className={`border-t transition-all ${
                    mode === "individual" && processedIndex === i
                      ? "bg-blue-50"
                      : mode === "batch" && processedIndex >= 0
                      ? "bg-green-50"
                      : ""
                  }`}
                >
                  <td className="p-2">{customer.name}</td>
                  <td className="p-2">{customer.purchases}</td>
                  <td className="p-2">{customer.lastPurchase}</td>
                  <td className="p-2">
                    {(mode === "individual" && processedIndex >= i) ||
                    (mode === "batch" && processedIndex >= 0) ? (
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          customer.churn
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {customer.churn ? "⚠️ Will Churn" : "✅ Will Stay"}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex justify-center">
          {mode === "individual" ? (
            <button
              onClick={() =>
                setProcessedIndex((p) => Math.min(p + 1, customers.length - 1))
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={processedIndex >= customers.length - 1}
            >
              🔮 Predict Next Customer
            </button>
          ) : (
            <button
              onClick={() => setProcessedIndex(0)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              disabled={processedIndex >= 0}
            >
              📦 Process All (Batch)
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`rounded-lg p-4 border-2 ${
            mode === "individual"
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <h4 className="font-semibold text-blue-800 mb-2">👤 Individual</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• One record → One prediction</li>
            <li>• Immediate response needed</li>
            <li>• Real-time applications</li>
          </ul>
        </div>
        <div
          className={`rounded-lg p-4 border-2 ${
            mode === "batch"
              ? "border-green-400 bg-green-50"
              : "border-gray-200"
          }`}
        >
          <h4 className="font-semibold text-green-800 mb-2">👥 Batch</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Many records → Many predictions</li>
            <li>• Results saved to file/database</li>
            <li>• Scheduled processing</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

const ComputeCostSection = () => {
  const [selectedType, setSelectedType] = useState("realtime");

  const computeTypes = {
    realtime: {
      name: "Real-Time Compute",
      icon: "⚡",
      color: "#3B82F6",
      services: [
        "Azure Container Instance (ACI)",
        "Azure Kubernetes Service (AKS)",
      ],
      costPattern: "Always-on",
      pros: ["Immediate predictions", "Low latency", "Always available"],
      cons: ["Continuous cost", "Can't pause/stop", "Paying even when idle"],
      visual: "continuous",
    },
    batch: {
      name: "Batch Compute",
      icon: "📦",
      color: "#F59E0B",
      services: ["Compute Clusters", "Spark Clusters"],
      costPattern: "On-demand",
      pros: ["Pay per run", "Scales to 0 when idle", "Parallel processing"],
      cons: ["Not immediate", "Startup time", "Scheduling required"],
      visual: "burst",
    },
  };

  const current = computeTypes[selectedType];

  return (
    <Section title="💰 Compute Cost Considerations" color="#ef4444">
      <p className="text-gray-700 mb-4">
        Different deployment types use different compute, affecting your costs
        significantly:
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {Object.entries(computeTypes).map(([key, type]) => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedType === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedType === key ? type.color : undefined,
            }}
          >
            {type.icon} {type.name}
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-4 border-2 mb-4"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-3xl">{current.icon}</span>
              <div>
                <h3 className="font-bold" style={{ color: current.color }}>
                  {current.name}
                </h3>
                <span className="text-sm bg-white px-2 py-0.5 rounded">
                  {current.costPattern}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-500 mb-1">Azure Services:</div>
              {current.services.map((s, i) => (
                <div key={i} className="text-sm text-gray-700">
                  • {s}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded-lg p-2">
                <div className="text-xs text-green-600 mb-1">✅ Pros</div>
                {current.pros.map((p, i) => (
                  <div key={i} className="text-xs text-gray-600">
                    • {p}
                  </div>
                ))}
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <div className="text-xs text-red-600 mb-1">⚠️ Cons</div>
                {current.cons.map((c, i) => (
                  <div key={i} className="text-xs text-gray-600">
                    • {c}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cost visualization */}
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">💵 Cost Over Time:</div>
            <svg viewBox="0 0 200 100" className="w-full h-24">
              {/* Axes */}
              <line
                x1="30"
                y1="80"
                x2="180"
                y2="80"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <line
                x1="30"
                y1="20"
                x2="30"
                y2="80"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
              >
                Time
              </text>
              <text
                x="15"
                y="50"
                textAnchor="middle"
                fontSize="8"
                fill="#6B7280"
                transform="rotate(-90, 15, 50)"
              >
                Cost
              </text>

              {current.visual === "continuous" ? (
                /* Continuous cost line */
                <rect
                  x="30"
                  y="35"
                  width="150"
                  height="45"
                  fill={current.color}
                  opacity="0.3"
                />
              ) : (
                /* Burst cost pattern */
                <>
                  <rect
                    x="40"
                    y="40"
                    width="20"
                    height="40"
                    fill={current.color}
                    opacity="0.5"
                  />
                  <rect
                    x="90"
                    y="40"
                    width="20"
                    height="40"
                    fill={current.color}
                    opacity="0.5"
                  />
                  <rect
                    x="140"
                    y="40"
                    width="20"
                    height="40"
                    fill={current.color}
                    opacity="0.5"
                  />
                </>
              )}

              <text
                x="100"
                y="70"
                textAnchor="middle"
                fontSize="10"
                fill={current.color}
                fontWeight="bold"
              >
                {current.visual === "continuous" ? "Continuous" : "Pay Per Use"}
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Cost Tip:</strong> If your predictions are only needed at
          certain times, batch processing with auto-scaling compute can save
          significant costs compared to always-on real-time endpoints!
        </p>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">⚡</span>
          <h3 className="font-bold text-blue-800">Real-Time</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Immediate predictions</li>
          <li>• Always-on compute (ACI, AKS)</li>
          <li>• Continuous cost</li>
          <li>• Mobile apps, websites, chatbots</li>
        </ul>
      </div>
      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📦</span>
          <h3 className="font-bold text-amber-800">Batch</h3>
        </div>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Scheduled predictions</li>
          <li>• On-demand compute (clusters)</li>
          <li>• Pay per run</li>
          <li>• Reports, forecasts, bulk scoring</li>
        </ul>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4 mb-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Deploying a model to an endpoint makes it usable by applications. Choose{" "}
        <strong>real-time</strong> when you need immediate predictions
        (websites, apps) and can afford always-on compute. Choose{" "}
        <strong>batch</strong> when predictions can wait and you want to save on
        compute costs by processing collected data on a schedule. Consider
        frequency, urgency, volume, and cost when deciding!
      </p>
    </div>

    <div className="flex items-center justify-center gap-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center text-2xl text-white">
          🏋️
        </div>
        <div className="text-xs text-gray-600 mt-1">Train</div>
      </div>
      <svg width="40" height="30" viewBox="0 0 40 30" className="text-gray-400">
        <path
          d="M 5,15 L 30,15 M 26,10 L 30,15 L 26,20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center text-2xl text-white">
          🚀
        </div>
        <div className="text-xs text-gray-600 mt-1">Deploy</div>
      </div>
      <svg width="40" height="30" viewBox="0 0 40 30" className="text-gray-400">
        <path
          d="M 5,15 L 30,15 M 26,10 L 30,15 L 26,20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <div className="text-center">
        <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center text-2xl text-white">
          🔌
        </div>
        <div className="text-xs text-gray-600 mt-1">Integrate</div>
      </div>
    </div>
  </Section>
);

export default function IntegrateModelGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔌 Integrate a Model
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Deploying ML Models to Endpoints
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure ML Fundamentals
          </div>
        </div>

        <OverviewSection />
        <RealTimeSection />
        <BatchSection />
        <DecisionFactorsSection />
        <IndividualVsBatchSection />
        <ComputeCostSection />
        <SummarySection />
      </div>
    </div>
  );
}
