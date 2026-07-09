import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import TopGames from './pages/topGamesPage/TopGames';
import Home from './pages/home/Home';
import './App.css'
import { NavBar } from './components/navbar.component';
import { SideBar } from './components/sidebar.component';

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-layout">
      {!isHome && <NavBar />}
      <div className="app-main">
        {!isHome && <SideBar />}
        <main className={`app-content ${!isHome ? 'with-sidebar' : ''}`}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/browse" element={<TopGames />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App
