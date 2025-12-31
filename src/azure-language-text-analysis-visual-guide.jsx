import React, { useState } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const OverviewSection = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: "ner",
      name: "Named Entity Recognition",
      icon: "🏷️",
      desc: "Identify people, places, events",
    },
    {
      id: "link",
      name: "Entity Linking",
      icon: "🔗",
      desc: "Link entities to Wikipedia",
    },
    {
      id: "pii",
      name: "PII Detection",
      icon: "🔒",
      desc: "Find sensitive personal info",
    },
    {
      id: "lang",
      name: "Language Detection",
      icon: "🌍",
      desc: "Identify text language",
    },
    {
      id: "sentiment",
      name: "Sentiment Analysis",
      icon: "😊",
      desc: "Positive/negative detection",
    },
    {
      id: "summary",
      name: "Summarization",
      icon: "📝",
      desc: "Extract key information",
    },
    {
      id: "phrases",
      name: "Key Phrase Extraction",
      icon: "🔑",
      desc: "Main concepts from text",
    },
  ];

  return (
    <Section title="🔤 Azure Language Text Analysis Overview" color="#1e293b">
      <p className="text-gray-700 mb-4">
        Azure Language (part of <strong>Foundry Tools</strong>) performs
        advanced natural language processing on unstructured text. Click each
        feature to learn more:
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        {features.slice(0, 4).map((feat) => (
          <button
            key={feat.id}
            onClick={() =>
              setSelectedFeature(selectedFeature === feat.id ? null : feat.id)
            }
            className={`p-3 rounded-xl text-center transition-all ${
              selectedFeature === feat.id
                ? "bg-blue-100 ring-2 ring-blue-400 scale-105"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="text-2xl">{feat.icon}</span>
            <div className="font-medium text-sm mt-1 text-gray-800">
              {feat.name}
            </div>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {features.slice(4).map((feat) => (
          <button
            key={feat.id}
            onClick={() =>
              setSelectedFeature(selectedFeature === feat.id ? null : feat.id)
            }
            className={`p-3 rounded-xl text-center transition-all ${
              selectedFeature === feat.id
                ? "bg-blue-100 ring-2 ring-blue-400 scale-105"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            <span className="text-2xl">{feat.icon}</span>
            <div className="font-medium text-sm mt-1 text-gray-800">
              {feat.name}
            </div>
          </button>
        ))}
      </div>

      {selectedFeature && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2">
            <span className="text-2xl">
              {features.find((f) => f.id === selectedFeature)?.icon}
            </span>
            <div>
              <div className="font-bold text-blue-800">
                {features.find((f) => f.id === selectedFeature)?.name}
              </div>
              <div className="text-sm text-blue-600">
                {features.find((f) => f.id === selectedFeature)?.desc}
              </div>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
};

const EntityRecognitionSection = () => {
  const inputText =
    "Bill Gates visited Microsoft headquarters in Seattle last week. The meeting cost $10.99 for coffee.";
  const [showEntities, setShowEntities] = useState(false);

  const entities = [
    { text: "Bill Gates", type: "Person", color: "#8B5CF6" },
    { text: "Microsoft", type: "Organization", color: "#3B82F6" },
    { text: "Seattle", type: "Location", color: "#22C55E" },
    { text: "last week", type: "DateTime", color: "#F59E0B" },
    { text: "$10.99", type: "Quantity (Currency)", color: "#EF4444" },
  ];

  const entityTypes = [
    {
      type: "Person",
      icon: "👤",
      examples: ["Bill Gates", "John"],
      color: "#8B5CF6",
    },
    {
      type: "Location",
      icon: "📍",
      examples: ["Paris", "New York"],
      color: "#22C55E",
    },
    {
      type: "Organization",
      icon: "🏢",
      examples: ["Microsoft", "Google"],
      color: "#3B82F6",
    },
    {
      type: "DateTime",
      icon: "📅",
      examples: ["May 2nd", "6:30PM"],
      color: "#F59E0B",
    },
    {
      type: "Quantity",
      icon: "🔢",
      examples: ["25%", "$10.99", "10 miles"],
      color: "#EF4444",
    },
    {
      type: "URL/Email",
      icon: "🌐",
      examples: ["support@ms.com"],
      color: "#06B6D4",
    },
  ];

  const highlightText = () => {
    let result = inputText;
    if (showEntities) {
      entities.forEach((entity) => {
        result = result.replace(
          entity.text,
          `<span style="background-color: ${entity.color}20; border-bottom: 2px solid ${entity.color}; padding: 0 2px;">${entity.text}</span>`
        );
      });
    }
    return result;
  };

  return (
    <Section title="🏷️ Named Entity Recognition (NER)" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        NER identifies and categorizes entities in text — people, places,
        organizations, quantities, dates, and more. It can also be customized
        for domain-specific categories.
      </p>

      {/* Entity type reference */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
        {entityTypes.map((et, i) => (
          <div
            key={i}
            className="text-center p-2 rounded-lg"
            style={{ backgroundColor: `${et.color}15` }}
          >
            <span className="text-xl">{et.icon}</span>
            <div className="text-xs font-medium" style={{ color: et.color }}>
              {et.type}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-purple-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-purple-800">
            🔍 Try Entity Recognition:
          </h4>
          <button
            onClick={() => setShowEntities(!showEntities)}
            className={`px-4 py-2 rounded-lg font-medium ${
              showEntities
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border border-purple-300"
            }`}
          >
            {showEntities ? "✨ Entities Highlighted" : "🔍 Detect Entities"}
          </button>
        </div>

        <div
          className="bg-white rounded-lg p-4 text-gray-800 leading-relaxed min-h-16"
          dangerouslySetInnerHTML={{ __html: highlightText() }}
        />

        {showEntities && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
            {entities.map((entity, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-2 flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entity.color }}
                />
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {entity.text}
                  </div>
                  <div className="text-xs" style={{ color: entity.color }}>
                    {entity.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subtypes table */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-700 mb-2">
          📊 Common Entity Subtypes:
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          {[
            { type: "Quantity", sub: "Number", ex: '"6" or "six"' },
            { type: "Quantity", sub: "Percentage", ex: '"25%"' },
            { type: "Quantity", sub: "Currency", ex: '"$10.99"' },
            { type: "Quantity", sub: "Temperature", ex: '"45 degrees"' },
            { type: "DateTime", sub: "Date", ex: '"May 2nd"' },
            { type: "DateTime", sub: "Time", ex: '"8:00 AM"' },
            { type: "DateTime", sub: "Duration", ex: '"45 seconds"' },
            { type: "DateTime", sub: "Set", ex: '"every Tuesday"' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded p-2">
              <div className="text-gray-500">
                {item.type} → {item.sub}
              </div>
              <div className="text-gray-700">{item.ex}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

const EntityLinkingSection = () => {
  const [hoveredEntity, setHoveredEntity] = useState(null);

  return (
    <Section title="🔗 Entity Linking" color="#3b82f6">
      <p className="text-gray-700 mb-4">
        Entity linking disambiguates entities by linking them to{" "}
        <strong>Wikipedia articles</strong>. This helps clarify which "Seattle"
        or "Paris" is being referenced.
      </p>

      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-blue-800 mb-3">
          Example: Restaurant Review
        </h4>

        <div className="bg-white rounded-lg p-4 mb-4">
          <p className="text-gray-800 text-lg">
            "I ate at the restaurant in{" "}
            <span
              className="bg-green-100 px-1 rounded cursor-pointer border-b-2 border-green-500"
              onMouseEnter={() => setHoveredEntity("seattle")}
              onMouseLeave={() => setHoveredEntity(null)}
            >
              Seattle
            </span>{" "}
            <span
              className="bg-amber-100 px-1 rounded cursor-pointer border-b-2 border-amber-500"
              onMouseEnter={() => setHoveredEntity("lastweek")}
              onMouseLeave={() => setHoveredEntity(null)}
            >
              last week
            </span>
            ."
          </p>
        </div>

        {/* Entity details */}
        <div className="grid md:grid-cols-2 gap-3">
          <div
            className={`bg-white rounded-lg p-3 border-2 transition-all ${
              hoveredEntity === "seattle"
                ? "border-green-400 scale-102"
                : "border-transparent"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="font-medium text-gray-800">Seattle</span>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                Location
              </span>
            </div>
            <a
              href="#"
              className="text-blue-600 text-sm hover:underline flex items-center gap-1"
            >
              🔗 en.wikipedia.org/wiki/Seattle
            </a>
          </div>

          <div
            className={`bg-white rounded-lg p-3 border-2 transition-all ${
              hoveredEntity === "lastweek"
                ? "border-amber-400 scale-102"
                : "border-transparent"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="font-medium text-gray-800">last week</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded">
                DateTime
              </span>
            </div>
            <span className="text-gray-500 text-sm italic">
              No Wikipedia link (relative time)
            </span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Why Entity Linking?</strong> Helps disambiguate entities —
          "Paris" could mean Paris, France or Paris, Texas. The Wikipedia link
          clarifies which one!
        </p>
      </div>
    </Section>
  );
};

const LanguageDetectionSection = () => {
  const [selectedReview, setSelectedReview] = useState(0);

  const reviews = [
    {
      text: "A fantastic place for lunch. The soup was delicious.",
      language: "English",
      code: "en",
      score: 1.0,
      flag: "🇬🇧",
    },
    {
      text: "Comida maravillosa y gran servicio.",
      language: "Spanish",
      code: "es",
      score: 1.0,
      flag: "🇪🇸",
    },
    {
      text: "The croque monsieur avec frites was terrific. Bon appetit!",
      language: "English",
      code: "en",
      score: 0.9,
      flag: "🇬🇧",
      note: "Mixed language (English predominant)",
    },
  ];

  const current = reviews[selectedReview];

  return (
    <Section title="🌍 Language Detection" color="#22c55e">
      <p className="text-gray-700 mb-4">
        Azure Language detects the language of text and returns the language
        name, ISO 639-1 code, and confidence score.
      </p>

      <div className="bg-green-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-green-800 mb-3">
          🍽️ Restaurant Review Analysis:
        </h4>

        <div className="flex gap-2 mb-4 justify-center">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setSelectedReview(i)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedReview === i
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-600 border border-green-300"
              }`}
            >
              Review {i + 1}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="text-lg text-gray-800 italic mb-4">
            "{current.text}"
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl mb-1">{current.flag}</div>
              <div className="text-sm text-gray-500">Language</div>
              <div className="font-bold text-green-700">{current.language}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">📝</div>
              <div className="text-sm text-gray-500">ISO Code</div>
              <div className="font-bold text-green-700 font-mono">
                {current.code}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-1">📊</div>
              <div className="text-sm text-gray-500">Confidence</div>
              <div className="font-bold text-green-700">
                {(current.score * 100).toFixed(0)}%
              </div>
            </div>
          </div>

          {current.note && (
            <div className="mt-3 bg-amber-50 rounded-lg p-2 text-center">
              <span className="text-sm text-amber-700">⚠️ {current.note}</span>
            </div>
          )}
        </div>

        {/* Confidence bar */}
        <div className="bg-white rounded-lg p-3">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Confidence:</span>
            <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all"
                style={{ width: `${current.score * 100}%` }}
              />
            </div>
            <span className="font-bold text-green-700">{current.score}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Note:</strong> For mixed-language text, the service returns
          the <em>predominant</em> language with a lower confidence score.
          Ambiguous text (like ":-)" only) returns "unknown" with NaN score.
        </p>
      </div>
    </Section>
  );
};

const SentimentAnalysisSection = () => {
  const [selectedReview, setSelectedReview] = useState(0);

  const reviews = [
    {
      text: "We had dinner at this restaurant last night and the first thing I noticed was how courteous the staff was. We were greeted in a friendly manner and taken to our table right away. The table was clean, the chairs were comfortable, and the food was amazing.",
      sentiment: "positive",
      positive: 0.9,
      neutral: 0.1,
      negative: 0.0,
      emoji: "😊",
    },
    {
      text: "Our dining experience at this restaurant was one of the worst I've ever had. The service was slow, and the food was awful. I'll never eat at this establishment again.",
      sentiment: "negative",
      positive: 0.0,
      neutral: 0.0,
      negative: 0.99,
      emoji: "😠",
    },
    {
      text: "The restaurant was okay. Nothing special but nothing bad either. Average experience overall.",
      sentiment: "neutral",
      positive: 0.15,
      neutral: 0.7,
      negative: 0.15,
      emoji: "😐",
    },
  ];

  const current = reviews[selectedReview];

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "#22C55E";
      case "negative":
        return "#EF4444";
      default:
        return "#F59E0B";
    }
  };

  return (
    <Section title="😊 Sentiment Analysis" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        Evaluates text and returns sentiment scores for positive, neutral, and
        negative categories. Each score is between 0 and 1.
      </p>

      <div className="bg-amber-50 rounded-xl p-4 mb-4">
        <h4 className="font-semibold text-amber-800 mb-3">
          🍽️ Analyze Restaurant Reviews:
        </h4>

        <div className="flex gap-2 mb-4 justify-center">
          {["Positive", "Negative", "Neutral"].map((label, i) => (
            <button
              key={i}
              onClick={() => setSelectedReview(i)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                selectedReview === i
                  ? "text-white"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
              style={{
                backgroundColor:
                  selectedReview === i
                    ? getSentimentColor(reviews[i].sentiment)
                    : undefined,
              }}
            >
              {reviews[i].emoji} {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg p-4 mb-4">
          <div className="text-gray-800 mb-4 text-sm leading-relaxed">
            "{current.text}"
          </div>

          <div
            className="text-center py-3 rounded-lg text-white text-xl font-bold mb-4"
            style={{ backgroundColor: getSentimentColor(current.sentiment) }}
          >
            {current.emoji} Document Sentiment:{" "}
            {current.sentiment.toUpperCase()}
          </div>

          {/* Score bars */}
          <div className="space-y-3">
            {[
              { label: "Positive", score: current.positive, color: "#22C55E" },
              { label: "Neutral", score: current.neutral, color: "#F59E0B" },
              { label: "Negative", score: current.negative, color: "#EF4444" },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium" style={{ color: item.color }}>
                    {item.score.toFixed(2)}
                  </span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${item.score * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: "📱", title: "Social Media", desc: "Brand monitoring" },
          { icon: "⭐", title: "Reviews", desc: "Customer feedback" },
          { icon: "💬", title: "Forums", desc: "Discussion analysis" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-3 border text-center">
            <span className="text-2xl">{item.icon}</span>
            <div className="font-medium text-sm text-gray-800">
              {item.title}
            </div>
            <div className="text-xs text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const KeyPhraseExtractionSection = () => {
  const [showPhrases, setShowPhrases] = useState(false);

  const reviewText =
    "We had dinner here for a birthday celebration and had a fantastic experience. We were greeted by a friendly hostess and taken to our table right away. The ambiance was relaxed, the food was amazing, and service was terrific. If you like great food and attentive service, you should try this place.";

  const keyPhrases = [
    "birthday celebration",
    "fantastic experience",
    "friendly hostess",
    "great food",
    "attentive service",
    "dinner",
    "table",
    "ambiance",
    "place",
  ];

  const highlightPhrases = () => {
    let result = reviewText;
    if (showPhrases) {
      keyPhrases.forEach((phrase) => {
        const regex = new RegExp(`(${phrase})`, "gi");
        result = result.replace(
          regex,
          '<mark class="bg-yellow-200 px-1 rounded">$1</mark>'
        );
      });
    }
    return result;
  };

  return (
    <Section title="🔑 Key Phrase Extraction" color="#6366f1">
      <p className="text-gray-700 mb-4">
        Extracts the <strong>main concepts</strong> from unstructured text.
        Perfect for quickly summarizing large volumes of reviews or documents.
      </p>

      <div className="bg-indigo-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-indigo-800">
            🍽️ Restaurant Review:
          </h4>
          <button
            onClick={() => setShowPhrases(!showPhrases)}
            className={`px-4 py-2 rounded-lg font-medium ${
              showPhrases
                ? "bg-indigo-600 text-white"
                : "bg-white text-indigo-600 border border-indigo-300"
            }`}
          >
            {showPhrases ? "✨ Phrases Highlighted" : "🔑 Extract Key Phrases"}
          </button>
        </div>

        <div
          className="bg-white rounded-lg p-4 text-gray-800 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: highlightPhrases() }}
        />

        {showPhrases && (
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-2">
              📋 Extracted Key Phrases:
            </div>
            <div className="flex flex-wrap gap-2">
              {keyPhrases.map((phrase, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {phrase}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
        <p className="text-sm text-yellow-800">
          <strong>💡 Use Case:</strong> If you have thousands of customer
          surveys, key phrase extraction can quickly summarize main themes
          without reading every review!
        </p>
      </div>
    </Section>
  );
};

const PIIDetectionSection = () => {
  const [showPII, setShowPII] = useState(false);

  const text =
    "My name is John Smith and my email is john.smith@email.com. You can reach me at (555) 123-4567. My SSN is 123-45-6789.";

  const piiItems = [
    { text: "John Smith", type: "Person Name", color: "#8B5CF6" },
    { text: "john.smith@email.com", type: "Email", color: "#3B82F6" },
    { text: "(555) 123-4567", type: "Phone Number", color: "#22C55E" },
    { text: "123-45-6789", type: "SSN", color: "#EF4444" },
  ];

  const getRedactedText = () => {
    if (!showPII) return text;
    let result = text;
    piiItems.forEach((item) => {
      result = result.replace(
        item.text,
        `<span style="background-color: ${item.color}20; border: 1px solid ${item.color}; padding: 0 4px; border-radius: 4px;"><span style="color: ${item.color}; font-weight: bold;">[${item.type}]</span></span>`
      );
    });
    return result;
  };

  return (
    <Section title="🔒 PII Detection" color="#ef4444">
      <p className="text-gray-700 mb-4">
        Identifies <strong>personally identifiable information (PII)</strong>{" "}
        including names, emails, phone numbers, and personal health information
        (PHI).
      </p>

      <div className="bg-red-50 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-red-800">
            🔍 Detect Sensitive Information:
          </h4>
          <button
            onClick={() => setShowPII(!showPII)}
            className={`px-4 py-2 rounded-lg font-medium ${
              showPII
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 border border-red-300"
            }`}
          >
            {showPII ? "🔒 PII Detected" : "🔍 Detect PII"}
          </button>
        </div>

        <div
          className="bg-white rounded-lg p-4 text-gray-800 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: getRedactedText() }}
        />

        {showPII && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {piiItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-lg p-2 text-center"
                style={{ borderLeft: `4px solid ${item.color}` }}
              >
                <div className="text-xs text-gray-500">{item.type}</div>
                <div className="text-sm font-medium text-gray-800 truncate">
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {[
          { icon: "👤", name: "Names" },
          { icon: "📧", name: "Emails" },
          { icon: "📱", name: "Phones" },
          { icon: "🏥", name: "Health Info (PHI)" },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-lg p-2 border text-center">
            <span className="text-xl">{item.icon}</span>
            <div className="text-xs text-gray-600">{item.name}</div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const InteractiveDemoSection = () => {
  const [inputText, setInputText] = useState(
    "The new iPhone 15 was announced by Apple in California on September 12, 2023. It costs $999."
  );
  const [activeFeature, setActiveFeature] = useState("ner");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const features = {
    ner: { name: "Named Entities", icon: "🏷️" },
    sentiment: { name: "Sentiment", icon: "😊" },
    language: { name: "Language", icon: "🌍" },
    phrases: { name: "Key Phrases", icon: "🔑" },
  };

  const analyzeText = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      if (activeFeature === "ner") {
        setResults({
          type: "ner",
          entities: [
            { text: "iPhone 15", type: "Product" },
            { text: "Apple", type: "Organization" },
            { text: "California", type: "Location" },
            { text: "September 12, 2023", type: "DateTime" },
            { text: "$999", type: "Currency" },
          ],
        });
      } else if (activeFeature === "sentiment") {
        setResults({
          type: "sentiment",
          sentiment: "neutral",
          scores: { positive: 0.15, neutral: 0.8, negative: 0.05 },
        });
      } else if (activeFeature === "language") {
        setResults({
          type: "language",
          language: "English",
          code: "en",
          score: 1.0,
        });
      } else if (activeFeature === "phrases") {
        setResults({
          type: "phrases",
          phrases: [
            "new iPhone 15",
            "Apple",
            "California",
            "September 12, 2023",
          ],
        });
      }
    }, 1000);
  };

  return (
    <Section title="🧪 Interactive Analysis Demo" color="#8b5cf6">
      <p className="text-gray-700 mb-4">
        Try analyzing text with different Azure Language features:
      </p>

      <div className="bg-purple-50 rounded-xl p-4">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-3 rounded-lg border border-purple-200 mb-4 resize-none"
          rows={3}
          placeholder="Enter text to analyze..."
        />

        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          {Object.entries(features).map(([key, feat]) => (
            <button
              key={key}
              onClick={() => {
                setActiveFeature(key);
                setResults(null);
              }}
              className={`px-3 py-2 rounded-lg font-medium flex items-center gap-2 ${
                activeFeature === key
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border border-purple-300"
              }`}
            >
              {feat.icon} {feat.name}
            </button>
          ))}
        </div>

        <button
          onClick={analyzeText}
          disabled={isAnalyzing}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 font-medium"
        >
          {isAnalyzing ? "⏳ Analyzing..." : "🔍 Analyze Text"}
        </button>

        {results && (
          <div className="mt-4 bg-white rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">📊 Results:</h4>

            {results.type === "ner" && (
              <div className="flex flex-wrap gap-2">
                {results.entities.map((e, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {e.text} <span className="text-purple-400">({e.type})</span>
                  </span>
                ))}
              </div>
            )}

            {results.type === "sentiment" && (
              <div className="text-center">
                <div className="text-3xl mb-2">
                  {results.sentiment === "positive"
                    ? "😊"
                    : results.sentiment === "negative"
                    ? "😠"
                    : "😐"}
                </div>
                <div className="font-bold text-lg capitalize">
                  {results.sentiment}
                </div>
              </div>
            )}

            {results.type === "language" && (
              <div className="text-center">
                <div className="text-3xl mb-2">🇬🇧</div>
                <div className="font-bold">
                  {results.language} ({results.code})
                </div>
                <div className="text-sm text-gray-500">
                  Confidence: {results.score * 100}%
                </div>
              </div>
            )}

            {results.type === "phrases" && (
              <div className="flex flex-wrap gap-2">
                {results.phrases.map((p, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {p}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {[
        { icon: "🏷️", name: "NER", desc: "People, places, orgs" },
        { icon: "🔗", name: "Entity Linking", desc: "Wikipedia links" },
        { icon: "🌍", name: "Language", desc: "Detect language" },
        { icon: "😊", name: "Sentiment", desc: "+/-/neutral scores" },
      ].map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
          <span className="text-2xl">{item.icon}</span>
          <div className="font-medium text-sm text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-500">{item.desc}</div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-3 mb-4">
      {[
        { icon: "🔒", name: "PII Detection", desc: "Sensitive info" },
        { icon: "🔑", name: "Key Phrases", desc: "Main concepts" },
        { icon: "📝", name: "Summarization", desc: "Key information" },
      ].map((item, i) => (
        <div key={i} className="bg-gray-50 rounded-lg p-3 text-center">
          <span className="text-2xl">{item.icon}</span>
          <div className="font-medium text-sm text-gray-800">{item.name}</div>
          <div className="text-xs text-gray-500">{item.desc}</div>
        </div>
      ))}
    </div>

    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h3 className="font-bold text-blue-800 mb-2">💡 The Big Picture</h3>
      <p className="text-sm text-blue-700">
        Azure Language (part of Foundry Tools) provides powerful NLP
        capabilities for analyzing unstructured text. From identifying entities
        and detecting sentiment to extracting key phrases and protecting
        sensitive information — these features enable intelligent text
        processing at scale. Mix of languages? The service detects the
        predominant one. Ambiguous entities? Entity linking disambiguates with
        Wikipedia!
      </p>
    </div>
  </Section>
);

export default function AzureLanguageTextAnalysisGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      <div className="max-w-384 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🔤 Azure Language Text Analysis
          </h1>
          <p className="text-gray-600">
            A Visual Guide to NLP Capabilities in Azure
          </p>
          <div className="mt-2 inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            Microsoft Azure AI Fundamentals • Foundry Tools
          </div>
        </div>

        <OverviewSection />
        <EntityRecognitionSection />
        <EntityLinkingSection />
        <LanguageDetectionSection />
        <SentimentAnalysisSection />
        <KeyPhraseExtractionSection />
        <PIIDetectionSection />
        <InteractiveDemoSection />
        <SummarySection />
      </div>
    </div>
  );
}
