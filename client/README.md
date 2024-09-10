# Spindoctor

Spindoctor is a Next.js application that provides real-time sentiment analysis of short-form text using AI. It's designed to help users gauge how their news article headlines or blog post titles might resonate with readers.

## Features

- Sentiment analysis API powered by OpenAI
- Responsive design for both desktop and mobile interfaces
- Real-time color-coded sentiment feedback (Yeah!, Mhm., Booo!)
- Animated logo component
- About overlay with project information
- Loading animation during analysis

## Technologies Used

- [Next.js](https://nextjs.org/) with App Router
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [OpenAI API](https://openai.com/api/)

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/spindoctor.git
   cd spindoctor
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Copy the `.env.local.example` file to `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
