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
import SemanticSearchVisualGuide from "./semantic-models-visual-guide.jsx";
import SpeechSolutionsVisualGuide from "./speech-solutions-visual-guide.jsx";
import SpeechRecognitionPipelineVisualGuide from "./speech-recognition-pipeline-visual-guide.jsx";
import SpeechSynthesisVisualGuide from "./speech-synthesis-pipeline-guide.jsx";
import ImageProcessingVisualGuide from "./image-processing-visual-guide.jsx";

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
  { name: "Semantic Search", component: <SemanticSearchVisualGuide /> },
  { name: "Speech Solutions", component: <SpeechSolutionsVisualGuide /> },
  {
    name: "Speech Recognition Pipeline",
    component: <SpeechRecognitionPipelineVisualGuide />,
  },
  {
    name: "Speech Synthesis Pipeline",
    component: <SpeechSynthesisVisualGuide />,
  },
  { name: "Image Processing", component: <ImageProcessingVisualGuide /> },
];

function App() {
  const [selected, setSelected] = useState(0);

  return (
    <div
      className="App"
      style={{
        padding: "4px 8px",
        fontFamily: "sans-serif",
        background: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "1880px", margin: "0 auto" }}>
        <h1
          style={{
            marginBottom: 16,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
          }}
        >
          AI Visual Guides
        </h1>
        <div
          style={{
            marginBottom: 20,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          {guides.map((g, i) => (
            <button
              key={g.name}
              onClick={() => setSelected(i)}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                border: "none",
                background: selected === i ? "#6366f1" : "#e0e7ff",
                color: selected === i ? "white" : "#3730a3",
                fontWeight: "bold",
                cursor: "pointer",
                boxShadow: selected === i ? "0 2px 8px #6366f155" : "none",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
              }}
            >
              {g.name}
            </button>
          ))}
        </div>
        <div>{guides[selected].component}</div>
      </div>
    </div>
  );
}

export default App;
