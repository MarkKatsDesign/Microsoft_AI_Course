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
  const [activeModality, setActiveModality] = useState("documents");

  const modalities = {
    documents: {
      icon: "📄",
      name: "Documents & Forms",
      color: "#3B82F6",
      desc: "Extract structured fields from invoices, receipts, contracts, and forms",
      examples: ["Invoices", "Receipts", "Contracts", "ID Cards"],
    },
    audio: {
      icon: "🎙️",
      name: "Audio",
      color: "#8B5CF6",
      desc: "Transcribe and extract insights from voice recordings and calls",
      examples: ["Voicemail", "Call recordings", "Meetings", "Podcasts"],
    },
    images: {
      icon: "🖼️",
      name: "Images",
      color: "#22C55E",
      desc: "Analyze photos to extract structured information based on schemas",
      examples: ["Conference photos", "Product images", "Scene analysis"],
    },
    video: {
      icon: "🎬",
      name: "Video",
      color: "#F59E0B",
      desc: "Extract time-based insights, transcripts, and summaries from video",
      examples: ["Meeting recordings", "Training videos", "Surveillance"],
    },
  };

  const current = modalities[activeModality];

  return (
    <Section title="🌐 Azure Content Understanding Overview" color="#0078D4">
      <p className="text-gray-700 mb-4">
        <strong>Azure Content Understanding</strong> uses state-of-the-art AI
        models to analyze content in multiple formats and extract structured
        information based on custom schemas.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          {Object.entries(modalities).map(([key, mod]) => (
            <button
              key={key}
              onClick={() => setActiveModality(key)}
              className={`px-4 py-3 rounded-xl font-medium transition-all flex flex-col items-center min-w-24 ${
                activeModality === key
                  ? "text-white scale-105 ring-4 ring-opacity-50"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
              style={{
                backgroundColor: activeModality === key ? mod.color : undefined,
                ringColor: mod.color,
              }}
            >
              <span className="text-3xl mb-1">{mod.icon}</span>
              <span className="text-xs">{mod.name}</span>
            </button>
          ))}
        </div>

        <div
          className="rounded-xl p-4 border-2"
          style={{ borderColor: current.color, backgroundColor: "white" }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{current.icon}</span>
            <div>
              <h3 className="font-bold" style={{ color: current.color }}>
                {current.name}
              </h3>
              <p className="text-sm text-gray-600">{current.desc}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
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
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h4 className="font-bold">Schema-Based Extraction</h4>
            <p className="text-sm opacity-90">
              Define what you want to extract, and AI finds it — even when
              labeled differently or not labeled at all!
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const DocumentAnalysisSection = () => {
  const [showExtraction, setShowExtraction] = useState(false);
  const [selectedField, setSelectedField] = useState(null);

  const schema = [
    { field: "vendor_name", label: "Vendor Name", type: "string" },
    { field: "invoice_number", label: "Invoice Number", type: "string" },
    { field: "invoice_date", label: "Invoice Date", type: "date" },
    { field: "customer_name", label: "Customer Name", type: "string" },
    { field: "items", label: "Line Items", type: "array" },
    { field: "subtotal", label: "Subtotal", type: "currency" },
    { field: "tax", label: "Tax", type: "currency" },
    { field: "total", label: "Invoice Total", type: "currency" },
  ];

  const extractedData = {
    vendor_name: {
      value: "Adventure Works Cycles",
      confidence: 0.98,
      position: { x: 20, y: 15 },
    },
    invoice_number: {
      value: "1234",
      confidence: 0.99,
      position: { x: 280, y: 15 },
    },
    invoice_date: {
      value: "03/07/2025",
      confidence: 0.97,
      position: { x: 280, y: 35 },
    },
    customer_name: {
      value: "John Smith",
      confidence: 0.96,
      position: { x: 20, y: 70 },
    },
    items: {
      value: [
        { desc: '38" Racing Bike (Red)', qty: 1, price: 1299.0 },
        { desc: "Cycling helmet (Black)", qty: 1, price: 25.99 },
        { desc: "Cycling shirt (L)", qty: 2, price: 85.0 },
      ],
      confidence: 0.94,
      position: { x: 20, y: 110 },
    },
    subtotal: {
      value: "$1,409.99",
      confidence: 0.98,
      position: { x: 250, y: 200 },
    },
    tax: { value: "$140.99", confidence: 0.97, position: { x: 250, y: 220 } },
    total: {
      value: "$1,585.98",
      confidence: 0.99,
      position: { x: 250, y: 250 },
    },
  };

  return (
    <Section title="📄 Analyzing Documents & Forms" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Azure Content Understanding goes beyond OCR to provide{" "}
        <strong>schema-based field extraction</strong>. Define the fields you
        need, and it finds them automatically!
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Schema definition */}
        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-3">
            📋 Define Your Schema:
          </h4>
          <div className="bg-white rounded-lg p-3 space-y-2">
            {schema.map((field, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-2 rounded cursor-pointer transition-all ${
                  selectedField === field.field
                    ? "bg-blue-100 ring-2 ring-blue-400"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedField(field.field)}
              >
                <span className="text-sm font-medium text-gray-700">
                  {field.label}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    field.type === "string"
                      ? "bg-gray-100 text-gray-600"
                      : field.type === "date"
                      ? "bg-purple-100 text-purple-600"
                      : field.type === "currency"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {field.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice visualization */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex justify-between mb-3">
            <h4 className="font-semibold text-gray-700">
              🧾 Invoice Document:
            </h4>
            <button
              onClick={() => setShowExtraction(!showExtraction)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              {showExtraction ? "Hide Fields" : "Extract Fields"}
            </button>
          </div>

          <div className="relative bg-white rounded-lg p-4 border min-h-72 text-sm">
            {/* Invoice header */}
            <div className="flex justify-between mb-4">
              <div
                className={`${
                  showExtraction && selectedField === "vendor_name"
                    ? "ring-2 ring-blue-400 rounded px-1"
                    : ""
                }`}
              >
                <div className="font-bold text-lg">Adventure Works Cycles</div>
                <div className="text-gray-500 text-xs">
                  123 Bike Lane, Cycleville
                </div>
              </div>
              <div className="text-right">
                <div
                  className={`font-bold ${
                    showExtraction && selectedField === "invoice_number"
                      ? "ring-2 ring-blue-400 rounded px-1"
                      : ""
                  }`}
                >
                  INVOICE #1234
                </div>
                <div
                  className={`text-gray-600 ${
                    showExtraction && selectedField === "invoice_date"
                      ? "ring-2 ring-blue-400 rounded px-1"
                      : ""
                  }`}
                >
                  Date: 03/07/2025
                </div>
              </div>
            </div>

            {/* Customer */}
            <div
              className={`mb-4 ${
                showExtraction && selectedField === "customer_name"
                  ? "ring-2 ring-blue-400 rounded px-1 inline-block"
                  : ""
              }`}
            >
              <div className="text-gray-500 text-xs">Bill To:</div>
              <div className="font-medium">John Smith</div>
              <div className="text-gray-600 text-xs">
                123 River Street, Marshtown
              </div>
            </div>

            {/* Line items */}
            <div
              className={`mb-4 ${
                showExtraction && selectedField === "items"
                  ? "ring-2 ring-blue-400 rounded p-1"
                  : ""
              }`}
            >
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-1">Item</th>
                    <th className="text-right py-1">Qty</th>
                    <th className="text-right py-1">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-1">38" Racing Bike (Red)</td>
                    <td className="text-right">1</td>
                    <td className="text-right">$1,299.00</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1">Cycling helmet (Black)</td>
                    <td className="text-right">1</td>
                    <td className="text-right">$25.99</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1">Cycling shirt (L)</td>
                    <td className="text-right">2</td>
                    <td className="text-right">$85.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="text-right space-y-1">
              <div
                className={`${
                  showExtraction && selectedField === "subtotal"
                    ? "ring-2 ring-blue-400 rounded px-1 inline-block"
                    : ""
                }`}
              >
                Subtotal: $1,409.99
              </div>
              <div
                className={`${
                  showExtraction && selectedField === "tax"
                    ? "ring-2 ring-blue-400 rounded px-1 inline-block"
                    : ""
                }`}
              >
                Tax: $140.99
              </div>
              <div
                className={`font-bold ${
                  showExtraction && selectedField === "total"
                    ? "ring-2 ring-blue-400 rounded px-1 inline-block"
                    : ""
                }`}
              >
                Total: $1,585.98
              </div>
            </div>

            {/* Extraction overlay */}
            {showExtraction &&
              selectedField &&
              extractedData[selectedField] && (
                <div className="absolute bottom-2 left-2 right-2 bg-green-100 rounded-lg p-2 border border-green-300">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-green-800">
                      {schema.find((s) => s.field === selectedField)?.label}:
                    </span>
                    <span className="text-green-600 text-xs">
                      {(extractedData[selectedField].confidence * 100).toFixed(
                        0
                      )}
                      % confidence
                    </span>
                  </div>
                  <div className="text-sm text-green-700 font-mono">
                    {typeof extractedData[selectedField].value === "object"
                      ? `${extractedData[selectedField].value.length} items extracted`
                      : extractedData[selectedField].value}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Key Feature:</strong> The AI identifies fields even when
          they're labeled differently (e.g., "Invoice Total" vs "Amount Due" vs
          "Balance") or not labeled at all!
        </p>
      </div>
    </Section>
  );
};

const AudioAnalysisSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const transcript = [
    { time: 0, text: "Hi, this is Ava from Contoso." },
    { time: 15, text: "Just calling to follow up on our meeting last week." },
    {
      time: 35,
      text: "I wanted to let you know that I've run the numbers and I think we can meet your price expectations.",
    },
    {
      time: 60,
      text: "Please call me back on 555-12345 or send me an e-mail at Ava@contoso.com and we'll discuss next steps.",
    },
    { time: 85, text: "Thanks, bye!" },
  ];

  const schema = [
    { field: "caller", icon: "👤" },
    { field: "message_summary", icon: "📝" },
    { field: "requested_actions", icon: "✅" },
    { field: "callback_number", icon: "📞" },
    { field: "alt_contact", icon: "📧" },
  ];

  const results = {
    caller: "Ava from Contoso",
    message_summary:
      "Ava from Contoso called to follow up on a meeting and mentioned that they can meet the price expectations.",
    requested_actions: "Call back or send an email to discuss next steps.",
    callback_number: "555-12345",
    alt_contact: "Ava@contoso.com",
  };

  useEffect(() => {
    let interval;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            setShowResults(true);
            return 100;
          }
          return p + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  const currentTime = (progress / 100) * 90; // 90 seconds total

  return (
    <Section title="🎙️ Analyzing Audio" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Azure Content Understanding can analyze audio files to provide
        transcriptions, summaries, and schema-based extraction of key insights.
      </p>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-purple-800 mb-3">
          📞 Voicemail Analysis Example:
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Audio player simulation */}
          <div>
            <div className="bg-white rounded-lg p-4 mb-3">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => {
                    if (progress >= 100) {
                      setProgress(0);
                      setShowResults(false);
                    }
                    setIsPlaying(!isPlaying);
                  }}
                  className="w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center hover:bg-purple-700"
                >
                  {isPlaying ? "⏸️" : "▶️"}
                </button>
                <div className="flex-1">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-purple-600 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.floor(currentTime / 60)}:
                    {String(Math.floor(currentTime % 60)).padStart(2, "0")} /
                    1:30
                  </div>
                </div>
              </div>

              {/* Waveform visualization */}
              <div className="flex items-center justify-center gap-1 h-12">
                {Array(30)
                  .fill(0)
                  .map((_, i) => {
                    const isActive = (i / 30) * 100 <= progress;
                    const height =
                      10 + Math.sin(i * 0.5) * 8 + Math.sin(i * 1.3) * 4;
                    return (
                      <div
                        key={i}
                        className={`w-1 rounded-full transition-all ${
                          isActive ? "bg-purple-500" : "bg-gray-300"
                        }`}
                        style={{ height: `${height}px` }}
                      />
                    );
                  })}
              </div>
            </div>

            {/* Live transcript */}
            <div className="bg-white rounded-lg p-3 max-h-40 overflow-y-auto">
              <div className="text-xs text-gray-500 mb-2">Transcript:</div>
              {transcript.map((line, i) => (
                <div
                  key={i}
                  className={`text-sm mb-1 transition-all ${
                    currentTime >= line.time ? "text-gray-800" : "text-gray-300"
                  }`}
                >
                  <span className="text-xs text-purple-500 mr-2">
                    {Math.floor(line.time / 60)}:
                    {String(line.time % 60).padStart(2, "0")}
                  </span>
                  {line.text}
                </div>
              ))}
            </div>
          </div>

          {/* Schema & Results */}
          <div>
            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-500 mb-2">
                Extraction Schema:
              </div>
              <div className="flex flex-wrap gap-2">
                {schema.map((s, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                  >
                    {s.icon} {s.field.replace("_", " ")}
                  </span>
                ))}
              </div>
            </div>

            {showResults && (
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="text-xs text-green-700 mb-2 font-semibold">
                  ✅ Extracted Results:
                </div>
                <div className="space-y-2 text-sm">
                  {Object.entries(results).map(([key, value], i) => (
                    <div key={i}>
                      <span className="text-gray-500">
                        {schema[i]?.icon} {key.replace("_", " ")}:
                      </span>
                      <div className="text-green-800 font-medium">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!showResults && progress === 0 && (
              <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
                <span className="text-2xl">🎧</span>
                <p className="text-sm mt-2">
                  Press play to analyze the voicemail
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

const ImageAnalysisSection = () => {
  const [analyzed, setAnalyzed] = useState(false);

  const schema = [
    { field: "location", icon: "📍", value: "Conference room" },
    { field: "in_person_attendees", icon: "🧑‍💼", value: "1" },
    { field: "remote_attendees", icon: "💻", value: "3" },
    { field: "total_attendees", icon: "👥", value: "4" },
  ];

  return (
    <Section title="🖼️ Analyzing Images" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Azure Content Understanding can analyze images to extract structured
        information based on custom schemas — perfect for conference photos,
        scene analysis, and more.
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-green-800 mb-3">
          📹 Conference Room Analysis Example:
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Image visualization */}
          <div className="relative">
            <div className="bg-gray-800 rounded-lg p-4 aspect-video flex items-center justify-center relative overflow-hidden">
              {/* Conference room simulation */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900" />

              {/* Remote attendees on screen */}
              <div className="relative z-10 grid grid-cols-3 gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-16 h-12 bg-blue-400 rounded flex items-center justify-center text-2xl transition-all ${
                      analyzed ? "ring-2 ring-yellow-400" : ""
                    }`}
                  >
                    👤
                  </div>
                ))}
              </div>

              {/* In-person attendee */}
              <div
                className={`absolute bottom-4 left-8 text-4xl transition-all ${
                  analyzed ? "ring-2 ring-green-400 rounded-full p-1" : ""
                }`}
              >
                🧑‍💼
              </div>

              {/* Labels when analyzed */}
              {analyzed && (
                <>
                  <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                    3 Remote
                  </div>
                  <div className="absolute bottom-2 left-2 bg-green-400 text-green-900 px-2 py-1 rounded text-xs font-bold">
                    1 In-Person
                  </div>
                  <div className="absolute top-2 left-2 bg-blue-400 text-blue-900 px-2 py-1 rounded text-xs font-bold">
                    📍 Conference Room
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setAnalyzed(!analyzed)}
              className="w-full mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {analyzed ? "🔄 Reset" : "🔍 Analyze Image"}
            </button>
          </div>

          {/* Schema & Results */}
          <div>
            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-500 mb-2">
                Extraction Schema:
              </div>
              <div className="space-y-2">
                {schema.map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-sm text-gray-700">
                      {s.field.replace(/_/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {analyzed && (
              <div className="bg-green-100 rounded-lg p-3 border border-green-300">
                <div className="text-xs text-green-700 mb-2 font-semibold">
                  ✅ Extracted Results:
                </div>
                <div className="space-y-2">
                  {schema.map((s, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-white rounded p-2"
                    >
                      <span className="text-sm text-gray-600">
                        {s.icon} {s.field.replace(/_/g, " ")}
                      </span>
                      <span className="font-bold text-green-700">
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

const VideoAnalysisSection = () => {
  const [timeIndex, setTimeIndex] = useState(0);

  const timelineData = [
    { time: "0:00", attendees: 2, speaker: "Alice", topic: "Introduction" },
    { time: "5:00", attendees: 4, speaker: "Bob", topic: "Q3 Review" },
    {
      time: "15:00",
      attendees: 4,
      speaker: "Carol",
      topic: "Budget Discussion",
    },
    { time: "25:00", attendees: 3, speaker: "Alice", topic: "Action Items" },
    { time: "30:00", attendees: 2, speaker: "Bob", topic: "Wrap-up" },
  ];

  const current = timelineData[timeIndex];

  const videoSchema = [
    { field: "meeting_summary", icon: "📝" },
    { field: "attendance_over_time", icon: "📊" },
    { field: "speaker_breakdown", icon: "🎤" },
    { field: "topics_discussed", icon: "💬" },
    { field: "action_items", icon: "✅" },
  ];

  return (
    <Section title="🎬 Analyzing Video" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Video analysis extends image analysis with{" "}
        <strong>time-based insights</strong> — track changes over the duration,
        extract transcripts, and summarize discussions.
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-3">
          📹 Meeting Recording Analysis:
        </h4>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Video timeline */}
          <div>
            <div className="bg-gray-800 rounded-lg p-4 mb-3">
              {/* Video frame simulation */}
              <div className="aspect-video bg-gray-700 rounded flex items-center justify-center relative">
                <div className="grid grid-cols-2 gap-4">
                  {Array(current.attendees)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-lg flex items-center justify-center text-2xl ${
                          i === 0
                            ? "bg-amber-400 ring-2 ring-white"
                            : "bg-blue-400"
                        }`}
                      >
                        👤
                      </div>
                    ))}
                </div>

                {/* Current info overlay */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  🎤 {current.speaker} | 💬 {current.topic}
                </div>
                <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded text-xs">
                  {current.time}
                </div>
              </div>
            </div>

            {/* Timeline scrubber */}
            <div className="bg-white rounded-lg p-3">
              <div className="text-xs text-gray-500 mb-2">Timeline:</div>
              <div className="flex justify-between">
                {timelineData.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setTimeIndex(i)}
                    className={`flex flex-col items-center p-2 rounded transition-all ${
                      timeIndex === i
                        ? "bg-amber-100 ring-2 ring-amber-400"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-xs font-mono">{t.time}</span>
                    <span className="text-lg">👥</span>
                    <span className="text-xs text-gray-500">{t.attendees}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Schema & extracted insights */}
          <div>
            <div className="bg-white rounded-lg p-3 mb-3">
              <div className="text-xs text-gray-500 mb-2">
                Video Analysis Schema:
              </div>
              <div className="flex flex-wrap gap-2">
                {videoSchema.map((s, i) => (
                  <span
                    key={i}
                    className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs"
                  >
                    {s.icon} {s.field.replace(/_/g, " ")}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-amber-100 rounded-lg p-3 border border-amber-300">
              <div className="text-xs text-amber-700 mb-2 font-semibold">
                📊 Time-Based Insights:
              </div>
              <div className="space-y-2 text-sm">
                <div className="bg-white rounded p-2">
                  <span className="text-gray-500">📊 Attendance:</span>
                  <div className="flex items-center gap-1 mt-1">
                    {timelineData.map((t, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-amber-200 rounded-t"
                        style={{ height: `${t.attendees * 10}px` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-500">🎤 Speakers:</span>
                  <div className="text-amber-800">
                    Alice (40%), Bob (35%), Carol (25%)
                  </div>
                </div>
                <div className="bg-white rounded p-2">
                  <span className="text-gray-500">✅ Action Items:</span>
                  <div className="text-amber-800">3 items assigned</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const SchemaFlexibilitySection = () => {
  const [activeExample, setActiveExample] = useState("invoice");

  const examples = {
    invoice: {
      name: "Invoice Processing",
      icon: "🧾",
      modality: "Document",
      schema: ["vendor_name", "invoice_date", "line_items", "total"],
      variations: ["Invoice Total", "Amount Due", "Balance", "Grand Total"],
    },
    voicemail: {
      name: "Voicemail Triage",
      icon: "📞",
      modality: "Audio",
      schema: ["caller", "urgency", "callback_number", "summary"],
      variations: ["Different accents", "Background noise", "Varying formats"],
    },
    meeting: {
      name: "Meeting Analysis",
      icon: "🎬",
      modality: "Video",
      schema: ["attendees", "topics", "action_items", "next_steps"],
      variations: [
        "Different camera angles",
        "Multiple speakers",
        "Screen shares",
      ],
    },
  };

  const current = examples[activeExample];

  return (
    <Section title="🎯 Schema Flexibility" color="#6366f1">
      <p className="text-gray-700 mb-4">
        The power of Azure Content Understanding is its ability to apply{" "}
        <strong>custom schemas</strong>
        across different content types and handle variations automatically.
      </p>

      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {Object.entries(examples).map(([key, ex]) => (
          <button
            key={key}
            onClick={() => setActiveExample(key)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              activeExample === key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {ex.icon} {ex.name}
          </button>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl p-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <div className="text-2xl mb-2">{current.icon}</div>
            <h4 className="font-semibold text-indigo-800">{current.name}</h4>
            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
              {current.modality}
            </span>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-2">📋 Schema Fields:</div>
            <div className="space-y-1">
              {current.schema.map((field, i) => (
                <div
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm"
                >
                  {field.replace(/_/g, " ")}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-2">
              🔄 Handles Variations:
            </div>
            <div className="space-y-1">
              {current.variations.map((v, i) => (
                <div key={i} className="text-sm text-gray-600">
                  • {v}
                </div>
              ))}
            </div>
          </div>
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
          icon: "📄",
          name: "Documents",
          color: "#3B82F6",
          key: "Schema-based field extraction",
        },
        {
          icon: "🎙️",
          name: "Audio",
          color: "#8B5CF6",
          key: "Transcription + insights",
        },
        {
          icon: "🖼️",
          name: "Images",
          color: "#22C55E",
          key: "Scene understanding",
        },
        {
          icon: "🎬",
          name: "Video",
          color: "#F59E0B",
          key: "Time-based analysis",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="rounded-lg p-3 text-center text-white"
          style={{ backgroundColor: item.color }}
        >
          <span className="text-2xl">{item.icon}</span>
          <div className="font-bold text-sm">{item.name}</div>
          <div className="text-xs opacity-80">{item.key}</div>
        </div>
      ))}
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Azure Content Understanding is a unified multimodal AI service that
        applies custom schemas to extract structured data from documents, audio,
        images, and video. It goes beyond simple OCR or transcription to provide
        intelligent field extraction that handles variations in format,
        labeling, and presentation. This is the technology behind intelligent
        document processing, call center analytics, meeting summarization, and
        many other business automation scenarios you'll help customers
        implement!
      </p>
    </div>
  </Section>
);

export default function AzureContentUnderstandingGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌐 Azure Content Understanding
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Multimodal AI Content Analysis
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure AI Service
          </div>
        </div>

        <OverviewSection />
        <DocumentAnalysisSection />
        <AudioAnalysisSection />
        <ImageAnalysisSection />
        <VideoAnalysisSection />
        <SchemaFlexibilitySection />
        <SummarySection />
      </div>
    </div>
  );
}
