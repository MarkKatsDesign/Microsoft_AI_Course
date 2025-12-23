import React, { useState, useMemo } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const STOP_WORDS = [
  "the",
  "a",
  "an",
  "and",
  "or",
  "but",
  "in",
  "on",
  "at",
  "to",
  "for",
  "of",
  "with",
  "by",
  "that",
  "can",
  "like",
  "while",
  "this",
  "is",
  "are",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "do",
  "does",
  "did",
  "will",
  "would",
  "could",
  "should",
  "may",
  "might",
  "must",
  "shall",
];

// Simple stemming function to reduce words to their base form
// In production, use libraries like natural's PorterStemmer or proper lemmatization
const simpleStem = (word) => {
  // Handle common suffixes
  if (word.length <= 3) return word; // Don't stem very short words

  // Remove common verb endings
  if (word.endsWith('ing') && word.length > 5) {
    return word.slice(0, -3); // running → runn (will be normalized)
  }
  if (word.endsWith('ed') && word.length > 4) {
    const base = word.slice(0, -2);
    // Handle doubled consonants: enabled → enable, powered → power
    if (base.length > 2 && base[base.length-1] === base[base.length-2]) {
      return base.slice(0, -1);
    }
    return base;
  }

  // Remove plural 's' or 'es'
  if (word.endsWith('sses')) {
    return word.slice(0, -2); // businesses → business
  }
  if (word.endsWith('ies') && word.length > 4) {
    return word.slice(0, -3) + 'y'; // entries → entry
  }
  if (word.endsWith('es') && word.length > 4) {
    // experiences → experience
    return word.slice(0, -2);
  }
  if (word.endsWith('s') && word.length > 3 && !word.endsWith('ss')) {
    // decisions → decision, tasks → task, but not 'business' → 'busines'
    return word.slice(0, -1);
  }

  return word;
};

const FrequencyAnalysis = () => {
  const text = `AI in modern business delivers transformative benefits by enhancing efficiency, decision-making, and customer experiences. Businesses can leverage AI to automate repetitive tasks, freeing employees to focus on strategic work, while predictive analytics and machine learning models enable data-driven decisions that improve accuracy and speed. AI-powered tools like Copilot streamline workflows across marketing, finance, and operations, reducing costs and boosting productivity.`;

  const [showAnalysis, setShowAnalysis] = useState(false);

  const frequency = useMemo(() => {
    const words = text
      .toLowerCase()
      .replace(/[.,!?;:'"()-]/g, "")
      .split(/\s+/);
    const filtered = words.filter(
      (w) => !STOP_WORDS.includes(w) && w.length > 1
    );
    const freq = {};
    filtered.forEach((word) => {
      // Apply stemming to group related words together
      const stemmed = simpleStem(word);
      freq[stemmed] = (freq[stemmed] || 0) + 1;
    });
    return Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [text]);

  const maxFreq = frequency[0]?.[1] || 1;

  return (
    <Section title="📊 Frequency Analysis" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        The simplest way to understand a document:{" "}
        <strong>count how often each word appears</strong>. The most frequent
        terms often reveal the main topics.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="text-sm text-blue-600 mb-2">
          Sample text about AI in business:
        </div>
        <p className="text-gray-700 text-sm italic">
          "{text.substring(0, 150)}..."
        </p>
      </div>

      <button
        onClick={() => setShowAnalysis(!showAnalysis)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
      >
        {showAnalysis ? "📝 Hide Analysis" : "📊 Analyze Frequency"}
      </button>

      {showAnalysis && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold mb-3">Top 10 Terms by Frequency:</h3>
          <div className="space-y-2">
            {frequency.map(([word, count], i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-4 text-gray-400 text-sm">{i + 1}.</span>
                <span className="w-24 font-mono text-sm truncate">{word}</span>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all flex items-center justify-end pr-2"
                    style={{ width: `${(count / maxFreq) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">
                      {count}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 bg-blue-100 rounded-lg p-3">
            <p className="text-sm text-blue-800">
              <strong>💡 Insight:</strong> "AI" and "business" are the most
              frequent terms, telling us this text is about AI applications in
              business contexts.
            </p>
          </div>

          <div className="mt-3 bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-purple-700">
              <strong>🌱 Note:</strong> Words are stemmed before counting (e.g., "businesses" → "business", "decisions" → "decision")
              to group related terms together for more accurate analysis.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

const TFIDFSection = () => {
  const [selectedDoc, setSelectedDoc] = useState("A");
  const [showTFIDF, setShowTFIDF] = useState(false);

  const documents = {
    A: {
      title: "Sample A: Copilot Studio",
      text: "Microsoft Copilot Studio enables declarative AI agent creation using natural language, prompts, and templates...",
      frequency: [
        { term: "agent", tf: 6 },
        { term: "ai", tf: 4 },
        { term: "microsoft", tf: 4 },
        { term: "copilot", tf: 3 },
        { term: "studio", tf: 3 },
        { term: "declarative", tf: 2 },
      ],
      tfidf: [
        { term: "copilot", score: 2.08 },
        { term: "studio", score: 2.08 },
        { term: "declarative", score: 1.39 },
      ],
    },
    B: {
      title: "Sample B: Microsoft Foundry",
      text: "Microsoft Foundry enables code-based AI agent development with SDKs and APIs...",
      frequency: [
        { term: "microsoft", tf: 5 },
        { term: "agent", tf: 4 },
        { term: "ai", tf: 4 },
        { term: "code", tf: 3 },
        { term: "foundry", tf: 3 },
        { term: "develop", tf: 3 },
      ],
      tfidf: [
        { term: "code", score: 2.08 },
        { term: "develop", score: 2.08 },
        { term: "foundry", score: 2.08 },
      ],
    },
  };

  const doc = documents[selectedDoc];

  return (
    <Section
      title="🎯 TF-IDF: Finding What Makes Documents Unique"
      color="#8b5cf6"
    >
      <p className="text-gray-700 mb-4">
        Simple frequency doesn't work well for comparing documents — common
        terms appear everywhere!
        <strong> TF-IDF</strong> finds words that are frequent in ONE document
        but rare across ALL documents.
      </p>

      <div className="flex gap-2 mb-4">
        {["A", "B"].map((id) => (
          <button
            key={id}
            onClick={() => setSelectedDoc(id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedDoc === id
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {documents[id].title}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        {/* Frequency view */}
        <div className="bg-red-50 rounded-xl p-4 border border-red-200">
          <h3 className="font-semibold text-red-800 mb-3">
            ❌ Simple Frequency (Not Helpful)
          </h3>
          <div className="space-y-2">
            {doc.frequency.slice(0, 3).map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-20 font-mono text-sm">{item.term}</span>
                <div className="flex-1 h-5 bg-red-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-full"
                    style={{ width: `${(item.tf / 6) * 100}%` }}
                  />
                </div>
                <span className="text-sm w-8">{item.tf}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-red-600 mt-2">
            Same top words in both docs! 😕
          </p>
        </div>

        {/* TF-IDF view */}
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">
            ✅ TF-IDF (Much Better!)
          </h3>
          <div className="space-y-2">
            {doc.tfidf.map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span
                  className="w-20 font-mono text-sm font-bold"
                  style={{ color: "#059669" }}
                >
                  {item.term}
                </span>
                <div className="flex-1 h-5 bg-green-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(item.score / 2.1) * 100}%` }}
                  />
                </div>
                <span className="text-sm w-12">{item.score.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-green-600 mt-2">
            Unique terms for this doc! ✨
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowTFIDF(!showTFIDF)}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
      >
        {showTFIDF ? "Hide Formula" : "🧮 Show How TF-IDF Works"}
      </button>

      {showTFIDF && (
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-3">
            The TF-IDF Formula:
          </h4>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="font-mono text-lg text-purple-700">TF(t,d)</div>
              <div className="text-sm text-gray-600 mt-1">Term Frequency</div>
              <div className="text-xs text-gray-500 mt-1">
                How often word appears in THIS doc
              </div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="font-mono text-lg text-purple-700">×</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center">
              <div className="font-mono text-lg text-purple-700">
                IDF(t) = log(N/df)
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Inverse Document Frequency
              </div>
              <div className="text-xs text-gray-500 mt-1">
                How rare word is across ALL docs
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-3">
            <p className="text-sm text-purple-700">
              <strong>Example:</strong> "agent" appears in BOTH docs, so IDF =
              log(2/2) = 0 → TF-IDF = 0 (no discrimination!)
              <br />
              "copilot" appears only in doc A, so IDF = log(2/1) = 0.69 → Higher
              TF-IDF score! ✓
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

const BagOfWordsSection = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emails = [
    {
      id: 1,
      text: "Congratulations! You've won a FREE miracle weight loss cure! Act now for amazing results!",
      features: {
        miracle: 1,
        free: 1,
        weight: 1,
        loss: 1,
        cure: 1,
        amazing: 1,
        results: 1,
      },
      prediction: "spam",
      confidence: 94,
    },
    {
      id: 2,
      text: "Hi team, please review the Q3 report attached. Meeting scheduled for Thursday.",
      features: {
        team: 1,
        review: 1,
        report: 1,
        meeting: 1,
        scheduled: 1,
        thursday: 1,
      },
      prediction: "not spam",
      confidence: 98,
    },
    {
      id: 3,
      text: "URGENT: Your account needs verification! Click here immediately to avoid suspension!",
      features: {
        urgent: 1,
        account: 1,
        verification: 1,
        click: 1,
        immediately: 1,
        suspension: 1,
      },
      prediction: "spam",
      confidence: 89,
    },
  ];

  const spamWords = [
    "miracle",
    "free",
    "weight",
    "loss",
    "cure",
    "urgent",
    "click",
    "immediately",
    "winner",
    "congratulations",
  ];

  return (
    <Section title="📧 Bag-of-Words & Spam Detection" color="#ef4444">
      <p className="text-gray-700 mb-4">
        <strong>Bag-of-Words</strong> converts text into a vector of word counts
        (ignoring order). This becomes input for ML classifiers like{" "}
        <strong>Naive Bayes</strong>.
      </p>

      <div className="bg-red-50 rounded-xl p-4 mb-4">
        <h3 className="font-semibold text-red-800 mb-3">
          🔍 Click an email to analyze:
        </h3>
        <div className="space-y-2">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() =>
                setSelectedEmail(email.id === selectedEmail ? null : email.id)
              }
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedEmail === email.id
                  ? email.prediction === "spam"
                    ? "bg-red-200 border-2 border-red-400"
                    : "bg-green-200 border-2 border-green-400"
                  : "bg-white border hover:border-gray-300"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">
                  {email.prediction === "spam" ? "🚨" : "✉️"}
                </span>
                <p className="text-sm text-gray-700 flex-1">{email.text}</p>
                {selectedEmail === email.id && (
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      email.prediction === "spam"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {email.prediction.toUpperCase()} ({email.confidence}%)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEmail && (
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-semibold mb-3">Bag-of-Words Feature Vector:</h4>
          <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(
              emails.find((e) => e.id === selectedEmail).features
            ).map(([word, count], i) => {
              const isSpammy = spamWords.includes(word.toLowerCase());
              return (
                <div
                  key={i}
                  className={`px-3 py-1 rounded-full text-sm font-mono ${
                    isSpammy
                      ? "bg-red-100 text-red-700 border border-red-300"
                      : "bg-gray-100 text-gray-700 border border-gray-300"
                  }`}
                >
                  {word}: {count}
                  {isSpammy && <span className="ml-1">⚠️</span>}
                </div>
              );
            })}
          </div>

          <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>💡 How it works:</strong> The classifier learned from
              training data that words like "miracle", "free", and "urgent"
              appear more often in spam. It uses Bayes' theorem to calculate the
              probability this email is spam based on which words it contains.
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-800 mb-2">
            🎭 Sentiment Analysis
          </h4>
          <p className="text-sm text-gray-600">
            Same technique! Words like "love", "great", "amazing" → Positive.
            Words like "hate", "terrible", "awful" → Negative.
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <h4 className="font-semibold text-gray-800 mb-2">
            📁 Document Classification
          </h4>
          <p className="text-sm text-gray-600">
            Categorize documents by topic based on their vocabulary: sports,
            politics, technology, entertainment, etc.
          </p>
        </div>
      </div>
    </Section>
  );
};

const TextRankSection = () => {
  const [step, setStep] = useState(0);
  const [showFormula, setShowFormula] = useState(false);

  const sentences = [
    {
      id: 1,
      text: "Cloud computing provides on-demand access to computing resources.",
      score: 0.28,
      selected: true,
    },
    {
      id: 2,
      text: "Computing resources include servers, storage, and networking.",
      score: 0.18,
      selected: false,
    },
    {
      id: 3,
      text: "Azure is Microsoft's cloud computing platform.",
      score: 0.24,
      selected: true,
    },
    {
      id: 4,
      text: "Organizations use cloud platforms to reduce infrastructure costs.",
      score: 0.12,
      selected: false,
    },
    {
      id: 5,
      text: "Cloud computing enables scalability and flexibility.",
      score: 0.22,
      selected: true,
    },
  ];

  const edges = [
    { from: 1, to: 2, weight: 0.5, label: "computing resources" },
    { from: 1, to: 3, weight: 0.6, label: "cloud computing" },
    { from: 1, to: 5, weight: 0.7, label: "cloud computing" },
    { from: 3, to: 4, weight: 0.5, label: "cloud platforms" },
    { from: 3, to: 5, weight: 0.4, label: "cloud computing" },
  ];

  const steps = [
    { title: "Original Document", desc: "5 sentences about cloud computing" },
    { title: "Build Graph", desc: "Each sentence becomes a node" },
    {
      title: "Add Weighted Edges",
      desc: "Connect sentences by word similarity",
    },
    {
      title: "Calculate Ranks",
      desc: "Iteratively score based on connections",
    },
    { title: "Extract Summary", desc: "Select top-ranked sentences" },
  ];

  // Positions for nodes in a circle
  const nodePositions = [
    { x: 150, y: 50 },
    { x: 250, y: 100 },
    { x: 220, y: 200 },
    { x: 80, y: 200 },
    { x: 50, y: 100 },
  ];

  return (
    <Section title="🔗 TextRank: Graph-Based Summarization" color="#10b981">
      <p className="text-gray-700 mb-4">
        <strong>TextRank</strong> treats sentences as nodes in a graph and uses
        connections to find the most important ones. It's like Google's
        PageRank, but for text!
      </p>

      <div className="flex gap-2 mb-4 flex-wrap">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
              step === i
                ? "bg-green-600 text-white"
                : step > i
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            {i + 1}. {s.title}
          </button>
        ))}
      </div>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <div className="text-center mb-2">
          <span className="font-semibold text-green-800">
            {steps[step].title}
          </span>
          <span className="text-green-600 text-sm ml-2">
            — {steps[step].desc}
          </span>
        </div>

        {step === 0 && (
          <div className="bg-white rounded-lg p-4 space-y-2">
            {sentences.map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-sm">
                <span className="text-gray-400">{i + 1}.</span>
                <span className="text-gray-700">{s.text}</span>
              </div>
            ))}
          </div>
        )}

        {step >= 1 && step <= 3 && (
          <svg viewBox="0 0 300 260" className="w-full h-64">
            {/* Edges */}
            {step >= 2 &&
              edges.map((edge, i) => {
                const from = nodePositions[edge.from - 1];
                const to = nodePositions[edge.to - 1];
                return (
                  <g key={i}>
                    <line
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="#10B981"
                      strokeWidth={edge.weight * 4}
                      opacity={0.5}
                    />
                    {step >= 2 && (
                      <text
                        x={(from.x + to.x) / 2}
                        y={(from.y + to.y) / 2 - 5}
                        fontSize="7"
                        fill="#059669"
                        textAnchor="middle"
                      >
                        {edge.weight}
                      </text>
                    )}
                  </g>
                );
              })}

            {/* Nodes */}
            {sentences.map((s, i) => {
              const pos = nodePositions[i];
              const isHighRank = step >= 3 && s.selected;
              return (
                <g key={i}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={step >= 3 ? 15 + s.score * 40 : 20}
                    fill={isHighRank ? "#10B981" : "#6EE7B7"}
                    stroke={isHighRank ? "#047857" : "#10B981"}
                    strokeWidth={isHighRank ? 3 : 1}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    fontSize="12"
                    fill="white"
                    textAnchor="middle"
                    fontWeight="bold"
                  >
                    S{i + 1}
                  </text>
                  {step >= 3 && (
                    <text
                      x={pos.x}
                      y={pos.y + 35}
                      fontSize="9"
                      fill="#059669"
                      textAnchor="middle"
                    >
                      {s.score.toFixed(2)}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        )}

        {step === 4 && (
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">
              📝 Generated Summary:
            </h4>
            <div className="space-y-2">
              {sentences
                .filter((s) => s.selected)
                .map((s, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm bg-green-100 rounded p-2"
                  >
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">{s.text}</span>
                    <span className="text-xs text-green-600 ml-auto">
                      Score: {s.score.toFixed(2)}
                    </span>
                  </div>
                ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              This is <strong>extractive summarization</strong> — selecting
              existing sentences, not generating new ones.
            </p>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowFormula(!showFormula)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
      >
        {showFormula ? "Hide Details" : "🧮 Show TextRank Formula"}
      </button>

      {showFormula && (
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2">
                The Core Idea
              </h4>
              <p className="text-sm text-gray-600">
                A sentence is important if it's connected to many other
                important sentences. The algorithm iterates until scores
                stabilize.
              </p>
            </div>
            <div className="bg-white rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-2">Edge Weights</h4>
              <p className="text-sm text-gray-600">
                Connections are weighted by similarity — often measured by word
                overlap or cosine similarity between sentence vectors.
              </p>
            </div>
          </div>

          <div className="mt-4 bg-green-100 rounded-lg p-3">
            <p className="text-sm text-green-800">
              <strong>Also used for:</strong> Keyword extraction! Instead of
              sentences, use words as nodes and co-occurrence as edges.
              Top-ranked words = key terms.
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

const ComparisonSection = () => {
  const techniques = [
    {
      name: "Frequency Analysis",
      icon: "📊",
      color: "#3B82F6",
      use: "Single document topics",
      pros: "Simple, fast",
      cons: "Common words dominate",
    },
    {
      name: "TF-IDF",
      icon: "🎯",
      color: "#8B5CF6",
      use: "Comparing documents",
      pros: "Finds unique terms",
      cons: "Needs multiple docs",
    },
    {
      name: "Bag-of-Words",
      icon: "📧",
      color: "#EF4444",
      use: "Classification (spam, sentiment)",
      pros: "ML-ready features",
      cons: "Ignores word order",
    },
    {
      name: "TextRank",
      icon: "🔗",
      color: "#10B981",
      use: "Summarization, keywords",
      pros: "Unsupervised, graph-based",
      cons: "Computationally heavier",
    },
  ];

  return (
    <Section title="⚖️ When to Use What?" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Each technique has its strengths. Choose based on your task:
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {techniques.map((tech, i) => (
          <div
            key={i}
            className="rounded-xl p-4 border-2"
            style={{
              borderColor: tech.color,
              backgroundColor: `${tech.color}10`,
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{tech.icon}</span>
              <h3 className="font-bold" style={{ color: tech.color }}>
                {tech.name}
              </h3>
            </div>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Best for:</strong> {tech.use}
              </p>
              <p className="text-green-600">✓ {tech.pros}</p>
              <p className="text-red-600">✗ {tech.cons}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">📊 Frequency Analysis</h3>
        <p className="text-sm text-blue-700">
          Count words to find main topics. Simple but effective for single
          documents.
        </p>
      </div>
      <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">🎯 TF-IDF</h3>
        <p className="text-sm text-purple-700">
          TF × IDF = words frequent HERE but rare ELSEWHERE. Perfect for
          comparing documents.
        </p>
      </div>
      <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
        <h3 className="font-bold text-red-800 mb-2">
          📧 Bag-of-Words + Naive Bayes
        </h3>
        <p className="text-sm text-red-700">
          Convert text to feature vectors for ML classification: spam detection,
          sentiment analysis.
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">🔗 TextRank</h3>
        <p className="text-sm text-green-700">
          Graph-based algorithm for extractive summarization. Like PageRank for
          sentences!
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Statistical text analysis bridges the gap between raw text and machine
        learning. These techniques power search engines, spam filters,
        recommendation systems, and document analyzers. Combined with the
        tokenization techniques you learned earlier, you now have a complete NLP
        preprocessing toolkit!
      </p>
    </div>
  </Section>
);

export default function StatisticalTextAnalysisGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            📊 Statistical Text Analysis
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Extracting Meaning from Text
          </p>
        </div>

        <FrequencyAnalysis />
        <TFIDFSection />
        <BagOfWordsSection />
        <TextRankSection />
        <ComparisonSection />
        <SummarySection />
      </div>
    </div>
  );
}
