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
        </form>
    </main>
</div>

