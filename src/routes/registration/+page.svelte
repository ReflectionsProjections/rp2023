<script lang="ts">
    const formValues = {
        name: '',
        email: '',
        isCollegeStudent: '',
        isUIUCStudent: '',
        major: '',
        collegeName: '',
        expectedGradYear: '',
        occupation: ''
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

            <div>
                <label for="food">Do you have any dietary restrictions? </label>
                <select id="food" bind:value={formValues.food}>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <input type="other" id="food-other" bind:value={formValues.foodOther}>
                </select>
            </div>

            <div>
                <label for="mech-puzzle">Are you interested in MechMania/PuzzleBang? </label>
                <select id="mech-puzzle" bind:value={formValues.mechPuzzle}>
                    <option value="both">Yes, I'm interested in both</option>
                    <option value="mechmania">I'm just interested in MechMania</option>
                    <option value="puzzlebang">I'm just interested in PuzzleBang</option>
                    <option value="no-Free">No</option>
                </select>
            </div>

            <div>
                <label for="marketing">How did you hear about R|P? </label>
                <select id="food" bind:value={formValues.food} multiple>
                    <option value="ACMOH">ACM Open House</option>
                    <option value="ACMN">ACM Newsletter</option>
                    <option value="building-ads">Building Ads</option>
                    <option value="courses">Courses</option>
                    <option value="WCS">WCS Newsletter</option>
                    <option value="cs-newsletter">CS Department Newsletter</option>
                    <option value="social-media">Social Media</option>
                    <option value="twitter">Twitter</option>
                    <option value="email">Email</option>
                    <option value="in-class-pitch">In-Class Pitch</option>
                    <option value="posters">Posters/Flyers</option>
                    <option value="quad-day">Quad Day</option>
                    <option value="e-night">E-night</option>
                    <option value="website">Website</option>
                    <option value="slack">Slack</option>
                    <option value="word-of-mouth">Word of Mouth</option>
                    <input type="marketingother" id="marketing-other" bind:value={formValues.marketingOther}>
                </select>
            </div>
        </form>
    </main>
</div>

