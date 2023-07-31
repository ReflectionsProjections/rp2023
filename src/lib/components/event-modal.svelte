<script lang="ts">
	import type { Event } from '$lib/types';
	import Modal from '$lib/util/modal.svelte';
	import SmartInput from '$lib/util/smart-input.svelte';
	import dayjs from 'dayjs';
	import customParseFormat from 'dayjs/plugin/customParseFormat';
	import localizedFormat from 'dayjs/plugin/localizedFormat';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import { API_URL } from '../../constants';
	dayjs.extend(localizedFormat);
	dayjs.extend(customParseFormat);
	dayjs.extend(utc);
	dayjs.extend(timezone);

	export let show: boolean;
	export let type: 'Create' | 'Update' = 'Create';
	export let event: Partial<Event>;

	let errors: { [K in keyof Event]?: string } = {};
	let apiError: string | null = null;

	let eventData: Partial<Event> = {};

	$: show, refreshData();

	const refreshData = () => {
		eventData = { ...event, start_time: isoStringToLocal(event.start_time) };
		errors = {};
		apiError = null;
	};

	const createEvent = async () => {
		const response = await fetch(`${API_URL}/events`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(eventData)
		});

		if (response.ok) {
			eventData = {};
			show = false;
		} else {
			apiError = response.status + ' ' + response.statusText;
		}
	};

	const updateEvent = async () => {
		const response = await fetch(`${API_URL}/events/${eventData._id}`, {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(eventData)
		});

		if (response.ok) {
			eventData = {};
			show = false;
		} else {
			apiError = response.status + ' ' + response.statusText;
		}
	};

	const onSubmit = () => {
		if (!validate()) {
			return;
		}
		eventData = {
			...eventData,
			start_time: localToIsoString(eventData.start_time)
		};
		type == 'Create' ? createEvent() : updateEvent();
	};

	const validate = () => {
		let success = true;
		errors = {};
		if (!eventData.name || eventData.name.length == 0) {
			errors.name = 'Name cannot be empty';
			success = false;
		}
		if (!eventData.location || eventData.location.length == 0) {
			errors.location = 'Location cannot be empty';
			success = false;
		}
		if (!eventData.description || eventData.description.length == 0) {
			errors.description = 'Description cannot be empty';
			success = false;
		}
		if (!eventData.start_time || eventData.start_time.length == 0) {
			errors.start_time = 'Start time cannot be empty';
			success = false;
		} else if (dayjs(eventData.start_time).isBefore(dayjs())) {
			errors.start_time = 'Start time cannot be in the past';
			success = false;
		}
		if (!eventData.duration || eventData.duration == 0) {
			errors.duration = 'Duration cannot be empty or zero';
			success = false;
		}
		if (!eventData.virtual) {
			eventData.virtual = false;
		}
		return success;
	};

	const localToIsoString = (localStr: string | undefined): string => {
		if (!localStr || localStr.length == 0) return '';
		const isoStr = dayjs.tz(localStr, 'YYYY-MM-DDTHH:mm', 'America/Chicago').toISOString();
		return isoStr;
	};

	const isoStringToLocal = (isoStr: string | undefined): string => {
		if (!isoStr || isoStr.length == 0) return '';
		const localTimeStr = dayjs(isoStr).tz('America/Chicago').format('YYYY-MM-DDTHH:mm');
		return localTimeStr;
	};

	$: console.log(eventData);
</script>

<Modal bind:show>
	<div class="flex flex-col  p-2">
		<h1 class="text-xl mb-3 font-serif">{type} Event</h1>

		<form class="flex flex-col gap-5">
			<SmartInput label="Event Name" bind:error={errors.name}>
				<input type="text" class="bg-gray-700 rounded-sm p-1" bind:value={eventData.name} />
			</SmartInput>
			<SmartInput label="Location" bind:error={errors.location}>
				<input type="text" class="bg-gray-700 rounded-sm p-1" bind:value={eventData.location} />
			</SmartInput>

			<SmartInput label="Description" bind:error={errors.description}>
				<textarea
					class="bg-gray-700 rounded-sm p-1 hover:resize-y"
					bind:value={eventData.description}
				/>
			</SmartInput>

			<div class="flex flex-col md:flex-row justify-start gap-5">
				<SmartInput bind:error={errors.start_time} label="Starts at" sublabel="Central Time">
					<input
						type="datetime-local"
						class="bg-gray-700 rounded-sm p-1"
						bind:value={eventData.start_time}
					/>
				</SmartInput>
				<div class="flex flex-row gap-5">
					<SmartInput label="Duration" sublabel="Hours" bind:error={errors.duration}>
						<input
							type="number"
							min={0}
							max={24}
							step="0.01"
							class="bg-gray-700 rounded-sm p-1"
							bind:value={eventData.duration}
						/>
					</SmartInput>
					<SmartInput label="Virtual" bind:error={errors.virtual}>
						<input
							type="checkbox"
							class="bg-gray-700 rounded-sm p-2 w-5 h-5 accent-pink-500"
							bind:checked={eventData.virtual}
						/>
					</SmartInput>
				</div>
			</div>

			<div class="w-32 md:w-96 flex flex-col">
				<button
					class="p-2 rounded-md bg-green-600 hover:bg-green-500 duration-300"
					on:click={onSubmit}>Go</button
				>
				<div class="text-red-500 ml-1 text-sm {apiError ? '' : 'hidden'}">
					{apiError}
				</div>
			</div>
		</form>
	</div>
</Modal>
