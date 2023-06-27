import { redirect } from '@sveltejs/kit';

export function load() {
    throw redirect(302, '/sponsor.pdf'); // used to be sponsor-terms
}