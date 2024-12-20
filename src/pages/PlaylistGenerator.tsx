import { ChangeEvent, FC, useState } from "react";
import { Alert, Button, Snackbar, TextField, AlertColor } from "@mui/material";
import request, { HttpMethod } from "../api/requests";
import { Track } from "../types/Track";

const PlaylistGenerator: FC = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [playlistSize, setPlaylistSize] = useState(20);
  const [isValid, setIsValid] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("Success");
  const [snackbarColor, setSnackbarColor] = useState<AlertColor>("success");

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

    setIsCreating(true);

    request<Track>("playlist", HttpMethod.POST, {
      ...Object.fromEntries(data),
      filter: {},
    })
      .then(() => {
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
    </form>
  );
};

export default PlaylistGenerator;
