import { redirect } from '@sveltejs/kit';
export function load() {
    throw redirect(302, '/sponsor.pdf');
}
//# sourceMappingURL=+page.server.js.map