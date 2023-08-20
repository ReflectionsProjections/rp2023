<script lang="ts">
	import SmartInput from '../../lib/util/smart-input.svelte';
	import type { extraEventOptions } from './misc-types';

	export let formExtraEvents: string[];

	const handleClick = (pressed: extraEventOptions) => () => {
		if (formExtraEvents.includes(pressed)) {
			formExtraEvents = formExtraEvents.filter((val) => val !== pressed);
		} else {
			formExtraEvents = formExtraEvents.concat(pressed);
		}
	};
</script>

<div class="flex flex-col gap-5 mb-3">
	<SmartInput label="Interested in MechMania / PuzzleBang?" sublabel="(multiple)">
		<div class="flex flex-col items-center w-full text-gray-300">
			<button
				class="w-full flex flex-col items-center rounded-t-md duration-300 text-center bg-white p-3 {formExtraEvents.includes(
					'mechmania'
				)
					? 'bg-opacity-40'
					: 'bg-opacity-10 hover:bg-opacity-20'}"
				on:click={handleClick('mechmania')}
			>
				<strong class="text-white">MechMania</strong>
				<div class="w-9/12 text-center">
					A 24-hour AI hackathon where students team up to write a bot that plays a game
				</div>
			</button>
			<button
				class="w-full flex flex-col items-center rounded-b-md duration-300 text-center bg-white p-3 {formExtraEvents.includes(
					'puzzlebang'
				)
					? 'bg-opacity-40'
					: 'bg-opacity-10 hover:bg-opacity-20'}"
				on:click={handleClick('puzzlebang')}
			>
				<strong class="text-white">PuzzleBang</strong>
				<div class="w-9/12 text-center">
					A week-long puzzle contest and escape room where you and your friends can win exciting
					prizes!
				</div>
			</button>
		</div>
	</SmartInput>

	<!-- {#each extraEventOptions as { extraEventId, displayText }}
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
    {/each} -->
</div>
