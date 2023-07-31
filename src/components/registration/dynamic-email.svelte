<script lang="ts">
	export let uiucStudent: string;
	export let email: string;
	let emailSent = false;

	let uiucEmail = '';

	$: email =
		uiucEmail.length > 0
			? uiucEmail.split(' ')[0].split('@')[0].trim().toLocaleLowerCase() + '@illinois.edu'
			: '';

	// Basic regex for validating emails. NOT RFC2822 compliant, but will not have any false negatives.
	// Philosophy: Best way to validate an email is by sending a verification token to it.
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	$: emailValid = email.length > 0 && regex.test(email);

	const generateVerification = async () => {
		if (!emailValid) {
			return;
		}

		const response = await fetch(`http://localhost:3000/auth/generate`, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});

		if (response.ok) {
			emailSent = true;
		} else {
			if (response.status === 429) {
				emailSent = true;
			}
		}
	};
</script>

<div class="flex flex-col items-start">
	{#if uiucStudent === 'yes'}
		<label for="email"> NetID</label>
		<span class="flex flex-row items-center w-full">
			<input
				id="email"
				bind:value={uiucEmail}
				class="bg-transparent p-1 border border-r-0 border-gray-400 rounded-l-md max-w-[50%] md:max-w-full"
				required
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
			type="email"
			id="email"
			bind:value={email}
			class="bg-transparent p-1 border border-gray-400  rounded-md h-fit w-full"
			required
		/>
	{/if}
	<div class="{emailValid ? 'opacity-100' : 'opacity-0'} text-green-300 mt-2 duration-300">
		We'll send you a code at {email}

		{#if !emailSent}
			<button
				class="p-2 mt-2 px-3 flex flex-row gap-2 items-center bg-white rounded-md opacity-100 disabled:opacity-0 bg-opacity-20 hover:bg-opacity-40 duration-500 border-gray-400"
				on:click={generateVerification}
			>
				<div>Send me a code to {email}</div>
			</button>
		{/if}
	</div>
</div>
