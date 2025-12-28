import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const PipelineOverview = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      num: 1,
      title: "OCR Ingestion",
      icon: "📥",
      color: "#3B82F6",
      desc: "Receive OCR output with position data",
    },
    {
      num: 2,
      title: "Field Detection",
      icon: "🔍",
      color: "#8B5CF6",
      desc: "Identify candidate field values",
    },
    {
      num: 3,
      title: "Field Mapping",
      icon: "🔗",
      color: "#22C55E",
      desc: "Associate values with schema fields",
    },
    {
      num: 4,
      title: "Normalization",
      icon: "📐",
      color: "#F59E0B",
      desc: "Standardize formats and validate",
    },
    {
      num: 5,
      title: "Integration",
      icon: "🔌",
      color: "#EF4444",
      desc: "Connect to business systems",
    },
  ];

  return (
    <Section title="🗂️ The Field Extraction Pipeline" color="#1e293b">
      <p className="text-gray-700 mb-4">
        <strong>Field extraction</strong> transforms raw OCR text into
        structured business data by mapping values to specific, labeled fields.
        OCR tells you <em>what</em> text exists — field extraction tells you
        <em>what it means</em>.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {stages.map((stage, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => setActiveStage(i)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all min-w-20 ${
                  activeStage === i
                    ? "scale-110 ring-4 ring-opacity-50"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    activeStage === i ? stage.color : `${stage.color}20`,
                  ringColor: stage.color,
                }}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                    activeStage === i ? "bg-white text-gray-800" : "bg-white/50"
                  }`}
                >
                  {stage.num}
                </div>
                <span className="text-2xl">{stage.icon}</span>
                <span
                  className={`text-xs font-medium mt-1 text-center ${
                    activeStage === i ? "text-white" : "text-gray-700"
                  }`}
                >
                  {stage.title}
                </span>
              </button>
              {i < stages.length - 1 && (
                <svg
                  width="20"
                  height="24"
                  viewBox="0 0 20 24"
                  className="text-gray-400 flex-shrink-0"
                >
                  <path
                    d="M 2,12 L 14,12 M 10,8 L 14,12 L 10,16"
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

      <div
        className="rounded-xl p-4 border-2"
        style={{
          borderColor: stages[activeStage].color,
          backgroundColor: `${stages[activeStage].color}10`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: stages[activeStage].color }}
          >
            {stages[activeStage].num}
          </div>
          <div>
            <h3
              className="font-bold"
              style={{ color: stages[activeStage].color }}
            >
              {stages[activeStage].title}
            </h3>
            <p className="text-sm text-gray-600">{stages[activeStage].desc}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>💡 Key Insight:</strong> Position matters! The text "12345"
          could be an invoice number, customer ID, or phone number —{" "}
          <em>where</em> it appears in the document helps determine its meaning.
        </p>
      </div>
    </Section>
  );
};

const OCRIngestionSection = () => {
  const [showMetadata, setShowMetadata] = useState(false);

  const ocrOutput = [
    {
      text: "INVOICE",
      x: 50,
      y: 20,
      w: 100,
      h: 25,
      confidence: 0.99,
      type: "header",
    },
    {
      text: "#INV-2024-001",
      x: 160,
      y: 20,
      w: 120,
      h: 25,
      confidence: 0.97,
      type: "value",
    },
    {
      text: "Date:",
      x: 50,
      y: 60,
      w: 40,
      h: 18,
      confidence: 0.98,
      type: "label",
    },
    {
      text: "12/28/2024",
      x: 100,
      y: 60,
      w: 90,
      h: 18,
      confidence: 0.96,
      type: "value",
    },
    {
      text: "Vendor:",
      x: 50,
      y: 85,
      w: 55,
      h: 18,
      confidence: 0.99,
      type: "label",
    },
    {
      text: "Acme Corp",
      x: 115,
      y: 85,
      w: 80,
      h: 18,
      confidence: 0.95,
      type: "value",
    },
    {
      text: "Total:",
      x: 50,
      y: 120,
      w: 45,
      h: 18,
      confidence: 0.98,
      type: "label",
    },
    {
      text: "$1,234.56",
      x: 105,
      y: 120,
      w: 80,
      h: 18,
      confidence: 0.94,
      type: "value",
    },
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <Section title="📥 Stage 1: OCR Output Ingestion" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Field extraction starts with structured OCR output that includes{" "}
        <strong>text content</strong>,<strong>positions</strong>, and{" "}
        <strong>confidence scores</strong>.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Visual document */}
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">
                Document with OCR Output:
              </span>
              <button
                onClick={() => setShowMetadata(!showMetadata)}
                className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700"
              >
                {showMetadata ? "Hide Boxes" : "Show Bounding Boxes"}
              </button>
            </div>

            <div className="relative bg-white rounded-lg p-4 min-h-48 border">
              {ocrOutput.map((item, i) => (
                <div
                  key={i}
                  className={`absolute cursor-pointer transition-all ${
                    showMetadata ? "border-2 rounded px-1" : ""
                  } ${
                    item.type === "header"
                      ? "border-purple-400 bg-purple-50"
                      : item.type === "label"
                      ? "border-green-400 bg-green-50"
                      : "border-blue-400 bg-blue-50"
                  } ${selectedItem === i ? "ring-2 ring-yellow-400" : ""}`}
                  style={{
                    left: item.x,
                    top: item.y,
                    fontSize: item.type === "header" ? "16px" : "12px",
                    fontWeight: item.type === "header" ? "bold" : "normal",
                  }}
                  onClick={() => setSelectedItem(i)}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Metadata display */}
          <div>
            <div className="text-sm text-gray-500 mb-2">OCR Metadata:</div>
            {selectedItem !== null ? (
              <div className="bg-white rounded-lg p-4 border">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Selected: "{ocrOutput[selectedItem].text}"
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Position (x, y):</span>
                    <span className="font-mono">
                      ({ocrOutput[selectedItem].x}, {ocrOutput[selectedItem].y})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size (w × h):</span>
                    <span className="font-mono">
                      {ocrOutput[selectedItem].w} × {ocrOutput[selectedItem].h}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Confidence:</span>
                    <span
                      className={`font-mono ${
                        ocrOutput[selectedItem].confidence > 0.95
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {(ocrOutput[selectedItem].confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type:</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        ocrOutput[selectedItem].type === "header"
                          ? "bg-purple-100 text-purple-700"
                          : ocrOutput[selectedItem].type === "label"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {ocrOutput[selectedItem].type}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 border text-center text-gray-500">
                <span className="text-2xl">👆</span>
                <p className="text-sm mt-2">
                  Click any text element to see its metadata
                </p>
              </div>
            )}

            <div className="mt-3 grid grid-cols-2 gap-2">
              {[
                { icon: "📝", label: "Raw Text" },
                { icon: "📍", label: "Positions" },
                { icon: "📊", label: "Confidence" },
                { icon: "📐", label: "Layout" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded p-2 text-center border"
                >
                  <span>{item.icon}</span>
                  <div className="text-xs text-gray-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const FieldDetectionSection = () => {
  const [approach, setApproach] = useState("template");

  const approaches = {
    template: {
      name: "Template-Based",
      icon: "📋",
      color: "#3B82F6",
      desc: "Rule-based pattern matching with predefined layouts",
      pros: [
        "High accuracy for known formats",
        "Fast processing",
        "Explainable results",
      ],
      cons: [
        "Manual template creation required",
        "Struggles with layout variations",
      ],
      example: 'Search for "Invoice Number:" → value follows',
    },
    ml: {
      name: "Machine Learning",
      icon: "🧠",
      color: "#8B5CF6",
      desc: "Trained models that learn field patterns from examples",
      pros: [
        "Handles layout variations",
        "Improves over time",
        "Works across document types",
      ],
      cons: ["Requires labeled training data", "Less explainable"],
      example: "Transformer model predicts field types from context",
    },
    genai: {
      name: "Generative AI",
      icon: "✨",
      color: "#22C55E",
      desc: "LLMs extract fields based on schema definitions",
      pros: [
        "Few-shot learning",
        "Flexible schemas",
        "Natural language reasoning",
      ],
      cons: ["Higher latency", "May hallucinate", "Cost per API call"],
      example:
        'Prompt: "Extract invoice_number, date, total from this text..."',
    },
  };

  const current = approaches[approach];

  return (
    <Section title="🔍 Stage 2: Field Detection" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        This stage identifies potential field values in the OCR output. Three
        main approaches:
      </p>

      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {Object.entries(approaches).map(([key, a]) => (
          <button
            key={key}
            onClick={() => setApproach(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              approach === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: approach === key ? a.color : undefined,
            }}
          >
            {a.icon} {a.name}
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
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">{current.icon}</span>
          <div>
            <h3 className="font-bold" style={{ color: current.color }}>
              {current.name}
            </h3>
            <p className="text-sm text-gray-600">{current.desc}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-semibold text-green-700 text-sm mb-2">
              ✅ Advantages
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {current.pros.map((pro, i) => (
                <li key={i}>• {pro}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-semibold text-red-700 text-sm mb-2">
              ⚠️ Limitations
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {current.cons.map((con, i) => (
                <li key={i}>• {con}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <span className="text-sm text-gray-500">Example:</span>
          <div
            className="font-mono text-sm mt-1"
            style={{ color: current.color }}
          >
            {current.example}
          </div>
        </div>
      </div>

      {/* Visual comparison */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-3">
          Detection in Action:
        </h4>
        <div className="bg-white rounded-lg p-4 font-mono text-sm">
          <div className="mb-2">
            <span className="text-gray-500">Input text:</span> "Invoice Number:
            INV-2024-001"
          </div>
          <div className="border-t pt-2">
            <span className="text-gray-500">Detected:</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                Label: "Invoice Number"
              </span>
              <span>→</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                Value: "INV-2024-001"
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const FieldMappingSection = () => {
  const [showMapping, setShowMapping] = useState(false);
  const [activeTab, setActiveTab] = useState("keyvalue");

  const keyValuePairs = [
    {
      label: "Invoice Number:",
      value: "INV-2024-001",
      field: "invoice_id",
      confidence: 0.98,
    },
    {
      label: "Date:",
      value: "12/28/2024",
      field: "invoice_date",
      confidence: 0.96,
    },
    {
      label: "Vendor:",
      value: "Acme Corp",
      field: "vendor_name",
      confidence: 0.94,
    },
    {
      label: "Total:",
      value: "$1,234.56",
      field: "total_amount",
      confidence: 0.97,
    },
  ];

  const tableData = [
    { item: "Widget A", qty: "5", price: "$100.00" },
    { item: "Widget B", qty: "3", price: "$200.00" },
    { item: "Service Fee", qty: "1", price: "$34.56" },
  ];

  return (
    <Section title="🔗 Stage 3: Field Mapping & Association" color="#22c55e">
      <p className="text-gray-700 mb-4">
        After detection, values are mapped to specific schema fields using
        spatial analysis and linguistic patterns.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("keyvalue")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "keyvalue"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          🔑 Key-Value Pairing
        </button>
        <button
          onClick={() => setActiveTab("table")}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === "table"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          📊 Table Extraction
        </button>
      </div>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        {activeTab === "keyvalue" ? (
          <>
            <div className="flex justify-between mb-3">
              <h4 className="font-semibold text-green-800">
                Key-Value Pairing
              </h4>
              <button
                onClick={() => setShowMapping(!showMapping)}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm"
              >
                {showMapping ? "Hide Mapping" : "Show Schema Mapping"}
              </button>
            </div>

            <div className="space-y-2">
              {keyValuePairs.map((pair, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg p-3 flex items-center gap-3 flex-wrap"
                >
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium text-sm">
                    {pair.label}
                  </span>
                  <span className="text-gray-400">→</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                    {pair.value}
                  </span>

                  {showMapping && (
                    <>
                      <span className="text-green-500 text-xl">⟹</span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-mono text-sm">
                        {pair.field}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          pair.confidence > 0.95
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {(pair.confidence * 100).toFixed(0)}%
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                {
                  icon: "📏",
                  name: "Proximity Analysis",
                  desc: "Spatial clustering",
                },
                {
                  icon: "📖",
                  name: "Reading Order",
                  desc: "Natural text flow",
                },
                { icon: "🏷️", name: "NER", desc: "Named entity recognition" },
                {
                  icon: "🔗",
                  name: "Dependency Parsing",
                  desc: "Syntactic relationships",
                },
              ].map((tech, i) => (
                <div key={i} className="bg-white rounded-lg p-2 text-center">
                  <span className="text-xl">{tech.icon}</span>
                  <div className="font-medium text-xs text-green-800">
                    {tech.name}
                  </div>
                  <div className="text-xs text-gray-500">{tech.desc}</div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <h4 className="font-semibold text-green-800 mb-3">
              Table Extraction
            </h4>

            <div className="bg-white rounded-lg p-4 mb-3">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-green-300">
                    <th className="text-left py-2 px-3 bg-green-100 text-green-800">
                      Item
                    </th>
                    <th className="text-left py-2 px-3 bg-green-100 text-green-800">
                      Qty
                    </th>
                    <th className="text-left py-2 px-3 bg-green-100 text-green-800">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, i) => (
                    <tr key={i} className="border-b">
                      <td className="py-2 px-3">{row.item}</td>
                      <td className="py-2 px-3">{row.qty}</td>
                      <td className="py-2 px-3">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-500 mb-2">Extracted as:</div>
              <pre className="text-xs bg-gray-900 text-green-400 rounded p-3 overflow-x-auto">
                {`"line_items": [
  {"item": "Widget A", "qty": 5, "price": 100.00},
  {"item": "Widget B", "qty": 3, "price": 200.00},
  {"item": "Service Fee", "qty": 1, "price": 34.56}
]`}
              </pre>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {[
                { icon: "🔲", name: "CNN Table Detection" },
                { icon: "📊", name: "Cell Identification" },
                { icon: "🔗", name: "Row-Column Mapping" },
              ].map((tech, i) => (
                <div key={i} className="bg-white rounded-lg p-2 text-center">
                  <span className="text-xl">{tech.icon}</span>
                  <div className="text-xs text-green-800">{tech.name}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          🔍 Confidence & Validation
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-yellow-700">
          <div>• OCR confidence inheritance</div>
          <div>• Pattern matching scores</div>
          <div>• Context validation</div>
          <div>• Cross-field validation (totals match)</div>
        </div>
      </div>
    </Section>
  );
};

const NormalizationSection = () => {
  const [activeNorm, setActiveNorm] = useState("date");

  const normalizations = {
    date: {
      name: "Date Normalization",
      icon: "📅",
      examples: [
        {
          input: "12/28/2024",
          output: "2024-12-28",
          format: "MM/DD/YYYY → ISO",
        },
        {
          input: "28-12-2024",
          output: "2024-12-28",
          format: "DD-MM-YYYY → ISO",
        },
        { input: "Dec 28, 2024", output: "2024-12-28", format: "Text → ISO" },
      ],
    },
    currency: {
      name: "Currency Processing",
      icon: "💰",
      examples: [
        {
          input: "$1,234.56",
          output: "1234.56",
          format: "Remove symbol, separators",
        },
        {
          input: "€1.234,56",
          output: "1234.56",
          format: "European → Standard",
        },
        { input: "¥10,000", output: "10000", format: "Yen format" },
      ],
    },
    text: {
      name: "Text Standardization",
      icon: "📝",
      examples: [
        { input: "ACME CORP.", output: "Acme Corp", format: "Title case" },
        { input: "Inv #", output: "Invoice Number", format: "Expand abbrev." },
        { input: "N/A", output: "null", format: "Handle missing" },
      ],
    },
  };

  const current = normalizations[activeNorm];

  const validations = [
    { icon: "✓", name: "Format Check", desc: "Match expected patterns" },
    { icon: "📊", name: "Range Validation", desc: "Values within bounds" },
    { icon: "⚠️", name: "Outlier Detection", desc: "Flag unusual values" },
    { icon: "🔗", name: "Cross-Validation", desc: "Fields consistent" },
  ];

  return (
    <Section title="📐 Stage 4: Normalization & Validation" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Raw extracted values are transformed into consistent formats and
        validated for accuracy.
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {Object.entries(normalizations).map(([key, norm]) => (
          <button
            key={key}
            onClick={() => setActiveNorm(key)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeNorm === key
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {norm.icon} {norm.name}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-3">
          {current.icon} {current.name}
        </h4>

        <div className="space-y-2">
          {current.examples.map((ex, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-3 flex items-center gap-3 flex-wrap"
            >
              <div className="bg-red-100 text-red-700 px-3 py-1 rounded font-mono">
                {ex.input}
              </div>
              <svg
                width="30"
                height="20"
                viewBox="0 0 30 20"
                className="text-amber-500"
              >
                <path
                  d="M 5,10 L 20,10 M 16,6 L 20,10 L 16,14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div className="bg-green-100 text-green-700 px-3 py-1 rounded font-mono">
                {ex.output}
              </div>
              <span className="text-xs text-gray-500 ml-auto">{ex.format}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border">
        <h4 className="font-semibold text-gray-700 mb-3">
          ✅ Validation Techniques:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {validations.map((v, i) => (
            <div key={i} className="bg-amber-50 rounded-lg p-3 text-center">
              <span className="text-xl">{v.icon}</span>
              <div className="font-medium text-sm text-amber-800">{v.name}</div>
              <div className="text-xs text-gray-500">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const IntegrationSection = () => {
  const [selectedOutput, setSelectedOutput] = useState("database");

  const extractedData = {
    invoice_id: "INV-2024-001",
    invoice_date: "2024-12-28",
    vendor_name: "Acme Corp",
    total_amount: 1234.56,
    confidence: 0.96,
  };

  const outputs = {
    database: {
      name: "Database",
      icon: "🗄️",
      code: `INSERT INTO invoices (
  invoice_id, invoice_date, 
  vendor_name, total_amount
) VALUES (
  'INV-2024-001', '2024-12-28',
  'Acme Corp', 1234.56
);`,
    },
    api: {
      name: "REST API",
      icon: "🔌",
      code: `POST /api/invoices
Content-Type: application/json

{
  "invoice_id": "INV-2024-001",
  "invoice_date": "2024-12-28",
  "vendor_name": "Acme Corp",
  "total_amount": 1234.56
}`,
    },
    queue: {
      name: "Message Queue",
      icon: "📨",
      code: `{
  "messageType": "InvoiceProcessed",
  "payload": {
    "invoice_id": "INV-2024-001",
    "invoice_date": "2024-12-28",
    "vendor_name": "Acme Corp",
    "total_amount": 1234.56
  },
  "metadata": {
    "confidence": 0.96,
    "processed_at": "2024-12-28T10:30:00Z"
  }
}`,
    },
  };

  return (
    <Section title="🔌 Stage 5: Integration" color="#ef4444">
      <p className="text-gray-700 mb-4">
        The final stage connects extracted data to business systems through
        schema mapping and quality reporting.
      </p>

      <div className="bg-red-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Extracted data */}
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Extracted Data:</h4>
            <div className="bg-white rounded-lg p-3 space-y-2">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600 font-mono">{key}:</span>
                  <span
                    className={`font-medium ${
                      key === "confidence" ? "text-green-600" : "text-gray-800"
                    }`}
                  >
                    {typeof value === "number" && key !== "confidence"
                      ? `$${value.toFixed(2)}`
                      : key === "confidence"
                      ? `${(value * 100).toFixed(0)}%`
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Output format selection */}
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Output Format:</h4>
            <div className="flex gap-2 mb-3">
              {Object.entries(outputs).map(([key, output]) => (
                <button
                  key={key}
                  onClick={() => setSelectedOutput(key)}
                  className={`px-3 py-1 rounded text-sm ${
                    selectedOutput === key
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-600"
                  }`}
                >
                  {output.icon} {output.name}
                </button>
              ))}
            </div>

            <pre className="bg-gray-900 text-green-400 rounded-lg p-3 text-xs overflow-x-auto h-40">
              {outputs[selectedOutput].code}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-700 mb-2">
            🔄 Schema Mapping
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Field renaming to target conventions</li>
            <li>• Data type conversion</li>
            <li>• Conditional transformation rules</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-700 mb-2">
            📊 Quality Metrics
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Field-level confidence scores</li>
            <li>• Document-level assessment</li>
            <li>• Error categorization</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

const FullPipelineDemo = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const stages = [
    {
      icon: "📥",
      name: "Ingest OCR",
      output: '"Invoice Number: INV-001" at [50,20]',
    },
    {
      icon: "🔍",
      name: "Detect Fields",
      output: 'Label: "Invoice Number" → Value: "INV-001"',
    },
    {
      icon: "🔗",
      name: "Map to Schema",
      output: 'invoice_id = "INV-001" (98% confidence)',
    },
    {
      icon: "📐",
      name: "Normalize",
      output: 'invoice_id: "INV-001" ✓ valid format',
    },
    {
      icon: "🔌",
      name: "Integrate",
      output: '{"invoice_id": "INV-001"} → API',
    },
  ];

  useEffect(() => {
    let interval;
    if (isRunning && step < stages.length - 1) {
      interval = setInterval(() => {
        setStep((s) => s + 1);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isRunning, step, stages.length]);

  return (
    <Section title="🔄 Full Pipeline Demo" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Watch the complete field extraction pipeline process an invoice field:
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsRunning(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          ▶️ Run Pipeline
        </button>
        <button
          onClick={() => {
            setStep(0);
            setIsRunning(false);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-indigo-50 rounded-xl p-4">
        {/* Progress */}
        <div className="flex justify-between mb-4">
          {stages.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center transition-all ${
                i <= step ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  i === step
                    ? "bg-indigo-600 ring-4 ring-indigo-300"
                    : i < step
                    ? "bg-indigo-400"
                    : "bg-gray-300"
                }`}
              >
                {s.icon}
              </div>
              <div className="text-xs mt-1 font-medium text-gray-700 text-center max-w-16">
                {s.name}
              </div>
            </div>
          ))}
        </div>

        {/* Current output */}
        <div className="bg-white rounded-lg p-4">
          <div className="text-center mb-2">
            <span className="text-xl">{stages[step].icon}</span>
            <span className="ml-2 font-semibold text-indigo-800">
              {stages[step].name}
            </span>
          </div>
          <div className="bg-gray-100 rounded-lg p-3 font-mono text-sm text-center">
            {stages[step].output}
          </div>

          {step === stages.length - 1 && (
            <div className="mt-3 text-center">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-sm">
                ✅ Field successfully extracted and integrated!
              </span>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-3 gap-3 mb-4">
      {[
        {
          stage: "1. Ingest",
          icon: "📥",
          color: "#3B82F6",
          key: "OCR + positions",
        },
        {
          stage: "2. Detect",
          icon: "🔍",
          color: "#8B5CF6",
          key: "Template/ML/GenAI",
        },
        {
          stage: "3. Map",
          icon: "🔗",
          color: "#22C55E",
          key: "Schema association",
        },
        {
          stage: "4. Normalize",
          icon: "📐",
          color: "#F59E0B",
          key: "Format & validate",
        },
        {
          stage: "5. Integrate",
          icon: "🔌",
          color: "#EF4444",
          key: "Business systems",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-lg p-3 text-center text-white"
          style={{ backgroundColor: item.color }}
        >
          <span className="text-2xl">{item.icon}</span>
          <div className="font-bold text-sm">{item.stage}</div>
          <div className="text-xs opacity-80">{item.key}</div>
        </div>
      ))}
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Field extraction bridges the gap between raw OCR output and business
        systems. It's the technology behind Azure AI Document Intelligence's
        prebuilt models (invoices, receipts, IDs) and custom models.
        Understanding this pipeline helps you choose the right approach
        (template vs ML vs GenAI) for different document types and accuracy
        requirements!
      </p>
    </div>
  </Section>
);

export default function FieldExtractionGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🗂️ Field Extraction & Mapping
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Turning OCR into Structured Business Data
          </p>
        </div>

        <PipelineOverview />
        <OCRIngestionSection />
        <FieldDetectionSection />
        <FieldMappingSection />
        <NormalizationSection />
        <IntegrationSection />
        <FullPipelineDemo />
        <SummarySection />
      </div>
    </div>
  );
}
