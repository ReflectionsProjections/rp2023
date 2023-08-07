<script lang="ts">
	import GlassContainer from '../../components/glass-container.svelte';
	import DietaryOptions from '../../components/registration/dietary-options.svelte';
	import DynamicEmail from '../../components/registration/dynamic-email.svelte';
	import EthinicitySelector from '../../components/registration/ethinicity-selector.svelte';
	import FirstGenSelector from '../../components/registration/first-gen-selector.svelte';
	import GenderSelector from '../../components/registration/gender-selector.svelte';
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import JobTypeOptions from '../../components/registration/job-type-options.svelte';
	import ExtraEventOptions from '../../components/registration/extra-event-options.svelte';
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
	import { API_URL } from '../../constants';
	type ValidationMessage = { error: boolean; message: string; icon: string } | null;
	let email = '';
	let emailSent = false;
	let passcode = '';
	let emailValidationMsg: ValidationMessage = null;
	let passcodeValidationMsg: ValidationMessage = null;

	const formValues = {
		name: '',
		email: '',
		isCollegeStudent: 'yes' as boolStr,
		isUIUCStudent: 'yes' as boolStr,
		major: '',
		majorOther: null,
		collegeName: '',
		expectedGradTerm: '',
		expectedGradYear: '',
		age: null,
		gender: 'preferNotToSay' as genderOptions,
		ethnicity: 'preferNotToSay' as ethnicityOptions,
		race: [] as raceOptions[],
		raceOther: null,
		firstGen: 'preferNotToSay' as firstGenOptions,
		food: '',
		jobTypeInterest: [] as jobTypeOptions[],
		portfolioLink: null,
		mechPuzzle: [] as extraEventOptions[],
		marketing: [],
		marketingOther: null
	};
	let page: PageIndex = 'welcome';

	const referralOptions = [
		{ referralId: 'ACMOH', displayText: 'ACM Open House' },
		{ referralId: 'ACMN', displayText: 'ACM Newsletter' },
		{ referralId: 'buildingAds', displayText: 'Building Ads' },
		{ referralId: 'courses', displayText: 'School Course' },
		{ referralId: 'WCS', displayText: 'WCS Newsletter' },
		{ referralId: 'csNewsletter', displayText: 'CS Department Newsletter' },
		{ referralId: 'instagram', displayText: 'Instagram' },
		{ referralId: 'facebook', displayText: 'Facebook' },
		{ referralId: 'twitter', displayText: 'Twitter' },
		{ referralId: 'linkedin', displayText: 'LinkedIn' },
		{ referralId: 'email', displayText: 'E-mail' },
		{ referralId: 'posters', displayText: 'Posters/Flyers' },
		{ referralId: 'quadDay', displayText: 'Quad Day' },
		{ referralId: 'eNight', displayText: 'E-Night' },
		{ referralId: 'website', displayText: 'Website' },
		{ referralId: 'slack', displayText: 'Slack' },
		{ referralId: 'discord', displayText: 'Discord' },
		{ referralId: 'word-of-mouth', displayText: 'Word of Mouth' }
	];

	const gradYearOptions = [
		{ gradYearId: '2023', displayText: '2023' },
		{ gradYearId: '2024', displayText: '2024' },
		{ gradYearId: '2025', displayText: '2025' },
		{ gradYearId: '2026', displayText: '2026' },
		{ gradYearId: '2027', displayText: '2027' }
	];

	const gradTermOptions = [
		{ gradTermId: 'Fall', displayText: 'Fall' },
		{ gradTermId: 'Spring', displayText: 'Spring' },
		{ gradTermId: 'Summer', displayText: 'Summer' }
	];

	const pageMeta: PageMeta = {
		welcome: {
			title: 'Welcome to R | P',
			next: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'demographics'),
			prev: () => 'none',
			requiredFields: ['name', 'email']
		},
		academics: {
			title: 'Academics',
			next: () => 'demographics',
			prev: () => 'welcome',
			requiredFields: ['expectedGradTerm', 'expectedGradYear', 'major', 'firstGen']
		},
		demographics: {
			title: 'Demographics',
			next: () => 'dietaryRestrictions',
			prev: (isCollegeStudent) => (isCollegeStudent ? 'academics' : 'welcome'),
			requiredFields: []
		},
		dietaryRestrictions: {
			title: 'Dietary Restrictions',
			next: () => 'recruitment',
			prev: () => 'demographics',
			requiredFields: ['food']
		},
		recruitment: {
			title: 'Recruitment',
			next: () => 'specialEvents',
			prev: () => 'dietaryRestrictions',
			requiredFields: []
		},
		specialEvents: {
			title: 'Special Events',
			next: () => 'marketing',
			prev: () => 'recruitment',
			requiredFields: []
		},
		marketing: {
			title: 'One Last Step',
			next: () => 'emailVerification',
			prev: () => 'specialEvents',
			requiredFields: ['marketing']
		},
		emailVerification: {
			title: 'Email Verification',
			next: () => 'none',
			prev: () => 'marketing',
			requiredFields: ['emailVerificationCode']
		}
	};

	$: console.log(formValues);

	let submitted = false;

	let error = '';

	let passcodeSuccess = false;

	const verifyPasscode = async () => {
		email = formValues.email;

		if (!verifyEmail(email) || !passcodeValid) {
			alert("Invalid Passcode");
			console.log('entered here cuz something was invalid');
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
			passcodeSuccess = true;
			await onSubmit();
			window.location = '/' as Location | (string & Location);
		} else {
			const res = await response.json();
			if (response.status === 403 || response.status === 500) {
				alert("There was an error filling out the registration form. Please try again");
				window.location = '/register' as Location | (string & Location);
			}
		}
	};

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const verifyEmail = (email: string) => email.length > 0 && emailRegex.test(email);
	$: emailValid = verifyEmail(email);

	//Basic Passcode Validation
	const passcodeRegex = /^\d{6}$/;
	$: passcodeValid = passcode.length == 6 && passcodeRegex.test(passcode);

	const onSubmit = async () => {
		const response = await fetch(`${API_URL}/attendee`, {
			method: 'POST',
			credentials: 'include',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formValues)
		});

		console.log(response); //For debugging. After clicking submit, should be able to see the request in console

		if (response.ok) {
			submitted = true;
		} else {
			if (response.status === 403 || response.status === 500) {
				//TODO: This may not be the right way to check for existing email. We may need to be more specific with our check.
				alert("Email already exists. Please try again");
				window.location = '/register' as Location | (string & Location);
			}
		}	
	};
</script>

<main class="flex h-full">
	<form class="mx-auto my-auto w-[90%] md:w-3/5 lg:w-2/5 text-gray-200 accent-rp-pink">
		{#if page == 'welcome'}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div>
						<div class="text-lg md:text-xl text-white">{pageMeta[page].title}</div>
						<div class="text-base text-slate-300">
							We're glad you made it. Sign up here to receive your conference passes.
						</div>
					</div>
					<div class="flex flex-col items-start">
						<label for="name">Full Name</label>
						<input
							id="name"
							bind:value={formValues.name}
							required
							class="bg-transparent border border-gray-400 rounded-md h-fit w-full"
							autocomplete="off"
						/>
					</div>

					<IsCollegeStudent
						bind:isCollegeStudent={formValues.isCollegeStudent}
						bind:isUIUCStudent={formValues.isUIUCStudent}
						bind:collegeName={formValues.collegeName}
						bind:expectedGradTerm={formValues.expectedGradTerm}
						bind:expectedGradYear={formValues.expectedGradYear}
						bind:major={formValues.major}
					/>

					<DynamicEmail bind:email={formValues.email} uiucStudent={formValues.isUIUCStudent} />
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 'academics'}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="flex flex-row items-start">
						<label for="exp-grad-date">Expected Graduation Date: </label>
						<select
							name="exp-grad-term"
							id="grad-term"
							bind:value={formValues.expectedGradTerm}
							class="bg-transparent border border-gray-400 rounded-md h-fit"
						>
							{#each gradTermOptions as { gradTermId, displayText }}
								<option class="w-1/2 text-black p-3" value={gradTermId}>{displayText} </option>
							{/each}
						</select>
						<div class="counter">
							<button
								on:click={() => {
									if (!formValues.expectedGradYear || formValues.expectedGradYear == '2023') {
										formValues.expectedGradYear = '2023';
									} else {
										formValues.expectedGradYear = (
											parseInt(formValues.expectedGradYear) - 1
										).toString();
									}
								}}>-</button
							>
							{#if !formValues.expectedGradYear}
								<span>2023</span>
							{:else}
								<span>{formValues.expectedGradYear}</span>
							{/if}
							<button
								on:click={() => {
									if (!formValues.expectedGradYear) {
										formValues.expectedGradYear = '2024';
									} else if (formValues.expectedGradYear == '2027') {
										formValues.expectedGradYear = '2027';
									} else {
										formValues.expectedGradYear = (
											parseInt(formValues.expectedGradYear) + 1
										).toString();
									}
								}}>+</button
							>
						</div>
					</div>
					<MajorSelector
						bind:major={formValues.major}
						bind:majorOther={formValues.majorOther}
					/>
					{#if formValues.isUIUCStudent == 'no'}
						<div class="flex flex-col items-start">
							<label for="college-name">Name of University</label>
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
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 'demographics'}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="flex flex-col items-start  gap-2">
						<label for="gender" class="flex flex-row gap-2">
							<div>Age</div>
							<div class="text-slate-400">(optional)</div>
						</label>
						<input
							class="bg-transparent border border-gray-400 rounded-md h-fit w-16"
							type="number"
							id="age"
							bind:value={formValues.age}
						/>
					</div>

					<GenderSelector bind:gender={formValues.gender} />

					<EthinicitySelector bind:ethnicity={formValues.ethnicity} />

					<RaceSelector bind:formRace={formValues.race} bind:formRaceOther={formValues.raceOther} />
				</div>

				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 'dietaryRestrictions'}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>

					<DietaryOptions bind:foodOther={formValues.food} />
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
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
							name="resume"
							accept="application/pdf, application/msword, .doc, .docx"
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
						/>
					</div>

					<JobTypeOptions bind:formJobType={formValues.jobTypeInterest} />

					<div class="flex flex-col items-start">
						<label for="portfolio"
							>Portfolio Link/LinkedIn (If you have multiple links, separate each link with a comma)</label
						>
						<input
							class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit w-full"
							type="url"
							bind:value={formValues.portfolioLink}
						/>
					</div>
				</div>
				<PageControls {formValues} bind:page {pageMeta} />
			</GlassContainer>
		{/if}

		{#if page == 'specialEvents'}
			<GlassContainer>
				<div class="flex flex-col gap-5 mb-3">
					<div class="text-xl text-white">{pageMeta[page].title}</div>
					<div class="text-base text-slate-300">PLACEHOLDER FOR DESCRIPTION</div>
					<ExtraEventOptions bind:formExtraEvents={formValues.mechPuzzle} />
				</div>

				<PageControls {formValues} bind:page {pageMeta} />
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

							<label for="marketin-other">Other</label>
							<input
								class="bg-rp-dull-pink border border-gray-400 rounded-md h-fit"
								type="text"
								id="marketing-other"
								bind:value={formValues.marketingOther}
							/>
						</div>
					</div>
				{/if}
				<PageControls {formValues} bind:page {pageMeta} />
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
				<button
					type="submit"
					class="mx-auto disabled:opacity-25 disabled:cursor-not-allowed duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white"
					on:click={verifyPasscode}
				>
					Submit
				</button>

				{#if !submitted}
					<PageControls {formValues} bind:page {pageMeta} />
				{/if}

				{#if submitted}
					Thank you for your interest in Reflections | Projections 2023! Please check your email for
					additional information.
				{/if}
			</GlassContainer>
		{/if}
	</form>
</main>

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

	.counter {
		display: inline-block;
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
	}

	.counter button {
		cursor: pointer;
		padding: 0 10px;
	}
</style>
