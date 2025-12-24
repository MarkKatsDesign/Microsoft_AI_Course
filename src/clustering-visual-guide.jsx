import React, { useState, useEffect } from "react";

const Section = ({ title, children, color = "#6366f1" }) => (
  <div className="mb-8 bg-white rounded-2xl shadow-lg overflow-hidden">
    <div className="px-6 py-4" style={{ backgroundColor: color }}>
      <h2 className="text-xl font-bold text-white">{title}</h2>
    </div>
    <div className="px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
  </div>
);

const FlowerIcon = ({ leaves, petals, color = "#888", size = 30 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    {/* Petals */}
    {Array.from({ length: petals }).map((_, i) => {
      const angle = (360 / petals) * i;
      return (
        <ellipse
          key={`petal-${i}`}
          cx="50"
          cy="25"
          rx="12"
          ry="20"
          fill={color}
          opacity="0.8"
          transform={`rotate(${angle} 50 50)`}
        />
      );
    })}
    {/* Center */}
    <circle cx="50" cy="50" r="15" fill="#FFD700" />
    <circle cx="50" cy="50" r="10" fill="#FFA500" />
    {/* Leaves indicator */}
    {leaves > 0 && (
      <text
        x="50"
        y="90"
        textAnchor="middle"
        fontSize="14"
        fill="#2d5a27"
        fontWeight="bold"
      >
        🌿×{leaves}
      </text>
    )}
  </svg>
);

const ConceptIntro = () => (
  <Section title="🔍 What is Clustering?" color="#3b82f6">
    <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div>
        <div className="bg-blue-50 rounded-xl p-4 mb-4 border-2 border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2">Supervised Learning</h3>
          <p className="text-sm text-blue-700 mb-2">
            You have labels (answers) to learn from:
          </p>
          <div className="flex gap-2 items-center text-sm">
            <span className="bg-white px-2 py-1 rounded">🐱 = Cat</span>
            <span className="bg-white px-2 py-1 rounded">🐕 = Dog</span>
            <span className="text-blue-600">→ Learn patterns</span>
          </div>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-400">
          <h3 className="font-bold text-green-800 mb-2">
            Unsupervised Learning (Clustering)
          </h3>
          <p className="text-sm text-green-700 mb-2">
            NO labels! Just find natural groups:
          </p>
          <div className="flex gap-2 items-center text-sm">
            <span className="bg-white px-2 py-1 rounded">🔵</span>
            <span className="bg-white px-2 py-1 rounded">🔵</span>
            <span className="bg-white px-2 py-1 rounded">🔴</span>
            <span className="bg-white px-2 py-1 rounded">🔴</span>
            <span className="text-green-600">→ "These seem similar!"</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-700 mb-3">
            <strong>Real-world examples:</strong>
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>🛒 Group customers by shopping behavior</li>
            <li>📧 Organize emails into topics</li>
            <li>🎵 Create music playlists by similarity</li>
            <li>🌸 Group flowers by characteristics</li>
          </ul>
        </div>
      </div>
    </div>
  </Section>
);

const FlowerDataSection = () => {
  const flowers = [
    { leaves: 0, petals: 5 },
    { leaves: 0, petals: 6 },
    { leaves: 1, petals: 3 },
    { leaves: 1, petals: 3 },
    { leaves: 1, petals: 6 },
    { leaves: 1, petals: 8 },
    { leaves: 2, petals: 3 },
    { leaves: 2, petals: 7 },
    { leaves: 2, petals: 8 },
  ];

  return (
    <Section title="🌸 The Flower Example" color="#ec4899">
      <p className="text-gray-700 mb-4">
        A botanist measured flowers but doesn't know what species they are. Can
        we find natural groupings?
      </p>

      <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div>
          <h3 className="font-semibold mb-3">The Data (No Labels!):</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Flower</th>
                  <th className="text-center py-2">Leaves (x₁)</th>
                  <th className="text-center py-2">Petals (x₂)</th>
                </tr>
              </thead>
              <tbody>
                {flowers.map((f, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-2">
                      <FlowerIcon
                        leaves={f.leaves}
                        petals={f.petals}
                        size={24}
                      />
                    </td>
                    <td className="text-center font-mono">{f.leaves}</td>
                    <td className="text-center font-mono">{f.petals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Plotted in 2D Space:</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <svg viewBox="-20 -20 180 140" className="w-full h-48">
              {/* Grid */}
              {[0, 1, 2, 3].map((x) => (
                <line
                  key={`vgrid-${x}`}
                  x1={x * 40}
                  y1="0"
                  x2={x * 40}
                  y2="100"
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}
              {[0, 2, 4, 6, 8].map((y, i) => (
                <line
                  key={`hgrid-${i}`}
                  x1="0"
                  y1={100 - y * 12}
                  x2="120"
                  y2={100 - y * 12}
                  stroke="#E5E7EB"
                  strokeWidth="1"
                />
              ))}

              {/* Axes */}
              <line
                x1="0"
                y1="100"
                x2="130"
                y2="100"
                stroke="#374151"
                strokeWidth="2"
              />
              <line
                x1="0"
                y1="100"
                x2="0"
                y2="-10"
                stroke="#374151"
                strokeWidth="2"
              />

              {/* Labels */}
              <text
                x="65"
                y="120"
                textAnchor="middle"
                fontSize="10"
                fill="#374151"
              >
                Leaves (x₁)
              </text>
              <text
                x="-15"
                y="50"
                textAnchor="middle"
                fontSize="10"
                fill="#374151"
                transform="rotate(-90 -15 50)"
              >
                Petals (x₂)
              </text>

              {/* Axis numbers */}
              {[0, 1, 2].map((x) => (
                <text
                  key={`xlabel-${x}`}
                  x={x * 40}
                  y="112"
                  textAnchor="middle"
                  fontSize="8"
                  fill="#6B7280"
                >
                  {x}
                </text>
              ))}
              {[0, 2, 4, 6, 8].map((y, i) => (
                <text
                  key={`ylabel-${i}`}
                  x="-8"
                  y={104 - y * 12}
                  textAnchor="middle"
                  fontSize="8"
                  fill="#6B7280"
                >
                  {y}
                </text>
              ))}

              {/* Data points */}
              {flowers.map((f, i) => (
                <circle
                  key={i}
                  cx={f.leaves * 40}
                  cy={100 - f.petals * 12}
                  r="6"
                  fill="#6366f1"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-center">
            Each dot is a flower positioned by its features
          </p>
        </div>
      </div>
    </Section>
  );
};

const KMeansAnimation = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Flower data points
  const flowers = [
    { x: 0, y: 5 },
    { x: 0, y: 6 },
    { x: 1, y: 3 },
    { x: 1, y: 3 },
    { x: 1, y: 6 },
    { x: 1, y: 8 },
    { x: 2, y: 3 },
    { x: 2, y: 7 },
    { x: 2, y: 8 },
  ];

  // Centroid positions at each step
  const centroidSteps = [
    // Step 0: Random initial positions
    [
      { x: 0.5, y: 7 },
      { x: 1.5, y: 4 },
      { x: 0.5, y: 3 },
    ],
    // Step 1: After first assignment and move
    [
      { x: 0.67, y: 6.67 },
      { x: 1.67, y: 6 },
      { x: 1.33, y: 3 },
    ],
    // Step 2: Converging
    [
      { x: 0.5, y: 5.5 },
      { x: 1.5, y: 7.5 },
      { x: 1.33, y: 3 },
    ],
    // Step 3: Final
    [
      { x: 0.5, y: 5.5 },
      { x: 1.5, y: 7 },
      { x: 1.33, y: 3 },
    ],
  ];

  const clusterColors = ["#EF4444", "#22C55E", "#3B82F6"];

  // Assign flowers to clusters based on current centroids
  const getClusterAssignment = (flower, centroids) => {
    let minDist = Infinity;
    let cluster = 0;
    centroids.forEach((c, i) => {
      const dist = Math.sqrt(
        Math.pow(flower.x - c.x, 2) + Math.pow(flower.y - c.y, 2)
      );
      if (dist < minDist) {
        minDist = dist;
        cluster = i;
      }
    });
    return cluster;
  };

  const currentCentroids =
    centroidSteps[Math.min(step, centroidSteps.length - 1)];

  const stepDescriptions = [
    {
      title: "Step 1: Place Random Centroids",
      desc: "We want 3 clusters (k=3), so we place 3 random points as starting centroids",
    },
    {
      title: "Step 2: Assign & Move",
      desc: "Each flower joins its nearest centroid. Then centroids move to the center of their flowers",
    },
    {
      title: "Step 3: Reassign & Move Again",
      desc: "Some flowers are now closer to different centroids, so they switch. Centroids move again",
    },
    {
      title: "Step 4: Stable!",
      desc: "No more changes! The algorithm has converged. We found 3 natural clusters!",
    },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying && step < 3) {
      interval = setInterval(() => {
        setStep((s) => {
          const nextStep = Math.min(s + 1, 3);
          if (nextStep === 3) {
            setIsPlaying(false);
          }
          return nextStep;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, step]);

  return (
    <Section title="⚙️ K-Means Algorithm: Step by Step" color="#8b5cf6">
      <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => {
                setStep(0);
                setIsPlaying(true);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2"
            >
              ▶️ Play Animation
            </button>
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              disabled={step === 0}
            >
              ←
            </button>
            <button
              onClick={() => setStep((s) => Math.min(3, s + 1))}
              className="px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              disabled={step === 3}
            >
              →
            </button>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200 mb-4">
            <h3 className="font-bold text-purple-800">
              {stepDescriptions[step].title}
            </h3>
            <p className="text-sm text-purple-700 mt-1">
              {stepDescriptions[step].desc}
            </p>
          </div>

          <div className="space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm transition-all ${
                  step === i
                    ? "bg-purple-100 border-2 border-purple-400"
                    : "bg-gray-50"
                }`}
              >
                <span
                  className={step >= i ? "text-purple-700" : "text-gray-400"}
                >
                  {step > i ? "✅" : step === i ? "👉" : "○"} Step {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4">
          <svg viewBox="-30 -30 200 160" className="w-full h-64">
            {/* Grid */}
            {[0, 1, 2, 3].map((x) => (
              <line
                key={`vgrid-${x}`}
                x1={x * 50}
                y1="0"
                x2={x * 50}
                y2="100"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            ))}
            {[0, 2, 4, 6, 8, 10].map((y, i) => (
              <line
                key={`hgrid-${i}`}
                x1="0"
                y1={100 - y * 10}
                x2="150"
                y2={100 - y * 10}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            ))}

            {/* Cluster regions (light background) */}
            {step > 0 &&
              currentCentroids.map((c, i) => (
                <circle
                  key={`region-${i}`}
                  cx={c.x * 50}
                  cy={100 - c.y * 10}
                  r="35"
                  fill={clusterColors[i]}
                  opacity="0.1"
                />
              ))}

            {/* Axes */}
            <line
              x1="0"
              y1="100"
              x2="160"
              y2="100"
              stroke="#374151"
              strokeWidth="2"
            />
            <line
              x1="0"
              y1="100"
              x2="0"
              y2="-20"
              stroke="#374151"
              strokeWidth="2"
            />

            {/* Data points */}
            {flowers.map((f, i) => {
              const cluster =
                step > 0 ? getClusterAssignment(f, currentCentroids) : -1;
              return (
                <circle
                  key={`flower-${i}`}
                  cx={f.x * 50}
                  cy={100 - f.y * 10}
                  r="8"
                  fill={cluster >= 0 ? clusterColors[cluster] : "#6366f1"}
                  stroke="white"
                  strokeWidth="2"
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Centroids */}
            {currentCentroids.map((c, i) => (
              <g key={`centroid-${i}`} className="transition-all duration-700">
                <circle
                  cx={c.x * 50}
                  cy={100 - c.y * 10}
                  r="10"
                  fill={clusterColors[i]}
                  stroke="white"
                  strokeWidth="3"
                />
                <text
                  x={c.x * 50}
                  y={100 - c.y * 10 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  ★
                </text>
              </g>
            ))}

            {/* Legend */}
            <text x="0" y="125" fontSize="9" fill="#6B7280">
              ● = Flower
            </text>
            <text x="60" y="125" fontSize="9" fill="#6B7280">
              ★ = Centroid
            </text>
          </svg>
        </div>
      </div>
    </Section>
  );
};

const EvaluationSection = () => {
  const [selectedMetric, setSelectedMetric] = useState("silhouette");

  const metrics = {
    avgDistance: {
      name: "Avg Distance to Center",
      icon: "📏",
      desc: "How close are points to their own centroid?",
      good: "Lower is better",
      visual: (
        <svg viewBox="0 0 200 150" className="w-full h-40">
          <circle
            cx="100"
            cy="75"
            r="50"
            fill="#3B82F620"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <circle cx="100" cy="75" r="8" fill="#3B82F6" />
          <text x="100" y="79" textAnchor="middle" fontSize="10" fill="white">
            ★
          </text>
          {[
            [80, 60],
            [120, 85],
            [95, 100],
            [110, 55],
          ].map(([x, y], i) => (
            <g key={i}>
              <line
                x1="100"
                y1="75"
                x2={x}
                y2={y}
                stroke="#3B82F6"
                strokeWidth="1"
                strokeDasharray="4"
              />
              <circle cx={x} cy={y} r="6" fill="#3B82F6" />
            </g>
          ))}
          <text
            x="100"
            y="140"
            textAnchor="middle"
            fontSize="10"
            fill="#6B7280"
          >
            Average of all dashed lines
          </text>
        </svg>
      ),
    },
    avgOther: {
      name: "Avg Distance to Other Centers",
      icon: "↔️",
      desc: "How far are points from OTHER centroids?",
      good: "Higher is better",
      visual: (
        <svg viewBox="0 0 200 150" className="w-full h-40">
          <circle
            cx="60"
            cy="75"
            r="35"
            fill="#22C55E20"
            stroke="#22C55E"
            strokeWidth="2"
          />
          <circle
            cx="140"
            cy="75"
            r="35"
            fill="#EF444420"
            stroke="#EF4444"
            strokeWidth="2"
          />
          <circle cx="60" cy="75" r="6" fill="#22C55E" />
          <circle cx="140" cy="75" r="6" fill="#EF4444" />
          <circle cx="45" cy="65" r="5" fill="#22C55E" />
          <line
            x1="45"
            y1="65"
            x2="140"
            y2="75"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeDasharray="4"
          />
          <text
            x="100"
            y="140"
            textAnchor="middle"
            fontSize="10"
            fill="#6B7280"
          >
            Distance to the "wrong" cluster
          </text>
        </svg>
      ),
    },
    silhouette: {
      name: "Silhouette Score",
      icon: "📊",
      desc: 'Ratio comparing "tightness" vs "separation"',
      good: "Closer to +1 is better",
      visual: (
        <svg viewBox="0 0 200 150" className="w-full h-40">
          <defs>
            <linearGradient id="silGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#FCD34D" />
              <stop offset="100%" stopColor="#22C55E" />
            </linearGradient>
          </defs>
          <rect
            x="20"
            y="50"
            width="160"
            height="30"
            rx="5"
            fill="url(#silGrad)"
          />
          <text x="20" y="95" fontSize="10" fill="#EF4444">
            -1
          </text>
          <text x="95" y="95" fontSize="10" fill="#6B7280">
            0
          </text>
          <text x="170" y="95" fontSize="10" fill="#22C55E">
            +1
          </text>
          <text x="25" y="115" fontSize="8" fill="#6B7280">
            Wrong cluster
          </text>
          <text x="140" y="115" fontSize="8" fill="#6B7280">
            Perfect clusters
          </text>
          {/* Marker */}
          <polygon points="145,45 150,35 155,45" fill="#1F2937" />
          <text
            x="150"
            y="30"
            textAnchor="middle"
            fontSize="9"
            fill="#1F2937"
            fontWeight="bold"
          >
            0.75
          </text>
        </svg>
      ),
    },
  };

  return (
    <Section title="📈 How Do We Know If Clusters Are Good?" color="#10b981">
      <p className="text-gray-700 mb-4">
        Without labels, we can't check "accuracy." Instead, we measure how{" "}
        <strong>tight</strong> clusters are and how <strong>separated</strong>{" "}
        they are from each other.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(metrics).map(([key, metric]) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              selectedMetric === key
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {metric.icon} {metric.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          {metrics[selectedMetric].visual}
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="font-bold text-lg text-green-800 mb-2">
            {metrics[selectedMetric].icon} {metrics[selectedMetric].name}
          </h3>
          <p className="text-gray-700 mb-3">{metrics[selectedMetric].desc}</p>
          <div className="bg-white rounded-lg p-3 border border-green-300">
            <span className="text-sm font-medium text-green-700">
              ✓ {metrics[selectedMetric].good}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
};

const ComparisonSection = () => (
  <Section title="🎯 Good vs Bad Clusters" color="#f59e0b">
    <div className="grid md:grid-cols-2 gapx-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="bg-green-50 rounded-xl p-4 border-2 border-green-400">
        <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
          ✅ Good Clustering
        </h3>
        <svg viewBox="0 0 200 150" className="w-full h-40 mb-3">
          {/* Cluster 1 */}
          <circle
            cx="50"
            cy="50"
            r="35"
            fill="#3B82F620"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          {[
            [40, 45],
            [55, 55],
            [45, 60],
            [60, 45],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#3B82F6" />
          ))}
          {/* Cluster 2 */}
          <circle
            cx="150"
            cy="100"
            r="35"
            fill="#22C55E20"
            stroke="#22C55E"
            strokeWidth="2"
          />
          {[
            [140, 95],
            [155, 105],
            [145, 110],
            [160, 95],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#22C55E" />
          ))}
        </svg>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Points are close together within clusters</li>
          <li>• Clusters are far apart from each other</li>
          <li>• Clear boundaries between groups</li>
        </ul>
      </div>

      <div className="bg-red-50 rounded-xl p-4 border-2 border-red-400">
        <h3 className="font-bold text-red-800 mb-3 flex items-center gap-2">
          ❌ Bad Clustering
        </h3>
        <svg viewBox="0 0 200 150" className="w-full h-40 mb-3">
          {/* Overlapping clusters */}
          <circle
            cx="80"
            cy="75"
            r="45"
            fill="#3B82F620"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <circle
            cx="120"
            cy="75"
            r="45"
            fill="#EF444420"
            stroke="#EF4444"
            strokeWidth="2"
          />
          {[
            [60, 70],
            [75, 90],
            [90, 65],
            [100, 80],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#3B82F6" />
          ))}
          {[
            [110, 70],
            [130, 85],
            [140, 70],
            [105, 90],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#EF4444" />
          ))}
        </svg>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Points are spread out within clusters</li>
          <li>• Clusters overlap significantly</li>
          <li>• Unclear which group points belong to</li>
        </ul>
      </div>
    </div>
  </Section>
);

const SummarySection = () => (
  <Section title="🎓 Key Takeaways" color="#1e293b">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
        <h3 className="font-bold text-blue-800 mb-2">
          🔍 Unsupervised Learning
        </h3>
        <p className="text-sm text-blue-700">
          No labels needed! The algorithm discovers natural groupings in your
          data based on similarity.
        </p>
      </div>
      <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
        <h3 className="font-bold text-purple-800 mb-2">⚙️ K-Means Process</h3>
        <p className="text-sm text-purple-700">
          1. Pick k centroids randomly → 2. Assign points to nearest → 3. Move
          centroids to center → 4. Repeat until stable
        </p>
      </div>
      <div className="bg-linear-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
        <h3 className="font-bold text-green-800 mb-2">📊 Evaluation</h3>
        <p className="text-sm text-green-700">
          Good clusters are <strong>tight</strong> (points close to their
          centroid) and <strong>separated</strong> (far from other centroids).
        </p>
      </div>
      <div className="bg-linear-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-800 mb-2">📈 Silhouette Score</h3>
        <p className="text-sm text-amber-700">
          The go-to metric! Ranges from -1 (bad) to +1 (perfect). Balances
          tightness and separation in one number.
        </p>
      </div>
    </div>

    <div className="mt-6 bg-gray-100 rounded-xl p-4">
      <h3 className="font-bold text-gray-800 mb-2">💡 The Big Picture</h3>
      <p className="text-gray-700">
        Think of K-Means like organizing a messy room: you don't have
        pre-defined boxes, but you group similar items together. Books go with
        books, clothes with clothes. The algorithm figures out where the natural
        "piles" should be!
      </p>
    </div>
  </Section>
);

export default function ClusteringGuide() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🌸 Clustering & K-Means
          </h1>
          <p className="text-gray-600">
            A Visual Guide to Unsupervised Learning
          </p>
        </div>

        <ConceptIntro />
        <FlowerDataSection />
        <KMeansAnimation />
        <EvaluationSection />
        <ComparisonSection />
        <SummarySection />
      </div>
    </div>
  );
}
