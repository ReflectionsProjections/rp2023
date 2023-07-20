<script lang="ts">
	import type { majorOptions } from "./misc-types";

    export let formMajor: string;
    export let formMajorOpenEnded: string;

</script>

<div class="flex flex-col items-start gap-2" id="majorSelector">
	<label for="major" class="flex flex-row gap-2">
		<div>Major</div>
	</label>
    <div class="flex-col flex">
        <div class="flex flex-row">
            <button
                class="flex rounded-l-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {formMajor ===
                'cs'
                    ? 'bg-opacity-40'
                    : 'bg-opacity-10 hover:bg-opacity-20'}"
                on:click={() => {
                    formMajor = 'cs';
                }}
            >
                <div>Computer Science</div>
            </button>
            <button
                class="flex rounded-r-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {formMajor ===
                'cs+x'
                    ? 'bg-opacity-40'
                    : 'bg-opacity-10 hover:bg-opacity-20'}"
                on:click={() => {
                    formMajor = 'cs+x';
                }}
            >
                <div>CS + X (Blended CS Major)</div>
            </button>
        </div>
	<div class="flex flex-row gap-3 items-center pl-3">
        <button 
         class="flex rounded-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {formMajor ===
            formMajorOpenEnded
                ? 'bg-opacity-40'
                : 'bg-opacity-10 hover:bg-opacity-20'}"
            on:click={() => {
                formMajor = formMajorOpenEnded;
            }}
        >
		<label for="other">Other</label>
		<input
			class="bg-transparent border border-gray-400 rounded-md h-fit"
			type="text"
			id="other"
			bind:value={formMajorOpenEnded}
		/>
    </button>
	</div>
</div>
</div>

