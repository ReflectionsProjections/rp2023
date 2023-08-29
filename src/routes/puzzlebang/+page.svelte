<script lang="ts">
	import Buildings from '../../components/buildings.svelte';
	import WindowCard from '../../lib/components/window-card.svelte';
</script>

<div class="h-screen mx-auto w-[90%] lg:w-4/5 md:mt-10 relative z-0">
	<WindowCard>
		<div class="bg-rp-subtle-pink p-1 mt-2 flex flex-col md:flex-row">
			<a href="https://puzzlebang.com/" class="mx-auto my-auto w-8/12 sm:w-3/12">
				<img src="puzzlebang2023_colored.svg" alt="Puzzle Bang 2023 Logo" />
				<!-- max-w-full transform scale-75 p-3-->
			</a>
			<div class="h-1/2 mt-2">
				<div
					class="rounded-t-md bg-rp-cream border border-rp-blue w-fit px-2 py-0.5 border-b-0 font-bold"
				>
					<p class="uppercase">PuzzleBang.SH</p>
				</div>
				<div class="w-full min-h-[18rem] bg-rp-cream border border-rp-blue p-3">
					<p>
						Grab your friends and compete in a week-long puzzle contest hosted by four UIUC Alums to
						win exciting prizes.
						<br />
						PuzzleBang will also be running a pop-up escape room in Siebel on the Saturday after Reflections
						| Projections!
						<br /> Follow @puzzlebang to find out how to register!
					</p>
					<br />
					<a
						href="https://puzzlebang.com/"
						class="duration-500 bg-rp-blue text-gray-200 px-3 py-2 my-5 rounded-md text-center"
						target="_blank"
						referrerpolicy="no-referrer">Visit PuzzleBang</a
					>
				</div>
			</div>
		</div>
	</WindowCard>
</div>

<Buildings />
