import React, { FunctionComponent, useMemo, useState } from 'react';
import { Box, IconButton } from '@material-ui/core';
import { ArrowBack, ArrowForward, ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { Direction, Part } from 'helpers/types';

interface Props {
	parts: Part[];
	direction: Direction;
	onSelectPart: (part: Part, direction: Direction) => void
}

const PartSelector: FunctionComponent<Props> = (props: Props) => {
	const { parts, direction, onSelectPart } = props;
	const [partIndex, setPartIndex] = useState(0);

	const selectedPart = useMemo(() => {
		return parts?.[partIndex] || null;
	}, [partIndex, parts]);

	function getPartImageUrl(relativeUrl: string): string {
		// return `http://localhost:8081${relativeUrl}`;
		return relativeUrl;
	}

	function getPreviousValidIndex(index: number, length: number) {
		const deprecatedIndex = index - 1;
		return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
	}

	function getNextValidIndex(index: number, length: number) {
		const incrementedIndex = index + 1;
		return incrementedIndex > length - 1 ? 0 : incrementedIndex;
	}

	function selectNextPart() {
		const selectedPartIndex = getNextValidIndex(
			partIndex,
			parts.length
		);
		setPartIndex(selectedPartIndex);
		onSelectPart(parts[selectedPartIndex], direction);
	}
	function selectPreviousPart() {
		const selectedPartIndex = getPreviousValidIndex(
			partIndex,
			parts.length
		);
		setPartIndex(selectedPartIndex);
		onSelectPart(parts[selectedPartIndex], direction);
	}

	return (
		<Box
			sx={ {
				display: 'flex',
				flexDirection: 'column',
				justifyItems: 'center',
				alignItems: 'center'
			} }
			className={ `${direction} part` }
		>
			<div
				className={
					`prev-button ${(direction === 'left' || direction === 'right') ? 'prev-top-button' : 'prev-center-button'}`
				}
			>
				<IconButton
					aria-label="prev-part"
					size="small"
					style={ { backgroundColor: '#000' } }
					onClick={ () => { selectPreviousPart(); } }
				>
					{
						(direction !== 'left' && direction !== 'right')
							? <ArrowBack fontSize="inherit" />
							: <ArrowUpward fontSize="inherit" />
					}
				</IconButton>
			</div>
			{
				selectedPart?.src &&
				<img
					src={ getPartImageUrl(selectedPart.src) }
					title={ selectedPart.type }
					alt={ selectedPart.title }
					className="part-selector-image"
				/>
			}
			<div
				className={
					`next-button ${(direction === 'left' || direction === 'right') ? 'next-bottom-button' : 'next-center-button'}`
				}
			>
				<IconButton
					aria-label="next-part"
					size="small"
					style={ { backgroundColor: '#000' } }
					onClick={ () => { selectNextPart(); } }
				>
					{
						(direction !== 'left' && direction !== 'right')
							? <ArrowForward fontSize="inherit" />
							: <ArrowDownward fontSize="inherit" />
					}
				</IconButton>
			</div>
		</Box>
	);
};

export default PartSelector;