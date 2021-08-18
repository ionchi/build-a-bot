import React from 'react';
import { Link, Typography } from '@material-ui/core';

export const Copyright = () => {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://material-ui.com/">
				BotBuilder
			</Link>{' '}
			{new Date().getFullYear()}.
		</Typography>
	);
};