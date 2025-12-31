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
import CnnVisualGuide from "./cnn-visual-guide.jsx";
import VisionTransformerVisualGuide from "./vision-transformer-visual-guide.jsx";
import OcrVisualGuide from "./ocr-visual-guide.jsx";
import FieldExtractionAndMappingVisualGuide from "./field-extraction-visual-guide.jsx";
import AzureContentUnderstandingVisualGuide from "./azure-content-understanding-visual-guide.jsx";
import MLGettingStartedVisualGuide from "./ml-getting-started-visual-guide.jsx";
import DataPreparationVisualGuide from "./data-preparation-visual-guide.jsx";
import TrainModelVisualGuide from "./train-model-visual-guide.jsx";
import IntegrateModelVisualGuide from "./integrate-model-visual-guide.jsx";
import DataIngestionDesignVisualGuide from "./data-ingestion-design-visual-guide.jsx";
import RealTimeVsBatchVisualGuide from "./realtime-vs-batch-visual-guide.jsx";
import GenAIApplicationsVisualGuide from "./genai-applications-visual-guide.jsx";
import AzureLanguageTextAnalysisVisualGuide from "./azure-language-text-analysis-visual-guide.jsx";

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
  { name: "CNN", component: <CnnVisualGuide /> },
  { name: "Vision Transformer", component: <VisionTransformerVisualGuide /> },
  { name: "OCR", component: <OcrVisualGuide /> },
  {
    name: "Field extraction and mapping",
    component: <FieldExtractionAndMappingVisualGuide />,
  },
  {
    name: "Azure Content Understanding",
    component: <AzureContentUnderstandingVisualGuide />,
  },
  { name: "ML Getting Started", component: <MLGettingStartedVisualGuide /> },
  { name: "Data Preparation", component: <DataPreparationVisualGuide /> },
  { name: "Train Model", component: <TrainModelVisualGuide /> },
  { name: "Integrate Model", component: <IntegrateModelVisualGuide /> },
  {
    name: "Data Ingestion Design",
    component: <DataIngestionDesignVisualGuide />,
  },
  { name: "Real-time vs Batch", component: <RealTimeVsBatchVisualGuide /> },
  { name: "GenAI Applications", component: <GenAIApplicationsVisualGuide /> },
  {
    name: "Azure Language Text Analysis",
    component: <AzureLanguageTextAnalysisVisualGuide />,
  },
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
