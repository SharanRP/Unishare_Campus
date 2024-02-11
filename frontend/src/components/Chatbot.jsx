import React, { useState, useEffect } from "react";
import { ChatIcon } from '@heroicons/react/solid';
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

const Chatbot = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [flaskResponse, setFlaskResponse] = useState(null);
  const API_KEY = "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";

  const handleSendMessage = async (messageContent) => {
    setChatHistory(prevChatHistory => [...prevChatHistory, { role: "user", content: messageContent }]);
    setIsTyping(true);

    try {
      const flaskResponse = await axios.post("http://localhost:8080/answer_question", { question: messageContent });
      setIsTyping(false);
      setChatHistory(prevChatHistory => [...prevChatHistory, { role: "assistant", content: flaskResponse.data.answer }]);
      console.log(flaskResponse.data.answer)
      return;
    } catch (error) {
      console.error("Error while fetching response from Flask server:", error);
      setChatHistory(prevChatHistory => [...prevChatHistory, { role: "assistant", content: "Oops! Something went wrong while processing your request." }]);
    }

    chatData(messageContent);
  };

  const chatData = async (userMessage) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [...chatHistory, { role: "user", content: userMessage }],
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Oops! Something went wrong while processing your request.");
      }

      const responseData = await response.json();
      setChatHistory(prevChatHistory => [...prevChatHistory, { role: "assistant", content: responseData.choices[0].message.content }]);
      setIsTyping(false);
    } catch (error) {
      console.error("Error while fetching chat data:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg w-5/6 text-white">
        <div className="flex items-center justify-between bg-gray-700 p-4 rounded-t-lg">
          <h1 className="text-lg flex justify-center text-center mx-auto font-semibold">VivaBot</h1>
          <ChatIcon className="h-6 w-6 text-gray-300" />
        </div>
        <div className="p-4 h-96 overflow-auto">
          {chatHistory.map((message, index) => (
            <div key={index} className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}>
              <span className={`inline-block px-3 py-2 rounded-lg ${message.role === "user" ? "bg-gradient-to-br from-purple-600 to-purple-900 text-white" : "bg-gradient-to-br from-gray-700 to-gray-900 text-gray-300"}`}>
                {message.content}
              </span>
            </div>
          ))}
          {isTyping && (
            <div className="text-left mb-2">
              <span className="inline-block bg-gray-600 px-3 py-1 rounded-lg text-gray-900"><Spinner /></span>
            </div>
          )}
          {flaskResponse && (
            <div className="mb-2 text-left">
              <span className="inline-block bg-gradient-to-br from-cyan-500 to-cyan-900 text-white px-3 py-2 rounded-lg">
                {flaskResponse}
              </span>
            </div>
          )}
        </div>
        <form
          className="p-4"
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.target.input.value;
            if (input.trim() !== "") {
              handleSendMessage(input);
              setInputText("");
            }
          }}
        >
          <div className="relative w-full">
            <input
              type="text"
              name="input"
              placeholder="Type your message..."
              className="w-full border border-gray-600 rounded-lg px-3 py-2 outline-none bg-gray-700 text-white"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-0 bg-gradient-to-br from-cyan-500 to-cyan-900 text-white px-4 py-2 rounded-lg mt-1 mr-1 transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => {
                console.log("Button clicked!");
              }}
            >
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
