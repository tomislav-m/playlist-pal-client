import { SpotifyObjectType } from "../types/SpotifyObjectType";

export const generateOpenSpotifyUrl = (
  objectId: string,
  objectType: SpotifyObjectType
) =>
  `https://open.spotify.com/${objectType.toString().toLowerCase()}/${objectId}`;
