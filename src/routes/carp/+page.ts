import { error } from '@sveltejs/kit';
import { API_URL } from '../../constants';
import type { PageLoad } from './$types';
import { get } from 'svelte/store';

export const load: PageLoad<void> = async ({ fetch }) => {

    const url = get(API_URL);
	const check = await fetch(`${url}/auth/access/corporate`, {
		credentials: 'include'
	});

	// Not authorized or signed in:
	// They don't need to know this is an actual route.
	if (check.status == 403 || check.status == 401) {
		throw error(404, { message: 'Not found' });
	}
};

export const ssr = false;