<script lang="ts">
	import type { Schedule } from '$lib/types';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';

	const SCHEDULE_BUTTONS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const DAYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
	const OPTION_IDS = ['Monday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Convert from .day() to value
	const CARD_COLORS = ['bg-pink-200', 'bg-[#FBC5E3]']; // Colours to select from for the event cards
	const ERROR_MESSAGES = [
		"Hmm... something's broken.",
		'Well, this is awkward.',
		"Whoops. This wasn't supposed to happen.",
		"I've a feeling we're not in Kansas anymore...",
		'Now, where are those pesky events...',
		'I swear I put the events /right/ there...',
		'Oops.'
	];

	export let schedule: Schedule | null;
	let error_message = '';
	let displayDay = '';
	let currentDay = '';
	let descToggles: { [key: string]: boolean } = {};
	// list of events currently displayed
	let events: any[] = [];

	function dayButtonClick(day: string) {
		if (schedule != null) events = schedule[day];
		else chooseErrorMessage();
		displayDay = day[0].toUpperCase() + day.slice(1);
	}

	function chooseErrorMessage() {
		error_message = ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)];
	}

	function updateSchedule() {
		if (schedule != null) {
			events = schedule[DAYS[dayjs().day()]];
		}
	}

	onMount(async () => {
		chooseErrorMessage();
		currentDay = OPTION_IDS[dayjs().day()];
		dayButtonClick(currentDay.toLowerCase());
	});

	let width;

	$: schedule, updateSchedule();
	$: if (currentDay) dayButtonClick(currentDay.toLowerCase());
</script>

<div
	class="flex flex-col my-10 w-full max-w-3xl rounded-sm items-center place-content-center text-black h-[36rem]"
>
	<!-- Day Select Tabs -->
	<div class="flex flex-row h-8 pl-0.5 pt-1 w-full">
		{#each SCHEDULE_BUTTONS as day}
			<button
				on:click={() => {
					currentDay = day;
				}}
				class="flex select-none border hover:bg-rp-hover-pale-pink border-black grow font-bold pl-1
						{currentDay === day ? 'bg-rp-cream' : 'bg-rp-subtle-pink'}"
			>
				<div class="block min-[500px]:hidden">
					{day.slice(0, 3).toUpperCase()}
				</div>
				<div class="hidden min-[500px]:block md:hidden">
					{day.slice(0, 3)}.EXE
				</div>
				<div class="hidden md:block lg:hidden">
					{day}
				</div>
				<div class="hidden lg:block">
					{day}.EXE
				</div>
			</button>
		{/each}
	</div>
	<!-- Component Body -->
	<div
		class="bg-rp-cream h-[34rem] place-content-center place-items-center border-[1px] border-black rounded-sm w-full pb-2"
	>
		<!-- Fake Heading Bar -->
		<div class="flex flex-row m-2 items-start">
			<!-- Fake Search bar -->
			<div class="flex border border-rp-blue w-full h-4 sm:h-4 m-0.5" />
			<!-- Fake Buttons -->
			<div class="flex flex-row text-rp-blue items-start">
				<div class="w-4 h-4 m-0.5 border border-rp-blue flex items-center justify-center">
					<Icon icon="ic:baseline-minimize" />
				</div>
				<div class="w-4 h-4 m-0.5 border border-rp-blue flex items-center justify-center">
					<Icon icon="fluent:maximize-20-filled" />
				</div>
				<div class="w-4 h-4 m-0.5 border border-rp-blue flex items-center justify-center">
					<Icon icon="ph:x-bold" />
				</div>
			</div>
		</div>
		<!-- Content -->
		<div class="flex h-[30rem] sm:h-[31rem] justify-center items-center">
			<!-- Inner Pink Box -->
			<div class="w-full h-full bg-rp-subtle-pink m-2 p-4 pb-8 overflow-auto">
				{#if schedule != null}
					{#if events.length != 0}
						{#each events as event, i}
							<div class="flex w-full h-fit justify-center">
								<div
									class="w-full flex flex-col h-fit bg-rp-cream rounded-md my-2 border-0 border-pink-100"
								>
									<div class="flex grow-0 pb-1">
										<div class="flex flex-row w-full h-fit items-center px-2 py-2">
											<div class="flex h-[6rem] aspect-square p-2 items-stretch">
												<div
													class="flex h-full w-full aspect-square rounded-full items-center justify-center bg-white object-cover overflow-clip"
												>
													{#if event.imageUrl != null}
														<img
															class="object-cover object-top h-full w-full"
															alt="Event"
															src={event.imageUrl}
														/>
													{:else}
														<Icon class="h-1/2 w-1/2" icon="mdi:calendar-range" />
													{/if}
												</div>
											</div>
											<!-- Top info cluster -->
											<div class="flex flex-col h-full w-full pl-1 pr-2 pt-2 place-content-center">
												<!-- Event name -->
												<div class="flex flex-col h-fit w-fit items-center">
													<p class="flex text-xl sm:text-2xl font-bold">{event.name}</p>
												</div>
												<!-- Basic info cluster -->
												<div class="flex flex-col h-2/5 w-full gap-1 justify-between">
													<!-- Location -->
													<div class="flex flex-row">
														<div class="min-h-[2px]">
															<Icon
																class="flex h-fit aspect-square"
																icon="mdi:map-marker"
																width="auto"
																height="auto"
															/>
														</div>

														{#if event.virtual && event.locationUrl != null}
															<a
																href={event.locationUrl}
																class="cursor-pointer underline text-md sm:text-lg pl-1">Virtual</a
															>
														{:else if event.virtual && event.locationUrl == null}
															<p class="text-md sm:text-lg pl-1">Virtual</p>
														{:else if !event.virtual && event.locationUrl != null}
															<a
																href={event.locationUrl}
																class="cursor-pointer underline text-md sm:text-lg pl-1"
																>{event.location}</a
															>
														{:else}
															<p class="text-md sm:text-lg pl-1">{event.location}</p>
														{/if}
													</div>
													<!-- Time -->
													<div class="flex flex-row">
														<div class="min-h-[2px]">
															<Icon
																class="flex h-fit aspect-square"
																icon="mdi:calendar"
																width="auto"
																height="auto"
															/>
														</div>

														<p class="text-md sm:text-lg pl-1">
															<span class="break-after-column inline-block"
																>{dayjs(event.start_time).format('h:mm A')}</span
															>
															<span class="break-after-column inline-block"> - </span>
															<span class="break-after-column inline-block"
																>{dayjs(event.end_time).format('h:mm A')}</span
															>
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<hr class="border-1 w-11/12 place-self-center border-black" />
									<!-- Description -->
									<div
										class="flex grow-0 w-full {descToggles[event._id]
											? 'h-full'
											: 'h-fit'} px-4 py-2"
										id="description-div-event-{String(i)}"
									>
										<p
											class="h-full w-full {descToggles[event._id]
												? ''
												: 'line-clamp-2'} overflow-hidden"
											id="description-text-event-{String(i)}"
										>
											{event.description}
										</p>
									</div>
									<!-- Collapse button -->
									<div class="relative flex grow-0 w-full h-full" id="expand-event-{String(i)}">
										<button
											class="flex w-full h-6 place-content-center"
											on:click={() => {
												if (descToggles[event._id] === undefined || !descToggles[event._id]) {
													descToggles[event._id] = true;
												} else {
													descToggles[event._id] = false;
												}
											}}
										>
											{#if descToggles[event._id] === undefined || !descToggles[event._id]}
												<Icon
													class="absolute flex h-fit aspect-square"
													icon="mdi:chevron-down"
													width="auto"
													height="auto"
												/>
											{:else}
												<Icon
													class="absolute flex h-fit aspect-square"
													icon="mdi:chevron-up"
													width="auto"
													height="auto"
												/>
											{/if}
										</button>
									</div>
								</div>
							</div>
						{/each}
					{:else}
						<div class="flex w-full h-full place-content-center place-items-center">
							<div
								class="flex flex-col w-11/12 md:w-3/4 h-fit place-items-center place-content-center text-center p-4 md:p-8 rounded-md"
							>
								<p class="flex text-black text-3xl sm:text-2xl font-bold">No events today</p>
							</div>
						</div>
					{/if}
				{:else}
					<div class="flex w-full h-full place-content-center place-items-center">
						<div
							class="flex flex-col w-11/12 md:w-3/4 h-fit place-items-center {CARD_COLORS[0]} place-content-center text-center p-4 md:p-8 rounded-md"
						>
							<p class="flex text-black text-3xl sm:text-4xl font-bold">{error_message}</p>
							<p class="flex text-black text-1xl sm:text-2xl pt-1">
								Something went wrong. Please come back later!
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
	<p class="text-pink-200 md:self-start">Schedule is subject to change</p>
</div>

<style>
	::-webkit-scrollbar {
		width: 6px;
		height: 6px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #e7a4ba;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #df5178;
		border-radius: 3px;
	}

	/* Handle on hover */
	/* ::-webkit-scrollbar-thumb:hover {
	background: linear-gradient(0deg, #C61E5D 30%, #DF5178 45%,  #1d2e5b);
  } */
</style>
