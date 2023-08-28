<script lang="ts">
	import Buildings from '../../components/buildings.svelte';
	import GlassContainer from '../../components/glass-container.svelte';
	import WindowCard from '../../lib/components/window-card.svelte';
</script>

<div class="h-screen mx-auto w-[90%] lg:w-4/5 md:mt-10 relative">
	<WindowCard>
		<div class="bg-rp-subtle-pink p-1 mt-2 flex flex-col-reverse md:flex-row">
			<a href="https://mechmania.org/" class="mx-auto my-auto w-8/12 sm:w-3/5 md:w-2/5">
				<img src="mm29.png" alt="MechMania Logo" />
				<!-- max-w-full transform scale-75 p-3-->
			</a>
			<div class="h-1/2 mt-2">
				<div
					class="rounded-t-md bg-rp-cream border border-rp-blue w-fit px-2 py-0.5 border-b-0 font-bold"
				>
					<p class="uppercase">MechMania.SH</p>
				</div>
				<div class="w-full min-h-[18rem] bg-rp-cream border border-rp-blue p-3">
					<p>
						MechMania is a 24-hour AI hackathon where students team up to write a bot that plays a
						game.
					</p>
					<br />
					<p>
						Every year, we build a game in secret, and challenge you to write the best bot! It won't
						be so simple though; your bot will be competing against other teams' bots! You can fly
						solo or participate in a group of up to four.
					</p>
					<br />
					<p>
						MechMania is open to all skill levels of coding. (Oh, and not to mention we've got
						prizes for the top teams!)
					</p>
					<br />
					<a
						href="https://mechmania.org/"
						class="duration-500 bg-rp-blue text-gray-200 px-3 py-2 my-5 rounded-md text-center"
						target="_blank"
						referrerpolicy="no-referrer">Visit MechMania</a
					>
				</div>
			</div>
		</div>
	</WindowCard>
</div>

<Buildings />
