export type PartKey = 'heads' | 'arms' | 'torsos' | 'bases';
export type Direction = 'left' | 'right' | 'top' | 'bottom' | 'center';

export type Part = {
	id: number;
	description: string;
	title: string,
	src: string,
	type: PartKey,
	cost: number,
	onSale?: boolean
}

export type PartsListApiResponse = {
	[key in PartKey]: Part[];
};

export type AcmeBot = {
	[key in Direction]: Part;
}

export type Promotion = {
	code: string,
	discount: number
}

export interface AppState {
	cart: {
		bot?: AcmeBot,
		price: number
	},
	parts: PartsListApiResponse
}