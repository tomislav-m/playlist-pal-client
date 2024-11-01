import { ReactNode, useState } from "react";
import { SpotifyContext, SpotifyDispatchContext } from "./SpotifyContext";

type Props = {
  children: ReactNode;
};

const SpotifyProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string>();

  return (
    <SpotifyContext.Provider value={accessToken}>
      <SpotifyDispatchContext.Provider value={setAccessToken}>
        {children}
      </SpotifyDispatchContext.Provider>
    </SpotifyContext.Provider>
  );
};

export default SpotifyProvider;
