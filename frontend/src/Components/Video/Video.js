import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import useAgora from "./hooks/useAgora";
import { useClient } from "./settings";
import './Call.css';
import MediaPlayer from "./mp/MediaPlayer";

export default function Video(props) {
  const client = useClient();
  const { users, tracks, screenDisplay, screenDisplayStatus } = props;
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, joinasaudience
  } = useAgora(client);
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <>
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={gridSpacing}>
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{ height: "100%", width: "100%" }}
        />
      </Grid>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
                <AgoraVideoPlayer
                  videoTrack={user.videoTrack}
                  key={user.uid}
                  style={{ height: "100%", width: "100%" }}
                />
              </Grid>
            );
          } else return null;
        })}
    </Grid>
    {/* <div className='player-container'>
      {localVideoTrack && <div className='local-player-wrapper'>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={undefined}></MediaPlayer>
        </div> }
        {remoteUsers && (
          <>
          {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
          <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
          <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
        </div>))}
          </>
        )}
        
      </div> */}
    </>
  );
}
