<script lang='ts'>
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs'	
	export let schedule: { [key: string]: any } | null;

	let schedule_buttons = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
	let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]	
	let option_ids = ["schedule-mon", "schedule-mon", "schedule-tue", "schedule-wed", "schedule-thu", "schedule-fri", "schedule-mon"] // Convert from .day() to value
	let card_colors = ["bg-pink-200", "bg-[#FBC5E3]"]		// Colours to select from for the event cards
	let error_messages = [
		"Hmm... something's broken.",
		"Well, this is awkward.",
		"Whoops. This wasn't supposed to happen.",
		"I've a feeling we're not in Kansas anymore...",
		"Now, where are those pesky events...",
		"I swear I put the events /right/ there...",
		"Oops."
	]
	let error_message = "";
	let events = [];	// list of events currently displayed
	// console.log("Schedule", schedule);

	function dayButtonClick(day: string) {
		if (schedule != null) events = schedule[day];
		else chooseErrorMessage();
		(document.getElementById("schedule-display-day") as HTMLParagraphElement).innerText = day[0].toUpperCase() + day.slice(1);
	}

	function updateCheckedDate() {
		(document.getElementById(option_ids[dayjs().day()] as string) as HTMLInputElement).checked = true;
		(document.getElementById("schedule-display-day") as HTMLParagraphElement).innerText = days[dayjs().day()][0].toUpperCase() + days[dayjs().day()].slice(1);
	}
	
	function scheduleDescControl(event: MouseEvent) {
		const target = event.currentTarget as HTMLInputElement;
		let event_target_id = target.id.toLowerCase();
		let desc_div_target = document.getElementById("description-div-" + event_target_id);
		let desc_text_target = document.getElementById("description-text-" + event_target_id);
		let icon_up_arrow_target = document.getElementById("icon-arrow-up-" + event_target_id);
		let icon_down_arrow_target = document.getElementById("icon-arrow-down-" + event_target_id);
		desc_div_target?.classList.toggle('h-fit');
		desc_div_target?.classList.toggle('h-full');
		desc_text_target?.classList.toggle('line-clamp-2');
		icon_up_arrow_target?.classList.toggle('invisible');
		icon_down_arrow_target?.classList.toggle('invisible');
	}

	function chooseErrorMessage() {
		error_message = error_messages[Math.floor(Math.random() * error_messages.length)]
	}

	function updateSchedule() {
		if (schedule != null) { events = schedule[days[dayjs().day()]] }
	}
	
	onMount(async () => {
		chooseErrorMessage();
		updateCheckedDate();
		if (days[dayjs().day()] == "sunday" || days[dayjs().day()] == "saturday") {
			dayButtonClick("monday");
		} else {
			dayButtonClick(days[dayjs().day()]);
		}
	})

	$: schedule, updateSchedule();
</script>

<div class="p-2 md:p-4 my-10 w-full flex items-center place-content-center">
	<div class="max-w-3xl w-[95%] md:w-5/6 lg:w-11/12  h-[36rem] ">
		<!-- Day Select Tabs -->
		<div class="grid grid-cols-16 h-8 px-1 pt-1 items-end ">
			{#each schedule_buttons as day}
				<div class="flex col-span-3 sm:col-span-3">
					<input class="sr-only peer" type="radio" name="schedule" id="schedule-{day.slice(0, 3).toLowerCase()}" value="{day.toLowerCase()}" on:change={() => dayButtonClick(`${day.toLowerCase()}`)}> 
					<label for="schedule-{day.slice(0, 3).toLowerCase()}" class="select-none w-full h-full cursor-pointer peer-checked:bg-rp-cream bg-rp-subtle-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
						<p class="h-0 min-[870px]:h-fit text-md font-bold select-none px-1 collapse min-[870px]:visible">{day + ".EXE"}</p>
						<p class="h-0 sm:h-fit min-[870px]:h-0 text-md font-bold select-none px-1 collapse sm:visible min-[870px]:collapse">{day}</p>
						<p class="h-0 min-[500px]:h-fit sm:h-0 text-md font-bold select-none px-1 collapse min-[500px]:visible sm:collapse">{day.slice(0, 3)}.EXE</p>
						<p class="h-fit min-[500px]:h-0 text-md font-bold select-none px-1 visible min-[500px]:collapse">{day.slice(0, 3).toUpperCase()}</p>
					</label>
				</div>
			{/each}
			
		</div>
		<!-- Component Body -->
		<div class="bg-rp-cream h-[34rem] place-content-center place-items-center border-[1px] border-black rounded-sm">
			<!-- Fake Heading Bar -->
			<div class="flex flex-row m-2 items-start">
				<!-- Fake Search bar -->
				<div class="flex border border-rp-blue w-full h-4 sm:h-4 m-0.5 ">
					<div id="schedule-display-day" class="h-4 align-bottom text-[0.68rem] indent-1">Monday</div>
				</div>
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
				<div class="w-11/12 h-full bg-rp-subtle-pink p-2 md:p-4 pb-8 overflow-auto">
					{#if schedule != null}
						{#each events as event, i}
							<div class="flex w-full h-fit justify-center">
								<div class="w-full md:w-5/6 lg:w-3/4 flex flex-col h-fit {card_colors[i % card_colors.length]} rounded-md m-2 border-0 border-pink-100">
									<div class="flex grow-0 pb-1">
										<div class="flex flex-row w-full h-fit items-center">
											<div class="flex h-[6rem] aspect-square p-2 items-stretch ">
												<div class="flex h-full w-full aspect-square rounded-full items-center justify-center bg-pink-100 object-cover overflow-clip">
													{#if event.imageUrl != null} 
														<img class= "object-cover h-full w-full" alt="Event" src="{event.imageUrl}">
													{:else}
														<Icon class="h-1/2 w-1/2" icon="mdi:calendar-range"/>
													{/if}
												</div>
											</div>
											<!-- Top info cluster -->
											<div class="flex flex-col h-full w-full pl-1 pr-2 pt-2 place-content-center">
												<!-- Event name -->
												<div class="flex flex-col h-fit w-fit items-center">
													<p class="flex text-xl sm:text-2xl font-bold ">{event.name}</p>
												</div>
												<!-- Basic info cluster -->
												<div class="grid grid-row-2 min-[460px]:grid-cols-3 md:grid-cols-3 h-2/5 w-full gap-0 min-[460px]:gap-2">
													<!-- Location -->
													<div class="flex row-span-1 min-[460px]:col-span-1 items-end">
														<Icon class="flex h-fit aspect-square" icon="mdi:map-marker" width="auto" height="auto"/>
														{#if event.virtual && event.locationUrl != null}
															<a href="{event.locationUrl}" class="cursor-pointer underline text-sm sm:text-lg pl-1">Virtual</a>
														{:else if event.virtual && event.locationUrl == null}
															<p class="text-sm sm:text-lg pl-1">Virtual</p>
														{:else if !event.virtual && event.locationUrl != null}
															<a href="{event.locationUrl}" class="cursor-pointer underline text-sm sm:text-lg pl-1">{event.location}</a>
														{:else}
															<p class="text-sm sm:text-lg pl-1">{event.location}</p>
														{/if}
													</div>
													<!-- Time -->
													<div class="flex row-span-1 min-[460px]:col-span-2 md:col-span-2 items-end">
														<Icon class="flex h-full aspect-square" icon="mdi:calendar" width="auto" height="auto"/>
														{#if event.end_time != null}
															<p class="text-sm sm:text-lg pl-1">{`${dayjs(event.start_time).format('h:mmA')} - ${dayjs(event.end_time).format('h:mmA')}`}</p>
														{:else}
															<!-- fallback in the case the for some reason the event is missing an end time -->
															<p class="text-sm sm:text-lg pl-1">{`${dayjs(event.start_time).format('hh:mm A')} - ${dayjs(event.start_time).add(event.duration, 'h').format('HH:mm')}`}</p>
														{/if}
													</div>
												</div>
											</div>
										</div>
									</div>
									<hr class="border-1 w-11/12 place-self-center border-black">
									<!-- Description -->
									<div class="flex grow-0 w-full h-fit px-4 py-2" id="description-div-event-{String(i)}">
										<p class="h-full w-full line-clamp-2 overflow-hidden" id="description-text-event-{String(i)}"> {event.description}</p>
									</div>
									<!-- Collapse button -->
									<div class="relative flex grow-0 w-full h-full" id="expand-event-{String(i)}">
										<label class="flex w-full h-6  place-content-center cursor-pointer" >
											<input class="sr-only peer" type="checkbox" on:click = {scheduleDescControl} id="event-{String(i)}">
											<Icon class="absolute flex h-fit aspect-square visible" icon="mdi:chevron-down" width="auto" height="auto" id="icon-arrow-down-event-{String(i)}"/>
											<Icon class="absolute flex h-fit aspect-square invisible" icon="mdi:chevron-up" width="auto" height="auto" id="icon-arrow-up-event-{String(i)}"/>
										</label>
									</div>
								</div>
							</div>
						{/each}
					{:else}
						<div class="flex w-full h-full place-content-center place-items-center">
							<div class="flex flex-col w-11/12 md:w-3/4 h-fit place-items-center {card_colors[0]} place-content-center text-center p-4 md:p-8 rounded-md">
								<p class="flex text-black text-3xl sm:text-4xl font-bold">{error_message}</p>
								<p class="flex text-black text-1xl sm:text-2xl pt-1">Something went wrong. Please come back later!</p>
							</div>
						</div>
					{/if}
				</div>
			</div>
		</div>		
	</div>
</div>


