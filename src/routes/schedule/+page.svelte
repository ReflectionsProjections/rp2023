<script lang='ts'>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import svgLogo from '../../assets/rp-logo.svg';
	import GlassContainer from '../../components/glass-container.svelte';

	import { API_URL } from '../../constants';

	let day = '';
	let schedule = {};
	let day_events_list = {};
	// Schedule of events; should be in the format of Monday: List_of_events, Tuesday: List_of_events, etc..
	// Events have: name, description, start_time, duration, location, virtual

	onMount(async() => {
		const response = await fetch("http://localhost:3000/events/schedule/days", {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		if (response.ok) {
			schedule = await response.json();
			console.log(schedule)
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
	})

	const getSchedule = async () => {
		const response = await fetch('${API_URL}/events', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const data = await response.json();
		const schedule = data;
	};

	function toDate(input: String) {
		return new Date(input);
	}

	function dayButtonClick(event: MouseEvent) {
		const target = event.currentTarget as HTMLButtonElement;
		day = target.id.toLowerCase();
		console.log(day);

		day_events_list = schedule[day]
		// console.log(day_events_list);
	}

</script>

<div class="h-full flex items-center">
	<div class="mx-auto h-[50%] w-[50%] bg-black">
		<div class="mx-auto grid grid-cols-5 text-center gap-2 bg-gray-200 justify-around text-black text-xl border-8">
			<div class = "border-4 bg-gray-100 py-4"><button id="Monday" on:click = {dayButtonClick}>Monday</button></div>
			<div class = "border-4 bg-gray-100 py-4"><button id="Tuesday" on:click = {dayButtonClick}>Tuesday</button></div>
			<div class = "border-4 bg-gray-100 py-4"><button id="Wednesday" on:click = {dayButtonClick}>Wednesday</button></div>
			<div class = "border-4 bg-gray-100 py-4"><button id="Thursday" on:click = {dayButtonClick}>Thursday</button></div>
			<div class = "border-4 bg-gray-100 py-4"><button id="Friday" on:click = {dayButtonClick}>Friday</button></div>
		</div>
		<!-- update this to iterate through the day's event list and disiplay info for each event-->
		<div class="h-full w-full bg-red-50 px-4 pb-4 pt-2">
			<ul>
				{#each Object.entries(day_events_list) as [key, value]}
					<div class="event text-lg  pt-1">
						<p><strong>Name:</strong> {value.name}</p>
						<p><strong>Description:</strong> {value.description}</p>
						<p class = "pb-2"><strong>Info:</strong> {`${toDate(value.start_time).toLocaleString([], { month: 'long' })} ${toDate(value.start_time).getDate()} @ ${toDate(value.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</p>
						<hr class = "pt-2 bg-black-200"/>
					</div>
				{/each}
			</ul>
		</div>
	</div>
</div>
