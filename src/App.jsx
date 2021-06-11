import React, { useState, useEffect } from 'react'
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import spotifyActions from './actions/spotify_actions'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SpotifyContainer from './container-components/spotify_main_container'

const theme = createMuiTheme(
  {
    "typography": {
      "fontFamily": [
        'Microsoft Sans Serif'
      ].join(','),
    },
    "palette": {
      "type": "dark",
      "common": {
        "black": "#000",
        "white": "#fff"
      },
      "background": {
        "paper": "#000000",
        "default": "#0e0e0e"
      },
      "primary": {
        "light": "#0e0e0e",
        "main": "#000000",
        "dark": "#000000",
        "contrastText": "#fff"
      },
      "secondary": {
        "light": "#ff4081",
        "main": "#0e0e0e",
        "dark": "#0e0e0e",
        "contrastText": "#fff"
      },
      "error": {
        "light": "#e57373",
        "main": "#f44336",
        "dark": "#d32f2f",
        "contrastText": "#fff"
      },
      "text": {
        "primary": "#fff",
        "secondary": "#fff",
        "disabled": "rgba(0, 0, 0, 0.38)",
        "hint": "rgba(0, 0, 0, 0.38)"
      },
      "grid": {
        "fontFamily": [
          'Microsoft Sans Serif'
        ].join(','),
      }
    }
  }
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotifyActions.getAccessToken());
  }, [])
  const accessToken = useSelector((state) => state.spotifyReducer.accessToken);
  return (
    <ThemeProvider theme={theme}>
      <SpotifyContainer />
    </ThemeProvider>
  );
}

export default App;
