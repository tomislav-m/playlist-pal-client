import { useEffect, useState } from "react";
import request, { HttpMethod } from "../api/requests";
import { ArtistSimple } from "../types/ArtistSimple";
import {
  Avatar,
  Box,
  CircularProgress,
  Grid2,
  Typography,
} from "@mui/material";

type ArtistListProps = {
  timeRange: string;
  isVisible: boolean;
};

export const ArtistList = ({ timeRange, isVisible }: ArtistListProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [artists, setArtists] = useState<ArtistSimple[]>([]);

  useEffect(() => {
    setIsLoading(true);

    request<ArtistSimple[]>(
      "artist/user-top?timeRange=" + timeRange,
      HttpMethod.GET
    )
      .then((artists) => {
        setArtists(artists);
      })
      .finally(() => setIsLoading(false));
  }, [timeRange]);

  return (
    isVisible && (
      <Box sx={{ p: 2 }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            {artists.map((artist) => (
              <Grid2 container p={1}>
                <Grid2 size={6} justifyContent="flex-end">
                  <Box display="flex" justifyContent="flex-end">
                    <Avatar
                      src={artist.imageUrl}
                      alt={artist.name}
                      sx={{ mr: 2 }}
                    />
                  </Box>
                </Grid2>
                <Grid2 size={6} alignContent="center" textAlign="left">
                  <Typography>{artist.name}</Typography>
                </Grid2>
              </Grid2>
            ))}
          </>
        )}
      </Box>
    )
  );
};
