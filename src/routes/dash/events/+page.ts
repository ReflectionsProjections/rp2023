import { API_URL } from '../../../constants';
import type { Event } from '$lib/types';
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const load: PageLoad<{ events: Event[] }> = async ({ fetch }) => {
	// TODO: Change to some access specific endpoint
	// TODO: Move to parent??
	const check = await fetch(`${API_URL}/auth/me`);

	// Not authorized or signed in:
	// They don't need to know this is an actual route.
	if (check.status == 403 || check.status == 401) {
		throw error(404, { message: 'Not found' });
	}

	const res = await fetch(`${API_URL}/events`);
	const events = await res.json();
	return { events };
};
