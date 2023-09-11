// TODO ADD check for node_env
import { readable } from 'svelte/store';
import { env } from '$env/dynamic/public';

const API_URL_MAP: { [key: string]: string } = {
	dev: 'http://localhost:3000',
	development: 'http://localhost:3000',
	staging: 'https://api.reflectionsprojections.org', // Overriding for black
	prod: 'https://api.reflectionsprojections.org',
	production: 'https://api.reflectionsprojections.org'
};

const DEFAULT_STAGE = 'dev';

export const API_URL = readable(API_URL_MAP[DEFAULT_STAGE], function start(set) {
	const stage = env.PUBLIC_STAGE || DEFAULT_STAGE;
	console.info('Found Stage: ', env.PUBLIC_STAGE);
	set(API_URL_MAP[stage]);
	return () => API_URL_MAP[DEFAULT_STAGE];
});

export default {};
