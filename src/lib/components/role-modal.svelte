<script lang="ts">
	import Modal from '$lib/util/modal.svelte';
	import { API_URL } from '../../constants';
	import type { Role } from '$lib/types';
	import SmartInput from '../util/smart-input.svelte';

	const initialRole = {
		email: '',
		role: ''
	};
	let roleData: Role = initialRole;

	export let show: boolean;
	export let loadRoles: Function;

	let errors: { [K in keyof Role]?: string } = {};
	let apiError: string | null = null;

	const validationFails = () => {
		let email = roleData.email.trim();
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!regex.test(email)) {
			errors.email = 'This is not a valid email';
			return true;
		}
		return false;
	};

	const createEvent = async () => {
		if (validationFails()) return;

		const response = await fetch(`${$API_URL}/roles`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(roleData)
		});

		if (response.ok) {
			roleData = initialRole;
			show = false;
			loadRoles();
		} else {
			apiError = response.status + ' ' + response.statusText;
		}
	};
</script>

<Modal bind:show>
	<div class="flex flex-col p-2">
		<h1 class="text-xl mb-3 font-serif">Create Role</h1>

		<form class="flex flex-col gap-5">
			<SmartInput label="User Email" sublabel="Ensure correctness" bind:error={errors.email}>
				<input type="text" class="bg-gray-700 rounded-sm p-1" bind:value={roleData.email} />
			</SmartInput>
			<SmartInput label="Role" bind:error={errors.role}>
				<select
					class="duration-300 p-3 bg-white
					text-center
					bg-opacity-10 hover:bg-opacity-20"
					bind:value={roleData.role}
				>
					{#each ['Admin', 'Corporate'] as role}
						<option value={role} class="bg-rp-blue">
							{role}
						</option>
					{/each}
				</select>
			</SmartInput>

			<div class="w-32 md:w-96 flex flex-col">
				<button
					class="p-2 rounded-md bg-green-600 hover:bg-green-500 duration-300"
					on:click={createEvent}>Go</button
				>
				<div class="text-red-500 ml-1 text-sm {apiError ? '' : 'hidden'}">
					{apiError}
				</div>
			</div>
		</form>
	</div>
</Modal>
