<script lang="ts">
	import type { extraEventOptions } from './misc-types';

	// const extraEventOptions: { extraEventId: extraEventOptions, displayText: string}[] = [
	//     { extraEventId: 'mechmania', displayText: 'MechMania' },
	//     { extraEventId: 'puzzlebang', displayText: 'PuzzleBang' }
	// ];
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
	<label for="mech-puzzle"
		>Are you interested in MechMania/PuzzleBang? (Select all you are interested in)</label
	>

	<div class="flex flex-col items-center w-full">
		<button
			class="w-full duration-300 text-center bg-white p-3 {formExtraEvents.includes('mechmania')
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('mechmania')}
		>
			<strong><u>MechMania</u></strong>
			<div>MechMania is a 24-hour AI hackathon where students team up to write a bot that plays a game</div>
		</button>
		<button
			class="w-full duration-300 text-center bg-white p-3 {formExtraEvents.includes('puzzlebang')
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={handleClick('puzzlebang')}
		>
			<strong><u>PuzzleBang</u></strong>
			<div>PuzzleBang is a week-long puzzle contest where you and your friends can win exciting prizes! Not to mention an escape room...</div>
		</button>
	</div>

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
