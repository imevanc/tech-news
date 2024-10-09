# Gemini Chatbot

## Table of Contents
1. [Do it yourself](#do-it-yourself)
3. [Installation](#installation)

## Do it yourself
In this quick start tutorial, you'll build a simple AI-chatbot with a streaming user interface. Along the way, you'll learn key concepts and techniques that are fundamental to using the SDK in your own projects.

## Demo
https://github.com/user-attachments/assets/9290d5a6-7516-46b7-8300-81b452a62ee2


## Installation
Follow these steps to run the project locally:

- Clone the repository:

```
git clone https://github.com/imevanc/tech-news.git
cd tech-news/gemini-chatbot
```

- Install dependencies:

```
npm install
```

- Set up environment variables:

Create a .env.local file in the root directory, get your api key from <a href="https://aistudio.google.com/app/prompts/new_chat">google-ai-studio</a> and add your GOOGLE_GENERATIVE_AI_API_KEY:

```
GOOGLE_GENERATIVE_AI_API_KEY=***********
```

Start the development server:

```
npm run dev
```

The chatbot should now be running on http://localhost:3000.

Usage
1) Open your browser and navigate to http://localhost:3000.
2) Enter a question in the chat interface.
3) The chatbot will respond using the gemini model.
