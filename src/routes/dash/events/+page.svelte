<script lang="ts">
	// we'll pull from a database later, this is just for testing/reference
	const events = [
		{
			name: 'test',
			description: 'test',
			startTime: '2023-04-21T18:00',
			duration: 1,
			location: 'test',
			isVirtual: 'yes'
		},
		{
			name: 'test2',
			description: 'test2',
			startTime: '2023-04-21T18:00',
			duration: 2.5,
			location: 'test2',
			isVirtual: 'no'
		}
	]; 
	const columns = ['Name', 'Description', 'Start Time', 'Duration', 'Location', "Is Virtual"];
	var newRow = columns;
    function createEvent(e: SubmitEvent) {
		alert('you created an event! (placeholder)');
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
				{#each newRow as column}
					<td contenteditable="true" bind:innerHTML={column} style="color: grey"/>
				{/each}
				<button on:click={createEvent} >Create New Event</button>
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
