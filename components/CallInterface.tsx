// components/CallInterface.tsx
'use client';

import React from 'react';
import { Phone, Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from './Button';
import { Card } from './Card';

interface CallInterfaceProps {
  status: 'idle' | 'ringing' | 'connected' | 'ended';
  duration: number;
  recipientNumber: string;
  isMuted: boolean;
  onMuteToggle: (muted: boolean) => void;
  onEndCall: () => void;
  onSpeakerToggle: (enabled: boolean) => void;
}

export const CallInterface: React.FC<CallInterfaceProps> = ({
  status,
  duration,
  recipientNumber,
  isMuted,
  onMuteToggle,
  onEndCall,
  onSpeakerToggle,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-white">{recipientNumber}</h3>
        <p className="text-gray-400 capitalize">{status}</p>
        {status === 'connected' && (
          <p className="text-lg font-mono text-blue-400">{formatTime(duration)}</p>
        )}
      </div>

      {status === 'connected' && (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onMuteToggle(!isMuted)}
            className={`p-4 rounded-full transition-all ${
              isMuted
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-white" />
            )}
          </button>

          <button
            onClick={() => onSpeakerToggle(true)}
            className="p-4 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
          >
            <Volume2 className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={onEndCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition-all"
          >
            <Phone className="w-6 h-6 text-white rotate-135" />
          </button>
        </div>
      )}

      {(status === 'ringing' || status === 'ended') && (
        <div className="flex gap-3">
          {status === 'ringing' && (
            <Button
              onClick={onEndCall}
              variant="danger"
              className="flex-1"
            >
              Decline
            </Button>
          )}
          <Button
            onClick={onEndCall}
            variant="secondary"
            className="flex-1"
          >
            Close
          </Button>
        </div>
      )}
    </Card>
  );
};
