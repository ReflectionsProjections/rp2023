import { API_URL } from '../constants';
import type { User } from '$lib/types';
import { get } from 'svelte/store';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ fetch }): Promise<{ user: User | null, schedule: { [key: string]: any } | null }> => {
	const url = get(API_URL);
	let user: User | null;
	let schedule: { [key: string]: any } | null;
	try {
		const check = await fetch(`${url}/auth/me`, {
			credentials: 'include',
			cache: 'no-cache'
		});

		if (check.status != 200) {
			user = null;
		}
		user = await check.json();
		
	} catch (e) {
		user = null;
	}

	try {
		const response = await fetch(`${url}/events/schedule/days`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			schedule = await response.json();
		} else {
			schedule = null;
		}
	} catch (e) {
		schedule = null;
	}

	return {
		user,
		schedule
	}
};

export const ssr = false;
