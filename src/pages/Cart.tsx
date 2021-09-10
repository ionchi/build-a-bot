import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import domToImage from 'dom-to-image';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import 'pages/Cart.scss';
import { activePromoCodes } from 'helpers/demo-data';
import { AppContext } from 'helpers/PartsProvider';
import CartHeader from 'components/CartHeader';
import CartList from 'components/CartList';
import CartSummary from 'components/CartSummary';
import BotPreview from 'components/BotPreview';

const TAX = 5;

export const Cart = () => {
	const { cart, dispatch } = useContext(AppContext);
	const CLONE_PRODUCT = cart.price > 0 ? JSON.parse(JSON.stringify(cart.bot)) : null;
	const [products, setProducts] = React.useState(CLONE_PRODUCT ? [CLONE_PRODUCT] : []);
	const [promoCode, setPromoCode] = React.useState('');
	const [discountPercent, setDiscountPercent] = React.useState(0);
	const [showCheckoutModal, setShowCheckoutModal] = useState(false);

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const subTotal = cart.price;
	const discount = (subTotal * discountPercent) / 100;

	const onRemoveProduct = ({ hideToast = false }) => {
		setProducts([]);
		if (!hideToast) {
			toast.dismiss();
			toast('Bot successfully removed!', {
				type: 'error'
			});
		}
		dispatch({ type: 'EMPTY_CART' });
	};

	const onEnterPromoCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPromoCode(event.target.value);
	};

	const checkPromoCode = () => {
		const currentPromo = activePromoCodes.find(el => el.code === promoCode);
		toast.dismiss();
		if (currentPromo) {
			setDiscountPercent(currentPromo.discount);
			toast('Promo code applied!');
		} else {
			toast('Sorry, the Promotional code you entered is not valid!', {
				type: 'error'
			});
		}
	};

	const filter = (node: Node) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return (node.id !== 'price-tag');
	};

	const downloadImage = async () => {
		const previewNode = document.getElementById('checkout-preview') as Node;
		await domToImage.toJpeg(previewNode, { quality: 0.95, filter, bgcolor: '#fff' })
			.then(function(dataUrl) {
				const link = document.createElement('a');
				link.download = 'bot.jpeg';
				link.href = dataUrl;
				link.click();
			});
	};

	const payAndDownload = async () => {
		try {
			await downloadImage();
			setTimeout(() => {
				toast(<div>🔥Order successfully completed!<br/> ⬇️ Enjoy your BOT ⬇️️</div>, {
					hideProgressBar: true,
					position: 'bottom-left'
				});
				onRemoveProduct({ hideToast: true });
				handleClose();
			}, 500);
		} catch (e) {
			console.log(e);
			toast('Ops... Something went wrong, please try again later.', {
				type: 'error',
				hideProgressBar: true
			});
		}
	};

	const handleOpen = () => setShowCheckoutModal(true);
	const handleClose = () => setShowCheckoutModal(false);

	return (
		<div>
			<CartHeader />

			{products.length > 0 ? (
				<div>
					<CartList
						products={ products }
						price={ cart.price }
						onRemoveProduct={ onRemoveProduct }
					/>

					<CartSummary
						subTotal={ subTotal }
						discount={ discount }
						tax={ TAX }
						onEnterPromoCode={ onEnterPromoCode }
						checkPromoCode={ checkPromoCode }
						onCheckOut={ handleOpen }
					/>

					<Dialog
						fullScreen={ fullScreen }
						open={ showCheckoutModal }
						onClose={ handleClose }
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">
							{ 'Check out' }
						</DialogTitle>
						<DialogContent>
							<div id="checkout-preview" className="preview-bot preview-big">
								<BotPreview
									selectedBot={ products[0] }
									totalPrice={ subTotal - discount + TAX }
								/>
							</div>
						</DialogContent>
						<DialogActions>
							<Button onClick={ handleClose }>Undo</Button>
							<Button onClick={ payAndDownload } autoFocus>
								Pay & Download
							</Button>
						</DialogActions>
					</Dialog>
				</div>
			) : (
				<div className="empty-product">
					<h3>There are no products in your cart.</h3>
				</div>
			)}
		</div>
	);
};
