import React from "react";
import { useNavigate } from "react-router-dom";
import chatbotIcon from "../assets/chatbot.png";
import "./FloatingChatbot.css";

export default function FloatingChatbot() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/chatbot")}
      className="chatbot-btn"
      title="AI Assistant"
    >
      <img
        src={chatbotIcon}
        alt="AI Assistant"
        className="chatbot-img"
      />
    </button>
  );
}