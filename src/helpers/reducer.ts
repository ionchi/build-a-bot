import { AcmeBot, AppState, PartsListApiResponse } from 'helpers/types';

type CartAction = {
	type: 'ADD_TO_CART';
	payload: {
		bot: AcmeBot,
		price: number
	};
};

type CartEmptyAction = {
	type: 'EMPTY_CART';
};

type PartsAction = {
	type: 'SET_PARTS';
	payload: {
		parts: PartsListApiResponse
	};
};

export type StateActions = CartAction | CartEmptyAction | PartsAction;

export const reducer = (
	state: AppState,
	action: StateActions
): AppState => {
	switch (action.type) {
	case 'ADD_TO_CART':
		return { ...state, cart: action.payload };
	case 'EMPTY_CART':
		return { ...state, cart: {
			price: 0
		} };
	case 'SET_PARTS':
		return { ...state, parts: action.payload.parts };
	}
	return state;
};