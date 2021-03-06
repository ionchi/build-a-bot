import React from 'react';
import ReactDOM from 'react-dom';
import 'index.scss';
import App from 'components/App';
import reportWebVitals from 'reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from 'theme';
import { GlobalStyles } from '@material-ui/core';

ReactDOM.render(
	<ThemeProvider theme={ theme }>
		<GlobalStyles styles={ { ul: { margin: 0, padding: 0, listStyle: 'none' } } } />
		<CssBaseline />
		<App />
	</ThemeProvider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
