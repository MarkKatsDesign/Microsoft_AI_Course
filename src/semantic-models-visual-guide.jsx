import React, { useState } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ConceptIntro = () => (
  <Section title="🧠 What are Semantic Language Models?" color="#8b5cf6">
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <p className="text-gray-700 mb-4">
          Modern NLP represents words as <strong>vectors</strong> (arrays of
          numbers) called <strong>embeddings</strong>. These vectors capture the{" "}
          <em>meaning</em> of words based on how they're used.
        </p>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-2">
            The Key Insight
          </h4>
          <p className="text-sm text-purple-700">
            Words with similar meanings have similar vectors — they "point" in
            similar directions in mathematical space!
          </p>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-3">Evolution of techniques:</h3>
        <div className="space-y-2">
          {[
            {
              era: "Early",
              tech: "Bag-of-Words",
              desc: "Just count words",
              icon: "📊",
            },
            {
              era: "2013",
              tech: "Word2Vec",
              desc: "Dense word vectors",
              icon: "🎯",
            },
            {
              era: "2014",
              tech: "GloVe",
              desc: "Global word vectors",
              icon: "🌐",
            },
            {
              era: "2017+",
              tech: "Transformers",
              desc: "Contextual embeddings (GPT, BERT)",
              icon: "🚀",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-gray-50 rounded-lg p-2"
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <span className="font-medium text-sm">{item.tech}</span>
                <span className="text-gray-500 text-xs ml-2">({item.era})</span>
              </div>
              <span className="text-xs text-gray-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Section>
);

const VectorVisualization = () => {
  const [selectedWord, setSelectedWord] = useState("dog");
  const [showAll, setShowAll] = useState(true);

  const words = [
    {
      word: "dog",
      vector: [0.8, 0.6, 0.1],
      color: "#3B82F6",
      category: "animal",
    },
    {
      word: "puppy",
      vector: [0.9, 0.7, 0.4],
      color: "#60A5FA",
      category: "animal",
    },
    {
      word: "cat",
      vector: [0.7, 0.5, 0.2],
      color: "#22C55E",
      category: "animal",
    },
    {
      word: "kitten",
      vector: [0.8, 0.6, 0.5],
      color: "#4ADE80",
      category: "animal",
    },
    {
      word: "young",
      vector: [0.1, 0.1, 0.3],
      color: "#F59E0B",
      category: "concept",
    },
    {
      word: "ball",
      vector: [0.3, 0.9, 0.1],
      color: "#EF4444",
      category: "object",
    },
    {
      word: "tree",
      vector: [0.2, 0.1, 0.9],
      color: "#8B5CF6",
      category: "object",
    },
  ];

  const selectedData = words.find((w) => w.word === selectedWord);

  // Simple 3D to 2D projection
  const project = (v) => ({
    x: 100 + v[0] * 80 - v[2] * 30,
    y: 180 - v[1] * 100 - v[2] * 40,
  });

  return (
    <Section title="📐 Words as Vectors in 3D Space" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Each word becomes a point in multidimensional space. Words with similar
        meanings cluster together!
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {words.map((w) => (
          <button
            key={w.word}
            onClick={() => setSelectedWord(w.word)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              selectedWord === w.word
                ? "text-white scale-105"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedWord === w.word ? w.color : undefined,
            }}
          >
            {w.word}
          </button>
        ))}
        <button
          onClick={() => setShowAll(!showAll)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            showAll ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-600"
          }`}
        >
          {showAll ? "👁️ All" : "👁️ One"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <svg viewBox="0 0 220 220" className="w-full h-64">
            {/* Axes */}
            <line
              x1="100"
              y1="180"
              x2="190"
              y2="180"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="180"
              x2="100"
              y2="60"
              stroke="#9CA3AF"
              strokeWidth="2"
            />
            <line
              x1="100"
              y1="180"
              x2="50"
              y2="210"
              stroke="#9CA3AF"
              strokeWidth="2"
            />

            <text x="195" y="185" fontSize="10" fill="#6B7280">
              x
            </text>
            <text x="95" y="55" fontSize="10" fill="#6B7280">
              y
            </text>
            <text x="40" y="215" fontSize="10" fill="#6B7280">
              z
            </text>

            {/* Origin */}
            <circle cx="100" cy="180" r="3" fill="#374151" />

            {/* Vectors */}
            {words.map((w, i) => {
              const isSelected = w.word === selectedWord;
              const shouldShow = showAll || isSelected;
              if (!shouldShow) return null;

              const end = project(w.vector);

              return (
                <g key={i} opacity={isSelected ? 1 : 0.4}>
                  {/* Vector line */}
                  <line
                    x1="100"
                    y1="180"
                    x2={end.x}
                    y2={end.y}
                    stroke={w.color}
                    strokeWidth={isSelected ? 3 : 1.5}
                  />
                  {/* Arrowhead */}
                  <circle
                    cx={end.x}
                    cy={end.y}
                    r={isSelected ? 8 : 5}
                    fill={w.color}
                    stroke="white"
                    strokeWidth="2"
                  />
                  {/* Label */}
                  {(isSelected || showAll) && (
                    <text
                      x={end.x + 10}
                      y={end.y + 4}
                      fontSize={isSelected ? "11" : "9"}
                      fill={w.color}
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {w.word}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
          <p className="text-xs text-center text-gray-500 mt-2">
            Notice: dog/cat/puppy/kitten cluster together (similar directions)
          </p>
        </div>

        <div>
          <div
            className="rounded-xl p-4 border-2 mb-4"
            style={{
              borderColor: selectedData.color,
              backgroundColor: `${selectedData.color}10`,
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: selectedData.color }}
              >
                {selectedData.word[0].toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold" style={{ color: selectedData.color }}>
                  {selectedData.word}
                </h3>
                <span className="text-xs text-gray-500">
                  {selectedData.category}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3 font-mono text-sm">
              <span className="text-gray-500">vector = </span>
              <span style={{ color: selectedData.color }}>
                [{selectedData.vector.join(", ")}]
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              {["x", "y", "z"].map((axis, i) => (
                <div key={axis} className="bg-white rounded p-2">
                  <div
                    className="font-bold"
                    style={{ color: selectedData.color }}
                  >
                    {selectedData.vector[i]}
                  </div>
                  <div className="text-gray-500">{axis}-axis</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>💡 Real embeddings</strong> have hundreds or thousands of
              dimensions, not just 3! Each dimension captures some aspect of
              meaning.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
};

const CosineSimilarity = () => {
  const [pair, setPair] = useState(["dog", "cat"]);

  const words = {
    dog: { vector: [0.8, 0.6, 0.1], color: "#3B82F6" },
    cat: { vector: [0.7, 0.5, 0.2], color: "#22C55E" },
    tree: { vector: [0.2, 0.1, 0.9], color: "#8B5CF6" },
    puppy: { vector: [0.9, 0.7, 0.4], color: "#60A5FA" },
  };

  const calculateSimilarity = (a, b) => {
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magA * magB);
  };

  const similarity = calculateSimilarity(
    words[pair[0]].vector,
    words[pair[1]].vector
  );

  const pairs = [
    ["dog", "cat"],
    ["dog", "puppy"],
    ["dog", "tree"],
    ["cat", "tree"],
  ];

  return (
    <Section
      title="📏 Cosine Similarity: Measuring Relatedness"
      color="#22c55e"
    >
      <p className="text-gray-700 mb-4">
        <strong>Cosine similarity</strong> measures how similar two vectors are
        by comparing their directions (not their lengths). Values range from -1
        to 1, where 1 = identical direction.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {pairs.map((p, i) => (
          <button
            key={i}
            onClick={() => setPair(p)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              pair[0] === p[0] && pair[1] === p[1]
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {p[0]} ↔ {p[1]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-xl p-4">
          <svg viewBox="0 0 200 200" className="w-full h-48">
            {/* Origin */}
            <circle cx="100" cy="150" r="3" fill="#374151" />

            {/* Vector A */}
            <line
              x1="100"
              y1="150"
              x2={100 + words[pair[0]].vector[0] * 80}
              y2={150 - words[pair[0]].vector[1] * 100}
              stroke={words[pair[0]].color}
              strokeWidth="3"
            />
            <circle
              cx={100 + words[pair[0]].vector[0] * 80}
              cy={150 - words[pair[0]].vector[1] * 100}
              r="8"
              fill={words[pair[0]].color}
            />
            <text
              x={100 + words[pair[0]].vector[0] * 80 + 12}
              y={150 - words[pair[0]].vector[1] * 100 + 4}
              fontSize="12"
              fill={words[pair[0]].color}
              fontWeight="bold"
            >
              {pair[0]}
            </text>

            {/* Vector B */}
            <line
              x1="100"
              y1="150"
              x2={100 + words[pair[1]].vector[0] * 80}
              y2={150 - words[pair[1]].vector[1] * 100}
              stroke={words[pair[1]].color}
              strokeWidth="3"
            />
            <circle
              cx={100 + words[pair[1]].vector[0] * 80}
              cy={150 - words[pair[1]].vector[1] * 100}
              r="8"
              fill={words[pair[1]].color}
            />
            <text
              x={100 + words[pair[1]].vector[0] * 80 + 12}
              y={150 - words[pair[1]].vector[1] * 100 + 4}
              fontSize="12"
              fill={words[pair[1]].color}
              fontWeight="bold"
            >
              {pair[1]}
            </text>

            {/* Angle arc */}
            <path
              d={`M ${100 + 30} ${150} A 30 30 0 0 0 ${100 + 25} ${150 - 15}`}
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2"
              strokeDasharray="4"
            />
            <text x="140" y="145" fontSize="10" fill="#F59E0B">
              θ
            </text>
          </svg>
        </div>

        <div>
          <div className="bg-white rounded-xl p-4 border-2 border-green-200 mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">
              Similarity Score:
            </h4>
            <div
              className="text-4xl font-bold text-center mb-2"
              style={{
                color:
                  similarity > 0.8
                    ? "#22C55E"
                    : similarity > 0.5
                    ? "#F59E0B"
                    : "#EF4444",
              }}
            >
              {similarity.toFixed(3)}
            </div>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${similarity * 100}%`,
                  backgroundColor:
                    similarity > 0.8
                      ? "#22C55E"
                      : similarity > 0.5
                      ? "#F59E0B"
                      : "#EF4444",
                }}
              />
            </div>
            <div className="flex justify-between text-xs mt-1 text-gray-500">
              <span>0 (unrelated)</span>
              <span>1 (identical)</span>
            </div>
          </div>

          <div
            className={`rounded-lg p-3 ${
              similarity > 0.8
                ? "bg-green-100 text-green-800"
                : similarity > 0.5
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <strong>Interpretation:</strong>{" "}
            {similarity > 0.8
              ? `"${pair[0]}" and "${pair[1]}" are very similar! 🎯`
              : similarity > 0.5
              ? `"${pair[0]}" and "${pair[1]}" have moderate similarity.`
              : `"${pair[0]}" and "${pair[1]}" are quite different. 🌲`}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">The Formula:</h4>
        <div className="font-mono text-sm bg-white rounded p-3 text-center">
          cosine_similarity(A, B) = (A · B) / (||A|| × ||B||)
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Dot product divided by the product of magnitudes
        </p>
      </div>
    </Section>
  );
};

const VectorArithmetic = () => {
  const [operation, setOperation] = useState("add");

  const operations = {
    add: {
      title: "dog + young = puppy",
      icon: "➕",
      desc: 'Adding the concept of "young" transforms adult animals to their young counterparts!',
      a: { word: "dog", vector: [0.8, 0.6, 0.1], color: "#3B82F6" },
      b: { word: "young", vector: [0.1, 0.1, 0.3], color: "#F59E0B" },
      result: { word: "puppy", vector: [0.9, 0.7, 0.4], color: "#60A5FA" },
      op: "+",
    },
    add2: {
      title: "cat + young = kitten",
      icon: "➕",
      desc: "The same transformation works for cats too!",
      a: { word: "cat", vector: [0.7, 0.5, 0.2], color: "#22C55E" },
      b: { word: "young", vector: [0.1, 0.1, 0.3], color: "#F59E0B" },
      result: { word: "kitten", vector: [0.8, 0.6, 0.5], color: "#4ADE80" },
      op: "+",
    },
    subtract: {
      title: "puppy - young = dog",
      icon: "➖",
      desc: 'Subtracting "young" gives us the adult version!',
      a: { word: "puppy", vector: [0.9, 0.7, 0.4], color: "#60A5FA" },
      b: { word: "young", vector: [0.1, 0.1, 0.3], color: "#F59E0B" },
      result: { word: "dog", vector: [0.8, 0.6, 0.1], color: "#3B82F6" },
      op: "-",
    },
    analogy: {
      title: "kitten - puppy + dog = cat",
      icon: "🧩",
      desc: 'Solving: "puppy is to dog as kitten is to ?"',
      a: { word: "kitten", vector: [0.8, 0.6, 0.5], color: "#4ADE80" },
      b: { word: "puppy", vector: [0.9, 0.7, 0.4], color: "#60A5FA" },
      c: { word: "dog", vector: [0.8, 0.6, 0.1], color: "#3B82F6" },
      result: { word: "cat", vector: [0.7, 0.5, 0.2], color: "#22C55E" },
      op: "analogy",
    },
  };

  const current = operations[operation];

  return (
    <Section title="✨ Vector Arithmetic: Math with Meaning" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        The most magical property of embeddings: you can{" "}
        <strong>add and subtract</strong> word vectors to discover semantic
        relationships!
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(operations).map(([key, op]) => (
          <button
            key={key}
            onClick={() => setOperation(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              operation === key
                ? "bg-amber-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {op.icon} {op.title}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-6 mb-4">
        <div className="text-center mb-4">
          <span className="text-sm text-amber-600">{current.desc}</span>
        </div>

        {current.op !== "analogy" ? (
          <div className="flex flex-wrap items-center justify-center gap-4">
            {/* Word A */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-1"
                style={{ backgroundColor: current.a.color }}
              >
                {current.a.word}
              </div>
              <div className="font-mono text-xs text-gray-500">
                [{current.a.vector.join(", ")}]
              </div>
            </div>

            {/* Operator */}
            <div className="text-3xl font-bold text-amber-500">
              {current.op}
            </div>

            {/* Word B */}
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-1"
                style={{ backgroundColor: current.b.color }}
              >
                {current.b.word}
              </div>
              <div className="font-mono text-xs text-gray-500">
                [{current.b.vector.join(", ")}]
              </div>
            </div>

            {/* Equals */}
            <div className="text-3xl font-bold text-gray-400">=</div>

            {/* Result */}
            <div className="text-center">
              <div
                className="w-20 h-20 rounded-xl flex items-center justify-center text-white font-bold text-xl mb-1 ring-4 ring-amber-300"
                style={{ backgroundColor: current.result.color }}
              >
                {current.result.word}
              </div>
              <div className="font-mono text-xs text-gray-500">
                [{current.result.vector.join(", ")}]
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 text-lg font-medium text-amber-800">
              "puppy is to dog as kitten is to{" "}
              <span className="text-green-600">?</span>"
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div
                className="px-4 py-2 rounded-lg text-white font-bold"
                style={{ backgroundColor: current.a.color }}
              >
                kitten
              </div>
              <span className="text-2xl">-</span>
              <div
                className="px-4 py-2 rounded-lg text-white font-bold"
                style={{ backgroundColor: current.b.color }}
              >
                puppy
              </div>
              <span className="text-2xl">+</span>
              <div
                className="px-4 py-2 rounded-lg text-white font-bold"
                style={{ backgroundColor: current.c.color }}
              >
                dog
              </div>
              <span className="text-2xl">=</span>
              <div
                className="px-4 py-2 rounded-lg text-white font-bold ring-4 ring-amber-300"
                style={{ backgroundColor: current.result.color }}
              >
                cat ✨
              </div>
            </div>
            <div className="mt-4 font-mono text-xs text-gray-500">
              [0.8, 0.6, 0.5] - [0.9, 0.7, 0.4] + [0.8, 0.6, 0.1] = [0.7, 0.5,
              0.2]
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          🤯 Why This Works
        </h4>
        <p className="text-sm text-yellow-700">
          The vector for "young" encodes the semantic transformation from adult
          → baby. This relationship is <em>consistent</em> across different
          animals, so the same vector operation works for dogs, cats, and more!
        </p>
        <p className="text-xs text-yellow-600 mt-2">
          Note: In practice, results are approximate — we find the closest
          matching word vector.
        </p>
      </div>
    </Section>
  );
};

const OddOneOut = () => {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const words = [
    { word: "dog", vector: [0.8, 0.6, 0.1], color: "#3B82F6" },
    { word: "cat", vector: [0.7, 0.5, 0.2], color: "#22C55E" },
    { word: "tree", vector: [0.2, 0.1, 0.9], color: "#8B5CF6" },
  ];

  const similarities = {
    "dog-cat": 0.992,
    "dog-tree": 0.333,
    "cat-tree": 0.452,
  };

  const handleSelect = (word) => {
    setSelected(word);
    setRevealed(true);
  };

  return (
    <Section title="🎯 Finding the Odd One Out" color="#ef4444">
      <p className="text-gray-700 mb-4">
        Cosine similarity can identify which word doesn't belong.{" "}
        <strong>Click the odd one out:</strong>
      </p>

      <div className="flex justify-center gap-6 mb-6">
        {words.map((w) => (
          <button
            key={w.word}
            onClick={() => handleSelect(w.word)}
            disabled={revealed}
            className={`w-24 h-24 rounded-xl text-white font-bold text-xl transition-all ${
              revealed
                ? w.word === "tree"
                  ? "ring-4 ring-red-500 scale-110"
                  : "opacity-50"
                : "hover:scale-105 hover:ring-4 hover:ring-gray-300"
            }`}
            style={{ backgroundColor: w.color }}
          >
            {w.word}
            {revealed && w.word === "tree" && (
              <div className="text-xs mt-1">❌ Odd!</div>
            )}
          </button>
        ))}
      </div>

      {revealed && (
        <div className="bg-red-50 rounded-xl p-4">
          <h4 className="font-semibold text-red-800 mb-3">
            {selected === "tree" ? "✅ Correct!" : "❌ Not quite!"} Here's why
            "tree" is the odd one out:
          </h4>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {Object.entries(similarities).map(([pair, sim]) => {
              const [a, b] = pair.split("-");
              const isHigh = sim > 0.8;
              return (
                <div
                  key={pair}
                  className={`rounded-lg p-3 text-center ${
                    isHigh ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  <div className="font-medium text-sm">
                    {a} ↔ {b}
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      isHigh ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {sim.toFixed(3)}
                  </div>
                  <div
                    className={`text-xs ${
                      isHigh ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isHigh ? "✓ Similar" : "✗ Different"}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-sm text-red-700">
            Dog and cat have very high similarity (0.992) — both are domestic
            pets. Tree has low similarity to both (~0.3-0.4), making it clearly
            the odd one out!
          </p>

          <button
            onClick={() => {
              setRevealed(false);
              setSelected(null);
            }}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}
    </Section>
  );
};

const ApplicationsSection = () => {
  const [selectedApp, setSelectedApp] = useState("summarization");

  const applications = {
    summarization: {
      title: "Text Summarization",
      icon: "📝",
      color: "#3B82F6",
      desc: "Find sentences most representative of the document",
      how: "Convert each sentence to a vector (average of word embeddings). Select sentences closest to the overall document vector.",
      example:
        "Document about AI → Extract sentences with vectors nearest to the mean",
    },
    keywords: {
      title: "Keyword Extraction",
      icon: "🔑",
      color: "#22C55E",
      desc: "Identify the most important terms",
      how: "Compare each word's embedding to the document's overall vector. Words most similar to the document vector are key terms.",
      example:
        'Article about climate → "carbon", "emissions", "temperature" have highest similarity',
    },
    ner: {
      title: "Named Entity Recognition",
      icon: "👤",
      color: "#8B5CF6",
      desc: "Identify people, places, organizations",
      how: 'Fine-tune the model so entity types cluster together. "Microsoft" and "Google" have similar vectors (both companies).',
      example:
        'Text: "Satya works at Microsoft in Seattle" → PERSON, ORG, LOCATION',
    },
    classification: {
      title: "Text Classification",
      icon: "🏷️",
      color: "#F59E0B",
      desc: "Categorize documents by topic or sentiment",
      how: "Represent documents as aggregate vectors. Similar documents cluster together, enabling classification.",
      example:
        "Email classification: spam vs not-spam based on document vector",
    },
  };

  const current = applications[selectedApp];

  return (
    <Section title="🚀 Applications of Semantic Models" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Vector-based semantic models power many NLP applications:
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(applications).map(([key, app]) => (
          <button
            key={key}
            onClick={() => setSelectedApp(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedApp === key
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: selectedApp === key ? app.color : undefined,
            }}
          >
            {app.icon} {app.title}
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
          <span className="text-3xl">{current.icon}</span>
          <h3 className="font-bold text-lg" style={{ color: current.color }}>
            {current.title}
          </h3>
        </div>

        <p className="text-gray-700 mb-4">{current.desc}</p>

        <div className="bg-white rounded-lg p-4 mb-3">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">
            How it works:
          </h4>
          <p className="text-sm text-gray-700">{current.how}</p>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h4 className="font-semibold text-sm text-gray-600 mb-2">Example:</h4>
          <p className="text-sm text-gray-700 italic">{current.example}</p>
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">📐 Words as Vectors</h3>
        <p className="text-sm text-purple-700">
          Embeddings represent words as multi-dimensional vectors. Similar
          meanings → similar directions in vector space.
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">📏 Cosine Similarity</h3>
        <p className="text-sm text-green-700">
          Measures how similar two vectors are (0-1). High similarity = related
          words (dog/cat: 0.99).
        </p>
      </div>
      <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">✨ Vector Arithmetic</h3>
        <p className="text-sm text-amber-700">
          Add/subtract vectors to discover relationships: dog + young = puppy.
          Enables analogical reasoning!
        </p>
      </div>
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">🚀 Applications</h3>
        <p className="text-sm text-blue-700">
          Powers summarization, keyword extraction, NER, classification, and
          modern LLMs (contextual embeddings).
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Semantic language models transformed NLP by encoding meaning
        mathematically. From Word2Vec (2013) to GPT's contextual embeddings,
        this vector-based approach enables machines to understand that "dog" and
        "puppy" are related, while "dog" and "tree" are not — all through the
        magic of mathematical similarity in high-dimensional space!
      </p>
    </div>
  </Section>
);

export default function SemanticModelsGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 Semantic Language Models
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Word Embeddings and Vector Magic
          </p>
        </div>

        <ConceptIntro />
        <VectorVisualization />
        <CosineSimilarity />
        <OddOneOut />
        <VectorArithmetic />
        <ApplicationsSection />
        <SummarySection />
      </div>
    </div>
  );
}
