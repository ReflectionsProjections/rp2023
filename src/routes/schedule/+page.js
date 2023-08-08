// /** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let schedule = {}
    const response = await fetch("http://localhost:3000/events/schedule/days", {
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
		"colours": ["bg-red-400", "bg-violet-400", "bg-blue-400", "bg-pink-400"],
		"heights": heights
    };
}