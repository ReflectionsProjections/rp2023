<script lang="ts">
	// we'll pull from a database later, this is just for testing/reference
	let events: any = [];
	let sample_id = "autogen";
	let sample_name = "mf test";
	let sample_startTime = "2019-09-26T05:58:30.996Z";
	let sample_duration = "3";
	let sample_location = "siebel";
	let sample_description = "testing test";
	let sample_isVirtual = "false";

	const fetchEvents = async () => {
		const response = await fetch('http://127.0.0.1:3000/events');
		events = await response.json();
		// console.log("I'm alive", events);
		// console.log(events);
	};

	fetchEvents();

	// const response = fetch(url).then((response) => response.json())
	// events = response.json();


	const columns = ['id', 'Name', 'Description', 'Start Time', 'Duration', 'Location', "Is Virtual", "Action"];
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
		console.log(response.status);
	}

	async function editEventRequest(json: any, id:string) {
		let url = `http://127.0.0.1:3000/events/${id}`;
		console.log(url, json, id);
		const resp = await fetch(url, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(json)
		});
		console.log(resp.status);
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
		fetchEvents();
		// alert('you created an event! (placeholder) please refresh to see changes!');
		


	}
	function editEvent(id: string, name: string, description: string, start_time: string, duration:string, location:string, virtual:string) {
		console.log("ive reached here at least");
		let json = {
			"name": name,
			"description": description,
			"start_time": start_time,
			"duration": Number(duration),
			"location": location,
			"virtual": Boolean(virtual)
		}
		editEventRequest(json, id);
		fetchEvents();
		// alert('you edited an event! (placeholder')
	}
</script>

<div>Welcome to Event Details!</div>
<div class= "text-white">Click on a field to edit event details</div>

<div class = "p-10">

	<table class=" text-center overflow-x-scroll  ">
		<thead>
			<tr>
				{#each columns as column}
					<th>{column}</th>
				{/each}
			</tr>
		</thead>
		<tbody >
			{#each events as event}
				<tr>
					<td contenteditable="false" bind:innerHTML={event._id}></td>
					<td contenteditable="true" bind:innerHTML={event.name} class =" w-56 p-2"></td>
					<td contenteditable="true" bind:innerHTML={event.description}></td>
					<td contenteditable="true" bind:textContent={event.start_time}></td>
					<td contenteditable="true" bind:textContent={event.duration}></td>
					<td contenteditable="true" bind:innerHTML={event.location}></td>
					<td contenteditable="true" bind:textContent={event.virtual}></td>
					<button on:click={() => editEvent(event._id, event.name, event.description, event.start_time, event.duration, event.location, event.virtual)} >Save edits</button>
				</tr> 
			 {/each}
			<tr>

				<td contenteditable="false" bind:textContent={sample_id}></td>
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
