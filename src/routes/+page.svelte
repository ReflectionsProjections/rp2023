<script lang='ts'>
	import Icon from '@iconify/svelte';
	import svgLogo from '../assets/rp-logo.svg';
	import ShootingStar from '../components/shooting-star.svelte';
	import GlassContainer from '../components/glass-container.svelte';

	import { API_URL } from '../constants';

	let day = '';
	let schedule = {};
	let day_events_list = {};
	// Schedule of events; should be in the format of Monday: List_of_events, Tuesday: List_of_events, etc..
	// Events have: name, description, start_time, duration, location, virtual

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

	function dayButtonClick(event: MouseEvent) {
		const target = event.currentTarget as HTMLButtonElement;
		day = target.id;
		console.log(day);

		// day_events_list = schedule.name_of_day
		day_events_list = {
			"Name": "Hackathon",
			"Description": "a hackathon",
			"Start Time": "12:00am",
			"Duration": "48 hours",
			"Location": "Siebel",
			"Virtual": "Yes",
			"Name2": "Hackathon",
			"Description2": "a hackathon",
			"Start Time2": "12:00am",
			"Duration2": "48 hours",
			"Location2": "Siebel",
			"Virtual2": "Yes",
			"Name3": "Hackathon",
			"Description3": "a hackathon",
			"Start Time3": "12:00am",
			"Duration3": "48 hours",
			"Location3": "Siebel",
			"Virtual3": "Yes"
		}
		console.log(day_events_list);
	}

</script>

<!-- Put in tmp hero component/Replace with final-->
<div class="h-full text-white flex items-center">
	<span class="w-full">
		<h1 class="w-full text-center text-2xl sm:text-5xl lg:text-7xl mb-6">reflections | projections</h1>
		<div class="text-center text-md sm:text-2xl lg:text-4xl uppercase mb-6">September 18 - 22, 2023</div>
		<button class="uppercase bg-white text-black text-center block mx-auto text-sm md:text-md p-4">Register</button>
	</span>
</div>

<div class="mx-auto h-[50%] w-[75%] bg-black">
	<div class="mx-auto flex flex-row bg-white justify-around">
		<div><button id="Monday" on:click = {dayButtonClick}>Monday</button></div>
		<div><button id="Tuesday" on:click = {dayButtonClick}>Tuesday</button></div>
		<div><button id="Wednesday" on:click = {dayButtonClick}>Wednesday</button></div>
		<div><button id="Friday" on:click = {dayButtonClick}>Friday</button></div>
	</div>
	<!-- update this to iterate through the day's event list and disiplay info for each event-->
	<div class="h-full w-full bg-red-50">
		<ul>
			{#each Object.entries(day_events_list) as [key, value]}
				<li class="mb-2"><strong class="mr-2">{key}:</strong> {value}</li>
			{/each}
		</ul>
	</div>
</div>