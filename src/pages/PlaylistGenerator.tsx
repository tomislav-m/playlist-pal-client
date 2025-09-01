import { ChangeEvent, FC, useState } from "react";
import {
  Alert,
  Button,
  Snackbar,
  TextField,
  AlertColor,
  Box,
} from "@mui/material";
import request, { HttpMethod } from "../api/requests";
import { PlaylistDto } from "../types/Track";
import { Playlist } from "../components/Playlist";

const PlaylistGenerator: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [playlistSize, setPlaylistSize] = useState(20);
  const [isValid, setIsValid] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Success");
  const [snackbarColor, setSnackbarColor] = useState<AlertColor>("success");

  const [playlist, setPlaylist] = useState<PlaylistDto>();

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value);
    if (isNaN(val) || val < 1) {
      return;
    }
    setPlaylistSize(val);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    setPlaylist(undefined);

    setIsCreating(true);

    request<PlaylistDto>("playlist", HttpMethod.POST, {
      ...Object.fromEntries(data),
      filter: {},
    })
      .then((response: PlaylistDto) => {
        setPlaylist(response);

        setSnackbarColor("success");
        setSnackbarMessage("Success!");
      })
      .catch(() => {
        setSnackbarColor("error");
        setSnackbarMessage("Error!");
      })
      .finally(() => {
        setIsCreating(false);
        setSnackbarOpen(true);
      });
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ mb: "20px" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Playlist title"
            disabled={isCreating}
            required={true}
            variant="standard"
            size="small"
            name="playlistName"
            onChange={(e) => {
              if (e.currentTarget.value.length && !isValid) {
                setIsValid(true);
              } else if (!e.currentTarget.value.length && isValid) {
                setIsValid(false);
              }
            }}
          />
          <TextField
            placeholder="Size"
            disabled={isCreating}
            value={playlistSize}
            onChange={handleSizeChange}
            size="small"
            type="number"
            variant="standard"
            sx={{ width: "100px" }}
            name="size"
          />
          <Button
            type="submit"
            variant="contained"
            disabled={isCreating || !isValid}
            size="small"
            loading={isCreating}
          >
            Create
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity={snackbarColor}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </form>
      </Box>
      {playlist && <Playlist playlist={playlist} />}
    </>
  );
};

export default PlaylistGenerator;
