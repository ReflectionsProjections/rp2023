<script lang="ts">
	import EventModal from '$lib/components/event-modal.svelte';
	import type { Event } from '$lib/types';
	import Icon from '@iconify/svelte';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import { API_URL } from '../../../constants';

	let events: Event[] = [];
	const loadEvents = async () => {
		const res = await fetch(`${$API_URL}/events`);
		events = await res.json();
	};
	onMount(loadEvents);

	let errorMessage: string | null = null;

	let eventModalData: { show: boolean; type: 'Create' | 'Update'; event: Partial<Event> } = {
		show: false,
		type: 'Create',
		event: {}
	};

	const onNewEventClick = () => {
		eventModalData.show = true;
		eventModalData.type = 'Create';
		eventModalData.event = {};
	};

	const onUpdateEventClick = (event: Event) => {
		eventModalData.show = true;
		eventModalData.type = 'Update';
		eventModalData.event = event;
	};

	const onDeleteEventClick = async (event: Event) => {
		const response = await fetch(`${$API_URL}/events/${event._id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.ok) {
			loadEvents();
		} else {
			errorMessage = response.status + ' ' + response.statusText;
		}
	};

	const showNotImplemented = () => window.alert('This feature is currently unimplemented.');
</script>

<EventModal
	bind:show={eventModalData.show}
	type={eventModalData.type}
	event={eventModalData.event}
	{loadEvents}
/>
<div class="h-full text-white flex justify-between flex-col my-20">
	<div
		class="bg-black bg-opacity-10 rounded-lg p-3 md:p-7 mx-auto w-full md:w-10/12 lg:w-11/12 text-sm md:text-base"
	>
		<div class="flex flex-row justify-between items-baseline">
			<h1 class="text-xl mb-3 p-2 font-serif">Events Dashboard</h1>
			<span class="flex flex-row">
				<button
					class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min"
					on:click={onNewEventClick}>New</button
				>
			</span>
		</div>

		<div class="p-3 bg-white bg-opacity-10 rounded-md overflow-x-auto">
			<table class="w-full table-auto border-spacing-10 border-collapse border-hidden">
				<thead class="text-left tracking-wider">
					<th title="Publicly Viewable"><Icon icon="material-symbols:public" class="text-2xl" /></th
					>
					<th>Event</th>
					<th>Location</th>
					<th>Description</th>
					<th>Starts at</th>
					<th>Ends at</th>
					<th>Upgrades</th>
					<th>Virtual</th>
					<th>Actions</th>
				</thead>
				<tbody>
					{#each events as event}
						<tr class="bg-opacity-0 hover:bg-opacity-10 bg-black duration-300">
							<td>
								{#if event.visible}
									<Icon icon="gridicons:visible" class="mx-auto text-xl text-green-400" />
								{:else}
									<Icon icon="gridicons:not-visible" class="mx-auto text-xl" />
								{/if}
							</td>
							<td title={event.name}>
								{event.name}
							</td>
							<td title={event.location}>
								{event.location}
							</td>
							<td title={event.description}>
								{event.description}
							</td>
							<td>
								{dayjs(event.start_time).tz('America/Chicago').format('llll')}
							</td>
							<td>
								{dayjs(event.end_time).tz('America/Chicago').format('llll')}
							</td>
							<td>
								{#if event.upgrade}
									<Icon icon="ph:check-bold" class="text-xl mx-auto text-green-400" />
								{:else}
									<Icon icon="maki:cross" class="text-xl mx-auto text-red-400" />
								{/if}
							</td>
							<td>
								{#if event.virtual}
									<Icon icon="ph:check-bold" class="text-xl mx-auto text-green-400" />
								{:else}
									<Icon icon="maki:cross" class="text-xl mx-auto text-red-400" />
								{/if}
							</td>
							<td>
								<div class="flex flex-row gap-5 justify-start text-xl">
									<button aria-label="" title="Edit" on:click={() => onUpdateEventClick(event)}>
										<Icon icon="material-symbols:edit-outline" />
									</button>
									<button aria-label="" title="Delete" on:click={() => onDeleteEventClick(event)}>
										<Icon icon="material-symbols:delete-outline" />
									</button>
									<button aria-label="" title="Duplicate" on:click={showNotImplemented}>
										<Icon icon="heroicons-outline:document-duplicate" />
									</button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<div class="p-1 flex w-full flex-row justify-between text-sm text-gray-300">
			<div class="text-black {errorMessage ? 'visible' : 'invisible'}">
				{errorMessage}
			</div>
			<div>
				Showing {events.length} rows
			</div>
		</div>
	</div>
</div>

<style>
	th,
	td {
		padding: 0.5rem;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		border-width: 1px;
		--tw-border-opacity: 0.3;
		border-color: rgb(209 213 219 / var(--tw-border-opacity));
		text-overflow: ellipsis;
		overflow: hidden;
		max-height: 8rem;
		white-space: nowrap;
		max-width: 280px;
	}
</style>
