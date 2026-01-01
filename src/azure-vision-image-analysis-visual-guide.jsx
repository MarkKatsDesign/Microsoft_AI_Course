import React, { useState } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const IntroSection = () => {
  const [selectedApp, setSelectedApp] = useState(0);

  const applications = [
    {
      name: "Manufacturing",
      icon: "🏭",
      title: "Defect Detection",
      color: "#3B82F6",
      desc: "AI vision systems inspect products on assembly lines in real time, detecting surface defects, misalignments, or missing components.",
      benefit: "Reducing waste and improving quality control",
    },
    {
      name: "Healthcare",
      icon: "🏥",
      title: "Medical Imaging",
      color: "#22C55E",
      desc: "Computer vision helps radiologists analyze X-rays, MRIs, and CT scans. AI models can highlight anomalies like tumors or fractures.",
      benefit: "Early diagnosis and reduced human error",
    },
    {
      name: "Retail",
      icon: "🛒",
      title: "Shelf Monitoring",
      color: "#F59E0B",
      desc: "Retailers use AI vision to monitor store shelves. Cameras detect when products are out of stock or misplaced.",
      benefit: "Real-time inventory and better customer experience",
    },
    {
      name: "Transportation",
      icon: "🚗",
      title: "Autonomous Vehicles",
      color: "#8B5CF6",
      desc: "Self-driving cars rely on computer vision to recognize road signs, lane markings, pedestrians, and other vehicles.",
      benefit: "Safe navigation in dynamic environments",
    },
  ];

  const current = applications[selectedApp];

  return (
    <Section title="👁️ Introduction to Computer Vision" color="#1e293b">
      <p className="text-gray-700 mb-4">
        <strong>Computer vision</strong> is a field of AI that enables machines
        to interpret and understand visual information — images, videos, and
        live camera feeds. It automates time-intensive tasks and enables new
        possibilities!
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-gray-700 mb-3">
          🌍 Real-World Applications:
        </h4>

        <div className="grid grid-cols-4 gap-2 mb-4">
          {applications.map((app, i) => (
            <button
              key={i}
              onClick={() => setSelectedApp(i)}
              className={`p-3 rounded-xl text-center transition-all ${
                selectedApp === i
                  ? "ring-2 scale-105"
                  : "bg-white hover:bg-gray-100"
              }`}
              style={{
                backgroundColor:
                  selectedApp === i ? `${app.color}15` : undefined,
                ringColor: app.color,
              }}
            >
              <span className="text-2xl">{app.icon}</span>
              <div
                className="text-xs font-medium mt-1"
                style={{ color: app.color }}
              >
                {app.name}
              </div>
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
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{current.icon}</span>
            <div>
              <h4 className="font-bold" style={{ color: current.color }}>
                {current.title}
              </h4>
              <span className="text-sm text-gray-600">
                {current.name} Industry
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-2">{current.desc}</p>
          <div className="bg-white rounded-lg p-2">
            <span className="text-xs text-gray-500">✨ Benefit: </span>
            <span
              className="text-sm font-medium"
              style={{ color: current.color }}
            >
              {current.benefit}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const AzureVisionOverviewSection = () => {
  const [selectedService, setSelectedService] = useState("imageAnalysis");

  const services = {
    imageAnalysis: {
      name: "Azure Vision Image Analysis",
      icon: "🖼️",
      color: "#3B82F6",
      desc: "Detects objects, tags visual features, generates captions, and supports OCR",
      capabilities: ["Object detection", "Image tagging", "Captions", "OCR"],
    },
    face: {
      name: "Azure AI Face Service",
      icon: "👤",
      color: "#8B5CF6",
      desc: "Detects, recognizes, and analyzes human faces in images",
      capabilities: [
        "Face detection",
        "Face recognition",
        "Facial analysis",
        "Emotion detection",
      ],
    },
  };

  const applications = [
    { icon: "🔍", name: "SEO", desc: "Image tagging for search ranking" },
    { icon: "🛡️", name: "Content Moderation", desc: "Monitor image safety" },
    { icon: "🔐", name: "Security", desc: "Building access & device unlock" },
    { icon: "📱", name: "Social Media", desc: "Auto-tag friends in photos" },
    {
      icon: "🔎",
      name: "Missing Persons",
      desc: "Identify people via cameras",
    },
    { icon: "🛂", name: "Identity Validation", desc: "Entry permits at ports" },
  ];

  return (
    <Section title="☁️ Azure Vision Services" color="#0078D4">
      <p className="text-gray-700 mb-4">
        Azure Vision provides prebuilt and customizable computer vision models.
        It offers "off-the-shelf" functionality for common scenarios while
        supporting custom model training.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {Object.entries(services).map(([key, service]) => (
          <button
            key={key}
            onClick={() => setSelectedService(key)}
            className={`p-4 rounded-xl text-left transition-all ${
              selectedService === key
                ? "ring-4 ring-opacity-50"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            style={{
              backgroundColor:
                selectedService === key ? `${service.color}10` : undefined,
              ringColor: service.color,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl">{service.icon}</span>
              <h4 className="font-bold" style={{ color: service.color }}>
                {service.name}
              </h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{service.desc}</p>
            <div className="flex flex-wrap gap-1">
              {service.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded text-white"
                  style={{ backgroundColor: service.color }}
                >
                  {cap}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4">
        <h4 className="font-semibold text-gray-700 mb-3">
          🎯 Common Applications:
        </h4>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {applications.map((app, i) => (
            <div key={i} className="bg-white rounded-lg p-2 text-center">
              <span className="text-xl">{app.icon}</span>
              <div className="text-xs font-medium text-gray-700">
                {app.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const ImageCaptioningSection = () => {
  const [showCaption, setShowCaption] = useState(false);

  return (
    <Section title="📝 Describing Images with Captions" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Azure Vision can analyze an image, evaluate the objects in it, and
        generate a<strong> human-readable description</strong> of the image.
      </p>

      <div className="bg-green-50 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Image representation */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-8 relative">
              {/* Simplified skateboarder illustration */}
              <svg viewBox="0 0 200 200" className="w-full h-48">
                {/* Background */}
                <rect x="0" y="150" width="200" height="50" fill="#CBD5E1" />
                {/* Person */}
                <circle cx="100" cy="60" r="20" fill="#F59E0B" /> {/* Head */}
                <rect
                  x="90"
                  y="80"
                  width="20"
                  height="40"
                  fill="#3B82F6"
                />{" "}
                {/* Body */}
                <line
                  x1="90"
                  y1="90"
                  x2="70"
                  y2="110"
                  stroke="#3B82F6"
                  strokeWidth="6"
                />{" "}
                {/* Arm */}
                <line
                  x1="110"
                  y1="90"
                  x2="130"
                  y2="70"
                  stroke="#3B82F6"
                  strokeWidth="6"
                />{" "}
                {/* Arm */}
                <line
                  x1="95"
                  y1="120"
                  x2="80"
                  y2="145"
                  stroke="#1E40AF"
                  strokeWidth="6"
                />{" "}
                {/* Leg */}
                <line
                  x1="105"
                  y1="120"
                  x2="120"
                  y2="145"
                  stroke="#1E40AF"
                  strokeWidth="6"
                />{" "}
                {/* Leg */}
                {/* Skateboard */}
                <ellipse cx="100" cy="155" rx="40" ry="8" fill="#8B5CF6" />
                <circle cx="70" cy="160" r="6" fill="#4B5563" />
                <circle cx="130" cy="160" r="6" fill="#4B5563" />
                {/* Motion lines */}
                <line
                  x1="50"
                  y1="100"
                  x2="40"
                  y2="100"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="110"
                  x2="35"
                  y2="110"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="120"
                  x2="40"
                  y2="120"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
              </svg>
              <div className="text-center text-sm text-gray-500 mt-2">
                Sample Image
              </div>
            </div>
          </div>

          {/* Analysis */}
          <div className="flex-1">
            <button
              onClick={() => setShowCaption(!showCaption)}
              className={`w-full py-3 rounded-lg font-medium mb-4 ${
                showCaption
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 border-2 border-green-300"
              }`}
            >
              {showCaption ? "✨ Caption Generated!" : "🔍 Analyze Image"}
            </button>

            {showCaption && (
              <div className="bg-white rounded-xl p-4 border-2 border-green-300">
                <div className="text-sm text-gray-500 mb-2">
                  Generated Caption:
                </div>
                <div className="text-lg font-medium text-green-800">
                  "A person jumping on a skateboard"
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-500">
                    AI-generated description
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

const ObjectDetectionSection = () => {
  const [showDetection, setShowDetection] = useState(false);
  const [hoveredObject, setHoveredObject] = useState(null);

  const detectedObjects = [
    {
      name: "Person",
      confidence: 95.5,
      x: 70,
      y: 30,
      width: 60,
      height: 90,
      color: "#3B82F6",
    },
    {
      name: "Skateboard",
      confidence: 90.4,
      x: 60,
      y: 120,
      width: 80,
      height: 30,
      color: "#8B5CF6",
    },
  ];

  return (
    <Section title="🎯 Detecting Common Objects" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Azure Vision can identify <strong>thousands of common objects</strong>{" "}
        in images, returning labels, confidence scores, and{" "}
        <strong>bounding box coordinates</strong>.
      </p>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Image with bounding boxes */}
          <div className="flex-1">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 relative">
              <svg viewBox="0 0 200 180" className="w-full h-48">
                {/* Background */}
                <rect x="0" y="150" width="200" height="30" fill="#CBD5E1" />

                {/* Person */}
                <circle cx="100" cy="50" r="18" fill="#F59E0B" />
                <rect x="90" y="68" width="20" height="35" fill="#3B82F6" />
                <line
                  x1="90"
                  y1="78"
                  x2="72"
                  y2="95"
                  stroke="#3B82F6"
                  strokeWidth="5"
                />
                <line
                  x1="110"
                  y1="78"
                  x2="128"
                  y2="62"
                  stroke="#3B82F6"
                  strokeWidth="5"
                />
                <line
                  x1="95"
                  y1="103"
                  x2="82"
                  y2="125"
                  stroke="#1E40AF"
                  strokeWidth="5"
                />
                <line
                  x1="105"
                  y1="103"
                  x2="118"
                  y2="125"
                  stroke="#1E40AF"
                  strokeWidth="5"
                />

                {/* Skateboard */}
                <ellipse cx="100" cy="135" rx="35" ry="7" fill="#8B5CF6" />
                <circle cx="72" cy="140" r="5" fill="#4B5563" />
                <circle cx="128" cy="140" r="5" fill="#4B5563" />

                {/* Bounding boxes */}
                {showDetection && (
                  <>
                    <rect
                      x="70"
                      y="30"
                      width="60"
                      height="100"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="2"
                      strokeDasharray={hoveredObject === "Person" ? "0" : "4"}
                      className={
                        hoveredObject === "Person"
                          ? "opacity-100"
                          : "opacity-70"
                      }
                    />
                    <rect
                      x="60"
                      y="125"
                      width="80"
                      height="25"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      strokeDasharray={
                        hoveredObject === "Skateboard" ? "0" : "4"
                      }
                      className={
                        hoveredObject === "Skateboard"
                          ? "opacity-100"
                          : "opacity-70"
                      }
                    />
                    <text
                      x="72"
                      y="28"
                      fontSize="10"
                      fill="#3B82F6"
                      fontWeight="bold"
                    >
                      Person
                    </text>
                    <text
                      x="62"
                      y="122"
                      fontSize="10"
                      fill="#8B5CF6"
                      fontWeight="bold"
                    >
                      Skateboard
                    </text>
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Detection results */}
          <div className="flex-1">
            <button
              onClick={() => setShowDetection(!showDetection)}
              className={`w-full py-3 rounded-lg font-medium mb-4 ${
                showDetection
                  ? "bg-blue-600 text-white"
                  : "bg-white text-blue-600 border-2 border-blue-300"
              }`}
            >
              {showDetection ? "✨ Objects Detected!" : "🔍 Detect Objects"}
            </button>

            {showDetection && (
              <div className="space-y-2">
                {detectedObjects.map((obj, i) => (
                  <div
                    key={i}
                    className={`bg-white rounded-lg p-3 border-2 cursor-pointer transition-all ${
                      hoveredObject === obj.name ? "scale-102" : ""
                    }`}
                    style={{ borderColor: obj.color }}
                    onMouseEnter={() => setHoveredObject(obj.name)}
                    onMouseLeave={() => setHoveredObject(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold" style={{ color: obj.color }}>
                        {obj.name}
                      </span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {obj.confidence}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${obj.confidence}%`,
                          backgroundColor: obj.color,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Bounding box: ({obj.x}, {obj.y}) {obj.width}×{obj.height}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Bounding Boxes:</strong> The coordinates (top, left, width,
          height) tell you
          <em> exactly where</em> in the image each object was detected!
        </p>
      </div>
    </Section>
  );
};

const TaggingSection = () => {
  const [showTags, setShowTags] = useState(false);

  const tags = [
    { name: "sport", score: 99.6 },
    { name: "person", score: 99.56 },
    { name: "skateboarding", score: 93.78 },
    { name: "skateboarder", score: 93.25 },
    { name: "extreme sport", score: 88.35 },
    { name: "kickflip", score: 88.18 },
    { name: "jumping", score: 89.87 },
    { name: "outdoor", score: 61.39 },
  ];

  return (
    <Section title="🏷️ Tagging Visual Features" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Azure Vision suggests <strong>tags as metadata</strong> based on image
        contents. Tags can be used to <strong>index images for search</strong>{" "}
        solutions.
      </p>

      <div className="bg-amber-50 rounded-xl p-4">
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowTags(!showTags)}
            className={`px-6 py-3 rounded-lg font-medium ${
              showTags
                ? "bg-amber-600 text-white"
                : "bg-white text-amber-600 border-2 border-amber-300"
            }`}
          >
            {showTags ? "✨ Tags Generated!" : "🏷️ Generate Tags"}
          </button>
        </div>

        {showTags && (
          <div className="bg-white rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-3">
              Tags for skateboarder image:
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <div key={i} className="group relative">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-all hover:scale-105"
                    style={{
                      backgroundColor: `rgba(245, 158, 11, ${tag.score / 100})`,
                      color: tag.score > 80 ? "white" : "#92400E",
                    }}
                  >
                    {tag.name}
                  </span>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {tag.score}% confidence
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-amber-100 rounded-lg p-3">
              <div className="text-sm text-amber-800">
                <strong>💡 Use Case:</strong> Index thousands of images with
                auto-generated tags for powerful search functionality!
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

const OCRSection = () => {
  const [showOCR, setShowOCR] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleOCR = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowOCR(true);
    }, 1500);
  };

  const extractedText = [
    "Nutrition Facts",
    "Serving size: 1 bar (40g)",
    "Servings Per Package: 4",
    "Amount Per Serving",
    "Calories 190",
    "Calories from Fat 110",
    "Total Fat 13g",
    "Saturated Fat 1.5g",
    "Trans Fat 0g",
    "Cholesterol 0mg",
    "Sodium 20mg",
    "Vitamin A 50%",
  ];

  return (
    <Section title="📄 Optical Character Recognition (OCR)" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Azure Vision can <strong>detect and extract text</strong> from images —
        perfect for digitizing documents, labels, signs, and more.
      </p>

      <div className="bg-purple-50 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Nutrition label mockup */}
          <div className="flex-1">
            <div className="bg-white rounded-xl p-4 border-2 border-gray-300">
              <div className="text-center font-bold text-lg border-b-4 border-black pb-1 mb-2">
                Nutrition Facts
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between border-b">
                  <span>Serving size:</span>
                  <span>1 bar (40g)</span>
                </div>
                <div className="flex justify-between border-b">
                  <span>Servings Per Package:</span>
                  <span>4</span>
                </div>
                <div className="font-bold border-b py-1">
                  Amount Per Serving
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Calories</span>
                  <span className="font-bold">190</span>
                </div>
                <div className="text-xs text-right border-b">
                  Calories from Fat 110
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Fat</span>
                  <span>13g</span>
                </div>
                <div className="flex justify-between text-xs pl-4">
                  <span>Saturated Fat</span>
                  <span>1.5g</span>
                </div>
              </div>
            </div>
            <div className="text-center text-sm text-gray-500 mt-2">
              Sample Nutrition Label
            </div>
          </div>

          {/* OCR results */}
          <div className="flex-1">
            <button
              onClick={handleOCR}
              disabled={isProcessing || showOCR}
              className={`w-full py-3 rounded-lg font-medium mb-4 ${
                showOCR
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border-2 border-purple-300"
              } disabled:opacity-50`}
            >
              {isProcessing
                ? "⏳ Processing..."
                : showOCR
                ? "✨ Text Extracted!"
                : "📄 Extract Text"}
            </button>

            {showOCR && (
              <div className="bg-white rounded-xl p-4 border-2 border-purple-300 max-h-64 overflow-y-auto">
                <div className="text-sm text-gray-500 mb-2">
                  Extracted Text:
                </div>
                <div className="font-mono text-sm space-y-1">
                  {extractedText.map((line, i) => (
                    <div key={i} className="bg-purple-50 px-2 py-1 rounded">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: "📋", name: "Documents", desc: "Digitize papers" },
          { icon: "🏷️", name: "Labels", desc: "Product info" },
          { icon: "🪧", name: "Signs", desc: "Street/store signs" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-sm text-gray-800">{item.name}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const CustomModelsSection = () => {
  const [selectedType, setSelectedType] = useState("classification");

  const modelTypes = {
    classification: {
      name: "Image Classification",
      icon: "🏷️",
      color: "#22C55E",
      desc: "Predict the category or class of an entire image",
      example: "Is this an apple, banana, or orange?",
      visual: "single",
    },
    detection: {
      name: "Object Detection",
      icon: "🎯",
      color: "#3B82F6",
      desc: "Detect and classify multiple objects with bounding boxes",
      example: "Find all fruits and their locations in this image",
      visual: "multiple",
    },
  };

  const current = modelTypes[selectedType];

  return (
    <Section title="🎨 Training Custom Models" color="#6366f1">
      <p className="text-gray-700 mb-4">
        If built-in models don't meet your needs, train{" "}
        <strong>custom models</strong> for image classification or object
        detection. Azure Vision builds on pre-trained foundation models, so you
        need <strong>relatively few training images</strong>!
      </p>

      <div className="flex gap-2 mb-4 justify-center">
        {Object.entries(modelTypes).map(([key, model]) => (
          <button
            key={key}
            onClick={() => setSelectedType(key)}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
              selectedType === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedType === key ? model.color : undefined,
            }}
          >
            {model.icon} {model.name}
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
            <h4 className="font-bold" style={{ color: current.color }}>
              {current.name}
            </h4>
            <p className="text-sm text-gray-600">{current.desc}</p>
          </div>
        </div>

        {/* Visual example */}
        <div className="bg-white rounded-xl p-4">
          {selectedType === "classification" ? (
            <div className="grid grid-cols-3 gap-4">
              {[
                { emoji: "🍎", label: "Apple", color: "#EF4444" },
                { emoji: "🍌", label: "Banana", color: "#F59E0B" },
                { emoji: "🍊", label: "Orange", color: "#F97316" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-20 h-20 mx-auto rounded-xl flex items-center justify-center text-4xl mb-2"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    {item.emoji}
                  </div>
                  <div className="font-medium" style={{ color: item.color }}>
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 h-40 flex items-center justify-center gap-4">
                <div className="relative">
                  <span className="text-5xl">🍎</span>
                  <div className="absolute -inset-2 border-2 border-red-500 rounded-lg border-dashed" />
                  <span className="absolute -top-3 -left-2 text-xs bg-red-500 text-white px-1 rounded">
                    Apple
                  </span>
                </div>
                <div className="relative">
                  <span className="text-5xl">🍌</span>
                  <div className="absolute -inset-2 border-2 border-yellow-500 rounded-lg border-dashed" />
                  <span className="absolute -top-3 -left-2 text-xs bg-yellow-500 text-white px-1 rounded">
                    Banana
                  </span>
                </div>
                <div className="relative">
                  <span className="text-5xl">🍊</span>
                  <div className="absolute -inset-2 border-2 border-orange-500 rounded-lg border-dashed" />
                  <span className="absolute -top-3 -left-2 text-xs bg-orange-500 text-white px-1 rounded">
                    Orange
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4 bg-gray-100 rounded-lg p-3 text-center">
            <span className="text-sm text-gray-600">{current.example}</span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const CapabilitiesComparisonSection = () => {
  const capabilities = [
    {
      name: "Captions",
      icon: "📝",
      custom: false,
      desc: "Human-readable descriptions",
    },
    {
      name: "Object Detection",
      icon: "🎯",
      custom: true,
      desc: "Identify & locate objects",
    },
    {
      name: "Tagging",
      icon: "🏷️",
      custom: false,
      desc: "Visual feature metadata",
    },
    {
      name: "OCR",
      icon: "📄",
      custom: false,
      desc: "Extract text from images",
    },
    {
      name: "Classification",
      icon: "🗂️",
      custom: true,
      desc: "Categorize images",
    },
  ];

  return (
    <Section title="📊 Capabilities Overview" color="#1e293b">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Capability</th>
              <th className="p-3 text-center">Built-in</th>
              <th className="p-3 text-center">Customizable</th>
              <th className="p-3 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {capabilities.map((cap, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <span className="mr-2">{cap.icon}</span>
                  <span className="font-medium">{cap.name}</span>
                </td>
                <td className="p-3 text-center">
                  <span className="text-green-600 text-lg">✓</span>
                </td>
                <td className="p-3 text-center">
                  {cap.custom ? (
                    <span className="text-blue-600 text-lg">✓</span>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>
                <td className="p-3 text-gray-600">{cap.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {[
        { icon: "📝", name: "Captions", desc: "Image descriptions" },
        { icon: "🎯", name: "Objects", desc: "Detection + boxes" },
        { icon: "🏷️", name: "Tags", desc: "Visual metadata" },
        { icon: "📄", name: "OCR", desc: "Text extraction" },
      ].map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
          <span className="text-2xl">{item.icon}</span>
          <div className="font-medium text-sm text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-500">{item.desc}</div>
        </div>
      ))}
    </div>

    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
      <h3 className="font-bold text-blue-800 mb-2">
        ☁️ Azure Vision Services:
      </h3>
      <div className="grid md:grid-cols-2 gap-2">
        <div className="bg-white rounded p-2">
          <span className="font-medium text-blue-700">🖼️ Image Analysis</span>
          <span className="text-sm text-gray-600 ml-2">
            Objects, tags, captions, OCR
          </span>
        </div>
        <div className="bg-white rounded p-2">
          <span className="font-medium text-purple-700">👤 Face Service</span>
          <span className="text-sm text-gray-600 ml-2">
            Face detection & recognition
          </span>
        </div>
      </div>
    </div>

    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
      <h3 className="font-bold text-green-800 mb-2">💡 The Big Picture</h3>
      <p className="text-sm text-green-700">
        Computer vision enables machines to interpret visual information for
        applications like manufacturing defect detection, medical imaging,
        retail monitoring, and autonomous vehicles. Azure Vision provides{" "}
        <strong>built-in capabilities</strong> (captions, object detection,
        tagging, OCR) plus the ability to <strong>train custom models</strong>{" "}
        for image classification and object detection using relatively few
        training images!
      </p>
    </div>
  </Section>
);

export default function AzureVisionImageAnalysisGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            👁️ Azure Vision Image Analysis
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Computer Vision Capabilities in Azure
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure AI Fundamentals • Foundry Tools
          </div>
        </div>

        <IntroSection />
        <AzureVisionOverviewSection />
        <ImageCaptioningSection />
        <ObjectDetectionSection />
        <TaggingSection />
        <OCRSection />
        <CustomModelsSection />
        <CapabilitiesComparisonSection />
        <SummarySection />
      </div>
    </div>
  );
}
