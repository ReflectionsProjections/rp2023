<script lang="ts">
	import Icon from '@iconify/svelte';
	import fileIcon from './fileIcon.svg';

	type InfoPage = 'who' | 'what' | 'when' | 'where';
	const pages: InfoPage[] = ['who', 'what', 'when', 'where'];
	let infoPage: InfoPage = 'who';
</script>

<div class="flex flex-col my-20 bg-rp-cream text-rp-blue p-2 w-full max-w-3xl rounded-sm">
	<div class="flex flex-row items-center">
		<div class="border border-rp-blue w-full h-4 m-0.5" />
		<div class="flex flex-row text-rp-blue">
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

	<div class="bg-rp-subtle-pink p-1 mt-2">
		<div
			class="flex flex-row w-full justify-evenly md:text-sm text-xs uppercase font-semibold p-0.5"
		>
			{#each pages as page}
				<button
					class="p-2 w-14 flex flex-col items-center uppercase"
					on:click={() => (infoPage = page)}
				>
					<img src={fileIcon} alt={`${page}.txt`} />
					<p class="{infoPage === page && 'underline decoration-wavy'} decoration-rp-hot-pink">
						{page}.txt
					</p>
				</button>
			{/each}
		</div>

		<div class="h-1/2 mt-2">
			<div
				class="flex flex-row rounded-t-md bg-rp-cream border border-rp-blue w-fit px-2 py-0.5 border-b-0 font-bold"
			>
				<p class="uppercase">{infoPage}.TXT</p>
			</div>
			<div class="w-full min-h-[18rem] bg-rp-cream border border-rp-blue p-2">
				{#if infoPage === 'who'}
					<p>
						Anyone and everyone over the age of 18. No matter your background or affiliation with
						the University of Illinois, <b>R|P welcomes you.</b>
					</p>
				{:else if infoPage === 'what'}
					<p>
						Hear from speakers from <b>industry and academia</b> on various topics in tech,
						<b>network with company representatives</b>
						through a career fair, and walk away with a sense of fulfillment,
						<b>free food, and swag</b>.
						<br />
						<br />
						Register for a week of events for absolutely <b>zero cost</b>.
					</p>
				{:else if infoPage === 'when'}
					<p>
						September 18 - 22
						<br />
						<br />
						Each day, we bring <b>new speakers and companies</b>, with events starting from early
						afternoon. Check out the <b>Schedule</b> for a more detailed timeline so you don’t miss out
						on ones that pique your interest!
					</p>
				{:else if infoPage === 'where'}
					<p>
						<b>In-Person</b>
						<br />
						<br />
						University of Illinois Urbana-Champaign at
						<br />
						<b>Siebel Center for Computer Science</b>
						<br />
						201 N Goodwin Ave, Urbana, IL 61801
						<br />
						<br />
						Some events are held at
						<b>Campus Instructional Facility</b>
						<br />
						1405 W Springfield Ave, Urbana, IL 61801
					</p>
				{/if}
			</div>
		</div>
	</div>
</div>
