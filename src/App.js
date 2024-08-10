import {Routes,Route} from 'react-router-dom';
import UserAuth from './pages/UserAuth';
import PlayArena from './pages/PlayArena';
import Game from './pages/Game';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserAuth />}></Route>
        <Route path="/PlayArena/:userName" element={<PlayArena />}></Route>
        <Route path="/Game/:user1/:user2" element={<Game />}></Route>
      </Routes>
    </>
      
  );
}

export default App;
