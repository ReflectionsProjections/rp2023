<script lang='ts'>
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import svgLogo from '../../assets/rp-logo.svg';
	import GlassContainer from '../../components/glass-container.svelte';

	import { API_URL } from '../../constants';
	import DietaryOptions from '../../components/registration/dietary-options.svelte';
	export let data;

	let schedule = data.schedule;

	// this code makes me sad. do better
	let day_events_list = {};
	let times= ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM"];

	let cols_condensed = [];
	let event_map = {};
	let time_map = {};
	let hour = 7;
	let min = 30;
	let colours = data.colours;
	let heights = data.heights;
	console.log("heights", heights)
	

	// Initalizes time_map
	// Time Slot Index => Time
	// Time => Time Slot Index
	for (let i = 0; i < 13 * 4; i++) {
		time_map[i] = hour.toString().padStart(2, '0') + min.toString().padStart(2, '0');
		time_map[hour.toString().padStart(2, '0') + min.toString().padStart(2, '0')] = i;
		min += 15;
		if (min == 60) {
			hour++;
			min = 0;
		}
	}
	console.log("timemap", time_map);

	// Schedule of events; should be in the format of Monday: List_of_events, Tuesday: List_of_events, etc..
	// Events have: name, description, start_time, duration, location, virtual

	function toDate(input: String) {
		return new Date(input);
	}

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	function populateCols(event_list) {
		console.log("Event_list: ", event_list);
		let cols_expanded = [new Array(13 * 4).fill(0), new Array(13 * 4).fill(0)];
		event_map = {};
		let currCol = 0;
		for (let i = 0; i < event_list.length; i++) {
			event_map[i + 1] = event_list[i];
			let time = (toDate(event_list[i].start_time).getHours()).toString().padStart(2,'0') + (toDate(event_list[i].start_time).getMinutes()).toString().padStart(2,'0')
			let col_index: number = time_map[time]
			if (cols_expanded[currCol][col_index] == 1) {
				currCol += 1;
				currCol %= 2;
			}
			console.log("Current event: ", event_list[i]);
			console.log("Event duration: ", event_list[i].duration)
			// cols[currCol][col_index] = [i + 1, event_list[i].duration * 4];
			for (let j = 0; j < event_list[i].duration * 4; j++) {
				console.log("indexing: ", col_index + j);
				cols_expanded[currCol][col_index + j] = i + 1;
			}
			currCol += 1;
			currCol %= 2;
		}
		console.log("cols_expanded", JSON.stringify(cols_expanded));
		console.log("event_map", event_map);
		return cols_expanded;
	}
	
	function condenseCols(cols_expanded) {
		cols_condensed = [new Array(0), new Array(0)];
		for (let i = 0; i < cols_expanded.length; i++) {
			let count = 0;
			let curr_val = cols_expanded[i][0]; 
			for (let j = 0; j < cols_expanded[i].length; j++) {
				if (curr_val == cols_expanded[i][j]) {
					count++;
				} else {
					cols_condensed[i].push([curr_val, count]);
					count = 1;
					curr_val = cols_expanded[i][j];
				}
			}
			cols_condensed[i].push([curr_val, count]);
		}
		console.log("cols_condensed", cols_condensed);
		return cols_condensed;
	}

	function dayButtonClick(day) {
		shuffleArray(colours);
		console.log("day", day)
		
		condenseCols(populateCols(schedule[day]));
	}

	function dayButtonClickLegacy(event: MouseEvent) {
		const target = event.currentTarget as HTMLButtonElement;
		let day = target.id.toLowerCase();
		// console.log(day);
		day_events_list = schedule[day]
	}

	console.log("Color length: ", colours.length)
	condenseCols(populateCols(schedule["monday"]))
</script>


<div class="p-4 my-10 w-full flex items-center place-content-center">
	<div class="max-w-3xl w-5/6 md:w-3/4 lg:w-5/6  h-[36rem] ">
		<!-- Tabs -->
		<div class="grid grid-cols-11 h-8 px-1 pt-1 items-end invisible sm:visible">
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-mon" value="monday" checked> 
				<label for="schedule-mon" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Monday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-tues" value="tuesday" > 
				<label for="schedule-tues" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Tuesday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-wed" value="wednesday" > 
				<label for="schedule-wed" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Wednesday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-thurs" value="thursday" > 
				<label for="schedule-thurs" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Thursday.EXE</p>
				</label>
			</div>
			<div class="flex col-span-2">
				<input class="sr-only peer" type="radio" name="schedule" id="schedule-fri" value="friday" > 
				<label for="schedule-fri" class="w-full h-full cursor-pointer peer-checked:bg-rp-white bg-rp-pale-pink border-[1px] hover:bg-rp-hover-pale-pink border-black">
					<p class="h-fit text-md font-bold select-none px-1">Friday.EXE</p>
				</label>
			</div>
		</div>
		<!-- Header -->
		<div class="bg-rp-white h-[34rem] place-content-center place-items-center border-[1px] border-black rounded-sm">
			<div class="h-12 sm:h-8 grid grid-cols-5 min-[490px]:grid-cols-7 sm:grid-cols-8 md:grid-cols-9 lg:grid-cols-12">
				<!-- Bar thingy? -->
				<div class="h-full col-span-3 min-[490px]:col-span-5 sm:col-span-7 md:col-span-8 lg:col-span-11">
					<div class="pl-5 pr-3 py-2 w-full h-full items-end">
						<div class="h-full w-full border-[1px] rounded-[1px] border-black">
							<div class="">

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
				<div class="w-11/12 h-full bg-rp-pale-pink p-4 pb-8 overflow-y-scroll">
					<!-- Turn this into a component -->
					<div class="flex w-full h-fit justify-center">
						<div class="w-3/4 flex flex-col h-44 bg-red-400">
							<div class="flex grow-0 h-1/2 bg-green-400">
								<div class="flex flex-row h-full w-full">
									<div class="flex h-full aspect-square p-2">
										<span class="h-full w-full rounded-full bg-white"></span>
									</div>
									<div class="flex flex-col h-full w-full p-2 pl-0">
										<div class="flex h-3/5 w-full bg-orange-300 p-1 items-center">
											<p class="text-2xl font-bold">EVENT NAME HERE</p>
										</div>
										<div class="flex flex-row h-2/5 w-full bg-yellow-300">
											<div class="flex basis-2/5 bg-purple-300 items-center p-1">
												<Icon class="flex h-fit aspect-square" icon="mdi:map-marker" width="auto" height="auto"/>
												<p>PLACEHOLDER</p>
											</div>
											<div class="flex grow bg-purple-500 items-center p-1">
												<Icon class="flex h-fit aspect-square" icon="mdi:calendar" width="auto" height="auto"/>
												<p>PLACEHOLDER</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="flex grow-0 w-full h-fit bg-pink-400 p-2">
								<p class="h-full w-full line-clamp-2 overflow-hidden "> We're no strangers to love You know the rules and so do I (do I) A full commitment's what I'm thinking of You wouldn't get this from any other guy I just wanna tell you how I'm feeling Gotta make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you</p>
							</div>
							<div class="flex grow-0 w-full h-full bg-red-500">
								<label class="flex w-full h-full bg-lime-400  place-content-center">
									<input class="sr-only peer" type="checkbox">
									<Icon class="flex h-fit aspect-square" icon="mdi:chevron-down" width="auto" height="auto"/>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>



<div class="w-full h-8 text-white bg-red-600 sm:bg-yellow-700 md:bg-green-600 lg:bg-blue-600 xl:bg-purple-600 2xl:bg-violet-800">
	RED=Nothing YELLOW=sm GREEN=md BLUE=lg PURPLE=xl VIOLET=2xl
</div>

<div class="h-full flex items-center">
	<div class="mx-auto h-[48rem] w-[50%] my-8">
		<GlassContainer>
			<div class="h-[48rem]">

				
				<div class="mx-auto grid grid-cols-5 text-center justify-around text-white text-4xl gap-8 p-2">
					<div class = "border-2 rounded-lg bg-gray-100/10 py-4"><button id="monday" on:click = {dayButtonClickLegacy}>Monday</button></div>
					<div class = "border-2 rounded-lg bg-gray-100/10 py-4"><button id="tuesday" on:click = {dayButtonClickLegacy}>Tuesday</button></div>
					<div class = "border-2 rounded-lg bg-gray-100/10 py-4"><button id="wednesday" on:click = {dayButtonClickLegacy}>Wednesday</button></div>
					<div class = "border-2 rounded-lg bg-gray-100/10 py-4"><button id="thursday" on:click = {dayButtonClickLegacy}>Thursday</button></div>
					<div class = "border-2 rounded-lg bg-gray-100/10 py-4"><button id="friday" on:click = {dayButtonClickLegacy}>Friday</button></div>
				</div>

				<!-- update this to iterate through the day's event list and disiplay info for each event-->
				<div class="h-full w-full  px-4 pb-4 pt-2">
					<ul>
						{#each Object.entries(day_events_list) as [key, value]}
							<div class="event text-lg text-white pt-1">
								<p class="text-3xl"><strong>Name:</strong> {value.name}</p>
								<p class="text-3xl"><strong>Description:</strong> {value.description}</p>
								<p class="text-3xl pb-2"><strong>Info:</strong> {`${toDate(value.start_time).toLocaleString([], { month: 'long' })} ${toDate(value.start_time).getDate()} @ ${toDate(value.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}</p>
								<hr class="pt-2 bg-black-200"/>
							</div>
						{/each}
					</ul>
				</div>
			</div>
		</GlassContainer>
	</div>
</div>



<!-- <div class="h-full flex place-content-center">
	
	<div class="min-w-min max-w-7xl w-3/4 h-fit">
		<GlassContainer>
			<div class="pb-8">
				<div class="grid grid-cols-6 md:grid-cols-5 place-content-center p-0">

					<div class="grid grid-cols-6 md:grid-cols-2 col-span-6 md:col-span-2 place-content-center">

						<div class="flex col-span-3 md:col-span-1 p-2 lg:p-4 aspect-square place-content-center">
							<input class="sr-only peer" type="radio" name="day" id="schedule-mon" value="Monday" on:change={() => dayButtonClick("monday")} checked >
							<label for="schedule-mon" class="flex transition ease-in-out cursor-pointer w-full h-full rounded-full bg-rp-dull-pink/90  hover:duration-2 hover:scale-105 hover:bg-rp-pink text-gray-100 hover:text-white peer-checked:bg-pink-500 place-items-center place-content-center">
								<p class="h-fit text-xl sm:text-3xl lg:text-5xl">Mon</p>
							</label>
						</div>
						<div class="flex col-span-3 md:col-span-1 p-2 lg:p-4 aspect-square place-content-center">
							<input class="sr-only peer" type="radio" name="day" id="schedule-tues" value="Tuesday" on:change={() => dayButtonClick("tuesday")}>
							<label for="schedule-tues" class="flex transition ease-in-out cursor-pointer w-full h-full rounded-full bg-rp-dull-pink/90  hover:duration-2 hover:scale-105 hover:bg-rp-pink text-gray-100 hover:text-white peer-checked:bg-pink-500 place-items-center place-content-center">
								<p class="h-fit text-xl sm:text-3xl lg:text-5xl">Tues</p>
							</label>
						</div>
					</div>
					
					<div class="grid grid-cols-6 md:grid-cols-3 col-span-6 md:col-span-3 place-content-center">
						<div class="flex col-span-2 md:col-span-1 p-2 lg:p-4 aspect-square place-content-center">
							<input class="sr-only peer" type="radio" name="day" id="schedule-wed" value="Wednesday" on:change={() => dayButtonClick("wednesday")}>
							<label for="schedule-wed" class="flex transition ease-in-out cursor-pointer w-full h-full rounded-full bg-rp-dull-pink/90  hover:duration-2 hover:scale-105 hover:bg-rp-pink text-gray-100 hover:text-white peer-checked:bg-pink-500 place-items-center place-content-center">
								<p class="h-fit text-xl sm:text-3xl lg:text-5xl">Wed</p>
							</label>
						</div>
						<div class="flex col-span-2 md:col-span-1 p-2 lg:p-4 aspect-square place-content-center">
							<input class="sr-only peer" type="radio" name="day" id="schedule-thurs" value="Thursday" on:change={() => dayButtonClick("thursday")}>
							<label for="schedule-thurs" class="flex transition ease-in-out cursor-pointer w-full h-full rounded-full bg-rp-dull-pink/90  hover:duration-2 hover:scale-105 hover:bg-rp-pink text-gray-100 hover:text-white peer-checked:bg-pink-500 place-items-center place-content-center">
								<p class="h-fit text-xl sm:text-3xl lg:text-5xl">Thurs</p>
							</label>
						</div>
						<div class="flex col-span-2 md:col-span-1 p-2 lg:p-5 aspect-square place-content-center">
							<input class="sr-only peer" type="radio" name="day" id="schedule-fri" value="Friday" on:change={() => dayButtonClick("friday")}>
							<label for="schedule-fri" class="flex transition ease-in-out cursor-pointer w-full h-full rounded-full bg-rp-dull-pink/90  hover:duration-2 hover:scale-105 hover:bg-rp-pink text-gray-100 hover:text-white peer-checked:bg-pink-500 place-items-center place-content-center">
								<p class="h-fit text-xl sm:text-3xl lg:text-5xl">Fri</p>
							</label>
						</div>
					</div>
				  </div>
			</div>

			

			<div class="flex w-full h-fit place-content-center select-none">
				<div class="w-11/12">
					<GlassContainer>
						<div class="grid grid-cols-8 max-h-[56rem] overflow-auto">
							<div class="col-span-1 px-2 ">
								{#each times.slice(1) as time}
									<div class="flex text-4xl text-white text-right h-32 items-center place-content-end">
										<div>
											<p>{time}</p>
										</div>
									</div>
								{/each}
							</div>
							<div class="relative grid col-span-6 grid-cols-2 z-0">
								<div class="absolute inset-0 z-10 h-fit">
									{#each times.slice(1) as time, i}
										<div class="border-b-4 h-16 z-10">
										</div>
										{#if time != "8 PM"}
											<div class="border-b-4 h-16 z-10">
											</div>
										{/if}
									{/each}
								</div>
								
								
								<div class="col-span-1 px-8 z-20 h-full">
										{#each cols_condensed[0] as col}
											{#if col[0] != 0}
												{#each {length: col[1]} as j, count}
													<div class="h-8 {colours[col[0] % colours.length]} text-white  text-left  z-20">
														{#if count == 0}
															<p class="p-2 break-normal text-3xl">{event_map[col[0]].name}</p>
														{/if}
													</div>
												{/each}
											{:else}
												{#each {length: col[1]} as j, count}
													<div class="h-8 text-white text-left  z-20">
													</div>
												{/each}
											{/if}
										{/each}
								</div>
								<div class="col-span-1 px-8 z-20">
									<div class="">
										{#each cols_condensed[1] as col}
											{#if col[0] != 0}
												{#each {length: col[1]} as j, count}
													<div class="h-8 {colours[col[0] % colours.length]} text-white text-left z-20">
														{#if count == 0}
															<p class="p-2 break-normal text-3xl">{event_map[col[0]].name}</p>
														{/if}
													</div>
												{/each}
											{:else}
												{#each {length: col[1]} as j, count}
													<div class="h-8 text-white text-left  z-20">
													</div>
												{/each}
											{/if}
										{/each}
									</div>
								</div>

							</div>

						</div>
					</GlassContainer>
				</div>
			</div>
			
		</GlassContainer>
	</div>
	
</div> -->

