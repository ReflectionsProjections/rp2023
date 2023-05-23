<script lang="ts">
	import Icon from '@iconify/svelte';
	export let isUIUCStudent: string = '';
</script>

<div class="flex flex-col">
	<div class="rounded-md flex flex-row bg-white bg-opacity-5 border-gray-700">
		<button
			class="w-full flex-col items-center gap-1 p-2 flex justify-center bg-white rounded-l-md {isUIUCStudent ===
			'yes'
				? 'bg-opacity-40'
				: 'bg-opacity-20 hover:bg-opacity-10'}"
			aria-label="I am a UIUC student"
			on:click={() => {
				isUIUCStudent = 'yes';
			}}
		>
			<img src="uiuc-logo.svg" alt="illinois logo" />
		</button>
		<button
			class="w-full flex-col items-center gap-1 p-2 flex justify-center bg-white rounded-r-md {isUIUCStudent !==
			'yes'
				? 'bg-opacity-40'
				: 'bg-opacity-20 hover:bg-opacity-10'}"
			aria-label="I'm from another institution"
			on:click={() => {
				isUIUCStudent = '';
			}}
		>
			<Icon icon="teenyicons:school-solid" class="text-2xl" />
			<div>I'm from another institution</div>
		</button>
	</div>
</div>
