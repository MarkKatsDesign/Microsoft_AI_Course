import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const DataFoundationSection = () => (
  <Section title="📊 Data: The Foundation of ML" color="#1e293b">
    <p className="text-gray-700 mb-4">
      Data is the foundation of machine learning. Both <strong>quantity</strong>{" "}
      and <strong>quality</strong> affect the model's accuracy. Before training
      any model, you need to:
    </p>

    <div className="grid md:grid-cols-3 gap-4 mb-4">
      {[
        {
          icon: "🔍",
          title: "Identify Source & Format",
          desc: "Where is the data? What format?",
        },
        {
          icon: "🍽️",
          title: "Choose How to Serve",
          desc: "What format does the model need?",
        },
        {
          icon: "🔄",
          title: "Design Ingestion",
          desc: "How to move and transform data?",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl p-4 text-white text-center"
        >
          <span className="text-3xl">{item.icon}</span>
          <div className="font-bold mt-2">{item.title}</div>
          <div className="text-xs opacity-80 mt-1">{item.desc}</div>
        </div>
      ))}
    </div>

    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <p className="text-yellow-800">
          <strong>"Garbage in, garbage out"</strong> — The best algorithms can't
          fix bad data. Data preparation often takes 60-80% of a data
          scientist's time!
        </p>
      </div>
    </div>
  </Section>
);

const DataSourcesSection = () => {
  const [selectedSource, setSelectedSource] = useState("database");

  const sources = {
    database: {
      name: "Databases",
      icon: "🗄️",
      color: "#3B82F6",
      examples: ["SQL Server", "PostgreSQL", "Cosmos DB", "MySQL"],
      dataType: "Structured / Tabular",
      useCase: "Transaction records, customer data, inventory",
    },
    crm: {
      name: "CRM Systems",
      icon: "👥",
      color: "#8B5CF6",
      examples: ["Salesforce", "Dynamics 365", "HubSpot"],
      dataType: "Structured",
      useCase: "Customer interactions, sales data, support tickets",
    },
    iot: {
      name: "IoT Devices",
      icon: "📡",
      color: "#22C55E",
      examples: [
        "Sensors",
        "Smart meters",
        "Wearables",
        "Industrial equipment",
      ],
      dataType: "Semi-structured (JSON, streams)",
      useCase: "Temperature, pressure, location, usage patterns",
    },
    files: {
      name: "File Storage",
      icon: "📁",
      color: "#F59E0B",
      examples: ["Azure Blob Storage", "Data Lake", "SharePoint", "FTP"],
      dataType: "Any (CSV, JSON, images, etc.)",
      useCase: "Historical data, documents, media files",
    },
    api: {
      name: "APIs & Web",
      icon: "🌐",
      color: "#EC4899",
      examples: ["REST APIs", "Web scraping", "Social media feeds"],
      dataType: "Semi-structured (JSON, XML)",
      useCase: "Real-time data, external services, social data",
    },
  };

  const current = sources[selectedSource];

  return (
    <Section title="🔍 Step 1: Identify Data Sources" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        First, identify where your data lives. Different sources have different
        characteristics and access methods.
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(sources).map(([key, source]) => (
          <button
            key={key}
            onClick={() => setSelectedSource(key)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              selectedSource === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedSource === key ? source.color : undefined,
            }}
          >
            {source.icon} {source.name}
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
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{current.icon}</span>
          <div>
            <h3 className="font-bold" style={{ color: current.color }}>
              {current.name}
            </h3>
            <p className="text-sm text-gray-600">{current.useCase}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3">
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
            <div className="text-xs text-gray-500 mb-2">Typical Data Type:</div>
            <div className="font-medium" style={{ color: current.color }}>
              {current.dataType}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const DataFormatsSection = () => {
  const [selectedFormat, setSelectedFormat] = useState("tabular");

  const formats = {
    tabular: {
      name: "Tabular / Structured",
      icon: "📊",
      color: "#22C55E",
      desc: "Organized in rows and columns with defined schema",
      examples: ["CSV files", "SQL tables", "Excel spreadsheets"],
      visual: "table",
      mlReady: "High",
      processing: "Usually minimal — may need normalization, encoding",
    },
    semi: {
      name: "Semi-Structured",
      icon: "📋",
      color: "#F59E0B",
      desc: "Has structure but flexible schema (key-value, nested)",
      examples: ["JSON", "XML", "Log files", "NoSQL documents"],
      visual: "json",
      mlReady: "Medium",
      processing: "Needs flattening, parsing, schema extraction",
    },
    unstructured: {
      name: "Unstructured",
      icon: "📦",
      color: "#EF4444",
      desc: "No predefined schema or organization",
      examples: ["Images", "Audio", "Video", "Free text", "PDFs"],
      visual: "blob",
      mlReady: "Low",
      processing: "Requires feature extraction, OCR, embeddings, etc.",
    },
  };

  const current = formats[selectedFormat];

  return (
    <Section title="📁 Understanding Data Formats" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Data comes in different formats. Understanding the format helps you plan
        the transformation needed.
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {Object.entries(formats).map(([key, format]) => (
          <button
            key={key}
            onClick={() => setSelectedFormat(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedFormat === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                selectedFormat === key ? format.color : undefined,
            }}
          >
            {format.icon} {format.name}
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
              <span className="text-3xl">{current.icon}</span>
              <div>
                <h3 className="font-bold" style={{ color: current.color }}>
                  {current.name}
                </h3>
                <p className="text-sm text-gray-600">{current.desc}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-500 mb-2">Examples:</div>
              <div className="flex flex-wrap gap-2">
                {current.examples.map((ex, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">ML Ready:</div>
                <div
                  className={`font-bold text-sm ${
                    current.mlReady === "High"
                      ? "text-green-600"
                      : current.mlReady === "Medium"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {current.mlReady}
                </div>
              </div>
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">Processing:</div>
                <div className="text-xs text-gray-700">
                  {current.processing}
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="bg-white rounded-lg p-4 flex items-center justify-center">
            {current.visual === "table" && (
              <div className="w-full">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-green-100">
                      <th className="border p-1">ID</th>
                      <th className="border p-1">Name</th>
                      <th className="border p-1">Age</th>
                      <th className="border p-1">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-1">1</td>
                      <td className="border p-1">Alice</td>
                      <td className="border p-1">32</td>
                      <td className="border p-1">85</td>
                    </tr>
                    <tr>
                      <td className="border p-1">2</td>
                      <td className="border p-1">Bob</td>
                      <td className="border p-1">28</td>
                      <td className="border p-1">92</td>
                    </tr>
                    <tr>
                      <td className="border p-1">3</td>
                      <td className="border p-1">Carol</td>
                      <td className="border p-1">45</td>
                      <td className="border p-1">78</td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-xs text-center text-gray-500 mt-2">
                  Rows × Columns structure
                </div>
              </div>
            )}

            {current.visual === "json" && (
              <div className="w-full">
                <pre className="text-xs bg-gray-900 text-amber-400 rounded p-3 overflow-x-auto">
                  {`{
  "device_id": "sensor_01",
  "timestamp": "2025-03-07T10:30:00Z",
  "readings": {
    "temperature": 23.5,
    "humidity": 45.2
  },
  "status": "active"
}`}
                </pre>
                <div className="text-xs text-center text-gray-500 mt-2">
                  Flexible nested structure
                </div>
              </div>
            )}

            {current.visual === "blob" && (
              <div className="text-center">
                <div className="flex gap-2 justify-center mb-2">
                  <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center text-xl">
                    🖼️
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center text-xl">
                    🎵
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded flex items-center justify-center text-xl">
                    📄
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  No predefined structure
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

const ETLPipelineSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    {
      name: "Extract",
      icon: "📤",
      color: "#3B82F6",
      desc: "Pull raw data from sources",
      details: "Connect to databases, APIs, files, IoT devices",
      action: "Read data from CRM, SQL, IoT sensors",
    },
    {
      name: "Transform",
      icon: "🔄",
      color: "#8B5CF6",
      desc: "Clean, convert, and reshape data",
      details: "Normalize, encode, aggregate, filter, join",
      action: "Clean nulls, convert types, create aggregates",
    },
    {
      name: "Load",
      icon: "📥",
      color: "#22C55E",
      desc: "Store in serving layer",
      details: "Save to storage optimized for ML consumption",
      action: "Write to Azure Blob Storage / Data Lake",
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
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAnimating, activeStep, steps.length]);

  return (
    <Section title="🔄 ETL: Extract, Transform, Load" color="#22c55e">
      <p className="text-gray-700 mb-4">
        <strong>ETL</strong> (or ELT) is the standard process for moving data
        from sources to a serving layer where it can be used for ML training.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setActiveStep(0);
            setIsAnimating(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          ▶️ Animate ETL
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
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between">
          {/* Source */}
          <div
            className={`text-center transition-all ${
              activeStep >= 0 ? "opacity-100" : "opacity-40"
            }`}
          >
            <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-2xl mb-1">
              🗄️
            </div>
            <div className="text-xs text-gray-600">Sources</div>
          </div>

          {steps.map((step, i) => (
            <React.Fragment key={i}>
              {/* Arrow */}
              <svg
                width="40"
                height="30"
                viewBox="0 0 40 30"
                className={`transition-all ${
                  activeStep >= i ? "text-gray-400" : "text-gray-200"
                }`}
              >
                <path
                  d="M 5,15 L 30,15 M 25,10 L 30,15 L 25,20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Step */}
              <div
                className={`text-center transition-all ${
                  activeStep >= i ? "scale-110" : "opacity-40"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl mb-1 text-white transition-all ${
                    activeStep === i ? "ring-4 ring-opacity-50" : ""
                  }`}
                  style={{ backgroundColor: step.color, ringColor: step.color }}
                >
                  {step.icon}
                </div>
                <div
                  className="text-xs font-medium"
                  style={{ color: step.color }}
                >
                  {step.name}
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Arrow to destination */}
          <svg
            width="40"
            height="30"
            viewBox="0 0 40 30"
            className={`transition-all ${
              activeStep >= 2 ? "text-gray-400" : "text-gray-200"
            }`}
          >
            <path
              d="M 5,15 L 30,15 M 25,10 L 30,15 L 25,20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>

          {/* Destination */}
          <div
            className={`text-center transition-all ${
              activeStep >= 2 ? "opacity-100 scale-110" : "opacity-40"
            }`}
          >
            <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-2xl mb-1 text-white">
              🤖
            </div>
            <div className="text-xs text-blue-600">Azure ML</div>
          </div>
        </div>
      </div>

      {/* Current step details */}
      <div
        className="rounded-xl p-4 border-2"
        style={{
          borderColor: steps[activeStep].color,
          backgroundColor: `${steps[activeStep].color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{steps[activeStep].icon}</span>
          <div>
            <h3
              className="font-bold"
              style={{ color: steps[activeStep].color }}
            >
              {steps[activeStep].name}
            </h3>
            <p className="text-sm text-gray-600">{steps[activeStep].desc}</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-3">
          <div className="text-sm text-gray-700">
            {steps[activeStep].details}
          </div>
          <div className="text-xs text-gray-500 mt-2">
            Example: {steps[activeStep].action}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: "🔷", name: "Azure Synapse", type: "Analytics" },
          { icon: "🔶", name: "Azure Databricks", type: "Data Engineering" },
          { icon: "🟦", name: "Azure Data Factory", type: "Orchestration" },
        ].map((tool, i) => (
          <div key={i} className="bg-white rounded-lg p-2 text-center border">
            <span className="text-xl">{tool.icon}</span>
            <div className="text-xs font-medium text-gray-700">{tool.name}</div>
            <div className="text-xs text-gray-500">{tool.type}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const DataIngestionArchSection = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  const architecture = [
    {
      step: 1,
      name: "Data Sources",
      icon: "🌐",
      color: "#EF4444",
      items: ["CRM", "IoT", "SQL DB"],
      desc: "Raw data from various systems",
    },
    {
      step: 2,
      name: "Ingestion Layer",
      icon: "🔄",
      color: "#F59E0B",
      items: ["Azure Synapse", "Data Factory"],
      desc: "Extract and transform data",
    },
    {
      step: 3,
      name: "Storage Layer",
      icon: "💾",
      color: "#22C55E",
      items: ["Blob Storage", "Data Lake"],
      desc: "Prepared data ready for use",
    },
    {
      step: 4,
      name: "ML Training",
      icon: "🤖",
      color: "#3B82F6",
      items: ["Azure ML", "Notebooks"],
      desc: "Train and deploy models",
    },
  ];

  return (
    <Section title="🏗️ Data Ingestion Architecture" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        A common architecture pattern for ML data preparation in Azure:
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {architecture.map((stage, i) => (
            <React.Fragment key={i}>
              <div
                className="flex-1 min-w-32 text-center cursor-pointer transition-all hover:scale-105"
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className={`w-20 h-20 mx-auto rounded-xl flex items-center justify-center text-3xl text-white mb-2 transition-all ${
                    hoveredStep === i ? "ring-4 ring-opacity-50" : ""
                  }`}
                  style={{
                    backgroundColor: stage.color,
                    ringColor: stage.color,
                  }}
                >
                  {stage.icon}
                </div>
                <div
                  className="font-medium text-sm"
                  style={{ color: stage.color }}
                >
                  {stage.name}
                </div>
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {stage.items.map((item, j) => (
                    <span
                      key={j}
                      className="bg-white text-gray-600 px-2 py-0.5 rounded text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {i < architecture.length - 1 && (
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  className="text-gray-400 flex-shrink-0"
                >
                  <path
                    d="M 5,15 L 20,15 M 16,11 L 20,15 L 16,19"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>

        {hoveredStep !== null && (
          <div
            className="mt-4 rounded-lg p-3 text-white text-center"
            style={{ backgroundColor: architecture[hoveredStep].color }}
          >
            <strong>Step {architecture[hoveredStep].step}:</strong>{" "}
            {architecture[hoveredStep].desc}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 border">
        <h4 className="font-semibold text-gray-700 mb-2">📋 Best Practices:</h4>
        <div className="grid md:grid-cols-2 gap-2 text-sm">
          {[
            "Extract data before analyzing — don't query sources directly",
            "Use pipelines for repeatable, scheduled data processing",
            "Store prepared data in cloud storage for easy access",
            "Version your datasets for reproducibility",
          ].map((practice, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-amber-500">✓</span>
              <span className="text-gray-600">{practice}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const WeatherExampleSection = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      name: "Extract from IoT",
      icon: "📡",
      input: "JSON from temperature sensors",
      visual: "json",
    },
    {
      name: "Convert to Table",
      icon: "📊",
      input: "Parse JSON to rows",
      visual: "rawtable",
    },
    {
      name: "Transform & Aggregate",
      icon: "🔄",
      input: "Average temperature per hour",
      visual: "aggtable",
    },
  ];

  return (
    <Section title="🌡️ Example: Weather Forecasting Data" color="#06b6d4">
      <p className="text-gray-700 mb-4">
        Imagine training a weather forecasting model. You need to transform IoT
        sensor data into hourly averages:
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 text-sm ${
              step === i
                ? "bg-cyan-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      <div className="bg-cyan-50 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{steps[step].icon}</span>
          <div>
            <h4 className="font-semibold text-cyan-800">{steps[step].name}</h4>
            <p className="text-sm text-cyan-600">{steps[step].input}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          {steps[step].visual === "json" && (
            <div>
              <div className="text-xs text-gray-500 mb-2">
                Raw IoT Data (JSON):
              </div>
              <pre className="text-xs bg-gray-900 text-cyan-400 rounded p-3 overflow-x-auto">
                {`[
  {"device": "sensor_01", "time": "10:00:15", "temp": 22.3},
  {"device": "sensor_01", "time": "10:01:15", "temp": 22.5},
  {"device": "sensor_01", "time": "10:02:15", "temp": 22.4},
  {"device": "sensor_02", "time": "10:00:20", "temp": 23.1},
  {"device": "sensor_02", "time": "10:01:20", "temp": 23.0},
  ...
]`}
              </pre>
              <div className="text-xs text-gray-500 mt-2">
                Semi-structured: readings every minute from multiple sensors
              </div>
            </div>
          )}

          {steps[step].visual === "rawtable" && (
            <div>
              <div className="text-xs text-gray-500 mb-2">
                Converted to Table:
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-cyan-100">
                    <th className="border p-2 text-left">Device</th>
                    <th className="border p-2 text-left">Timestamp</th>
                    <th className="border p-2 text-left">Temperature</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">sensor_01</td>
                    <td className="border p-2">10:00:15</td>
                    <td className="border p-2">22.3°C</td>
                  </tr>
                  <tr>
                    <td className="border p-2">sensor_01</td>
                    <td className="border p-2">10:01:15</td>
                    <td className="border p-2">22.5°C</td>
                  </tr>
                  <tr>
                    <td className="border p-2">sensor_01</td>
                    <td className="border p-2">10:02:15</td>
                    <td className="border p-2">22.4°C</td>
                  </tr>
                  <tr>
                    <td className="border p-2">sensor_02</td>
                    <td className="border p-2">10:00:20</td>
                    <td className="border p-2">23.1°C</td>
                  </tr>
                  <tr className="text-gray-400">
                    <td className="border p-2">...</td>
                    <td className="border p-2">...</td>
                    <td className="border p-2">...</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-xs text-gray-500 mt-2">
                Now in tabular format with clear columns
              </div>
            </div>
          )}

          {steps[step].visual === "aggtable" && (
            <div>
              <div className="text-xs text-gray-500 mb-2">
                Aggregated (Avg per Hour):
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border p-2 text-left">Device</th>
                    <th className="border p-2 text-left">Hour</th>
                    <th className="border p-2 text-left">Avg Temp</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">sensor_01</td>
                    <td className="border p-2">10:00</td>
                    <td className="border p-2 font-bold text-green-600">
                      22.4°C
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">sensor_01</td>
                    <td className="border p-2">11:00</td>
                    <td className="border p-2 font-bold text-green-600">
                      23.1°C
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">sensor_02</td>
                    <td className="border p-2">10:00</td>
                    <td className="border p-2 font-bold text-green-600">
                      23.0°C
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">sensor_02</td>
                    <td className="border p-2">11:00</td>
                    <td className="border p-2 font-bold text-green-600">
                      23.5°C
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-xs text-gray-500 mt-2">
                ✅ Ready for time-series forecasting model!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Process flow */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer transition-all ${
                step === i ? "ring-4 ring-cyan-300" : ""
              } ${step >= i ? "bg-cyan-500 text-white" : "bg-gray-200"}`}
              onClick={() => setStep(i)}
            >
              {s.icon}
            </div>
            {i < steps.length - 1 && (
              <svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                className={step > i ? "text-cyan-400" : "text-gray-300"}
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

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-3 gap-3 mb-4">
      {[
        {
          icon: "🔍",
          title: "Identify",
          key: "Source & format",
          color: "#3B82F6",
        },
        {
          icon: "📁",
          title: "Understand",
          key: "Structured vs unstructured",
          color: "#8B5CF6",
        },
        {
          icon: "🔄",
          title: "Transform",
          key: "ETL pipeline",
          color: "#22C55E",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-xl p-4 text-center text-white"
          style={{ backgroundColor: item.color }}
        >
          <span className="text-3xl">{item.icon}</span>
          <div className="font-bold mt-2">{item.title}</div>
          <div className="text-xs opacity-80">{item.key}</div>
        </div>
      ))}
    </div>

    <div className="bg-gray-100 rounded-xl p-4 mb-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Data preparation is often the most time-consuming part of ML projects.
        You need to identify where your data lives, understand its format, and
        design an ingestion pipeline to extract, transform, and load it into a
        serving layer. Azure provides tools like Synapse Analytics, Data
        Factory, and Databricks to build these pipelines. Remember:{" "}
        <strong>
          the quality of your data directly determines the quality of your model
        </strong>
        !
      </p>
    </div>

    <div className="flex items-center justify-center gap-2 flex-wrap">
      {[
        { icon: "🗄️", label: "Sources" },
        { icon: "📤", label: "Extract" },
        { icon: "🔄", label: "Transform" },
        { icon: "📥", label: "Load" },
        { icon: "💾", label: "Storage" },
        { icon: "🤖", label: "Train" },
      ].map((s, i) => (
        <React.Fragment key={i}>
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-lg">
              {s.icon}
            </div>
            <div className="text-xs text-gray-600 mt-1">{s.label}</div>
          </div>
          {i < 5 && (
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

export default function DataPreparationGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Get and Prepare Data
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Data Preparation for Machine Learning
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure ML Fundamentals
          </div>
        </div>

        <DataFoundationSection />
        <DataSourcesSection />
        <DataFormatsSection />
        <ETLPipelineSection />
        <DataIngestionArchSection />
        <WeatherExampleSection />
        <SummarySection />
      </div>
    </div>
  );
}
