import "../App.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
function UserAuth() {
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setError(false);
    setErrorText("");
    setUser(e.target.value);
  };
  const handleSubmit = () => {
    if (localStorage.getItem("users") == null) {
      let arr = [],
        winnerArr = [];
      arr.push(user);
      winnerArr.push({ [user]: "0" });
      localStorage.setItem("users", JSON.stringify(arr));
      localStorage.setItem("winners", JSON.stringify(winnerArr));
      navigate("/PlayArena/" + user);
    } else {
      let arr = JSON.parse(localStorage.getItem("users")),
        winnerArr = JSON.parse(localStorage.getItem("winners"));
      if (arr.includes(user)) {
        setError(true);
        setErrorText("Username already exists");
      } else {
        arr.push(user);
        winnerArr.push({ [user]: "0" });
        localStorage.setItem("users", JSON.stringify(arr));
        localStorage.setItem("winners", JSON.stringify(winnerArr));
        navigate("/PlayArena/" + user);
      }
    }
  };
  return (
    <>
      <Grid
        container
        justifyContent="center"
        direction={"column"}
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Box
          border={"1px solid"}
          boxShadow={3}
          height={"500px"}
          width={"500px"}
          display="flex"
          flexDirection="column"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item container alignItems={"center"} justifyContent={"center"}>
            <Typography variant="h3" gutterBottom>Login</Typography>
          </Grid>
          <Grid
            item
            sx={{ pt: 20 }}
            container
            direction="row"
            alignItems={"center"}
            justifyContent={"center"}
          >
            <TextField
              placeholder="Enter a User Name"
              helperText={errorText}
              autoFocus={true}
              onChange={(e) => handleChange(e)}
              error={error}
            ></TextField>
            <Button
              type="Submit"
              onClick={() => handleSubmit()}
              size="large"
              sx={{ padding: 2, marginLeft: 2 }}
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default UserAuth;
