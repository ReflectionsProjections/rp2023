<script lang="ts">
	let events: any = [];

	let eventName: string;

	const fetchEvents = async () => {
		const response = await fetch('http://localhost:3000/events');
		events = await response.json();
		console.log("I'm alive", events);
	};

	const onClick = async () => {
		const response = await fetch('http://localhost:3000/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: eventName })
		});
		console.log(response);
		eventName = '';
		fetchEvents();
	};

	fetchEvents();
</script>

<div class="flex flex-col m-10">
	<div>
		<input type="text" bind:value={eventName} />
		<button class="p-2 bg-gray-200" on:click={onClick}>Add new event</button>
	</div>

	<div>
		{#each events as event}
			<div class="w-96 h-50 m-5 p-5 bg-slate-300 rounded-md">{event.name}</div>
		{/each}
	</div>
</div>
