# ResoluteAI

> An autonomous deep research agent — **Plans → Researches → Analyzes → Reports**.  
> Powered by Gemini 2.5 Flash + OpenAI Agents SDK + Tavily.

<p align="center">
  <br>
  <img src="https://img.shields.io/badge/Python-3.13-3776AB?logo=python" alt="Python 3.13">
  <img src="https://img.shields.io/badge/Next.js-15-000000?logo=next.js" alt="Next.js 15">
  <img src="https://img.shields.io/badge/Gemini-2.5_Flash-8E75B2?logo=google" alt="Gemini 2.5 Flash">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License">
</p>

---

## ✨ Features

- **Real-time research streaming** — Watch the agent think through each stage live
- **Three-panel layout** — History (left), Chat (center), Progress (right)
- **Multi-agent pipeline** — Planner → Researcher (Tavily web search) → Analyzer → Reporter
- **Source tracking** — Every source is captured and cited
- **Beautiful reports** — Interactive markdown with syntax highlighting
- **Dark/light theme** — Eye-friendly design
- **Fully responsive** — Works on desktop and mobile

---

## 🏗️ Architecture

```
User Query
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  FastAPI Backend (SSE stream)                       │
│                                                     │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌────────┐ │
│  │ Planner │─▶│Researcher│─▶│Analyzer│─▶│Reporter│ │
│  │ Agent   │  │ Agent    │  │ Agent  │  │ Agent  │ │
│  └─────────┘  └──────────┘  └────────┘  └────────┘ │
│       │            │            │            │      │
│       ▼            ▼            ▼            ▼      │
│  ┌─────────┐  ┌──────────┐  ┌────────┐  ┌────────┐ │
│  │  Plan   │  │ Sources  │  │Insights│  │ Report │ │
│  └─────────┘  └──────────┘  └────────┘  └────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────────────┐
│  Next.js Frontend                                    │
│  ┌──────────┬──────────────────┬──────────────────┐ │
│  │  Left    │     Center       │     Right        │ │
│  │ History  │  Chat Messages   │  Progress        │ │
│  │ Reports  │  + Report Viewer │  Stages          │ │
│  │ Settings │                  │                  │ │
│  └──────────┴──────────────────┴──────────────────┘ │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Python 3.13+** and **UV** (package manager)
- **Node.js 18+** and **npm**
- **Google AI Studio API key** (for Gemini 2.5 Flash)
- **Tavily API key** (for web search)

### 1. Clone the repo

```bash
git clone https://github.com/hammadreal02/Deep-Researcher-Agent.git
cd Deep-Researcher-Agent
```

### 2. Backend Setup

```bash
cd ResoluteAI-backend
uv sync
cp .env.example .env
```

Edit `.env` with your API keys:

```env
API_KEY="your-google-ai-api-key"
URL="https://generativelanguage.googleapis.com/v1beta/openai/"
model="gemini-2.5-flash"
TAVILY_API_KEY="your-tavily-api-key"
```

Start the backend:

```bash
uv run uvicorn api.main:app --reload
```

The API runs at **http://localhost:8000**.

### 3. Frontend Setup

```bash
cd ResoluteAI-frontend
npm install
npm run dev
```

The app runs at **http://localhost:3000**.

---

## 🔧 Configuration

| Variable | Description |
|----------|-------------|
| `API_KEY` | Google AI Studio API key |
| `URL` | Gemini OpenAI-compatible endpoint |
| `model` | LLM model name (`gemini-2.5-flash`) |
| `TAVILY_API_KEY` | Tavily search API key |

---

## 📁 Project Structure

```
Deep-Researcher-Agent/
│
├── ResoluteAI-backend/              # Python FastAPI backend
│   ├── Configration/
│   │   └── config.py               # Gemini + OpenAI Agents SDK setup
│   ├── Agents/
│   │   ├── orchestrator.py         # Main coordinator agent
│   │   ├── planner.py              # Research plan sub-agent
│   │   ├── researcher.py           # Tavily search sub-agent
│   │   ├── analyzer.py             # Synthesis sub-agent
│   │   └── reporter.py             # Report generation sub-agent
│   ├── api/
│   │   ├── main.py                 # FastAPI entry point
│   │   └── routes.py               # SSE streaming endpoint
│   ├── .env                        # API keys (gitignored)
│   └── pyproject.toml              # UV dependencies
│
├── ResoluteAI-frontend/             # Next.js TypeScript frontend
│   ├── app/
│   │   ├── page.tsx                # Three-column layout
│   │   ├── layout.tsx              # Root layout + SEO meta
│   │   ├── globals.css             # Tailwind + theme
│   │   └── components/
│   │       ├── LeftSidebar.tsx      # History, Reports, Settings
│   │       ├── CenterChat.tsx       # Chat messages + report viewer
│   │       ├── RightSidebar.tsx     # Progress tracking
│   │       ├── ChatInput.tsx        # Query input
│   │       └── ReportViewer.tsx     # Interactive report display
│   ├── lib/
│   │   └── storage.ts              # localStorage for conversations
│   └── package.json
│
├── README.md
└── LICENSE
```

---

## 🧠 How It Works

### Agent Pipeline

1. **Plan** — The Planner agent decomposes your query into 3-5 research sub-topics
2. **Research** — The Researcher agent searches Tavily for each sub-topic, gathers content and source URLs
3. **Analyze** — The Analyzer agent synthesizes all findings into coherent insights
4. **Report** — The Reporter agent generates a structured markdown report with citations

### Real-time Streaming

The backend uses **Server-Sent Events (SSE)** to push each stage update to the frontend as it happens. The right sidebar updates live, showing plan items, sources being searched, and analysis as it's generated.

### UI Layout

| Panel | Content |
|-------|---------|
| **Left sidebar** (toggle) | New Chat, Conversation History, Saved Reports, Settings |
| **Center** | Chat messages with streaming, report viewer |
| **Right sidebar** (toggle) | Live progress: Plan → Research → Analysis → Report |

---

## 🧪 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Agent Framework** | OpenAI Agents SDK |
| **LLM** | Gemini 2.5 Flash (via OpenAI-compatible endpoint) |
| **Search** | Tavily API |
| **Backend** | Python 3.13, FastAPI, SSE |
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **UI Components** | shadcn/ui, Framer Motion |
| **Markdown** | react-markdown, rehype-highlight, remark-gfm |
| **Package Manager** | UV (Python), npm (Frontend) |

---

## 📄 License

MIT © 2026 Hammad Iqbal

---

<p align="center">Built with ❤️ by Hammad Iqbal</p>
