import { MessageCircleQuestion } from 'lucide-react';
import React from 'react'

const Prompts = ({ onPromptClick }) => {
  const prompts = [
    "What features can you offer me?",
    "Show me the post with the highest engagement.",
    "What is the best type of post for my audience?",
    "Suggest strategies to increase engagement on my posts.",
    "Analyze my top-performing content.",
    "Provide tips to grow my social media presence.",
    "How can I optimize my posting schedule?",
    "What are the latest trends in my niche?",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onPromptClick(prompt)}
          className="text-sm text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 flex items-center gap-2"
        >
          <MessageCircleQuestion className="h-4 w-4" />
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default Prompts