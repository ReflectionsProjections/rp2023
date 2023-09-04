import { API_URL } from '../constants';
import type { User } from '$lib/types';
import { get } from 'svelte/store';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ fetch }): Promise<{ user: User | null}> => {
	const url = get(API_URL);
	let user: User | null;
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

	

	return {
		user
	}
};

export const ssr = false;
