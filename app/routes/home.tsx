import type { Route } from "./+types/home";
import { Outlet } from "react-router";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useState } from "react";
import { Paper } from "@mui/material";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Logistics" },
    { name: "description", content: "Application for logistecs" },
  ];
}

export default function Home() {
  const [value, setValue] = useState(0);
  return <>
  <Box sx={{ pb: 7 }} >
      <Outlet/>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<LocationOnIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  </>
}
