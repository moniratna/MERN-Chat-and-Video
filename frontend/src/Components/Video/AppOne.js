import { useState } from "react";
import { Button } from "@mui/material";
import VideoCall from "./VideoCall";
import Call from "./Call";
import {useNavigate} from 'react-router-dom';

function AppOne() {
  const navigate = useNavigate();
  const [inCall, setInCall] = useState(false);

  return (
    <div className="App" style={{ height: "100%" }}>
      {inCall ? (
        <VideoCall setInCall={setInCall} />
        // <Call />
      ) : (
        <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
          style={{display:'flex', justifyContent:'center', marginTop:'20px'}}
        >
          Make Video Call
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/home')}
          style={{display:'flex', justifyContent:'center', marginTop:'20px'}}
        >
          Go To Home
        </Button>
        </>
      )}
    </div>
  );
}

export default AppOne;
