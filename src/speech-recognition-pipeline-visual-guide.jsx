import React, { useState, useEffect, useMemo } from "react";

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
      name: "Audio Capture",
      icon: "🎤",
      color: "#3B82F6",
      desc: "Sound → Digital signal",
    },
    {
      name: "Pre-processing",
      icon: "📊",
      color: "#8B5CF6",
      desc: "Extract MFCC features",
    },
    {
      name: "Acoustic Model",
      icon: "🔤",
      color: "#22C55E",
      desc: "Predict phonemes",
    },
    {
      name: "Language Model",
      icon: "📖",
      color: "#F59E0B",
      desc: "Apply grammar rules",
    },
    { name: "Decoding", icon: "🔍", color: "#EF4444", desc: "Find best text" },
    {
      name: "Post-processing",
      icon: "✨",
      color: "#EC4899",
      desc: "Format output",
    },
  ];

  return (
    <Section title="🎯 The Speech Recognition Pipeline" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Converting speech to text involves <strong>6 coordinated stages</strong>
        . Click each stage to learn more:
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {stages.map((stage, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => setActiveStage(i)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
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
                <span className="text-2xl">{stage.icon}</span>
                <span
                  className={`text-xs font-medium mt-1 ${
                    activeStage === i ? "text-white" : "text-gray-700"
                  }`}
                >
                  {stage.name}
                </span>
              </button>
              {i < stages.length - 1 && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="text-gray-400"
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
          borderColor: stages[activeStage].color,
          backgroundColor: `${stages[activeStage].color}10`,
        }}
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{stages[activeStage].icon}</span>
          <div>
            <h3
              className="font-bold"
              style={{ color: stages[activeStage].color }}
            >
              Stage {activeStage + 1}: {stages[activeStage].name}
            </h3>
            <p className="text-sm text-gray-600">{stages[activeStage].desc}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm text-gray-500">
        Scroll down to explore each stage in detail ↓
      </div>
    </Section>
  );
};

const AudioCaptureSection = () => {
  const [sampleRate, setSampleRate] = useState(16000);
  const [showSampling, setShowSampling] = useState(false);

  const wavePoints = [];
  for (let i = 0; i < 200; i++) {
    const x = i * 2;
    const y = 50 + Math.sin(i * 0.15) * 30 + Math.sin(i * 0.3) * 15;
    wavePoints.push(`${x},${y}`);
  }

  const samplePoints = [];
  const step = Math.floor(200 / (sampleRate / 1000));
  for (let i = 0; i < 200; i += step) {
    const x = i * 2;
    const y = 50 + Math.sin(i * 0.15) * 30 + Math.sin(i * 0.3) * 15;
    samplePoints.push({ x, y });
  }

  return (
    <Section title="🎤 Stage 1: Audio Capture" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        A microphone converts sound waves into a <strong>digital signal</strong>{" "}
        by sampling thousands of times per second.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium text-blue-800">Sample Rate:</span>
          <div className="flex gap-2">
            {[8000, 16000, 44100].map((rate) => (
              <button
                key={rate}
                onClick={() => setSampleRate(rate)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  sampleRate === rate
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-blue-300"
                }`}
              >
                {rate / 1000} kHz
              </button>
            ))}
          </div>
        </div>

        <svg viewBox="0 0 400 100" className="w-full h-32 bg-white rounded-lg">
          {/* Continuous waveform */}
          <polyline
            points={wavePoints.join(" ")}
            fill="none"
            stroke="#93C5FD"
            strokeWidth="2"
          />

          {/* Sample points */}
          {showSampling &&
            samplePoints.map((point, i) => (
              <g key={i}>
                <line
                  x1={point.x}
                  y1="100"
                  x2={point.x}
                  y2={point.y}
                  stroke="#3B82F6"
                  strokeWidth="1"
                  strokeDasharray="2"
                />
                <circle cx={point.x} cy={point.y} r="3" fill="#3B82F6" />
              </g>
            ))}

          {/* Labels */}
          <text x="10" y="15" fontSize="10" fill="#6B7280">
            Amplitude
          </text>
          <text x="350" y="95" fontSize="10" fill="#6B7280">
            Time
          </text>
        </svg>

        <button
          onClick={() => setShowSampling(!showSampling)}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
        >
          {showSampling ? "📈 Hide Sampling" : "📊 Show Digital Sampling"}
        </button>

        <div className="mt-3 text-center text-sm text-blue-700">
          {sampleRate.toLocaleString()} samples/second = {samplePoints.length}{" "}
          samples shown
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {[
          { rate: "8 kHz", use: "Phone calls", quality: "Basic" },
          { rate: "16 kHz", use: "Speech recognition", quality: "Optimal ✓" },
          { rate: "44.1 kHz", use: "Music", quality: "High fidelity" },
        ].map((item, i) => (
          <div
            key={i}
            className={`rounded-lg p-3 text-center ${
              item.use === "Speech recognition"
                ? "bg-blue-100 border-2 border-blue-400"
                : "bg-gray-50"
            }`}
          >
            <div className="font-bold text-lg">{item.rate}</div>
            <div className="text-sm text-gray-600">{item.use}</div>
            <div className="text-xs text-gray-500">{item.quality}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Quality factors:</strong> Background noise, microphone
          quality, and distance from speaker directly impact downstream
          accuracy.
        </p>
      </div>
    </Section>
  );
};

const MFCCSection = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Divide into Frames",
      desc: "Split audio into 20-30ms overlapping windows",
      visual: "frames",
    },
    {
      title: "Fourier Transform",
      desc: "Convert from time domain to frequency domain",
      visual: "fft",
    },
    {
      title: "Mel Scale Mapping",
      desc: "Adjust to match human hearing sensitivity",
      visual: "mel",
    },
    {
      title: "Extract Coefficients",
      desc: "Compute 13 numbers summarizing each frame",
      visual: "coefficients",
    },
  ];

  // Generate stable random values for waveforms
  const waveformRandomValues = useMemo(() => {
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    return Array.from({ length: 7 }, (_, i) => ({
      y1: seededRandom(i * 2) * 20,
      y2: seededRandom(i * 2 + 1) * 20,
    }));
  }, []);

  return (
    <Section title="📊 Stage 2: Pre-processing (MFCC)" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        <strong>Mel-Frequency Cepstral Coefficients (MFCC)</strong> transform
        raw audio into compact features that highlight speech characteristics
        while mimicking human hearing.
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              step === i
                ? "bg-purple-600 text-white"
                : step > i
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-purple-800 mb-2">
          Step {step + 1}: {steps[step].title}
        </h4>
        <p className="text-sm text-purple-700 mb-4">{steps[step].desc}</p>

        <svg viewBox="0 0 400 120" className="w-full h-32 bg-white rounded-lg">
          {steps[step].visual === "frames" && (
            <>
              {/* Audio waveform divided into frames */}
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <g key={i}>
                  <rect
                    x={10 + i * 55}
                    y="10"
                    width="50"
                    height="80"
                    fill={i % 2 === 0 ? "#C4B5FD" : "#DDD6FE"}
                    stroke="#8B5CF6"
                    strokeWidth="1"
                    rx="4"
                  />
                  <text
                    x={35 + i * 55}
                    y="105"
                    fontSize="8"
                    fill="#6B7280"
                    textAnchor="middle"
                  >
                    Frame {i + 1}
                  </text>
                  {/* Mini waveform in each frame */}
                  <path
                    d={`M ${15 + i * 55},50 Q ${25 + i * 55},${
                      30 + waveformRandomValues[i].y1
                    } ${35 + i * 55},50 Q ${45 + i * 55},${
                      50 + waveformRandomValues[i].y2
                    } ${55 + i * 55},50`}
                    stroke="#8B5CF6"
                    strokeWidth="2"
                    fill="none"
                  />
                </g>
              ))}
              <text
                x="200"
                y="118"
                fontSize="9"
                fill="#8B5CF6"
                textAnchor="middle"
              >
                20-30ms windows with overlap
              </text>
            </>
          )}

          {steps[step].visual === "fft" && (
            <>
              {/* Time domain to frequency domain */}
              <g>
                <rect
                  x="20"
                  y="20"
                  width="120"
                  height="70"
                  fill="#DDD6FE"
                  rx="5"
                />
                <text
                  x="80"
                  y="40"
                  fontSize="9"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  Time Domain
                </text>
                <path
                  d="M 30,70 Q 50,40 70,70 Q 90,100 110,70 Q 130,40 130,70"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </g>

              <path d="M 150,55 L 180,55" stroke="#8B5CF6" strokeWidth="2" />
              <polygon points="180,50 190,55 180,60" fill="#8B5CF6" />
              <text x="170" y="45" fontSize="8" fill="#8B5CF6">
                FFT
              </text>

              <g>
                <rect
                  x="200"
                  y="20"
                  width="180"
                  height="70"
                  fill="#DDD6FE"
                  rx="5"
                />
                <text
                  x="290"
                  y="40"
                  fontSize="9"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  Frequency Domain
                </text>
                {/* Frequency bars */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <rect
                    key={i}
                    x={215 + i * 18}
                    y={90 - [40, 55, 35, 25, 15, 20, 10, 8, 5][i]}
                    width="12"
                    height={[40, 55, 35, 25, 15, 20, 10, 8, 5][i]}
                    fill="#8B5CF6"
                    rx="2"
                  />
                ))}
              </g>
              <text
                x="290"
                y="110"
                fontSize="8"
                fill="#6B7280"
                textAnchor="middle"
              >
                Low ← Frequency → High
              </text>
            </>
          )}

          {steps[step].visual === "mel" && (
            <>
              {/* Linear to Mel scale */}
              <g>
                <text
                  x="100"
                  y="20"
                  fontSize="10"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  Linear Scale
                </text>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <rect
                    key={i}
                    x={20 + i * 22}
                    y="30"
                    width="18"
                    height="30"
                    fill="#C4B5FD"
                    stroke="#8B5CF6"
                  />
                ))}
                <text x="30" y="75" fontSize="8" fill="#6B7280">
                  0Hz
                </text>
                <text x="170" y="75" fontSize="8" fill="#6B7280">
                  8kHz
                </text>
              </g>

              <path d="M 200,45 L 220,45" stroke="#8B5CF6" strokeWidth="2" />
              <polygon points="220,40 230,45 220,50" fill="#8B5CF6" />

              <g>
                <text
                  x="320"
                  y="20"
                  fontSize="10"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  Mel Scale
                </text>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
                  const widths = [35, 30, 25, 20, 18, 16, 14, 12];
                  let x = 240;
                  for (let j = 0; j < i; j++) x += widths[j] + 2;
                  return (
                    <rect
                      key={i}
                      x={x}
                      y="30"
                      width={widths[i]}
                      height="30"
                      fill="#8B5CF6"
                      stroke="#6D28D9"
                    />
                  );
                })}
                <text x="250" y="75" fontSize="8" fill="#6B7280">
                  Low
                </text>
                <text x="380" y="75" fontSize="8" fill="#6B7280">
                  High
                </text>
              </g>

              <text
                x="200"
                y="100"
                fontSize="9"
                fill="#8B5CF6"
                textAnchor="middle"
              >
                More resolution for low frequencies (how humans hear)
              </text>
            </>
          )}

          {steps[step].visual === "coefficients" && (
            <>
              <text
                x="200"
                y="20"
                fontSize="10"
                fill="#6B7280"
                textAnchor="middle"
              >
                MFCC Feature Vector (13 coefficients per frame)
              </text>

              {/* Coefficient bars */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => {
                const values = [
                  -113, 45, 12, -3, 8, 15, -7, 4, 9, -2, 6, 3, -5,
                ];
                const height = Math.abs(values[i]) * 0.6;
                const y = values[i] > 0 ? 60 - height : 60;
                return (
                  <g key={i}>
                    <rect
                      x={30 + i * 28}
                      y={y}
                      width="20"
                      height={height}
                      fill={values[i] > 0 ? "#22C55E" : "#EF4444"}
                      rx="2"
                    />
                    <text
                      x={40 + i * 28}
                      y="100"
                      fontSize="7"
                      fill="#6B7280"
                      textAnchor="middle"
                    >
                      C{i + 1}
                    </text>
                  </g>
                );
              })}

              {/* Zero line */}
              <line
                x1="25"
                y1="60"
                x2="390"
                y2="60"
                stroke="#9CA3AF"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <text x="15" y="63" fontSize="8" fill="#9CA3AF">
                0
              </text>
            </>
          )}
        </svg>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">
          Example MFCC Output:
        </h4>
        <div className="font-mono text-xs bg-white rounded p-3 overflow-x-auto">
          <div className="text-purple-600">
            Frame 1: [-113.2, 45.3, 12.1, -3.4, 7.8, ...]{" "}
            <span className="text-gray-400"># 13 coefficients</span>
          </div>
          <div className="text-purple-600">
            Frame 2: [-112.8, 44.7, 11.8, -3.1, 7.5, ...]
          </div>
          <div className="text-purple-600">
            Frame 3: [-110.5, 43.9, 11.5, -2.9, 7.3, ...]
          </div>
          <div className="text-gray-400">
            ... one vector per 20-30ms of audio
          </div>
        </div>
      </div>
    </Section>
  );
};

const AcousticModelSection = () => {
  const [showProbabilities, setShowProbabilities] = useState(false);

  const word = "cat";
  const phonemes = [
    { symbol: "/k/", example: "c", probs: { "/k/": 92, "/g/": 5, other: 3 } },
    { symbol: "/æ/", example: "a", probs: { "/æ/": 80, "/ɛ/": 15, other: 5 } },
    { symbol: "/t/", example: "t", probs: { "/t/": 88, "/d/": 8, other: 4 } },
  ];

  return (
    <Section title="🔤 Stage 3: Acoustic Modeling" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Acoustic models use <strong>transformers</strong> to predict{" "}
        <strong>phonemes</strong> — the smallest units of sound that distinguish
        words. English has about 44 phonemes.
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <div className="text-center mb-4">
          <span className="text-sm text-green-600">Example: The word</span>
          <div className="text-4xl font-bold text-green-800">"{word}"</div>
          <span className="text-sm text-green-600">has 3 phonemes</span>
        </div>

        <div className="flex justify-center items-center gap-4 mb-4">
          {phonemes.map((p, i) => (
            <React.Fragment key={i}>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {p.symbol}
                </div>
                <div className="text-sm text-gray-600 mt-1">"{p.example}"</div>
              </div>
              {i < phonemes.length - 1 && (
                <span className="text-green-400 text-2xl">+</span>
              )}
            </React.Fragment>
          ))}
          <span className="text-gray-400 text-2xl mx-2">=</span>
          <div className="w-20 h-20 bg-green-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
            cat
          </div>
        </div>

        <button
          onClick={() => setShowProbabilities(!showProbabilities)}
          className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          {showProbabilities
            ? "Hide Probabilities"
            : "📊 Show Probability Distributions"}
        </button>

        {showProbabilities && (
          <div className="mt-4 grid grid-cols-3 gap-3">
            {phonemes.map((p, i) => (
              <div key={i} className="bg-white rounded-lg p-3">
                <div className="font-semibold text-center text-green-700 mb-2">
                  Frame {i + 1}
                </div>
                {Object.entries(p.probs).map(([phoneme, prob]) => (
                  <div key={phoneme} className="flex items-center gap-2 mb-1">
                    <span className="w-10 text-xs font-mono">{phoneme}</span>
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${prob}%`,
                          backgroundColor: prob > 50 ? "#22C55E" : "#9CA3AF",
                        }}
                      />
                    </div>
                    <span className="text-xs w-8">{prob}%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-green-800 mb-2">
            🎯 Transformer Advantages
          </h4>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>
              • <strong>Attention:</strong> Examines surrounding frames for
              context
            </li>
            <li>
              • <strong>Parallel:</strong> Processes multiple frames
              simultaneously
            </li>
            <li>
              • <strong>Contextual:</strong> Learns common phoneme sequences
            </li>
          </ul>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2">
            ⚠️ Language-Specific
          </h4>
          <p className="text-sm text-yellow-700">
            Phonemes differ by language! A model trained on English can't
            recognize Mandarin tones without retraining.
          </p>
        </div>
      </div>
    </Section>
  );
};

const LanguageModelSection = () => {
  const [example, setExample] = useState("weather");

  const examples = {
    weather: {
      wrong: "The whether is nice",
      right: "The weather is nice",
      reason:
        'Statistical patterns: "weather is nice" appears more often in training data',
    },
    context: {
      wrong: "I need to table",
      right: "I need to go",
      reason:
        'Context awareness: After "I need to", verbs like "go" are expected, not nouns',
    },
    domain: {
      wrong: "The patient has hyper tension",
      right: "The patient has hypertension",
      reason:
        "Domain adaptation: Medical language model recognizes clinical terminology",
    },
  };

  const current = examples[example];

  return (
    <Section title="📖 Stage 4: Language Modeling" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Phonemes alone can be ambiguous ("their" vs "there" sound identical).
        Language models apply <strong>vocabulary, grammar, and patterns</strong>{" "}
        to pick the right words.
      </p>

      <div className="flex gap-2 mb-4">
        {Object.keys(examples).map((key) => (
          <button
            key={key}
            onClick={() => setExample(key)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              example === key
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {key === "weather"
              ? "📊 Statistics"
              : key === "context"
              ? "🔮 Context"
              : "🏥 Domain"}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
            <div className="text-sm text-red-600 mb-1">
              ❌ Without Language Model:
            </div>
            <div className="font-mono text-lg text-red-700">
              {current.wrong}
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
            <div className="text-sm text-green-600 mb-1">
              ✅ With Language Model:
            </div>
            <div className="font-mono text-lg text-green-700">
              {current.right}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-3">
          <span className="font-semibold text-amber-700">Why it works: </span>
          <span className="text-gray-700">{current.reason}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        {[
          {
            icon: "📊",
            title: "Statistical Patterns",
            desc: "Common word sequences from training data",
          },
          {
            icon: "🔮",
            title: "Context Awareness",
            desc: "Predicts likely next words",
          },
          {
            icon: "🎯",
            title: "Domain Adaptation",
            desc: "Custom models for medical, legal, etc.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-amber-100 rounded-lg p-3 text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-semibold text-amber-800">{item.title}</div>
            <div className="text-xs text-amber-700">{item.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const DecodingSection = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const beamSearch = [
    {
      hypotheses: [
        { text: "Please", score: 0.95 },
        { text: "Police", score: 0.65 },
        { text: "Fleece", score: 0.4 },
      ],
    },
    {
      hypotheses: [
        { text: "Please send", score: 0.88 },
        { text: "Please sent", score: 0.45 },
        { text: "Police send", score: 0.3 },
      ],
    },
    {
      hypotheses: [
        { text: "Please send the", score: 0.92 },
        { text: "Please send a", score: 0.55 },
        { text: "Please sent the", score: 0.25 },
      ],
    },
    {
      hypotheses: [
        { text: "Please send the report", score: 0.94 },
        { text: "Please send the report by", score: 0.91 },
        { text: "Please send the report buy", score: 0.35 },
      ],
    },
    {
      hypotheses: [{ text: "Please send the report by Friday", score: 0.96 }],
    },
  ];

  useEffect(() => {
    if (isRunning && step < beamSearch.length - 1) {
      const interval = setInterval(() => {
        setStep((s) => {
          const nextStep = s + 1;
          // Stop running when we reach the end (deferred to avoid cascading renders)
          if (nextStep >= beamSearch.length - 1) {
            setTimeout(() => setIsRunning(false), 0);
          }
          return nextStep;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isRunning, step, beamSearch.length]);

  return (
    <Section title="🔍 Stage 5: Decoding (Beam Search)" color="#ef4444">
      <p className="text-gray-700 mb-4">
        Decoding searches through millions of possible word sequences to find
        the <strong>best match</strong>
        for both acoustic and language model predictions.
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsRunning(true);
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          ▶️ Run Beam Search
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

      <div className="bg-red-50 rounded-xl p-4 mb-4">
        <div className="text-sm text-red-600 mb-2">
          Step {step + 1} of {beamSearch.length}: Beam Width = 3
        </div>

        <div className="space-y-2">
          {beamSearch[step].hypotheses.map((hyp, i) => {
            const isWinner = step === beamSearch.length - 1 && i === 0;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  isWinner
                    ? "bg-green-100 border-2 border-green-500"
                    : hyp.score > 0.5
                    ? "bg-white border border-red-200"
                    : "bg-gray-100 border border-gray-200 opacity-60"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isWinner
                      ? "bg-green-500 text-white"
                      : "bg-red-200 text-red-700"
                  }`}
                >
                  {i + 1}
                </div>
                <div className="flex-1 font-mono text-sm">"{hyp.text}"</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        isWinner ? "bg-green-500" : "bg-red-400"
                      }`}
                      style={{ width: `${hyp.score * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-12">
                    {(hyp.score * 100).toFixed(0)}%
                  </span>
                </div>
                {isWinner && <span className="text-green-600 text-xl">✓</span>}
              </div>
            );
          })}
        </div>

        {step < beamSearch.length - 1 && (
          <div className="mt-3 text-center text-sm text-red-600">
            Low-scoring hypotheses are pruned, top candidates extended...
          </div>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>⚡ Performance note:</strong> Real-time applications balance
          accuracy and latency by limiting beam width and hypothesis depth.
        </p>
      </div>
    </Section>
  );
};

const PostProcessingSection = () => {
  const [activeTask, setActiveTask] = useState("capitalization");

  const tasks = {
    capitalization: {
      before: "hello my name is sam",
      after: "Hello my name is Sam.",
      icon: "🔠",
    },
    punctuation: {
      before: "how are you doing today",
      after: "How are you doing today?",
      icon: "❓",
    },
    numbers: {
      before: "one thousand twenty three dollars",
      after: "$1,023",
      icon: "🔢",
    },
    time: {
      before: "meet me at three p m",
      after: "Meet me at 3 PM.",
      icon: "🕐",
    },
    confidence: {
      before: "The meeting is [unclear] Tuesday",
      after: "The meeting is ??? Tuesday (flagged for review)",
      icon: "⚠️",
    },
  };

  return (
    <Section title="✨ Stage 6: Post-Processing" color="#ec4899">
      <p className="text-gray-700 mb-4">
        Raw decoder output needs cleanup before presentation. Post-processing
        applies formatting rules and corrections for{" "}
        <strong>readability</strong>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(tasks).map(([key, task]) => (
          <button
            key={key}
            onClick={() => setActiveTask(key)}
            className={`px-3 py-2 rounded-lg font-medium capitalize transition-all flex items-center gap-1 ${
              activeTask === key
                ? "bg-pink-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {task.icon} {key}
          </button>
        ))}
      </div>

      <div className="bg-pink-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">Before:</div>
            <div className="font-mono text-gray-700">
              {tasks[activeTask].before}
            </div>
          </div>
          <div className="bg-green-100 rounded-lg p-4">
            <div className="text-sm text-green-600 mb-2">After:</div>
            <div className="font-mono text-green-700">
              {tasks[activeTask].after}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          {
            icon: "🔠",
            task: "Capitalization",
            desc: "Proper nouns, sentence starts",
          },
          {
            icon: "❓",
            task: "Punctuation",
            desc: "Periods, commas, questions",
          },
          {
            icon: "🔢",
            task: "Number Formatting",
            desc: '"one thousand" → 1,000',
          },
          { icon: "🕐", task: "Time/Date", desc: '"three pm" → 3 PM' },
          {
            icon: "🚫",
            task: "Profanity Filter",
            desc: "Mask inappropriate words",
          },
          {
            icon: "⚠️",
            task: "Confidence Scoring",
            desc: "Flag uncertain segments",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-xl">{item.icon}</span>
            <div className="font-medium text-sm text-pink-800">{item.task}</div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
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
          stage: "1. Audio Capture",
          icon: "🎤",
          color: "#3B82F6",
          key: "16 kHz sampling",
        },
        {
          stage: "2. Pre-processing",
          icon: "📊",
          color: "#8B5CF6",
          key: "MFCC features",
        },
        {
          stage: "3. Acoustic Model",
          icon: "🔤",
          color: "#22C55E",
          key: "Phoneme prediction",
        },
        {
          stage: "4. Language Model",
          icon: "📖",
          color: "#F59E0B",
          key: "Grammar & context",
        },
        {
          stage: "5. Decoding",
          icon: "🔍",
          color: "#EF4444",
          key: "Beam search",
        },
        {
          stage: "6. Post-processing",
          icon: "✨",
          color: "#EC4899",
          key: "Format & clean",
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
        By separating concerns into 6 stages, modern speech recognition achieves
        high accuracy across languages, accents, and acoustic conditions. When
        transcription quality falls short, you can trace the issue to a specific
        stage and adjust accordingly — poor audio capture, insufficient language
        model training, or overly aggressive post-processing.
      </p>
    </div>
  </Section>
);

export default function SpeechRecognitionGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🎤 Speech Recognition Pipeline
          </h1>
          <p className="text-gray-600">
            A Visual Guide to How Speech-to-Text Really Works
          </p>
        </div>

        <PipelineOverview />
        <AudioCaptureSection />
        <MFCCSection />
        <AcousticModelSection />
        <LanguageModelSection />
        <DecodingSection />
        <PostProcessingSection />
        <SummarySection />
      </div>
    </div>
  );
}
