<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';

	let email = '';

	// Basic regex for validating emails. NOT RFC2822 compliant, but will not have any false negatives.
	// Philosophy: Best way to validate an email is by sending a verification token to it.
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	$: emailValid = email.length > 0 && regex.test(email);
</script>

<div class="flex items-center h-full justify-center">
	<div class="w-[95%] md:w-3/5 text-gray-200">
		<GlassContainer>
			<div class="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-400">
				<div class="flex flex-col text-slate-200 gap-5 grow md:p-5 p-2 pb-4 min-w-max">
					<div>
						<h1 class="text-xl">Welcome</h1>
						<div class="text-slate-300">Let's get you signed in</div>
					</div>

					<div class="flex flex-col">
						<label for="email">Email Address</label>
						<input
							id="email"
							type="email"
							class="bg-transparent border border-slate-200 rounded-md p-1 px-2 w-full"
							placeholder="joanna2@illinois.edu"
							bind:value={email}
						/>
						<button
							class="p-2 mt-2 w-fit bg-black rounded-md opacity-100 disabled:opacity-0 bg-opacity-20 hover:bg-opacity-40 duration-300"
							disabled={!emailValid}>Send me a code to {email}</button
						>
					</div>

					<div class="flex flex-col opacity-0">
						<label for="email">One Time Code</label>
						<input
							id="email"
							type="email"
							class="bg-transparent border border-slate-200 rounded-md p-1 px-2 w-full"
							placeholder="231288"
						/>
					</div>

					<div class="flex flex-col text-center text-sm">
						<h3>Don't have an account yet?</h3>
						<a href="/register" class="underline">Sign up instead</a>
					</div>
				</div>
				<div class="flex text-gray-300  md:p-5 p-2 items-center md:w-72 pt-4">
					<div class="flex flex-col gap-2">
						<h3 class="text-lg text-gray-200">Did you know?</h3>
						<div>Attending R|P talks and events gives you priority for food!</div>
					</div>
				</div>
			</div>
		</GlassContainer>
	</div>
</div>
