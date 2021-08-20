import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';
import PartsProvider from 'helpers/PartsProvider';
import { Builder } from 'pages/Builder';
import { Copyright } from 'components/Copyright';
import { Navbar } from 'components/Navbar';
import { PartsCatalogue } from 'pages/PartsCatalogue';
import { Cart } from 'pages/Cart';

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
					</Box>
				</Box>
			</Router>
		</PartsProvider>
	);
};

function Home() {
	return <h2>Home</h2>;
}

export default App;
