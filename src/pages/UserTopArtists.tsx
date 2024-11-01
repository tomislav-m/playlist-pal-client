import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { ArtistList } from "../components/ArtistList";

const timeRanges = ["long", "medium", "short"];

export const UserTopArtists = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={handleChange} centered>
          {timeRanges.map((timeRange, index) => (
            <Tab key={`tab-${index}`} label={timeRange} />
          ))}
        </Tabs>
      </Box>
      {timeRanges.map((timeRange, index) => (
        <ArtistList key={index} timeRange={timeRange} isVisible={tabIndex === index} />
      ))}
    </Box>
  );
};
