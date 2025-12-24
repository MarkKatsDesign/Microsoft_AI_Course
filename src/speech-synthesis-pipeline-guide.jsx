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
      name: "Text Normalization",
      icon: "📝",
      color: "#3B82F6",
      desc: "Expand abbreviations & numbers",
    },
    {
      name: "Linguistic Analysis",
      icon: "🔤",
      color: "#8B5CF6",
      desc: "Map text to phonemes",
    },
    {
      name: "Prosody Generation",
      icon: "🎵",
      color: "#22C55E",
      desc: "Determine rhythm & intonation",
    },
    {
      name: "Speech Synthesis",
      icon: "🔊",
      color: "#F59E0B",
      desc: "Generate audio waveform",
    },
  ];

  return (
    <Section title="🎯 The Text-to-Speech Pipeline" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Converting text to natural speech involves{" "}
        <strong>4 distinct stages</strong>. Each transforms the input
        incrementally toward a final audio waveform.
      </p>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap justify-center items-center gap-3">
          {stages.map((stage, i) => (
            <React.Fragment key={i}>
              <button
                onClick={() => setActiveStage(i)}
                className={`flex flex-col items-center p-4 rounded-xl transition-all ${
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
                <span className="text-3xl">{stage.icon}</span>
                <span
                  className={`text-xs font-medium mt-1 text-center ${
                    activeStage === i ? "text-white" : "text-gray-700"
                  }`}
                >
                  {stage.name}
                </span>
              </button>
              {i < stages.length - 1 && (
                <svg
                  width="30"
                  height="24"
                  viewBox="0 0 30 24"
                  className="text-gray-400"
                >
                  <path
                    d="M 4,12 L 20,12 M 16,8 L 20,12 L 16,16"
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

      <div className="mt-4 flex justify-center items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1">📝 Text</span>
        <span>→</span>
        <span className="flex items-center gap-1">🔤 Phonemes</span>
        <span>→</span>
        <span className="flex items-center gap-1">🎵 Prosody</span>
        <span>→</span>
        <span className="flex items-center gap-1">🔊 Audio</span>
      </div>
    </Section>
  );
};

const TextNormalizationSection = () => {
  const [selectedExample, setSelectedExample] = useState("full");

  const examples = {
    full: {
      before: "Dr. Smith ordered 3 items for $25.50 on 12/15/2023.",
      after:
        "Doctor Smith ordered three items for twenty-five dollars and fifty cents on December fifteenth, two thousand twenty-three.",
    },
    abbreviations: {
      before: "Dr. Johnson works at MIT Inc.",
      after: "Doctor Johnson works at M I T Incorporated.",
    },
    numbers: {
      before: "Call 555-1234 or ext. 42",
      after: "Call five five five one two three four or extension forty-two",
    },
    symbols: {
      before: "Email me @ john@test.com for 50% off!",
      after: "Email me at john at test dot com for fifty percent off!",
    },
    dates: {
      before: "Meeting at 3:30 PM on 1/5/25",
      after: "Meeting at three thirty P M on January fifth, twenty twenty-five",
    },
  };

  const current = examples[selectedExample];

  const tasks = [
    { icon: "📋", name: "Abbreviations", example: "Dr. → Doctor" },
    { icon: "🔢", name: "Numbers", example: "3 → three" },
    { icon: "📅", name: "Dates/Times", example: "12/15 → December fifteenth" },
    { icon: "💲", name: "Symbols", example: "$ → dollars" },
    { icon: "🔀", name: "Homographs", example: "read (context-based)" },
  ];

  return (
    <Section title="📝 Stage 1: Text Normalization" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Text normalization prepares raw text by expanding abbreviations,
        numbers, and symbols into their <strong>spoken forms</strong>.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(examples).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedExample(key)}
            className={`px-3 py-2 rounded-lg font-medium capitalize transition-all ${
              selectedExample === key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {key === "full" ? "📄 Full Example" : key}
          </button>
        ))}
      </div>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-blue-600 mb-2 font-medium">
              📥 Raw Input:
            </div>
            <div className="bg-white rounded-lg p-3 font-mono text-sm border border-blue-200">
              {current.before}
            </div>
          </div>
          <div>
            <div className="text-sm text-green-600 mb-2 font-medium">
              📤 Normalized Output:
            </div>
            <div className="bg-green-50 rounded-lg p-3 font-mono text-sm border border-green-200">
              {current.after}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {tasks.map((task, i) => (
          <div key={i} className="bg-white rounded-lg p-2 border text-center">
            <span className="text-xl">{task.icon}</span>
            <div className="font-medium text-xs text-blue-800">{task.name}</div>
            <div className="text-xs text-gray-500">{task.example}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Domain matters:</strong> Medical text handles drug names
          differently than financial text handles currencies. Custom
          normalization rules improve accuracy.
        </p>
      </div>
    </Section>
  );
};

const LinguisticAnalysisSection = () => {
  const [selectedWord, setSelectedWord] = useState("though");

  const words = {
    though: {
      graphemes: "t-h-o-u-g-h",
      phonemes: "/θoʊ/",
      note: "gh is silent",
    },
    through: {
      graphemes: "t-h-r-o-u-g-h",
      phonemes: "/θruː/",
      note: "ough = oo",
    },
    cough: { graphemes: "c-o-u-g-h", phonemes: "/kɔːf/", note: "ough = off" },
    thought: {
      graphemes: "t-h-o-u-g-h-t",
      phonemes: "/θɔːt/",
      note: "ough = aw",
    },
    bough: { graphemes: "b-o-u-g-h", phonemes: "/baʊ/", note: "ough = ow" },
  };

  const current = words[selectedWord];

  const readExamples = [
    {
      sentence: "I read books every day.",
      tense: "Present",
      pronunciation: "/riːd/",
      color: "#22C55E",
    },
    {
      sentence: "I read that book yesterday.",
      tense: "Past",
      pronunciation: "/rɛd/",
      color: "#EF4444",
    },
  ];

  return (
    <Section title="🔤 Stage 2: Linguistic Analysis (G2P)" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Linguistic analysis maps text to <strong>phonemes</strong> using
        Grapheme-to-Phoneme (G2P) conversion. English spelling doesn't reliably
        indicate pronunciation!
      </p>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-purple-800 mb-3">
          The "OUGH" Problem:
        </h4>
        <p className="text-sm text-purple-700 mb-3">
          Same letters, completely different sounds!
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(words).map((word) => (
            <button
              key={word}
              onClick={() => setSelectedWord(word)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedWord === word
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-700 border border-purple-300"
              }`}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 border border-purple-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Graphemes (letters)
              </div>
              <div className="font-mono text-lg text-purple-700">
                {current.graphemes}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <svg width="40" height="24" viewBox="0 0 40 24">
                <path
                  d="M 5,12 L 30,12 M 26,8 L 30,12 L 26,16"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">
                Phonemes (sounds)
              </div>
              <div className="font-mono text-lg text-purple-700">
                {current.phonemes}
              </div>
            </div>
          </div>
          <div className="text-center mt-2 text-sm text-purple-600">
            💡 {current.note}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-3">
          Context Matters: "read"
        </h4>
        <p className="text-sm text-amber-700 mb-3">
          Transformers analyze context to determine pronunciation:
        </p>

        <div className="space-y-3">
          {readExamples.map((ex, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-3 border-2 flex items-center justify-between"
              style={{ borderColor: ex.color }}
            >
              <div>
                <span className="font-mono">{ex.sentence}</span>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className="text-sm px-2 py-1 rounded"
                  style={{ backgroundColor: `${ex.color}20`, color: ex.color }}
                >
                  {ex.tense}
                </span>
                <span
                  className="font-mono font-bold"
                  style={{ color: ex.color }}
                >
                  {ex.pronunciation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-purple-800 mb-2">
            📖 Lexicon Lookup
          </h4>
          <p className="text-sm text-gray-600">
            Pronunciation dictionaries contain thousands of word-to-phoneme
            mappings for common words.
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-purple-800 mb-2">🧠 Neural G2P</h4>
          <p className="text-sm text-gray-600">
            For unknown words, names, or regional variations, neural networks
            predict pronunciation from spelling patterns.
          </p>
        </div>
      </div>
    </Section>
  );
};

const ProsodySection = () => {
  const [emphasisIndex, setEmphasisIndex] = useState(0);

  const sentence = ["I", "never", "said", "he", "ate", "the", "cake"];
  const meanings = [
    "Someone else said it, not me",
    "I definitely didn't say it",
    "I implied it another way",
    "Someone else ate it",
    "He did something else to it",
    "He ate a different cake",
    "He ate something else entirely",
  ];

  const prosodyElements = [
    {
      name: "Pitch",
      icon: "📈",
      desc: "Rising/falling patterns (questions vs statements)",
      example: "Questions rise ↗",
    },
    {
      name: "Duration",
      icon: "⏱️",
      desc: "How long to hold each sound",
      example: "Emphasis = longer",
    },
    {
      name: "Intensity",
      icon: "🔊",
      desc: "Volume variations",
      example: "Important words louder",
    },
    {
      name: "Pauses",
      icon: "⏸️",
      desc: "Breaks between phrases",
      example: "Commas = brief pause",
    },
    {
      name: "Stress",
      icon: "💪",
      desc: "Which syllables emphasized",
      example: "RE-cord vs re-CORD",
    },
  ];

  return (
    <Section title="🎵 Stage 3: Prosody Generation" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Prosody determines <strong>how</strong> to say words — rhythm, stress,
        and intonation that make speech sound natural.
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-green-800 mb-3">
          Emphasis Changes Meaning!
        </h4>
        <p className="text-sm text-green-700 mb-3">
          Click different words to see how emphasis shifts the meaning:
        </p>

        <div className="bg-white rounded-lg p-4 mb-3">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {sentence.map((word, i) => (
              <button
                key={i}
                onClick={() => setEmphasisIndex(i)}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  emphasisIndex === i
                    ? "bg-green-600 text-white scale-110 uppercase"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {word}
              </button>
            ))}
          </div>

          <div className="text-center">
            <div className="inline-block bg-green-100 rounded-lg px-4 py-2 border border-green-300">
              <span className="text-sm text-green-600">
                This emphasis means:{" "}
              </span>
              <span className="font-medium text-green-800">
                {meanings[emphasisIndex]}
              </span>
            </div>
          </div>
        </div>

        {/* Pitch visualization */}
        <div className="bg-white rounded-lg p-3">
          <div className="text-xs text-gray-500 mb-2">Pitch Contour:</div>
          <svg viewBox="0 0 350 60" className="w-full h-16">
            {sentence.map((word, i) => {
              const x = 25 + i * 48;
              const isEmphasis = i === emphasisIndex;
              const baseY = 35;
              const y = isEmphasis ? 15 : baseY;

              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isEmphasis ? 8 : 5}
                    fill={isEmphasis ? "#22C55E" : "#9CA3AF"}
                  />
                  <text
                    x={x}
                    y="55"
                    textAnchor="middle"
                    fontSize="10"
                    fill={isEmphasis ? "#22C55E" : "#6B7280"}
                    fontWeight={isEmphasis ? "bold" : "normal"}
                  >
                    {word}
                  </text>
                  {i < sentence.length - 1 && (
                    <line
                      x1={x + 8}
                      y1={y}
                      x2={25 + (i + 1) * 48 - 8}
                      y2={i + 1 === emphasisIndex ? 15 : baseY}
                      stroke="#D1D5DB"
                      strokeWidth="2"
                    />
                  )}
                </g>
              );
            })}
            <text x="340" y="20" fontSize="8" fill="#22C55E">
              High
            </text>
            <text x="340" y="40" fontSize="8" fill="#9CA3AF">
              Low
            </text>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mb-4">
        {prosodyElements.map((el, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{el.icon}</span>
            <div className="font-medium text-sm text-green-800">{el.name}</div>
            <div className="text-xs text-gray-500">{el.example}</div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          🤖 Why Robotic Speech Sounds Robotic
        </h4>
        <p className="text-sm text-yellow-700">
          Robotic-sounding speech usually results from{" "}
          <strong>flat, monotone prosody</strong> — not imperfect phoneme
          pronunciation. Natural prosody is what makes speech sound human!
        </p>
      </div>
    </Section>
  );
};

const SpeechSynthesisSection = () => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Acoustic Model",
      desc: "Convert phonemes + prosody → mel-spectrogram",
      icon: "📊",
    },
    {
      title: "Neural Vocoder",
      desc: "Convert mel-spectrogram → audio waveform",
      icon: "🔊",
    },
    {
      title: "Post-processing",
      desc: "Apply filtering and normalization",
      icon: "✨",
    },
  ];

  const vocoders = [
    { name: "WaveNet", year: "2016", note: "Google, pioneered neural TTS" },
    { name: "WaveGlow", year: "2018", note: "NVIDIA, faster generation" },
    { name: "HiFi-GAN", year: "2020", note: "High fidelity, real-time" },
  ];

  return (
    <Section title="🔊 Stage 4: Speech Synthesis" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        The final stage generates the actual audio waveform using{" "}
        <strong>neural vocoders</strong> — deep learning models that produce
        natural-sounding speech.
      </p>

      <div className="flex gap-2 mb-4">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              step === i
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {s.icon} {s.title}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-2">
          {steps[step].title}
        </h4>
        <p className="text-sm text-amber-700 mb-4">{steps[step].desc}</p>

        <div className="bg-white rounded-lg p-4">
          {step === 0 && (
            <div>
              <div className="text-center mb-3">
                <span className="text-sm text-gray-600">
                  Phonemes + Prosody →{" "}
                </span>
                <span className="font-semibold text-amber-700">
                  Mel-Spectrogram
                </span>
              </div>
              {/* Mel spectrogram visualization */}
              <svg viewBox="0 0 300 100" className="w-full h-24">
                <defs>
                  <linearGradient
                    id="heatGrad"
                    x1="0%"
                    y1="100%"
                    x2="0%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#1E3A8A" />
                    <stop offset="25%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#22C55E" />
                    <stop offset="75%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#EF4444" />
                  </linearGradient>
                </defs>
                <rect
                  x="30"
                  y="10"
                  width="240"
                  height="70"
                  fill="url(#heatGrad)"
                  rx="4"
                  opacity="0.8"
                />

                {/* Frequency bands simulation */}
                {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
                  <g key={row}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((col) => {
                      const intensity = Math.random() * 0.7 + 0.3;
                      return (
                        <rect
                          key={col}
                          x={35 + col * 19}
                          y={15 + row * 8}
                          width="15"
                          height="6"
                          fill={`rgba(255,255,255,${1 - intensity})`}
                          rx="1"
                        />
                      );
                    })}
                  </g>
                ))}

                <text
                  x="15"
                  y="50"
                  fontSize="8"
                  fill="#6B7280"
                  transform="rotate(-90, 15, 50)"
                >
                  Freq
                </text>
                <text
                  x="150"
                  y="95"
                  fontSize="8"
                  fill="#6B7280"
                  textAnchor="middle"
                >
                  Time →
                </text>
              </svg>
              <p className="text-xs text-gray-500 text-center mt-2">
                Visual representation of sound frequencies over time
              </p>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="text-center mb-3">
                <span className="text-sm text-gray-600">
                  Mel-Spectrogram →{" "}
                </span>
                <span className="font-semibold text-amber-700">
                  Audio Waveform
                </span>
              </div>
              {/* Waveform visualization */}
              <svg viewBox="0 0 300 80" className="w-full h-20">
                <line
                  x1="20"
                  y1="40"
                  x2="280"
                  y2="40"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
                <path
                  d={`M 20,40 ${Array.from({ length: 50 }, (_, i) => {
                    const x = 20 + i * 5.2;
                    const seed = Math.sin(i * 12.9898) * 43758.5453;
                    const pseudoRandom = seed - Math.floor(seed);
                    const amp =
                      Math.sin(i * 0.5) * 20 +
                      Math.sin(i * 0.8) * 10 +
                      pseudoRandom * 5;
                    return `L ${x},${40 - amp}`;
                  }).join(" ")}`}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
                <text x="290" y="45" fontSize="8" fill="#6B7280">
                  t
                </text>
              </svg>

              <div className="grid grid-cols-3 gap-2 mt-3">
                {vocoders.map((v, i) => (
                  <div key={i} className="bg-amber-100 rounded p-2 text-center">
                    <div className="font-semibold text-sm text-amber-800">
                      {v.name}
                    </div>
                    <div className="text-xs text-amber-600">{v.year}</div>
                    <div className="text-xs text-gray-500">{v.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🎚️", name: "Filtering", desc: "Remove artifacts" },
                {
                  icon: "📊",
                  name: "Normalization",
                  desc: "Consistent volume",
                },
                { icon: "🎛️", name: "Effects", desc: "Match output specs" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-amber-100 rounded-lg p-3 text-center"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="font-medium text-sm text-amber-800">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-600">{item.desc}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">
          ✨ Why Neural Vocoders Excel
        </h4>
        <div className="grid grid-cols-4 gap-2 text-sm">
          {[
            { label: "High Fidelity", desc: "Studio quality" },
            { label: "Natural", desc: "Subtle vocal details" },
            { label: "Real-time", desc: "Fast generation" },
            { label: "Flexible", desc: "Multiple voices" },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-medium text-green-700">{item.label}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const CompletePipelineDemo = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const input = "Dr. Chen's appointment is at 3:00 PM";

  const stages = [
    {
      name: "Input Text",
      icon: "📝",
      output: input,
      color: "#6B7280",
    },
    {
      name: "Text Normalization",
      icon: "📝",
      output: "Doctor Chen's appointment is at three o'clock P M",
      color: "#3B82F6",
    },
    {
      name: "Linguistic Analysis",
      icon: "🔤",
      output: "/ˈdɑktər ˈtʃɛnz əˈpɔɪntmənt ɪz æt θri əˈklɑk pi ɛm/",
      color: "#8B5CF6",
    },
    {
      name: "Prosody Generation",
      icon: "🎵",
      output: "↗appointment (rise), ⏸ pause after 'is', 💪 emphasis on 'three'",
      color: "#22C55E",
    },
    {
      name: "Speech Synthesis",
      icon: "🔊",
      output: "🔊 Audio waveform generated (~0.8 seconds)",
      color: "#F59E0B",
    },
  ];

  useEffect(() => {
    if (isRunning && step < stages.length - 1) {
      const interval = setInterval(() => {
        setStep((s) => {
          const nextStep = s + 1;
          // Stop running when we reach the end (deferred to avoid cascading renders)
          if (nextStep >= stages.length - 1) {
            setTimeout(() => setIsRunning(false), 0);
          }
          return nextStep;
        });
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isRunning, step, stages.length]);

  return (
    <Section title="🔄 Complete Pipeline Demo" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Watch the entire TTS pipeline process a real example:
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
        {/* Progress indicator */}
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
                  i === step ? "ring-4 ring-indigo-300" : ""
                }`}
                style={{ backgroundColor: i <= step ? s.color : "#E5E7EB" }}
              >
                <span className={i <= step ? "" : "grayscale"}>{s.icon}</span>
              </div>
              <div className="text-xs mt-1 text-center max-w-16 text-gray-600">
                {s.name.split(" ")[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Current output */}
        <div
          className="bg-white rounded-lg p-4 border-2 transition-all"
          style={{ borderColor: stages[step].color }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{stages[step].icon}</span>
            <span
              className="font-semibold"
              style={{ color: stages[step].color }}
            >
              {stages[step].name}
            </span>
          </div>
          <div className="font-mono text-sm bg-gray-50 rounded p-3">
            {stages[step].output}
          </div>
        </div>

        {step === stages.length - 1 && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              <span className="text-xl">✅</span>
              <span className="font-medium">
                Pipeline complete! Audio ready in under 1 second.
              </span>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">📝 Text Normalization</h3>
        <p className="text-sm text-blue-700">
          Expand abbreviations, numbers, symbols into spoken forms.
          Domain-specific rules improve accuracy.
        </p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">
          🔤 Linguistic Analysis
        </h3>
        <p className="text-sm text-purple-700">
          G2P converts graphemes to phonemes. Context matters — transformers
          resolve ambiguous pronunciations.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">🎵 Prosody Generation</h3>
        <p className="text-sm text-green-700">
          Pitch, duration, stress, pauses make speech natural. Emphasis changes
          meaning dramatically!
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">🔊 Speech Synthesis</h3>
        <p className="text-sm text-amber-700">
          Neural vocoders (WaveNet, HiFi-GAN) convert mel-spectrograms to
          high-fidelity audio waveforms.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Speech synthesis is the inverse of speech recognition. While ASR
        converts audio → text, TTS converts text → audio. Modern neural TTS
        systems achieve remarkably natural results by separating the problem
        into stages: what to say (phonemes), how to say it (prosody), and
        generating the sound (vocoders).
      </p>
    </div>
  </Section>
);

export default function SpeechSynthesisGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-[1536px] mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
            🔊 Speech Synthesis Pipeline
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            A Visual Guide to How Text-to-Speech Really Works
          </p>
        </div>

        <PipelineOverview />
        <TextNormalizationSection />
        <LinguisticAnalysisSection />
        <ProsodySection />
        <SpeechSynthesisSection />
        <CompletePipelineDemo />
        <SummarySection />
      </div>
    </div>
  );
}
