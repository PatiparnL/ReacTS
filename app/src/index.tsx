import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import {
  RecoilRoot
} from 'recoil';

const THEME = createMuiTheme({
  typography: {
    "fontFamily": `"MyFont", "Helvetica", "Arial", sans-serif`,
    "fontSize": 18,
    "fontWeightLight": 400,
    "fontWeightRegular": 400,
    "fontWeightMedium": 400
  }
});

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <MuiThemeProvider theme={THEME}>
        <App />
      </MuiThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
