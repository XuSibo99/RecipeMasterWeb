import { useState } from "react";
import {
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const menuList = [
  "Recipe Generation",
  "Meal Planner",
  "Shopping List",
  "Search & Discovery",
  "User-Submitted Recipes",
  "Rating & Comments",
  "AI-Powered Suggestion",
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 60 : 240,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          position: "relative",
          width: collapsed ? 60 : 240,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          overflowX: "hidden",
          background: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
      open
    >
      <Box
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-end",
          height: 48,
        }}
      >
        <IconButton onClick={toggleCollapse}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      {!collapsed && (
        <List>
          {menuList.map((item, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton onClick={() => console.log(`Clicked ${item}`)}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
}

export default Sidebar;
