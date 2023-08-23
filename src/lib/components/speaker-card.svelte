<script lang="ts">
	import type { Speaker } from '$lib/types';
	import GlassContainer from '../../components/glass-container.svelte';
	import ShootingStar from '../../components/shooting-star.svelte';
	import Icon from '@iconify/svelte';

	export let speaker: Speaker;

	function scheduleDescControl(event: MouseEvent) {
		const target = event.currentTarget as HTMLInputElement;
		let event_target_id = target.id.toLowerCase();
		let desc_div_target = document.getElementById('description-div-' + event_target_id);
		let desc_text_target = document.getElementById('description-text-' + event_target_id);
		let icon_up_arrow_target = document.getElementById('icon-arrow-up-' + event_target_id);
		let icon_down_arrow_target = document.getElementById('icon-arrow-down-' + event_target_id);
		// let expand_target = document.getElementById("expand-" + event_target_id);
		desc_div_target?.classList.toggle('h-fit');
		desc_div_target?.classList.toggle('h-full');
		desc_text_target?.classList.toggle('line-clamp-3');
		icon_up_arrow_target?.classList.toggle('invisible');
		icon_down_arrow_target?.classList.toggle('invisible');
	}
</script>

<span
	class="w-[90%] md:w-2/3 flex flex-col md:flex-row p-3 md:p-5 mb-10 bg-rp-cream rounded-xl bg-[url(/sun-vector.png)] bg-no-repeat bg-opacity-100"
>
	<div class="md:w-1/4 flex flex-col items-center justify-center md:mr-4 text-2xl">
		<div class="w-full flex justify-center items-center mt-2">
			<img
				src="/speakers/{speaker.id}.jpg"
				alt={speaker.name}
				class="w-48 h-48 object-cover rounded-full"
			/>
		</div>
	</div>
	<div class="md:w-3/4 flex flex-col font-sans mt-2">
		<div
			class="flex flex-col items-center text-center text-2xl bg-gradient-to-r from-rp-hot-pink to-rp-blue text-white rounded-xl p-2 mb-2"
		>
			{speaker.name}
		</div>
		<div class="">
			<p
				class=" decoration-rp-hot-pink pt-2 inline-block pl-2 pr-2 font-bold bg-rp-cream text-black bg-opacity-60"
			>
				{speaker.role}
			</p>
		</div>
		<div class="flex grow-0 w-full h-fit" id="description-div-event-{speaker.id}">
			<p
				class="h-full w-full line-clamp-3 overflow-hidden bg-rp-cream text-black bg-opacity-60 rounded-xl pl-2 pt-2 pr-2"
				id="description-text-event-{speaker.id}"
			>
				{speaker.bio}
			</p>
		</div>
		<div class="relative flex grow-0 w-full h-full" id="expand-event-{speaker.id}">
			<label class="flex w-full h-6 place-content-center cursor-pointer">
				<input
					class="sr-only peer"
					type="checkbox"
					on:click={scheduleDescControl}
					id="event-{speaker.id}"
				/>
				<Icon
					class="absolute flex h-fit aspect-square visible"
					icon="mdi:chevron-down"
					width="auto"
					height="auto"
					id="icon-arrow-down-event-{speaker.id}"
				/>
				<Icon
					class="absolute flex h-fit aspect-square invisible"
					icon="mdi:chevron-up"
					width="auto"
					height="auto"
					id="icon-arrow-up-event-{speaker.id}"
				/>
			</label>
		</div>
	</div>
</span>
