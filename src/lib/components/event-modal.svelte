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
	export let loadEvents: Function;

	let errors: { [K in keyof Event]?: string } = {};
	let apiError: string | null = null;

	let eventData: Partial<Event> = {};

	$: show, refreshData();

	const refreshData = () => {
		eventData = {
			...event,
			start_time: isoStringToLocal(event.start_time),
			end_time: isoStringToLocal(event.end_time)
		};
		errors = {};
		apiError = null;
	};

	const createEvent = async () => {
		const response = await fetch(`${$API_URL}/events`, {
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
			loadEvents();
		} else {
			apiError = response.status + ' ' + response.statusText;
		}
	};

	const updateEvent = async () => {
		const response = await fetch(`${$API_URL}/events/${eventData._id}`, {
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
			loadEvents();
		} else {
			apiError = response.status + ' ' + response.statusText;
		}
	};

	const onSubmit = () => {
		if (!validate()) {
			console.info('validation has failed');
			return;
		}
		eventData = {
			...eventData,
			start_time: localToIsoString(eventData.start_time),
			end_time: localToIsoString(eventData.end_time)
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
		if (!eventData.end_time || eventData.end_time.length == 0) {
			errors.end_time = 'end time cannot be empty';
			success = false;
		} else if (dayjs(eventData.end_time).isBefore(dayjs())) {
			errors.end_time = 'end time cannot be in the past';
			success = false;
		} else if (dayjs(eventData.end_time).isBefore(dayjs(eventData.start_time))) {
			errors.end_time = 'end time cannot be before start time'
			success = false;
		} else if (dayjs(eventData.end_time).isSame(dayjs(eventData.start_time))) {
			errors.end_time = 'end time cannot be the same as start time'
			success = false;
		}
		if (!eventData.upgrade) {
			eventData.upgrade = false;
		}
		if (!eventData.downgrade) {
			eventData.downgrade = false;
		}
		if (eventData.upgrade && eventData.downgrade) {
			errors.downgrade = 'Event cannot be both upgrade & downgrade';
			success = false;
		}
		if (!eventData.visible) {
			eventData.visible = false;
		}
		if (!eventData.virtual) {
			eventData.virtual = false;
		}
		if (!eventData.imageUrl) {
			eventData.imageUrl = null;
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
</script>

<Modal bind:show>
	<div class="flex flex-col p-2">
		<h1 class="text-xl mb-3 font-serif">{type} Event</h1>

		<form class="flex flex-col gap-5">
			<SmartInput label="Event Name" bind:error={errors.name}>
				<input type="text" class="bg-gray-700 rounded-sm p-1" bind:value={eventData.name} />
			</SmartInput>
			<SmartInput label="Location" bind:error={errors.location}>
				<input type="text" class="bg-gray-700 rounded-sm p-1" bind:value={eventData.location} />
			</SmartInput>

			<SmartInput bind:error={errors.imageUrl} label="Image URL" sublabel="Optional, check preview">
				<input type="text" class="bg-gray-700 rounded-sm p-1" bind:value={eventData.imageUrl} />
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
				<SmartInput bind:error={errors.end_time} label="Ends at" sublabel="Central Time">
					<input
						type="datetime-local"
						class="bg-gray-700 rounded-sm p-1"
						bind:value={eventData.end_time}
					/>
				</SmartInput>
				<div class="flex flex-row gap-5">
					<!-- <SmartInput label	="Duration" sublabel="Hours" bind:error={errors.duration}>
						<input
							type="number"
							min={0}
							max={24}
							step="0.01"
							class="bg-gray-700 rounded-sm p-1"
							bind:value={eventData.duration}
						/>
					</SmartInput> -->
					<SmartInput label="Virtual" bind:error={errors.virtual}>
						<input
							type="checkbox"
							class="bg-gray-700 rounded-sm p-2 w-5 h-5 accent-pink-500"
							bind:checked={eventData.virtual}
						/>
					</SmartInput>
				</div>
			</div>
			<div class="flex flex-row gap-5">
				<SmartInput label="Upgrades" sublabel="to priority status" bind:error={errors.upgrade}>
					<input
						type="checkbox"
						class="bg-gray-700 rounded-sm p-2 w-5 h-5 accent-pink-500"
						bind:checked={eventData.upgrade}
					/>
				</SmartInput>
				<SmartInput label="Downgrades" sublabel="to general status" bind:error={errors.downgrade}>
					<input
						type="checkbox"
						class="bg-gray-700 rounded-sm p-2 w-5 h-5 accent-pink-500"
						bind:checked={eventData.downgrade}
					/>
				</SmartInput>
				<SmartInput label="Visible" sublabel="to everyone" bind:error={errors.visible}>
					<input
						type="checkbox"
						class="bg-gray-700 rounded-sm p-2 w-5 h-5 accent-pink-500"
						bind:checked={eventData.visible}
					/>
				</SmartInput>
			</div>

			{#if eventData.imageUrl}
				<h1>Preview Image</h1>
				<img src={eventData.imageUrl} alt="Preview" height="200" width="200" />
			{/if}

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
