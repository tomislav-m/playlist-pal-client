import { ChangeEvent, FC, useState } from "react";
import { Alert, Button, Snackbar, TextField, AlertColor } from "@mui/material";
import request, { HttpMethod } from "../api/requests";
import { Track } from "../types/Track";

const PlaylistGenerator: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistSize, setPlaylistSize] = useState(20);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Success");
  const [snackbarColor, setSnackbarColor] = useState<AlertColor>("success");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value);
    if (isNaN(val)) {
      return;
    }
    setPlaylistSize(val);
  };

  const get = () => {
    setIsCreating(true);

    request<Track>("playlist", HttpMethod.POST, {
      playlistName,
      filter: {},
      size: playlistSize,
    })
      .then(() => {
        setIsCreating(false);

        setSnackbarColor("success");
        setSnackbarMessage("Success!");
      })
      .catch(() => {
        setIsCreating(false);

        setSnackbarColor("error");
        setSnackbarMessage("Error!");
      })
      .finally(() => setSnackbarOpen(true));
  };

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <TextField
        placeholder="Playlist title"
        disabled={isCreating}
        value={playlistName}
        onChange={handleChange}
        required={true}
        variant="standard"
        size="small"
      />
      <TextField
        placeholder="Size"
        disabled={isCreating}
        value={playlistSize}
        onChange={handleSizeChange}
        size="small"
        type="number"
        variant="standard"
        style={{ width: "100px" }}
      />
      <Button
        onClick={get}
        variant="contained"
        disabled={isCreating || playlistName.length === 0}
        size="small"
      >
        {" "}
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
    </>
  );
};

export default PlaylistGenerator;
