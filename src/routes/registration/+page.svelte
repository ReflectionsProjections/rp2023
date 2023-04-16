<script lang="ts">
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
        race: '',
        firstGen: ''
        resumeSharePerms: '',
        jobTypeInterest: '',
        portfolioLink: '',
        gpa: ''
    };

</script>


<div>
    Welcome to Registration!
</div>

<style>
    div {
        padding-top: 15px;
        padding-bottom: 15px;
    }
</style>


<div class="w-screen h-screen">
    <main>
        <div>
            <pre>
                {JSON.stringify(formValues, null, 2)}
            </pre>
        </div>
        <form>
            <div>
                <label for="name">Name: </label>
                <input type="text" id="name" bind:value={formValues.name}/>
            </div>
            <div>
                <label for="email">Email: </label>
                <input type="email" id="email" bind:value={formValues.email}/>
            </div>
            <div>
                <label for="is-college-student">Are you a college student? </label>
                <select id="is-college-student" bind:value={formValues.isCollegeStudent}>
                    <option value="">Choose One</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>

            {#if formValues.isCollegeStudent == "yes"}
                <div>
                    <label for="is-uiuc-student">Are you a UIUC student? </label>
                    <select id="is-uiuc-student" bind:value={formValues.isUIUCStudent}>
                        <option value="">Choose One</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>

                <div>
                    <label for="exp-grad-date">Expected Graduation Year: </label>
                    <input type="date" id="exp-grad-date" bind:value={formValues.expectedGradYear}> 
                </div>
            {/if}

            {#if formValues.isUIUCStudent == "no"}
                <div>
                    <label for="college-name">Name of University: </label>
                    <input type="text" id="college-name" bind:value={formValues.collegeName}/>
                </div>
            {/if}

            <div>
                <label for="major">Major (if applicable): </label>
                <input type="text" id="major" bind:value={formValues.major}/>
            </div>

            {#if formValues.isCollegeStudent == "no"}
                <div>
                    <label for="occupation">Current Occupation: </label>
                    <input type="text" id="occupation" bind:value={formValues.occupation}>
                </div>
            {/if}

            <!-- DEMOGRAPHICS -->
            <div>
                <label for="age">Age: </label>
                <input type="number" id="age" bind:value={formValues.age}>
            </div>
            <script type="text/javascript">
                function showfield(name){
                  if(name=='Other')document.getElementById('genderDemographics').innerHTML='Other: <input type="text" name="other" />';
                  else document.getElementById('genderDemographics').innerHTML='';
                }
            </script>
            <div id="genderDemographics">
                <label for="gender">Gender: </label>
                <select id="gender" bind:value={formValues.gender}>
                    <option value="">Choose One</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="preferNotToSay">Prefer not to say</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label for="ethnicity">Ethnicity: </label>
                <select id="ethnicity" bind:value={formValues.ethnicity}>
                    <option value="">Choose One</option>
                    <option value="hispanicOrLatino">Hispanic/Latino</option>
                    <option value="notHispanicOrLatino">Not Hispanic/Latino</option>
                </select>
            </div>
            <script type="text/javascript">
                function showfield(name){
                  if(name=='Other')document.getElementById('raceDemographics').innerHTML='Other: <input type="text" name="other" />';
                  else document.getElementById('raceDemographics').innerHTML='';
                }
            </script>
            <div id="raceDemographics">
                <label for="race">Race: </label>
                <select id="race" bind:value={formValues.race} multiple>
                    <option value="americanIndianOrAlaska">American Indian/Alaska Native</option>
                    <option value="eastAsian">East Asian</option>
                    <option value="southAsian">South Asian</option>
                    <option value="black">Black or African-American</option>
                    <option value="pacificIslander">Native Hawaiian or Pacific Islander</option>
                    <option value="white">White/Caucasian</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div>
                <label for="is-first-gen">If you're a college student, are you first generation?</label>
                <select id="is-first-gen" bind:value={formValues.firstGen}>
                    <option value="">Choose One</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </div>
            <!--Section 4: Resume/Networking -->
            <div>
                <label for="perms-res-share">Would you like your resume to be shared with R|P sponsors? </label>
                <select id="perms-res-share" bind:value={formValues.resumeSharePerms}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>

            {#if formValues.resumeSharePerms == "yes"}
            <div>
                <label for="resume">Upload your Resume Here: </label>
                <input type="file" name="resume" accept="application/pdf, application/msword, .doc, .docx">
            </div>
            {/if}

            <div>
                <label for="job-type">Job Type Interest: </label>
                <select id="job-type" bind:value={formValues.jobTypeInterest} multiple>
                    <option value="full-time">Full Time</option>
                    <option value="internship">Internship</option>
                    <option value="co-op">Co-Op</option>
                </select>
            </div>

            <div>
                <label for="portfolio">Portfolio Link/LinkedIn: </label>
                <input type="url" bind:value={formValues.portfolioLink}>
            </div>

            <div>
                <label for="gpa">GPA</label>
                <input type="number" min="1.0" max="5.0" bind:value={formValues.gpa}>
            </div>
        </form>
    </main>
</div>

