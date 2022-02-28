import { useEffect, useState } from "react";
import { useClient, useScreenVideoTrack,appId, token, channelName } from "./settings";
import { Grid, Button, Link } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import useAgora from "./hooks/useAgora";


export default function Controls(props) {
  const client = useClient();
  const { tracks, setStart, setInCall, setScreenShare } = props;
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const [status, setStatus] = useState(false);
  // const video = useScreenVideoTrack();
  // console.log('checking videos',video)
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers, joinasaudience
  } = useAgora(client);

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          color={trackState.audio ? "primary" : "secondary"}
          onClick={() => mute("audio")}
        >
          {trackState.audio ? <MicIcon /> : <MicOffIcon />}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color={trackState.video ? "primary" : "secondary"}
          onClick={() => mute("video")}
        >
          {trackState.video ? <VideocamIcon /> : <VideocamOffIcon />}
        </Button>
      </Grid>
      <Grid item>
      <Link href="/screen"><Button variant="contained" color="primary">Share screen</Button></Link>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => leaveChannel()}
        >
          Leave
          <ExitToAppIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
