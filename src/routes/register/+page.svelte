<script lang="ts">
	import IsCollegeStudent from '../../components/registration/is-college-student.svelte';
	import PageControls from '../../components/registration/page-controls.svelte';

	const formValues = {
		name: '',
		email: '',
		isCollegeStudent: '',
		isUIUCStudent: '',
		major: '',
		collegeName: '',
		expectedGradYear: '',
		occupation: '',
		age: '',
		gender: '',
		ethnicity: '',
		race: [],
		raceOther: '',
		firstGen: '',
		food: '',
		foodOther: '',
		//resumeSharePerms: '',
		jobTypeInterest: [],
		portfolioLink: '',
		mechPuzzle: [],
		marketing: [],
		marketingOther: ''
	};
	let page = 0;

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
		{ referralId: 'discord', displayText: 'Discord' }
	];

	const raceOptions = [
		{ raceId: 'americanIndianOrAlaska', displayText: 'American Indian/Alaska Native' },
		{ raceId: 'eastAsian', displayText: 'East Asian' },
		{ raceId: 'southAsian', displayText: 'South Asian' },
		{ raceId: 'black', displayText: 'Black or African-American' },
		{ raceId: 'pacificIslander', displayText: 'Pacific Islander' },
		{ raceId: 'white', displayText: 'White/Caucasian' }
	];

	const extraEventOptions = [
		{ extraEventId: 'mechmania', displayText: 'MechMania' },
		{ extraEventId: 'puzzlebang', displayText: 'PuzzleBang'}
	];
</script>

<div class="">
	<main>
		<form class="mx-auto w-fit">
			{#if page == 0}
				<div
					class="center; bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400"
				>
					<div class="flex flex-row items-center">
						<div class="">Name:</div>
						<input
							id="name"
							bind:value={formValues.name}
							required
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						/>
					</div>
					<div>
						<label for="email">Email: </label>
						<input
							type="email"
							id="email"
							bind:value={formValues.email}
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
							required
						/>
					</div>
					<IsCollegeStudent bind:isCollegeStudent={formValues.isCollegeStudent} />
				</div>
				<PageControls bind:page prev={-1} next={formValues.isCollegeStudent ? 1 : 3} />
			{/if}

			{#if page == 1}
				<div class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400"> 
				<div class="flex flex-row items-center">
					<label for="is-uiuc-student">Are you a UIUC student? </label>
					<select class="box" id="is-uiuc-student" bind:value={formValues.isUIUCStudent} required>
						<option value="">Choose One</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>

				<div class="flex flex-row items-center">
					<label for="exp-grad-date">Expected Graduation Year: </label>
					<input class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit" type="date" id="exp-grad-date" required bind:value={formValues.expectedGradYear} />
				</div>

			<div class="flex flex-row items-center">
				<label for="major">Major (if applicable): </label>
				<input
					class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
					type="text"
					id="major"
					bind:value={formValues.major}
				/>
			</div>
			{#if formValues.isUIUCStudent == 'no'}
			<div class="flex flex-row items-center">
				<label for="college-name">Name of University: </label>
				<input
					class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
					type="text"
					id="college-name"
					bind:value={formValues.collegeName}
					required
				/>
			</div>	
			{/if}
		</div>
			<PageControls bind:page prev={0} next={4} />
			{/if}

			{#if page == 3}
				<div
					class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md gap-5 flex-col border-2 border-blue-400"
				>
					<label for="occupation">Current Occupation: </label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="text"
						id="occupation"
						bind:value={formValues.occupation}
						required
					/>
				</div>
				<PageControls bind:page prev={0} next={4} />
			{/if}

			<!-- DEMOGRAPHICS -->
			{#if page == 4}
				<div
					class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400"
				> 
				<div class="flex flex-row items-center">
					<label for="age">Age: </label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="number"
						id="age"
						bind:value={formValues.age}
						
					/>
				</div>
				<div id="genderDemographics" class="flex flex-row items-center">
					<label for="gender">Gender: </label>
					<select id="gender" bind:value={formValues.gender}>
						<option value="">Choose One</option>
						<option value="male">Male</option>
						<option value="female">Female</option>
						<option value="nonbinary">Non-Binary</option>
						<option value="preferNotToSay">Prefer not to say</option>
					</select>
				</div>
				<div class="flex flex-row items-center">
					<label for="ethnicity">Ethnicity: </label>
					<select id="ethnicity" bind:value={formValues.ethnicity}>
						<option value="">Choose One</option>
						<option value="hispanicOrLatino">Hispanic/Latino</option>
						<option value="notHispanicOrLatino">Not Hispanic/Latino</option>
					</select>
				</div>
				<div id="raceDemographics">
					<label for="race">Race: </label> <br />
					{#each raceOptions as {raceId, displayText}}
						<input
							type="checkbox"
							id={raceId}
							value={raceId}
							bind:group={formValues.race}
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						/>
						<label for={raceId}>{displayText}</label> <br />
					{/each}
					<label for="other">Other</label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="text"
						id="other"
						bind:value={formValues.raceOther}
					/>
				</div>
				<div class="flex flex-row items-center">
					<label for="is-first-gen">If you're a college student, are you first generation?</label>
					<select id="is-first-gen" bind:value={formValues.firstGen}>
						<option value="">Choose One</option>
						<option value="yes">Yes</option>
						<option value="no">No</option>
					</select>
				</div>
			</div>

				<PageControls bind:page prev={formValues.isCollegeStudent ? 1 : 3} next={5} />
			{/if}

			{#if page == 5}
				<div
					class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400"
				>
					<label for="food">Do you have any dietary restrictions? </label>
					<select id="food" bind:value={formValues.food} required>
						<option value="Vegetarian">Vegetarian</option>
						<option value="Vegan">Vegan</option>
						<option value="Gluten-Free">Gluten-Free</option>
						<option value="none">No dietary restrictions</option>
						<input
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
							type="other"
							id="food-other"
							bind:value={formValues.foodOther}
						/>
					</select>
				</div>
				<PageControls bind:page prev={4} next={6} />
			{/if}

			<!--Section 4: Resume/Networking -->
			{#if page == 6}
			<div class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400">
					<div
						class="flex flex-row items-center"
					>
						<label for="resume">Upload your Resume Here: </label>
						<input
							type="file"
							name="resume"
							accept="application/pdf, application/msword, .doc, .docx"
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						/>
					</div>

				<div>
					<label for="job-type">Job Type Interest: </label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="checkbox"
						id="full-time"
						value="full-time"
						bind:group={formValues.jobTypeInterest}
					/>
					<label for="full-time">Full Time</label>
					<input
						type="checkbox"
						id="internship"
						value="internship"
						bind:group={formValues.jobTypeInterest}
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
					/>
					<label for="internship">Internship</label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="checkbox"
						id="co-op"
						value="co-op"
						bind:group={formValues.jobTypeInterest}
					/>
					<label for="co-op">Co-Op</label>
				</div>

				<div
					class="flex flex-row items-center"
				>
					<label for="portfolio">Portfolio Link/LinkedIn: </label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="url"
						bind:value={formValues.portfolioLink}
					/>
				</div>
			</div>
				<PageControls bind:page prev={5} next={7} />
			
			{/if}

			{#if page == 7}
				<div
					class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400"
				>
				<div class="flex flex-col">
					<label for="mech-puzzle">Are you interested in MechMania/PuzzleBang? </label>
					{#each extraEventOptions as {extraEventId, displayText}}
						<div class="flex items-center">
							<input
							type="checkbox"
							id={extraEventId}
							value={extraEventId}
							bind:group={formValues.mechPuzzle}
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						/>
							<label for={extraEventId}>{displayText}</label>
						</div>
					{/each}
				</div>
				</div>

				<PageControls bind:page prev={6} next={8} />
			{/if}

			{#if page == 8}
				<div
					class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md gap-5 flex-col border-2 border-blue-400"
				>
					<label for="marketing">How did you hear about R|P? </label> <br />

					{#each referralOptions as { referralId, displayText }}
						<input
							class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
							type="checkbox"
							id={referralId}
							value={referralId}
							bind:group={formValues.marketing}
							
						/>
						<label for={referralId}>{displayText}</label> <br />
					{/each}

					<label for="word-of-mouth">Word of Mouth</label> <br />
					<label for="marketin-other">Other: </label>
					<input
						class="bg-slate-800 border-2 border-white rounded-md mx-2 h-fit"
						type="text"
						id="marketing-other"
						bind:value={formValues.marketingOther}
					/>
				</div>
				{#if formValues.marketing.length != 0 || formValues.marketingOther != ''}
				<div
				class="bg-slate-900 text-white p-4 px-5 m-3 rounded-md flex gap-2 flex-col border-2 border-blue-400">
				<input type="submit" />
			</div>
				{/if}
				<PageControls bind:page prev={7} next={-1} />
			{/if}
		</form>
		<!-- <div>
			<pre>
                {JSON.stringify(formValues, null, 2)}
            </pre>
		</div> -->
	</main>
</div>

<!--
	Page 0) Name, email, isCollegeStudent
	Page 1) if they said yes to CollegeStudent 

	Page 3) Occupation (if they said no to college student)
	Page 4) Demographics
	Page 5) Food
	Page 6) Resume
	Page 7) MechMania and PuzzleBang
	Page 8 ) How did you hear about RP?
-->
<style>
	div {
		padding-top: 15px;
		padding-bottom: 15px;
	}

	select {
		background-color: rgb(30 41 59);
		border-color: rgb(255 255 255);
		border-radius: 0.375rem;
		border-width: 2px;
		margin-left: 2px;
		margin-right: 2px;
		height: fit-content;
	}

</style>
