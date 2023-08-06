<script lang="ts">
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
	let majors = ['None', 'Computer Science', 'Computer Science + X', 'Computer Engineering', 'Electrical Engineering', 'Other'];
	let major_value = 'None';
	$: major_filters = new Set<string>();

	let show_majors = false;


	let grad_years = ['None', 'December 2023', 'May 2024', 'December 2024', 'May 2025', 'December 2025', 'May 2026', 'December 2026', 'May 2026', 'December 2027', 'May 2027 or later'];
	let grad_year_value = 'None';
	$: grad_year_filters = new Set<string>();

	let show_grad_year = false;

	let job_interests = ['None', 'Full-Time', 'Internship', 'Co-op'];
	let job_interest_value = 'None';
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
	let people: any = [];

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
	const fetchPeople = async () => {
         let response;

		 people = [
			{
				name: 'Atharva Naik',
				major: 'Math & CS',
				grad_year: '2024',
				job_interest: 'Full-Time',
				email: 'atharva.naik@reflectionsprojections.org'
			},
			{
				name: 'Saloni Vaishnav',
				major: 'Computer Science',
				grad_year: '2025',
				job_interest: 'Internship',
				email: 'saloni.vaishnav@reflectionsprojections.org'
			}]
        //  try {
		// 	// TODO: change url to actual api endpoint
        //      response = await fetch('${API_URL}/people');
        //      try {
        //          const jsonResponse = await response.json();

        //          if (response.ok) {
		// 			resume_url = jsonResponse;

		// 			// opent the url
		// 			window.open(resume_url, '_blank');
        //          } else {
        //              console.log(`Request returned an error: ${JSON.stringify(jsonResponse)}`);
        //          }
        //      } catch (e) {
        //          console.log(`Error parsing response: ${e}`);
        //      }
        //  } catch (e) {
        //      console.log(`Error making request: ${e}`);
        //  }
 	};

	fetchPeople();

	// currently not functioning bc endpoint in api not done
	// TODO: Tests with actual endpoint
	const fetchURl = async (emailToGET: string) => {
		console.log("trying to fetch url for: " + emailToGET);
         let response;
		 let resume_url;
         try {
             response = await fetch('${API_URL}/carp/email/${emailToGET}');
             try {
                 const jsonResponse = await response.json();

                 if (response.ok) {
					resume_url = jsonResponse;

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
		<GlassContainer>
			<h1 class="text-5xl" > Resume Viewer </h1>
		</GlassContainer>
	</div>

	<!-- Dropdowns for Filters-->
	<div class="flex flex-row mx-auto my-auto">	

		<!-- Majors Drop Down-->
		<div class="mx-auto my-auto text-gray-100 accent-rp-pink">
			<div class="mx-auto my-auto w-fit text-gray-100 accent-rp-pink">
				<GlassContainer>	
					<button class="" on:click={() => (show_majors = !show_majors)}> Filter By {major_filters.size} Major(s) </button>
				</GlassContainer>
			</div>

			{#if show_majors}
			<div class="fixed">
				<ul class="p-2 bg-opacity-25 bg-rp-dull-pink">
					{#each majors as major}
					<li id="major-check" class="flex flex-row hover:text-gray-300">
						<div  class="pr-3">
							<input type="checkbox" on:click={() => {
								onCheckBoxClick(major_filters, major, "major-check")
								major_filters = major_filters;
								}} />								
						</div>
						<div >{major}</div>
					</li>
					{/each}
				</ul>
			</div>
			{/if}
		</div>

		<!-- Grad_Year Drop Down-->
		<div class="mx-auto my-auto text-gray-100 accent-rp-pink">
			<div class="mx-auto my-auto w-fit p-1 text-gray-100 accent-rp-pink">
				<GlassContainer>	
					<button class="" on:click={() => (show_grad_year= !show_grad_year)}> Filter By {grad_year_filters.size} Graduation Year(s) </button>
				</GlassContainer>
			</div>

			{#if show_grad_year}
			<div class="fixed">
				<ul class="p-2 bg-opacity-25 bg-rp-dull-pink">
					{#each grad_years as grad_year}
					<li class="flex flex-row hover:text-gray-300">
						<div id="grad-year-check" class="pr-3">
							<input type="checkbox" on:click={() => {
								onCheckBoxClick(grad_year_filters, grad_year, "grad-year-check")
								grad_year_filters = grad_year_filters;
								}} />
						</div>
						<div >{grad_year}</div>
					</li>
					{/each}
				</ul>
			</div>
			{/if}
		</div>

		<!-- Job Interest -->
		<div class="mx-auto my-auto text-gray-100 accent-rp-pink">
			<div class="mx-auto my-auto w-fit p-1 text-gray-100 accent-rp-pink">
				<GlassContainer>	
					<button class="" on:click={() => (show_job_interest = !show_job_interest)}> Filter By {job_interest_filters.size} Job Interests(s) </button>
				</GlassContainer>
			</div>

			{#if show_job_interest}
			<div class="fixed">
				<ul class="p-2 bg-opacity-25 bg-rp-dull-pink">
					{#each job_interests as job_interest}
					<li class="flex flex-row hover:text-gray-300">
						<div id="job-interest-check" class="pr-3">
						<input type="checkbox" on:click={() => {
							onCheckBoxClick(job_interest_filters, job_interest, "job-interest-check")
							job_interest_filters = job_interest_filters;
							}} />
						</div>
						<div >{job_interest}</div>
					</li>
					{/each}
				</ul>
			</div>
			{/if}
		</div>
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
				{#each people as person}
					<tr>
						<td contenteditable="false" bind:innerHTML={person.name} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:innerHTML={person.name} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:innerHTML={person.major} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:textContent={person.grad_year} class =" w-56 p-2"></td>
						<td contenteditable="false" bind:textContent={person.job_interest} class =" w-56 p-2"></td>
						<button on:click={() => fetchURl(person.email)} >Access Resume</button>
					</tr>
				 {/each}
			</tbody>
		</table>
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

</main>

<style>
	input {
		padding: 0.25rem;
	}
</style>
