import { Grid, IconButton } from "@mui/material";
import Switch from "@mui/material/Switch";
import { useTheme } from "./ThemeProviderComponent";
import { Brightness4, Brightness7 } from "@mui/icons-material";
function AppBarComponent() {
  const {darkMode, toggleTheme} = useTheme();
  return (
    <Grid container justifyContent={"center"}>
      <IconButton onClick={toggleTheme} aria-label="Toggle Dark Mode">
        {darkMode ? <Brightness4 /> : <Brightness7 />}
        <Switch checked={darkMode} onChange={toggleTheme} />
      </IconButton>
    </Grid>
  );
}
export default AppBarComponent;
