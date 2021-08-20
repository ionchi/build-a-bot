import React, { useContext } from 'react';
import 'pages/Cart.scss';
import { activePromoCodes } from 'helpers/demo-data';
import { AppContext } from 'helpers/PartsProvider';
import CartHeader from 'components/CartHeader';
import CartList from 'components/CartList';
import CartSummary from 'components/CartSummary';

const TAX = 5;

export const Cart = () => {
	const { cart, dispatch } = useContext(AppContext);
	const CLONE_PRODUCT = cart.price > 0 ? JSON.parse(JSON.stringify(cart.bot)) : null;
	const [products, setProducts] = React.useState(CLONE_PRODUCT ? [CLONE_PRODUCT] : []);
	const [promoCode, setPromoCode] = React.useState('');
	const [discountPercent, setDiscountPercent] = React.useState(0);

	const subTotal = cart.price;
	const discount = (subTotal * discountPercent) / 100;

	const onRemoveProduct = () => {
		setProducts([]);
		dispatch({ type: 'EMPTY_CART' });
	};

	const onEnterPromoCode = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPromoCode(event.target.value);
	};

	const checkPromoCode = () => {
		const currentPromo = activePromoCodes.find(el => el.code === promoCode);
		if (currentPromo) {
			setDiscountPercent(currentPromo.discount);
		} else {
			alert('Sorry, the Promotional code you entered is not valid!');
		}
	};

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
					/>
				</div>
			) : (
				<div className="empty-product">
					<h3>There are no products in your cart.</h3>
				</div>
			)}
		</div>
	);
};
