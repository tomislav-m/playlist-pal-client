import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { PlaylistDto } from "../types/Track";
import { generateOpenSpotifyUrl } from "../helpers/SpotifyUrlHelper";
import { SpotifyObjectType } from "../types/SpotifyObjectType";
import { milisecondsToMinutesSeconds } from "../helpers/DurationHelpers";
import React from "react";

type PlaylistProps = {
  playlist: PlaylistDto;
};

export const Playlist = ({ playlist }: PlaylistProps) => {
  return (
    <Card>
      <CardHeader
        title={
          <Link
            href={generateOpenSpotifyUrl(
              playlist.id,
              SpotifyObjectType.PLAYLIST
            )}
            underline="none"
            color="inherit"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textDecoration: "none" }}
          >
            {playlist.name}
          </Link>
        }
      />
      <CardContent>
        <List dense disablePadding>
          {playlist.tracks.map((track, index) => (
            <React.Fragment key={track.id}>
              <ListItem
                disablePadding
                secondaryAction={
                  <Typography variant="body2">
                    {milisecondsToMinutesSeconds(track.durationMs)}
                  </Typography>
                }
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar
                      src={track.albumCover}
                      alt={track.albumTitle}
                      title={track.albumTitle}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Link
                        href={generateOpenSpotifyUrl(
                          track.id,
                          SpotifyObjectType.TRACK
                        )}
                        underline="none"
                        color="inherit"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textDecoration: "none" }}
                      >
                        {track.title}
                      </Link>
                    }
                    secondary={track.artistName}
                  />
                </ListItemButton>
              </ListItem>
              {index < playlist.tracks.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
