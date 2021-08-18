import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import {
	Button,
	Collapse,
	Dialog, DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import { AcmeBot } from 'helpers/types';
import { AppContext } from 'helpers/PartsProvider';

interface Props {
	selectedBot: AcmeBot;
	onAddToCart?: () => void
}

const BotPreview: FunctionComponent<Props> = ({ selectedBot }: Props) => {
	const { cart, dispatch } = useContext(AppContext);
	const [showCollapse, setShowCollapse] = useState(true);
	const [showConfirmModal, setShowConfirmModal] = useState(false);

	const totalPrice = useMemo(() => {
		if (selectedBot) {
			let total = 0;
			for (const section of Object.keys(selectedBot) as Array<keyof typeof selectedBot>) {
				if (selectedBot[section]) {
					total += selectedBot[section]?.cost;
				}
			}
			return total;
		}
	}, [selectedBot]);

	function getPartImageUrl(relativeUrl: string): string {
		// return `http://localhost:8081${relativeUrl}`;
		return relativeUrl;
	}

	function addBotToCart() {
		if (cart?.price !== totalPrice) {
			dispatch({ type: 'ADD_TO_CART', payload: { bot: selectedBot, price: totalPrice || 0 } });
		}
		handleClose();
	}

	const handleOpen = () => setShowConfirmModal(true);
	const handleClose = () => setShowConfirmModal(false);

	function handleAddToCart() {
		if (!cart?.price) {
			addBotToCart();
		} else {
			handleOpen();
		}
	}

	return (
		<div className="preview-bot">
			<Button
				className="preview-activator"
				variant="outlined"
				onClick={ () => { setShowCollapse(!showCollapse); } }
			>
				TOGGLE PREVIEW
			</Button>
			<Collapse in={ showCollapse } timeout="auto" unmountOnExit>
				<div className="preview-content">
					<div className="top-row">
						{ selectedBot.top?.src && <img src={ getPartImageUrl(selectedBot.top?.src) } alt="head" />}
					</div>
					<div className="middle-row">
						{ selectedBot.left?.src && <img src={ getPartImageUrl(selectedBot.left?.src) } alt="leftArm" className="rotate-left" />}
						{ selectedBot.center?.src && <img src={ getPartImageUrl(selectedBot.center?.src) } alt="torso" />}
						{ selectedBot.right?.src && <img src={ getPartImageUrl(selectedBot.right?.src) } alt="rightArm" className="rotate-right" />}
					</div>
					<div className="bottom-row">
						{ selectedBot.bottom?.src && <img src={ getPartImageUrl(selectedBot.bottom?.src) } alt="bottom" />}
					</div>
					<div className="middle-row" style={ { marginTop: '10px' } }>
						Price: { totalPrice }$
					</div>
				</div>
			</Collapse>
			<Button
				className="preview-activator"
				variant="outlined"
				onClick={ () => { handleAddToCart(); } }
			>
				ADD TO CART
			</Button>

			<Dialog
				open={ showConfirmModal }
				onClose={ handleClose }
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{ 'Warning' }
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						One bot is already in the cart, do you want to remove it and add the new one?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={ handleClose }>No</Button>
					<Button onClick={ () => addBotToCart() } autoFocus>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default BotPreview;