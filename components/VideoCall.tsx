import React, { useEffect, useRef, useState } from 'react';
import {motion} from 'framer-motion'
import { pusherClient } from '@/lib/pusher';
import { FaVideo } from 'react-icons/fa';

interface VideoCallProps {
  currentUserId: string;
  recipientId: string | null;
}

const VideoCall: React.FC<VideoCallProps> = ({ currentUserId, recipientId }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const localStreamRef = useRef<HTMLVideoElement>(null);
  const remoteStreamRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const channel = pusherClient.subscribe(`user-${currentUserId}`);

    channel.bind('video-offer', async (offer: RTCSessionDescriptionInit) => {
      setIncomingCall(true);
      peerConnectionRef.current = createPeerConnection();
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnectionRef.current.createAnswer();
        await peerConnectionRef.current.setLocalDescription(answer);
        await fetch('/api/video-call/answer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answer, recipientId }),
        });
      }
    });

    channel.bind('video-answer', async (answer: RTCSessionDescriptionInit) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
      }
    });

    channel.bind('new-ice-candidate', async (candidate: RTCIceCandidateInit) => {
      if (peerConnectionRef.current) {
        await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  });

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });

    peerConnection.onicecandidate = async (event) => {
      if (event.candidate) {
        await fetch('/api/video-call/ice-candidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ candidate: event.candidate, recipientId }),
        });
      }
    };

    peerConnection.ontrack = (event) => {
      if (remoteStreamRef.current) remoteStreamRef.current.srcObject = event.streams[0];
    };

    return peerConnection;
  };

  const startVideoCall = async () => {
    peerConnectionRef.current = createPeerConnection();
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localStreamRef.current) localStreamRef.current.srcObject = localStream;

    localStream.getTracks().forEach((track) => peerConnectionRef.current?.addTrack(track, localStream));

    const offer = await peerConnectionRef.current.createOffer();
    await peerConnectionRef.current.setLocalDescription(offer);

    await fetch('/api/video-call/offer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ offer, recipientId }),
    });

    setIsCalling(true);
  };

  const acceptCall = async () => {
    setIncomingCall(false);
    setCallAccepted(true);
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localStreamRef.current) localStreamRef.current.srcObject = localStream;
    localStream.getTracks().forEach((track) => peerConnectionRef.current?.addTrack(track, localStream));
  };

  const declineCall = () => setIncomingCall(false);
  const endCall = () => {
    peerConnectionRef.current?.close();
    setIsCalling(false);
    setCallAccepted(false);
  };

  return (
    <div className="">
       {(isCalling || callAccepted) && 

    ( 
      <div className="video-call-container fixed inset-0 bg-black flex items-center justify-center">
      <video ref={localStreamRef} autoPlay muted className="local-video absolute top-0 left-0 w-full h-full object-cover" />
      <video ref={remoteStreamRef} autoPlay className="remote-video absolute top-0 left-0 w-full h-full object-cover" />
      </div>) }
      {incomingCall && !callAccepted && (
      <div className="incoming-call-overlay fixed inset-0 bg-black flex items-center justify-center">
          <h3 className="text-white mb-4">Incoming Call</h3>
          <button onClick={acceptCall} className="bg-green-500 text-white p-2 rounded mr-2">
            Accept
          </button>
          <button onClick={declineCall} className="bg-red-500 text-white p-2 rounded">
            Decline
          </button>
        </div>
      )}
      {!isCalling && !incomingCall && !callAccepted && (
       <motion.button
       whileHover={{ scale: 1.1 }}
       whileTap={{ scale: 0.9 }}
       className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-all"
       onClick={startVideoCall}
     >
       <FaVideo size={24} />
     </motion.button>
      )}
      {(isCalling || callAccepted) && (
        <button onClick={endCall} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded">
          End Call
        </button>
      )}
    </div>
  );
};

export default VideoCall;
