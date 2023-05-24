<script lang="ts">
	// we'll pull from a database later, this is just for testing/reference
	let events: any = [];
	let sample_name = "mf test";
	let sample_startTime = "2019-09-26T05:58:30.996Z";
	let sample_duration = "3";
	let sample_location = "siebel";
	let sample_description = "testing test";
	let sample_isVirtual = "false";

	const fetchEvents = async () => {
		const response = await fetch('http://127.0.0.1:3000/events');
		events = await response.json();
		console.log("I'm alive", events);
		// console.log(events);
	};

	fetchEvents();

	// const response = fetch(url).then((response) => response.json())
	// events = response.json();


	const columns = ['Name', 'Description', 'Start Time', 'Duration', 'Location', "Is Virtual"];
	var newRow = columns;

	async function postData(json: any) {
		const url = "http://127.0.0.1:3000/events";
		const response = await fetch(url, {
			method: 'POST',
			headers: {
			'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		});
	}
	// function createEvent(e: SubmitEvent) {
    function createEvent(name: string, description: string, start_time: string, duration:string, location:string, virtual:string) {
		let json = {
			"name": name,
			"description": description,
			"start_time": start_time,
			"duration": Number(duration),
			"location": location,
			"virtual": Boolean(virtual)
		}
		postData(json);
		alert('you created an event! (placeholder) please refresh to see changes!');
		


	}
	function editEvent() {
		alert('you edited an event! (placeholder')
	}
</script>

<div>Welcome to Event Details!</div>
<div>Click on a field to edit event details</div>

<div>

	<table width="100%" style="text-align: center">
		<thead>
			<tr>
				{#each columns as column}
					<th>{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each events as event}
				<tr>
					<td contenteditable="true" bind:innerHTML={event.name}></td>
					<td contenteditable="true" bind:innerHTML={event.description}></td>
					<td contenteditable="true" bind:innerHTML={event.startTime}></td>
					<td contenteditable="true" bind:innerHTML={event.duration}></td>
					<td contenteditable="true" bind:innerHTML={event.location}></td>
					<td contenteditable="true" bind:innerHTML={event.isVirtual}></td>
					<button on:click={editEvent}>Save edits</button>
				</tr> 
			 {/each}
			<tr>

				
				<td contenteditable="true" bind:textContent={sample_name}></td>
				<td contenteditable="true" bind:textContent={sample_description}></td>
				<td contenteditable="true" bind:textContent={sample_startTime}></td>
				<td contenteditable="true" bind:textContent={sample_duration}></td>
				<td contenteditable="true" bind:textContent={sample_location}></td>
				<td contenteditable="true" bind:textContent={sample_isVirtual}></td>
				
				<!-- <input bind:value={sample_name} placeholder="Enter input value" /> -->
				<button on:click={() => createEvent(sample_name, sample_description, sample_startTime, sample_duration, sample_location, sample_isVirtual)} >Create New Event</button>
			</tr>
		</tbody>
	</table>
</div>

<!-- <div> FORM if we would rather use a form to add events (stricter input validation/formatting)
    <form on:submit|preventDefault={onSubmit}>
        <div>
            <label for="name">Event Name: </label>
            <input type="text" id="name" bind:value={formValues.name} required />
        </div>
        <div>
            <label for="description">Event Description: </label>
            <input type="text" id="description" bind:value={formValues.description} required />
        </div>
        <div>
            <label for="startTime">Start Time: </label>
            <input type="datetime-local" id="startTime" bind:value={formValues.startTime} required />
        </div>
        <div>
            <label for="duration">Duration (in hours): </label>
            <input type="number" step="any" id="name" bind:value={formValues.duration} required />
        </div>
        <div>
            <label for="location">Location: </label>
            <input type="text" id="location" bind:value={formValues.location} required />
        </div>
        <div>
            <label for="isVirtual">Is this virtual? </label>
            <select id="isVirtual" bind:value={formValues.isVirtual}>
                <option value="">Choose One</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
        </div>

        <button type="submit">Create Event!</button>
    </form>
</div> -->


<style>
	div {
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
