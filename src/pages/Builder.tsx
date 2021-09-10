import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { AppContext } from 'helpers/PartsProvider';
import PartSelector from 'components/PartSelector';
import { AcmeBot, Direction, Part } from 'helpers/types';
import BotPreviewCollapse from 'components/BotPreviewCollapse';

export const Builder = () => {
	const { parts } = useContext(AppContext);
	const [selectedBot, setSelectedBot] = useState({} as AcmeBot);
	const [headParts, setHeadParts] = useState([] as Part[]);
	const [armsParts, setArmsParts] = useState([] as Part[]);
	const [torsosParts, setTorsosParts] = useState([] as Part[]);
	const [basesParts, setBasesParts] = useState([] as Part[]);

	useEffect(() => {
		if (parts) {
			setHeadParts(parts['heads']);
			setArmsParts(parts['arms']);
			setTorsosParts(parts['torsos']);
			setBasesParts(parts['bases']);
			setSelectedBot({
				'top': parts?.['heads']?.[0],
				'left': parts?.['arms']?.[0],
				'right': parts?.['arms']?.[0],
				'center': parts?.['torsos']?.[0],
				'bottom': parts?.['bases']?.[0]
			});
		}
	}, [parts]);

	function selectPart(part: Part, section: Direction) {
		if (part) {
			const newBot = { ...selectedBot };
			newBot[section] = part;
			setSelectedBot(newBot);
		}
	}
	
	return (
		<Box
			my={ 10 }
			position={ 'relative' }
			sx={ {
				display: 'flex',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				justifyContent: {
					md: 'space-between'
				},
				px: {
					xs: 1,
					md: 4
				}
			} }
		>
			<div style={ { width: '210px' } }>
			</div>
			<Box>
				<Box
					sx={ {
						display: 'flex',
						justifyContent: 'space-around'
					} }
				>
					<PartSelector parts={ headParts } direction={ 'top' } onSelectPart={ selectPart } />
				</Box>
				<Box
					sx={ {
						display: 'flex',
						justifyContent: 'center'
					} }
				>
					<PartSelector parts={ armsParts } direction={ 'left' } onSelectPart={ selectPart } />
					<PartSelector parts={ torsosParts } direction={ 'center' } onSelectPart={ selectPart } />
					<PartSelector parts={ armsParts } direction={ 'right' } onSelectPart={ selectPart } />
				</Box>
				<Box
					sx={ {
						display: 'flex',
						justifyContent: 'space-around'
					} }
				>
					<PartSelector parts={ basesParts } direction={ 'bottom' } onSelectPart={ selectPart } />
				</Box>
			</Box>
			<Box
				sx={ {
					display: 'flex',
					justifyContent: {
						xs: 'center',
						md: 'end'
					},
					mt: {
						xs: 5,
						md: 0
					}
				} }
			>
				{
					selectedBot && (
						<BotPreviewCollapse selectedBot={ selectedBot } />
					)
				}
			</Box>
		</Box>
	);
};
