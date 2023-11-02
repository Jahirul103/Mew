import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import chatgpt from 'chatgpt-api-client';

const IndexPage = () => {
  const [prompt, setPrompt] = useState('');
  const [businessData, setBusinessData] = useState('');
  const router = useRouter();
  const [chatbotLink, setChatbotLink] = useState('');

  useEffect(() => {
    if (prompt && businessData) {
      const trainChatbot = async () => {
        const client = new chatgpt.Client(process.env.CHATGPT_API_KEY);
        const chatbot = await client.train(prompt, businessData);
        const chatbotLink = await client.generateLink(chatbot);
        setChatbotLink(chatbotLink);
      };

      trainChatbot();
    }
  }, [prompt, businessData]);

  const handleSubmit = async () => {
    router.push(chatbotLink);
  };

  return (
    <div>
      <h1>Prompt-based AI Chatbot Tool</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          name="prompt"
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <textarea
          name="businessData"
          placeholder="Enter your business data here..."
          value={businessData}
          onChange={(e) => setBusinessData(e.target.value)}
        />

        <input type="submit" value="Generate Chatbot" />
      </form>
    </div>
  );
};

export default IndexPage;
