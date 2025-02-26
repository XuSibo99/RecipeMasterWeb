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
import { Link } from "react-router-dom";

const menuList = [
  { label: "Recipe Generation", path: "recipe-generation" },
  { label: "Meal Planner", path: "meal-planner" },
  { label: "Shopping List", path: "shopping-list" },
  { label: "Search & Discovery", path: "search-discovery" },
  { label: "User-Submitted Recipes", path: "user-submit" },
  { label: "Rating & Comments", path: "rating-comments" },
  { label: "AI-Powered Suggestion", path: "ai-suggestion" },
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
          {menuList.map(({ label, path }, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton component={Link} to={path}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Drawer>
  );
}

export default Sidebar;
