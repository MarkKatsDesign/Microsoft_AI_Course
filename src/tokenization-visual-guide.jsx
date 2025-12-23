import React, { useState, useMemo } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const ConceptIntro = () => {
  const [showTokens, setShowTokens] = useState(false);

  const sentence = "We choose to go to the moon";
  const tokens = sentence.split(" ");
  const colors = [
    "#EF4444",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#14B8A6",
    "#3B82F6",
    "#8B5CF6",
  ];

  return (
    <Section title="🔤 What is Tokenization?" color="#8b5cf6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-700 mb-4">
            <strong>Tokenization</strong> is the first step in analyzing text.
            It breaks down a body of text (called a <em>corpus</em>) into
            smaller pieces called <strong>tokens</strong>.
          </p>
          <p className="text-gray-700 mb-4">
            Think of it like breaking a sentence into its building blocks —
            usually words, but sometimes parts of words or punctuation too.
          </p>

          <button
            onClick={() => setShowTokens(!showTokens)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
          >
            {showTokens ? "📝 Show Sentence" : "🔢 Tokenize!"}
          </button>
        </div>

        <div className="bg-purple-50 rounded-xl p-4">
          <div className="text-sm text-purple-600 mb-2">
            Famous JFK speech excerpt:
          </div>

          {!showTokens ? (
            <div className="bg-white rounded-lg p-4 text-xl font-medium text-center">
              "{sentence}"
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {tokens.map((token, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-2 rounded-lg text-white transition-all hover:scale-110"
                    style={{ backgroundColor: colors[i % colors.length] }}
                  >
                    <span className="font-bold">{token}</span>
                    <span className="text-xs opacity-80">Token {i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <span className="text-sm text-gray-600">Represented as: </span>
                <span className="font-mono">[1, 2, 3, 4, 3, 5, 6]</span>
                <div className="text-xs text-purple-600 mt-1">
                  Notice: "to" appears twice but uses the same ID (3)!
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

const FrequencyAnalysis = () => {
  const [text, setText] = useState(
    "The quick brown fox jumps over the lazy dog. The dog was not amused by the fox."
  );

  const tokenFrequency = useMemo(() => {
    const words = text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .split(/\s+/)
      .filter((w) => w);
    const freq = {};
    words.forEach((word) => {
      freq[word] = (freq[word] || 0) + 1;
    });
    return Object.entries(freq).sort((a, b) => b[1] - a[1]);
  }, [text]);

  const maxFreq = tokenFrequency.length > 0 ? tokenFrequency[0][1] : 1;

  return (
    <Section title="📊 Token Frequency Analysis" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Once we have tokens, we can count how often each appears. This helps
        identify the main subjects of a text.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <label className="block text-sm font-medium text-blue-700 mb-2">
          Try your own text:
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:outline-none h-20"
          placeholder="Type some text..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold mb-3">Token Frequency:</h3>
          <div className="space-y-2 max-h-48 overflow-auto">
            {tokenFrequency.slice(0, 10).map(([word, count], i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-20 font-mono text-sm truncate">{word}</span>
                <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all"
                    style={{ width: `${(count / maxFreq) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium w-8">{count}×</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-100 rounded-xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            💡 Why This Matters
          </h3>
          <p className="text-sm text-blue-700 mb-2">
            The most frequent words often reveal what the text is about.
          </p>
          <p className="text-sm text-blue-700">
            But notice: words like "the" appear often but don't tell us much.
            That's why we use <strong>stop word removal</strong>!
          </p>
        </div>
      </div>
    </Section>
  );
};

const TextNormalization = () => {
  const [normalized, setNormalized] = useState(false);

  const original = "Mr. Banks has worked in many banks.";
  const normalizedText = "mr banks has worked in many banks";

  return (
    <Section title="📝 Text Normalization" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Before tokenizing, we often <strong>normalize</strong> the text —
        removing punctuation and converting to lowercase.
      </p>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setNormalized(!normalized)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            normalized
              ? "bg-green-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {normalized ? "✓ Normalized" : "Normalize Text"}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className={`rounded-xl p-4 border-2 transition-all ${
            !normalized
              ? "border-green-400 bg-green-50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <h3 className="font-semibold mb-2">Original:</h3>
          <div className="bg-white rounded-lg p-3 font-mono">{original}</div>
          <div className="mt-2 text-sm text-gray-600">
            Tokens: ["Mr.", "Banks", "has", "worked", "in", "many", "banks."]
          </div>
        </div>

        <div
          className={`rounded-xl p-4 border-2 transition-all ${
            normalized
              ? "border-green-400 bg-green-50"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <h3 className="font-semibold mb-2">Normalized:</h3>
          <div className="bg-white rounded-lg p-3 font-mono">
            {normalizedText}
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Tokens: ["mr", "banks", "has", "worked", "in", "many", "banks"]
          </div>
        </div>
      </div>

      <div className="mt-4 bg-yellow-50 rounded-lg p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">
          ⚠️ Trade-off Alert!
        </h4>
        <p className="text-sm text-yellow-700">
          After normalization, "Mr. Banks" (the person) and "banks" (the places)
          look the same! Sometimes we <em>want</em> to keep distinctions like
          capitalization.
        </p>
      </div>
    </Section>
  );
};

const StopWords = () => {
  const [removeStops, setRemoveStops] = useState(false);

  const sentence = "The quick brown fox jumps over the lazy dog";
  const words = sentence.toLowerCase().split(" ");
  const stopWords = [
    "the",
    "a",
    "an",
    "is",
    "it",
    "to",
    "of",
    "and",
    "or",
    "in",
    "on",
    "at",
    "for",
    "over",
  ];

  const filteredWords = words.filter((w) => !stopWords.includes(w));

  return (
    <Section title="🚫 Stop Word Removal" color="#ef4444">
      <p className="text-gray-700 mb-4">
        <strong>Stop words</strong> are common words like "the", "a", "is" that
        add little meaning. Removing them helps focus on important content.
      </p>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setRemoveStops(!removeStops)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            removeStops
              ? "bg-red-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {removeStops ? "🚫 Stop Words Removed" : "Remove Stop Words"}
        </button>
      </div>

      <div className="bg-red-50 rounded-xl p-4">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {words.map((word, i) => {
            const isStop = stopWords.includes(word);
            const shouldShow = !removeStops || !isStop;
            return (
              <div
                key={i}
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  !shouldShow
                    ? "opacity-0 scale-0 w-0 p-0 m-0"
                    : isStop
                    ? "bg-red-200 text-red-700 line-through"
                    : "bg-white border-2 border-green-400 text-green-700"
                }`}
              >
                {word}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-gray-700">
              {words.length}
            </div>
            <div className="text-sm text-gray-500">Original tokens</div>
          </div>
          <div className="bg-white rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {filteredWords.length}
            </div>
            <div className="text-sm text-gray-500">After removing stops</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <strong>Common stop words:</strong> the, a, an, is, it, to, of, and, or,
        in, on, at, for, with...
      </div>
    </Section>
  );
};

const NGrams = () => {
  const [ngramType, setNgramType] = useState(1);

  const sentence = "natural language processing is amazing";
  const words = sentence.split(" ");

  const getNgrams = (n) => {
    const ngrams = [];
    for (let i = 0; i <= words.length - n; i++) {
      ngrams.push(words.slice(i, i + n).join(" "));
    }
    return ngrams;
  };

  const ngrams = getNgrams(ngramType);
  const ngramNames = ["", "Unigrams", "Bigrams", "Trigrams"];
  const colors = ["", "#3B82F6", "#8B5CF6", "#EC4899"];

  return (
    <Section title="🔗 N-Grams" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Sometimes single words aren't enough. <strong>N-grams</strong> capture
        multi-word phrases that have meaning together.
      </p>

      <div className="flex gap-2 justify-center mb-4">
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setNgramType(n)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              ngramType === n
                ? "text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={{
              backgroundColor: ngramType === n ? colors[n] : undefined,
            }}
          >
            {ngramNames[n]} (n={n})
          </button>
        ))}
      </div>

      <div className="bg-purple-50 rounded-xl p-4">
        <div className="text-center mb-4">
          <span className="text-sm text-gray-600">Sentence: </span>
          <span className="font-medium">"{sentence}"</span>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {ngrams.map((ngram, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
              style={{ backgroundColor: colors[ngramType] }}
            >
              {ngram}
            </div>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          {ngrams.length} {ngramNames[ngramType].toLowerCase()} found
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
        <div className="bg-blue-50 rounded-lg p-3 text-center">
          <div className="font-semibold text-blue-700">Unigram</div>
          <div className="text-gray-600">Single words</div>
          <div className="text-xs text-gray-500 mt-1">"natural"</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-3 text-center">
          <div className="font-semibold text-purple-700">Bigram</div>
          <div className="text-gray-600">Word pairs</div>
          <div className="text-xs text-gray-500 mt-1">"natural language"</div>
        </div>
        <div className="bg-pink-50 rounded-lg p-3 text-center">
          <div className="font-semibold text-pink-700">Trigram</div>
          <div className="text-gray-600">Word triplets</div>
          <div className="text-xs text-gray-500 mt-1">
            "natural language processing"
          </div>
        </div>
      </div>
    </Section>
  );
};

const StemmingVsLemmatization = () => {
  const [technique, setTechnique] = useState("original");

  const words = [
    { original: "running", stem: "run", lemma: "run" },
    { original: "studies", stem: "studi", lemma: "study" },
    { original: "better", stem: "better", lemma: "good" },
    { original: "wolves", stem: "wolv", lemma: "wolf" },
    { original: "powered", stem: "power", lemma: "power" },
    { original: "caring", stem: "car", lemma: "care" },
  ];

  return (
    <Section title="🌱 Stemming vs Lemmatization" color="#10b981">
      <p className="text-gray-700 mb-4">
        Both techniques reduce words to their root form, but they work
        differently:
      </p>

      <div className="flex gap-2 justify-center mb-6">
        {["original", "stemming", "lemmatization"].map((t) => (
          <button
            key={t}
            onClick={() => setTechnique(t)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              technique === t
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {words.map((word, i) => (
          <div key={i} className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-gray-500 text-sm mb-1">
              {technique === "original"
                ? "Original"
                : technique === "stemming"
                ? "Stemmed"
                : "Lemmatized"}
            </div>
            <div
              className="font-mono font-bold text-lg"
              style={{
                color: technique === "original" ? "#374151" : "#059669",
              }}
            >
              {technique === "original"
                ? word.original
                : technique === "stemming"
                ? word.stem
                : word.lemma}
            </div>
            {technique !== "original" && (
              <div className="text-xs text-gray-400 mt-1">
                ← {word.original}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-2">✂️ Stemming</h4>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• Simply chops off word endings</li>
            <li>• Fast but crude</li>
            <li>• May produce non-words ("studi", "wolv")</li>
            <li>• Rules-based (remove -ing, -ed, -s, etc.)</li>
          </ul>
        </div>
        <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
          <h4 className="font-semibold text-teal-800 mb-2">📖 Lemmatization</h4>
          <ul className="text-sm text-teal-700 space-y-1">
            <li>• Uses dictionary/vocabulary lookup</li>
            <li>• Slower but more accurate</li>
            <li>• Always produces valid words</li>
            <li>• Understands context ("better" → "good")</li>
          </ul>
        </div>
      </div>
    </Section>
  );
};

const POSTagging = () => {
  const [showTags, setShowTags] = useState(false);

  const taggedSentence = [
    { word: "The", pos: "DET", color: "#9CA3AF", label: "Determiner" },
    { word: "quick", pos: "ADJ", color: "#F59E0B", label: "Adjective" },
    { word: "brown", pos: "ADJ", color: "#F59E0B", label: "Adjective" },
    { word: "fox", pos: "NOUN", color: "#3B82F6", label: "Noun" },
    { word: "jumps", pos: "VERB", color: "#22C55E", label: "Verb" },
    { word: "over", pos: "PREP", color: "#8B5CF6", label: "Preposition" },
    { word: "the", pos: "DET", color: "#9CA3AF", label: "Determiner" },
    { word: "lazy", pos: "ADJ", color: "#F59E0B", label: "Adjective" },
    { word: "dog", pos: "NOUN", color: "#3B82F6", label: "Noun" },
  ];

  const posCategories = [
    { tag: "NOUN", color: "#3B82F6", desc: "Person, place, thing" },
    { tag: "VERB", color: "#22C55E", desc: "Action or state" },
    { tag: "ADJ", color: "#F59E0B", desc: "Describes a noun" },
    { tag: "PREP", color: "#8B5CF6", desc: "Shows relationship" },
    { tag: "DET", color: "#9CA3AF", desc: "Specifies a noun" },
  ];

  return (
    <Section title="🏷️ Parts of Speech (POS) Tagging" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        POS tagging labels each token with its grammatical category. This helps
        understand sentence structure and meaning.
      </p>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowTags(!showTags)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            showTags
              ? "bg-amber-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {showTags ? "🏷️ Tags Shown" : "Show POS Tags"}
        </button>
      </div>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {taggedSentence.map((item, i) => (
            <div key={i} className="flex flex-col items-center transition-all">
              <div
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  showTags ? "text-white" : "bg-white border"
                }`}
                style={{
                  backgroundColor: showTags ? item.color : undefined,
                }}
              >
                {item.word}
              </div>
              {showTags && (
                <div
                  className="text-xs mt-1 font-mono px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {item.pos}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 text-sm">
        {posCategories.map((cat, i) => (
          <div
            key={i}
            className="rounded-lg p-2 text-center text-white"
            style={{ backgroundColor: cat.color }}
          >
            <div className="font-bold">{cat.tag}</div>
            <div className="text-xs opacity-80">{cat.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const PipelineVisualization = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      name: "Raw Text",
      icon: "📄",
      example: '"The Dogs are Running!"',
      color: "#6B7280",
    },
    {
      name: "Normalize",
      icon: "📝",
      example: '"the dogs are running"',
      color: "#3B82F6",
    },
    {
      name: "Tokenize",
      icon: "🔤",
      example: '["the", "dogs", "are", "running"]',
      color: "#8B5CF6",
    },
    {
      name: "Stop Words",
      icon: "🚫",
      example: '["dogs", "running"]',
      color: "#EF4444",
    },
    {
      name: "Lemmatize",
      icon: "🌱",
      example: '["dog", "run"]',
      color: "#22C55E",
    },
    {
      name: "POS Tag",
      icon: "🏷️",
      example: '[("dog", NOUN), ("run", VERB)]',
      color: "#F59E0B",
    },
  ];

  return (
    <Section title="🔄 The Full Pipeline" color="#6366f1">
      <p className="text-gray-700 mb-4">
        In practice, these techniques are often combined into a text processing
        pipeline:
      </p>

      <div className="bg-indigo-50 rounded-xl p-4 mb-4">
        {/* Pipeline visualization */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-4">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                onClick={() => setActiveStep(i)}
                className={`flex flex-col items-center p-3 rounded-xl cursor-pointer transition-all ${
                  activeStep === i
                    ? "scale-110"
                    : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  backgroundColor:
                    activeStep === i ? step.color : `${step.color}30`,
                }}
              >
                <span className="text-2xl">{step.icon}</span>
                <span
                  className={`text-xs font-medium mt-1 ${
                    activeStep === i ? "text-white" : "text-gray-700"
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {i < steps.length - 1 && <span className="text-gray-400">→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Current step detail */}
        <div
          className="bg-white rounded-lg p-4 border-2 transition-all"
          style={{ borderColor: steps[activeStep].color }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{steps[activeStep].icon}</span>
            <span
              className="font-bold"
              style={{ color: steps[activeStep].color }}
            >
              {steps[activeStep].name}
            </span>
          </div>
          <div className="font-mono text-sm bg-gray-50 rounded p-2">
            {steps[activeStep].example}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 text-center">
        Click each step to see how the text transforms through the pipeline!
      </p>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4 mb-4">
      <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">🔤 Tokenization</h3>
        <p className="text-sm text-purple-700">
          Breaking text into tokens (words, sub-words) is the first step in any
          NLP task.
        </p>
      </div>
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">📝 Normalization</h3>
        <p className="text-sm text-blue-700">
          Lowercase + remove punctuation for consistency, but be aware of lost
          meaning.
        </p>
      </div>
      <div className="bg-linear-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
        <h3 className="font-bold text-red-800 mb-2">🚫 Stop Words</h3>
        <p className="text-sm text-red-700">
          Remove common words (the, a, is) to focus on meaningful content.
        </p>
      </div>
      <div className="bg-linear-to-br from-violet-50 to-violet-100 rounded-xl p-4 border border-violet-200">
        <h3 className="font-bold text-violet-800 mb-2">🔗 N-Grams</h3>
        <p className="text-sm text-violet-700">
          Capture multi-word phrases: unigrams (1), bigrams (2), trigrams (3).
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">
          🌱 Stemming/Lemmatization
        </h3>
        <p className="text-sm text-green-700">
          Reduce words to roots. Stemming is fast but crude; lemmatization is
          accurate.
        </p>
      </div>
      <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">🏷️ POS Tagging</h3>
        <p className="text-sm text-amber-700">
          Label tokens with grammar roles (noun, verb, adj) for deeper
          understanding.
        </p>
      </div>
    </div>

    <div className="bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Tokenization and text preprocessing are the foundation of all NLP.
        Before any AI model can understand text, it must first be broken down
        and cleaned. These techniques power everything from search engines to
        sentiment analysis to the LLMs you've been learning about!
      </p>
    </div>
  </Section>
);

export default function TokenizationGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔤 Tokenization & Text Preprocessing
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Preparing Text for NLP
          </p>
        </div>

        <ConceptIntro />
        <FrequencyAnalysis />
        <TextNormalization />
        <StopWords />
        <NGrams />
        <StemmingVsLemmatization />
        <POSTagging />
        <PipelineVisualization />
        <SummarySection />
      </div>
    </div>
  );
}
