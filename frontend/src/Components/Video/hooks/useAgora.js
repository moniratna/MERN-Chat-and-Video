import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

export default function useAgora(client)
    {
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);

  const [joinState, setJoinState] = useState(false);

  const [remoteUsers, setRemoteUsers] = useState([]);

  async function createLocalTracks(audioConfig, videoConfig)
  {
    const cameraTrack = await AgoraRTC.createScreenVideoTrack(videoConfig);
    // setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return cameraTrack;
  }

  async function join(appId, channelName, token, uid) {
    if (!client) return;
    const cameraTrack = await createLocalTracks();
    
    await client.join(appId, channelName, token || null);
    await client.publish(cameraTrack);

    (window).client = client;
    (window).videoTrack = cameraTrack;

    setJoinState(true);
  }
  async function joinasaudience(appId, channelName, token, uid) {
    if (!client) return;
    // const cameraTrack = await createLocalTracks();
    // await client.setClientRole(options, clientRoleOptions);
    await client.join(appId, channelName, token);
    // await client.publish(localVideoTrack);

    (window).client = client;
    // (window as any).videoTrack = localVideoTrack;

    setJoinState(true);
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    setRemoteUsers([]);
    setJoinState(false);
    await client?.leave();
  }

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserUnpublished = (user) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserJoined = (user) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    const handleUserLeft = (user) => {
      setRemoteUsers(remoteUsers => Array.from(client.remoteUsers));
    }
    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    joinasaudience,
    remoteUsers,
  };
}