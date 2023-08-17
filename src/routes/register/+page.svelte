<script lang="ts">
	import { goto } from '$app/navigation';
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
	import HandleClick from '../../components/registration/submit-handler.svelte';
	import { API_URL } from '../../constants';
	import SmartInput from '../../lib/util/smart-input.svelte';
	import { formValidators } from './validators';

	let email = '';
	let passcode = '';
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
		marketingOther: null
	};
	let page: PageIndex = 'specialEvents';

	const referralOptions = [
		{ referralId: 'ACMOH', displayText: 'ACM Open House' },
		{ referralId: 'buildingAds', displayText: 'Building Ads' },
		{ referralId: 'courses', displayText: 'School Course' },
		{ referralId: 'instagram', displayText: 'Instagram' },
		{ referralId: 'email', displayText: 'E-mail' },
		{ referralId: 'posters', displayText: 'Posters/Flyers' },
		{ referralId: 'website', displayText: 'Website' },
		{ referralId: 'word-of-mouth', displayText: 'Word of Mouth' }
	];

	const pageMeta: PageMeta = {
		welcome: {
			title: 'Welcome to R | P',
			next: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'demographics'),
			prev: () => 'none',
			fields: ['name', 'email']
		},
		academics: {
			title: 'Academics',
			next: () => 'demographics',
			prev: () => 'welcome',
			fields: ['major', 'majorOther', 'collegeName', 'expectedGradTerm', 'gradYear', 'firstGen']
		},
		demographics: {
			title: 'Demographics',
			next: () => 'dietaryRestrictions',
			prev: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'welcome'),
			fields: ['age', 'gender', 'ethnicity', 'race', 'raceOther']
		},
		dietaryRestrictions: {
			title: 'Dietary Restrictions',
			next: () => 'recruitment',
			prev: () => 'demographics',
			fields: ['food']
		},
		recruitment: {
			title: 'Recruitment',
			next: () => 'specialEvents',
			prev: () => 'dietaryRestrictions',
			fields: ['jobTypeInterest', 'portfolioLink']
		},
		specialEvents: {
			title: 'Special Events',
			next: () => 'marketing',
			prev: () => 'recruitment',
			fields: ['mechPuzzle']
		},
		marketing: {
			title: 'One Last Step',
			next: () => 'emailVerification',
			prev: () => 'specialEvents',
			fields: ['marketing', 'marketingOther']
		},
		emailVerification: {
			title: 'Email Verification',
			next: () => 'none',
			prev: () => 'marketing',
			fields: []
		}
	};

	let submitted = false;
	let fileData: File;

	const generateVerification = async () => {
		// It is assumed reaching here means basic email regex test has passed
		const response = await fetch(`${$API_URL}/auth/generate`, {
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

	let passcodeSuccess = false;
	const verifyPasscode = async () => {
		email = formValues.email;

		if (!verifyEmail(email) || !passcodeValid) {
			alert('Invalid Passcode');
			return;
		}

		const response = await fetch(`${$API_URL}/auth/verify`, {
			method: 'POST',
			cache: 'no-cache',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, passcode })
		});

		if (response.ok) {
			passcodeSuccess = true;
		} else {
			const res = await response.json();
			console.error(response.statusText);
			console.error(res);
			alert(response.statusText);
		}
		return passcodeSuccess;
	};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const verifyEmail = (email: string) => email.length > 0 && emailRegex.test(email);
	$: emailValid = verifyEmail(email);

	//Basic Passcode Validation
	const passcodeRegex = /^\d{6}$/;
	$: passcodeValid = passcode.length == 6 && passcodeRegex.test(passcode);

	const onSubmit = async () => {
		const response = await fetch(`${$API_URL}/attendee`, {
			method: 'POST',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...formValues, expectedGradYear: formValues.gradYear.toString() })
		});

		//For debugging. After clicking submit, should be able to see the request in console

		if (response.ok) {
			submitted = true;
		} else {
			if (response.status === 403 || response.status === 500) {
				alert('Email already exists. Please try again');
				window.location = '/register' as Location | (string & Location);
			}
		}
	};

	const handleFileInput = (event: Event) => {
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
				console.info('Validation error: ', res);
				noneFailed = false;
			} else {
				errors[field as FormKeys] = undefined;
			}
		}
		return noneFailed;
	};
	$: console.log(formValues);
</script>

<form class="flex mx-auto w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink pb-10">
	{#if page == 'welcome'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div>
					<div class="text-lg md:text-xl text-white">{pageMeta[page].title}</div>
					<div class="text-base text-slate-300">
						We're glad you made it. Sign up here to receive your conference passes.
					</div>
				</div>
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
				<div class="text-xl text-white">{pageMeta[page].title}</div>

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
				<div class="text-xl text-white">{pageMeta[page].title}</div>
				<SmartInput label="Age" sublabel="optional" bind:error={errors.age}>
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
				<div class="text-xl text-white">{pageMeta[page].title}</div>

				<DietaryOptions bind:food={formValues.food} bind:error={errors.food} />
			</div>
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'recruitment'}
		<GlassContainer>
			<div class="flex flex-col gap-5 mb-3">
				<div class="text-xl text-white">{pageMeta[page].title}</div>
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
				<div class="text-xl text-white">{pageMeta[page].title}</div>
				<ExtraEventOptions bind:formExtraEvents={formValues.mechPuzzle} />
			</div>

			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'marketing'}
		<GlassContainer>
			{#if !submitted}
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div>
						<label for="marketing" class="mb-2">How did you hear about R|P? </label>
						<div class="flex flex-row flex-wrap">
							{#each referralOptions as { referralId, displayText }}
								<span class="flex flex-row items-center w-1/2">
									<input
										class="rounded-md"
										type="checkbox"
										id={referralId}
										value={referralId}
										bind:group={formValues.marketing}
									/>
									<label for={referralId}>{displayText}</label>
								</span>
							{/each}
						</div>
						<label for="marketing-other">Other</label>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
							type="text"
							id="marketing-other"
							bind:value={formValues.marketingOther}
						/>
					</div>
				</div>
			{/if}
			<PageControls {validate} {formValues} bind:page {pageMeta} />
		</GlassContainer>
	{/if}

	{#if page == 'emailVerification'}
		<GlassContainer>
			<div class="flex flex-col items-start">
				Let's get your email verified!
				<label for="portfolio">Enter Verification Code from Email</label>
				<input
					class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit w-full"
					bind:value={passcode}
				/>
			</div>

			<HandleClick {verifyPasscode} {onSubmit} {fileData} />

			{#if !submitted}
				<PageControls {validate} {formValues} bind:page {pageMeta} />
			{/if}

			{#if submitted}
				Thank you for your interest in Reflections | Projections 2023! Please check your email for
				additional information.
			{/if}
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
	Pagw 9 ) Email Verification
-->
<style>
	input {
		padding: 0.25rem;
	}

	.center-div {
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
