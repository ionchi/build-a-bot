import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Badge, Link, Toolbar, Typography } from '@material-ui/core';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import { AppContext } from 'helpers/PartsProvider';

const navItems = [
	{
		value: 'home',
		name: 'Home',
		link: '/'
	},
	{
		value: 'builder',
		name: 'Build',
		link: '/builder'
	},
	{
		value: 'parts',
		name: 'Parts',
		link: '/parts'
	}
];

export const Navbar = () => {
	const [showBadge, setShowBadge] = useState(false);
	const { cart } = useContext(AppContext);

	const history = useHistory();

	function goToCart() {
		history.push('/cart');
	}

	useEffect(() => {
		setShowBadge(!!cart?.price);
	}, [cart]);

	return(
		<AppBar
			position="static"
			color="default"
			elevation={ 0 }
			sx={ { borderBottom: (theme) => `1px solid ${theme.palette.divider}` } }
		>
			<Toolbar sx={ { flexWrap: 'wrap' } }>
				<Typography variant="h6" color="inherit" noWrap sx={ { flexGrow: 1 } } fontWeight={ 600 }>
					BotBuilder
				</Typography>
				<nav>
					{ navItems.map((el, index) => (
						<Link
							component={ RouterLink }
							key={ index }
							variant="button"
							color="text.primary"
							to={ el.link }
							sx={ { my: 1, mx: 2 } }
						>
							{ el.name }
						</Link>
					)) }
					<Badge color="secondary" variant="dot" invisible={ !showBadge } style={ { margin: '0 15px' } }>
						<ShoppingCart onClick={ () => goToCart() } style={ { cursor: 'pointer' } } />
					</Badge>
				</nav>
			</Toolbar>
		</AppBar>
	);
};