/* eslint-disable no-unused-expressions */
import { FASTDesignSystemProvider, FASTCard, FASTButton, FASTTextField, FASTProgressRing } from '@microsoft/fast-components';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { MovieContextProvider } from './contexts/movieContext';
import { parseColorHexRGB } from '@microsoft/fast-colors';
import { createColorPalette } from '@microsoft/fast-components';
import { useEffect, useState } from 'react';
import { palette as appPalette } from './theme/palette';
import { Movie } from './pages/Movie';
import { AuthContextProvider } from './contexts/authContext';
import { Reservations } from './pages/Reservations';
import { AddMovie } from './pages/AddMovie';

FASTDesignSystemProvider;
FASTCard;
FASTButton;
FASTTextField;
FASTProgressRing;

function App() {
  const [needRefresh, setNeedRefresh] = useState(false);
  useEffect(() => {
    const accent = appPalette.accent;
    const palette = createColorPalette(parseColorHexRGB(accent));
    const provider = document.querySelector('fast-design-system-provider') ?? ({} as any);

    provider.accentBaseColor = accent;
    provider.accentPalette = palette;
    setNeedRefresh(true);
  }, []);

  return (
    <fast-design-system-provider use-defaults>
      <AuthContextProvider>
        <MovieContextProvider>
          <Router>
            <Switch>
              <Route exact path='/'>
                <>
                  <Home />
                  <fast-button style={{ display: 'none' }} appearance='accent'></fast-button>
                </>
              </Route>
              <Route path='/movies/:movieId'>
                <Movie />
              </Route>
              <Route path='/reservations' exact>
                <Reservations/>
              </Route>
              <Route path='/add-movie' exact>
                <AddMovie/>
              </Route>
            </Switch>
          </Router>
        </MovieContextProvider>
      </AuthContextProvider>
    </fast-design-system-provider>
  );
}

export default App;
