import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TopGames from './pages/topGamesPage/TopGames';
import './App.css'
import { NavBar } from './components/navbar.component';
import { SideBar } from './components/sidebar.component';

function App() {
  return (
        <BrowserRouter>
          <NavBar />
          <div className="main-container">
            <SideBar />
              <Routes>
                <Route index element={<TopGames />} />
              </Routes>
          </div>
        </BrowserRouter>
  );
}

export default App