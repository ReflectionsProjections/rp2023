import {API_URL} from "../../constants"

// /** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let schedule = {}
    const response = await fetch(`${API_URL}/events/schedule/days`, {
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
	let heights = [];
	for (let i = 0; i < 52; i++) {
		heights[i] = `h-${i * 8}`;
	}
    return {
        "schedule": schedule,
		"colours": ["bg-red-500", "bg-violet-500", "bg-blue-500", "bg-pink-500"],
		"heights": heights
    };
}