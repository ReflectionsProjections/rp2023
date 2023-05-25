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
				class="bg-transparent p-1 border border-r-0 border-gray-400 rounded-l-md h-fit"
				required
			/>
			<div
				class="bg-white bg-opacity-10 rounded-r-md p-1 border border-l-0 border-gray-400 pl-2 pr-5"
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
