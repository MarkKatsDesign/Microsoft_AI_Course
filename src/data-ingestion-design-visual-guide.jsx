import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const PipelineOverviewSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTask, setActiveTask] = useState(-1);

  const tasks = [
    { name: "Extract", icon: "📤", color: "#3B82F6", desc: "Pull from source" },
    {
      name: "Transform",
      icon: "🔄",
      color: "#8B5CF6",
      desc: "Clean & reshape",
    },
    { name: "Validate", icon: "✅", color: "#22C55E", desc: "Quality check" },
    {
      name: "Load",
      icon: "📥",
      color: "#F59E0B",
      desc: "Store in destination",
    },
  ];

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setActiveTask((t) => (t + 1) % (tasks.length + 1));
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isAnimating, tasks.length]);

  return (
    <Section title="🔄 Data Ingestion Pipeline Overview" color="#1e293b">
      <p className="text-gray-700 mb-4">
        A <strong>data ingestion pipeline</strong> is a sequence of tasks that
        move and transform data. Pipelines can be triggered manually or
        scheduled for automation.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setIsAnimating(!isAnimating);
            setActiveTask(0);
          }}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
        >
          {isAnimating ? "⏸️ Pause" : "▶️ Animate Pipeline"}
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          {/* Source */}
          <div
            className={`text-center transition-all ${
              activeTask === 0 ? "scale-110" : ""
            }`}
          >
            <div className="w-16 h-16 bg-gray-400 rounded-lg flex items-center justify-center text-2xl text-white">
              🗄️
            </div>
            <div className="text-xs mt-1 text-gray-600">Source</div>
          </div>

          {tasks.map((task, i) => (
            <React.Fragment key={i}>
              {/* Arrow */}
              <svg
                width="30"
                height="24"
                viewBox="0 0 30 24"
                className={`transition-all ${
                  activeTask > i ? "text-green-500" : "text-gray-300"
                }`}
              >
                <path
                  d="M 5,12 L 20,12 M 16,8 L 20,12 L 16,16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Task */}
              <div
                className={`text-center transition-all ${
                  activeTask === i + 1 ? "scale-110" : ""
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl text-white transition-all ${
                    activeTask === i + 1 ? "ring-4 ring-opacity-50" : ""
                  }`}
                  style={{
                    backgroundColor:
                      activeTask > i ? task.color : `${task.color}60`,
                    ringColor: task.color,
                  }}
                >
                  {task.icon}
                </div>
                <div
                  className="text-xs mt-1 font-medium"
                  style={{ color: task.color }}
                >
                  {task.name}
                </div>
                <div className="text-xs text-gray-500">{task.desc}</div>
              </div>
            </React.Fragment>
          ))}

          {/* Final arrow to destination */}
          <svg
            width="30"
            height="24"
            viewBox="0 0 30 24"
            className={`transition-all ${
              activeTask > tasks.length ? "text-green-500" : "text-gray-300"
            }`}
          >
            <path
              d="M 5,12 L 20,12 M 16,8 L 20,12 L 16,16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Destination */}
          <div
            className={`text-center transition-all ${
              activeTask > tasks.length - 1 ? "scale-110" : ""
            }`}
          >
            <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-2xl text-white">
              💾
            </div>
            <div className="text-xs mt-1 text-gray-600">Destination</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👆</span>
            <h4 className="font-semibold text-blue-800">Manual Trigger</h4>
          </div>
          <p className="text-sm text-blue-700">
            Run pipeline on-demand when needed
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⏰</span>
            <h4 className="font-semibold text-green-800">Scheduled</h4>
          </div>
          <p className="text-sm text-green-700">
            Automate pipeline to run on schedule
          </p>
        </div>
      </div>
    </Section>
  );
};

const AzureServicesSection = () => {
  const [selectedService, setSelectedService] = useState("synapse");

  const services = {
    synapse: {
      name: "Azure Synapse Analytics",
      shortName: "Synapse",
      icon: "🔷",
      color: "#0078D4",
      tagline: "Data integration at scale",
      description:
        "Create and schedule data ingestion pipelines through UI or JSON definition",
      approach: "UI-first with code options",
      features: [
        "Synapse Pipelines (drag-and-drop)",
        "Many standard connectors",
        "Mapping data flows",
        "SQL, Python, R support",
      ],
      compute: ["Serverless SQL pools", "Dedicated SQL pools", "Spark pools"],
      bestFor: "Enterprise data integration, large-scale transformations",
    },
    databricks: {
      name: "Azure Databricks",
      shortName: "Databricks",
      icon: "🔶",
      color: "#FF3621",
      tagline: "Code-first data engineering",
      description:
        "Define pipelines in notebooks, schedule to run on Spark clusters",
      approach: "Code-first (SQL, Python, R)",
      features: [
        "Notebook-based pipelines",
        "Delta Lake integration",
        "Distributed Spark compute",
        "Collaborative development",
      ],
      compute: ["Spark clusters (distributed)"],
      bestFor: "Big data processing, data engineering teams",
    },
    azureml: {
      name: "Azure Machine Learning",
      shortName: "Azure ML",
      icon: "🟦",
      color: "#00BCF2",
      tagline: "ML-focused pipelines",
      description:
        "Create pipelines with Designer or scripts, integrated with ML training",
      approach: "Designer (UI) or Python scripts",
      features: [
        "Designer drag-and-drop",
        "Script-based pipelines",
        "Auto-scaling compute",
        "Integrated with ML training",
      ],
      compute: ["Compute clusters (auto-scaling)"],
      bestFor: "When all tasks stay within Azure ML ecosystem",
    },
  };

  const current = services[selectedService];

  return (
    <Section title="☁️ Azure Services for Data Pipelines" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Choose an Azure service based on your needs. Each offers different
        approaches to building pipelines:
      </p>

      <div className="grid grid-cols-3 gap-3 mb-4">
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
              ringColor: service.color,
            }}
          >
            <span className="text-3xl">{service.icon}</span>
            <div
              className="font-medium text-sm mt-2"
              style={{ color: service.color }}
            >
              {service.shortName}
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
            <div className="text-xs text-gray-500 mb-2">Approach:</div>
            <div
              className="font-medium text-sm"
              style={{ color: current.color }}
            >
              {current.approach}
            </div>
          </div>

          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Key Features:</div>
            <ul className="text-xs text-gray-700 space-y-1">
              {current.features.slice(0, 3).map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-2">Compute Options:</div>
            <div className="flex flex-wrap gap-1">
              {current.compute.map((c, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: current.color }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
          <span className="text-yellow-600">🎯</span>
          <span className="text-sm text-yellow-800 ml-2">
            <strong>Best for:</strong> {current.bestFor}
          </span>
        </div>
      </div>
    </Section>
  );
};

const ServiceComparisonSection = () => {
  const comparisons = [
    {
      aspect: "Pipeline Creation",
      synapse: { value: "UI + JSON", icon: "🎨" },
      databricks: { value: "Notebooks (code)", icon: "📓" },
      azureml: { value: "Designer + Scripts", icon: "🎨" },
    },
    {
      aspect: "Languages",
      synapse: { value: "SQL, Python, R", icon: "💻" },
      databricks: { value: "SQL, Python, R, Scala", icon: "💻" },
      azureml: { value: "Python, R", icon: "💻" },
    },
    {
      aspect: "Compute Scale",
      synapse: { value: "⭐⭐⭐⭐⭐", icon: "⚡" },
      databricks: { value: "⭐⭐⭐⭐⭐", icon: "⚡" },
      azureml: { value: "⭐⭐⭐", icon: "⚡" },
    },
    {
      aspect: "Data Connectors",
      synapse: { value: "90+ connectors", icon: "🔌" },
      databricks: { value: "Many via Spark", icon: "🔌" },
      azureml: { value: "Azure-focused", icon: "🔌" },
    },
    {
      aspect: "ML Integration",
      synapse: { value: "Via Azure ML", icon: "🤖" },
      databricks: { value: "MLflow built-in", icon: "🤖" },
      azureml: { value: "Native", icon: "🤖" },
    },
  ];

  const serviceColors = {
    synapse: "#0078D4",
    databricks: "#FF3621",
    azureml: "#00BCF2",
  };

  return (
    <Section title="📊 Service Comparison" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Compare the three main Azure services for data pipelines:
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Aspect</th>
              <th className="p-3 text-center">
                <span className="text-xl">🔷</span>
                <div style={{ color: serviceColors.synapse }}>Synapse</div>
              </th>
              <th className="p-3 text-center">
                <span className="text-xl">🔶</span>
                <div style={{ color: serviceColors.databricks }}>
                  Databricks
                </div>
              </th>
              <th className="p-3 text-center">
                <span className="text-xl">🟦</span>
                <div style={{ color: serviceColors.azureml }}>Azure ML</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3 font-medium text-gray-700">{row.aspect}</td>
                <td className="p-3 text-center">
                  <span className="mr-1">{row.synapse.icon}</span>
                  {row.synapse.value}
                </td>
                <td className="p-3 text-center">
                  <span className="mr-1">{row.databricks.icon}</span>
                  {row.databricks.value}
                </td>
                <td className="p-3 text-center">
                  <span className="mr-1">{row.azureml.icon}</span>
                  {row.azureml.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>💡 Performance Note:</strong> Azure Synapse and Databricks
          offer more scalable distributed compute for transformations than Azure
          ML. Use them for large-scale data processing!
        </p>
      </div>
    </Section>
  );
};

const SynapsePipelineSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      name: "Copy Data",
      icon: "📋",
      desc: "Use connectors to copy from source",
    },
    {
      name: "Data Flow",
      icon: "🔄",
      desc: "Transform with mapping data flows",
    },
    { name: "Execute", icon: "⚡", desc: "Run SQL, Python, or Spark" },
    { name: "Sink", icon: "💾", desc: "Write to destination" },
  ];

  return (
    <Section title="🔷 Azure Synapse Pipelines Deep Dive" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Azure Synapse Pipelines provides a visual interface for creating data
        ingestion workflows:
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        {/* Pipeline canvas simulation */}
        <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
          <div className="text-xs text-gray-500 mb-3">
            🎨 Synapse Pipeline Canvas:
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div
                  className={`text-center cursor-pointer transition-all ${
                    activeStep === i ? "scale-110" : "hover:scale-105"
                  }`}
                  onClick={() => setActiveStep(i)}
                >
                  <div
                    className={`w-20 h-16 rounded-lg flex flex-col items-center justify-center text-white transition-all ${
                      activeStep === i ? "ring-4 ring-blue-300" : ""
                    }`}
                    style={{
                      backgroundColor:
                        activeStep === i ? "#0078D4" : "#0078D490",
                    }}
                  >
                    <span className="text-xl">{step.icon}</span>
                    <span className="text-xs">{step.name}</span>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <svg
                    width="30"
                    height="20"
                    viewBox="0 0 30 20"
                    className="text-blue-400"
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

          {/* Step detail */}
          <div className="mt-4 bg-blue-100 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{steps[activeStep].icon}</span>
              <div>
                <div className="font-semibold text-blue-800">
                  {steps[activeStep].name}
                </div>
                <div className="text-sm text-blue-600">
                  {steps[activeStep].desc}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {[
          {
            icon: "🔌",
            title: "90+ Connectors",
            desc: "SQL, Blob, Cosmos, Salesforce...",
          },
          {
            icon: "🎨",
            title: "Mapping Data Flows",
            desc: "Visual transformation designer",
          },
          {
            icon: "⚡",
            title: "Multiple Compute",
            desc: "Serverless, Dedicated, Spark",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-sm text-gray-800">
              {item.title}
            </div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ArchitectureSection = () => {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  const layers = [
    {
      name: "Data Sources",
      icon: "🌐",
      color: "#EF4444",
      items: ["CRM System", "IoT Devices", "SQL Database", "APIs"],
      desc: "Raw data from various systems",
    },
    {
      name: "Ingestion Layer",
      icon: "🔄",
      color: "#F59E0B",
      items: ["Azure Synapse", "Azure Databricks", "Data Factory"],
      desc: "Extract, transform, and move data",
    },
    {
      name: "Storage Layer",
      icon: "💾",
      color: "#22C55E",
      items: ["Azure Blob Storage", "Azure Data Lake", "Delta Lake"],
      desc: "Store prepared data",
    },
    {
      name: "Consumption Layer",
      icon: "🤖",
      color: "#3B82F6",
      items: ["Azure ML Training", "Power BI", "Analytics"],
      desc: "Use data for ML and insights",
    },
  ];

  return (
    <Section title="🏗️ Designing the Architecture" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Think about your architecture <strong>before training models</strong>. A
        well-designed data ingestion solution prepares you for production!
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex flex-col gap-3">
          {layers.map((layer, i) => (
            <div key={i}>
              <div
                className={`flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer ${
                  hoveredLayer === i ? "ring-4 ring-opacity-50" : ""
                }`}
                style={{
                  backgroundColor:
                    hoveredLayer === i ? `${layer.color}20` : "white",
                  ringColor: layer.color,
                }}
                onMouseEnter={() => setHoveredLayer(i)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl text-white flex-shrink-0"
                  style={{ backgroundColor: layer.color }}
                >
                  {layer.icon}
                </div>

                <div className="flex-1">
                  <div className="font-bold" style={{ color: layer.color }}>
                    {layer.name}
                  </div>
                  <div className="text-sm text-gray-600">{layer.desc}</div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {layer.items.map((item, j) => (
                    <span
                      key={j}
                      className="text-xs px-2 py-1 rounded text-white"
                      style={{ backgroundColor: layer.color }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {i < layers.length - 1 && (
                <div className="flex justify-center py-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="text-gray-400"
                  >
                    <path
                      d="M 12,4 L 12,18 M 8,14 L 12,18 L 16,14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">💡 Best Practice</h4>
        <p className="text-sm text-yellow-700">
          Design your data ingestion architecture before training models! This
          ensures smooth transition to production when your model is ready.
        </p>
      </div>
    </Section>
  );
};

const ExampleSolutionSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      num: 1,
      title: "Extract Raw Data",
      icon: "📤",
      color: "#EF4444",
      source: "CRM / IoT",
      action: "Pull customer data and sensor readings",
      output: "Raw JSON/CSV files",
    },
    {
      num: 2,
      title: "Transform with Synapse",
      icon: "🔄",
      color: "#F59E0B",
      source: "Azure Synapse",
      action: "Clean, normalize, aggregate data",
      output: "Prepared datasets",
    },
    {
      num: 3,
      title: "Store in Blob Storage",
      icon: "💾",
      color: "#22C55E",
      source: "Azure Blob",
      action: "Save prepared data in optimized format",
      output: "Parquet/CSV files",
    },
    {
      num: 4,
      title: "Train with Azure ML",
      icon: "🤖",
      color: "#3B82F6",
      source: "Azure ML",
      action: "Use prepared data to train models",
      output: "Trained model",
    },
  ];

  useEffect(() => {
    let interval;
    let timeout;

    if (isAnimating && activeStep < steps.length - 1) {
      interval = setInterval(() => {
        setActiveStep((s) => s + 1);
      }, 1500);
    } else if (activeStep >= steps.length - 1) {
      timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 0);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isAnimating, activeStep, steps.length]);

  return (
    <Section title="🔧 Example Solution Walkthrough" color="#6366f1">
      <p className="text-gray-700 mb-4">
        A common data ingestion architecture pattern for machine learning:
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setActiveStep(0);
            setIsAnimating(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          ▶️ Animate Solution
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

      <div className="bg-indigo-50 rounded-xl p-4 mb-4">
        {/* Visual architecture */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`text-center transition-all ${
                  activeStep >= i ? "opacity-100 scale-105" : "opacity-40"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl text-white transition-all ${
                    activeStep === i ? "ring-4 ring-opacity-50" : ""
                  }`}
                  style={{ backgroundColor: step.color, ringColor: step.color }}
                >
                  {step.icon}
                </div>
                <div
                  className="text-xs mt-1 font-medium"
                  style={{ color: step.color }}
                >
                  Step {step.num}
                </div>
              </div>

              {i < steps.length - 1 && (
                <svg
                  width="30"
                  height="24"
                  viewBox="0 0 30 24"
                  className={`transition-all ${
                    activeStep > i ? "text-green-500" : "text-gray-300"
                  }`}
                >
                  <path
                    d="M 5,12 L 20,12 M 16,8 L 20,12 L 16,16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Current step details */}
        <div
          className="rounded-xl p-4 border-2 bg-white"
          style={{ borderColor: steps[activeStep].color }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg"
              style={{ backgroundColor: steps[activeStep].color }}
            >
              {steps[activeStep].num}
            </div>
            <div>
              <h4
                className="font-bold"
                style={{ color: steps[activeStep].color }}
              >
                {steps[activeStep].title}
              </h4>
              <p className="text-sm text-gray-600">
                {steps[activeStep].source}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Action:</div>
              <div className="text-sm text-gray-700">
                {steps[activeStep].action}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Output:</div>
              <div
                className="text-sm font-medium"
                style={{ color: steps[activeStep].color }}
              >
                {steps[activeStep].output}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const DecisionGuideSection = () => {
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: "approach",
      question: "Do you prefer UI-based or code-first?",
      options: [
        { value: "ui", label: "🎨 UI-based", next: "scale" },
        { value: "code", label: "💻 Code-first", next: "databricks" },
      ],
    },
    {
      id: "scale",
      question: "Do you need large-scale distributed processing?",
      options: [
        { value: "yes", label: "✅ Yes, big data", next: "synapse" },
        { value: "no", label: "❌ No, moderate scale", next: "ecosystem" },
      ],
    },
    {
      id: "ecosystem",
      question: "Do you want everything in Azure ML?",
      options: [
        { value: "yes", label: "✅ Yes, all-in-one", next: "azureml" },
        { value: "no", label: "❌ No, separate tools", next: "synapse" },
      ],
    },
  ];

  const results = {
    synapse: { name: "Azure Synapse Analytics", icon: "🔷", color: "#0078D4" },
    databricks: { name: "Azure Databricks", icon: "🔶", color: "#FF3621" },
    azureml: { name: "Azure Machine Learning", icon: "🟦", color: "#00BCF2" },
  };

  const getResult = () => {
    if (answers.approach === "code") return "databricks";
    if (answers.scale === "yes") return "synapse";
    if (answers.ecosystem === "yes") return "azureml";
    if (answers.ecosystem === "no") return "synapse";
    return null;
  };

  const getCurrentQuestion = () => {
    if (!answers.approach) return questions[0];
    if (answers.approach === "code") return null;
    if (!answers.scale) return questions[1];
    if (answers.scale === "yes") return null;
    if (!answers.ecosystem) return questions[2];
    return null;
  };

  const current = getCurrentQuestion();
  const result = getResult();

  return (
    <Section title="🧭 Which Service Should You Choose?" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Answer these questions to find the best service for your data pipeline
        needs:
      </p>

      <div className="bg-amber-50 rounded-xl p-4">
        {current && !result ? (
          <div className="text-center">
            <div className="text-lg font-medium text-amber-800 mb-4">
              {current.question}
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              {current.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setAnswers({ ...answers, [current.id]: opt.value })
                  }
                  className="px-6 py-3 bg-white rounded-lg hover:bg-amber-100 font-medium border border-amber-300"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : result ? (
          <div className="text-center">
            <div className="text-lg text-gray-600 mb-2">
              Recommended Service:
            </div>
            <div
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl text-white text-xl font-bold"
              style={{ backgroundColor: results[result].color }}
            >
              <span className="text-3xl">{results[result].icon}</span>
              {results[result].name}
            </div>
            <button
              onClick={() => setAnswers({})}
              className="block mx-auto mt-4 text-amber-600 hover:text-amber-800"
            >
              🔄 Start Over
            </button>
          </div>
        ) : null}
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-3 gap-3 mb-4">
      {[
        { icon: "🔷", name: "Synapse", key: "UI + Scale", color: "#0078D4" },
        {
          icon: "🔶",
          name: "Databricks",
          key: "Code + Spark",
          color: "#FF3621",
        },
        { icon: "🟦", name: "Azure ML", key: "ML Focused", color: "#00BCF2" },
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
        A data ingestion pipeline is essential for moving and transforming data
        for ML.
        <strong> Azure Synapse Analytics</strong> offers UI-based pipeline
        design with 90+ connectors and scalable compute.{" "}
        <strong>Azure Databricks</strong> is ideal for code-first teams using
        Spark.
        <strong>Azure Machine Learning</strong> pipelines work well when staying
        within the ML ecosystem. Design your architecture <em>before</em>{" "}
        training to ensure smooth production deployment!
      </p>
    </div>

    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
      <h4 className="font-semibold text-green-800 mb-2">
        📋 Common Architecture Pattern:
      </h4>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {[
          { icon: "🌐", label: "Sources" },
          { icon: "🔄", label: "Synapse/Databricks" },
          { icon: "💾", label: "Blob Storage" },
          { icon: "🤖", label: "Azure ML" },
        ].map((step, i) => (
          <React.Fragment key={i}>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-xl text-white">
                {step.icon}
              </div>
              <div className="text-xs text-green-700 mt-1">{step.label}</div>
            </div>
            {i < 3 && (
              <svg
                width="24"
                height="20"
                viewBox="0 0 24 20"
                className="text-green-400"
              >
                <path
                  d="M 4,10 L 16,10 M 12,6 L 16,10 L 12,14"
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
  </Section>
);

export default function DataIngestionDesignGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🏗️ Design a Data Ingestion Solution
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Building Data Pipelines in Azure
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure ML Fundamentals
          </div>
        </div>

        <PipelineOverviewSection />
        <AzureServicesSection />
        <ServiceComparisonSection />
        <SynapsePipelineSection />
        <ArchitectureSection />
        <ExampleSolutionSection />
        <DecisionGuideSection />
        <SummarySection />
      </div>
    </div>
  );
}
