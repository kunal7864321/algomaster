# AlgoMaster

A premium, browser-based Data Structures and Algorithms (DSA) learning environment and visualization platform. 

![AlgoMaster UI](https://img.shields.io/badge/UI-Cyberpunk_Dark_Mode-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

AlgoMaster provides a deeply interactive, step-by-step visual representation of core algorithms alongside an integrated Monaco Code Editor, allowing you to seamlessly transition between understanding concepts visually and implementing them in code.

## 🚀 Features

- **Interactive Visualizers**: Step-by-step manual controls for deep comprehension.
  - **Arrays**: Two Pointers (Reverse), Sliding Window (Sum).
  - **Sorting**: Bubble Sort, Merge Sort, Quick Sort.
  - **Searching**: Linear Search, Binary Search.
  - **Trees**: Preorder, Inorder, Postorder Traversals.
  - **Graphs**: Breadth-First Search (BFS), Depth-First Search (DFS).
- **Integrated Practice Environment**: Built-in VS Code-style Monaco Editor with a secure JavaScript execution sandbox and live STDOUT terminal.
- **Premium "Techy" UI/UX**: Designed to mimic a professional developer workspace with dark mode defaults, glassmorphism panels, and monospace typography.
- **Progressive Curriculum**: 11 major DSA topics included with curated theory documentation and Big-O complexity analysis.

## 🛠️ Technology Stack

- **Core**: React.js 18, Vite
- **Styling**: Tailwind CSS v4
- **Editor Integration**: `@monaco-editor/react`
- **Icons**: `lucide-react`
- **Animations**: `framer-motion`

## 📦 Installation & Setup

Because this project uses browser-native execution environments, no backend is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/kunal7864321/algomaster.git
   ```
2. Navigate to the project directory:
   ```bash
   cd algomaster
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 Educational Approach

AlgoMaster abandons the "auto-play" mentality of standard visualizers. By forcing the user to manually click "Next Step" or "Previous Step", the platform ensures you are actively tracing the algorithm's state machine, tracking pointers, and watching swaps in real time without getting lost.
