import {API_URL} from "../../constants"
import { get } from 'svelte/store'

// /** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let schedule = {}
	console.log("URL: ", get(API_URL))
    const response = await fetch(`${get(API_URL)}/events/schedule/days`, {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	if (response.ok) {
		schedule = await response.json();
		// console.log(schedule)
	} else {
		console.log("Error fetching events");
		schedule = {
			"monday": "error",
			"tuesday": "error",
			"wednesday": "error",
			"thursday": "error",
			"friday": "error"
		}
	}
    return {
        "schedule": schedule,
    };
}