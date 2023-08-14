<script lang="ts">
    import GlassContainer from '../../components/glass-container.svelte';
</script>


<div class="flex items-center mx-auto w-[90%] md:w-3/5 lg:w-2/5 overflow-y-auto mt-8">
    <GlassContainer>
        <div class="flex flex-col gap-2 mb-3">
            <div class="text-lg md:text-4xl text-white text-center">MechMania</div>
            <a href="https://mechmania.org/">
                <img src="mm29.png" alt="Mech Mania 29 Logo" class="max-w-full transform scale-75 p-3" />
            </a>
            <div class="text-base text-slate-300">
                MechMania is a 24-hour AI hackathon where students team up to write a bot that plays a game. Every year, we build a game in secret, and challenge you to write the best bot!
                 It won't be so simple though; your bot will be competing against other teams' bots! You can fly solo or participate in a group of up to four. 
                 MechMania is open to all skill levels of coding. (Oh, and not to mention we've got prizes for the top teams!) 
                 If you want to find out more, visit <a href="https://mechmania.org/">mechmania.org</a>.
            </div>
            <a href="https://mechmania.org/" class="mx-auto duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white">Visit MechMania</a>
        </div>
    </GlassContainer>
</div>
