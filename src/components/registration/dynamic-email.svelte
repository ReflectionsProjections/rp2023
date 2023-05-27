<script lang="ts">
	export let uiucStudent: string;
	export let email: string;

	let uiucEmail = '';

	$: email = uiucEmail.length > 0 ? uiucEmail.split('@')[0].trim() + '@illinois.edu' : '';
</script>

{#if uiucStudent === 'yes'}
	<div class="flex flex-col items-start">
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
	</div>
{:else}
	<div class="flex flex-col items-start">
		<label for="email">Email Address</label>
		<input
			type="email"
			id="email"
			bind:value={email}
			class="bg-transparent p-1 border border-gray-400  rounded-md h-fit w-full"
			required
		/>
	</div>
{/if}
