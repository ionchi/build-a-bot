import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import PartsProvider from 'helpers/PartsProvider';
import { Builder } from 'pages/Builder';
import { Copyright } from 'components/Copyright';
import { Navbar } from 'components/Navbar';
import { PartsCatalogue } from 'pages/PartsCatalogue';
import { Cart } from 'pages/Cart';
import { Home } from 'pages/Home';

const App = () => {
	return (
		<PartsProvider>
			<Router>
				<Box
					sx={ {
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh'
					} }
				>
					<Navbar />
					<Switch>
						<Route path="/builder">
							<Builder />
						</Route>
						<Route path="/parts">
							<PartsCatalogue />
						</Route>
						<Route path="/cart">
							<Cart />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
					<Box
						component="footer"
						sx={ {
							py: 3,
							px: 2,
							mt: 'auto',
							backgroundColor: (theme) =>
								theme.palette.mode === 'light'
									? theme.palette.grey[200]
									: theme.palette.grey[800]
						} }
					>
						<Container maxWidth="sm">
							<Copyright />
						</Container>

						<ToastContainer
							position="bottom-right"
							autoClose={ 4000 }
							hideProgressBar={ false }
							newestOnTop={ false }
							closeOnClick
							rtl={ false }
							pauseOnFocusLoss
							draggable
							pauseOnHover
							theme={ 'dark' }
							style={ { minWidth: '380px' } }
						/>
					</Box>
				</Box>
			</Router>
		</PartsProvider>
	);
};

export default App;
