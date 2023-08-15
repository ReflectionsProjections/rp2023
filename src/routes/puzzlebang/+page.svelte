<script lang="ts">
    import GlassContainer from '../../components/glass-container.svelte';
</script>


<div class="flex items-center mx-auto w-[90%] md:w-3/5 lg:w-2/5 overflow-y-auto mt-8">
    <GlassContainer>
        <div class="flex flex-col gap-2 mb-3">
            <div class="text-lg md:text-4xl text-white text-center">PuzzleBang</div>
            <a href="https://puzzlebang.com/">
                <img src="puzzlebang2023_colored.svg" alt="Puzzle Bang 2023 Logo" class="max-w-full transform scale-75 p-3" />
            </a>
            <div class="text-center text-base text-slate-300">
                Grab your friends and compete in a week-long puzzle contest hosted by four UIUC Alums to win exciting prizes. Go to <a href="https://puzzlebang.com/">PuzzleBang.com</a> to get started!
    PuzzleBang will also be running a pop-up escape room in Siebel on the Saturday after Reflections | Projections!  Make sure you follow @puzzlebang to find out how to register!
            </div>
            <a href="https://puzzlebang.com/" class="mx-auto duration-500 bg-white bg-opacity-30 text-white px-3 py-2 m-3 rounded-md flex gap-2 border border-white">Visit PuzzleBang</a>
        </div>
    </GlassContainer>
</div>
