import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import { Avatar, Button } from "@mui/material";
import logo from "../Assets/logo.png";
import { signOut } from "../firebase/Firebase";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ background: "#FFDAE1" }} position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Avatar
              component={Link}
              to="/"
              src={logo}
              variant="rounded"
              sx={{
                width: { sm: "270px", md: "250px", lg: "300px" },
                height: { sm: "60px", md: "60px", lg: "60px" },
              }}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={signOut}>
              Sign Out
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
