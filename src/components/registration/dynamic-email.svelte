<script lang="ts">
	import { API_URL } from '../../constants';
	export let uiucStudent: string;
	export let email: string;
	export let error: string | undefined;

	let uiucEmail = '';

	$: email =
		uiucEmail.length > 0
			? uiucEmail.split(' ')[0].split('@')[0].trim().toLocaleLowerCase() + '@illinois.edu'
			: '';

	// Basic regex for validating emails. NOT RFC2822 compliant, but will not have any false negatives.
	// Philosophy: Best way to validate an email is by sending a verification token to it.
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	$: emailValid = email.length > 0 && regex.test(email);
	$: if (emailValid) error = undefined;
</script>

<div class="flex flex-col items-start">
	{#if uiucStudent === 'yes'}
		<label for="email"> NetID</label>
		<span class="flex flex-row items-center w-full">
			<input
				id="email"
				bind:value={uiucEmail}
				class="bg-transparent p-1 border border-r-0 border-gray-400 rounded-l-md max-w-[50%] md:max-w-full"
			/>
			<div
				class="bg-white bg-opacity-10 rounded-r-md py-1 border border-l-0 border-gray-400 pl-1 pr-2 w-fit"
			>
				@illinois.edu
			</div>
		</span>
	{:else}
		<label for="email">Email Address</label>
		<input
			id="email"
			bind:value={email}
			class="bg-transparent p-1 border border-gray-400 rounded-md h-fit w-full"
		/>
	{/if}
	{#if error}
		<div class="{error ? 'opacity-100' : 'opacity-0'} text-sm ml-1 text-red-400 duration-300">
			{error}
		</div>
	{/if}
	<div class="{emailValid ? 'opacity-100' : 'opacity-0'} text-green-300 mt-2 duration-300">
		To ensure it's you, we'll ask for a code from {email} at the end.
	</div>
</div>
