import React, { FunctionComponent, useContext, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import BotPreview from 'components/BotPreview';

interface Props {
	selectedBot: AcmeBot;
	onAddToCart?: () => void
}

const BotPreviewCollapse: FunctionComponent<Props> = ({ selectedBot }: Props) => {
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
		return 0;
	}, [selectedBot]);

	function addBotToCart() {
		if (cart?.price !== totalPrice) {
			dispatch({ type: 'ADD_TO_CART', payload: { bot: selectedBot, price: totalPrice || 0 } });
		}
		toast.dismiss();
		toast('🚀 Bot successfully added to cart!');
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
		<div className="preview-bot preview-collapse">
			<Button
				className="preview-activator"
				variant="outlined"
				onClick={ () => { setShowCollapse(!showCollapse); } }
			>
				TOGGLE PREVIEW
			</Button>
			<Collapse in={ showCollapse } timeout="auto" unmountOnExit>
				<BotPreview
					selectedBot={ selectedBot }
					totalPrice={ totalPrice }
				/>
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

export default BotPreviewCollapse;