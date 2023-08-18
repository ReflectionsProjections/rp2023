<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { Status } from '$lib/types';
	import { fade, slide } from 'svelte/transition';

	export let verifyPasscode: Status;
	export let createUser: Status;
	export let uploadResume: Status;
	export let errors: string[] | null;

	const statusStyleMap: Record<Status, string> = {
		waiting: 'opacity-25 text-gray-400',
		in_progress: 'opacity-100  text-gray-400',
		failed: 'opacity-100 text-red-400',
		success: 'opacity-100 text-green-400'
	};
</script>

<div class="flex flex-col gap-3 my-4 items-center" in:slide>
	<div class="flex flex-row items-center gap-2 {statusStyleMap[verifyPasscode]} duration-300">
		<Icon icon="ion:finger-print-sharp" class="text-2xl" />
		<p>Verifying biometrics</p>
	</div>
	<div class="flex flex-row items-center gap-2 {statusStyleMap[createUser]} duration-300">
		<Icon icon="la:clone-solid" class="text-3xl" />
		<p>Creating your digital clone</p>
	</div>
	<div class="flex flex-row items-center gap-2 {statusStyleMap[uploadResume]} duration-300">
		<Icon icon="fa6-solid:user-secret" class="text-2xl" />
		<p>Uploading Secret Documents</p>
	</div>

	{#if uploadResume === 'success'}
		<div
			class="flex flex-row items-center gap-2 text-white duration-300"
			in:fade={{ duration: 500 }}
		>
			<p>Welcome to Reflections | Projections</p>
		</div>
	{/if}

	{#if errors && errors.length > 0}
		<div class="flex flex-col bg-black bg-opacity-10 rounded-md p-4 m-2">
			<div class="text-gray-200 mb-1">We encountered the following problems:</div>
			{#each errors as error}
				<div class="text-red-400">{error}</div>
			{/each}
		</div>
	{/if}
</div>
