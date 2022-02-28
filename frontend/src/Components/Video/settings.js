import { createClient, createMicrophoneAndCameraTracks,createScreenVideoTrack } from "agora-rtc-react";

export const appId = "f3e0de7c0ead451bad594e0b983278d5";
export const token =
  "006f3e0de7c0ead451bad594e0b983278d5IAAdf3sO9SmJ9RH1Bue8vkLyS8RHlRTIeDXrCNBkSax9U2TNKL8AAAAAEAATtvR9PKQdYgEAAQA8pB1i";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const useScreenVideoTrack = createScreenVideoTrack();
export const channelName = "main";
