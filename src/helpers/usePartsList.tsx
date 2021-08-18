// import axios from 'axios';
import { useState, useEffect } from 'react';
import { PartsListApiResponse } from 'helpers/types';
import { demoData } from 'helpers/demo-data';

type Status = 'unloaded' | 'loading' | 'loaded';

export default function usePartsList(): [PartsListApiResponse, Status] {
	const [partsList, setPartsList] = useState({} as PartsListApiResponse);
	const [status, setStatus] = useState('unloaded' as Status);

	async function requestPartsList() {
		setStatus('loading');
		// const res = await axios.get(
		// 	'http://localhost:8081/api/parts'
		// );
		setTimeout(() => {
			const data = demoData as PartsListApiResponse;
			setPartsList(data);
			setStatus('loaded');
		}, 500);
	}

	useEffect(() => {
		void requestPartsList();
	}, []);

	return [partsList, status];
}
