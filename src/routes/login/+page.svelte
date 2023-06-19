<script lang="ts">
	import Icon from '@iconify/svelte';
	import GlassContainer from '../../components/glass-container.svelte';
	import { API_URL } from '../../constants';

	type ValidationMessage = { error: boolean; message: string; icon: string } | null;

	let email = '';
	let emailSent = false;
	let passcode = '';

	let emailValidationMsg: ValidationMessage = null;
	let passcodeValidationMsg: ValidationMessage = null;

	const generateVerification = async () => {
		if (!emailValid) return;

		const response = await fetch(`${API_URL}/auth/generate?isLogin=true`, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email })
		});
		if (response.ok) {
			emailValidationMsg = {
				icon: 'line-md:email',
				message: "We've sent a one-time code your way!",
				error: false
			};
			emailSent = true;
		} else {
			const res = await response.json();
			// Handle case where email has been sent, but page was refreshed
			if (response.status === 429) {
				emailSent = true;
			}
			emailValidationMsg = {
				icon: 'material-symbols:error-med-outline',
				message: res.message,
				error: true
			};
		}
	};

	const verifyPasscode = async () => {
		if (!emailValid || !passcodeValid) {
			return;
		}

		const response = await fetch(`${API_URL}/auth/verify`, {
			method: 'POST',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, passcode })
		});
		if (response.ok) {
			// Redirect to home page
			passcodeValidationMsg = {
				icon: 'line-md:email',
				message: "You're good to go!",
				error: false
			};
			window.location = '/' as Location | (string & Location);
		} else {
			const res = await response.json();
			passcodeValidationMsg = {
				icon: 'material-symbols:error-med-outline',
				message: res.message,
				error: true
			};
		}
	};

	const passcodeRegex = /^\d{6}$/;
	$: passcodeValid = passcode.length == 6 && passcodeRegex.test(passcode);

	// Basic regex for validating emails. NOT RFC2822 compliant, but will not have any false negatives.
	// Philosophy: Best way to validate an email is by sending a verification token to it.
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	$: emailValid = email.length > 0 && emailRegex.test(email);
</script>

<div class="flex items-center h-full justify-center">
	<div class="w-[95%] md:w-3/5 text-gray-200">
		<GlassContainer>
			<div class="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-400">
				<div class="flex flex-col text-slate-200 gap-5 grow md:p-4 p-2 pb-4">
					<div>
						<h1 class="text-xl">Welcome</h1>
						<div class="text-slate-300">Let's get you signed in</div>
					</div>

					<div class="flex flex-col">
						<div class="max-w-max text-gray-200">Email Address</div>
						<input
							id="email"
							type="email"
							class="bg-transparent border border-slate-200 rounded-md p-1 px-2 w-full"
							placeholder="joanna2@illinois.edu"
							disabled={emailSent}
							bind:value={email}
						/>
						{#if emailValidationMsg}
							<div
								class="p-1 mt-2 flex flex-row items-center gap-2 w-full {emailValidationMsg.error
									? 'text-red-400'
									: 'text-green-400'}"
							>
								<Icon icon={emailValidationMsg.icon} class="text-2xl" />
								<div class="break-words">{emailValidationMsg.message}</div>
							</div>
						{/if}
						{#if !emailSent}
							<button
								class="p-2 mt-2 px-3 flex flex-row gap-2 items-center bg-white rounded-md opacity-100 disabled:opacity-0 bg-opacity-20 hover:bg-opacity-40 duration-500 border-gray-400"
								disabled={!emailValid}
								on:click={generateVerification}
							>
								<Icon icon="mingcute:send-plane-line" class="text-xl" />
								<div>Send me a code to {email}</div>
							</button>
						{/if}
					</div>

					<div class="flex flex-col {emailSent ? 'visible' : 'invisible'}">
						<label for="passcode">One Time Code</label>
						<div class="flex flex-row">
							<input
								id="passcode"
								type="text"
								inputmode="numeric"
								pattern="[0-9]*"
								class="bg-transparent border border-slate-200 rounded-md p-1 px-2 w-full"
								placeholder="231288"
								bind:value={passcode}
							/>
							<button
								class="w-24 rounded-md bg-black p-1 bg-opacity-25 hover:bg-opacity-10 duration-150 ml-2 disabled:text-gray-400 disabled:cursor-not-allowed"
								disabled={!passcodeValid}
								on:click={verifyPasscode}
							>
								Sign In
							</button>
						</div>
						{#if passcodeValidationMsg}
							<div
								class="p-1 mt-2 flex flex-row items-center gap-2 w-full {passcodeValidationMsg.error
									? 'text-red-400'
									: 'text-green-400'}"
							>
								<Icon icon={passcodeValidationMsg.icon} class="text-2xl" />
								<div class="break-words">{passcodeValidationMsg.message}</div>
							</div>
						{/if}
					</div>

					<div class="flex flex-col text-center text-sm w-fit mx-auto">
						<h3>Don't have an account yet?</h3>
						<a href="/register" class="underline">Sign up instead</a>
					</div>
				</div>
				<div class="flex text-gray-300  md:p-4 p-2 items-center w-full lg:w-72 pt-4 min-w-[10rem]">
					<div class="flex flex-col gap-2">
						<h3 class="text-lg text-gray-200">Did you know?</h3>
						<div>Attending R|P talks and events gives you priority for food!</div>
					</div>
				</div>
			</div>
		</GlassContainer>
	</div>
</div>
