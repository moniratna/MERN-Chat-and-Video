import React, { useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './mp/MediaPlayer';
import {appId, token, channelName, useClient} from './settings';
import './Call.css';
import { Button, Grid } from '@mui/material';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Call() {
  const client = useClient();

  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, joinasaudience
  } = useAgora(client);

  return (
    <div className='call'>
      <form className='call-form'>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
          <Button id='join' variant='contained' type='button' color='primary' disabled={joinState} onClick={() => {join(appId, channelName, token)}}>Share Your screen</Button>
          </Grid>
          <Grid item>
          <Button id='join' variant='contained' color='primary' type='button' disabled={joinState} onClick={() => {joinasaudience(appId, channelName, token)}}>Join as audience</Button>
          </Grid>
          <Grid item>
          <Button id='leave' variant='contained' color='primary' type='button' disabled={!joinState} onClick={() => {leave()}}>Leave</Button>
          </Grid>
        </Grid>
      </form>
      {/* {joinStatus && <MediaPlayer id='local-player' track={localVideoTrack} />}
      {audienceStatus && <MediaPlayer id='remote-player' track={remoteUsers[0].videoTrack} />} */}
      <div className='player-container'>
        <div className='local-player-wrapper'>
        <p style={{display:'flex', justifyContent:'center', fontWeight:'bold', fontSize:'24px'}}>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `Your Screen is Sharing` : ''} </p>
        {/* <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer> */}
      </div>
      
        
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            {/* <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p> */}
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
    </div>
  );
}

export default Call;
