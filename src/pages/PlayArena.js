import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogContent,
  CircularProgress,
  DialogActions,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
function PlayArena() {
  const { userName } = useParams();
  const [displayNoUsers, setDisplayNoUsers] = useState(false);
  const [userArray, setUserArray] = useState([]);
  const [user, setUser] = useState("");
  const [rivalName, setRivalName] = useState(null);
  const [openAwaitDialog, setOpenAwaitDialog] = useState(false);
  const [openRivalDialog, setOpenRivalDialog] = useState(false);
  const [winnerArray,setWinnerArray] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("rival")) {
      setOpenRivalDialog(true);
    }
    else if(localStorage.getItem("gameURL")!==null ){
        let gameURL = localStorage.getItem("gameURL");
        localStorage.removeItem("gameURL");
        navigate(gameURL);
    }
    else {
        setOpenAwaitDialog(false);
        setOpenRivalDialog(false);
    }
    let arr = JSON.parse(localStorage.getItem("users"));
    let tempArr = JSON.parse(localStorage.getItem("winners"));
    tempArr.sort((a,b)=>{
        const scoreA = Object.values(a)[0];
        const scoreB = Object.values(b)[0];
        return scoreB-scoreA;
    })
     setWinnerArray(tempArr);
    if (arr.length <= 1) {
      setDisplayNoUsers(true);
    } else {
      setDisplayNoUsers(false);
    }
    setUser(userName);
    setUserArray(arr.filter((u) => u !== userName));
  });
  const handlePlay = (name) => {
    localStorage.setItem("rival", name);
    localStorage.setItem("opponent", user);
    setRivalName(name);
    setOpenAwaitDialog(true);
  };
  const playGame = () => {
    let name =
      localStorage.getItem("rival") == userName
        ? localStorage.getItem("opponent")
        : localStorage.getItem("rival");
    localStorage.setItem("gameURL", "/Game/" + name + "/" + userName);
        localStorage.removeItem("rival");
        localStorage.removeItem("opponent");
    navigate("/Game/" + userName + "/" + name);
  };
  const onCancelAwaitDialog = () => {
    localStorage.removeItem("rival");
    localStorage.removeItem("opponent");
    setOpenAwaitDialog(false);
    setOpenRivalDialog(false);
  }
  return (
    <>
      <Grid container justifyContent="center">
        <h1>Welcome {user}!</h1>
      </Grid>
      {displayNoUsers && (
        <Grid container justifyContent="center">
          <Typography color={"red"}>No Users Found!</Typography>
        </Grid>
      )}
      <Dialog
        open={openAwaitDialog}
        onClose={onCancelAwaitDialog}
        aria-labelledby="AwaitDialog"
      >
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ padding: "20px" }}
        >
          <DialogContent>Awaiting {rivalName}'s respone</DialogContent>
          <CircularProgress />
        </Grid>
        <DialogActions>
          <Button color="secondary" onClick={onCancelAwaitDialog}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {localStorage.getItem("rival") === user && (
        <Dialog
          open={openRivalDialog}
          onClose={onCancelAwaitDialog}
          aria-labelledby="RivalDialog"
        >
          <DialogContent>
            Do you accept {localStorage.getItem("opponent")}'s request to play?
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={playGame}>
              Accept
            </Button>
            <Button variant="outlined" onClick={onCancelAwaitDialog}>
              Reject
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={6}>
          <ul>
            <Grid container sx={{ pb: "20px" }}>
              <Typography variant="h2" sx={{ pb: "20px" }}>
                Players
              </Typography>
            </Grid>
            {userArray.map((name, index) => {
              return (
                <>
                  <Box
                    display="flex"
                    padding={2}
                    justifyContent="center"
                    width="40%"
                    sx={{ border: "1px solid" }}
                  >
                    <Grid
                      container
                      direction="column"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item>
                        <li key={index}>{name}</li>
                      </Grid>
                      <Grid item>
                        <Button
                          onClick={() => handlePlay(name)}
                          variant="outlined"
                        >
                          Play
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              );
            })}
          </ul>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h2" sx={{ pb: "20px" }}>
            Scoreboard
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Score</TableCell>
                </TableRow>
              </TableHead>
              {winnerArray.map((obj,index)=>{
                const key = Object.keys(obj)[0];
                const value = obj[key];
                return (
                  <TableRow key={index}>
                    <TableCell>{key}</TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                );
              })}
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
export default PlayArena;
