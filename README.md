# Microsoft AI Course - Interactive Visual Guides

A collection of interactive, visual learning guides for understanding AI, NLP, and machine learning concepts. Built with React and Tailwind CSS for an engaging educational experience.

## 📚 What's Inside

This project contains interactive visual guides covering:

### 🤖 AI Agents
- Understanding AI agents vs chatbots
- Components of an AI agent (LLM, Instructions, Tools)
- Types of tools (Knowledge & Action)
- Multi-agent systems and collaboration
- Real-world applications

### 🔤 Tokenization & Text Preprocessing
- What is tokenization and why it matters
- Token frequency analysis
- Text normalization techniques
- Stop word removal
- N-grams (unigrams, bigrams, trigrams)
- Stemming vs lemmatization
- Parts of speech (POS) tagging
- Complete NLP pipeline visualization

### 📊 Statistical Text Analysis
- Frequency analysis with stemming
- TF-IDF (Term Frequency-Inverse Document Frequency)
- Bag-of-Words model
- Naive Bayes for spam detection
- TextRank for text summarization
- When to use each technique

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Microsoft_AI_Course
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173` (or the URL shown in terminal)

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## 🏗️ Built With

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting and quality

## 📁 Project Structure

```
Microsoft_AI_Course/
├── src/
│   ├── ai-agents-visual-guide.jsx       # AI Agents interactive guide
│   ├── tokenization-visual-guide.jsx    # Tokenization & preprocessing guide
│   ├── statistical-text-analysis-guide.jsx  # Statistical analysis guide
│   ├── App.jsx                          # Main app component
│   ├── main.jsx                         # Entry point
│   └── index.css                        # Global styles
├── public/                              # Static assets
├── index.html                           # HTML template
├── package.json                         # Dependencies and scripts
├── vite.config.js                       # Vite configuration
├── tailwind.config.js                   # Tailwind CSS configuration
└── eslint.config.js                     # ESLint configuration
```

## 🌐 Deployment to Azure Static Web Apps

This project is configured for deployment to Azure Static Web Apps:

1. Build settings:
   - **Build command**: `npm run build`
   - **Output directory**: `dist`
   - **App location**: `/`

2. The app uses client-side routing, so ensure your Static Web App is configured accordingly.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Add new visual guides
- Improve existing visualizations
- Fix bugs or typos
- Enhance interactivity

## 📝 License

This project is for educational purposes.

## 🎓 Learning Objectives

By exploring these interactive guides, you will:
- Understand fundamental NLP concepts through hands-on visualization
- Learn how AI agents work and their components
- Master text preprocessing techniques essential for NLP
- Grasp statistical methods for text analysis
- See real-world applications of these concepts

## 🔧 Troubleshooting

### Build issues
If you encounter build errors, try:
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Port already in use
If port 5173 is already in use, Vite will automatically use the next available port.

---

Made with ❤️ for learning AI and NLP concepts
