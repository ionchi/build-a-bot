import React from 'react';
import { AcmeBot } from 'helpers/types';
import { formatCurrency } from 'helpers/global-methods';
import { Box } from '@material-ui/core';

interface Props {
	products: AcmeBot[];
	price: number;
	onRemoveProduct: ({ hideToast }: { hideToast: boolean }) => void;
}

const CartList = ({ products, price, onRemoveProduct }: Props) => {
	return (
		<section className="cart-container">
			<ul className="products">
				{products.map((product, index: number) => {
					return (
						<li className="row" key={ index }>
							<Box
								sx={ {
									display: 'flex',
									flexDirection: {
										xs: 'column',
										md: 'row'
									},
									justifyContent: {
										md: 'space-between'
									},
									alignItems: 'center',
									px: {
										xs: 1,
										md: 4
									}
								} }
							>
								{
									product.top &&
									<Box
										sx={ {
											display: 'flex',
											flexDirection: {
												xs: 'column',
												md: 'row'
											}
										} }
										className="details"
									>
										<div className="thumbnail">
											<a href="#">
												<img src={ product.top.src } alt={ product.top.title } />
											</a>
										</div>
										<div className="detail">
											<div className="name">
												<a href="#">{product.top.title}</a>
											</div>
											<div className="description">{product.top.description}</div>
											<div className="price">{formatCurrency(price)}</div>
										</div>
									</Box>
								}
								<div>
									<div className="remove">
										<svg
											onClick={ () => onRemoveProduct({ hideToast: false }) }
											version="1.1"
											className="close"
											x="0px"
											y="0px"
											viewBox="0 0 60 60"
											enableBackground="new 0 0 60 60"
										>
											<polygon points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812" />
										</svg>
									</div>
								</div>
							</Box>
						</li>
					);
				})}
			</ul>
		</section>
	);
};

export default CartList;