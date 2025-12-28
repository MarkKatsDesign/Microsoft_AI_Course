import React, { useState, useEffect, useRef } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const EvolutionSection = () => {
  const [activeApproach, setActiveApproach] = useState("cnn");

  const approaches = {
    cnn: {
      title: "CNNs (Traditional)",
      icon: "🔲",
      color: "#3B82F6",
      years: "2012-2020",
      desc: "Convolutional filters slide across images to extract features",
      pros: [
        "Great for local patterns",
        "Efficient for small images",
        "Well understood",
      ],
      cons: [
        "Limited global context",
        "Fixed receptive field",
        "Hard to scale",
      ],
    },
    vit: {
      title: "Vision Transformers (ViT)",
      icon: "🎯",
      color: "#8B5CF6",
      years: "2020+",
      desc: "Apply transformer attention to image patches",
      pros: [
        "Global context from start",
        "Scales with data",
        "State-of-the-art results",
      ],
      cons: [
        "Needs more training data",
        "More compute intensive",
        "Less inductive bias",
      ],
    },
    multimodal: {
      title: "Multimodal Models",
      icon: "🌐",
      color: "#22C55E",
      years: "2021+",
      desc: "Combine vision and language in unified embedding space",
      pros: [
        "Understands images + text",
        "Zero-shot capabilities",
        "Rich descriptions",
      ],
      cons: ["Very large models", "Complex training", "Resource intensive"],
    },
  };

  const current = approaches[activeApproach];

  return (
    <Section title="📈 Evolution of Computer Vision" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Computer vision has evolved from CNNs to transformers, mirroring the
        revolution in NLP. Click to explore each approach:
      </p>

      <div className="flex gap-2 justify-center mb-4 flex-wrap">
        {Object.entries(approaches).map(([key, approach]) => (
          <button
            key={key}
            onClick={() => setActiveApproach(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeApproach === key
                ? "text-white scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor:
                activeApproach === key ? approach.color : undefined,
            }}
          >
            {approach.icon} {approach.title}
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
        <div className="flex items-center gap-3 mb-3">
          <span className="text-4xl">{current.icon}</span>
          <div>
            <h3 className="font-bold text-lg" style={{ color: current.color }}>
              {current.title}
            </h3>
            <span className="text-sm text-gray-500">{current.years}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">{current.desc}</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-semibold text-green-700 mb-2">✅ Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {current.pros.map((pro, i) => (
                <li key={i}>• {pro}</li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-semibold text-red-700 mb-2">⚠️ Challenges</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {current.cons.map((con, i) => (
                <li key={i}>• {con}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
};

const TransformerRecap = () => {
  const [hoveredToken, setHoveredToken] = useState(null);

  const tokens = [
    { word: "The", vector: [0.2, 0.1], color: "#9CA3AF" },
    { word: "cat", vector: [0.8, 0.7], color: "#F59E0B" },
    { word: "sat", vector: [0.3, 0.5], color: "#3B82F6" },
    { word: "on", vector: [0.2, 0.3], color: "#9CA3AF" },
    { word: "the", vector: [0.2, 0.1], color: "#9CA3AF" },
    { word: "mat", vector: [0.7, 0.6], color: "#22C55E" },
  ];

  return (
    <Section title="🔤 Recap: Transformers for Language" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Transformers encode words as <strong>embedding vectors</strong> that
        capture semantic meaning. The <strong>attention mechanism</strong> lets
        each word "see" all other words to understand context.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {tokens.map((token, i) => (
            <div
              key={i}
              className={`px-3 py-2 rounded-lg cursor-pointer transition-all ${
                hoveredToken === i ? "scale-110 ring-2 ring-blue-400" : ""
              }`}
              style={{
                backgroundColor: token.color + "30",
                borderColor: token.color,
              }}
              onMouseEnter={() => setHoveredToken(i)}
              onMouseLeave={() => setHoveredToken(null)}
            >
              <div className="font-medium" style={{ color: token.color }}>
                {token.word}
              </div>
            </div>
          ))}
        </div>

        {/* Vector space visualization */}
        <div className="flex justify-center">
          <svg viewBox="0 0 200 150" className="w-64 h-40">
            {/* Axes */}
            <line
              x1="30"
              y1="120"
              x2="180"
              y2="120"
              stroke="#CBD5E1"
              strokeWidth="1"
            />
            <line
              x1="30"
              y1="120"
              x2="30"
              y2="20"
              stroke="#CBD5E1"
              strokeWidth="1"
            />

            {/* Token vectors */}
            {tokens.map((token, i) => {
              const x = 30 + token.vector[0] * 140;
              const y = 120 - token.vector[1] * 90;
              const isHovered = hoveredToken === i;

              return (
                <g key={i}>
                  <line
                    x1="30"
                    y1="120"
                    x2={x}
                    y2={y}
                    stroke={token.color}
                    strokeWidth={isHovered ? 3 : 1.5}
                    opacity={hoveredToken === null || isHovered ? 1 : 0.3}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isHovered ? 8 : 5}
                    fill={token.color}
                    opacity={hoveredToken === null || isHovered ? 1 : 0.3}
                  />
                  {isHovered && (
                    <text
                      x={x + 10}
                      y={y + 4}
                      fontSize="10"
                      fill={token.color}
                      fontWeight="bold"
                    >
                      {token.word}
                    </text>
                  )}
                </g>
              );
            })}

            <text x="185" y="125" fontSize="9" fill="#6B7280">
              dim 1
            </text>
            <text x="15" y="15" fontSize="9" fill="#6B7280">
              dim 2
            </text>
          </svg>
        </div>

        <p className="text-sm text-center text-blue-700 mt-2">
          Hover over words to see their position in embedding space. Similar
          words (cat/mat) have similar vectors!
        </p>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Key Insight:</strong> The same attention mechanism that
          works for language tokens can be applied to image patches! This is the
          foundation of Vision Transformers.
        </p>
      </div>
    </Section>
  );
};

const VisionTransformerSection = () => {
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const intervalRef = useRef(null);

  const steps = [
    { title: "Original Image", desc: "Start with an input image" },
    {
      title: "Split into Patches",
      desc: "Divide image into fixed-size patches (e.g., 16×16 pixels)",
    },
    {
      title: "Flatten Patches",
      desc: "Convert each patch into a linear vector",
    },
    {
      title: "Add Position Embeddings",
      desc: "Tell the model where each patch came from",
    },
    {
      title: "Transformer Encoder",
      desc: "Apply self-attention across all patches",
    },
    { title: "Classification", desc: "Use learned features for prediction" },
  ];

  useEffect(() => {
    if (isAnimating) {
      intervalRef.current = setInterval(() => {
        setStep((s) => {
          if (s >= steps.length - 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            setIsAnimating(false);
            return s;
          }
          return s + 1;
        });
      }, 1500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAnimating, steps.length]);

  const patchColors = [
    "#EF4444",
    "#F97316",
    "#F59E0B",
    "#84CC16",
    "#22C55E",
    "#14B8A6",
    "#06B6D4",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#A855F7",
    "#EC4899",
    "#F43F5E",
    "#FB7185",
    "#FDA4AF",
    "#FECDD3",
  ];

  const [randomWidths] = useState(() =>
    patchColors.map(() => 60 + Math.random() * 40)
  );

  return (
    <Section title="🎯 Vision Transformers (ViT)" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        <strong>Vision Transformers</strong> treat images like sentences —
        instead of word tokens, they use <strong>image patches</strong>.
        Attention determines which patches relate to each other!
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsAnimating(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          ▶️ Animate Pipeline
        </button>
        <button
          onClick={() => setStep((s) => Math.min(s + 1, steps.length - 1))}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Step →
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

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        {/* Progress indicator */}
        <div className="flex justify-between mb-4">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center transition-all ${
                i <= step ? "opacity-100" : "opacity-30"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === step
                    ? "bg-purple-600 text-white ring-4 ring-purple-300"
                    : i < step
                    ? "bg-purple-400 text-white"
                    : "bg-gray-300"
                }`}
              >
                {i + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-4">
          <h4 className="font-bold text-purple-800">{steps[step].title}</h4>
          <p className="text-sm text-purple-600">{steps[step].desc}</p>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-lg p-4 flex justify-center">
          {step === 0 && (
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-green-400 to-yellow-400 rounded-lg shadow-lg flex items-center justify-center">
              <span className="text-4xl">🐕</span>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-4 gap-1 w-36 h-36">
              {patchColors.map((color, i) => (
                <div
                  key={i}
                  className="rounded transition-all hover:scale-110"
                  style={{ backgroundColor: color, opacity: 0.7 }}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="flex items-center gap-4">
              <div className="grid grid-cols-4 gap-1 w-24 h-24">
                {patchColors.map((color, i) => (
                  <div
                    key={i}
                    className="rounded"
                    style={{ backgroundColor: color, opacity: 0.7 }}
                  />
                ))}
              </div>
              <svg width="40" height="24" viewBox="0 0 40 24">
                <path
                  d="M 5,12 L 30,12 M 26,8 L 30,12 L 26,16"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div className="flex flex-col gap-1">
                {patchColors.slice(0, 8).map((color, i) => (
                  <div
                    key={i}
                    className="h-3 rounded"
                    style={{
                      backgroundColor: color,
                      width: `${randomWidths[i]}px`,
                    }}
                  />
                ))}
                <div className="text-xs text-gray-500">...</div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-1">
              {patchColors.slice(0, 6).map((color, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-8">pos {i}</span>
                  <div
                    className="h-4 rounded flex items-center"
                    style={{ backgroundColor: color, width: "100px" }}
                  >
                    <span className="text-xs text-white ml-1">+ PE{i}</span>
                  </div>
                </div>
              ))}
              <div className="text-xs text-gray-500 ml-10">...</div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <svg viewBox="0 0 200 120" className="w-64 h-32">
                {/* Patches */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <g key={i}>
                    <rect
                      x={20 + i * 28}
                      y="10"
                      width="20"
                      height="20"
                      fill={patchColors[i]}
                      rx="3"
                    />
                    {/* Attention lines to other patches */}
                    {[0, 1, 2, 3, 4, 5].map((j) => {
                      if (i === j) return null;
                      const opacity = Math.random() * 0.5 + 0.2;
                      return (
                        <line
                          key={j}
                          x1={30 + i * 28}
                          y1="35"
                          x2={30 + j * 28}
                          y2="35"
                          stroke="#8B5CF6"
                          strokeWidth="1"
                          opacity={opacity}
                        />
                      );
                    })}
                  </g>
                ))}

                {/* Transformer block */}
                <rect
                  x="40"
                  y="50"
                  width="120"
                  height="30"
                  fill="#8B5CF6"
                  rx="5"
                  opacity="0.2"
                />
                <text
                  x="100"
                  y="70"
                  textAnchor="middle"
                  fontSize="10"
                  fill="#8B5CF6"
                >
                  Self-Attention
                </text>

                {/* Output */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <rect
                    key={i}
                    x={20 + i * 28}
                    y="90"
                    width="20"
                    height="20"
                    fill={patchColors[i]}
                    rx="3"
                    opacity="0.8"
                  />
                ))}
              </svg>
              <p className="text-xs text-purple-600">
                Each patch attends to all other patches
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="text-center">
              <div className="flex justify-center gap-2 mb-3">
                {patchColors.slice(0, 6).map((color, i) => (
                  <div
                    key={i}
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <svg
                width="40"
                height="30"
                viewBox="0 0 40 30"
                className="mx-auto"
              >
                <path d="M 20,5 L 20,25" stroke="#8B5CF6" strokeWidth="2" />
                <polygon points="15,20 20,28 25,20" fill="#8B5CF6" />
              </svg>
              <div className="bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
                🐕 Dog (98.5%)
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-purple-100 rounded-lg p-3">
        <h4 className="font-semibold text-purple-800 mb-2">
          🔄 ViT vs CNN Comparison:
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-700">CNN:</span>
            <span className="text-gray-600">
              {" "}
              Local → Global (conv filters grow receptive field)
            </span>
          </div>
          <div>
            <span className="font-medium text-purple-700">ViT:</span>
            <span className="text-gray-600">
              {" "}
              Global from start (all patches see each other)
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const VisualEmbeddingsSection = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const visualFeatures = [
    { name: "Hat", emoji: "🎩", x: 0.8, y: 0.7, related: ["Head", "Hair"] },
    { name: "Head", emoji: "👤", x: 0.75, y: 0.65, related: ["Hat", "Face"] },
    { name: "Face", emoji: "😊", x: 0.7, y: 0.6, related: ["Head", "Eyes"] },
    {
      name: "Eyes",
      emoji: "👁️",
      x: 0.65,
      y: 0.55,
      related: ["Face", "Glasses"],
    },
    { name: "Glasses", emoji: "👓", x: 0.6, y: 0.5, related: ["Eyes", "Face"] },
    { name: "Tree", emoji: "🌳", x: 0.2, y: 0.8, related: ["Park", "Grass"] },
    { name: "Park", emoji: "🏞️", x: 0.25, y: 0.75, related: ["Tree", "Grass"] },
    { name: "Grass", emoji: "🌿", x: 0.3, y: 0.7, related: ["Park", "Tree"] },
  ];

  const hoveredData =
    hoveredFeature !== null ? visualFeatures[hoveredFeature] : null;

  return (
    <Section title="🖼️ Visual Embeddings" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Just like language models create embeddings for words, Vision
        Transformers create embeddings for <strong>visual features</strong>.
        Features seen together in training images have similar vectors!
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Visual feature space */}
          <div>
            <h4 className="font-semibold text-green-800 mb-2">
              Visual Feature Space:
            </h4>
            <svg
              viewBox="0 0 200 180"
              className="w-full h-48 bg-white rounded-lg"
            >
              {/* Grid lines */}
              {[0.25, 0.5, 0.75].map((v) => (
                <React.Fragment key={v}>
                  <line
                    x1={v * 180 + 10}
                    y1="10"
                    x2={v * 180 + 10}
                    y2="170"
                    stroke="#E5E7EB"
                    strokeWidth="0.5"
                  />
                  <line
                    x1="10"
                    y1={v * 160 + 10}
                    x2="190"
                    y2={v * 160 + 10}
                    stroke="#E5E7EB"
                    strokeWidth="0.5"
                  />
                </React.Fragment>
              ))}

              {/* Connection lines for hovered feature */}
              {hoveredData &&
                visualFeatures.map((feature, i) => {
                  if (hoveredData.related.includes(feature.name)) {
                    return (
                      <line
                        key={i}
                        x1={hoveredData.x * 180 + 10}
                        y1={(1 - hoveredData.y) * 160 + 10}
                        x2={feature.x * 180 + 10}
                        y2={(1 - feature.y) * 160 + 10}
                        stroke="#22C55E"
                        strokeWidth="2"
                        strokeDasharray="4"
                      />
                    );
                  }
                  return null;
                })}

              {/* Feature points */}
              {visualFeatures.map((feature, i) => {
                const x = feature.x * 180 + 10;
                const y = (1 - feature.y) * 160 + 10;
                const isHovered = hoveredFeature === i;
                const isRelated =
                  hoveredData && hoveredData.related.includes(feature.name);

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredFeature(i)}
                    onMouseLeave={() => setHoveredFeature(null)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={x}
                      cy={y}
                      r={isHovered ? 20 : isRelated ? 16 : 14}
                      fill={
                        isHovered
                          ? "#22C55E"
                          : isRelated
                          ? "#86EFAC"
                          : "#F3F4F6"
                      }
                      stroke={isHovered || isRelated ? "#22C55E" : "#D1D5DB"}
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fontSize={isHovered ? "16" : "14"}
                    >
                      {feature.emoji}
                    </text>
                  </g>
                );
              })}

              {/* Cluster labels */}
              <text x="150" y="90" fontSize="8" fill="#22C55E" opacity="0.7">
                Face features
              </text>
              <text x="25" y="60" fontSize="8" fill="#22C55E" opacity="0.7">
                Nature features
              </text>
            </svg>
          </div>

          {/* Explanation */}
          <div>
            <h4 className="font-semibold text-green-800 mb-2">
              {hoveredData
                ? `"${hoveredData.name}" Features:`
                : "Hover over a feature:"}
            </h4>

            {hoveredData ? (
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-3xl mb-2">{hoveredData.emoji}</div>
                  <div className="font-medium text-green-700">
                    {hoveredData.name}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm text-gray-600 mb-2">
                    Often seen with:
                  </div>
                  <div className="flex gap-2">
                    {hoveredData.related.map((rel, i) => {
                      const relFeature = visualFeatures.find(
                        (f) => f.name === rel
                      );
                      return (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm"
                        >
                          {relFeature?.emoji} {rel}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 text-center text-gray-500">
                <span className="text-3xl">👆</span>
                <p className="text-sm mt-2">
                  Hover over features to see semantic relationships
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Key Insight:</strong> The model doesn't "know" what a hat
          or head is — it learns that certain visual patterns (shapes, colors,
          textures) frequently appear together in training images!
        </p>
      </div>
    </Section>
  );
};

const MultimodalSection = () => {
  const [showCrossAttention, setShowCrossAttention] = useState(false);

  return (
    <Section title="🌐 Multimodal Models: Vision + Language" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        <strong>Multimodal models</strong> combine vision and language encoders
        to create a unified embedding space where images and text can be
        compared and related!
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <svg viewBox="0 0 400 200" className="w-full h-56">
          {/* Image encoder side */}
          <rect
            x="20"
            y="20"
            width="140"
            height="160"
            rx="10"
            fill="#8B5CF6"
            opacity="0.1"
            stroke="#8B5CF6"
            strokeWidth="2"
          />
          <text
            x="90"
            y="45"
            textAnchor="middle"
            fontSize="12"
            fill="#8B5CF6"
            fontWeight="bold"
          >
            Vision Encoder
          </text>

          {/* Image */}
          <rect x="50" y="60" width="80" height="50" rx="5" fill="#C4B5FD" />
          <text x="90" y="90" textAnchor="middle" fontSize="24">
            🧑‍🎒
          </text>

          {/* Image patches to embeddings */}
          <g>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={55 + i * 25}
                y="120"
                width="20"
                height="20"
                rx="3"
                fill="#8B5CF6"
                opacity="0.6"
              />
            ))}
            <text
              x="90"
              y="155"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              Visual embeddings
            </text>
          </g>

          {/* Text encoder side */}
          <rect
            x="240"
            y="20"
            width="140"
            height="160"
            rx="10"
            fill="#3B82F6"
            opacity="0.1"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <text
            x="310"
            y="45"
            textAnchor="middle"
            fontSize="12"
            fill="#3B82F6"
            fontWeight="bold"
          >
            Language Encoder
          </text>

          {/* Text tokens */}
          <g>
            {["A", "person", "with", "a", "backpack"].map((word, i) => (
              <text
                key={i}
                x={260 + (i % 3) * 40}
                y={70 + Math.floor(i / 3) * 20}
                fontSize="10"
                fill="#3B82F6"
              >
                {word}
              </text>
            ))}
          </g>

          {/* Text to embeddings */}
          <g>
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={255 + i * 25}
                y="120"
                width="20"
                height="20"
                rx="3"
                fill="#3B82F6"
                opacity="0.6"
              />
            ))}
            <text
              x="310"
              y="155"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              Text embeddings
            </text>
          </g>

          {/* Cross-attention / unified space */}
          {showCrossAttention && (
            <g>
              {/* Connection lines */}
              {[0, 1, 2].map((i) => (
                <line
                  key={i}
                  x1={75 + i * 25}
                  y1="130"
                  x2={265 + i * 25}
                  y2="130"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4"
                  opacity="0.8"
                />
              ))}

              {/* Unified space indicator */}
              <rect
                x="160"
                y="100"
                width="80"
                height="60"
                rx="5"
                fill="#F59E0B"
                opacity="0.2"
                stroke="#F59E0B"
                strokeDasharray="4"
              />
              <text
                x="200"
                y="135"
                textAnchor="middle"
                fontSize="9"
                fill="#F59E0B"
                fontWeight="bold"
              >
                Unified Space
              </text>
            </g>
          )}
        </svg>

        <button
          onClick={() => setShowCrossAttention(!showCrossAttention)}
          className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
        >
          {showCrossAttention
            ? "Hide Cross-Modal Attention"
            : "🔗 Show Cross-Modal Attention"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        {[
          {
            icon: "🖼️",
            title: "Image → Text",
            desc: "Generate captions from images",
          },
          {
            icon: "🔍",
            title: "Text → Image",
            desc: "Search images with text queries",
          },
          {
            icon: "❓",
            title: "Visual Q&A",
            desc: "Answer questions about images",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-amber-800 text-sm">
              {item.title}
            </div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 rounded-lg p-3 border border-green-200">
        <p className="text-sm text-green-800">
          <strong>🎯 How it works:</strong> Cross-modal attention aligns visual
          features with language tokens. The model learns that the visual
          pattern of a backpack relates to the word "backpack" — enabling rich
          image descriptions and visual question answering!
        </p>
      </div>
    </Section>
  );
};

const DemoSection = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const examples = [
    {
      emoji: "🧑‍🎒",
      scene: "Person in park",
      caption: "A person in a park with a hat and a backpack",
      features: ["Person", "Park", "Hat", "Backpack", "Trees", "Outdoor"],
    },
    {
      emoji: "🐕",
      scene: "Dog on beach",
      caption: "A golden retriever running on a sandy beach near the ocean",
      features: ["Dog", "Beach", "Sand", "Ocean", "Running", "Sunny"],
    },
    {
      emoji: "🍕",
      scene: "Food on table",
      caption: "A delicious pepperoni pizza on a wooden table in a restaurant",
      features: ["Pizza", "Table", "Restaurant", "Food", "Indoor", "Wood"],
    },
  ];

  const current = examples[selectedImage];

  return (
    <Section title="✨ Multimodal in Action" color="#6366f1">
      <p className="text-gray-700 mb-4">
        See how multimodal models generate descriptions by connecting visual
        features to language:
      </p>

      <div className="flex justify-center gap-4 mb-4">
        {examples.map((ex, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`w-20 h-20 rounded-xl text-4xl transition-all ${
              selectedImage === i
                ? "bg-indigo-100 ring-4 ring-indigo-400 scale-110"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {ex.emoji}
          </button>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl p-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Image side */}
          <div className="text-center">
            <div className="bg-white rounded-xl p-6 mb-3">
              <span className="text-8xl">{current.emoji}</span>
            </div>
            <div className="text-sm text-gray-500">{current.scene}</div>
          </div>

          {/* Analysis side */}
          <div>
            <h4 className="font-semibold text-indigo-800 mb-2">
              Detected Visual Features:
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {current.features.map((feature, i) => (
                <span
                  key={i}
                  className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            <h4 className="font-semibold text-indigo-800 mb-2">
              Generated Caption:
            </h4>
            <div className="bg-white rounded-lg p-3 border-2 border-indigo-300">
              <p className="text-gray-700 italic">"{current.caption}"</p>
            </div>

            <div className="mt-3 text-xs text-indigo-600">
              Visual features → Cross-modal attention → Natural language
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">
          🎯 Vision Transformers
        </h3>
        <p className="text-sm text-purple-700">
          Split images into patches, apply self-attention. Each patch can "see"
          all other patches for global understanding.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">🖼️ Visual Embeddings</h3>
        <p className="text-sm text-green-700">
          Visual features are encoded as vectors. Features seen together
          (hat/head) have similar embeddings.
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">🌐 Multimodal Models</h3>
        <p className="text-sm text-amber-700">
          Combine vision + language encoders. Cross-modal attention creates
          unified embedding space.
        </p>
      </div>
      <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-4 border border-indigo-200">
        <h3 className="font-bold text-indigo-800 mb-2">✨ Capabilities</h3>
        <p className="text-sm text-indigo-700">
          Image captioning, visual Q&A, text-to-image search, zero-shot
          classification, and more!
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Vision Transformers brought the power of attention to computer vision,
        enabling global context from the start. Multimodal models took this
        further by unifying vision and language — the same architecture that
        powers GPT-4V, CLIP, and Azure's multimodal AI services. Understanding
        these concepts is key to working with modern AI systems at Microsoft!
      </p>
    </div>
  </Section>
);

export default function VisionTransformerGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎯 Vision Transformers & Multimodal Models
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Modern Computer Vision Architecture
          </p>
        </div>

        <EvolutionSection />
        <TransformerRecap />
        <VisionTransformerSection />
        <VisualEmbeddingsSection />
        <MultimodalSection />
        <DemoSection />
        <SummarySection />
      </div>
    </div>
  );
}
