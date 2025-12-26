import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const CNNOverview = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: 1,
      title: "Input Image",
      icon: "🖼️",
      color: "#3B82F6",
      desc: "Images with known labels are fed into the network",
    },
    {
      num: 2,
      title: "Convolution + Pooling",
      icon: "🔲",
      color: "#8B5CF6",
      desc: "Filters extract features, pooling reduces size",
    },
    {
      num: 3,
      title: "Flatten",
      icon: "📏",
      color: "#22C55E",
      desc: "Feature maps become a 1D array",
    },
    {
      num: 4,
      title: "Fully Connected",
      icon: "🧠",
      color: "#F59E0B",
      desc: "Dense neural network layers",
    },
    {
      num: 5,
      title: "Output (Softmax)",
      icon: "🎯",
      color: "#EF4444",
      desc: "Probability for each class",
    },
  ];

  return (
    <Section title="🧠 CNN Architecture Overview" color="#1e293b">
      <p className="text-gray-700 mb-4">
        A <strong>Convolutional Neural Network (CNN)</strong> uses learned
        filters to extract features from images, then feeds those features into
        a neural network for classification.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => setActiveStep(i)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all min-w-20 ${
                  activeStep === i
                    ? "scale-110 ring-4 ring-opacity-50"
                    : "hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    activeStep === i ? step.color : `${step.color}20`,
                  ringColor: step.color,
                }}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 ${
                    activeStep === i ? "bg-white text-gray-800" : "bg-white/50"
                  }`}
                >
                  {step.num}
                </div>
                <span className="text-2xl">{step.icon}</span>
                <span
                  className={`text-xs font-medium mt-1 text-center ${
                    activeStep === i ? "text-white" : "text-gray-700"
                  }`}
                >
                  {step.title}
                </span>
              </button>
              {i < steps.length - 1 && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-gray-400 flex-shrink-0"
                >
                  <path
                    d="M 4,12 L 16,12 M 12,8 L 16,12 L 12,16"
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
          borderColor: steps[activeStep].color,
          backgroundColor: `${steps[activeStep].color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: steps[activeStep].color }}
          >
            {steps[activeStep].num}
          </div>
          <div>
            <h3
              className="font-bold"
              style={{ color: steps[activeStep].color }}
            >
              {steps[activeStep].title}
            </h3>
            <p className="text-sm text-gray-600">{steps[activeStep].desc}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 bg-blue-50 rounded-lg p-3 border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>🎯 Goal:</strong> Extract meaningful features from images
          automatically, then use those features to classify what's in the image
          (e.g., apple, banana, or orange).
        </p>
      </div>
    </Section>
  );
};

const ConvolutionLayerSection = () => {
  const [showFeatureMaps, setShowFeatureMaps] = useState(false);

  // Simulated input image (simplified fruit shape)
  const inputImage = [
    [50, 50, 50, 50, 50, 50, 50, 50],
    [50, 50, 100, 150, 150, 100, 50, 50],
    [50, 100, 200, 255, 255, 200, 100, 50],
    [50, 150, 255, 255, 255, 255, 150, 50],
    [50, 150, 255, 255, 255, 255, 150, 50],
    [50, 100, 200, 255, 255, 200, 100, 50],
    [50, 50, 100, 150, 150, 100, 50, 50],
    [50, 50, 50, 50, 50, 50, 50, 50],
  ];

  const filters = [
    {
      name: "Edge Filter",
      kernel: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1],
      ],
      color: "#3B82F6",
    },
    {
      name: "Horizontal",
      kernel: [
        [-1, -1, -1],
        [2, 2, 2],
        [-1, -1, -1],
      ],
      color: "#22C55E",
    },
    {
      name: "Vertical",
      kernel: [
        [-1, 2, -1],
        [-1, 2, -1],
        [-1, 2, -1],
      ],
      color: "#F59E0B",
    },
  ];

  return (
    <Section title="🔲 Step 1-2: Convolution Layers" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Unlike traditional filters with fixed kernels,{" "}
        <strong>CNN filters are learned during training</strong>. The network
        discovers which filters best extract useful features!
      </p>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-purple-800 mb-2">Input Image</h4>
            <div className="flex justify-center">
              <div
                className="grid gap-0 border-2 border-purple-400"
                style={{ gridTemplateColumns: "repeat(8, 20px)" }}
              >
                {inputImage.flat().map((val, i) => (
                  <div
                    key={i}
                    className="w-5 h-5"
                    style={{ backgroundColor: `rgb(${val}, ${val * 0.8}, 0)` }}
                  />
                ))}
              </div>
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              8×8 image of fruit (orange)
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-purple-800 mb-2">
              Learned Filters
            </h4>
            <div className="space-y-2">
              {filters.map((filter, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="grid gap-0 border"
                    style={{
                      gridTemplateColumns: "repeat(3, 20px)",
                      borderColor: filter.color,
                    }}
                  >
                    {filter.kernel.flat().map((val, j) => (
                      <div
                        key={j}
                        className="w-5 h-5 flex items-center justify-center text-xs font-mono"
                        style={{
                          backgroundColor:
                            val > 0
                              ? "#BBF7D0"
                              : val < 0
                              ? "#FECACA"
                              : "#F3F4F6",
                          color: "#374151",
                        }}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm" style={{ color: filter.color }}>
                    {filter.name}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Weights learned from training data
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowFeatureMaps(!showFeatureMaps)}
          className="w-full mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {showFeatureMaps
            ? "Hide Feature Maps"
            : "📊 Show Feature Maps (Convolution Output)"}
        </button>

        {showFeatureMaps && (
          <div className="mt-4 bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">
              Feature Maps (one per filter):
            </h4>
            <div className="flex justify-center gap-4 flex-wrap">
              {filters.map((filter, i) => (
                <div key={i} className="text-center">
                  <div
                    className="grid gap-0 border-2"
                    style={{
                      gridTemplateColumns: "repeat(6, 16px)",
                      borderColor: filter.color,
                    }}
                  >
                    {Array(36)
                      .fill(0)
                      .map((_, j) => {
                        // Simulate different feature map patterns
                        const row = Math.floor(j / 6);
                        const col = j % 6;
                        let intensity;
                        if (i === 0) {
                          // Edge
                          intensity =
                            row === 0 || row === 5 || col === 0 || col === 5
                              ? 200
                              : row === 1 || row === 4 || col === 1 || col === 4
                              ? 150
                              : 50;
                        } else if (i === 1) {
                          // Horizontal
                          intensity = row === 2 || row === 3 ? 200 : 80;
                        } else {
                          // Vertical
                          intensity = col === 2 || col === 3 ? 200 : 80;
                        }
                        return (
                          <div
                            key={j}
                            className="w-4 h-4"
                            style={{
                              backgroundColor: `rgb(${intensity}, ${intensity}, ${intensity})`,
                            }}
                          />
                        );
                      })}
                  </div>
                  <div className="text-xs mt-1" style={{ color: filter.color }}>
                    {filter.name}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-center text-gray-500 mt-2">
              Each filter produces a 6×6 feature map (8-3+1=6)
            </p>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>🔑 Key Difference from Traditional Filters:</strong> CNN
          filter weights start random and are adjusted during training to
          minimize classification error. The network <em>learns</em> which
          features matter!
        </p>
      </div>
    </Section>
  );
};

const PoolingSection = () => {
  const [step, setStep] = useState(0);

  const featureMap = [
    [220, 180, 150, 200],
    [190, 255, 240, 170],
    [160, 230, 210, 190],
    [140, 180, 200, 160],
  ];

  const pooledValues = [
    [255, 240],
    [230, 210],
  ];

  const poolPositions = [
    { row: 0, col: 0, maxPos: { r: 1, c: 1 } },
    { row: 0, col: 2, maxPos: { r: 1, c: 0 } },
    { row: 2, col: 0, maxPos: { r: 0, c: 1 } },
    { row: 2, col: 2, maxPos: { r: 0, c: 0 } },
  ];

  const currentPool = poolPositions[Math.min(step, poolPositions.length - 1)];

  return (
    <Section title="📉 Pooling: Reduce Dimensions" color="#22c55e">
      <p className="text-gray-700 mb-4">
        <strong>Pooling</strong> (typically Max Pooling) reduces the size of
        feature maps while keeping the most important information. This makes
        the network more efficient and helps prevent overfitting.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() =>
            setStep((s) => Math.min(s + 1, poolPositions.length - 1))
          }
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          disabled={step >= poolPositions.length - 1}
        >
          Step →
        </button>
        <button
          onClick={() => setStep(0)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-green-50 rounded-xl p-4">
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {/* Input feature map */}
          <div className="text-center">
            <h4 className="font-semibold text-green-800 mb-2">
              Feature Map (4×4)
            </h4>
            <div
              className="grid gap-0 border-2 border-green-600"
              style={{ gridTemplateColumns: "repeat(4, 40px)" }}
            >
              {featureMap.flat().map((val, i) => {
                const row = Math.floor(i / 4);
                const col = i % 4;
                const isInPool =
                  row >= currentPool.row &&
                  row < currentPool.row + 2 &&
                  col >= currentPool.col &&
                  col < currentPool.col + 2;
                const isMax =
                  isInPool &&
                  row === currentPool.row + currentPool.maxPos.r &&
                  col === currentPool.col + currentPool.maxPos.c;

                return (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-mono border ${
                      isMax
                        ? "bg-green-500 text-white font-bold border-green-700"
                        : isInPool
                        ? "bg-green-200 border-green-400"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {val}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrow */}
          <div className="text-center">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <path
                d="M 5,20 L 45,20 M 40,15 L 45,20 L 40,25"
                stroke="#22C55E"
                strokeWidth="3"
                fill="none"
              />
            </svg>
            <div className="text-xs text-green-600">2×2 Max Pool</div>
          </div>

          {/* Output */}
          <div className="text-center">
            <h4 className="font-semibold text-green-800 mb-2">Pooled (2×2)</h4>
            <div
              className="grid gap-0 border-2 border-green-600"
              style={{ gridTemplateColumns: "repeat(2, 40px)" }}
            >
              {pooledValues.flat().map((val, i) => {
                const filled = i <= step;
                return (
                  <div
                    key={i}
                    className={`w-10 h-10 flex items-center justify-center text-xs font-mono border ${
                      filled
                        ? "bg-green-500 text-white font-bold"
                        : "bg-gray-100"
                    }`}
                  >
                    {filled ? val : "?"}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-green-700">
          Step {step + 1} of {poolPositions.length}: Take maximum value from
          each 2×2 region
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-3 border">
          <h4 className="font-semibold text-green-800 mb-1">✅ Benefits</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Reduces computation (fewer values)</li>
            <li>• Provides translation invariance</li>
            <li>• Prevents overfitting</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg p-3 border">
          <h4 className="font-semibold text-green-800 mb-1">
            📊 Dimension Change
          </h4>
          <div className="text-sm text-gray-600">
            <div>
              Input: 4×4 = <strong>16 values</strong>
            </div>
            <div>
              Output: 2×2 = <strong>4 values</strong>
            </div>
            <div className="text-green-600">75% reduction!</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const FlattenSection = () => {
  const [showFlattened, setShowFlattened] = useState(false);

  const featureMaps = [
    [
      [255, 240],
      [230, 210],
    ],
    [
      [200, 180],
      [190, 220],
    ],
    [
      [170, 210],
      [195, 185],
    ],
  ];

  const flattened = featureMaps.flat(2);

  return (
    <Section title="📏 Step 3: Flatten" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        After convolution and pooling, we have multiple 2D feature maps. To feed
        them into a regular neural network, we <strong>flatten</strong> them
        into a single 1D array.
      </p>

      <div className="bg-amber-50 rounded-xl p-4">
        <div className="flex items-center justify-center gap-4 flex-wrap mb-4">
          {/* Feature maps */}
          <div className="text-center">
            <h4 className="font-semibold text-amber-800 mb-2">
              Feature Maps (3 × 2×2)
            </h4>
            <div className="flex gap-2">
              {featureMaps.map((map, i) => (
                <div
                  key={i}
                  className="grid gap-0 border-2"
                  style={{
                    gridTemplateColumns: "repeat(2, 28px)",
                    borderColor: ["#3B82F6", "#22C55E", "#F59E0B"][i],
                  }}
                >
                  {map.flat().map((val, j) => (
                    <div
                      key={j}
                      className="w-7 h-7 flex items-center justify-center text-xs font-mono bg-white"
                    >
                      {val}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              3 filters × 4 values = 12 total
            </p>
          </div>

          <button
            onClick={() => setShowFlattened(!showFlattened)}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
          >
            {showFlattened ? "← Back" : "Flatten →"}
          </button>

          {/* Flattened array */}
          {showFlattened && (
            <div className="text-center">
              <h4 className="font-semibold text-amber-800 mb-2">
                Flattened (1×12)
              </h4>
              <div className="flex gap-1 flex-wrap justify-center">
                {flattened.map((val, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center text-xs font-mono border rounded"
                    style={{
                      backgroundColor:
                        i < 4 ? "#DBEAFE" : i < 8 ? "#DCFCE7" : "#FEF3C7",
                      borderColor:
                        i < 4 ? "#3B82F6" : i < 8 ? "#22C55E" : "#F59E0B",
                    }}
                  >
                    {val}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Ready for fully connected layer!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Why flatten?</strong> Fully connected neural networks
          expect a 1D input. Flattening converts the spatial feature maps into a
          format the dense layers can process.
        </p>
      </div>
    </Section>
  );
};

const FullyConnectedSection = () => {
  const [showPrediction, setShowPrediction] = useState(false);

  const classes = [
    { name: "Apple", emoji: "🍎", prob: 0.2, color: "#EF4444" },
    { name: "Banana", emoji: "🍌", prob: 0.5, color: "#F59E0B" },
    { name: "Orange", emoji: "🍊", prob: 0.3, color: "#F97316" },
  ];

  return (
    <Section title="🧠 Step 4-5: Fully Connected + Softmax" color="#ef4444">
      <p className="text-gray-700 mb-4">
        The flattened features feed into a{" "}
        <strong>fully connected neural network</strong> that learns to map
        features to class predictions. The final <strong>softmax</strong> layer
        outputs probabilities.
      </p>

      <div className="bg-red-50 rounded-xl p-4 mb-4">
        <svg viewBox="0 0 500 180" className="w-full h-48">
          {/* Input layer (flattened features) */}
          <text x="30" y="15" fontSize="10" fill="#6B7280">
            Flattened
          </text>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <circle key={i} cx="40" cy={30 + i * 22} r="8" fill="#F59E0B" />
          ))}
          <text x="35" y="170" fontSize="8" fill="#6B7280">
            ...
          </text>

          {/* Hidden layer 1 */}
          <text x="130" y="15" fontSize="10" fill="#6B7280">
            Hidden 1
          </text>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx="150" cy={40 + i * 26} r="10" fill="#8B5CF6" />
          ))}

          {/* Hidden layer 2 */}
          <text x="240" y="15" fontSize="10" fill="#6B7280">
            Hidden 2
          </text>
          {[0, 1, 2, 3].map((i) => (
            <circle key={i} cx="260" cy={50 + i * 28} r="10" fill="#6366F1" />
          ))}

          {/* Output layer */}
          <text x="350" y="15" fontSize="10" fill="#6B7280">
            Output
          </text>
          {classes.map((cls, i) => (
            <g key={i}>
              <circle cx="370" cy={60 + i * 35} r="12" fill={cls.color} />
              <text x="390" y={65 + i * 35} fontSize="10" fill="#374151">
                {cls.emoji} {cls.name}
              </text>
            </g>
          ))}

          {/* Connections (simplified) */}
          {[0, 1, 2, 3, 4, 5].map((i) =>
            [0, 1, 2, 3, 4].map((j) => (
              <line
                key={`${i}-${j}`}
                x1="48"
                y1={30 + i * 22}
                x2="140"
                y2={40 + j * 26}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            ))
          )}
          {[0, 1, 2, 3, 4].map((i) =>
            [0, 1, 2, 3].map((j) => (
              <line
                key={`h1-${i}-${j}`}
                x1="160"
                y1={40 + i * 26}
                x2="250"
                y2={50 + j * 28}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            ))
          )}
          {[0, 1, 2, 3].map((i) =>
            [0, 1, 2].map((j) => (
              <line
                key={`h2-${i}-${j}`}
                x1="270"
                y1={50 + i * 28}
                x2="358"
                y2={60 + j * 35}
                stroke="#E5E7EB"
                strokeWidth="0.5"
              />
            ))
          )}
        </svg>

        <button
          onClick={() => setShowPrediction(!showPrediction)}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          {showPrediction ? "Hide Prediction" : "🎯 Show Softmax Output"}
        </button>

        {showPrediction && (
          <div className="mt-4 bg-white rounded-lg p-4">
            <h4 className="font-semibold text-gray-700 mb-3">
              Softmax Probabilities:
            </h4>
            <div className="space-y-2">
              {classes.map((cls, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl">{cls.emoji}</span>
                  <span className="w-16 text-sm">{cls.name}</span>
                  <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${cls.prob * 100}%`,
                        backgroundColor: cls.color,
                      }}
                    />
                  </div>
                  <span className="w-12 text-sm font-mono">
                    {cls.prob.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-center">
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm">
                Prediction: 🍌 Banana (50% confidence)
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Output: [0.2, 0.5, 0.3] — probabilities sum to 1.0
            </div>
          </div>
        )}
      </div>

      <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
        <p className="text-sm text-purple-800">
          <strong>📊 Softmax function</strong> converts raw scores into
          probabilities that sum to 1.0. The highest probability becomes the
          predicted class.
        </p>
      </div>
    </Section>
  );
};

const TrainingSection = () => {
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const trainingData = [
    { epoch: 0, loss: 2.3, accuracy: 33 },
    { epoch: 1, loss: 1.8, accuracy: 45 },
    { epoch: 2, loss: 1.4, accuracy: 58 },
    { epoch: 3, loss: 1.0, accuracy: 70 },
    { epoch: 4, loss: 0.7, accuracy: 80 },
    { epoch: 5, loss: 0.5, accuracy: 87 },
    { epoch: 6, loss: 0.35, accuracy: 92 },
    { epoch: 7, loss: 0.25, accuracy: 95 },
    { epoch: 8, loss: 0.18, accuracy: 97 },
    { epoch: 9, loss: 0.12, accuracy: 98 },
  ];

  const current = trainingData[Math.min(epoch, trainingData.length - 1)];

  useEffect(() => {
    let interval;
    if (isTraining && epoch < trainingData.length - 1) {
      interval = setInterval(() => {
        setEpoch((e) => {
          const nextEpoch = e + 1;
          // Defer state update to avoid cascading renders
          if (nextEpoch >= trainingData.length - 1) {
            setTimeout(() => setIsTraining(false), 0);
          }
          return nextEpoch;
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isTraining, epoch, trainingData.length]);

  return (
    <Section title="🔄 Training Process" color="#6366f1">
      <p className="text-gray-700 mb-4">
        During training, the CNN compares predictions to actual labels,
        calculates <strong>loss</strong>, and adjusts both{" "}
        <strong>filter weights</strong> and{" "}
        <strong>neural network weights</strong> to improve accuracy.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setEpoch(0);
            setIsTraining(true);
          }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          ▶️ Train Model
        </button>
        <button
          onClick={() => {
            setEpoch(0);
            setIsTraining(false);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-indigo-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Loss chart */}
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-semibold text-gray-700 mb-2">
              📉 Loss (lower is better)
            </h4>
            <svg viewBox="0 0 200 100" className="w-full h-24">
              <line
                x1="30"
                y1="10"
                x2="30"
                y2="80"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <line
                x1="30"
                y1="80"
                x2="190"
                y2="80"
                stroke="#E5E7EB"
                strokeWidth="1"
              />

              {trainingData.slice(0, epoch + 1).map((d, i) => {
                const x = 30 + i * 16;
                const y = 10 + (1 - d.loss / 2.5) * 70;
                return <circle key={i} cx={x} cy={y} r="4" fill="#EF4444" />;
              })}

              {trainingData.slice(0, epoch + 1).map((d, i) => {
                if (i === 0) return null;
                const x1 = 30 + (i - 1) * 16;
                const y1 = 10 + (1 - trainingData[i - 1].loss / 2.5) * 70;
                const x2 = 30 + i * 16;
                const y2 = 10 + (1 - d.loss / 2.5) * 70;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#EF4444"
                    strokeWidth="2"
                  />
                );
              })}

              <text x="5" y="15" fontSize="8" fill="#6B7280">
                2.5
              </text>
              <text x="5" y="85" fontSize="8" fill="#6B7280">
                0
              </text>
              <text x="100" y="95" fontSize="8" fill="#6B7280">
                Epochs
              </text>
            </svg>
            <div className="text-center text-lg font-bold text-red-600">
              Loss: {current.loss.toFixed(2)}
            </div>
          </div>

          {/* Accuracy chart */}
          <div className="bg-white rounded-lg p-3">
            <h4 className="font-semibold text-gray-700 mb-2">
              📈 Accuracy (higher is better)
            </h4>
            <svg viewBox="0 0 200 100" className="w-full h-24">
              <line
                x1="30"
                y1="10"
                x2="30"
                y2="80"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <line
                x1="30"
                y1="80"
                x2="190"
                y2="80"
                stroke="#E5E7EB"
                strokeWidth="1"
              />

              {trainingData.slice(0, epoch + 1).map((d, i) => {
                const x = 30 + i * 16;
                const y = 80 - (d.accuracy / 100) * 70;
                return <circle key={i} cx={x} cy={y} r="4" fill="#22C55E" />;
              })}

              {trainingData.slice(0, epoch + 1).map((d, i) => {
                if (i === 0) return null;
                const x1 = 30 + (i - 1) * 16;
                const y1 = 80 - (trainingData[i - 1].accuracy / 100) * 70;
                const x2 = 30 + i * 16;
                const y2 = 80 - (d.accuracy / 100) * 70;
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#22C55E"
                    strokeWidth="2"
                  />
                );
              })}

              <text x="5" y="15" fontSize="8" fill="#6B7280">
                100%
              </text>
              <text x="5" y="85" fontSize="8" fill="#6B7280">
                0%
              </text>
              <text x="100" y="95" fontSize="8" fill="#6B7280">
                Epochs
              </text>
            </svg>
            <div className="text-center text-lg font-bold text-green-600">
              Accuracy: {current.accuracy}%
            </div>
          </div>
        </div>

        <div className="text-center">
          <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full font-medium">
            Epoch {epoch + 1} of {trainingData.length}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border">
        <h4 className="font-semibold text-gray-700 mb-2">🔄 Training Loop:</h4>
        <div className="grid grid-cols-4 gap-2 text-center text-sm">
          {[
            { icon: "🖼️", label: "Feed image", desc: "Known label" },
            { icon: "🔮", label: "Predict", desc: "Forward pass" },
            { icon: "📊", label: "Calculate loss", desc: "Compare to truth" },
            { icon: "⚙️", label: "Update weights", desc: "Backpropagation" },
          ].map((step, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-2">
              <span className="text-xl">{step.icon}</span>
              <div className="font-medium text-gray-800">{step.label}</div>
              <div className="text-xs text-gray-500">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🔲 Learned Filters</h3>
        <p className="text-sm text-blue-700">
          Unlike hand-designed filters, CNN filters are learned during training
          to extract the most useful features.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">📉 Pooling</h3>
        <p className="text-sm text-green-700">
          Max pooling reduces dimensions while preserving important features,
          making the network more efficient.
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">📏 Flatten → Dense</h3>
        <p className="text-sm text-amber-700">
          Feature maps are flattened into 1D, then fed into fully connected
          layers for classification.
        </p>
      </div>
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
        <h3 className="font-bold text-red-800 mb-2">🎯 Softmax Output</h3>
        <p className="text-sm text-red-700">
          Final layer outputs probabilities for each class. Training adjusts
          weights to minimize loss.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        CNNs revolutionized computer vision by automatically learning what
        features matter for classification. Instead of hand-designing edge
        detectors, the network discovers optimal filters through training. This
        architecture powers image classification, object detection, facial
        recognition, medical imaging, and countless other vision applications
        you'll encounter at Microsoft (Azure Computer Vision, Custom Vision,
        etc.).
      </p>
    </div>
  </Section>
);

export default function CNNGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-[1536] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 Convolutional Neural Networks
          </h1>
          <p className="text-gray-600">
            A Visual Guide to CNNs for Image Classification
          </p>
        </div>

        <CNNOverview />
        <ConvolutionLayerSection />
        <PoolingSection />
        <FlattenSection />
        <FullyConnectedSection />
        <TrainingSection />
        <SummarySection />
      </div>
    </div>
  );
}
