import { API_URL } from '../constants';
import type { User } from '$lib/types';
import { get } from 'svelte/store';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ fetch }): Promise<{ user: User | null }> => {
	const url = get(API_URL);

	try {
		const check = await fetch(`${url}/auth/me`, {
			credentials: 'include',
			cache: 'no-cache'
		});

		if (check.status != 200) {
			return { user: null };
		}
		const user: User = await check.json();
		return {
			user
		};
	} catch (e) {
		return {
			user: null
		};
	}
};
