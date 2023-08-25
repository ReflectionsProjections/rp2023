<script lang="ts">
	import Icon from '@iconify/svelte';
	import GlassContainer from '../../components/glass-container.svelte';
	import IsaCollegeStudent from '../../components/registration/is-college-student.svelte';
	import PageControls from '../../components/registration/page-controls.svelte';
	// import { API_URL } from '../../constants';
	import { onMount } from 'svelte';

	// // TODO update this w actual schema
	// // TODO connect with actual API call
	// let schema=[
	// 	{label: 'Name', key: 'name'},
	// 	{label: 'Major', key: 'major'},
	// 	{label: 'Graduation Year', key: 'grad_year'},
	// 	{label: 'Job Interest', key: 'job_interest'},
	// 	{label: 'Resume', key: 'resume'}
	// ]

	// DROP DOWNS
	// TODO add functionality to fetch majors, grad years, and job interests
	let majors = ['Computer Science', 'CS + X', 'Electrical & Computer Engineering', 'Other'];
	$: major_filters = new Set<string>();

	let show_majors = false;


	let grad_years = ['Fall 2023', 'Spring 2024', 'Summer 2024', 'Fall 2024', 'Spring 2025', 'Summer 2025', 'Fall 2025', 'Spring 2026', 'Summer 2026', 'Fall 2026', 'Spring 2027', 'Summer 2027', 'Fall 2027'];
	$: grad_year_filters = new Set<string>();

	let show_grad_year = false;

	let job_interests = ['full-time', 'internship', 'co-op'];
	$: job_interest_filters = new Set<string>();

	let show_job_interest = false;

	function onCheckBoxClick(filters: Set<string>, item: string, div_id: string) {
		if (item == 'None') {
			filters.clear();
			var checks = document.querySelectorAll('#' + div_id + ' input[type="checkbox"]');
			for(var i =0; i< checks.length;i++){
				(<HTMLInputElement>checks[i]).checked = false
			}
		} else if (filters.has(item))  {
			filters.delete(item);
		} else {
			filters.add(item);
		}
	}

	// TABLE
	const columns = ['Name', 'Major', 'Graduation Year', 'Job Interest', 'Resume'];
	let attendees: any = [];
	let filtered_attendees: any = [];

	function showAttendee(major: string, grad_year: string, job_interest: any) {

		let show_me: Boolean = true
		if (major_filters.size != 0 && !major_filters.has(major)) {
			show_me = false
		}

		if (grad_year_filters.size != 0 && !grad_year_filters.has(grad_year)) {
			show_me = false
		}

		let job_check = false;
		for (const job of job_interest) {
			if (job_interest_filters.size != 0 && job_interest_filters.has(job)) {
				job_check = true
			}
		}

		if (!job_check) {
			show_me = false
		}


		return show_me;
	}

	function applyFilters() {
		filtered_attendees = []
		for (const curr_attendee of attendees) {
			if (showAttendee(curr_attendee.studentInfo.major, curr_attendee.studentInfo.graduation, curr_attendee.job_interest)) {
				filtered_attendees.push(curr_attendee);
			}
		}

	} 

	// type TableRow = {
	// 	name: string;
	// 	major: string;
	// 	grad_year: string;
	// 	job_interest: string;
	// 	resume_url: string;
	// };

	// let items: TableRow[] = [];
	// let rowsPerPage = 10;
	// let currentPage = 0;

	// $: start = currentPage * rowsPerPage;
	// $: end = Math.min(start + rowsPerPage, items.length);
	// $: slice = items.slice(start, end);
	// $: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

	// $: if (currentPage > lastPage) {
	// 	currentPage = lastPage;
	// }

	const API_URL = "http://localhost:3000";

	// TODO: actually make this functional
	const fetchAttendees = async () => {
         let response;

		//  // dummy data for now
		//  attendees = [
		// 	{
		// 		name: 'Atharva Naik',
		// 		studentInfo : {
		// 			major: 'CS + X',
		// 			graduation: 'Spring 2024',
		// 		},
		// 		job_interest: 'Full-Time',
		// 		email: 'atharva.naik@reflectionsprojections.org'
		// 	},
		// 	{
		// 		name: 'Saloni Vaishnav',
		// 		studentInfo : {
		// 			major: 'Computer Science',
		// 			graduation: 'Spring 2025',
		// 		},
		// 		job_interest: 'Internship',
		// 		email: 'saloni.vaishnav@reflectionsprojections.org'
		// 	}, 
		// 	{
		// 		name: 'Bob Jones',
		// 		studentInfo : {
		// 			major: 'Computer Science',
		// 			graduation: 'Spring 2024',
		// 		},
		// 		job_interest: 'Full-Time',
		// 		email: 'bob.jones@something.com'
		// 	}]
         try {
			// TODO: change url to actual api endpoint
             response = await fetch(`${API_URL}/attendee`);
             try {
                 const jsonResponse = await response.json();

                 if (response.ok) {
					attendees = jsonResponse;
					filtered_attendees = attendees;
					console.log("attendees " + attendees)
                 } else {
                     console.log(`Request returned an error: ${JSON.stringify(jsonResponse)}`);
                 }
             } catch (e) {
                 console.log(`Error parsing response: ${e}`);
             }
         } catch (e) {
             console.log(`Error making request: ${e}`);
         }
 	};

	fetchAttendees();

	// currently not functioning bc endpoint in api not done
	// TODO: Tests with actual endpoint
	const fetchURl = async (attendeeId: string) => {
		console.log("trying to fetch url for: " + attendeeId);
         let response;
		 let resume_url;
         try {
             response = await fetch(`${API_URL}/carp/resume/${attendeeId}`);
             try {
                 const jsonResponse = await response.json();

                 if (response.ok) {
					resume_url = jsonResponse.url;

					// opent the url
					window.open(resume_url, '_blank');
                 } else {
                     console.log(`Request returned an error: ${JSON.stringify(jsonResponse)}`);
                 }
             } catch (e) {
                 console.log(`Error parsing response: ${e}`);
             }
         } catch (e) {
             console.log(`Error making request: ${e}`);
         }
 	};

	// TODO: call this when open url for a specific one is pressed
	// fetchURl("contact@reflectionsprojections.org");

	// if (typeof fetch !== 'undefined') {
	// 	// Slice a few off the end to show how the
	// 	// last page looks when it's not full.
	// 	fetch(
	// 	'https://gist.githubusercontent.com/hperrin/e24a4ebd9afdf2a8c283338ae5160a62/raw/dcbf8e6382db49b0dcab70b22f56b1cc444f26d4/todos.json'
	// 	)
	// 	.then((response) => response.json())
	// 	.then((json) => (items = json));
	// }
	
</script>

<main class="flex flex-col h-full">		
	<div class="mx-auto my-auto w-fit text-gray-100 accent-rp-pink">
			<h1 class="text-5xl" > R|P 2023 Resume Book </h1>
	</div>

	

	<!-- <div class="mx-auto my-auto text-gray-100">
		Filtered By:
		{#each grad_year_filters as grad_year}
		<div>
			{grad_year} 
		</div>
		{/each}

		{#each major_filters as major}
		<div>
			{major}
		</div>
		{/each}
	</div> -->

	<div class="h-full text-white flex justify-between flex-col my-20">
		<div
			class="bg-black bg-opacity-10 rounded-lg p-3 md:p-7 mx-auto w-full md:w-10/12 lg:w-11/12 text-sm md:text-base"
		>
		<div class="flex flex-row">
			<h1 class="text-xl mb-3 p-2 font-serif">Attendee Resumes</h1>
			
			<!-- Dropdowns for Filters-->
			<div class="flex flex-row mx-auto my-auto">	

				<!-- Majors Drop Down-->
				<div class="mx-5 my-auto text-gray-100 accent-rp-pink">
					<div class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min">
						
							<button class="" on:click={() => (show_majors = !show_majors)}> Filter By {major_filters.size} Major(s) </button>
					</div>

					{#if show_majors}
					<div class="fixed">
						<ul class="p-2 bg-opacity-4 rounded-md bg-gray-900">
							{#each majors as major}
							<li id="major-check" class="flex flex-row hover:text-gray-300">
								<div class="flex flex-row">
									<input type="button" value={major} on:click={() => {
										onCheckBoxClick(major_filters, major, "major-check")
										major_filters = major_filters;
										}} />	
									{#if major_filters.has(major)}
										<Icon class="align-end pt-2" icon="ion:checkmark" width="24"/> 
									{/if}						
								</div>
							</li>
							{/each}
						</ul>
					</div>
					{/if}
				</div>

				<!-- Grad_Year Drop Down-->
				<div class="mx-5 my-auto text-gray-100 accent-rp-pink">
					<div class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min">
							<button class="" on:click={() => (show_grad_year= !show_grad_year)}> Filter By {grad_year_filters.size} Graduation Year(s) </button>
					</div>

					{#if show_grad_year}
					<div class="fixed">
						<ul class="p-2 bg-opacity-4 rounded-md bg-gray-900">
							{#each grad_years as grad_year}
							<li class="flex flex-row hover:text-gray-300">
								<div id="grad-year-check" class="flex flex-row">
									<input type=button value={grad_year} on:click={() => {
										onCheckBoxClick(grad_year_filters, grad_year, "grad-year-check")
										grad_year_filters = grad_year_filters;
										}} />
										{#if grad_year_filters.has(grad_year)}
											<Icon class="align-end pt-2" icon="ion:checkmark" width="24"/> 
										{/if}
								</div>
							</li>
							{/each}
						</ul>
					</div>
					{/if}
				</div>

				<!-- Job Interest -->
				<div class="mx-5 my-auto text-gray-100 accent-rp-pink">
					<div class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min">
							<button class="" on:click={() => (show_job_interest = !show_job_interest)}> Filter By {job_interest_filters.size} Job Interests(s) </button>
					</div>

					{#if show_job_interest}
					<div class="fixed">
						<ul class="p-2 bg-opacity-4 rounded-md bg-gray-900">
							{#each job_interests as job_interest}
							<li class="flex flex-row hover:text-gray-300">
								<div class="flex flex-row" id="job-interest-check">
								<input type=button value={job_interest} on:click={() => {
									onCheckBoxClick(job_interest_filters, job_interest, "job-interest-check")
									job_interest_filters = job_interest_filters;
									}} />
								{#if job_interest_filters.has(job_interest)}
									<Icon class="align-end pt-2" icon="ion:checkmark" width="24"/> 
								{/if}
								</div>
							</li>
							{/each}
						</ul>
					</div>
					{/if}
				</div>

				<!-- Save Button -->
				<div class="justify-self-end mx-36 my-auto text-gray-100 accent-rp-pink">
					<div class="py-1 px-3 bg-pink-800 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min">
							<button class="" on:click={() => applyFilters()}> Save </button>
					</div>
				</div>
			</div>
		</div>

		<div class="p-3 bg-white bg-opacity-10 rounded-md overflow-x-auto">
			<table class="w-full table-auto border-spacing-10 border-collapse border-hidden">
				<thead class="text-left tracking-wider">
						{#each columns as column}
							<th>{column}</th>
						{/each}
				</thead>
				<tbody >
					{#each filtered_attendees as attendee}
						<tr class="bg-opacity-0 hover:bg-opacity-10 bg-black duration-300">
							<td contenteditable="false" bind:innerHTML={attendee.name} class =" w-56 p-2"></td>
							<td contenteditable="false" bind:innerHTML={attendee.studentInfo.major} class =" w-56 p-2"></td>
							<td contenteditable="false" bind:textContent={attendee.studentInfo.graduation} class =" w-56 p-2"></td>
							<td contenteditable="false" bind:textContent={attendee.job_interest} class =" w-56 p-2"></td>
							<td>
								<div class="rounded-md p-2">
									<button aria-label="" on:click={() => fetchURl(attendee._id)} >
										<Icon icon="bx:file" width="24"/> 
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
<!-- 
	<div class="flex flex-col h-full w-9/12 mx-auto my-auto">
		<GlassContainer>
			<table class="table-auto text-white text-left mx-auto my-auto">
				<thead class="font-bold">
					<tr>
						{#each schema as column}
							<th>{column.label}</th>
						{/each}
					</tr>
				</thead>
				<tbody>
					{#each temp_items as item}
					<tr>
						{#each schema as column}
							<td>{item[column.key]}</td>
						{/each}
					</tr>
					{/each}
				</tbody>
			</table>
		</GlassContainer>
	</div> -->

	<!-- <div class = "p-10">

		<table class=" text-center overflow-x-scroll  ">
			<thead>
				<tr>
					{#each columns as column}
						<th>{column}</th>
					{/each}
				</tr>
			</thead>
			<tbody >
				{#each attendees as attendee}
					<tr>
						<td contenteditable="false" bind:innerHTML={attendee.name} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:innerHTML={attendee.name} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:innerHTML={attendee.major} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:textContent={attendee.grad_year} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:textContent={attendee.job_interest} class =" w-56 p-2"></td>
						<button on:click={() => fetchURl(attendee.email)} >Access Resume</button>
					</tr>
				 {/each}
			</tbody>
		</table>
	</div> -->

</main>

<style>
	input {
		padding: 0.25rem;
	}
</style>
