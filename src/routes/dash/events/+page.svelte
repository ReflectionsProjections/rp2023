<script lang="ts">
	import type { PageData } from './$types';
	import type { Event } from '$lib/types';
	import GlassContainer from '../../../components/glass-container.svelte';
	import dayjs from 'dayjs';

	export let data: PageData;
	const events = data.events as Event[];

	console.log(events);
</script>

<div class="h-full text-white flex justify-center flex-col">
	<div class="mx-auto w-9/12">
		<GlassContainer>
			<h1 class="text-xl mb-6 font-serif">Events Dashboard</h1>

			<div class="p-3 bg-white bg-opacity-10 rounded-md">
				<table class="w-9/12 table-auto  border-spacing-10 ">
					<thead class="text-left">
						<th>Event</th>
						<th>Description</th>
						<th>Starts at</th>
						<th>Duration</th>
					</thead>
					<tbody>
						{#each events as event}
							<tr>
								<td>
									{event.name}
								</td>
								<td>
									{event.description}
								</td>
								<td>
									{dayjs(event.start_time).format('MMMM D, YYYY h:m A')}
								</td>
								<td>
									{event.duration}
									{' '} hours
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</GlassContainer>
	</div>
</div>

<style>
	th,
	td {
		padding: 0.5rem;
	}
</style>
