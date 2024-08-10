import { useNavigate, useParams } from "react-router-dom";
import {Grid,Radio,FormControl, RadioGroup,FormControlLabel,Button, Typography,CircularProgress, DialogContent, DialogActions, Dialog} from '@mui/material';
import {useState,useEffect} from 'react';
function Game(){
    const {user1,user2} = useParams();
    let x = localStorage.getItem(user1);
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState(x?x:'');
    const [winner,setWinner] = useState(null);
    const [disabled,setDisabled] = useState(x?true:false);
    const [load,setLoad]=useState(false);
    const [userLeft, setUserLeft] = useState(false);
    const [requestRematch, setRequestRematch] = useState(false);
    const [requestWait,setRequestWait] = useState(false);
    const handleChange=(e)=>{
        setSelectedValue(e.target.value);
    }
    const dashboard = () =>{
        localStorage.removeItem(user1);
        localStorage.removeItem("winner");
        localStorage.removeItem("winnerUpdate");
        localStorage.setItem("logout","true");
        navigate('/PlayArena/'+user1);
        
    }
    const compare= function(move1,move2){
        if(move1===move2){
            return 'draw';
        }
        else if(move1==='rock' && move2==='scissors'){
            return user1;
        }
        else if(move1==='scissors' && move2==='rock'){
            return user2;
        }
        else if(move1==='rock' && move2==='paper'){
            return user2;
        }
        else if(move1==='paper' && move2==='rock'){
            return user1;
        }
        else if(move1==='scissors' && move2==='paper'){
            return user1;
        }
        return user2;
    }
    const goToDashBoard =() =>{
        let currentUser = user1;
        localStorage.removeItem(user1);
        navigate("/PlayArena/" + currentUser);
    }
    useEffect(()=>{
        const checkFunction = () => {
            if(localStorage.getItem("logout")){
                localStorage.removeItem("logout");
                setUserLeft(true);
            }
            else if(localStorage.getItem("requestRematch")){
                    let user = localStorage.getItem("requestRematch");
                    if(user != user1){
                        setRequestRematch(true);
                    }
                    else {
                        setRequestWait(true);
                    }
            }
            else if (localStorage.getItem("removeAwaitRematchDialog")){
                setRequestWait(false);
                localStorage.removeItem("removeAwaitRematchDialog");
                window.location.reload();
            }
              if (
                localStorage.getItem(user2) !== null &&
                localStorage.getItem(user1) !== null &&
                localStorage.getItem("winner") == null
              ) {
                setLoad(false);
                let comparedValueResult = compare(
                  localStorage.getItem(user1),
                  localStorage.getItem(user2)
                );
                localStorage.setItem("winner", comparedValueResult);
              } else if (localStorage.getItem("winner")) {
                setLoad(false);
                setWinner(localStorage.getItem("winner"));
              } else if (localStorage.getItem(user1)) {
                setLoad(true);
              }
              if (localStorage.getItem("winner") && !localStorage.getItem("winnerUpdate")) {
                let winnerArr = JSON.parse(localStorage.getItem("winners"));
                for (const obj of winnerArr) {
                  for (const key of Object.keys(obj)) {
                    if (key === localStorage.getItem("winner")) {
                      obj[key] = parseInt(obj[key]) + 1;
                    }
                  }
                }
                localStorage.setItem("winners", JSON.stringify(winnerArr));
                localStorage.setItem("winnerUpdate","true");
              }
              if(!localStorage.getItem("requestRematch")){
                setRequestWait(false);
              }
        }
        let intervalId = setInterval(()=>checkFunction(),1000); 
        return ()=>{
            clearInterval(intervalId);
        }
    },[]);
    const handleSubmit=()=>{
        localStorage.setItem(user1,selectedValue);
        setDisabled(true);
    }
    const requestPlayAgain = () => {
      if (userLeft) {
        return;
      }
      localStorage.setItem("requestRematch", user1);
    };
    const playAgain = () =>{
        localStorage.removeItem("winner");
        localStorage.removeItem("winnerUpdate");
        localStorage.removeItem(user1);
        localStorage.removeItem(user2);
        localStorage.removeItem("requestRematch");
        localStorage.setItem("removeAwaitRematchDialog",true);
        window.location.reload();
    }
    const rejectRematch = () => {
        localStorage.removeItem("requestRematch");
        setRequestRematch(false);
    }
    const onCancelAwaitDialog = () => {
        localStorage.removeItem("requestRematch");
        setRequestRematch(false);
        setRequestWait(false);
    }
    return (
      <>
        <Dialog open={userLeft}>
          <DialogContent>User has left the game!</DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={goToDashBoard}
              sx={{ mr: "10px" }}
            >
              Go to Dashboard
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={requestRematch}>
          <DialogContent>{user2} has requested for a rematch</DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={playAgain} sx={{ mr: "10px" }}>
              Play Again
            </Button>
            <Button
              variant="outlined"
              onClick={rejectRematch}
              sx={{ mr: "10px" }}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={requestWait}
          onClose={onCancelAwaitDialog}
          aria-labelledby="RequestAwaitDialog"
        >
          <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ padding: "20px" }}
          >
            <DialogContent>Awaiting {user2}'s respone</DialogContent>
            <CircularProgress />
          </Grid>
          <DialogActions>
            <Button color="secondary" onClick={onCancelAwaitDialog}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Grid container justifyContent={"center"}>
          <h1>Choose Your Option</h1>
        </Grid>
        <Grid container justifyContent={"center"}></Grid>
        {winner && winner != "draw" && (
          <Grid
            container
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item>
              <h2 style={{ color: "green" }}>
                {localStorage.getItem("winner")} is the winner
              </h2>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ height: "45px", width: "80px", p: "2px", margin: "20px" }}
                onClick={requestPlayAgain}
              >
                Play Again
              </Button>
              <Button
                variant="outlined"
                sx={{
                  height: "45px",
                  width: "100px",
                  p: "2px",
                  margin: "20px",
                }}
                onClick={dashboard}
              >
                Dashboard
              </Button>
            </Grid>
          </Grid>
        )}
        {winner == "draw" && (
          <Grid container justifyContent={"center"}>
            <h2>It is a draw!</h2>
            <Grid item>
              <Button
                variant="outlined"
                sx={{ height: "45px", width: "80px", p: "2px", margin: "20px" }}
                onClick={requestPlayAgain}
              >
                Play Again
              </Button>
              <Button
                variant="outlined"
                sx={{
                  height: "45px",
                  width: "100px",
                  p: "2px",
                  margin: "20px",
                }}
                onClick={dashboard}
              >
                Dashboard
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          height={"30vh"}
        >
          <FormControl>
            <RadioGroup column value={selectedValue} onChange={handleChange}>
              <FormControlLabel
                value="rock"
                control={<Radio disabled={disabled} />}
                label="Rock"
              />
              <FormControlLabel
                value="paper"
                control={<Radio disabled={disabled} />}
                label="Paper"
              />
              <FormControlLabel
                value="scissors"
                control={<Radio disabled={disabled} />}
                label="Scissors"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid container justifyContent={"center"}>
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Play
          </Button>
        </Grid>
        {load && (
          <Grid container justifyContent={"center"} sx={{ paddingTop: "50px" }}>
            <Typography sx={{ paddingRight: "20px" }}>
              Awaiting {user2}'s response
            </Typography>
            <CircularProgress />
          </Grid>
        )}
      </>
    );
}
export default Game;