<script lang="ts">
    import type { extraEventOptions } from "./misc-types";

    const extraEventOptions: { extraEventId: extraEventOptions, displayText: string}[] = [
        { extraEventId: 'mechmania', displayText: 'MechMania' },
        { extraEventId: 'puzzlebang', displayText: 'PuzzleBang' }
    ];
    export let formExtraEvents: string[];

</script>

<div class="flex flex-col gap-5 mb-3">
    <label for="mech-puzzle">Are you interested in MechMania/PuzzleBang? (Select all you are interested in)</label>
    
    {#each extraEventOptions as { extraEventId, displayText }}
    <div class="flex flex-col items-center">
            <button
                    id={extraEventId}
                    on:click={() => {
                        if (formExtraEvents.includes(extraEventId)) {
                            formExtraEvents = formExtraEvents.filter((val) => val !== extraEventId);
                        } else {
                            formExtraEvents = formExtraEvents.concat(extraEventId);
                        }
                    }}
                    class="w-1/2 duration-300 text-center bg-white p-3 {formExtraEvents.includes(
                        extraEventId
                    )
                        ? 'bg-opacity-40'
                        : 'bg-opacity-10 hover:bg-opacity-20'}"
                >
                    {displayText}</button
                >
            
            </div>
    {/each}

</div>