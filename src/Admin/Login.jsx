import React, { useState, Fragment, useEffect } from "react";
import { authenticate, signup, returnIsAuth } from "../firebase/Firebase";
import {
  Typography,
  Box,
  Alert,
  FormGroup,
  FormControl,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../Assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showFields, setShowFields] = useState(false);
  const [authType, setAuthType] = useState("");
  const [errors, setErrors] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    returnIsAuth(setIsAuthenticated, navigate);
  }, [navigate]);

  const handleEmail = (e) => setInputs({ ...inputs, email: e.target.value });
  const handlePass = (e) => setInputs({ ...inputs, password: e.target.value });

  const resetForm = () => {
    setShowFields(false);
    setAuthType("");
  };

  return (
    <Fragment>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ pt: 5, width: "50%" }} component="form">
          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="Logo" style={{ marginBottom: "20px" }} />

            {showFields ? (
              <>
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
                <FormControl sx={{ width: "100%", mb: 1 }}>
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={resetForm}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        authType === "Login"
                          ? authenticate(
                              setErrors,
                              setIsAuthenticated,
                              inputs,
                              navigate
                            )
                          : signup(
                              setErrors,
                              setIsAuthenticated,
                              inputs,
                              navigate
                            )
                      }
                    >
                      {authType}
                    </Button>
                  </Grid>
                </Grid>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mb: 1 }}
                  onClick={() => {
                    setShowFields(true);
                    setAuthType("Login");
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setShowFields(true);
                    setAuthType("Signup");
                  }}
                >
                  Signup
                </Button>
              </>
            )}

            {errors && (
              <Alert sx={{ mt: 2 }} severity="error">
                {errors.errorCode
                  ? `${errors.errorCode}: ${errors.errorMessage}`
                  : undefined}
              </Alert>
            )}
          </FormGroup>
        </Box>
      </Box>
    </Fragment>
  );
}
