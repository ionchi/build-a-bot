import React, { FunctionComponent } from 'react';
import 'components/PartsList.scss';
import { Part, PartKey, PartsListApiResponse } from 'helpers/types';
import SinglePart from 'components/SinglePart';

interface Props {
	catalogue: PartsListApiResponse;
}

const PartsList: FunctionComponent<Props> = (props: Props) => {
	const { catalogue } = props;
	const sections = Object.keys(catalogue) as Array<keyof typeof catalogue>;
	function getSectionParts(section: PartKey): Part[] {
		return catalogue?.[section] || [];
	}

	return (
		<div>
			{sections && sections.map(section => (
				<div key={ section } className='banner'>
					<h3>
						{ section }
					</h3>
					<div key={ section } className='main-cart'>
						{
							getSectionParts(section).map((el, index) => (
								<SinglePart
									key={ el.id + index }
									part={ el }
								/>
							))
						}
					</div>
				</div>
			))
			}
		</div>
	);
};

export default PartsList;