import { get } from 'svelte/store';
import { API_URL } from '../constants';
import type { Schedule } from '$lib/types';

export const load = async ({ fetch }): Promise<{ schedule: Schedule | null }> => {
	const url = get(API_URL);
	try {

		const response = await fetch(`${url}/events/schedule/days`);
		const body = await response.json();
		if (response.ok) {
			return {
				schedule: body
			};
		} else {
			console.error('Error while fetching schedule', response.status, response.statusText, body);
		}
	} catch (e) {
		console.error(String(e))
	}
	return {
		schedule: null
	};
};
