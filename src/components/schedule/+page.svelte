<script lang='ts'>
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs'	
	export let data;

	let schedule = data.schedule;	
	let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]	// Convert from .day() to value
	let card_colors = ["bg-pink-200", "bg-pink-300"]	// Colours to select from for the event cards
	let events = [];	// list of events currently displapyed
	let selectedDay: string;	// currently selected day


	function dayButtonClick(day: string) {
		events = schedule[day]
	}

	// function isTextCutOff(el) {
	// 	console.log("Scroll Height: ", el.scrollHeight, "; Client Height: ", el.clientHeight)
	// 	return el.scrollHeight > el.clientHeight;
	// }

	function scheduleDescControl(event: MouseEvent) {
		const target = event.currentTarget as HTMLInputElement;
		let event_target_id = target.id.toLowerCase();
		let desc_div_target = document.getElementById("description-div-" + event_target_id);
		let desc_text_target = document.getElementById("description-text-" + event_target_id);
		let icon_up_arrow_target = document.getElementById("icon-arrow-up-" + event_target_id);
		let icon_down_arrow_target = document.getElementById("icon-arrow-down-" + event_target_id);
		// let expand_target = document.getElementById("expand-" + event_target_id);
		desc_div_target?.classList.toggle('h-fit');
		desc_div_target?.classList.toggle('h-full');
		desc_text_target?.classList.toggle('line-clamp-2');
		icon_up_arrow_target?.classList.toggle('invisible');
		icon_down_arrow_target?.classList.toggle('invisible');
	}
	dayButtonClick(days[dayjs().day()])
</script>


<div class="p-2 md:p-4 my-10 w-full flex items-center place-content-center">
	<div class="max-w-3xl w-[95%] md:w-3/4 lg:w-5/6  h-[36rem] ">
		<!-- Tabs -->
		<div class="grid grid-cols-11 h-8 px-1 pt-1 items-end invisible sm:visible">
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-mon" value="monday" checked on:change={() => dayButtonClick("monday")}> 
				<label for="schedule-mon" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Monday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-tues" value="tuesday" on:change={() => dayButtonClick("tuesday")}> 
				<label for="schedule-tues" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Tuesday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-wed" value="wednesday" on:change={() => dayButtonClick("wednesday")}> 
				<label for="schedule-wed" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Wednesday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-thurs" value="thursday" on:change={() => dayButtonClick("thursday")}> 
				<label for="schedule-thurs" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Thursday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-fri" value="friday" on:change={() => dayButtonClick("friday")}> 
				<label for="schedule-fri" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Friday.EXE</p>
				</label>
			</div>
		</div>
		<!-- Component Body -->
		<div class="bg-rp-white h-[34rem] place-content-center place-items-center border-[1px] border-black rounded-sm">
			<!-- Header -->
			<div class="h-12 sm:h-8 grid grid-cols-5 min-[490px]:grid-cols-7 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-12">
				<!-- Search Bar thingy? -->
				<div class="h-full col-span-3 min-[490px]:col-span-5 sm:col-span-7 md:col-span-8 lg:col-span-11">
					<div class="pl-5 pr-3 py-2 w-full h-full items-end">
						<div class="h-full w-full border-[1px] rounded-[1px] border-black">
							<div class="flex visible sm:invisible sm:h-0 w-full h-full">
								<select class="sans w-full indent-0.5" bind:value={selectedDay} on:change={() => dayButtonClick(selectedDay)}>
									<option class="font-sans" value="monday"> Monday</option>
									<option class="sans" value="tuesday"> Tuesday</option>
									<option class="sans" value="wednesday"> Wednesday</option>
									<option class="sans" value="thursday"> Thursday</option>
									<option class="sans" value="friday"> Friday</option>
								</select>
							</div>
						</div>
					</div>
				</div>
				<!-- Fake buttons -->
				<div class="h-full flex col-span-2 sm:col-span-1 pl-4 w-full items-end justify-end">
					<div class="h-full flex pr-4 w-full py-2 justify-end items-start">
						<div class="flex h-8 sm:h-4 sm:w-4 mr-[2px] sm:mr-[1px] aspect-square border-[1px] border-black rounded-[1px] place-content-center items-center">
							<Icon class="flex h-fit aspect-square" icon="mdi:window-minimize" width="auto" height="auto"/>
						</div>
						<div class="flex h-8 sm:h-4 sm:w-4 mr-[2px] sm:mr-[1px] aspect-square border-[1px] border-black rounded-[1px] place-content-center items-center">
							<Icon class="flex h-fit aspect-square" icon="mdi:window-maximize" width="auto" height="auto"/>
						</div>
						<div class="flex h-8 sm:h-4 sm:w-4 mr-[2px] sm:mr-[1px] aspect-square border-[1px] border-black rounded-[1px] place-content-center items-center">
							<Icon class="flex h-fit aspect-square" icon="mdi:window-close" width="auto" height="auto"/>

						</div>
					</div>
					
				</div>
			</div>
			<!-- Content -->
			<div class="flex h-[30rem] sm:h-[31rem] justify-center items-center">
				<!-- Inner Pink Box -->
				<div class="w-11/12 h-full bg-rp-pale-pink p-2 md:p-4 pb-8 overflow-y-scroll">
					{#each events as event, i}
						<div class="flex w-full h-fit justify-center">
							<div class="w-full md:w-5/6 lg:w-3/4 flex flex-col h-fit {card_colors[i % card_colors.length]} rounded-md m-2 border-4 border-pink-100">
								<div class="flex grow-0 pb-1">
									<div class="flex flex-row w-full h-fit items-center">
										<div class="flex h-full min-h-[6rem] aspect-square p-2 items-stretch ">
											<div class="flex h-full w-full aspect-square  rounded-full items-center justify-center bg-pink-100">
												<Icon class="h-1/2 w-1/2" icon="mdi:calendar-range"/>
											</div>
										</div>
										<!-- Top info cluster -->
										<div class="flex flex-col h-full w-full pl-1 pr-2 pt-2 place-content-center">
											<div class="flex flex-col h-fit w-fit items-center">
												<p class="flex text-xl sm:text-2xl font-bold ">{event.name}</p>
											</div>
											
											<div class="grid grid-row-2 min-[420px]:grid-cols-3 md:grid-cols-2 h-2/5 w-full gap-0 min-[420px]:gap-2">
												<div class="flex row-span-1 min-[420px]:col-span-1 items-end">
													<Icon class="flex h-fit aspect-square" icon="mdi:map-marker" width="auto" height="auto"/>
													<p class="text-sm sm:text-lg pl-1">{event.location}</p>
												</div>
												<div class="flex row-span-1 min-[420px]:col-span-2 md:col-span-1 items-end">
													<Icon class="flex h-fit aspect-square" icon="mdi:calendar" width="auto" height="auto"/>
													<p class="text-sm sm:text-lg pl-1">{`${dayjs(event.start_time).format('HH:mm')} - ${dayjs(event.start_time).add(event.duration, 'hour').format('HH:mm')}`}</p>
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
				</div>
			</div>
		</div>		
	</div>
</div>

