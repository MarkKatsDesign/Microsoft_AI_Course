import React, { useState } from "react";

const PenguinIcon = ({ type, size = 40 }) => {
  const colors = {
    adelie: "#FF6B6B",
    gentoo: "#4ECDC4",
    chinstrap: "#9B59B6",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <ellipse cx="50" cy="60" rx="25" ry="35" fill={colors[type]} />
      <ellipse cx="50" cy="35" rx="18" ry="20" fill={colors[type]} />
      <ellipse cx="50" cy="40" rx="12" ry="14" fill="white" />
      <circle cx="44" cy="32" r="3" fill="#1a1a2e" />
      <circle cx="56" cy="32" r="3" fill="#1a1a2e" />
      <polygon points="50,38 45,45 55,45" fill="#FFA500" />
      <ellipse
        cx="30"
        cy="60"
        rx="8"
        ry="20"
        fill={colors[type]}
        transform="rotate(-15 30 60)"
      />
      <ellipse
        cx="70"
        cy="60"
        rx="8"
        ry="20"
        fill={colors[type]}
        transform="rotate(15 70 60)"
      />
    </svg>
  );
};

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
  </div>
);

const ConceptIntro = () => (
  <Section title="🎯 What is Multiclass Classification?" color="#3b82f6">
    <div className="flex flex-col lg:flex-row gap-6 items-center">
      <div className="flex-1">
        <p className="text-gray-700 mb-4">
          Imagine you're a scientist studying penguins. You measure their
          flipper length and want to predict which species they belong to.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Binary classification</strong> = Two choices (yes/no, cat/dog)
          <br />
          <strong>Multiclass classification</strong> = Multiple choices
          (Adelie/Gentoo/Chinstrap)
        </p>
      </div>
      <div className="flex gap-4 items-end">
        <div className="text-center">
          <PenguinIcon type="adelie" size={60} />
          <p className="text-sm font-medium mt-1" style={{ color: "#FF6B6B" }}>
            Adelie (0)
          </p>
          <p className="text-xs text-gray-500">~158-172mm</p>
        </div>
        <div className="text-center">
          <PenguinIcon type="gentoo" size={60} />
          <p className="text-sm font-medium mt-1" style={{ color: "#4ECDC4" }}>
            Gentoo (1)
          </p>
          <p className="text-xs text-gray-500">~189-210mm</p>
        </div>
        <div className="text-center">
          <PenguinIcon type="chinstrap" size={60} />
          <p className="text-sm font-medium mt-1" style={{ color: "#9B59B6" }}>
            Chinstrap (2)
          </p>
          <p className="text-xs text-gray-500">~225-232mm</p>
        </div>
      </div>
    </div>
  </Section>
);

const OvRvsMN = () => {
  const [activeTab, setActiveTab] = useState("ovr");

  return (
    <Section
      title="🔀 Two Approaches: One-vs-Rest vs Multinomial"
      color="#8b5cf6"
    >
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab("ovr")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "ovr"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          One-vs-Rest (OvR)
        </button>
        <button
          onClick={() => setActiveTab("multinomial")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            activeTab === "multinomial"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Multinomial (Softmax)
        </button>
      </div>

      {activeTab === "ovr" ? (
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>Think of it like three separate yes/no questions:</strong>
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                species: "Adelie",
                color: "#FF6B6B",
                prob: 0.15,
                type: "adelie",
              },
              {
                species: "Gentoo",
                color: "#4ECDC4",
                prob: 0.75,
                type: "gentoo",
              },
              {
                species: "Chinstrap",
                color: "#9B59B6",
                prob: 0.25,
                type: "chinstrap",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl p-4 border-2"
                style={{ borderColor: item.color }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <PenguinIcon type={item.type} size={30} />
                  <span className="font-medium">Is it {item.species}?</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  vs ALL other species
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${item.prob * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div
                  className="text-right text-sm font-medium mt-1"
                  style={{ color: item.color }}
                >
                  {(item.prob * 100).toFixed(0)}% likely
                </div>
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
            <p className="text-green-800">
              <strong>Winner:</strong> Gentoo has the highest probability (75%),
              so we predict <strong>Gentoo</strong>!
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">
            <strong>
              One function outputs ALL probabilities at once (they sum to 100%):
            </strong>
          </p>
          <div className="bg-gray-50 rounded-xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-lg font-mono bg-white px-3 py-1 rounded border">
                f(x)
              </span>
              <span className="text-2xl">=</span>
              <div className="flex items-center bg-white rounded-lg border overflow-hidden">
                {[
                  { value: 0.2, color: "#FF6B6B", type: "adelie" },
                  { value: 0.5, color: "#4ECDC4", type: "gentoo" },
                  { value: 0.3, color: "#9B59B6", type: "chinstrap" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 text-center border-r last:border-r-0"
                  >
                    <PenguinIcon type={item.type} size={24} />
                    <div
                      className="font-mono font-bold"
                      style={{ color: item.color }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-8 flex rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full flex items-center justify-center text-white text-sm font-medium"
                style={{ width: "20%", backgroundColor: "#FF6B6B" }}
              >
                20%
              </div>
              <div
                className="h-full flex items-center justify-center text-white text-sm font-medium"
                style={{ width: "50%", backgroundColor: "#4ECDC4" }}
              >
                50%
              </div>
              <div
                className="h-full flex items-center justify-center text-white text-sm font-medium"
                style={{ width: "30%", backgroundColor: "#9B59B6" }}
              >
                30%
              </div>
            </div>

            <p className="text-center text-sm text-gray-500 mt-2">
              0.2 + 0.5 + 0.3 = 1.0 (100%)
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              <strong>Winner:</strong> Gentoo has the highest slice (50%), so we
              predict <strong>Gentoo</strong>!
            </p>
          </div>
        </div>
      )}
    </Section>
  );
};

const ConfusionMatrixSection = () => {
  const [hoveredCell, setHoveredCell] = useState(null);

  const matrix = [
    [2, 0, 0], // Actual Adelie
    [0, 2, 0], // Actual Gentoo
    [0, 1, 2], // Actual Chinstrap
  ];

  const species = ["Adelie", "Gentoo", "Chinstrap"];
  const colors = ["#FF6B6B", "#4ECDC4", "#9B59B6"];

  const getCellExplanation = (actual, predicted) => {
    const count = matrix[actual][predicted];
    if (actual === predicted) {
      return `✅ Correct! We predicted ${species[predicted]} and it WAS ${species[actual]} (${count} times)`;
    }
    return `❌ Oops! We predicted ${species[predicted]} but it was actually ${species[actual]} (${count} times)`;
  };

  return (
    <Section title="📊 Understanding the Confusion Matrix" color="#10b981">
      <p className="text-gray-700 mb-4">
        A confusion matrix shows how often our model got it right vs wrong.{" "}
        <strong>Hover over each cell</strong> to understand what it means:
      </p>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="shrink-0">
          <div className="mb-2 text-center text-sm font-medium text-gray-600">
            ← What we PREDICTED →
          </div>
          <div className="flex">
            <div className="flex flex-col justify-center pr-2">
              <div className="text-sm font-medium text-gray-600 transform -rotate-90 whitespace-nowrap">
                ← Actual →
              </div>
            </div>
            <div>
              <div className="flex mb-1">
                <div className="w-16" />
                {species.map((s, i) => (
                  <div
                    key={i}
                    className="w-16 text-center text-xs font-medium"
                    style={{ color: colors[i] }}
                  >
                    {s}
                  </div>
                ))}
              </div>
              {matrix.map((row, actualIdx) => (
                <div key={actualIdx} className="flex">
                  <div
                    className="w-16 flex items-center justify-end pr-2 text-xs font-medium"
                    style={{ color: colors[actualIdx] }}
                  >
                    {species[actualIdx]}
                  </div>
                  {row.map((count, predIdx) => {
                    const isCorrect = actualIdx === predIdx;
                    const isHovered =
                      hoveredCell?.actual === actualIdx &&
                      hoveredCell?.predicted === predIdx;
                    return (
                      <div
                        key={predIdx}
                        className={`w-16 h-16 flex items-center justify-center text-lg font-bold border-2 cursor-pointer transition-all ${
                          isHovered ? "scale-110 z-10" : ""
                        }`}
                        style={{
                          backgroundColor: isCorrect
                            ? `${colors[actualIdx]}20`
                            : count > 0
                            ? "#FEE2E2"
                            : "#F9FAFB",
                          borderColor: isCorrect
                            ? colors[actualIdx]
                            : count > 0
                            ? "#EF4444"
                            : "#E5E7EB",
                          color: isCorrect
                            ? colors[actualIdx]
                            : count > 0
                            ? "#EF4444"
                            : "#9CA3AF",
                        }}
                        onMouseEnter={() =>
                          setHoveredCell({
                            actual: actualIdx,
                            predicted: predIdx,
                          })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                      >
                        {count}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div
            className={`p-4 rounded-lg border-2 transition-all ${
              hoveredCell
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {hoveredCell ? (
              <p className="text-gray-700">
                {getCellExplanation(hoveredCell.actual, hoveredCell.predicted)}
              </p>
            ) : (
              <p className="text-gray-500 italic">
                👆 Hover over a cell to see what it means
              </p>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: "#4ECDC420",
                  border: "2px solid #4ECDC4",
                }}
              />
              <span>Diagonal = Correct predictions ✅</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-100 border-2 border-red-400" />
              <span>Off-diagonal = Mistakes ❌</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const MetricsSection = () => {
  const [selectedClass, setSelectedClass] = useState(1);

  const classData = [
    { name: "Adelie", color: "#FF6B6B", tp: 2, tn: 5, fp: 0, fn: 0 },
    { name: "Gentoo", color: "#4ECDC4", tp: 2, tn: 4, fp: 1, fn: 0 },
    { name: "Chinstrap", color: "#9B59B6", tp: 2, tn: 4, fp: 0, fn: 1 },
  ];

  const data = classData[selectedClass];
  const accuracy = (
    (data.tp + data.tn) /
    (data.tp + data.tn + data.fp + data.fn)
  ).toFixed(2);
  const precision = data.tp / (data.tp + data.fp) || 0;
  const recall = data.tp / (data.tp + data.fn) || 0;
  const f1 = (2 * precision * recall) / (precision + recall) || 0;

  return (
    <Section title="📈 Understanding Metrics: TP, FP, TN, FN" color="#f59e0b">
      <p className="text-gray-700 mb-4">
        For each class, we can measure how well our model performs. Click a
        class to explore:
      </p>

      <div className="flex gap-2 mb-6">
        {classData.map((cls, i) => (
          <button
            key={i}
            onClick={() => setSelectedClass(i)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2`}
            style={{
              backgroundColor: selectedClass === i ? cls.color : "#F3F4F6",
              color: selectedClass === i ? "white" : "#4B5563",
            }}
          >
            {cls.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div>
          <h3 className="font-semibold mb-3">
            The 2x2 breakdown for "{data.name}":
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{data.tp}</div>
              <div className="text-sm font-medium text-green-600">
                True Positive
              </div>
              <div className="text-xs text-green-600 mt-1">
                Said {data.name}, WAS {data.name} ✅
              </div>
            </div>
            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{data.fp}</div>
              <div className="text-sm font-medium text-red-500">
                False Positive
              </div>
              <div className="text-xs text-red-500 mt-1">
                Said {data.name}, WASN'T ❌
              </div>
            </div>
            <div className="bg-red-100 border-2 border-red-400 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{data.fn}</div>
              <div className="text-sm font-medium text-red-500">
                False Negative
              </div>
              <div className="text-xs text-red-500 mt-1">
                Missed a real {data.name} ❌
              </div>
            </div>
            <div className="bg-green-100 border-2 border-green-500 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-700">{data.tn}</div>
              <div className="text-sm font-medium text-green-600">
                True Negative
              </div>
              <div className="text-xs text-green-600 mt-1">
                Correctly said "not {data.name}" ✅
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">What the metrics mean:</h3>
          <div className="space-y-3">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Accuracy</span>
                <span
                  className="font-mono font-bold"
                  style={{ color: data.color }}
                >
                  {accuracy}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                "How often am I right overall?" → (TP+TN) / Total
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Precision</span>
                <span
                  className="font-mono font-bold"
                  style={{ color: data.color }}
                >
                  {precision.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                "When I say {data.name}, how often am I right?" → TP / (TP+FP)
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">Recall</span>
                <span
                  className="font-mono font-bold"
                  style={{ color: data.color }}
                >
                  {recall.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                "Of all real {data.name}s, how many did I find?" → TP / (TP+FN)
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">F1 Score</span>
                <span
                  className="font-mono font-bold"
                  style={{ color: data.color }}
                >
                  {f1.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                "Balance of precision & recall" → 2×(P×R)/(P+R)
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">
          🔢 Multiclass vs Binary
        </h3>
        <p className="text-sm text-blue-700">
          Binary = 2 choices. Multiclass = 3+ choices. The model outputs
          probabilities for EACH class.
        </p>
      </div>
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">🔀 Two Approaches</h3>
        <p className="text-sm text-purple-700">
          <strong>OvR:</strong> Train separate "is it X?" classifiers.{" "}
          <strong>Multinomial:</strong> One function, all probabilities at once.
        </p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">📊 Confusion Matrix</h3>
        <p className="text-sm text-green-700">
          Diagonal = correct predictions. Off-diagonal = mistakes. Bigger
          numbers on diagonal = better model!
        </p>
      </div>
      <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">📈 Metrics Matter</h3>
        <p className="text-sm text-amber-700">
          <strong>Precision:</strong> "When I say X, am I right?"{" "}
          <strong>Recall:</strong> "Did I find all the Xs?" <strong>F1:</strong>{" "}
          Balance of both.
        </p>
      </div>
    </div>
  </Section>
);

export default function MulticlassGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-[1536px] mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🐧 Multiclass Classification
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Understanding the Concepts
          </p>
        </div>

        <ConceptIntro />
        <OvRvsMN />
        <ConfusionMatrixSection />
        <MetricsSection />
        <SummarySection />
      </div>
    </div>
  );
}
