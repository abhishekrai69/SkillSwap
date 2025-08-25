import React, { useState } from 'react';
import { Session } from '../types';
import { Clock, Coins, User, Tag } from 'lucide-react';
import ChatModal from './ChatModal';

interface SessionCardProps {
  session: Session;
  onBook?: (sessionId: string) => void;
  canBook?: boolean;
}

const SessionCard: React.FC<SessionCardProps> = ({ session, onBook, canBook = true }) => {
  const [showChat, setShowChat] = useState(false);

  const handleBookClick = () => {
    if (canBook && onBook) {
      setShowChat(true);
    }
  };

  const handleConfirmBooking = () => {
    if (onBook) {
      onBook(session.id);
      setShowChat(false);
    }
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100/50 p-6 hover:shadow-lg hover:bg-white/90 transition-all duration-300 hover:-translate-y-1">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{session.skillTitle}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{session.description}</p>
          </div>
          {session.isBooked && (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              Booked
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {session.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{session.tutorName}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{session.duration} min</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-purple-600 font-medium">
            <Coins className="h-4 w-4" />
            <span>{session.creditCost}</span>
          </div>
        </div>

        {canBook && !session.isBooked && (
          <button
            onClick={handleBookClick}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
          >
            Book Session
          </button>
        )}

        {session.isBooked && (
          <div className="w-full bg-gray-100 text-gray-500 py-2 px-4 rounded-lg text-center font-medium">
            Already Booked
          </div>
        )}
      </div>

      <ChatModal
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        onConfirm={handleConfirmBooking}
        session={session}
      />
    </>
  );
};

export default SessionCard;