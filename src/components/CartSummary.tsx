import React from 'react';
import { Box, Button } from '@material-ui/core';
import { formatCurrency } from 'helpers/global-methods';

interface Props {
	subTotal: number;
	discount: number;
	tax: number;
	onEnterPromoCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
	checkPromoCode: () => void;
	onCheckOut: () => void;
}

const CartSummary = ({ subTotal, discount, tax, onEnterPromoCode, checkPromoCode, onCheckOut }: Props) => {
	const total = subTotal - discount + tax;

	return (
		<Box
			sx={ {
				display: 'flex',
				flexDirection: {
					xs: 'column',
					md: 'row'
				},
				justifyContent: {
					md: 'space-between'
				}
			} }
			className="cart-container"
		>
			<div className="promotion">
				<label htmlFor="promo-code">Have A Promo Code?</label>
				<input type="text" onChange={ onEnterPromoCode } />
				<button type="button" onClick={ checkPromoCode } />
			</div>

			<Box
				sx={ {
					display: 'flex',
					flexDirection: {
						xs: 'column',
						md: 'row'
					},
					justifyContent: {
						md: 'end'
					},
					alignItems: 'center'
				} }
			>
				<div className="summary">
					<div style={ { marginBottom: '8px' } }>
						Subtotal <span>{formatCurrency(subTotal)}</span>
					</div>
					{
						discount > 0 && <div style={ { marginBottom: '8px' } }>
							Discount <span>{formatCurrency(discount)}</span>
						</div>
					}
					<div style={ { marginBottom: '4px' } }>
						Tax <span>{formatCurrency(tax)}</span>
					</div>
					<div className="total">
						Total <span>{formatCurrency(total)}</span>
					</div>
				</div>

				<div className="checkout">
					<Button
						variant="contained"
						color="primary"
						style={ { borderRadius: 0 } }
						onClick={ onCheckOut }
					>
						Check Out
					</Button>
				</div>
			</Box>
		</Box>
	);
};

export default CartSummary;