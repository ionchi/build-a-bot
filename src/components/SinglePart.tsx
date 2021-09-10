import React, { FunctionComponent } from 'react';
import { Part } from 'helpers/types';
import 'components/PartsList.scss';

interface Props {
	part: Part;
}

const SinglePart: FunctionComponent<Props> = (props: Props) => {
	const { part } = props;
	return (
		<div className='card'>
			<div className='top-bar'>
				{
					part.onSale &&
					<em className="stocks">On Sale</em>
				}
			</div>
			<div className='img-container'>
				<img className='product-img' src={ part.src } alt=''/>
			</div>
			<div className='details'>
				<div className='name-fav'>
					<strong className='product-name'>
						{part.title}
					</strong>
				</div>
				<div className='wrapper'>
					<p>{part.description}</p>
				</div>
				<div className='purchase'>
					<p className='product-price'>$ {part.cost}</p>
				</div>
			</div>
		</div>
	);
};

export default SinglePart;