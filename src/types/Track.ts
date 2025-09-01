export interface TrackDto {
  id: string;
  title: string;
  artistName: string;
  albumCover: string;
  albumTitle: string;
  durationMs: number;
}

export interface PlaylistDto {
  id: string;
  name: string;
  tracks: TrackDto[];
}
