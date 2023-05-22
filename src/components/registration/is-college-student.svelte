<script lang="ts">
	import Icon from '@iconify/svelte';
	export let isCollegeStudent: string = '';
</script>

<div class="flex flex-col">
	<div class="rounded-md flex flex-row bg-white bg-opacity-5 border-gray-700">
		<button
			class="w-full flex-col items-center gap-1 p-2 flex justify-center bg-white rounded-l-md {isCollegeStudent ===
			'yes'
				? 'bg-opacity-20'
				: 'bg-opacity-0 hover:bg-opacity-10'}"
			aria-label="I am a college student"
			on:click={() => {
				isCollegeStudent = 'yes';
			}}
		>
			<Icon icon="ph:student-fill" class="text-2xl" />
			<div>I'm a college student</div>
		</button>
		<button
			class="w-full flex-col items-center gap-1 p-2 flex justify-center bg-white rounded-r-md {isCollegeStudent !==
			'yes'
				? 'bg-opacity-20'
				: 'bg-opacity-0 hover:bg-opacity-10'}"
			aria-label="I am not a college student"
			on:click={() => {
				isCollegeStudent = '';
			}}
		>
			<Icon icon="ph:user-fill" class="text-2xl" />
			<div>Not a college student</div>
		</button>
	</div>
</div>
