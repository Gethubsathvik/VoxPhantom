// hooks/useCall.ts
'use client';

import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface CallState {
  status: 'idle' | 'ringing' | 'connected' | 'ended';
  duration: number;
  remoteSDP?: string;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
}

export function useCall() {
  const [callState, setCallState] = useState<CallState>({ status: 'idle', duration: 0 });
  const [error, setError] = useState<string | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const durationTimer = useRef<NodeJS.Timeout | null>(null);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const initiateCall = async (phoneNumber: string) => {
    try {
      setError(null);
      
      // Get local media
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      
      setCallState(prev => ({ ...prev, localStream, status: 'ringing' }));

      // Create peer connection
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: ['stun:stun.l.google.com:19302'] },
          { urls: ['stun:stun1.l.google.com:19302'] },
        ],
      });

      // Add local stream
      localStream.getTracks().forEach(track => pc.addTrack(track, localStream));

      // Handle remote stream
      pc.ontrack = (event) => {
        setCallState(prev => ({ ...prev, remoteStream: event.streams[0] }));
      };

      peerConnection.current = pc;

      // Initiate call via API
      const response = await axios.post(
        '/api/calls/initiate',
        { phoneNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { callId } = response.data.data;
      
      // Create offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to server
      await axios.post(
        `/api/calls/${callId}/offer`,
        { offer: { type: offer.type, sdp: offer.sdp } },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCallState(prev => ({ ...prev, status: 'connected' }));
      startDurationTimer();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to initiate call');
      endCall();
    }
  };

  const endCall = () => {
    if (durationTimer.current) clearInterval(durationTimer.current);
    
    callState.localStream?.getTracks().forEach(track => track.stop());
    peerConnection.current?.close();
    
    setCallState({ status: 'ended', duration: 0 });
  };

  const toggleMute = (muted: boolean) => {
    callState.localStream?.getAudioTracks().forEach(track => {
      track.enabled = !muted;
    });
  };

  const toggleSpeaker = (enabled: boolean) => {
    // Implementation depends on device capabilities
    console.log('Speaker toggled:', enabled);
  };

  const startDurationTimer = () => {
    durationTimer.current = setInterval(() => {
      setCallState(prev => ({ ...prev, duration: prev.duration + 1 }));
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (durationTimer.current) clearInterval(durationTimer.current);
    };
  }, []);

  return {
    callState,
    error,
    initiateCall,
    endCall,
    toggleMute,
    toggleSpeaker,
  };
}
