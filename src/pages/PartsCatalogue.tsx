import React, { useContext } from 'react';
import { AppContext } from 'helpers/PartsProvider';
import PartsList from 'components/PartsList';

export const PartsCatalogue = () => {
	const { parts } = useContext(AppContext);
	return (
		<div>
			<PartsList catalogue={ parts } />
		</div>
	);
};