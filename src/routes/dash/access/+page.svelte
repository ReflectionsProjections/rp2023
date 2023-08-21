<script lang="ts">
	import { onMount } from 'svelte';
	import { API_URL } from '../../../constants';
	import type { Role } from '$lib/types';

	import Icon from '@iconify/svelte';
	import RoleModal from '../../../lib/components/role-modal.svelte';

	let showModal = false;

	let searchTerm = '';
	const filter = (role: Role): boolean => {
		const search = searchTerm.toLowerCase();
		return role.email.toLowerCase().includes(search) || role.role.toLowerCase().includes(search);
	};

	let allRoles: Role[] = [];
	let roles: Role[] = [];
	let errorMessage: string;

	$: if (searchTerm.length > 0) {
		roles = allRoles.filter(filter);
	} else {
		roles = allRoles;
	}

	const loadRoles = async () => {
		const response = await fetch(`${$API_URL}/roles`, {
			credentials: 'include',
			cache: 'no-cache'
		});

		const data = await response.json();

		if (response.ok) {
			allRoles = data;
		} else {
			errorMessage = data.message;
			console.error(response.statusText);
			console.error(data.message);
		}
	};

	const onDeleteEventClick = async (role: Role) => {
		const response = await fetch(`${$API_URL}/roles/${role._id}`, {
			method: 'DELETE',
			credentials: 'include'
		});

		if (response.ok) {
			loadRoles();
		} else {
			errorMessage = response.status + ' ' + response.statusText;
		}
	};
	onMount(loadRoles);
</script>

<RoleModal bind:show={showModal} {loadRoles} />
<div class="h-full text-white flex justify-between flex-col my-20">
	<div
		class="bg-black bg-opacity-10 rounded-lg p-2 md:p-7 mx-auto w-full md:w-10/12 lg:w-11/12 text-sm md:text-base"
	>
		<div class="flex flex-row justify-between items-baseline">
			<h1 class="text-xl mb-3 p-2 font-serif">Access Dashboard</h1>
			<span class="flex flex-row">
				<button
					class="py-1 px-3 bg-pink-600 bg-opacity-80 hover:bg-opacity-100 duration-300 rounded-md h-min"
					on:click={() => {
						showModal = true;
					}}>New</button
				>
			</span>
		</div>

		<div class="flex flex-row gap-2 mb-3 items-center w-full md:w-1/2">
			<label for="search" class="text-3xl"> <Icon icon="material-symbols:search" /> </label>
			<input
				type="text"
				name="search"
				id="search"
				bind:value={searchTerm}
				placeholder="Email or Role"
				class="bg-transparent border border-gray-400 rounded-md p-1"
			/>
		</div>

		<div class="p-3 bg-white bg-opacity-10 rounded-md overflow-x-auto">
			<table class="w-full table-auto border-spacing-10 border-collapse border-hidden">
				<thead class="text-left tracking-wider">
					<th>Email</th>
					<th>Role</th>
					<th>Revoke</th>
				</thead>
				<tbody>
					{#each roles as role}
						<tr
							class=" {role.role === 'Admin' &&
								'text-red-200 font-bold'} bg-opacity-0 hover:bg-opacity-10 duration-300"
						>
							<td title={role.email}>
								{role.email}
							</td>
							<td title={role.role}>
								{role.role}
							</td>
							<td title="Revoke Role">
								<button aria-label="Revoke Access" on:click={() => onDeleteEventClick(role)}>
									<Icon
										icon="ph:x-fill"
										class="text-white hover:text-red-600 duration-200 text-2xl"
									/>
								</button>
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
				Showing {roles.length} rows
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
