import React from 'react';
import 'pages/Home.scss';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const Home = () => {
	const history = useHistory();
	function goToBuild() {
		history.push('/builder');
	}

	return (
		<div className="page-container">
			<div className="ellipses-container">
				<h2 className="greeting">Welcome</h2>
				<div className="ellipses ellipses__outer--thin">
					<div className="ellipses ellipses__orbit" />
				</div>
				<div className="ellipses ellipses__outer--thick" />
			</div>
			<div className="cta-box">
				<Button
					variant="contained"
					color="primary"
					style={ { borderRadius: 0 } }
					onClick={ () => goToBuild() }
				>
					BUILD A BOT
				</Button>
			</div>
		</div>
	);
};