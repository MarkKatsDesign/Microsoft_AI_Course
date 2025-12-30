import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const DefineTheProblemSection = () => {
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    {
      question: "What should the model's output be?",
      icon: "🎯",
      color: "#3B82F6",
      examples: [
        "A category (yes/no, spam/not spam)",
        "A number (price, temperature)",
        "A future prediction (sales forecast)",
        "Object locations in an image",
      ],
      tip: "The output type determines which ML task to use",
    },
    {
      question: "What type of ML task should you use?",
      icon: "🔧",
      color: "#8B5CF6",
      examples: [
        "Classification → categorical output",
        "Regression → numerical output",
        "Time-series → future predictions",
        "Computer Vision / NLP → specialized tasks",
      ],
      tip: "The task determines which algorithms are available",
    },
    {
      question: "What makes the model successful?",
      icon: "📊",
      color: "#22C55E",
      examples: [
        "Accuracy (% correct predictions)",
        "Precision / Recall (for imbalanced data)",
        "Mean Squared Error (for regression)",
        "Business-specific thresholds",
      ],
      tip: "Success metrics depend on the task and business needs",
    },
  ];

  const current = questions[activeQuestion];

  return (
    <Section title="🎯 Step 1: Define the Problem" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Before training any model, you must clearly define the problem by
        answering three key questions:
      </p>

      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {questions.map((q, i) => (
          <button
            key={i}
            onClick={() => setActiveQuestion(i)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeQuestion === i
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: activeQuestion === i ? q.color : undefined,
            }}
          >
            {q.icon} Q{i + 1}
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
          <span className="text-4xl">{current.icon}</span>
          <h3 className="font-bold text-lg" style={{ color: current.color }}>
            {current.question}
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">Examples:</div>
            <ul className="space-y-2">
              {current.examples.map((ex, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <span style={{ color: current.color }}>▸</span>
                  {ex}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <span className="text-sm text-yellow-800">{current.tip}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {questions.map((q, i) => (
          <React.Fragment key={i}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all ${
                activeQuestion === i ? "ring-4 ring-opacity-50" : ""
              }`}
              style={{
                backgroundColor: q.color,
                ringColor: q.color,
              }}
              onClick={() => setActiveQuestion(i)}
            >
              {q.icon}
            </div>
            {i < questions.length - 1 && (
              <svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                className="text-gray-400"
              >
                <path
                  d="M 5,10 L 20,10 M 16,6 L 20,10 L 16,14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
};

const MLTasksSection = () => {
  const [selectedTask, setSelectedTask] = useState("classification");

  const tasks = {
    classification: {
      name: "Classification",
      icon: "🏷️",
      color: "#3B82F6",
      output: "Categorical value",
      examples: ["Spam detection", "Disease diagnosis", "Image labeling"],
      metrics: ["Accuracy", "Precision", "Recall", "F1 Score"],
      visual: "binary",
    },
    regression: {
      name: "Regression",
      icon: "📈",
      color: "#22C55E",
      output: "Numerical value",
      examples: [
        "Price prediction",
        "Temperature forecast",
        "Sales estimation",
      ],
      metrics: ["MSE", "RMSE", "MAE", "R²"],
      visual: "line",
    },
    timeseries: {
      name: "Time-Series Forecasting",
      icon: "📅",
      color: "#F59E0B",
      output: "Future numerical values",
      examples: ["Stock prices", "Demand forecasting", "Weather prediction"],
      metrics: ["MAPE", "RMSE", "MAE"],
      visual: "forecast",
    },
    vision: {
      name: "Computer Vision",
      icon: "👁️",
      color: "#8B5CF6",
      output: "Image classifications / Object locations",
      examples: [
        "Object detection",
        "Image classification",
        "Face recognition",
      ],
      metrics: ["mAP", "IoU", "Accuracy"],
      visual: "image",
    },
    nlp: {
      name: "Natural Language Processing",
      icon: "💬",
      color: "#EC4899",
      output: "Text insights / Classifications",
      examples: ["Sentiment analysis", "Entity extraction", "Translation"],
      metrics: ["BLEU", "Accuracy", "F1"],
      visual: "text",
    },
  };

  const current = tasks[selectedTask];

  return (
    <Section title="🔧 Common Machine Learning Tasks" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        The type of output you need determines which ML task to use. Each task
        has specific algorithms and metrics.
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(tasks).map(([key, task]) => (
          <button
            key={key}
            onClick={() => setSelectedTask(key)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              selectedTask === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedTask === key ? task.color : undefined,
            }}
          >
            {task.icon} {task.name}
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
          {/* Info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{current.icon}</span>
              <div>
                <h3 className="font-bold" style={{ color: current.color }}>
                  {current.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Output: {current.output}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-500 mb-2">Examples:</div>
              <div className="flex flex-wrap gap-2">
                {current.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs text-white"
                    style={{ backgroundColor: current.color }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-2">
                Evaluation Metrics:
              </div>
              <div className="flex flex-wrap gap-2">
                {current.metrics.map((m, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 rounded text-xs border"
                    style={{ borderColor: current.color, color: current.color }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-center">
            {current.visual === "binary" && (
              <div className="text-center">
                <div className="flex gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-green-100 border-4 border-green-500 flex items-center justify-center">
                    <span className="text-green-600 font-bold">Yes</span>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-red-100 border-4 border-red-500 flex items-center justify-center">
                    <span className="text-red-600 font-bold">No</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  Binary Classification
                </div>
              </div>
            )}

            {current.visual === "line" && (
              <svg viewBox="0 0 150 80" className="w-full h-24">
                <line
                  x1="20"
                  y1="70"
                  x2="130"
                  y2="70"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <line
                  x1="20"
                  y1="10"
                  x2="20"
                  y2="70"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <path
                  d="M 25,60 Q 50,50 75,40 T 125,20"
                  stroke="#22C55E"
                  strokeWidth="3"
                  fill="none"
                />
                {[25, 45, 65, 85, 105, 125].map((x, i) => (
                  <circle key={i} cx={x} cy={60 - i * 7} r="4" fill="#22C55E" />
                ))}
                <text
                  x="75"
                  y="78"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#6B7280"
                >
                  Continuous output
                </text>
              </svg>
            )}

            {current.visual === "forecast" && (
              <svg viewBox="0 0 150 80" className="w-full h-24">
                <line
                  x1="20"
                  y1="70"
                  x2="130"
                  y2="70"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <line
                  x1="20"
                  y1="10"
                  x2="20"
                  y2="70"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <line
                  x1="80"
                  y1="10"
                  x2="80"
                  y2="70"
                  stroke="#F59E0B"
                  strokeWidth="1"
                  strokeDasharray="4"
                />
                <path
                  d="M 25,50 L 40,45 L 55,55 L 70,40 L 80,35"
                  stroke="#374151"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 80,35 L 95,30 L 110,25 L 125,20"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="4"
                />
                <text
                  x="50"
                  y="78"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#6B7280"
                >
                  Historical
                </text>
                <text
                  x="105"
                  y="78"
                  textAnchor="middle"
                  fontSize="7"
                  fill="#F59E0B"
                >
                  Forecast
                </text>
              </svg>
            )}

            {current.visual === "image" && (
              <div className="relative">
                <div className="w-24 h-20 bg-gray-200 rounded flex items-center justify-center text-3xl">
                  🐕
                </div>
                <div className="absolute top-1 left-1 right-1 bottom-1 border-2 border-purple-500 rounded" />
                <div className="absolute -top-2 left-1 bg-purple-500 text-white text-xs px-1 rounded">
                  Dog: 98%
                </div>
              </div>
            )}

            {current.visual === "text" && (
              <div className="text-sm">
                <div className="mb-2">
                  "I <span className="bg-green-200 px-1 rounded">love</span>{" "}
                  this product!"
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Sentiment:</span>
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                    Positive 😊
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

const MLWorkflowSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      num: 1,
      name: "Load Data",
      icon: "📥",
      color: "#3B82F6",
      desc: "Import and inspect the dataset",
      details: "Understand data structure, types, and quality",
    },
    {
      num: 2,
      name: "Preprocess",
      icon: "🔧",
      color: "#8B5CF6",
      desc: "Normalize and clean for consistency",
      details: "Handle missing values, normalize, encode categories",
    },
    {
      num: 3,
      name: "Split Data",
      icon: "✂️",
      color: "#EC4899",
      desc: "Separate into training and test sets",
      details: "Typically 70-80% training, 20-30% testing",
    },
    {
      num: 4,
      name: "Choose Model",
      icon: "🎯",
      color: "#F59E0B",
      desc: "Select and configure an algorithm",
      details: "Based on task type and data characteristics",
    },
    {
      num: 5,
      name: "Train Model",
      icon: "🏋️",
      color: "#22C55E",
      desc: "Learn patterns from training data",
      details: "Adjust model parameters to minimize error",
    },
    {
      num: 6,
      name: "Score Model",
      icon: "📊",
      color: "#06B6D4",
      desc: "Generate predictions on test data",
      details: "Apply trained model to unseen data",
    },
    {
      num: 7,
      name: "Evaluate",
      icon: "✅",
      color: "#10B981",
      desc: "Calculate performance metrics",
      details: "Determine if model meets success criteria",
    },
  ];

  useEffect(() => {
    let interval;
    if (isAnimating && activeStep < steps.length - 1) {
      interval = setInterval(() => {
        setActiveStep((s) => {
          const next = s + 1;
          if (next >= steps.length - 1) {
            setIsAnimating(false);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnimating, activeStep, steps.length]);

  const current = steps[activeStep];

  return (
    <Section title="🔄 The ML Workflow" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Training a machine learning model follows a systematic 7-step process.
        <strong> This is often iterative</strong> — you may repeat steps to
        improve results!
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setActiveStep(0);
            setIsAnimating(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ▶️ Animate Workflow
        </button>
        <button
          onClick={() => {
            setActiveStep(0);
            setIsAnimating(false);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* Pipeline visualization */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-max gap-1">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => {
                  setActiveStep(i);
                  setIsAnimating(false);
                }}
                className={`flex flex-col items-center p-2 rounded-xl transition-all min-w-16 ${
                  i === activeStep
                    ? "scale-110 ring-4 ring-opacity-50"
                    : i < activeStep
                    ? "opacity-100"
                    : "opacity-40"
                }`}
                style={{
                  backgroundColor: i <= activeStep ? step.color : "#E5E7EB",
                  ringColor: step.color,
                }}
              >
                <span className="text-xl">{step.icon}</span>
                <span
                  className={`text-xs font-medium mt-1 ${
                    i <= activeStep ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step.num}
                </span>
              </button>
              {i < steps.length - 1 && (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  className={`flex-shrink-0 ${
                    i < activeStep ? "text-gray-400" : "text-gray-300"
                  }`}
                >
                  <path
                    d="M 4,10 L 14,10 M 10,6 L 14,10 L 10,14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Current step detail */}
      <div
        className="rounded-xl p-4 border-2 mb-4"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}10`,
        }}
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl text-white"
            style={{ backgroundColor: current.color }}
          >
            {current.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: current.color }}
              >
                {current.num}
              </span>
              <h3
                className="font-bold text-lg"
                style={{ color: current.color }}
              >
                {current.name}
              </h3>
            </div>
            <p className="text-gray-700">{current.desc}</p>
            <p className="text-sm text-gray-500 mt-1">{current.details}</p>
          </div>
        </div>
      </div>

      {/* Iteration indicator */}
      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔁</span>
          <p className="text-sm text-yellow-800">
            <strong>Iterative Process:</strong> If evaluation shows poor
            performance, go back to earlier steps — try different preprocessing,
            algorithms, or hyperparameters!
          </p>
        </div>
      </div>
    </Section>
  );
};

const DiabetesExampleSection = () => {
  const [step, setStep] = useState(0);

  const workflowSteps = [
    {
      name: "Define Problem",
      icon: "🎯",
      content: {
        question: "Does the patient have diabetes?",
        output: "Categorical (Yes / No)",
        task: "Classification",
        data: "Patient health metrics",
      },
    },
    {
      name: "Load Data",
      icon: "📥",
      content: {
        features: ["Age", "BMI", "Blood Pressure", "Glucose Level", "Insulin"],
        rows: "768 patients",
        target: "Diabetes (0 or 1)",
      },
    },
    {
      name: "Preprocess",
      icon: "🔧",
      content: {
        actions: [
          "Handle missing values",
          "Normalize numerical features",
          "Check for outliers",
        ],
      },
    },
    {
      name: "Split",
      icon: "✂️",
      content: {
        training: "614 patients (80%)",
        testing: "154 patients (20%)",
      },
    },
    {
      name: "Train",
      icon: "🏋️",
      content: {
        algorithm: "Logistic Regression",
        process: "Learning decision boundary from training data",
      },
    },
    {
      name: "Evaluate",
      icon: "✅",
      content: {
        accuracy: "78%",
        precision: "72%",
        recall: "65%",
      },
    },
  ];

  const current = workflowSteps[step];

  return (
    <Section title="🏥 Example: Diabetes Prediction" color="#ef4444">
      <p className="text-gray-700 mb-4">
        Let's walk through a complete example: predicting whether patients have
        diabetes based on health data.
      </p>

      {/* Step selector */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {workflowSteps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              step === i
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      <div className="bg-red-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{current.icon}</span>
          <h3 className="font-bold text-red-800 text-lg">{current.name}</h3>
        </div>

        <div className="bg-white rounded-lg p-4">
          {step === 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Question:</div>
                <div className="font-medium text-lg">
                  {current.content.question}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Output: </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-sm">
                    {current.content.output}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Task: </span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm">
                    {current.content.task}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Data: </span>
                  <span className="text-gray-700">{current.content.data}</span>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500 mb-2">Features (X):</div>
                <div className="flex flex-wrap gap-2">
                  {current.content.features.map((f, i) => (
                    <span
                      key={i}
                      className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-500">Dataset size: </span>
                  <span className="font-medium">{current.content.rows}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Target (y): </span>
                  <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-sm">
                    {current.content.target}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-sm text-gray-500 mb-2">
                Preprocessing Actions:
              </div>
              <ul className="space-y-2">
                {current.content.actions.map((action, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs">
                      {i + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {step === 3 && (
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <div>
                    <div className="text-2xl font-bold text-green-600">80%</div>
                    <div className="text-xs text-green-600">Training</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {current.content.training}
                </div>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <div>
                    <div className="text-xl font-bold text-blue-600">20%</div>
                    <div className="text-xs text-blue-600">Testing</div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {current.content.testing}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <div className="inline-block bg-amber-100 rounded-lg p-4 mb-3">
                <div className="text-sm text-amber-600">Algorithm:</div>
                <div className="font-bold text-amber-800 text-lg">
                  {current.content.algorithm}
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {current.content.process}
              </div>

              {/* Simple visualization */}
              <div className="mt-4">
                <svg viewBox="0 0 200 100" className="w-48 h-24 mx-auto">
                  {/* Decision boundary */}
                  <line
                    x1="30"
                    y1="80"
                    x2="170"
                    y2="20"
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="4"
                  />
                  {/* Class 0 points */}
                  {[
                    [40, 70],
                    [50, 60],
                    [60, 75],
                    [45, 85],
                    [70, 65],
                  ].map(([x, y], i) => (
                    <circle
                      key={`c0-${i}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#22C55E"
                    />
                  ))}
                  {/* Class 1 points */}
                  {[
                    [130, 30],
                    [140, 40],
                    [150, 25],
                    [120, 45],
                    [145, 35],
                  ].map(([x, y], i) => (
                    <circle
                      key={`c1-${i}`}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="#EF4444"
                    />
                  ))}
                  <text x="45" y="95" fontSize="8" fill="#22C55E">
                    No Diabetes
                  </text>
                  <text x="120" y="15" fontSize="8" fill="#EF4444">
                    Diabetes
                  </text>
                </svg>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  name: "Accuracy",
                  value: current.content.accuracy,
                  color: "#22C55E",
                },
                {
                  name: "Precision",
                  value: current.content.precision,
                  color: "#3B82F6",
                },
                {
                  name: "Recall",
                  value: current.content.recall,
                  color: "#F59E0B",
                },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-lg font-bold mb-2"
                    style={{ backgroundColor: metric.color }}
                  >
                    {metric.value}
                  </div>
                  <div className="text-sm text-gray-600">{metric.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

const AzureMLSection = () => {
  const [selectedTool, setSelectedTool] = useState("designer");

  const tools = {
    designer: {
      name: "Azure ML Designer",
      icon: "🎨",
      desc: "Drag-and-drop visual interface",
      best: "Beginners, quick prototyping",
      features: [
        "No code required",
        "Visual pipeline builder",
        "Pre-built components",
      ],
    },
    automl: {
      name: "Automated ML",
      icon: "🤖",
      desc: "Automatic algorithm selection and tuning",
      best: "Finding best model quickly",
      features: [
        "Tries multiple algorithms",
        "Automatic hyperparameter tuning",
        "Model explanation",
      ],
    },
    notebooks: {
      name: "Notebooks",
      icon: "📓",
      desc: "Full code control with Python/R",
      best: "Data scientists, custom solutions",
      features: [
        "Full flexibility",
        "Custom algorithms",
        "Integration with frameworks",
      ],
    },
  };

  const current = tools[selectedTool];

  return (
    <Section title="☁️ Azure Machine Learning Tools" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Azure Machine Learning provides multiple ways to build ML solutions,
        from no-code to full code control:
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {Object.entries(tools).map(([key, tool]) => (
          <button
            key={key}
            onClick={() => setSelectedTool(key)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              selectedTool === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tool.icon} {tool.name}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{current.icon}</span>
          <div>
            <h3 className="font-bold text-blue-800">{current.name}</h3>
            <p className="text-sm text-gray-600">{current.desc}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-gray-500 mb-2">Best for:</div>
            <div className="font-medium text-blue-700">{current.best}</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-sm text-gray-500 mb-2">Key Features:</div>
            <ul className="space-y-1">
              {current.features.map((f, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span className="text-blue-500">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-3 gap-3 mb-4">
      {[
        { icon: "🎯", title: "Define Problem", key: "Output → Task → Metrics" },
        {
          icon: "🔧",
          title: "Choose Task",
          key: "Classification, Regression, etc.",
        },
        {
          icon: "🔄",
          title: "Follow Workflow",
          key: "7 steps, iterative process",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 text-center text-white"
        >
          <span className="text-3xl">{item.icon}</span>
          <div className="font-bold text-sm mt-2">{item.title}</div>
          <div className="text-xs opacity-80">{item.key}</div>
        </div>
      ))}
    </div>

    <div className="bg-gray-100 rounded-xl p-4 mb-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Machine learning success starts with clearly defining the problem before
        writing any code. Understanding what output you need determines the ML
        task, which determines the algorithms and metrics you'll use. The 7-step
        workflow (load → preprocess → split → choose → train → score → evaluate)
        is iterative — expect to repeat steps as you refine your model. Azure ML
        provides tools for every skill level, from visual designers to full code
        control!
      </p>
    </div>

    <div className="flex items-center justify-center gap-4 flex-wrap">
      {[
        { step: "1", label: "Load" },
        { step: "2", label: "Preprocess" },
        { step: "3", label: "Split" },
        { step: "4", label: "Choose" },
        { step: "5", label: "Train" },
        { step: "6", label: "Score" },
        { step: "7", label: "Evaluate" },
      ].map((s, i) => (
        <React.Fragment key={i}>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
              {s.step}
            </div>
            <div className="text-xs text-gray-600 mt-1">{s.label}</div>
          </div>
          {i < 6 && (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              className="text-gray-400"
            >
              <path
                d="M 4,10 L 14,10 M 10,6 L 14,10 L 10,14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          )}
        </React.Fragment>
      ))}
    </div>
  </Section>
);

export default function MLGettingStartedGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🚀 Getting Started with Machine Learning
          </h1>
          <p className="text-gray-600">
            A Visual Guide to the ML Problem-Solving Process
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure ML Fundamentals
          </div>
        </div>

        <DefineTheProblemSection />
        <MLTasksSection />
        <MLWorkflowSection />
        <DiabetesExampleSection />
        <AzureMLSection />
        <SummarySection />
      </div>
    </div>
  );
}
