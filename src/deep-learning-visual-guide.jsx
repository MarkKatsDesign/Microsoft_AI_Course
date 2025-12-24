import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const BrainComparison = () => (
  <Section title="🧠 Biological vs Artificial Neurons" color="#8b5cf6">
    <p className="text-gray-700 mb-4">
      Deep learning is inspired by how our brains work. Let's compare:
    </p>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-300">
        <h3 className="font-bold text-purple-800 mb-3">🧬 Biological Neuron</h3>
        <svg viewBox="0 0 200 120" className="w-full h-32 mb-3">
          {/* Dendrites */}
          {[
            [20, 30],
            [15, 60],
            [25, 90],
          ].map(([x, y], i) => (
            <g key={i}>
              <line
                x1={x}
                y1={y}
                x2="60"
                y2="60"
                stroke="#9333EA"
                strokeWidth="2"
              />
              <circle cx={x} cy={y} r="8" fill="#C084FC" />
              <text
                x={x}
                y={y + 3}
                textAnchor="middle"
                fontSize="6"
                fill="white"
              >
                in
              </text>
            </g>
          ))}
          {/* Cell body */}
          <ellipse cx="80" cy="60" rx="25" ry="20" fill="#9333EA" />
          <text x="80" y="64" textAnchor="middle" fontSize="8" fill="white">
            Process
          </text>
          {/* Axon */}
          <line
            x1="105"
            y1="60"
            x2="160"
            y2="60"
            stroke="#9333EA"
            strokeWidth="3"
          />
          {/* Output */}
          <circle cx="175" cy="60" r="12" fill="#7C3AED" />
          <text x="175" y="64" textAnchor="middle" fontSize="7" fill="white">
            out
          </text>
        </svg>
        <ul className="text-sm text-purple-700 space-y-1">
          <li>
            • <strong>Dendrites</strong> receive signals
          </li>
          <li>
            • <strong>Cell body</strong> processes them
          </li>
          <li>
            • <strong>Axon</strong> sends output if threshold met
          </li>
        </ul>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-300">
        <h3 className="font-bold text-blue-800 mb-3">🤖 Artificial Neuron</h3>
        <svg viewBox="0 0 200 120" className="w-full h-32 mb-3">
          {/* Inputs with weights */}
          {[
            { y: 25, label: "x₁", w: "w₁" },
            { y: 60, label: "x₂", w: "w₂" },
            { y: 95, label: "x₃", w: "w₃" },
          ].map((item, i) => (
            <g key={i}>
              <circle cx="20" cy={item.y} r="12" fill="#3B82F6" />
              <text
                x="20"
                y={item.y + 4}
                textAnchor="middle"
                fontSize="8"
                fill="white"
              >
                {item.label}
              </text>
              <line
                x1="32"
                y1={item.y}
                x2="70"
                y2="60"
                stroke="#3B82F6"
                strokeWidth="2"
              />
              <text
                x="45"
                y={item.y - 5 + (60 - item.y) * 0.3}
                fontSize="7"
                fill="#1D4ED8"
              >
                ×{item.w}
              </text>
            </g>
          ))}
          {/* Neuron */}
          <circle cx="90" cy="60" r="22" fill="#2563EB" />
          <text x="90" y="56" textAnchor="middle" fontSize="7" fill="white">
            Σ + b
          </text>
          <text x="90" y="68" textAnchor="middle" fontSize="6" fill="#BFDBFE">
            sum
          </text>
          {/* Activation */}
          <rect x="125" y="45" width="30" height="30" rx="5" fill="#1D4ED8" />
          <text x="140" y="58" textAnchor="middle" fontSize="6" fill="white">
            f(x)
          </text>
          <text x="140" y="68" textAnchor="middle" fontSize="5" fill="#93C5FD">
            activate
          </text>
          <line
            x1="112"
            y1="60"
            x2="125"
            y2="60"
            stroke="#2563EB"
            strokeWidth="2"
          />
          {/* Output */}
          <line
            x1="155"
            y1="60"
            x2="175"
            y2="60"
            stroke="#2563EB"
            strokeWidth="2"
          />
          <circle cx="185" cy="60" r="10" fill="#3B82F6" />
          <text x="185" y="63" textAnchor="middle" fontSize="7" fill="white">
            ŷ
          </text>
        </svg>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>
            • <strong>Inputs (x)</strong> multiplied by{" "}
            <strong>weights (w)</strong>
          </li>
          <li>
            • <strong>Sum</strong> all weighted inputs + bias
          </li>
          <li>
            • <strong>Activation function</strong> decides output
          </li>
        </ul>
      </div>
    </div>

    <div className="mt-4 bg-gray-100 rounded-lg p-4">
      <p className="text-sm text-gray-700">
        <strong>The math:</strong> output = f(x₁×w₁ + x₂×w₂ + x₃×w₃ + b) where f
        is the activation function
      </p>
    </div>
  </Section>
);

const NetworkArchitecture = () => {
  const [hoveredLayer, setHoveredLayer] = useState(null);

  const layers = [
    {
      name: "Input Layer",
      neurons: 4,
      color: "#3B82F6",
      desc: "Receives raw features (penguin measurements)",
    },
    {
      name: "Hidden Layer 1",
      neurons: 5,
      color: "#8B5CF6",
      desc: "Learns patterns from combinations of inputs",
    },
    {
      name: "Hidden Layer 2",
      neurons: 4,
      color: "#A855F7",
      desc: "Learns more complex/abstract patterns",
    },
    {
      name: "Output Layer",
      neurons: 3,
      color: "#22C55E",
      desc: "Produces final predictions (one per class)",
    },
  ];

  return (
    <Section title="🏗️ Neural Network Architecture" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        A "deep" neural network has multiple layers stacked together.{" "}
        <strong>Hover over each layer</strong> to learn more:
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <svg viewBox="0 0 400 250" className="w-full h-64">
            {/* Draw connections first (behind neurons) */}
            {layers.slice(0, -1).map((layer, layerIdx) => {
              const nextLayer = layers[layerIdx + 1];
              const x1 = 60 + layerIdx * 100;
              const x2 = 60 + (layerIdx + 1) * 100;
              const connections = [];

              for (let i = 0; i < layer.neurons; i++) {
                for (let j = 0; j < nextLayer.neurons; j++) {
                  const y1 = 125 - (layer.neurons - 1) * 20 + i * 40;
                  const y2 = 125 - (nextLayer.neurons - 1) * 20 + j * 40;
                  connections.push(
                    <line
                      key={`${layerIdx}-${i}-${j}`}
                      x1={x1 + 15}
                      y1={y1}
                      x2={x2 - 15}
                      y2={y2}
                      stroke="#E5E7EB"
                      strokeWidth="1"
                      opacity={
                        hoveredLayer === layerIdx ||
                        hoveredLayer === layerIdx + 1
                          ? 0.8
                          : 0.3
                      }
                    />
                  );
                }
              }
              return connections;
            })}

            {/* Draw neurons */}
            {layers.map((layer, layerIdx) => {
              const x = 60 + layerIdx * 100;
              const isHovered = hoveredLayer === layerIdx;

              return (
                <g
                  key={layerIdx}
                  onMouseEnter={() => setHoveredLayer(layerIdx)}
                  onMouseLeave={() => setHoveredLayer(null)}
                  style={{ cursor: "pointer" }}
                >
                  {Array.from({ length: layer.neurons }).map((_, neuronIdx) => {
                    const y = 125 - (layer.neurons - 1) * 20 + neuronIdx * 40;
                    return (
                      <circle
                        key={neuronIdx}
                        cx={x}
                        cy={y}
                        r={isHovered ? 18 : 15}
                        fill={layer.color}
                        stroke="white"
                        strokeWidth="3"
                        className="transition-all duration-200"
                      />
                    );
                  })}
                  <text
                    x={x}
                    y={230}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isHovered ? layer.color : "#6B7280"}
                    fontWeight={isHovered ? "bold" : "normal"}
                  >
                    {layer.name}
                  </text>
                </g>
              );
            })}

            {/* Labels */}
            <text x="60" y="20" textAnchor="middle" fontSize="9" fill="#6B7280">
              x₁,x₂,x₃,x₄
            </text>
            <text
              x="360"
              y="85"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              Adelie
            </text>
            <text
              x="360"
              y="125"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              Gentoo
            </text>
            <text
              x="360"
              y="165"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              Chinstrap
            </text>
          </svg>
        </div>

        <div className="md:w-64">
          <div
            className={`p-4 rounded-xl border-2 transition-all ${
              hoveredLayer !== null
                ? `border-${hoveredLayer === 3 ? "green" : "purple"}-300 bg-${
                    hoveredLayer === 3 ? "green" : "purple"
                  }-50`
                : "border-gray-200 bg-gray-50"
            }`}
            style={{
              borderColor:
                hoveredLayer !== null ? layers[hoveredLayer].color : "#E5E7EB",
              backgroundColor:
                hoveredLayer !== null
                  ? `${layers[hoveredLayer].color}10`
                  : "#F9FAFB",
            }}
          >
            {hoveredLayer !== null ? (
              <>
                <h3
                  className="font-bold mb-2"
                  style={{ color: layers[hoveredLayer].color }}
                >
                  {layers[hoveredLayer].name}
                </h3>
                <p className="text-sm text-gray-700">
                  {layers[hoveredLayer].desc}
                </p>
                <p className="text-sm mt-2 font-mono bg-white rounded px-2 py-1">
                  {layers[hoveredLayer].neurons} neurons
                </p>
              </>
            ) : (
              <p className="text-gray-500 italic">
                👆 Hover over a layer to learn more
              </p>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              <strong>Why "deep"?</strong>
            </p>
            <p>Multiple hidden layers = deeply nested functions!</p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const ForwardPassDemo = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const steps = [
    {
      title: "Input Features",
      desc: "Penguin measurements enter the network",
      highlight: "input",
      values: ["37.3", "16.8", "19.2", "30.0"],
    },
    {
      title: "Hidden Layer 1",
      desc: "Each neuron computes: Σ(inputs × weights) + bias, then applies activation",
      highlight: "hidden1",
      values: ["0.8", "0.3", "0.9"],
    },
    {
      title: "Hidden Layer 2",
      desc: "Deeper patterns emerge from combinations of previous layer",
      highlight: "hidden2",
      values: ["0.6", "0.7"],
    },
    {
      title: "Output (Softmax)",
      desc: "Probabilities for each class (must sum to 1.0)",
      highlight: "output",
      values: ["0.2", "0.7", "0.1"],
    },
    {
      title: "Prediction!",
      desc: "Highest probability wins: Gentoo (0.7)",
      highlight: "result",
      values: ["0.2", "0.7", "0.1"],
    },
  ];

  useEffect(() => {
    let interval;
    let timeout;
    if (isPlaying && step < steps.length - 1) {
      interval = setInterval(() => {
        setStep((s) => s + 1);
      }, 1500);
    } else if (isPlaying && step >= steps.length - 1) {
      timeout = setTimeout(() => {
        setIsPlaying(false);
      }, 0);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPlaying, step, steps.length]);

  const getLayerOpacity = (layer) => {
    const highlights = {
      input: step >= 0 ? 1 : 0.3,
      hidden1: step >= 1 ? 1 : 0.3,
      hidden2: step >= 2 ? 1 : 0.3,
      output: step >= 3 ? 1 : 0.3,
    };
    return highlights[layer];
  };

  return (
    <Section title="➡️ Forward Pass: Data Flowing Through" color="#10b981">
      <p className="text-gray-700 mb-4">
        Watch how penguin measurements travel through the network to produce a
        prediction:
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsPlaying(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
        >
          ▶️ Play Forward Pass
        </button>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          ←
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          →
        </button>
      </div>

      <div className="bg-green-50 rounded-xl p-4 border border-green-200 mb-4">
        <h3 className="font-bold text-green-800">{steps[step].title}</h3>
        <p className="text-sm text-green-700">{steps[step].desc}</p>
      </div>

      <svg viewBox="0 0 500 200" className="w-full h-56">
        {/* Input layer */}
        <g
          opacity={getLayerOpacity("input")}
          className="transition-opacity duration-500"
        >
          {["37.3", "16.8", "19.2", "30.0"].map((val, i) => (
            <g key={i}>
              <circle cx="50" cy={40 + i * 40} r="20" fill="#3B82F6" />
              <text
                x="50"
                y={44 + i * 40}
                textAnchor="middle"
                fontSize="9"
                fill="white"
                fontWeight="bold"
              >
                {val}
              </text>
              {step === 0 && (
                <text
                  x="15"
                  y={44 + i * 40}
                  textAnchor="end"
                  fontSize="8"
                  fill="#3B82F6"
                >
                  x{i + 1}
                </text>
              )}
            </g>
          ))}
          <text x="50" y="195" textAnchor="middle" fontSize="9" fill="#6B7280">
            Input
          </text>
        </g>

        {/* Hidden layer 1 */}
        <g
          opacity={getLayerOpacity("hidden1")}
          className="transition-opacity duration-500"
        >
          {step >= 1 &&
            ["0.8", "0.3", "0.9"].map((val, i) => (
              <g key={i}>
                <circle cx="170" cy={60 + i * 45} r="20" fill="#8B5CF6" />
                <text
                  x="170"
                  y={64 + i * 45}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  {val}
                </text>
              </g>
            ))}
          {step < 1 &&
            [0, 1, 2].map((i) => (
              <circle
                key={i}
                cx="170"
                cy={60 + i * 45}
                r="20"
                fill="#8B5CF6"
                opacity="0.5"
              />
            ))}
          <text x="170" y="195" textAnchor="middle" fontSize="9" fill="#6B7280">
            Hidden 1
          </text>
        </g>

        {/* Hidden layer 2 */}
        <g
          opacity={getLayerOpacity("hidden2")}
          className="transition-opacity duration-500"
        >
          {step >= 2 &&
            ["0.6", "0.7"].map((val, i) => (
              <g key={i}>
                <circle cx="290" cy={80 + i * 50} r="20" fill="#A855F7" />
                <text
                  x="290"
                  y={84 + i * 50}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  {val}
                </text>
              </g>
            ))}
          {step < 2 &&
            [0, 1].map((i) => (
              <circle
                key={i}
                cx="290"
                cy={80 + i * 50}
                r="20"
                fill="#A855F7"
                opacity="0.5"
              />
            ))}
          <text x="290" y="195" textAnchor="middle" fontSize="9" fill="#6B7280">
            Hidden 2
          </text>
        </g>

        {/* Output layer */}
        <g
          opacity={getLayerOpacity("output")}
          className="transition-opacity duration-500"
        >
          {[
            { val: "0.2", label: "Adelie", win: false },
            { val: "0.7", label: "Gentoo", win: true },
            { val: "0.1", label: "Chinstrap", win: false },
          ].map((item, i) => (
            <g key={i}>
              <circle
                cx="410"
                cy={60 + i * 45}
                r="20"
                fill={step >= 4 && item.win ? "#22C55E" : "#10B981"}
                stroke={step >= 4 && item.win ? "#166534" : "none"}
                strokeWidth="3"
              />
              <text
                x="410"
                y={64 + i * 45}
                textAnchor="middle"
                fontSize="10"
                fill="white"
                fontWeight="bold"
              >
                {step >= 3 ? item.val : "?"}
              </text>
              <text
                x="455"
                y={64 + i * 45}
                fontSize="8"
                fill={step >= 4 && item.win ? "#166534" : "#6B7280"}
                fontWeight={step >= 4 && item.win ? "bold" : "normal"}
              >
                {item.label} {step >= 4 && item.win && "✓"}
              </text>
            </g>
          ))}
          <text x="410" y="195" textAnchor="middle" fontSize="9" fill="#6B7280">
            Output
          </text>
        </g>

        {/* Connections (simplified) */}
        <g opacity="0.2">
          <line
            x1="70"
            y1="100"
            x2="150"
            y2="100"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <line
            x1="190"
            y1="100"
            x2="270"
            y2="100"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
          <line
            x1="310"
            y1="100"
            x2="390"
            y2="100"
            stroke="#9CA3AF"
            strokeWidth="1"
          />
        </g>

        {/* Flow arrow */}
        {step < 4 && (
          <g>
            <polygon
              points={`${80 + step * 120},15 ${95 + step * 120},25 ${
                80 + step * 120
              },35`}
              fill="#10B981"
              className="animate-pulse"
            />
          </g>
        )}
      </svg>
    </Section>
  );
};

const TrainingProcess = () => {
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const lossValues = [2.5, 1.8, 1.2, 0.7, 0.4, 0.25, 0.15, 0.1];
  const accuracyValues = [33, 45, 58, 72, 83, 89, 94, 97];

  useEffect(() => {
    let interval;
    if (isTraining && epoch < lossValues.length - 1) {
      interval = setInterval(() => {
        setEpoch((e) => e + 1);
      }, 800);
    } else if (isTraining && epoch >= lossValues.length - 1) {
      interval = setTimeout(() => {
        setIsTraining(false);
      }, 0);
    }
    return () => {
      clearInterval(interval);
      clearTimeout(interval);
    };
  }, [isTraining, epoch, lossValues.length]);

  return (
    <Section title="📚 How Neural Networks Learn (Training)" color="#f59e0b">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="font-semibold mb-3">The Training Loop:</h3>
          <div className="space-y-2">
            {[
              { icon: "1️⃣", text: "Forward pass: Make predictions" },
              { icon: "2️⃣", text: "Calculate loss: How wrong were we?" },
              {
                icon: "3️⃣",
                text: "Backpropagation: Find which weights caused errors",
              },
              { icon: "4️⃣", text: "Update weights: Adjust to reduce loss" },
              { icon: "🔁", text: "Repeat for many epochs!" },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  i === 4 ? "bg-amber-100" : "bg-gray-50"
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold mb-2">Loss vs Epochs</h3>
          <svg viewBox="0 0 200 120" className="w-full h-32">
            {/* Axes */}
            <line
              x1="30"
              y1="100"
              x2="190"
              y2="100"
              stroke="#374151"
              strokeWidth="2"
            />
            <line
              x1="30"
              y1="100"
              x2="30"
              y2="10"
              stroke="#374151"
              strokeWidth="2"
            />
            <text
              x="110"
              y="115"
              textAnchor="middle"
              fontSize="8"
              fill="#6B7280"
            >
              Epochs (training iterations)
            </text>
            <text
              x="12"
              y="55"
              fontSize="8"
              fill="#6B7280"
              transform="rotate(-90 12 55)"
            >
              Loss
            </text>

            {/* Loss curve */}
            <path
              d={`M 30,${100 - lossValues[0] * 30} ${lossValues
                .slice(0, epoch + 1)
                .map((v, i) => `L ${30 + i * 22},${100 - v * 30}`)
                .join(" ")}`}
              fill="none"
              stroke="#EF4444"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Current point */}
            <circle
              cx={30 + epoch * 22}
              cy={100 - lossValues[epoch] * 30}
              r="5"
              fill="#EF4444"
            />

            {/* Labels */}
            <text x="45" y="25" fontSize="8" fill="#EF4444">
              High loss
            </text>
            <text x="150" y="95" fontSize="8" fill="#22C55E">
              Low loss ✓
            </text>
          </svg>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => {
            setEpoch(0);
            setIsTraining(true);
          }}
          className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-all"
        >
          🏋️ Train the Network
        </button>
        <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
            style={{ width: `${(epoch / (lossValues.length - 1)) * 100}%` }}
          />
        </div>
        <span className="font-mono text-sm">
          Epoch {epoch + 1}/{lossValues.length}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-red-50 rounded-lg p-3 border border-red-200">
          <div className="text-sm text-red-600">Loss</div>
          <div className="text-2xl font-bold text-red-700">
            {lossValues[epoch].toFixed(2)}
          </div>
          <div className="text-xs text-red-500">Lower is better ↓</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="text-sm text-green-600">Accuracy</div>
          <div className="text-2xl font-bold text-green-700">
            {accuracyValues[epoch]}%
          </div>
          <div className="text-xs text-green-500">Higher is better ↑</div>
        </div>
      </div>
    </Section>
  );
};

const BackpropExplanation = () => (
  <Section title="🔄 Backpropagation: The Learning Magic" color="#ec4899">
    <p className="text-gray-700 mb-4">
      How does the network know which weights to change?{" "}
      <strong>Backpropagation</strong> traces errors backward!
    </p>

    <div className="bg-pink-50 rounded-xl p-4 mb-4">
      <svg viewBox="0 0 400 150" className="w-full h-40">
        {/* Simplified network */}
        <circle cx="50" cy="75" r="20" fill="#3B82F6" />
        <text x="50" y="79" textAnchor="middle" fontSize="9" fill="white">
          Input
        </text>

        <circle cx="150" cy="75" r="20" fill="#8B5CF6" />
        <text x="150" y="79" textAnchor="middle" fontSize="9" fill="white">
          Hidden
        </text>

        <circle cx="250" cy="75" r="20" fill="#10B981" />
        <text x="250" y="79" textAnchor="middle" fontSize="9" fill="white">
          Output
        </text>

        <circle cx="350" cy="75" r="20" fill="#EF4444" />
        <text x="350" y="79" textAnchor="middle" fontSize="9" fill="white">
          Loss
        </text>

        {/* Forward arrows */}
        <path
          d="M 70,75 L 125,75"
          stroke="#9CA3AF"
          strokeWidth="2"
          markerEnd="url(#arrowGray)"
        />
        <path
          d="M 170,75 L 225,75"
          stroke="#9CA3AF"
          strokeWidth="2"
          markerEnd="url(#arrowGray)"
        />
        <path
          d="M 270,75 L 325,75"
          stroke="#9CA3AF"
          strokeWidth="2"
          markerEnd="url(#arrowGray)"
        />

        {/* Backward arrows (backprop) */}
        <path
          d="M 330,95 C 300,130 200,130 170,95"
          stroke="#EC4899"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,3"
        />
        <path
          d="M 130,95 C 100,130 80,110 70,95"
          stroke="#EC4899"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,3"
        />

        {/* Labels */}
        <text x="200" y="30" textAnchor="middle" fontSize="10" fill="#6B7280">
          Forward Pass →
        </text>
        <text x="200" y="145" textAnchor="middle" fontSize="10" fill="#EC4899">
          ← Backpropagation (adjust weights)
        </text>

        <defs>
          <marker
            id="arrowGray"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#9CA3AF" />
          </marker>
        </defs>
      </svg>
    </div>

    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg p-3 border border-pink-200">
        <h4 className="font-semibold text-pink-700 mb-1">1. Calculate Error</h4>
        <p className="text-sm text-gray-600">
          Compare prediction to actual answer (loss function)
        </p>
      </div>
      <div className="bg-white rounded-lg p-3 border border-pink-200">
        <h4 className="font-semibold text-pink-700 mb-1">
          2. Compute Gradients
        </h4>
        <p className="text-sm text-gray-600">
          Use calculus to find how each weight affected the error
        </p>
      </div>
      <div className="bg-white rounded-lg p-3 border border-pink-200">
        <h4 className="font-semibold text-pink-700 mb-1">3. Update Weights</h4>
        <p className="text-sm text-gray-600">
          Nudge weights in the direction that reduces error
        </p>
      </div>
    </div>

    <div className="mt-4 bg-gray-100 rounded-lg p-4">
      <p className="text-sm text-gray-700">
        <strong>Analogy:</strong> Imagine you're blindfolded, trying to walk
        downhill. You feel the slope at your feet (gradient) and step in the
        steepest downward direction. That's gradient descent!
      </p>
    </div>
  </Section>
);

const ActivationFunctions = () => {
  const [selected, setSelected] = useState("relu");

  const functions = {
    relu: {
      name: "ReLU",
      formula: "max(0, x)",
      desc: "Most popular! Returns x if positive, 0 otherwise",
      color: "#3B82F6",
    },
    sigmoid: {
      name: "Sigmoid",
      formula: "1 / (1 + e⁻ˣ)",
      desc: "Squashes values between 0 and 1 (probabilities)",
      color: "#8B5CF6",
    },
    softmax: {
      name: "Softmax",
      formula: "eˣⁱ / Σeˣ",
      desc: "Output layer for classification: all outputs sum to 1",
      color: "#22C55E",
    },
  };

  return (
    <Section
      title="⚡ Activation Functions: The Decision Makers"
      color="#6366f1"
    >
      <p className="text-gray-700 mb-4">
        Activation functions add <strong>non-linearity</strong> — without them,
        the network would just be fancy linear regression!
      </p>

      <div className="flex gap-2 mb-4">
        {Object.entries(functions).map(([key, func]) => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all`}
            style={{
              backgroundColor: selected === key ? func.color : "#F3F4F6",
              color: selected === key ? "white" : "#4B5563",
            }}
          >
            {func.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-xl p-4">
          <svg viewBox="0 0 200 150" className="w-full h-40">
            {/* Axes */}
            <line
              x1="20"
              y1="75"
              x2="180"
              y2="75"
              stroke="#9CA3AF"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="10"
              x2="100"
              y2="140"
              stroke="#9CA3AF"
              strokeWidth="1"
            />
            <text x="185" y="78" fontSize="10" fill="#6B7280">
              x
            </text>
            <text x="103" y="15" fontSize="10" fill="#6B7280">
              y
            </text>

            {/* Function curves */}
            {selected === "relu" && (
              <path
                d="M 20,75 L 100,75 L 180,10"
                stroke="#3B82F6"
                strokeWidth="3"
                fill="none"
              />
            )}
            {selected === "sigmoid" && (
              <path
                d="M 20,130 Q 60,130 100,75 Q 140,20 180,20"
                stroke="#8B5CF6"
                strokeWidth="3"
                fill="none"
              />
            )}
            {selected === "softmax" && (
              <>
                <rect
                  x="130"
                  y="30"
                  width="40"
                  height="20"
                  fill="#22C55E20"
                  stroke="#22C55E"
                  strokeWidth="2"
                  rx="3"
                />
                <rect
                  x="130"
                  y="55"
                  width="25"
                  height="20"
                  fill="#22C55E20"
                  stroke="#22C55E"
                  strokeWidth="2"
                  rx="3"
                />
                <rect
                  x="130"
                  y="80"
                  width="15"
                  height="20"
                  fill="#22C55E20"
                  stroke="#22C55E"
                  strokeWidth="2"
                  rx="3"
                />
                <text x="50" y="60" fontSize="9" fill="#6B7280">
                  Raw scores
                </text>
                <text x="50" y="75" fontSize="9" fill="#6B7280">
                  [2.0, 1.0, 0.5]
                </text>
                <text x="135" y="43" fontSize="8" fill="#22C55E">
                  0.59
                </text>
                <text x="135" y="68" fontSize="8" fill="#22C55E">
                  0.29
                </text>
                <text x="135" y="93" fontSize="8" fill="#22C55E">
                  0.12
                </text>
                <text x="150" y="115" fontSize="8" fill="#6B7280">
                  = 1.0
                </text>
              </>
            )}
          </svg>
        </div>

        <div className="flex flex-col justify-center">
          <h3
            className="font-bold text-lg mb-2"
            style={{ color: functions[selected].color }}
          >
            {functions[selected].name}
          </h3>
          <div className="font-mono bg-gray-100 rounded px-3 py-2 mb-3">
            f(x) = {functions[selected].formula}
          </div>
          <p className="text-gray-700">{functions[selected].desc}</p>
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🧠 Inspired by Biology</h3>
        <p className="text-sm text-blue-700">
          Artificial neurons mimic biological ones: receive inputs, apply
          weights, use activation functions to "fire" or not.
        </p>
      </div>
      <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">
          🏗️ Layered Architecture
        </h3>
        <p className="text-sm text-purple-700">
          Input → Hidden layers (learn patterns) → Output. More layers =
          "deeper" network = can learn more complex patterns.
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">➡️ Forward Pass</h3>
        <p className="text-sm text-green-700">
          Data flows input→output, each neuron computing weighted sum +
          activation. Final layer outputs predictions.
        </p>
      </div>
      <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">🔄 Backpropagation</h3>
        <p className="text-sm text-amber-700">
          Errors flow backward to adjust weights. Repeat over many epochs until
          loss is minimized and predictions are accurate.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        A neural network is essentially a very complex function with millions of
        adjustable knobs (weights). Training = finding the right knob settings
        so that inputs produce correct outputs. The magic of deep learning is
        that given enough data and layers, it can learn incredibly complex
        patterns automatically!
      </p>
    </div>
  </Section>
);

export default function DeepLearningGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 Deep Learning & Neural Networks
          </h1>
          <p className="text-gray-600">A Visual Guide to How Machines Learn</p>
        </div>

        <BrainComparison />
        <NetworkArchitecture />
        <ForwardPassDemo />
        <ActivationFunctions />
        <TrainingProcess />
        <BackpropExplanation />
        <SummarySection />
      </div>
    </div>
  );
}
