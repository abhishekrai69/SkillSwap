import React, { useState } from 'react';
import { Session } from '../types';
import { X, Send, User, Coins, Clock } from 'lucide-react';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  session: Session;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, onConfirm, session }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: session.tutorName,
      message: `Hi! Thanks for your interest in my "${session.skillTitle}" session. I'm excited to help you learn!`,
      timestamp: new Date(),
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      message: 'Hello! I\'m really interested in this session. What should I prepare beforehand?',
      timestamp: new Date(),
      isOwn: true,
    },
    {
      id: '3',
      sender: session.tutorName,
      message: 'Great question! Just bring your enthusiasm to learn. I\'ll provide all the materials we need.',
      timestamp: new Date(),
      isOwn: false,
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: 'You',
        message: message.trim(),
        timestamp: new Date(),
        isOwn: true,
      }]);
      setMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{session.tutorName}</h3>
              <p className="text-sm text-gray-600">{session.skillTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Session Details */}
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-1 text-gray-600">
                <Clock className="h-4 w-4" />
                <span>{session.duration} min</span>
              </div>
              <div className="flex items-center gap-1 text-purple-600">
                <Coins className="h-4 w-4" />
                <span>{session.creditCost} credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  msg.isOwn
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={onConfirm}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;