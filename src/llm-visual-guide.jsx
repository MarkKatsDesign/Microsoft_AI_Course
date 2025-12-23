import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ConceptIntro = () => (
  <Section title="💬 What are Large Language Models?" color="#8b5cf6">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-gray-700 mb-4">
          Think of LLMs as <strong>super-powered autocomplete</strong>. Your
          phone suggests the next word — LLMs do the same thing, but with a deep
          understanding of language.
        </p>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📱</span>
            <span className="font-medium">Phone autocomplete:</span>
          </div>
          <div className="bg-white rounded-lg p-2 font-mono text-sm">
            "I'm on my <span className="bg-blue-100 px-1 rounded">way</span>"
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <span className="font-medium">LLM:</span>
          </div>
          <div className="bg-white rounded-lg p-2 font-mono text-sm">
            "Explain quantum physics{" "}
            <span className="bg-purple-100 px-1 rounded">
              in simple terms. Quantum physics describes how particles behave
              at...
            </span>
            "
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">What makes LLMs special:</h3>
        <div className="space-y-2">
          {[
            { icon: "📚", text: "Massive vocabulary (100,000+ tokens)" },
            { icon: "🔗", text: "Understands relationships between words" },
            { icon: "🎯", text: "Knows context changes meaning" },
            { icon: "✨", text: "Can generate coherent, relevant text" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm text-gray-700">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const TokenizationDemo = () => {
  const [inputText, setInputText] = useState(
    "I heard a dog bark loudly at a cat"
  );
  const [showTokens, setShowTokens] = useState(false);

  const tokenize = (text) => {
    const tokenMap = {
      i: { id: 1, color: "#EF4444" },
      heard: { id: 2, color: "#F97316" },
      a: { id: 3, color: "#EAB308" },
      dog: { id: 4, color: "#22C55E" },
      bark: { id: 5, color: "#14B8A6" },
      loudly: { id: 6, color: "#3B82F6" },
      at: { id: 7, color: "#8B5CF6" },
      cat: { id: 8, color: "#EC4899" },
      the: { id: 9, color: "#6366F1" },
      is: { id: 10, color: "#A855F7" },
      was: { id: 11, color: "#D946EF" },
      puppy: { id: 127, color: "#10B981" },
      car: { id: 128, color: "#06B6D4" },
      skateboard: { id: 129, color: "#0EA5E9" },
    };

    return text.split(/\s+/).map((word) => {
      const cleanWord = word.toLowerCase().replace(/[.,!?]/g, "");
      const token = tokenMap[cleanWord] || {
        id: Math.floor(Math.random() * 1000) + 200,
        color: "#9CA3AF",
      };
      return { word, ...token };
    });
  };

  const tokens = tokenize(inputText);

  return (
    <Section title="🔤 Step 1: Tokenization" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Before understanding text, LLMs break it into <strong>tokens</strong> —
        words, sub-words, and punctuation. Each token gets a unique ID number.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-2">
          Try your own text:
        </label>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="Type a sentence..."
        />
      </div>

      <button
        onClick={() => setShowTokens(!showTokens)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        {showTokens ? "📝 Show Original" : "🔢 Tokenize!"}
      </button>

      <div className="bg-gray-50 rounded-xl p-4">
        {!showTokens ? (
          <p className="text-lg">{inputText}</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tokens.map((token, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-2 rounded-lg text-white transition-all hover:scale-105"
                style={{ backgroundColor: token.color }}
              >
                <span className="font-medium">{token.word}</span>
                <span className="text-xs opacity-80">ID: {token.id}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <div className="font-bold text-lg">{tokens.length}</div>
          <div className="text-gray-600">Tokens</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <div className="font-bold text-lg">~100K+</div>
          <div className="text-gray-600">Typical Vocab Size</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <div className="font-bold text-lg">"un"</div>
          <div className="text-gray-600">Sub-word Example</div>
        </div>
        <div className="bg-gray-100 rounded-lg p-2 text-center">
          <div className="font-bold text-lg">"."</div>
          <div className="text-gray-600">Punctuation Token</div>
        </div>
      </div>
    </Section>
  );
};

const EmbeddingsSection = () => {
  const [selectedToken, setSelectedToken] = useState("dog");

  const tokens = [
    { word: "dog", vector: [10, 3, 2], color: "#22C55E" },
    { word: "puppy", vector: [5, 3, 2], color: "#10B981" },
    { word: "cat", vector: [10, 3, 1], color: "#F97316" },
    { word: "bark", vector: [9, 2, 10], color: "#3B82F6" },
    { word: "car", vector: [-2, -2, 1], color: "#8B5CF6" },
    { word: "skateboard", vector: [-3, -2, 2], color: "#EC4899" },
  ];

  const selectedData = tokens.find((t) => t.word === selectedToken);

  return (
    <Section
      title="📊 Step 2: Embeddings (Vector Representations)"
      color="#10b981"
    >
      <p className="text-gray-700 mb-4">
        Each token is converted to a <strong>vector</strong> — an array of
        numbers that captures its meaning and relationships. Similar words have
        similar vectors!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-3">Click a token to explore:</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {tokens.map((token) => (
              <button
                key={token.word}
                onClick={() => setSelectedToken(token.word)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedToken === token.word
                    ? "text-white scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor:
                    selectedToken === token.word ? token.color : undefined,
                }}
              >
                {token.word}
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <span
                className="text-xl font-bold px-3 py-1 rounded text-white"
                style={{ backgroundColor: selectedData.color }}
              >
                "{selectedData.word}"
              </span>
            </div>
            <div className="font-mono bg-white rounded-lg p-3 border">
              Vector = [{selectedData.vector.join(", ")}]
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Real LLMs use vectors with <strong>thousands</strong> of
              dimensions!
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl p-4">
          <h3 className="font-semibold mb-3">3D Vector Space Visualization:</h3>
          <svg viewBox="0 0 200 180" className="w-full h-48">
            {/* 3D axes */}
            <line
              x1="100"
              y1="150"
              x2="100"
              y2="30"
              stroke="#9CA3AF"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="150"
              x2="180"
              y2="150"
              stroke="#9CA3AF"
              strokeWidth="1"
            />
            <line
              x1="100"
              y1="150"
              x2="40"
              y2="170"
              stroke="#9CA3AF"
              strokeWidth="1"
            />
            <text
              x="100"
              y="20"
              textAnchor="middle"
              fontSize="10"
              fill="#6B7280"
            >
              y
            </text>
            <text x="185" y="153" fontSize="10" fill="#6B7280">
              x
            </text>
            <text x="30" y="175" fontSize="10" fill="#6B7280">
              z
            </text>

            {/* Plot tokens as vectors */}
            {tokens.map((token, i) => {
              const x = 100 + token.vector[0] * 6;
              const y = 150 - token.vector[1] * 12;
              const isSelected = token.word === selectedToken;
              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke={token.color}
                    strokeWidth={isSelected ? 3 : 1.5}
                    opacity={isSelected ? 1 : 0.5}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 8 : 5}
                    fill={token.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                  {isSelected && (
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
          </svg>
          <p className="text-sm text-center text-gray-600">
            Notice: "dog" and "puppy" point in similar directions! 🐕
          </p>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          💡 Key Insight: Semantic Similarity
        </h4>
        <p className="text-sm text-yellow-700">
          Words used in similar contexts get similar vectors. We can measure
          similarity using <strong>cosine similarity</strong> — how much two
          vectors point in the same direction. "Dog" and "puppy" are close;
          "dog" and "skateboard" are far apart!
        </p>
      </div>
    </Section>
  );
};

const AttentionDemo = () => {
  const [hoveredWord, setHoveredWord] = useState("bark");

  const sentence = ["I", "heard", "a", "dog", "bark", "loudly"];

  const attentionWeights = {
    I: { I: 0.8, heard: 0.1, a: 0.05, dog: 0.03, bark: 0.01, loudly: 0.01 },
    heard: { I: 0.3, heard: 0.4, a: 0.1, dog: 0.1, bark: 0.05, loudly: 0.05 },
    a: { I: 0.1, heard: 0.1, a: 0.3, dog: 0.4, bark: 0.05, loudly: 0.05 },
    dog: { I: 0.05, heard: 0.2, a: 0.1, dog: 0.4, bark: 0.2, loudly: 0.05 },
    bark: { I: 0.05, heard: 0.25, a: 0.05, dog: 0.4, bark: 0.2, loudly: 0.05 },
    loudly: {
      I: 0.05,
      heard: 0.15,
      a: 0.05,
      dog: 0.1,
      bark: 0.35,
      loudly: 0.3,
    },
  };

  const weights = attentionWeights[hoveredWord];

  return (
    <Section
      title="👀 Step 3: Attention - Understanding Context"
      color="#f59e0b"
    >
      <p className="text-gray-700 mb-4">
        The <strong>attention mechanism</strong> figures out which words
        influence each other. Hover over a word to see what it "pays attention
        to":
      </p>

      <div className="bg-amber-50 rounded-xl p-6 mb-4">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {sentence.map((word, i) => {
            const weight = weights[word];
            const isHovered = word === hoveredWord;
            return (
              <div
                key={i}
                className="relative cursor-pointer transition-all"
                onMouseEnter={() => setHoveredWord(word)}
              >
                <div
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    isHovered
                      ? "bg-amber-500 text-white scale-110"
                      : "bg-white border-2"
                  }`}
                  style={{
                    borderColor: !isHovered
                      ? `rgba(245, 158, 11, ${weight})`
                      : undefined,
                    backgroundColor: !isHovered
                      ? `rgba(245, 158, 11, ${weight * 0.3})`
                      : undefined,
                  }}
                >
                  {word}
                </div>
                {!isHovered && (
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-amber-600">
                    {(weight * 100).toFixed(0)}%
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center text-sm text-amber-700">
          When processing "<span className="font-bold">{hoveredWord}</span>",
          the model pays most attention to:
          <span className="font-bold ml-1">
            {Object.entries(weights)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 2)
              .map(([w]) => w)
              .join(" & ")}
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-2">
            🎯 Why Attention Matters
          </h4>
          <p className="text-sm text-gray-600">
            "Bark" could mean a dog's sound OR tree bark. By attending to "dog"
            and "heard", the model knows it's the sound!
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-2">
            🔀 Multi-Head Attention
          </h4>
          <p className="text-sm text-gray-600">
            Real transformers use multiple "attention heads" in parallel, each
            learning different relationships.
          </p>
        </div>
      </div>
    </Section>
  );
};

const TransformerArchitecture = () => {
  const [activeBlock, setActiveBlock] = useState(null);

  return (
    <Section title="🏗️ The Transformer Architecture" color="#6366f1">
      <p className="text-gray-700 mb-4">
        The transformer has two main blocks. Hover over each to learn more:
      </p>

      <div className="flex flex-col md:flex-row gap-6 items-center">
        <svg viewBox="0 0 300 250" className="w-full md:w-2/3 h-64">
          {/* Input */}
          <rect x="110" y="220" width="80" height="25" rx="5" fill="#9CA3AF" />
          <text x="150" y="237" textAnchor="middle" fontSize="10" fill="white">
            Input Tokens
          </text>

          {/* Arrow up */}
          <line
            x1="150"
            y1="220"
            x2="150"
            y2="200"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <polygon points="145,202 150,192 155,202" fill="#9CA3AF" />

          {/* Encoder */}
          <g
            onMouseEnter={() => setActiveBlock("encoder")}
            onMouseLeave={() => setActiveBlock(null)}
            style={{ cursor: "pointer" }}
          >
            <rect
              x="20"
              y="80"
              width="120"
              height="110"
              rx="10"
              fill={activeBlock === "encoder" ? "#3B82F6" : "#60A5FA"}
              stroke={activeBlock === "encoder" ? "#1D4ED8" : "none"}
              strokeWidth="3"
            />
            <text
              x="80"
              y="105"
              textAnchor="middle"
              fontSize="11"
              fill="white"
              fontWeight="bold"
            >
              ENCODER
            </text>
            <rect
              x="35"
              y="115"
              width="90"
              height="25"
              rx="5"
              fill="rgba(255,255,255,0.3)"
            />
            <text x="80" y="132" textAnchor="middle" fontSize="9" fill="white">
              Attention
            </text>
            <rect
              x="35"
              y="150"
              width="90"
              height="25"
              rx="5"
              fill="rgba(255,255,255,0.3)"
            />
            <text x="80" y="167" textAnchor="middle" fontSize="9" fill="white">
              Neural Network
            </text>
          </g>

          {/* Arrow from input to encoder */}
          <path
            d="M 120,195 Q 80,195 80,190"
            stroke="#9CA3AF"
            strokeWidth="2"
            fill="none"
          />
          <polygon points="75,192 80,182 85,192" fill="#9CA3AF" />

          {/* Decoder */}
          <g
            onMouseEnter={() => setActiveBlock("decoder")}
            onMouseLeave={() => setActiveBlock(null)}
            style={{ cursor: "pointer" }}
          >
            <rect
              x="160"
              y="80"
              width="120"
              height="110"
              rx="10"
              fill={activeBlock === "decoder" ? "#22C55E" : "#4ADE80"}
              stroke={activeBlock === "decoder" ? "#166534" : "none"}
              strokeWidth="3"
            />
            <text
              x="220"
              y="105"
              textAnchor="middle"
              fontSize="11"
              fill="white"
              fontWeight="bold"
            >
              DECODER
            </text>
            <rect
              x="175"
              y="115"
              width="90"
              height="25"
              rx="5"
              fill="rgba(255,255,255,0.3)"
            />
            <text x="220" y="132" textAnchor="middle" fontSize="9" fill="white">
              Masked Attention
            </text>
            <rect
              x="175"
              y="150"
              width="90"
              height="25"
              rx="5"
              fill="rgba(255,255,255,0.3)"
            />
            <text x="220" y="167" textAnchor="middle" fontSize="9" fill="white">
              Neural Network
            </text>
          </g>

          {/* Arrow from input to decoder */}
          <path
            d="M 180,195 Q 220,195 220,190"
            stroke="#9CA3AF"
            strokeWidth="2"
            fill="none"
          />
          <polygon points="215,192 220,182 225,192" fill="#9CA3AF" />

          {/* Arrow encoder to decoder */}
          <line
            x1="140"
            y1="135"
            x2="160"
            y2="135"
            stroke="#6366F1"
            strokeWidth="2"
          />
          <polygon points="155,130 165,135 155,140" fill="#6366F1" />
          <text x="150" y="125" textAnchor="middle" fontSize="8" fill="#6366F1">
            embeddings
          </text>

          {/* Output */}
          <line
            x1="220"
            y1="80"
            x2="220"
            y2="55"
            stroke="#9CA3AF"
            strokeWidth="2"
          />
          <polygon points="215,57 220,47 225,57" fill="#9CA3AF" />
          <rect x="170" y="15" width="100" height="30" rx="5" fill="#EC4899" />
          <text x="220" y="35" textAnchor="middle" fontSize="10" fill="white">
            Next Token
          </text>
        </svg>

        <div className="md:w-1/3">
          <div
            className={`p-4 rounded-xl border-2 transition-all ${
              activeBlock === "encoder"
                ? "bg-blue-50 border-blue-400"
                : activeBlock === "decoder"
                ? "bg-green-50 border-green-400"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {activeBlock === "encoder" ? (
              <>
                <h3 className="font-bold text-blue-800 mb-2">🔵 Encoder</h3>
                <p className="text-sm text-blue-700">
                  Creates <strong>embeddings</strong> by analyzing how tokens
                  relate to each other. Uses attention to capture context and
                  meaning.
                </p>
              </>
            ) : activeBlock === "decoder" ? (
              <>
                <h3 className="font-bold text-green-800 mb-2">🟢 Decoder</h3>
                <p className="text-sm text-green-700">
                  Predicts the <strong>next token</strong> using embeddings.
                  Uses "masked" attention — can only look at previous tokens,
                  not future ones!
                </p>
              </>
            ) : (
              <p className="text-gray-500 italic">
                👆 Hover over Encoder or Decoder to learn more
              </p>
            )}
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <strong>Note:</strong> Modern LLMs like GPT use mainly the decoder;
            BERT uses mainly the encoder.
          </div>
        </div>
      </div>
    </Section>
  );
};

const PredictionDemo = () => {
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const sequence = [
    { text: "When my dog was a", next: null },
    { text: "When my dog was a puppy", next: "puppy" },
    { text: "When my dog was a puppy ,", next: "," },
    { text: "When my dog was a puppy , he", next: "he" },
    { text: "When my dog was a puppy , he loved", next: "loved" },
    { text: "When my dog was a puppy , he loved to", next: "to" },
    { text: "When my dog was a puppy , he loved to play", next: "play" },
  ];

  const probabilities = [
    [
      { word: "puppy", prob: 0.72 },
      { word: "cat", prob: 0.08 },
      { word: "baby", prob: 0.12 },
      { word: "skateboard", prob: 0.02 },
    ],
    [
      { word: ",", prob: 0.65 },
      { word: ".", prob: 0.2 },
      { word: "I", prob: 0.05 },
    ],
    [
      { word: "he", prob: 0.58 },
      { word: "she", prob: 0.22 },
      { word: "it", prob: 0.15 },
    ],
    [
      { word: "loved", prob: 0.45 },
      { word: "would", prob: 0.25 },
      { word: "always", prob: 0.18 },
    ],
    [
      { word: "to", prob: 0.7 },
      { word: "playing", prob: 0.15 },
      { word: "chasing", prob: 0.1 },
    ],
    [
      { word: "play", prob: 0.55 },
      { word: "run", prob: 0.2 },
      { word: "eat", prob: 0.15 },
    ],
  ];

  useEffect(() => {
    let interval;
    if (isGenerating && step < sequence.length - 1) {
      interval = setInterval(() => {
        setStep((s) => s + 1);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isGenerating, step, sequence.length]);

  return (
    <Section
      title="✨ Generating Text: Predicting the Next Token"
      color="#ec4899"
    >
      <p className="text-gray-700 mb-4">
        LLMs generate text one token at a time. At each step, they predict the
        most probable next token:
      </p>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => {
            setStep(0);
            setIsGenerating(true);
          }}
          className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all"
        >
          ✨ Generate Text
        </button>
        <button
          onClick={() => {
            setStep(0);
            setIsGenerating(false);
          }}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="bg-pink-50 rounded-xl p-4 mb-4">
        <div className="font-mono text-lg mb-2">
          {sequence[step].text.split(" ").map((word, i) => (
            <span
              key={i}
              className={`${
                i === sequence[step].text.split(" ").length - 1 && step > 0
                  ? "bg-pink-500 text-white px-1 rounded"
                  : ""
              }`}
            >
              {word}{" "}
            </span>
          ))}
          <span className="animate-pulse">|</span>
        </div>
      </div>

      {step > 0 && step < probabilities.length + 1 && (
        <div className="bg-white rounded-xl p-4 border border-pink-200">
          <h4 className="font-semibold text-pink-800 mb-3">
            Probabilities for position {step}:
          </h4>
          <div className="space-y-2">
            {probabilities[step - 1]?.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-24 font-mono text-sm">{item.word}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      i === 0 ? "bg-pink-500" : "bg-pink-200"
                    }`}
                    style={{ width: `${item.prob * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-12">
                  {(item.prob * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-pink-600 mt-3">
            → Selected: "<strong>{sequence[step].next}</strong>" (highest
            probability)
          </p>
        </div>
      )}
    </Section>
  );
};

const ContextMatters = () => (
  <Section title="🌳 Context Changes Everything" color="#059669">
    <p className="text-gray-700 mb-4">
      The same word can have different embeddings based on context. This is why
      attention is so powerful!
    </p>

    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-300">
        <div className="text-center mb-3">
          <span className="text-4xl">🐕</span>
        </div>
        <p className="text-center font-medium mb-2">
          "I heard a dog <span className="bg-green-200 px-2 rounded">bark</span>
          "
        </p>
        <div className="bg-white rounded-lg p-3 font-mono text-sm text-center">
          bark → [9, 2, 10]
        </div>
        <p className="text-sm text-green-700 text-center mt-2">
          Sound a dog makes
        </p>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border-2 border-amber-300">
        <div className="text-center mb-3">
          <span className="text-4xl">🌳</span>
        </div>
        <p className="text-center font-medium mb-2">
          "The tree has rough{" "}
          <span className="bg-amber-200 px-2 rounded">bark</span>"
        </p>
        <div className="bg-white rounded-lg p-3 font-mono text-sm text-center">
          bark → [2, -2, 3]
        </div>
        <p className="text-sm text-amber-700 text-center mt-2">
          Outer layer of a tree
        </p>
      </div>
    </div>

    <div className="mt-4 bg-gray-100 rounded-lg p-4">
      <p className="text-sm text-gray-700">
        <strong>The attention mechanism</strong> looks at surrounding words
        ("dog" vs "tree") to determine which meaning of "bark" is intended,
        producing different embedding vectors for the same token!
      </p>
    </div>
  </Section>
);

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🔤 Tokenization</h3>
        <p className="text-sm text-blue-700">
          Text is broken into tokens (words, sub-words, punctuation) with unique
          IDs. Vocabulary can be 100K+ tokens.
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">📊 Embeddings</h3>
        <p className="text-sm text-green-700">
          Tokens become vectors that capture meaning. Similar words → similar
          vectors. Context changes embeddings!
        </p>
      </div>
      <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">👀 Attention</h3>
        <p className="text-sm text-amber-700">
          The key innovation! Determines which words influence each other. "dog"
          helps disambiguate "bark".
        </p>
      </div>
      <div className="bg-linear-to-br from-pink-50 to-pink-100 rounded-xl p-4 border border-pink-200">
        <h3 className="font-bold text-pink-800 mb-2">✨ Generation</h3>
        <p className="text-sm text-pink-700">
          Predict next token → add to sequence → repeat. Each step considers all
          previous tokens via attention.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        LLMs are essentially super-sophisticated pattern matchers trained on
        vast amounts of text. They learn which words typically follow others,
        and how context shapes meaning. The "Attention is All You Need" paper
        (2017) introduced the transformer architecture that made modern LLMs
        like GPT possible!
      </p>
    </div>
  </Section>
);

export default function LLMGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 Large Language Models (LLMs)
          </h1>
          <p className="text-gray-600">
            A Visual Guide to How AI Understands Language
          </p>
        </div>

        <ConceptIntro />
        <TokenizationDemo />
        <EmbeddingsSection />
        <AttentionDemo />
        <TransformerArchitecture />
        <PredictionDemo />
        <ContextMatters />
        <SummarySection />
      </div>
    </div>
  );
}
