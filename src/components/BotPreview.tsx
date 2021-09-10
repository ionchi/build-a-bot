import React, { FunctionComponent } from 'react';
import { AcmeBot } from 'helpers/types';

interface Props {
	selectedBot: AcmeBot;
	totalPrice: number;
}

const BotPreview: FunctionComponent<Props> = ({ selectedBot, totalPrice }: Props) => {
	function getPartImageUrl(relativeUrl: string): string {
		// return `http://localhost:8081${relativeUrl}`;
		return relativeUrl;
	}

	return (
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
			<div id="price-tag" className="middle-row" style={ { marginTop: '10px' } }>
				Price: { totalPrice }$
			</div>
		</div>
	);
};

export default BotPreview;