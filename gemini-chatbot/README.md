# Gemini Chatbot

## Table of Contents
1. [Do it yourself](#do-it-yourself)
2. [Demo](#demo)
3. [Installation](#installation)

## Do it yourself
In this quick start tutorial, you'll build a simple AI-chatbot with a streaming user interface. Along the way, you'll learn key concepts and techniques that are fundamental to using the SDK in your own projects.

Prerequisites

To get started with this quickstart, ensure you have the following:

- Node.js version 18 or higher, along with pnpm installed on your local machine.
- An ai-google-studio api key
If you don't have a google ai api key yet, you can get one by signing up on the google-ai-studio website.

Create Your Application

Start by setting up a new Next.js application. The command below will create a directory called my-ai-app and initialise a basic Next.js app inside it:

```
npm create next-app@latest my-ai-app
```
When prompted, make sure to select "yes" for using the App Router, TS and tailwind.

Navigate to the newly created application folder:

```
cd my-ai-app
```

Install the required AI package and the AI SDK provider:

```
npm install ai @ai-sdk/google
```

Configure Google AI API Key

Create a .env.local file in the root of your project to store your Google AI API key. This key will be used to authenticate your application with the Google Generative AI service.

```
touch .env.local
```

Open the .env.local file and add your Google AI API key:

```
GOOGLE_GENERATIVE_AI_API_KEY=xxxxxxxxx
```
Replace xxxxxxxxx with your actual Google AI API key.

Create a Route Handler

In your Next.js project, create a new file at app/api/chat/route.ts.

Add the following code to define your route handler:

```js
import { CoreMessage, streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = await streamText({
        model: google('gemini-1.5-pro-latest'),
        system: 'You are a helpful assistant.',
        messages,
    });

    return result.toDataStreamResponse();
}
```


Let's break down what's happening in the route handler step by step:

1) Async POST Request: Parses the request body to extract messages (conversation history).

2) AI Response: Calls streamText with Google AI model and messages for response generation.

3) Streamed Response: Converts the result to a streamed format for partial, real-time replies.

4) Client Response: Sends the streamed response to the client.

Wire up the UI
Now that your Route Handler can query an LLM, set up the frontend. The AI SDK's useChat hook simplifies creating a chat interface.

Update app/page.tsx to display chat messages and a user input field:

```js
'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    const messageEndRef = useRef(null);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col w-full max-w-md mx-auto h-screen bg-[#f5f5dc]">
            <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[#f5f5dc] rounded-t-lg">
                {messages.map(m => (
                    <div
                        key={m.id}
                        className={`whitespace-pre-wrap p-3 rounded-lg max-w-sm ${
                            m.role === 'user' ? 'bg-green-900 text-white self-end' : 'bg-green-600 text-black self-start'
                        }`}
                    >
                        {m.content}
                    </div>
                ))}
                <div ref={messageEndRef}></div>
            </div>

            <form onSubmit={handleSubmit} className="flex border-t border-gray-300">
                <input
                    className="w-full p-3 text-black placeholder-gray-600 rounded-bl-lg focus:outline-none h-12"
                    value={input}
                    placeholder="Type your message..."
                    onChange={handleInputChange}
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 rounded-br-lg h-12 hover:bg-green-700 transition duration-300"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
```

Run the app and enjoy!


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
