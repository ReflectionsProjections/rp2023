<script lang="ts">
	export let isCollegeStudent: string = '';
</script>

<style>
	div {
		padding-top: 15px;
		padding-bottom: 15px;
		background-color: slate-900;
		color: white;
		border: p-4 px-5 m-3 rounded-md gap-5 flex-col border-2 border-blue-400;
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

<div>
	<label for="is-college-student">Are you a college student? </label>
	<select id="is-college-student" bind:value={isCollegeStudent}>
		<!-- <option value="">Choose One</option> -->
		<option value="yes">Yes</option>
		<option value="">No</option>
	</select>
</div>
