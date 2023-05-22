<script lang="ts">
	import Icon from '@iconify/svelte';
	export let isCollegeStudent: string = '';
</script>

<div class="flex flex-col">
	<label for="is-college-student" class="mx-1 mb-2">Are you a college student? </label>
	<div
		class="rounded-md flex flex-row bg-white bg-opacity-5 border-gray-700"
		id="is-college-student"
	>
		<button
			class="w-full p-2 flex justify-center bg-white rounded-l-md {isCollegeStudent === 'yes'
				? 'bg-opacity-20'
				: 'bg-opacity-0 hover:bg-opacity-10'}"
			aria-label="yes"
			title="Yes, I am!"
			on:click={() => {
				isCollegeStudent = 'yes';
			}}
		>
			<Icon icon="ph:student-fill" class="text-2xl" />
		</button>
		<button
			class="w-full p-2 flex justify-center bg-white rounded-r-md {isCollegeStudent !== 'yes'
				? 'bg-opacity-20'
				: 'bg-opacity-0 hover:bg-opacity-10'}"
			aria-label="no"
			title="No, I'm not"
			on:click={() => {
				isCollegeStudent = '';
			}}
		>
			<Icon icon="ph:user-fill" class="text-2xl" />
		</button>
	</div>
</div>
