import { useState } from "react";
import "./App.css";

import DeepLearningVisualGuide from "./deep-learning-visual-guide.jsx";
import ClusteringVisualGuide from "./clustering-visual-guide.jsx";
import MulticlassVisualGuide from "./multiclass-visual-guide.jsx";
import LLMVisualGuide from "./llm-visual-guide.jsx";
import PromptsVisualGuide from "./prompts-visual-guide.jsx";
import AirVisualGuide from "./ai-agents-visual-guide.jsx";
import TokenizationVisualGuide from "./tokenization-visual-guide.jsx";
import StatisticalVisualGuide from "./statistical-text-analysis-guide.jsx";

const guides = [
  {
    name: "Deep Learning",
    component: <DeepLearningVisualGuide />,
  },
  { name: "Clustering", component: <ClusteringVisualGuide /> },
  { name: "Multiclass", component: <MulticlassVisualGuide /> },
  { name: "LLM", component: <LLMVisualGuide /> },
  { name: "Prompts", component: <PromptsVisualGuide /> },
  { name: "AI Agents", component: <AirVisualGuide /> },
  { name: "Tokenization", component: <TokenizationVisualGuide /> },
  {
    name: "Statistical Text Analysis",
    component: <StatisticalVisualGuide />,
  },
];

function App() {
  const [selected, setSelected] = useState(0);

  return (
    <div
      className="App"
      style={{
        padding: 24,
        fontFamily: "sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: 24 }}>AI Visual Guides</h1>
      <div style={{ marginBottom: 24, display: "flex", gap: 12 }}>
        {guides.map((g, i) => (
          <button
            key={g.name}
            onClick={() => setSelected(i)}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "none",
              background: selected === i ? "#6366f1" : "#e0e7ff",
              color: selected === i ? "white" : "#3730a3",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: selected === i ? "0 2px 8px #6366f155" : "none",
              transition: "all 0.2s",
            }}
          >
            {g.name}
          </button>
        ))}
      </div>
      <div>{guides[selected].component}</div>
    </div>
  );
}

export default App;
