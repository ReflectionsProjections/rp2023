<script lang="ts">
	import Icon from '@iconify/svelte';
	import { API_URL } from '../../constants';
    import { onMount } from 'svelte';

	const major_dict = new Map([
		['cs', 'Computer Science'],
		['ece', 'Electrical & Computer Engineering'],
		['cs+', 'CS + X'],
		['other', 'Other']
	]);
	const major_id_dict = new Map([
		['Computer Science', 'cs'],
		['Electrical & Computer Engineering', 'ece'],
		['CS + X', 'cs+'],
		['Other', 'other']
	]);

	// DROP DOWNS
	let majors = ['Computer Science', 'CS + X', 'Electrical & Computer Engineering', 'Other'];
	$: major_filters = new Set<string>();

	let show_majors = false;

	let grad_years = [
		'Fall 2023',
		'Spring 2024',
		'Summer 2024',
		'Fall 2024',
		'Spring 2025',
		'Summer 2025',
		'Fall 2025',
		'Spring 2026',
		'Summer 2026',
		'Fall 2026',
		'Spring 2027',
		'Summer 2027',
		'Fall 2027'
	];
	$: grad_year_filters = new Set<string>();

	let show_grad_year = false;

	let job_interests = ['full-time', 'internship', 'co-op'];
	$: job_interest_filters = new Set<string>();

	let show_job_interest = false;

	let show_filters_modal: boolean;

	let page: number = 1;
	let first_page: number = 1;
	let last_page: number = 1;

	const next_page = async () => {
		page++;
		await fetchFilteredAttendees(page);
	};

	const prev_page = async () => {
		page--;
		await fetchFilteredAttendees(page);
	};

	function onCheckBoxClick(filters: Set<string>, item: string, div_id: string) {
		if (item == 'None') {
			filters.clear();
			var checks = document.querySelectorAll('#' + div_id + ' input[type="checkbox"]');
			for (var i = 0; i < checks.length; i++) {
				(<HTMLInputElement>checks[i]).checked = false;
			}
		} else if (filters.has(item)) {
			filters.delete(item);
		} else {
			filters.add(item);
		}
	}

	// TABLE
	const columns = ['Name', 'Major', 'Graduation Year', 'Job Interest', 'Resume'];
	let filtered_attendees: any = [];

	const fetchFilteredAttendees = async (page_to_fetch: number) => {
		let response;
		try {
			let majors = [...major_filters].join(',').replace('&', 'and');
            let years = [...grad_year_filters].join(',')
            let jobs = [...job_interest_filters].join(',')

            let major_uri = encodeURIComponent(majors);
            let year_uri = encodeURIComponent(years);
            let job_uri = encodeURIComponent(jobs);

			response = await fetch(
				`${$API_URL}/carp/filter?majors=${major_uri}&years=${year_uri}&jobs=${job_uri}&page=${page_to_fetch}`,
				{
					credentials: "include",
					cache: 'no-cache'
				}
			);

			try {
				const jsonResponse = await response.json();
				if (response.ok) {
					filtered_attendees = jsonResponse.attendees;
					last_page = jsonResponse.num_pages;
					page = jsonResponse.curr_page;
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

	const fetchAttendees = async () => {
		let response;

		try {
			response = await fetch(`${$API_URL}/carp/filter?majors=&years=&jobs=&page=${1}`, {
					credentials: "include",
					cache: 'no-cache'
				});

			try {
				const jsonResponse = await response.json();
				if (response.ok) {
					filtered_attendees = jsonResponse.attendees;
					last_page = jsonResponse.num_pages;
					page = jsonResponse.curr_page;
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

	onMount(fetchAttendees);

	const fetchURl = async (attendeeId: string) => {
		console.log('trying to fetch url for: ' + attendeeId);
		let response;
		let resume_url;
		try {
			response = await fetch(`${$API_URL}/carp/resume/${attendeeId}`, {
					credentials: "include",
					cache: 'no-cache'
				});
			try {
				const jsonResponse = await response.json();

				if (response.ok) {
					resume_url = jsonResponse.url;

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

	function handleDownload() {
		alert('This functionality is not yet implemented. Check back soon!');
	}
</script>

<main class="flex flex-col h-full">
	<div class="h-full text-white flex justify-between flex-col my-20">
		<div
			class="bg-black bg-opacity-10 rounded-lg p-3 md:p-7 mx-auto w-full md:w-10/12 lg:w-11/12 text-sm md:text-base"
		>
			<div class="flex flex-row justify-between">
				<h1 class="text-xl mb-3 p-2 font-serif">Reflections | Projections 2023 Resume Book</h1>

				<div class="flex flex-row gap-5">
					<div class="justify-self-end my-auto text-gray-100 accent-rp-pink">
						<div
							class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min"
						>
							<button class="" on:click={handleDownload}> Export All </button>
						</div>
					</div>

					<!-- Dropdowns for Filters-->
					<div class="justify-self-end my-auto text-gray-100 accent-rp-pink">
						<div
							class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min"
						>
							<button
								class=""
								on:click={() => {
									show_filters_modal = true;
								}}
							>
								Filter By
							</button>
						</div>
					</div>
				</div>

				<div 
					class="bg-gray-900 w-3/12 rounded-lg fixed z-[999] p-5 right-48 duration-300 text-gray-200 center-div overflow-y-auto {show_filters_modal
						? 'visible opacity-100'
						: 'invisible opacity-0'} max-h-screen"
				>
					<button
						on:click={() => (show_filters_modal = false)}
						class="absolute right-4 text-2xl text-red-500"
					>
						<Icon icon="mingcute:exit-fill" />
					</button>

					<h1 class="text-xl mb-3 font-serif">Filters</h1>

					<div class="flex flex-col gap-5">
						<!-- Majors Drop Down-->
						<div class="flex flex-col">
							<p>Major</p>
							<div class="my-auto text-gray-100 accent-rp-pink">
								<div
									class="duration-300 p-2 bg-white rounded-md text-center bg-opacity-10 hover:bg-opacity-20"
								>
									<button class="w-full h-full" on:click={() => (show_majors = !show_majors)}
										>{major_filters.size} Filters
									</button>
								</div>

								{#if show_majors}
									<div on:mouseleave={() => {show_majors = false}} class="fixed">
										<ul class="p-2 bg-opacity-4 rounded-md bg-gray-900">
											{#each majors as major}
												<li class="flex flex-row hover:text-gray-300">
													<div id="major-check" class="flex flex-row">
														<input
															type="button"
															value={major}
															on:click={() => {
																let major_id = major_id_dict.get(major);
																if (major_id == undefined) {
																	major_id = '';
																}
																onCheckBoxClick(major_filters, major_id, 'major-check');
																major_filters = major_filters;
															}}
														/>
														{#if major_filters.has(major_id_dict.get(major) || '')}
															<Icon class="align-end pt-2" icon="ion:checkmark" width="24" />
														{/if}
													</div>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</div>

						<!-- Grad Year Drop Down-->
						<div class="flex flex-col">
							<p>Graduation</p>

							<div class="text-gray-100 accent-rp-pink">
								<div
									class="duration-300 p-2 bg-white rounded-md text-center bg-opacity-10 hover:bg-opacity-20"
								>
									<button class="w-full h-full" on:click={() => (show_grad_year = !show_grad_year)}
										>{grad_year_filters.size} Filters
									</button>
								</div>

								{#if show_grad_year}
									<div on:mouseleave={() => {show_grad_year = false}} class="fixed">
										<ul class="p-2 bg-opacity-4 rounded-md bg-gray-900 h-48 overflow-scroll">
											{#each grad_years as grad_year}
												<li class="flex flex-row hover:text-gray-300">
													<div id="grad-year-check" class="flex flex-row">
														<input
															type="button"
															value={grad_year}
															on:click={() => {
																onCheckBoxClick(grad_year_filters, grad_year, 'grad-year-check');
																grad_year_filters = grad_year_filters;
															}}
														/>
														{#if grad_year_filters.has(grad_year)}
															<Icon class="align-end pt-2" icon="ion:checkmark" width="24" />
														{/if}
													</div>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</div>

						<!-- Job Interest -->
						<div class="flex flex-col">
							<p>Job Interest</p>
							<div class="my-auto text-gray-100 accent-rp-pink">
								<div
									class="duration-300 p-2 bg-white rounded-md text-center bg-opacity-10 hover:bg-opacity-20"
								>
									<button
										class="w-full h-full"
										on:click={() => (show_job_interest = !show_job_interest)}
										>{job_interest_filters.size} Filters
									</button>
								</div>

								{#if show_job_interest}
									<div on:mouseleave={() => {show_job_interest = false}} class="fixed">
										<ul class="p-2 bg-opacity-4 rounded-md bg-gray-900">
											{#each job_interests as job_interest}
												<li class="flex flex-row hover:text-gray-300">
													<div class="flex flex-row" id="job-interest-check">
														<input
															type="button"
															value={job_interest}
															on:click={() => {
																onCheckBoxClick(
																	job_interest_filters,
																	job_interest,
																	'job-interest-check'
																);
																job_interest_filters = job_interest_filters;
															}}
														/>
														{#if job_interest_filters.has(job_interest)}
															<Icon class="align-end pt-2" icon="ion:checkmark" width="24" />
														{/if}
													</div>
												</li>
											{/each}
										</ul>
									</div>
								{/if}
							</div>
						</div>
					</div>
					<!-- Save Button -->
					<div class="flex flex-row gap-5 mt-4">
						<div class="w-20 md:w-20 flex mt-3 flex-col">
							<button
								class="px-2 py-1 rounded-md bg-green-600 hover:bg-green-500 duration-300"
								on:click={() => fetchFilteredAttendees(1)}
							>
								Save
							</button>
						</div>
						<div class="w-fit flex mt-3 flex-col">
							<button
								class="px-2 py-1 rounded-md bg-pink-600 hover:bg-pink-500 duration-300"
								on:click={() => {
									major_filters.clear();
									major_filters = new Set();
									job_interest_filters.clear();
									job_interest_filters = new Set();
									grad_year_filters.clear();
									grad_year_filters = new Set();

									fetchAttendees();
								}}
							>
								Clear Filters
							</button>
						</div>
					</div>
					<slot />
				</div>
			</div>

			<div class="p-3 bg-white bg-opacity-10 rounded-md overflow-x-auto">
				<table class="w-full table-auto border-spacing-10 border-collapse border-hidden">
					<thead class="text-left tracking-wider">
						{#each columns as column}
							<th>{column}</th>
						{/each}
					</thead>
					<tbody>
						{#each filtered_attendees as attendee}
							<tr class="bg-opacity-0 hover:bg-opacity-10 bg-black duration-300">
								<td contenteditable="false" bind:innerHTML={attendee.name} class=" w-56 p-2" />
								<td contenteditable="false" class=" w-56 p-2"
									>{major_dict.get(attendee.studentInfo.major)}</td
								>
								<td
									contenteditable="false"
									bind:textContent={attendee.studentInfo.graduation}
									class=" w-56 p-2"
								/>
								<td
									contenteditable="false"
									bind:textContent={attendee.job_interest}
									class=" w-56 p-2"
								/>
								<td>
									<div class="rounded-md p-2">
										<button aria-label="" on:click={() => fetchURl(attendee._id)}>
											<Icon icon="bx:file" width="24" />
										</button>
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<div class="pt-3 flex flex-row px-32 justify-between mx-2">
				{#if page != first_page}
					<button
						aria-label="previous page"
						title="previous page"
						on:click={async () => {
							prev_page();
						}}
					>
						<Icon icon="ic:round-navigate-before" class="text-3xl text-white" />
					</button>
				{:else}
					<div />
				{/if}

				<div class="pt-1 text-sm text-white">
					Page {page} out of {last_page}
				</div>
				{#if page != last_page}
					<button
						aria-label="next page"
						title="next page"
						on:click={async () => {
							next_page();
						}}
					>
						<Icon icon="ic:round-navigate-next" class="text-3xl text-white" />
					</button>
				{:else}
					<div />
				{/if}
			</div>
		</div>
	</div>
</main>

<style>
	input {
		padding: 0.25rem;
	}
</style>
