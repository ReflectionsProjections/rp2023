<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import GlassContainer from '../../components/glass-container.svelte';
	import DietaryOptions from '../../components/registration/dietary-options.svelte';
	import DynamicEmail from '../../components/registration/dynamic-email.svelte';
	import EthinicitySelector from '../../components/registration/ethinicity-selector.svelte';
	import ExtraEventOptions from '../../components/registration/extra-event-options.svelte';
	import FirstGenSelector from '../../components/registration/first-gen-selector.svelte';
	import GenderSelector from '../../components/registration/gender-selector.svelte';
	import GradDateSelector from '../../components/registration/grad-date-selector.svelte';
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import JobTypeOptions from '../../components/registration/job-type-options.svelte';
	import MajorSelector from '../../components/registration/major-selector.svelte';
	import Footer from '../../components/footer.svelte';
	import type {
		boolStr,
		ethnicityOptions,
		firstGenOptions,
		genderOptions,
		raceOptions,
		extraEventOptions,
		jobTypeOptions
	} from '../../components/registration/misc-types';
	import PageControls from '../../components/registration/page-controls.svelte';
	import type { PageIndex, PageMeta } from '../../components/registration/page-meta.type';
	import RaceSelector from '../../components/registration/race-selector.svelte';
	import ReferralSelector from '../../components/registration/referral-selector.svelte';
	import { API_URL } from '../../constants';
	import SmartInput from '../../lib/util/smart-input.svelte';
	import { formValidators } from './validators';
	import UserCreateFeedback from '../../components/registration/user-create-feedback.svelte';
	import type { Status } from '$lib/types';
	import { fly, slide } from 'svelte/transition';
	import PageHeading from '../../components/registration/page-heading.svelte';

	type FormKeys = keyof typeof formValues;
	type Errors = Partial<Record<FormKeys, string | undefined>>;
	const errors: Errors = {};

	const formValues = {
		name: '',
		email: '',
		isCollegeStudent: 'yes' as boolStr,
		isUIUCStudent: 'yes' as boolStr,
		major: 'N/A',
		majorOther: '',
		collegeName: 'UIUC', // default in the case where a user does NOT click Illinois but still is a UIUC student
		expectedGradTerm: '',
		gradYear: 2023,
		firstGen: null as firstGenOptions,
		age: null,
		gender: null as genderOptions,
		ethnicity: null as ethnicityOptions,
		race: [] as raceOptions[],
		raceOther: null,
		food: 'none',
		jobTypeInterest: [] as jobTypeOptions[],
		portfolioLink: null,
		mechPuzzle: [] as extraEventOptions[],
		marketing: [],
		marketingOther: null,
		passcode: '' // Not sent with POST /attendee
	};
	let page: PageIndex = 'emailVerification';

	const pageMeta: PageMeta = {
		welcome: {
			title: 'Welcome to R | P',
			subtitle: "We're glad you made it. Sign up here to receive your conference passes.",
			next: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'demographics'),
			prev: () => 'none',
			fields: ['name', 'email']
		},
		academics: {
			title: 'Academics',
			subtitle: 'We use this to find you better career opportunities',
			next: () => 'demographics',
			prev: () => 'welcome',
			fields: ['major', 'majorOther', 'collegeName', 'expectedGradTerm', 'gradYear', 'firstGen']
		},
		demographics: {
			title: 'Demographics',
			subtitle: 'This helps us make a better R | P experience',
			next: () => 'dietaryRestrictions',
			prev: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'welcome'),
			fields: ['age', 'gender', 'ethnicity', 'race', 'raceOther']
		},
		dietaryRestrictions: {
			title: 'Dietary Restrictions',
			subtitle: 'We try to be inclusive, including dietary preferences',
			next: () => 'recruitment',
			prev: () => 'demographics',
			fields: ['food']
		},
		recruitment: {
			title: 'Recruitment',
			subtitle:
				"Not on the right device? Don't worry, you come back to this section after signing up.",
			next: () => 'specialEvents',
			prev: () => 'dietaryRestrictions',
			fields: ['jobTypeInterest', 'portfolioLink']
		},
		specialEvents: {
			title: 'Special Events',
			subtitle: 'R | P is more than just a conference',
			next: () => 'marketing',
			prev: () => 'recruitment',
			fields: ['mechPuzzle']
		},
		marketing: {
			title: 'How did we reach you?',
			subtitle: "Since you're here, we want to know what we did right",
			next: () => 'emailVerification',
			prev: () => 'specialEvents',
			fields: ['marketing', 'marketingOther']
		},
		emailVerification: {
			title: 'One Last Step',
			subtitle: 'We use *one* cookie to keep you logged in, and only to keep you logged in.',
			next: () => 'none',
			prev: () => 'marketing',
			fields: ['passcode']
		}
	};

	let fileData: File;

	const generateVerification = async () => {
		// It is assumed reaching here means basic email regex test has passed
		const response = await fetch(`${$API_URL}/auth/generate?isRegister=true`, {
			method: 'POST',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: formValues.email })
		});
		// Return true if successful
		if (response.ok) {
			return true;
		}
		const res = await response.json();
		console.error(res);
		errors.email = res.message;
		return false;
	};

	const verifyPasscode = async () => {
		const response = await fetch(`${$API_URL}/auth/verify`, {
			method: 'POST',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email: formValues.email, passcode: formValues.passcode })
		});

		if (response.ok) {
			return true;
		}
		const res = await response.json();
		const message = res.message;
		console.error(message);
		errors.passcode = Array.isArray(message) ? message.join(',') : message;
		return false;
	};

	const createUser = async () => {
		const response = await fetch(`${$API_URL}/attendee`, {
			method: 'POST',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...formValues,
				expectedGradYear: formValues.gradYear.toString(),
				passcode: undefined
			})
		});

		if (response.ok) {
			return true;
		}
		const res = await response.json();
		console.error(res);
		const message = res.message;
		submitErrors = Array.isArray(message) ? message : [message];
		return false;
	};

	const uploadResume = async () => {
		if (!fileData) {
			return true;
		}

		const formData = new FormData();
		formData.append('file', fileData);

		const response = await fetch(`${$API_URL}/attendee/upload`, {
			method: 'POST',
			cache: 'no-cache',
			credentials: 'include',
			body: formData
		});

		if (response.ok) {
			return true;
		}
		const res = await response.json();
		console.error(res);
		const message = res.message;
		submitErrors = Array.isArray(message) ? message : [message];
		return false;
	};

	let submitStatus: Record<'verifyPasscode' | 'createUser' | 'uploadResume', Status> = {
		verifyPasscode: 'waiting',
		createUser: 'waiting',
		uploadResume: 'waiting'
	};
	let submitErrors: string[] | null = null;

	let submitClicked = false;
	const handleFormSubmit = async () => {
		if (!(await validate())) {
			return;
		}
		submitStatus.verifyPasscode = 'in_progress';
		const passcodeSuccess = await verifyPasscode();

		if (!passcodeSuccess) {
			submitStatus.verifyPasscode = 'failed';
			return;
		}

		// We want the button to stay until passcode is verified
		submitClicked = true;

		submitStatus.verifyPasscode = 'success';
		submitStatus.createUser = 'in_progress';
		const createUserSuccess = await createUser();

		if (!createUserSuccess) {
			submitStatus.createUser = 'failed';
			return;
		}
		submitStatus.createUser = 'success';
		submitStatus.uploadResume = 'in_progress';

		const uploadResumeSuccess = await uploadResume();
		if (!uploadResumeSuccess) {
			submitStatus.uploadResume = 'failed';
			return;
		}
		submitStatus.uploadResume = 'success';

		setTimeout(() => {
			window.location.href = '/';
		}, 2000);
	};

	const handleFileInput = (_event: Event) => {
		var fileInput = document.getElementById('resume-upload') as HTMLInputElement | null;
		var file = fileInput?.files?.[0];

		if (file) {
			fileData = file;
		}
	};

	const validate = async () => {
		let noneFailed = true;
		for (const field of pageMeta[page].fields) {
			const validator = formValidators[field];
			const res = validator(formValues[field as FormKeys]);
			if (res) {
				errors[field as FormKeys] = res;
				noneFailed = false;
			} else {
				errors[field as FormKeys] = undefined;
			}
		}
		return noneFailed;
	};

	let slideIn = false;
</script>

<form class="flex mx-auto w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink pb-10">
	{#if page == 'welcome'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />
				<SmartInput label="Full Name" bind:error={errors.name}>
					<input
						id="name"
						bind:value={formValues.name}
						class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
					/>
				</SmartInput>

				<IsCollegeStudent
					bind:isUIUCStudent={formValues.isUIUCStudent}
					bind:isCollegeStudent={formValues.isCollegeStudent}
					bind:collegeName={formValues.collegeName}
					bind:major={formValues.major}
				/>

				<!-- TODO: Dynamic Email has addtional validation based on API Calls -->
				<DynamicEmail
					bind:email={formValues.email}
					uiucStudent={formValues.isUIUCStudent}
					bind:error={errors.email}
				/>
			</div>
			<!-- On Next page, send the verification email -->
			<PageControls
				validate={async () => {
					if (await validate()) {
						return await generateVerification();
					}
					return false;
				}}
				{formValues}
				bind:page
				{pageMeta}
			/>
		</GlassContainer>
	{/if}

	{#if page == 'academics'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />

				<GradDateSelector
					bind:gradYear={formValues.gradYear}
					bind:expectedGradTerm={formValues.expectedGradTerm}
					bind:errorTerm={errors.expectedGradTerm}
				/>
				<MajorSelector
					bind:major={formValues.major}
					bind:majorOther={formValues.majorOther}
					bind:errorMajor={errors.major}
					bind:errorMajorOther={errors.majorOther}
				/>
				{#if formValues.isUIUCStudent == 'no'}
					<div class="flex flex-col">
						<label for="college-name" class="ml-1">Name of University</label>
						<input
							class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
							type="text"
							id="college-name"
							bind:value={formValues.collegeName}
							required
						/>
					</div>
				{/if}

				<FirstGenSelector bind:firstGen={formValues.firstGen} />
			</div>
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'demographics'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />
				<SmartInput label="Age" sublabel="(optional)" bind:error={errors.age}>
					<input
						class="bg-transparent border border-gray-400 rounded-md h-fit w-16"
						type="number"
						id="age"
						bind:value={formValues.age}
					/>
				</SmartInput>

				<GenderSelector bind:gender={formValues.gender} />

				<EthinicitySelector bind:ethnicity={formValues.ethnicity} />

				<RaceSelector
					bind:formRace={formValues.race}
					bind:formRaceOther={formValues.raceOther}
					bind:raceOtherError={errors.raceOther}
				/>
			</div>

			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'dietaryRestrictions'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />

				<DietaryOptions bind:food={formValues.food} bind:error={errors.food} />
			</div>
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'recruitment'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />
				<div class="flex flex-col items-start">
					<label for="resume">Upload your Resume Here</label>
					<input
						type="file"
						name="file"
						id="resume-upload"
						accept="application/pdf, application/msword, .doc, .docx"
						class="block w-full
						text-gray-200 file:text-white
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:bg-white file:bg-opacity-10
						file:hover:bg-opacity-20 hover:file:bg-violet-100
						file:duration-300"
						on:change={handleFileInput}
					/>
				</div>

				<JobTypeOptions bind:formJobType={formValues.jobTypeInterest} />

				<SmartInput
					label="Portfolio Link/LinkedIn"
					sublabel="Separate multiple links with commas"
					bind:error={errors.portfolioLink}
				>
					<input
						class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
						type="url"
						bind:value={formValues.portfolioLink}
					/>
				</SmartInput>
			</div>
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'specialEvents'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />
				<ExtraEventOptions bind:formExtraEvents={formValues.mechPuzzle} />
			</div>

			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'marketing'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />
				<ReferralSelector
					bind:marketing={formValues.marketing}
					bind:marketingOther={formValues.marketingOther}
					bind:marketingOtherError={errors.marketingOther}
				/>
			</div>
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'emailVerification'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<PageHeading title={pageMeta[page].title} subtitle={pageMeta[page].subtitle} />

				<SmartInput
					label="Enter one-time code from {formValues.email}"
					bind:error={errors.passcode}
				>
					<input
						placeholder="943120"
						class="bg-transparent border border-gray-400 text-xl rounded-md h-fit w-full"
						bind:value={formValues.passcode}
					/>
					<div class="flex flex-row gap-5 text-sm text-gray-300 cursor-pointer my-1">
						<button
							on:click={() => {
								page = 'welcome';
							}}
						>
							<u class="hover:text-gray-400">Wrong email?</u>
						</button>
						<button on:click={generateVerification}>
							<u class="hover:text-gray-400">Resend code</u>
						</button>
					</div>
				</SmartInput>

				{#if !submitClicked}
					<button
						class="flex flex-row gap-2 mx-auto bg-green-600 rounded-full px-5 py-3 shaking my-2"
						on:click|preventDefault={handleFormSubmit}
						out:fly={{ y: -200, duration: 300 }}
						on:outroend={() => {
							slideIn = true;
						}}
					>
						<Icon icon="mingcute:rocket-fill" class="text-2xl" />
						<div>Let's do this!</div>
					</button>
				{:else if slideIn}
					<UserCreateFeedback {...submitStatus} errors={submitErrors} />
				{/if}
			</div>
			<!-- <HandleClick {verifyPasscode} {onSubmit} {fileData} /> -->
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}
</form>

<!--
	Page 0) Name, email, isCollegeStudent
	Page 1) if they said yes to CollegeStudent 
	Page 4) Demographics
	Page 5) Food
	Page 6) Resume
	Page 7) MechMania and PuzzleBang
	Page 8 ) How did you hear about RP?
	Page 9 ) Email Verification
-->
<style>
	input {
		padding: 0.25rem;
	}

	.shaking {
		animation: none;
	}

	.shaking:hover {
		animation: shake 0.5s;
		animation-iteration-count: infinite;
	}

	@keyframes shake {
		0% {
			transform: translate(1px, 1px) rotate(0deg);
		}
		10% {
			transform: translate(-1px, -2px) rotate(-1deg);
		}
		20% {
			transform: translate(-3px, 0px) rotate(1deg);
		}
		30% {
			transform: translate(3px, 2px) rotate(0deg);
		}
		40% {
			transform: translate(1px, -1px) rotate(1deg);
		}
		50% {
			transform: translate(-1px, 2px) rotate(-1deg);
		}
		60% {
			transform: translate(-3px, 1px) rotate(0deg);
		}
		70% {
			transform: translate(3px, 1px) rotate(-1deg);
		}
		80% {
			transform: translate(-1px, -1px) rotate(1deg);
		}
		90% {
			transform: translate(1px, 2px) rotate(0deg);
		}
		100% {
			transform: translate(1px, -2px) rotate(-1deg);
		}
	}
</style>
