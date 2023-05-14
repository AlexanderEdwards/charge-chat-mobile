// src/services/chat.js
import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';

let socket;

export function useChat() {
  const { addMessage } = useContext(ChatContext);

  function joinChat(superchargerId) {
    // Open a WebSocket connection to the server
    socket = new WebSocket(`ws://your-server-url/api/chat/${superchargerId}`);

    // Listen for messages from the server
    socket.onmessage = (event) => {
      addMessage(event.data);
    };
  }

  function leaveChat() {
    if (socket) {
      // Close the WebSocket connection
      socket.close();
      socket = null;
    }
  }

  function sendChatMessage(message) {
    if (socket) {
      // Send a chat message to the server
      socket.send(message);
    } else {
      console.log('Cannot send message, not connected to a chat.');
    }
  }

  return { joinChat, leaveChat, sendChatMessage };
}
