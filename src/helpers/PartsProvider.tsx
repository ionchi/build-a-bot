import React, { createContext, useEffect, useReducer } from 'react';
import { AcmeBot, AppState, PartsListApiResponse } from 'helpers/types';
import { reducer, StateActions } from 'helpers/reducer';
import usePartsList from 'helpers/usePartsList';

interface AppContextType extends AppState {
	dispatch: React.Dispatch<StateActions>;
}

const initialState: AppState = {
	cart: {
		bot: {} as AcmeBot,
		price: 0
	},
	parts: {} as PartsListApiResponse
};

export const AppContext = createContext<AppContextType>(
	initialState as AppContextType
);

type PartsProps = { children: React.ReactNode };

const PartsProvider = ({ children }: PartsProps) => {
	const [parts, status] = usePartsList();
	const [state, dispatch] = useReducer(reducer, {
		cart: { bot: {} as AcmeBot, price: 0 },
		parts
	});

	useEffect(() => {
		if (status === 'loaded' && parts) {
			dispatch({ type: 'SET_PARTS', payload: { parts } });
		}
	}, [status]);

	return (
		<AppContext.Provider value={ { ...state, dispatch } }>
			{children}
		</AppContext.Provider>
	);
};

export default PartsProvider;