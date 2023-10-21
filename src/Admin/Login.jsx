import React, { useState, Fragment, useEffect } from "react";
import { authenticate, returnIsAuth } from "../firebase/Firebase";
import {
  Typography,
  Box,
  Alert,
  FormGroup,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (event) => {
    setInputs({ ...inputs, email: event.target.value });
  };

  const handlePass = (event) => {
    setInputs({ ...inputs, password: event.target.value });
  };

  const [errors, setErrors] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    returnIsAuth(setIsAuthenticated, navigate);
  }, [navigate]);

  return (
    <Fragment>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ pt: 5, width: "50%" }} component="form">
          <FormGroup
            className="form"
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: "5px",
                mb: 1,
              }}
            >
              Lofi Latte
            </Typography>
            <FormControl sx={{ width: "100%", mb: 1 }}>
              <TextField
                autoComplete="email"
                variant="filled"
                type="email"
                required
                onChange={handleEmail}
                id="email"
                label="Email"
                aria-describedby="enter email"
              />
            </FormControl>
            <FormControl sx={{ width: "100%" }}>
              <TextField
                autoComplete="current-password"
                variant="filled"
                required
                type="password"
                onChange={handlePass}
                id="password"
                label="Password"
                aria-describedby="enter password"
              />
            </FormControl>
            <Button
              variant="contained"
              onClick={() =>
                authenticate(setErrors, setIsAuthenticated, inputs, navigate)
              }
            >
              Sign In
            </Button>
            {Object.keys(errors).length > 0 ? (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors.exists ? errors.exists : undefined}
                {errors.email ? errors.email : undefined}
                {errors.password ? errors.password : undefined}
              </Alert>
            ) : undefined}
          </FormGroup>
        </Box>
      </Box>
    </Fragment>
  );
}
