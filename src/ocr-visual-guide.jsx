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
      title: "Image Input",
      icon: "📷",
      color: "#3B82F6",
      desc: "Acquire image containing text",
    },
    {
      num: 2,
      title: "Preprocessing",
      icon: "🔧",
      color: "#8B5CF6",
      desc: "Enhance and clean the image",
    },
    {
      num: 3,
      title: "Text Detection",
      icon: "🔍",
      color: "#22C55E",
      desc: "Find regions containing text",
    },
    {
      num: 4,
      title: "Recognition",
      icon: "🔤",
      color: "#F59E0B",
      desc: "Identify individual characters",
    },
    {
      num: 5,
      title: "Output",
      icon: "📄",
      color: "#EF4444",
      desc: "Generate structured text data",
    },
  ];

  return (
    <Section title="🔄 The OCR Pipeline" color="#1e293b">
      <p className="text-gray-700 mb-4">
        <strong>Optical Character Recognition (OCR)</strong> converts visual
        text in images into editable, searchable text data through a 5-stage
        pipeline.
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
                  boxShadow:
                    activeStage === i ? `0 0 0 4px ${stage.color}40` : "none",
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

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { icon: "🧾", label: "Invoices & Receipts" },
          { icon: "📱", label: "Photos of Documents" },
          { icon: "📑", label: "PDF Files" },
          { icon: "✍️", label: "Handwritten Notes" },
        ].map((item, i) => (
          <div key={i} className="bg-blue-50 rounded-lg p-2 text-center">
            <span className="text-xl">{item.icon}</span>
            <div className="text-xs text-blue-700">{item.label}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const ImageInputSection = () => {
  const [selectedSource, setSelectedSource] = useState("photo");

  const sources = {
    photo: {
      icon: "📸",
      name: "Smartphone Photo",
      quality: "Variable",
      example: "Document photo",
    },
    scan: {
      icon: "🖨️",
      name: "Scanned Document",
      quality: "High",
      example: "Flatbed scanner",
    },
    video: {
      icon: "🎥",
      name: "Video Frame",
      quality: "Low-Medium",
      example: "Security camera",
    },
    pdf: {
      icon: "📄",
      name: "PDF Render",
      quality: "High",
      example: "Digital document",
    },
  };

  const current = sources[selectedSource];

  return (
    <Section title="📷 Stage 1: Image Acquisition & Input" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        The pipeline begins when an image containing text enters the system.
        <strong> Image quality significantly impacts accuracy!</strong>
      </p>

      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.entries(sources).map(([key, source]) => (
          <button
            key={key}
            onClick={() => setSelectedSource(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedSource === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {source.icon} {source.name}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-6xl mb-2">{current.icon}</div>
            <h4 className="font-semibold text-blue-800">{current.name}</h4>
            <p className="text-sm text-gray-600">{current.example}</p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-white rounded-lg p-3 mb-2">
              <span className="text-sm text-gray-500">Quality Level:</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      current.quality === "High"
                        ? "bg-green-500 w-full"
                        : current.quality === "Variable"
                        ? "bg-yellow-500 w-2/3"
                        : "bg-orange-500 w-1/2"
                    }`}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    current.quality === "High"
                      ? "text-green-600"
                      : current.quality === "Variable"
                      ? "text-yellow-600"
                      : "text-orange-600"
                  }`}
                >
                  {current.quality}
                </span>
              </div>
            </div>

            <div className="bg-yellow-100 rounded-lg p-3 text-sm text-yellow-800">
              💡 Higher quality input = better OCR accuracy
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const PreprocessingSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showBefore, setShowBefore] = useState(true);

  // Generate stable random positions for noise dots (only runs once on mount)
  const [noiseDots] = useState(() =>
    Array(15)
      .fill(0)
      .map(() => ({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      }))
  );

  const steps = [
    {
      name: "Noise Reduction",
      icon: "🧹",
      before: "Dust spots, artifacts, scanning imperfections",
      after: "Clean, clear image",
      techniques: [
        "Gaussian filters",
        "Median filters",
        "Denoising autoencoders",
      ],
    },
    {
      name: "Contrast Adjustment",
      icon: "🌓",
      before: "Low contrast, hard to distinguish text",
      after: "Clear separation between text and background",
      techniques: [
        "Histogram equalization",
        "Adaptive thresholding",
        "Gamma correction",
      ],
    },
    {
      name: "Skew Correction",
      icon: "📐",
      before: "Rotated or tilted document",
      after: "Properly aligned horizontal text",
      techniques: [
        "Hough transform",
        "Projection profiles",
        "CNN angle prediction",
      ],
    },
    {
      name: "Resolution Optimization",
      icon: "🔎",
      before: "Too low or too high resolution",
      after: "Optimal resolution for recognition",
      techniques: [
        "Bicubic interpolation",
        "Super-resolution GANs",
        "Lanczos resampling",
      ],
    },
  ];

  const current = steps[activeStep];

  return (
    <Section title="🔧 Stage 2: Preprocessing & Enhancement" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Before text detection, the image is optimized for better recognition
        accuracy. Click each technique to see the transformation:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeStep === i
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {step.icon} {step.name}
          </button>
        ))}
      </div>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-purple-800">
            {current.icon} {current.name}
          </h4>
          <button
            onClick={() => setShowBefore(!showBefore)}
            className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
          >
            {showBefore ? "Show After ➡️" : "⬅️ Show Before"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Visual representation */}
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">
              {showBefore ? "Before:" : "After:"}
            </div>

            {/* Simulated document */}
            <div
              className={`relative bg-gray-100 rounded-lg p-4 h-32 flex flex-col justify-center ${
                activeStep === 2 && showBefore ? "transform rotate-6" : ""
              }`}
            >
              {/* Text lines */}
              {[0, 1, 2].map((line) => (
                <div
                  key={line}
                  className={`h-3 rounded mb-2 ${
                    showBefore
                      ? activeStep === 0
                        ? "bg-gray-400" // noisy
                        : activeStep === 1
                        ? "bg-gray-300" // low contrast
                        : "bg-gray-700"
                      : "bg-gray-800"
                  }`}
                  style={{
                    width: `${70 + line * 10}%`,
                    opacity: showBefore && activeStep === 1 ? 0.5 : 1,
                    filter:
                      showBefore && activeStep === 0 ? "blur(0.5px)" : "none",
                    transform:
                      showBefore && activeStep === 3
                        ? "scale(0.8)"
                        : "scale(1)",
                  }}
                />
              ))}

              {/* Noise dots for noise reduction demo */}
              {showBefore && activeStep === 0 && (
                <>
                  {noiseDots.map((dot, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-gray-500 rounded-full"
                      style={{
                        top: dot.top,
                        left: dot.left,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Techniques used */}
          <div>
            <div className="text-sm text-gray-500 mb-2">Techniques:</div>
            <div className="space-y-2">
              {current.techniques.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white rounded-lg p-2"
                >
                  <span className="text-purple-600">✓</span>
                  <span className="text-sm text-gray-700">{tech}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 bg-white rounded-lg p-3">
              <div className="text-xs text-gray-500">Transformation:</div>
              <div className="text-sm">
                <span className="text-red-500">{current.before}</span>
                <span className="mx-2">→</span>
                <span className="text-green-500">{current.after}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const TextDetectionSection = () => {
  const [showDetection, setShowDetection] = useState(false);
  const [detectionStep, setDetectionStep] = useState(0);

  const steps = [
    {
      name: "Layout Analysis",
      desc: "Distinguish text, images, graphics, whitespace",
    },
    {
      name: "Text Block ID",
      desc: "Group characters into words, lines, paragraphs",
    },
    {
      name: "Reading Order",
      desc: "Determine sequence (left→right, top→bottom)",
    },
    {
      name: "Region Classification",
      desc: "Identify headers, body, captions, tables",
    },
  ];

  return (
    <Section title="🔍 Stage 3: Text Region Detection" color="#22c55e">
      <p className="text-gray-700 mb-4">
        The system analyzes the preprocessed image to identify areas containing
        text and understand document structure.
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Document visualization */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-500">Document:</span>
              <button
                onClick={() => setShowDetection(!showDetection)}
                className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700"
              >
                {showDetection ? "Hide Boxes" : "Detect Regions"}
              </button>
            </div>

            <div className="relative bg-gray-50 rounded-lg p-4 min-h-48">
              {/* Header region */}
              <div
                className={`relative mb-3 p-2 rounded ${
                  showDetection ? "border-2 border-red-400 bg-red-50" : ""
                }`}
              >
                <div className="h-4 bg-gray-800 rounded w-2/3 mb-1"></div>
                {showDetection && (
                  <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1 rounded">
                    Header
                  </span>
                )}
              </div>

              {/* Body text */}
              <div
                className={`relative mb-3 p-2 rounded ${
                  showDetection ? "border-2 border-blue-400 bg-blue-50" : ""
                }`}
              >
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-2 bg-gray-600 rounded mb-1"
                    style={{ width: `${85 - i * 5}%` }}
                  ></div>
                ))}
                {showDetection && (
                  <span className="absolute -top-2 -right-2 text-xs bg-blue-500 text-white px-1 rounded">
                    Body
                  </span>
                )}
              </div>

              {/* Image placeholder */}
              <div
                className={`relative mb-3 w-20 h-16 bg-gray-300 rounded flex items-center justify-center ${
                  showDetection ? "border-2 border-yellow-400" : ""
                }`}
              >
                <span className="text-gray-500 text-xl">🖼️</span>
                {showDetection && (
                  <span className="absolute -top-2 -right-2 text-xs bg-yellow-500 text-white px-1 rounded">
                    Image
                  </span>
                )}
              </div>

              {/* Caption */}
              <div
                className={`relative p-1 rounded ${
                  showDetection ? "border-2 border-purple-400 bg-purple-50" : ""
                }`}
              >
                <div className="h-2 bg-gray-400 rounded w-1/2"></div>
                {showDetection && (
                  <span className="absolute -top-2 -right-2 text-xs bg-purple-500 text-white px-1 rounded">
                    Caption
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Detection steps */}
          <div>
            <div className="text-sm text-gray-500 mb-2">Detection Process:</div>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setDetectionStep(i)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    detectionStep === i
                      ? "bg-green-600 text-white"
                      : "bg-white hover:bg-green-100"
                  }`}
                >
                  <div className="font-medium text-sm">
                    {i + 1}. {step.name}
                  </div>
                  <div
                    className={`text-xs ${
                      detectionStep === i ? "text-green-100" : "text-gray-500"
                    }`}
                  >
                    {step.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: "🧠",
            name: "U-Net / Mask R-CNN",
            type: "Semantic segmentation",
          },
          { icon: "📊", name: "LayoutLM", type: "Document understanding" },
          {
            icon: "🔗",
            name: "Graph Neural Networks",
            type: "Spatial relationships",
          },
          {
            icon: "🤖",
            name: "Transformer models",
            type: "Structure prediction",
          },
        ].map((tech, i) => (
          <div key={i} className="bg-white rounded-lg p-2 border text-center">
            <span className="text-xl">{tech.icon}</span>
            <div className="font-medium text-sm text-green-800">
              {tech.name}
            </div>
            <div className="text-xs text-gray-500">{tech.type}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const CharacterRecognitionSection = () => {
  const [step, setStep] = useState(0);

  const word = "INVOICE";
  const confidences = [0.99, 0.97, 0.95, 0.98, 0.92, 0.96, 0.94];

  const recognitionSteps = [
    {
      name: "Feature Extraction",
      icon: "🔬",
      desc: "Analyze shape, size, characteristics of each character",
    },
    {
      name: "Pattern Matching",
      icon: "🎯",
      desc: "Compare against trained models (fonts, styles)",
    },
    {
      name: "Context Analysis",
      icon: "📚",
      desc: "Use surrounding characters for accuracy (language models)",
    },
    {
      name: "Confidence Scoring",
      icon: "📊",
      desc: "Assign probability scores to each recognition",
    },
  ];

  return (
    <Section title="🔤 Stage 4: Character Recognition" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        This is the core of OCR — identifying individual characters using deep
        learning and language models.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {recognitionSteps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              step === i
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.icon} {s.name}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-3">
          {recognitionSteps[step].icon} {recognitionSteps[step].name}
        </h4>
        <p className="text-sm text-amber-700 mb-4">
          {recognitionSteps[step].desc}
        </p>

        {/* Character display */}
        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex justify-center gap-2">
            {word.split("").map((char, i) => (
              <div key={i} className="relative">
                <div
                  className={`w-12 h-14 rounded-lg flex items-center justify-center text-2xl font-bold border-2 ${
                    step === 0
                      ? "border-amber-300 bg-amber-50"
                      : step === 1
                      ? "border-green-400 bg-green-50"
                      : step === 2
                      ? "border-blue-400 bg-blue-50"
                      : "border-purple-400 bg-purple-50"
                  }`}
                >
                  {step === 0 ? (
                    <svg viewBox="0 0 30 40" className="w-8 h-10">
                      {/* Simplified character outline */}
                      <rect
                        x="5"
                        y="5"
                        width="20"
                        height="30"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        strokeDasharray="3"
                      />
                      <text
                        x="15"
                        y="30"
                        textAnchor="middle"
                        fontSize="20"
                        fill="#F59E0B"
                      >
                        {char}
                      </text>
                    </svg>
                  ) : (
                    char
                  )}
                </div>

                {/* Confidence bar */}
                {step === 3 && (
                  <div className="absolute -bottom-6 left-0 right-0">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${confidences[i] * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-center text-gray-500 mt-1">
                      {(confidences[i] * 100).toFixed(0)}%
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {step === 3 && <div className="h-8"></div>}
        </div>

        {/* Step-specific details */}
        <div className="bg-white rounded-lg p-3">
          {step === 0 && (
            <div className="text-sm text-gray-600">
              <strong>Features analyzed:</strong> Loops, endpoints,
              intersections, stroke width, aspect ratio, Fourier descriptors,
              pixel patterns
            </div>
          )}
          {step === 1 && (
            <div className="text-sm text-gray-600">
              <strong>Models used:</strong> CNN classifiers (ResNet,
              EfficientNet), template matching, SVM with feature vectors
            </div>
          )}
          {step === 2 && (
            <div className="text-sm text-gray-600">
              <strong>Context helps:</strong> "INVOI
              <span className="text-red-500">?</span>E" → Language model
              suggests "C" based on dictionary and n-gram probabilities
            </div>
          )}
          {step === 3 && (
            <div className="text-sm text-gray-600">
              <strong>Scoring:</strong> Softmax outputs from neural networks
              provide probability distributions. Low confidence → flag for
              review
            </div>
          )}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Key insight:</strong> Modern OCR combines visual
          recognition (CNNs) with language understanding (transformers like
          BERT) to achieve near-human accuracy on printed text!
        </p>
      </div>
    </Section>
  );
};

const OutputSection = () => {
  const [outputFormat, setOutputFormat] = useState("text");

  const formats = {
    text: {
      name: "Plain Text",
      icon: "📝",
      output: `INVOICE #12345

Date: December 28, 2025
Customer: Acme Corp

Items:
- Widget A    $25.00
- Widget B    $35.00

Total: $60.00`,
    },
    structured: {
      name: "Structured JSON",
      icon: "📊",
      output: `{
  "type": "invoice",
  "number": "12345",
  "date": "2025-12-28",
  "customer": "Acme Corp",
  "items": [
    {"name": "Widget A", "price": 25.00},
    {"name": "Widget B", "price": 35.00}
  ],
  "total": 60.00
}`,
    },
    coordinates: {
      name: "With Coordinates",
      icon: "📍",
      output: `"INVOICE" at [x:50, y:20, w:120, h:30]
"#12345" at [x:180, y:20, w:80, h:30]
"Date:" at [x:50, y:60, w:50, h:20]
"December 28, 2025" at [x:110, y:60, w:150, h:20]
...`,
    },
  };

  const current = formats[outputFormat];

  const postProcessing = [
    {
      icon: "📝",
      name: "Text Compilation",
      desc: "Assemble characters into words/sentences",
    },
    {
      icon: "📐",
      name: "Format Preservation",
      desc: "Maintain paragraphs, line breaks, spacing",
    },
    {
      icon: "📍",
      name: "Coordinate Mapping",
      desc: "Record position of each text element",
    },
    {
      icon: "✅",
      name: "Quality Validation",
      desc: "Spelling/grammar checks for errors",
    },
  ];

  return (
    <Section title="📄 Stage 5: Output Generation" color="#ef4444">
      <p className="text-gray-700 mb-4">
        The final stage converts recognition results into usable text data with
        various output formats.
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {Object.entries(formats).map(([key, format]) => (
          <button
            key={key}
            onClick={() => setOutputFormat(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              outputFormat === key
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {format.icon} {format.name}
          </button>
        ))}
      </div>

      <div className="bg-red-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Input document */}
          <div>
            <div className="text-sm text-gray-500 mb-2">Original Document:</div>
            <div className="bg-white rounded-lg p-4 border">
              <div className="text-lg font-bold mb-2">INVOICE #12345</div>
              <div className="text-sm mb-2">Date: December 28, 2025</div>
              <div className="text-sm mb-2">Customer: Acme Corp</div>
              <div className="text-sm font-medium mt-3">Items:</div>
              <div className="text-sm">- Widget A $25.00</div>
              <div className="text-sm">- Widget B $35.00</div>
              <div className="text-sm font-bold mt-2">Total: $60.00</div>
            </div>
          </div>

          {/* Output */}
          <div>
            <div className="text-sm text-gray-500 mb-2">
              {current.name} Output:
            </div>
            <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-x-auto h-48">
              {current.output}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {postProcessing.map((step, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-xl">{step.icon}</span>
            <div className="font-medium text-sm text-red-800">{step.name}</div>
            <div className="text-xs text-gray-500">{step.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const FullPipelineDemo = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const stages = [
    { icon: "📷", name: "Input", desc: "Receipt image captured" },
    { icon: "🔧", name: "Preprocess", desc: "Enhanced and cleaned" },
    { icon: "🔍", name: "Detect", desc: "Text regions identified" },
    { icon: "🔤", name: "Recognize", desc: "Characters extracted" },
    { icon: "📄", name: "Output", desc: "Structured data ready" },
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
        Watch the complete OCR pipeline process a receipt:
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
                className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  i === step
                    ? "bg-indigo-600 ring-4 ring-indigo-300"
                    : i < step
                    ? "bg-indigo-400"
                    : "bg-gray-300"
                }`}
              >
                {s.icon}
              </div>
              <div className="text-xs mt-1 font-medium text-gray-700">
                {s.name}
              </div>
            </div>
          ))}
        </div>

        {/* Current stage output */}
        <div className="bg-white rounded-lg p-4">
          <div className="text-center mb-2">
            <span className="text-2xl">{stages[step].icon}</span>
            <span className="ml-2 font-semibold text-indigo-800">
              {stages[step].desc}
            </span>
          </div>

          <div className="flex justify-center">
            {step === 0 && (
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <span className="text-5xl">🧾</span>
                <div className="text-sm text-gray-500 mt-2">
                  Raw receipt image
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="bg-purple-100 rounded-lg p-4 text-center">
                <span className="text-5xl">✨</span>
                <div className="text-sm text-purple-700 mt-2">
                  Cleaned & enhanced
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="bg-green-100 rounded-lg p-4">
                <div className="border-2 border-green-500 border-dashed p-2 rounded">
                  <div className="h-3 bg-green-400 rounded w-24 mb-1"></div>
                  <div className="h-2 bg-green-300 rounded w-20 mb-1"></div>
                  <div className="h-2 bg-green-300 rounded w-16"></div>
                </div>
                <div className="text-sm text-green-700 mt-2 text-center">
                  Regions detected
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="bg-amber-100 rounded-lg p-4 text-center">
                <div className="font-mono text-lg">RECEIPT</div>
                <div className="font-mono text-sm">Item 1: $10.00</div>
                <div className="font-mono text-sm">Total: $10.00</div>
                <div className="text-sm text-amber-700 mt-2">
                  Characters recognized
                </div>
              </div>
            )}
            {step === 4 && (
              <div className="bg-indigo-100 rounded-lg p-4">
                <pre className="text-xs text-indigo-800">
                  {`{
  "type": "receipt",
  "items": [...],
  "total": 10.00
}`}
                </pre>
                <div className="text-sm text-indigo-700 mt-2 text-center">
                  ✅ Structured output
                </div>
              </div>
            )}
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
        {
          stage: "1. Input",
          icon: "📷",
          color: "#3B82F6",
          key: "Quality matters!",
        },
        {
          stage: "2. Preprocess",
          icon: "🔧",
          color: "#8B5CF6",
          key: "Clean & enhance",
        },
        {
          stage: "3. Detect",
          icon: "🔍",
          color: "#22C55E",
          key: "Find text regions",
        },
        {
          stage: "4. Recognize",
          icon: "🔤",
          color: "#F59E0B",
          key: "CNN + Language models",
        },
        {
          stage: "5. Output",
          icon: "📄",
          color: "#EF4444",
          key: "Structured data",
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
        OCR combines computer vision (CNNs, transformers) with NLP (language
        models) to convert visual text into structured data. This powers Azure
        AI Document Intelligence, Form Recognizer, and countless business
        automation scenarios. Understanding the pipeline helps you troubleshoot
        quality issues — if OCR fails, trace back through the stages to find
        where things went wrong!
      </p>
    </div>
  </Section>
);

export default function OCRGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📝 Optical Character Recognition (OCR)
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Converting Images to Text
          </p>
        </div>

        <PipelineOverview />
        <ImageInputSection />
        <PreprocessingSection />
        <TextDetectionSection />
        <CharacterRecognitionSection />
        <OutputSection />
        <FullPipelineDemo />
        <SummarySection />
      </div>
    </div>
  );
}
