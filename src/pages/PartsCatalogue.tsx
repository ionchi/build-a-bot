import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { AppContext } from 'helpers/PartsProvider';
import { Part, PartKey } from 'helpers/types';

export const PartsCatalogue = () => {
	const { parts } = useContext(AppContext);
	const sections = Object.keys(parts) as Array<keyof typeof parts>;
	function getSectionParts(section: PartKey): Part[] {
		return parts?.[section] || [];
	}
	return (
		<Box
			p={ 10 }
			sx={ {
				display: 'flex',
				flexDirection: 'column',
				justifyItems: 'center',
				alignItems: 'center'
			} }
		>
			{
				sections && sections.map(section => (
					<div key={ section } style={ { backgroundColor: '#eee', marginBottom: '30px' } }>
						{
							getSectionParts(section).map((el, index) => (
								<Box
									key={ `${index}_${el.id}` }
									style={ {
										backgroundColor: '#6772e5',
										padding: '10px',
										maxHeight: '100px',
										width: '300px'
									} }
									mb={ 3 }
								>
									{ el.title }
								</Box>
							))
						}
					</div>
				))
			}
		</Box>
	);
};