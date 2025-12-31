import React, { useState } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const OverviewSection = () => (
  <Section title="🤔 The Deployment Decision" color="#1e293b">
    <p className="text-gray-700 mb-4">
      When deploying a model to an endpoint, you must choose between{" "}
      <strong>real-time</strong> and
      <strong> batch</strong> predictions. This decision affects cost,
      performance, and architecture.
    </p>

    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-300">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">⚡</span>
          <div>
            <h3 className="font-bold text-blue-800">Real-Time</h3>
            <p className="text-sm text-blue-600">
              Immediate predictions on demand
            </p>
          </div>
        </div>
        <div className="text-sm text-blue-700">
          Score data <strong>as soon as it arrives</strong>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-300">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📦</span>
          <div>
            <h3 className="font-bold text-amber-800">Batch</h3>
            <p className="text-sm text-amber-600">Scheduled bulk predictions</p>
          </div>
        </div>
        <div className="text-sm text-amber-700">
          Score data <strong>when a batch is ready</strong>
        </div>
      </div>
    </div>

    <div className="bg-gray-100 rounded-lg p-4">
      <h4 className="font-semibold text-gray-800 mb-2">
        🎯 Key Questions to Answer:
      </h4>
      <div className="grid md:grid-cols-2 gap-2">
        {[
          {
            icon: "⏱️",
            question: "How often should predictions be generated?",
          },
          { icon: "⚡", question: "How soon are results needed?" },
          { icon: "📊", question: "Individual or batch predictions?" },
          { icon: "💰", question: "How much compute is acceptable?" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-2 bg-white rounded p-2">
            <span>{item.icon}</span>
            <span className="text-sm text-gray-700">{item.question}</span>
          </div>
        ))}
      </div>
    </div>
  </Section>
);

const FrequencySection = () => {
  const [selectedScenario, setSelectedScenario] = useState("iot");

  const scenarios = {
    iot: {
      name: "IoT Sensor",
      icon: "📡",
      frequency: "Every minute",
      needsImmediate: true,
      example: "Anomaly detection on sensor readings",
      recommendation: "Real-Time",
      color: "#3B82F6",
    },
    transaction: {
      name: "E-commerce",
      icon: "🛒",
      frequency: "Per transaction",
      needsImmediate: true,
      example: "Fraud detection on purchases",
      recommendation: "Real-Time",
      color: "#8B5CF6",
    },
    financial: {
      name: "Financial Reports",
      icon: "📊",
      frequency: "Quarterly",
      needsImmediate: false,
      example: "Risk scoring on portfolio",
      recommendation: "Batch",
      color: "#F59E0B",
    },
    marketing: {
      name: "Marketing",
      icon: "📧",
      frequency: "Weekly",
      needsImmediate: false,
      example: "Customer segmentation for campaigns",
      recommendation: "Batch",
      color: "#22C55E",
    },
  };

  const current = scenarios[selectedScenario];

  return (
    <Section title="⏱️ Question 1: Scoring Frequency" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        How often is new data collected? More importantly,{" "}
        <strong>how quickly do you need predictions </strong>
        after data arrives?
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(scenarios).map(([key, scenario]) => (
          <button
            key={key}
            onClick={() => setSelectedScenario(key)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedScenario === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedScenario === key ? scenario.color : undefined,
            }}
          >
            {scenario.icon} {scenario.name}
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
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{current.icon}</span>
              <div>
                <h3 className="font-bold" style={{ color: current.color }}>
                  {current.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Data frequency: {current.frequency}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 mb-2">
              <div className="text-xs text-gray-500">Example:</div>
              <div className="text-sm text-gray-700">{current.example}</div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="text-xs text-gray-500">
                Needs immediate results?
              </div>
              <div
                className={`font-bold ${
                  current.needsImmediate ? "text-blue-600" : "text-amber-600"
                }`}
              >
                {current.needsImmediate ? "✅ Yes" : "❌ No"}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="text-center p-4 rounded-xl text-white"
              style={{
                backgroundColor:
                  current.recommendation === "Real-Time"
                    ? "#3B82F6"
                    : "#F59E0B",
              }}
            >
              <div className="text-3xl mb-2">
                {current.recommendation === "Real-Time" ? "⚡" : "📦"}
              </div>
              <div className="font-bold text-lg">Recommended:</div>
              <div className="text-xl">{current.recommendation}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Key Insight:</strong> The decision depends on{" "}
          <em>when you need predictions</em>, not just how often data is
          collected. Data collected every minute might still use batch if
          results are only needed once per day!
        </p>
      </div>
    </Section>
  );
};

const IndividualVsBatchSection = () => {
  const [mode, setMode] = useState("individual");
  const [processedCount, setProcessedCount] = useState(0);

  const customers = [
    { id: 1, name: "Alice", purchases: 12, lastPurchase: "2 days" },
    { id: 2, name: "Bob", purchases: 3, lastPurchase: "45 days" },
    { id: 3, name: "Carol", purchases: 28, lastPurchase: "1 day" },
    { id: 4, name: "Dave", purchases: 1, lastPurchase: "90 days" },
    { id: 5, name: "Eve", purchases: 8, lastPurchase: "7 days" },
  ];

  return (
    <Section title="📊 Question 2: Individual or Batch?" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Do you need to score one record at a time, or process multiple records
        together?
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        <button
          onClick={() => {
            setMode("individual");
            setProcessedCount(0);
          }}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
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
            setProcessedCount(0);
          }}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            mode === "batch"
              ? "bg-amber-500 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          👥 Batch
        </button>
      </div>

      <div
        className={`rounded-xl p-4 ${
          mode === "individual" ? "bg-blue-50" : "bg-amber-50"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input */}
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-gray-500 mb-2">📥 Input Data:</div>
            <div className="space-y-1">
              {customers.map((c, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-sm p-2 rounded transition-all ${
                    mode === "individual"
                      ? i === processedCount
                        ? "bg-blue-100 ring-2 ring-blue-400"
                        : i < processedCount
                        ? "bg-gray-100"
                        : ""
                      : processedCount > 0
                      ? "bg-amber-100"
                      : ""
                  }`}
                >
                  <span>{c.name}</span>
                  <span className="text-gray-500">{c.purchases} purchases</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-gray-500 mb-2">📤 Predictions:</div>
            {mode === "individual" ? (
              <div className="space-y-1">
                {customers.slice(0, processedCount).map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm p-2 bg-blue-50 rounded"
                  >
                    <span>{c.name}</span>
                    <span
                      className={
                        c.purchases > 5 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {c.purchases > 5 ? "✅ Will Stay" : "⚠️ May Churn"}
                    </span>
                  </div>
                ))}
                {processedCount === 0 && (
                  <div className="text-gray-400 text-center py-4">
                    No predictions yet
                  </div>
                )}
              </div>
            ) : processedCount > 0 ? (
              <div className="space-y-1">
                {customers.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between text-sm p-2 bg-amber-50 rounded"
                  >
                    <span>{c.name}</span>
                    <span
                      className={
                        c.purchases > 5 ? "text-green-600" : "text-red-600"
                      }
                    >
                      {c.purchases > 5 ? "✅ Will Stay" : "⚠️ May Churn"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-4">
                No predictions yet
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 text-center">
          {mode === "individual" ? (
            <button
              onClick={() =>
                setProcessedCount((p) => Math.min(p + 1, customers.length))
              }
              disabled={processedCount >= customers.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              🔮 Score Next Customer
            </button>
          ) : (
            <button
              onClick={() => setProcessedCount(1)}
              disabled={processedCount > 0}
              className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
            >
              📦 Process All at Once
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div
          className={`rounded-lg p-4 border-2 ${
            mode === "individual"
              ? "border-blue-400 bg-blue-50"
              : "border-gray-200"
          }`}
        >
          <h4 className="font-semibold text-blue-800 mb-2">
            👤 Individual Predictions
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• One request → One prediction</li>
            <li>• Real-time web/mobile apps</li>
            <li>• Immediate response required</li>
          </ul>
        </div>
        <div
          className={`rounded-lg p-4 border-2 ${
            mode === "batch"
              ? "border-amber-400 bg-amber-50"
              : "border-gray-200"
          }`}
        >
          <h4 className="font-semibold text-amber-800 mb-2">
            👥 Batch Predictions
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Many records → Many predictions</li>
            <li>• Scheduled/triggered jobs</li>
            <li>• Results saved to file/database</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

const ComputeCostSection = () => {
  return (
    <Section title="💰 Question 3: Compute Cost" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Real-time endpoints are <strong>always on</strong> (continuous cost).
        Batch endpoints
        <strong> scale to zero</strong> when idle (pay per run).
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Real-time */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">⚡</span>
            <h4 className="font-bold text-blue-800">Real-Time Compute</h4>
          </div>

          <div className="bg-white rounded-lg p-3 mb-3">
            <div className="text-xs text-gray-500 mb-1">Azure Services:</div>
            <div className="flex gap-2">
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                ACI
              </span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                AKS
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="text-blue-600 font-medium">Always On 🔴</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Latency:</span>
              <span className="text-blue-600 font-medium">Milliseconds</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Billing:</span>
              <span className="text-blue-600 font-medium">24/7 Continuous</span>
            </div>
          </div>

          {/* Cost visualization */}
          <div className="mt-3">
            <svg viewBox="0 0 200 50" className="w-full h-12">
              <rect
                x="10"
                y="15"
                width="180"
                height="20"
                fill="#3B82F6"
                opacity="0.5"
                rx="3"
              />
              <text
                x="100"
                y="28"
                textAnchor="middle"
                fontSize="10"
                fill="#1E40AF"
              >
                Continuous Cost
              </text>
            </svg>
          </div>
        </div>

        {/* Batch */}
        <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📦</span>
            <h4 className="font-bold text-amber-800">Batch Compute</h4>
          </div>

          <div className="bg-white rounded-lg p-3 mb-3">
            <div className="text-xs text-gray-500 mb-1">Azure Services:</div>
            <div className="flex gap-2">
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">
                Compute Clusters
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Status:</span>
              <span className="text-amber-600 font-medium">Scales to 0 🟢</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Latency:</span>
              <span className="text-amber-600 font-medium">
                5-10 min startup
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Billing:</span>
              <span className="text-amber-600 font-medium">Pay Per Run</span>
            </div>
          </div>

          {/* Cost visualization */}
          <div className="mt-3">
            <svg viewBox="0 0 200 50" className="w-full h-12">
              <rect
                x="20"
                y="15"
                width="30"
                height="20"
                fill="#F59E0B"
                opacity="0.7"
                rx="3"
              />
              <rect
                x="80"
                y="15"
                width="30"
                height="20"
                fill="#F59E0B"
                opacity="0.7"
                rx="3"
              />
              <rect
                x="140"
                y="15"
                width="30"
                height="20"
                fill="#F59E0B"
                opacity="0.7"
                rx="3"
              />
              <text
                x="100"
                y="28"
                textAnchor="middle"
                fontSize="10"
                fill="#92400E"
              >
                Burst Cost
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-3">
          💡 Cost Comparison Insight
        </h4>
        <p className="text-sm text-green-700 mb-3">
          If you can tolerate a <strong>5-10 minute delay</strong>, batch
          deployment can save significant costs! The compute cluster starts when
          triggered and stops after processing.
        </p>

        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="text-center">
              <div className="text-2xl">⚡</div>
              <div className="text-xs text-gray-500">Real-Time</div>
              <div className="font-bold text-blue-600">$$$</div>
              <div className="text-xs text-gray-400">Always paying</div>
            </div>
            <div className="text-2xl text-gray-400">vs</div>
            <div className="text-center">
              <div className="text-2xl">📦</div>
              <div className="text-xs text-gray-500">Batch</div>
              <div className="font-bold text-green-600">$</div>
              <div className="text-xs text-gray-400">Pay per use</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const DecisionMatrixSection = () => {
  const [scenario, setScenario] = useState(null);

  const scenarios = [
    {
      id: "website",
      name: "Website Recommendations",
      icon: "🌐",
      frequency: "Per page view",
      urgency: "Immediate",
      volume: "Individual",
      delay: "Not acceptable",
      answer: "realtime",
      reason: "Users expect instant recommendations",
    },
    {
      id: "fraud",
      name: "Transaction Fraud Detection",
      icon: "🔒",
      frequency: "Per transaction",
      urgency: "Immediate",
      volume: "Individual",
      delay: "Not acceptable",
      answer: "realtime",
      reason: "Must block fraud before transaction completes",
    },
    {
      id: "report",
      name: "Weekly Sales Forecast",
      icon: "📊",
      frequency: "Weekly",
      urgency: "End of week",
      volume: "Batch",
      delay: "Acceptable",
      answer: "batch",
      reason: "Results needed for Monday planning meeting",
    },
    {
      id: "churn",
      name: "Customer Churn Scoring",
      icon: "👥",
      frequency: "Daily/Weekly",
      urgency: "Next business day",
      volume: "Batch",
      delay: "Acceptable",
      answer: "batch",
      reason: "Marketing campaigns planned in advance",
    },
    {
      id: "email",
      name: "Email Campaign Targeting",
      icon: "📧",
      frequency: "Before campaign",
      urgency: "Hours before send",
      volume: "Batch",
      delay: "Acceptable",
      answer: "batch",
      reason: "Segment customers before scheduled send",
    },
    {
      id: "iot",
      name: "IoT Anomaly Detection",
      icon: "📡",
      frequency: "Per reading",
      urgency: "Within seconds",
      volume: "Individual",
      delay: "Not acceptable",
      answer: "realtime",
      reason: "Must alert on equipment failures immediately",
    },
  ];

  const selected = scenarios.find((s) => s.id === scenario);

  return (
    <Section title="🎯 Decision Matrix: Common Scenarios" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Click on a scenario to see the recommended deployment type:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setScenario(s.id)}
            className={`p-4 rounded-xl text-center transition-all ${
              scenario === s.id
                ? s.answer === "realtime"
                  ? "bg-blue-100 ring-2 ring-blue-400"
                  : "bg-amber-100 ring-2 ring-amber-400"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="text-3xl">{s.icon}</span>
            <div className="font-medium text-sm mt-2 text-gray-800">
              {s.name}
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className={`rounded-xl p-4 border-2 ${
            selected.answer === "realtime"
              ? "border-blue-400 bg-blue-50"
              : "border-amber-400 bg-amber-50"
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{selected.icon}</span>
            <div>
              <h3
                className={`font-bold ${
                  selected.answer === "realtime"
                    ? "text-blue-800"
                    : "text-amber-800"
                }`}
              >
                {selected.name}
              </h3>
              <div
                className={`flex items-center gap-2 ${
                  selected.answer === "realtime"
                    ? "text-blue-600"
                    : "text-amber-600"
                }`}
              >
                <span className="text-xl">
                  {selected.answer === "realtime" ? "⚡" : "📦"}
                </span>
                <span className="font-bold">
                  {selected.answer === "realtime" ? "Real-Time" : "Batch"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
            {[
              { label: "Frequency", value: selected.frequency },
              { label: "Urgency", value: selected.urgency },
              { label: "Volume", value: selected.volume },
              { label: "Delay OK?", value: selected.delay },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-2 text-center">
                <div className="text-xs text-gray-500">{item.label}</div>
                <div className="text-sm font-medium text-gray-800">
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-3">
            <span className="text-sm text-gray-500">💡 Reason: </span>
            <span className="text-sm text-gray-700">{selected.reason}</span>
          </div>
        </div>
      )}
    </Section>
  );
};

const HiddenBatchOpportunitySection = () => {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <Section title="💡 Hidden Batch Opportunity" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Some scenarios seem like they need real-time but can actually use batch
        more cost-effectively!
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <div className="text-center mb-4">
          <div className="text-4xl mb-2">🤔</div>
          <h3 className="font-bold text-amber-800">
            Can you tolerate a 5-10 minute delay?
          </h3>
        </div>

        <div className="flex gap-4 justify-center mb-4">
          <button
            onClick={() => setShowInsight(false)}
            className={`px-6 py-3 rounded-lg font-medium ${
              !showInsight
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            ❌ No, need instant
          </button>
          <button
            onClick={() => setShowInsight(true)}
            className={`px-6 py-3 rounded-lg font-medium ${
              showInsight
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            ✅ Yes, that's OK
          </button>
        </div>

        {showInsight && (
          <div className="bg-green-100 rounded-xl p-4 border border-green-300">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎉</span>
              <div>
                <h4 className="font-bold text-green-800">
                  You can use Batch Endpoints!
                </h4>
                <p className="text-sm text-green-600">
                  Save significant compute costs
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <h5 className="font-semibold text-gray-700 mb-2">
                How it works:
              </h5>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">
                    1
                  </span>
                  <span>Trigger batch endpoint when data arrives</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">
                    2
                  </span>
                  <span>Compute cluster starts (5-10 min)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">
                    3
                  </span>
                  <span>Process prediction(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center text-xs">
                    4
                  </span>
                  <span>Cluster scales to 0 → Stop paying!</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {!showInsight && (
          <div className="bg-blue-100 rounded-xl p-4 border border-blue-300">
            <div className="flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              <div>
                <h4 className="font-bold text-blue-800">
                  Use Real-Time Endpoints
                </h4>
                <p className="text-sm text-blue-600">
                  Always-on compute for instant predictions (higher cost)
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>⚠️ Remember:</strong> Consider compute requirements before
          training! Complex models need more compute power and time. Plan your
          deployment strategy early!
        </p>
      </div>
    </Section>
  );
};

const InteractiveDecisionFlowSection = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: "immediacy",
      question: "Do you need predictions within seconds?",
      yesNext: 1,
      noNext: 2,
    },
    {
      id: "tolerance",
      question: "Can you absolutely NOT tolerate any delay?",
      yesNext: "realtime",
      noNext: 3,
    },
    {
      id: "schedule",
      question: "Can predictions be scheduled or triggered in batches?",
      yesNext: "batch",
      noNext: 3,
    },
    {
      id: "delay5min",
      question: "Is a 5-10 minute delay acceptable for cost savings?",
      yesNext: "batch",
      noNext: "realtime",
    },
  ];

  const handleAnswer = (answer) => {
    const current = questions[step];
    const next = answer ? current.yesNext : current.noNext;
    setAnswers({ ...answers, [current.id]: answer });

    if (typeof next === "string") {
      setStep(next);
    } else {
      setStep(next);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
  };

  const isResult = step === "realtime" || step === "batch";

  return (
    <Section title="🧭 Interactive Decision Flow" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Answer these questions to determine the best deployment type for your
        use case:
      </p>

      <div className="bg-purple-50 rounded-xl p-4">
        {!isResult ? (
          <div className="text-center">
            <div className="mb-2 text-sm text-gray-500">
              Question {step + 1}
            </div>
            <div className="text-lg font-medium text-purple-800 mb-6">
              {questions[step]?.question}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnswer(true)}
                className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium text-lg"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium text-lg"
              >
                ❌ No
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <span className="text-6xl">
                {step === "realtime" ? "⚡" : "📦"}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-1">
              Recommended Deployment:
            </div>
            <div
              className={`inline-block px-6 py-3 rounded-xl text-white text-2xl font-bold ${
                step === "realtime" ? "bg-blue-600" : "bg-amber-500"
              }`}
            >
              {step === "realtime" ? "Real-Time Endpoint" : "Batch Endpoint"}
            </div>
            <button
              onClick={reset}
              className="block mx-auto mt-4 text-purple-600 hover:text-purple-800"
            >
              🔄 Start Over
            </button>
          </div>
        )}

        {/* Progress dots */}
        {!isResult && (
          <div className="flex justify-center gap-2 mt-4">
            {questions.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i === step
                    ? "bg-purple-600"
                    : i < step
                    ? "bg-purple-300"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">⚡</span>
          <h3 className="font-bold text-blue-800">Choose Real-Time When:</h3>
        </div>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>✓ Predictions needed within seconds</li>
          <li>✓ Individual predictions required</li>
          <li>✓ No delay acceptable</li>
          <li>✓ User-facing applications</li>
        </ul>
        <div className="mt-3 bg-blue-100 rounded p-2 text-xs text-blue-600">
          💰 Higher cost (always-on ACI/AKS)
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">📦</span>
          <h3 className="font-bold text-amber-800">Choose Batch When:</h3>
        </div>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>✓ Predictions can be scheduled</li>
          <li>✓ Bulk processing of records</li>
          <li>✓ 5-10 min delay acceptable</li>
          <li>✓ Results saved to storage</li>
        </ul>
        <div className="mt-3 bg-amber-100 rounded p-2 text-xs text-amber-600">
          💰 Lower cost (scales to 0 when idle)
        </div>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        The deployment decision depends on{" "}
        <strong>when you need predictions</strong>, not just how often data is
        collected. Consider if you can tolerate a 5-10 minute delay — if yes,
        batch can save significant costs. Plan your deployment strategy{" "}
        <strong>before training</strong>, as complex models require more
        compute. Real-time uses always-on containers (ACI/AKS); batch uses
        auto-scaling clusters that scale to zero when idle.
      </p>
    </div>
  </Section>
);

export default function RealTimeVsBatchGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ⚡📦 Real-Time vs Batch Deployment
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Choosing Your Deployment Strategy
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure ML Fundamentals
          </div>
        </div>

        <OverviewSection />
        <FrequencySection />
        <IndividualVsBatchSection />
        <ComputeCostSection />
        <DecisionMatrixSection />
        <HiddenBatchOpportunitySection />
        <InteractiveDecisionFlowSection />
        <SummarySection />
      </div>
    </div>
  );
}
