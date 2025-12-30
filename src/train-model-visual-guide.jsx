import React, { useState } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ChoiceFactorsSection = () => {
  const [selectedFactor, setSelectedFactor] = useState(0);

  const factors = [
    {
      icon: "🎯",
      name: "Model Type",
      question: "What type of model do you need?",
      options: [
        "Classification",
        "Regression",
        "Computer Vision",
        "NLP",
        "Custom",
      ],
      recommendation: "Different services excel at different model types",
    },
    {
      icon: "🎛️",
      name: "Control Level",
      question: "How much control do you need?",
      options: [
        "Full control (code)",
        "Some customization",
        "Pre-built models",
      ],
      recommendation: "More control = more complexity but more flexibility",
    },
    {
      icon: "⏱️",
      name: "Time Investment",
      question: "How much time can you invest?",
      options: ["Days/Weeks (custom)", "Hours (AutoML)", "Minutes (pre-built)"],
      recommendation: "Pre-built models save time but may be less tailored",
    },
    {
      icon: "🏢",
      name: "Existing Services",
      question: "What services does your org already use?",
      options: ["Azure ML", "Databricks", "Fabric", "None yet"],
      recommendation: "Leverage existing infrastructure when possible",
    },
    {
      icon: "💻",
      name: "Programming",
      question: "What languages are you comfortable with?",
      options: ["Python", "R", "No-code/Low-code", "SQL"],
      recommendation: "Choose tools that match your team's skills",
    },
  ];

  const current = factors[selectedFactor];

  return (
    <Section title="🤔 Choosing a Training Service" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Which service you use to train models depends on several factors.
        Consider these questions:
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {factors.map((factor, i) => (
          <button
            key={i}
            onClick={() => setSelectedFactor(i)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              selectedFactor === i
                ? "bg-gray-800 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {factor.icon} {factor.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{current.icon}</span>
          <div>
            <h3 className="font-bold text-gray-800">{current.name}</h3>
            <p className="text-gray-600">{current.question}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          {current.options.map((opt, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-2 text-center text-sm border hover:border-blue-400 cursor-pointer transition-all"
            >
              {opt}
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <span className="text-yellow-600">💡</span>
          <span className="text-sm text-yellow-800 ml-2">
            {current.recommendation}
          </span>
        </div>
      </div>
    </Section>
  );
};

const AzureServicesSection = () => {
  const [selectedService, setSelectedService] = useState("azureml");

  const services = {
    azureml: {
      name: "Azure Machine Learning",
      icon: "🔷",
      color: "#0078D4",
      tagline: "Full ML lifecycle management",
      description:
        "Comprehensive platform for training and managing ML models with multiple interfaces",
      interfaces: ["Studio (UI)", "Python SDK", "CLI"],
      bestFor: ["Data scientists", "ML engineers", "Full control needs"],
      features: ["AutoML", "Designer", "Notebooks", "MLOps", "Responsible AI"],
      complexity: "Medium-High",
      flexibility: "High",
    },
    databricks: {
      name: "Azure Databricks",
      icon: "🔶",
      color: "#FF3621",
      tagline: "Unified data + ML platform",
      description:
        "Data analytics platform using distributed Spark compute for data engineering and data science",
      interfaces: ["Notebooks", "SQL", "REST API"],
      bestFor: ["Big data processing", "Data engineers", "Spark users"],
      features: [
        "Distributed compute",
        "Delta Lake",
        "MLflow integration",
        "Collaborative notebooks",
      ],
      complexity: "Medium-High",
      flexibility: "High",
    },
    fabric: {
      name: "Microsoft Fabric",
      icon: "🟣",
      color: "#742774",
      tagline: "Integrated analytics platform",
      description:
        "Streamlined data workflows connecting analysts, engineers, and data scientists",
      interfaces: ["Web UI", "Notebooks", "Power BI"],
      bestFor: [
        "End-to-end analytics",
        "Business users",
        "Power BI integration",
      ],
      features: [
        "Data prep",
        "Model training",
        "Predictions",
        "Power BI reports",
      ],
      complexity: "Low-Medium",
      flexibility: "Medium",
    },
    foundry: {
      name: "Foundry Tools",
      icon: "🟦",
      color: "#00BCF2",
      tagline: "Pre-built ML models as APIs",
      description:
        "Collection of pre-built models for common ML tasks, available as APIs",
      interfaces: ["REST API", "SDKs"],
      bestFor: ["Quick integration", "Common tasks", "Non-ML developers"],
      features: [
        "Object detection",
        "Text analysis",
        "Custom training option",
        "Easy integration",
      ],
      complexity: "Low",
      flexibility: "Low-Medium",
    },
  };

  const current = services[selectedService];

  return (
    <Section title="☁️ Azure Services for ML Training" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Azure offers several services for training machine learning models. Each
        has different strengths:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {Object.entries(services).map(([key, service]) => (
          <button
            key={key}
            onClick={() => setSelectedService(key)}
            className={`p-4 rounded-xl transition-all text-center ${
              selectedService === key
                ? "ring-4 ring-opacity-50 scale-105"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            style={{
              backgroundColor:
                selectedService === key ? `${service.color}15` : undefined,
              borderColor: service.color,
              ringColor: service.color,
            }}
          >
            <span className="text-3xl">{service.icon}</span>
            <div
              className="font-medium text-sm mt-2"
              style={{ color: service.color }}
            >
              {service.name.split(" ").slice(-1)[0]}
            </div>
          </button>
        ))}
      </div>

      <div
        className="rounded-xl p-4 border-2"
        style={{
          borderColor: current.color,
          backgroundColor: `${current.color}08`,
        }}
      >
        <div className="flex items-start gap-4 mb-4">
          <span className="text-5xl">{current.icon}</span>
          <div>
            <h3 className="font-bold text-xl" style={{ color: current.color }}>
              {current.name}
            </h3>
            <p className="text-gray-600 italic">{current.tagline}</p>
            <p className="text-sm text-gray-700 mt-1">{current.description}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Interfaces:</div>
            <div className="flex flex-wrap gap-1">
              {current.interfaces.map((int, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: current.color }}
                >
                  {int}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Best For:</div>
            <ul className="text-xs text-gray-700 space-y-1">
              {current.bestFor.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Key Features:</div>
            <div className="flex flex-wrap gap-1">
              {current.features.map((feat, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                >
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex-1 bg-white rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500">Complexity</div>
            <div className="font-medium" style={{ color: current.color }}>
              {current.complexity}
            </div>
          </div>
          <div className="flex-1 bg-white rounded-lg p-2 text-center">
            <div className="text-xs text-gray-500">Flexibility</div>
            <div className="font-medium" style={{ color: current.color }}>
              {current.flexibility}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const ServiceComparisonSection = () => {
  const [sortBy, setSortBy] = useState(null);

  const services = [
    {
      name: "Azure ML",
      complexity: 4,
      flexibility: 5,
      speed: 3,
      prebuilt: 2,
      icon: "🔷",
    },
    {
      name: "Databricks",
      complexity: 4,
      flexibility: 5,
      speed: 3,
      prebuilt: 1,
      icon: "🔶",
    },
    {
      name: "Fabric",
      complexity: 2,
      flexibility: 3,
      speed: 4,
      prebuilt: 3,
      icon: "🟣",
    },
    {
      name: "Foundry",
      complexity: 1,
      flexibility: 2,
      speed: 5,
      prebuilt: 5,
      icon: "🟦",
    },
  ];

  const metrics = [
    { key: "complexity", label: "Complexity", desc: "Lower = easier to use" },
    {
      key: "flexibility",
      label: "Flexibility",
      desc: "Higher = more customization",
    },
    { key: "speed", label: "Time to Deploy", desc: "Higher = faster results" },
    {
      key: "prebuilt",
      label: "Pre-built Models",
      desc: "Higher = more available",
    },
  ];

  return (
    <Section title="📊 Service Comparison" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Compare Azure ML services across different dimensions:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-purple-100">
              <th className="p-3 text-left">Service</th>
              {metrics.map((metric, i) => (
                <th
                  key={i}
                  className="p-3 text-center cursor-pointer hover:bg-purple-200 transition-all"
                  onClick={() => setSortBy(metric.key)}
                  title={metric.desc}
                >
                  <div>{metric.label}</div>
                  <div className="text-xs font-normal text-gray-500">
                    {metric.desc}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services
              .sort((a, b) => (sortBy ? b[sortBy] - a[sortBy] : 0))
              .map((service, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">
                    <span className="mr-2">{service.icon}</span>
                    {service.name}
                  </td>
                  {metrics.map((metric, j) => (
                    <td key={j} className="p-3">
                      <div className="flex justify-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, k) => (
                            <div
                              key={k}
                              className={`w-4 h-4 rounded ${
                                k < service[metric.key]
                                  ? metric.key === "complexity"
                                    ? "bg-orange-400"
                                    : "bg-green-400"
                                  : "bg-gray-200"
                              }`}
                            />
                          ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Click column headers to sort by that metric
      </div>
    </Section>
  );
};

const AzureMLFeaturesSection = () => {
  const [selectedFeature, setSelectedFeature] = useState("automl");

  const features = {
    automl: {
      name: "AutoML",
      icon: "🤖",
      color: "#22C55E",
      desc: "Automatically run multiple training jobs with different algorithms and parameters",
      benefit: "Find the best model without manual experimentation",
      details: [
        "Tries multiple algorithms automatically",
        "Tunes hyperparameters for you",
        "Ranks models by performance",
        "Explains model decisions",
      ],
    },
    designer: {
      name: "Designer",
      icon: "🎨",
      color: "#8B5CF6",
      desc: "Visual drag-and-drop interface for creating ML pipelines",
      benefit: "Build models without writing code",
      details: [
        "Drag-and-drop components",
        "Pre-built modules for common tasks",
        "Visual pipeline orchestration",
        "Export to code when needed",
      ],
    },
    notebooks: {
      name: "Notebooks",
      icon: "📓",
      color: "#3B82F6",
      desc: "Jupyter notebooks with full Python/R support",
      benefit: "Complete flexibility for custom solutions",
      details: [
        "Interactive coding environment",
        "Full Python/R ecosystem",
        "Integrated compute resources",
        "Collaboration features",
      ],
    },
    mlops: {
      name: "MLOps",
      icon: "🔄",
      color: "#F59E0B",
      desc: "End-to-end ML lifecycle management and automation",
      benefit: "Streamline model deployment and monitoring",
      details: [
        "Model versioning & registry",
        "CI/CD pipelines for ML",
        "Automated retraining",
        "Production monitoring",
      ],
    },
    responsible: {
      name: "Responsible AI",
      icon: "⚖️",
      color: "#EF4444",
      desc: "Tools for fairness, explainability, and accountability",
      benefit: "Build ethical and trustworthy AI systems",
      details: [
        "Model explainability",
        "Fairness assessment",
        "Error analysis",
        "Data visualization",
      ],
    },
  };

  const current = features[selectedFeature];

  return (
    <Section title="🔷 Azure Machine Learning Features" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Let's focus on Azure Machine Learning — the most comprehensive platform
        for ML in Azure:
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(features).map(([key, feature]) => (
          <button
            key={key}
            onClick={() => setSelectedFeature(key)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedFeature === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedFeature === key ? feature.color : undefined,
            }}
          >
            {feature.icon} {feature.name}
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
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{current.icon}</span>
          <div>
            <h3 className="font-bold text-lg" style={{ color: current.color }}>
              {current.name}
            </h3>
            <p className="text-gray-600">{current.desc}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">Key Benefit:</div>
            <div className="font-medium" style={{ color: current.color }}>
              {current.benefit}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">Capabilities:</div>
            <ul className="space-y-1">
              {current.details.map((detail, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span style={{ color: current.color }}>✓</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const AzureMLTasksSection = () => {
  const tasks = [
    {
      icon: "🔍",
      name: "Explore Data",
      desc: "Inspect and prepare data for modeling",
      phase: "Prepare",
    },
    {
      icon: "🏋️",
      name: "Train Models",
      desc: "Run training jobs with various algorithms",
      phase: "Train",
    },
    {
      icon: "📊",
      name: "Evaluate",
      desc: "Compare model performance metrics",
      phase: "Train",
    },
    {
      icon: "📦",
      name: "Register",
      desc: "Version and manage trained models",
      phase: "Deploy",
    },
    {
      icon: "🚀",
      name: "Deploy",
      desc: "Make models available for applications",
      phase: "Deploy",
    },
    {
      icon: "⚖️",
      name: "Responsible AI",
      desc: "Review fairness and explainability",
      phase: "Monitor",
    },
  ];

  const phases = ["Prepare", "Train", "Deploy", "Monitor"];
  const phaseColors = {
    Prepare: "#3B82F6",
    Train: "#22C55E",
    Deploy: "#F59E0B",
    Monitor: "#8B5CF6",
  };

  return (
    <Section title="📋 Azure ML Supported Tasks" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Azure Machine Learning supports the entire ML lifecycle:
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        {/* Phase timeline */}
        <div className="flex justify-between mb-6">
          {phases.map((phase, i) => (
            <div key={i} className="text-center flex-1">
              <div
                className="w-full h-2 rounded-full"
                style={{ backgroundColor: phaseColors[phase] }}
              />
              <div
                className="text-sm font-medium mt-2"
                style={{ color: phaseColors[phase] }}
              >
                {phase}
              </div>
            </div>
          ))}
        </div>

        {/* Tasks */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tasks.map((task, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-3 border-l-4 hover:shadow-md transition-all"
              style={{ borderColor: phaseColors[task.phase] }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{task.icon}</span>
                <span className="font-medium text-gray-800">{task.name}</span>
              </div>
              <p className="text-xs text-gray-500">{task.desc}</p>
              <span
                className="text-xs px-2 py-0.5 rounded mt-2 inline-block"
                style={{
                  backgroundColor: `${phaseColors[task.phase]}20`,
                  color: phaseColors[task.phase],
                }}
              >
                {task.phase}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const AzureMLCapabilitiesSection = () => {
  const capabilities = [
    {
      icon: "💾",
      name: "Data Management",
      desc: "Centralized storage and management of datasets",
      color: "#3B82F6",
    },
    {
      icon: "⚡",
      name: "Compute Resources",
      desc: "On-demand compute for training jobs",
      color: "#F59E0B",
    },
    {
      icon: "🤖",
      name: "AutoML",
      desc: "Automatic algorithm selection and tuning",
      color: "#22C55E",
    },
    {
      icon: "🎨",
      name: "Visual Pipelines",
      desc: "Drag-and-drop pipeline designer",
      color: "#8B5CF6",
    },
    {
      icon: "🔗",
      name: "Framework Integration",
      desc: "MLflow, PyTorch, TensorFlow, scikit-learn",
      color: "#EC4899",
    },
    {
      icon: "⚖️",
      name: "Responsible AI",
      desc: "Explainability, fairness, error analysis",
      color: "#EF4444",
    },
  ];

  return (
    <Section title="🛠️ Azure ML Capabilities" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Azure Machine Learning provides these key capabilities:
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {capabilities.map((cap, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-4 border-2 hover:shadow-lg transition-all"
            style={{ borderColor: cap.color }}
          >
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl text-white mb-3"
              style={{ backgroundColor: cap.color }}
            >
              {cap.icon}
            </div>
            <h4 className="font-bold text-gray-800">{cap.name}</h4>
            <p className="text-sm text-gray-600">{cap.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

const DecisionFlowSection = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: "prebuilt",
      question: "Can a pre-built model solve your problem?",
      yes: "Foundry Tools",
      no: "custom",
    },
    {
      id: "code",
      question: "Do you want to write code?",
      yes: "code_comfort",
      no: "nocode",
    },
    {
      id: "code_comfort",
      question: "Do you need big data / Spark processing?",
      yes: "Azure Databricks",
      no: "Azure Machine Learning",
    },
    {
      id: "nocode",
      question: "Do you need Power BI integration?",
      yes: "Microsoft Fabric",
      no: "Azure ML Designer",
    },
  ];

  const getRecommendation = () => {
    if (answers.prebuilt === "yes") return "Foundry Tools";
    if (answers.prebuilt === "no") {
      if (answers.code === "yes") {
        if (answers.code_comfort === "yes") return "Azure Databricks";
        return "Azure Machine Learning";
      }
      if (answers.code === "no") {
        if (answers.nocode === "yes") return "Microsoft Fabric";
        return "Azure ML Designer";
      }
    }
    return null;
  };

  const currentQuestion = () => {
    if (!answers.prebuilt) return questions[0];
    if (answers.prebuilt === "yes") return null;
    if (!answers.code) return questions[1];
    if (answers.code === "yes" && !answers.code_comfort) return questions[2];
    if (answers.code === "no" && !answers.nocode) return questions[3];
    return null;
  };

  const current = currentQuestion();
  const recommendation = getRecommendation();

  const serviceInfo = {
    "Foundry Tools": { icon: "🟦", color: "#00BCF2" },
    "Azure Databricks": { icon: "🔶", color: "#FF3621" },
    "Azure Machine Learning": { icon: "🔷", color: "#0078D4" },
    "Microsoft Fabric": { icon: "🟣", color: "#742774" },
    "Azure ML Designer": { icon: "🎨", color: "#8B5CF6" },
  };

  return (
    <Section title="🧭 Decision Helper" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Answer these questions to find the best service for your needs:
      </p>

      <div className="bg-indigo-50 rounded-xl p-4">
        {current && !recommendation && (
          <div className="text-center">
            <div className="text-lg font-medium text-indigo-800 mb-4">
              {current.question}
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setAnswers({ ...answers, [current.id]: "yes" })}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
              >
                ✅ Yes
              </button>
              <button
                onClick={() => setAnswers({ ...answers, [current.id]: "no" })}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium"
              >
                ❌ No
              </button>
            </div>
          </div>
        )}

        {recommendation && (
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-2">
              Recommended Service:
            </div>
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl text-white text-xl font-bold"
              style={{ backgroundColor: serviceInfo[recommendation]?.color }}
            >
              <span className="text-3xl">
                {serviceInfo[recommendation]?.icon}
              </span>
              {recommendation}
            </div>
            <button
              onClick={() => setAnswers({})}
              className="block mx-auto mt-4 text-indigo-600 hover:text-indigo-800"
            >
              🔄 Start Over
            </button>
          </div>
        )}

        {/* Progress */}
        <div className="mt-4 flex justify-center gap-2">
          {Object.keys(answers).map((key, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                answers[key] === "yes" ? "bg-green-500" : "bg-red-500"
              }`}
            />
          ))}
          {!recommendation && (
            <div className="w-3 h-3 rounded-full bg-gray-300 animate-pulse" />
          )}
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-4 gap-3 mb-4">
      {[
        {
          icon: "🔷",
          name: "Azure ML",
          key: "Full lifecycle",
          color: "#0078D4",
        },
        {
          icon: "🔶",
          name: "Databricks",
          key: "Big data + ML",
          color: "#FF3621",
        },
        {
          icon: "🟣",
          name: "Fabric",
          key: "Integrated analytics",
          color: "#742774",
        },
        {
          icon: "🟦",
          name: "Foundry",
          key: "Pre-built APIs",
          color: "#00BCF2",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-3 text-center text-white"
          style={{ backgroundColor: item.color }}
        >
          <span className="text-2xl">{item.icon}</span>
          <div className="font-bold text-sm">{item.name}</div>
          <div className="text-xs opacity-80">{item.key}</div>
        </div>
      ))}
    </div>

    <div className="bg-gray-100 rounded-xl p-4 mb-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Azure offers multiple services for ML training, each optimized for
        different scenarios.
        <strong> Azure Machine Learning</strong> is the most comprehensive
        platform, supporting the full ML lifecycle with options from no-code
        (Designer) to full code (Notebooks). <strong>Databricks</strong> excels
        at big data processing. <strong>Fabric</strong> integrates ML with Power
        BI analytics. <strong>Foundry Tools</strong> provides pre-built models
        for quick integration. Choose based on your team's skills, time
        constraints, and customization needs!
      </p>
    </div>

    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h4 className="font-semibold text-blue-800 mb-2">
        Azure ML Key Features:
      </h4>
      <div className="flex flex-wrap gap-2">
        {[
          "AutoML",
          "Designer",
          "Notebooks",
          "MLOps",
          "Responsible AI",
          "MLflow Integration",
        ].map((feat, i) => (
          <span
            key={i}
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
          >
            {feat}
          </span>
        ))}
      </div>
    </div>
  </Section>
);

export default function TrainModelGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏋️ Train the Model
          </h1>
          <p className="text-gray-600">
            A Visual Guide to ML Training Services in Azure
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure ML Fundamentals
          </div>
        </div>

        <ChoiceFactorsSection />
        <AzureServicesSection />
        <ServiceComparisonSection />
        <AzureMLFeaturesSection />
        <AzureMLTasksSection />
        <AzureMLCapabilitiesSection />
        <DecisionFlowSection />
        <SummarySection />
      </div>
    </div>
  );
}
