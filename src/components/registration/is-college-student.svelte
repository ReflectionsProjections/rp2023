<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { boolStr } from './misc-types';
	export let isUIUCStudent: boolStr;
	export let isCollegeStudent: boolStr;
	export let collegeName: string;
	export let major: string;
</script>

<div class="flex flex-col rounded-md border-gray-700">
	<button
		class="w-full duration-300 flex-col items-center h-20 gap-1 p-2 flex justify-center bg-white rounded-t-md {isUIUCStudent ===
		'yes'
			? 'bg-opacity-40'
			: 'bg-opacity-10 hover:bg-opacity-20'}"
		aria-label="I am a UIUC student"
		on:click={() => {
			isUIUCStudent = 'yes';
			isCollegeStudent = 'yes';
			collegeName = 'UIUC';
		}}
	>
		<img src="uiuc-logo.svg" alt="illinois logo" class="h-full p-3" />
	</button>
	<span class="flex flex-row">
		<button
			class="w-full duration-300 flex-col items-center gap-1 p-3 flex justify-center bg-white rounded-bl-md {isCollegeStudent ===
				'yes' && isUIUCStudent === 'no'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			aria-label="I'm from another college"
			on:click={() => {
				isCollegeStudent = 'yes';
				isUIUCStudent = 'no';
				collegeName = '';
			}}
		>
			<Icon icon="ph:student-fill" class="text-2xl" />
			<div>I'm from another college</div>
		</button>
		<button
			class="w-full duration-300 flex-col items-center gap-1 p-3 flex justify-center bg-white rounded-br-md {isCollegeStudent !==
			'yes'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			aria-label="I am not a college student"
			on:click={() => {
				isCollegeStudent = 'no';
				isUIUCStudent = 'no';
				collegeName = 'N/A';
				major = 'N/A';
			}}
		>
			<Icon icon="ph:user-fill" class="text-2xl" />
			<div>Not a college student</div>
		</button>
	</span>
</div>
