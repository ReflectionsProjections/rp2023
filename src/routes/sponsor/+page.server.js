import { redirect } from '@sveltejs/kit';

export function load() {
    throw redirect(302, 'https://drive.google.com/file/d/1FZFJ73xpRquwTWB57BJWjLvXh-tE5hPv/view?usp=sharing');
}