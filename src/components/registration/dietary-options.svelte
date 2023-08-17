<script lang="ts">
	import Icon from '@iconify/svelte';

	export let food = '';
	export let error = '';
</script>

<div class="flex-col flex">
	<div class="flex flex-row">
		<button
			class="flex rounded-tl-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {food ===
			'Vegan'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				food = 'Vegan';
			}}
		>
			<Icon class="text-xl" icon="lucide:vegan" />
			<div>Vegan</div>
		</button>
		<button
			class="flex rounded-tr-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {food ===
			'Vegetarian'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				food = 'Vegetarian';
			}}
		>
			<Icon
				class="text-xl"
				icon="streamline:food-cherries-cook-plant-cherry-plants-drink-cooking-nutrition-vegetarian-fruit-food"
			/>
			<div>Vegetarian</div>
		</button>
	</div>
	<div class="flex flex-row">
		<button
			class="flex rounded-bl-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {food ===
			'Gluten-Free'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				food = 'Gluten-Free';
			}}
		>
			<Icon class="text-xl" icon="mdi:gluten-free" />
			<div>Gluten-Free</div>
		</button>
		<button
			class="flex rounded-br-md items-center duration-300 w-full p-3 bg-white flex-col gap-2 {food ===
			'none'
				? 'bg-opacity-40'
				: 'bg-opacity-10 hover:bg-opacity-20'}"
			on:click={() => {
				food = 'none';
			}}
		>
			<Icon class="text-xl" icon="icon-park-twotone:good-one" />
			<div>No dietary restrictions</div>
		</button>
	</div>
	<div class="text-red-400 ml-1 text-sm {error ? '' : 'hidden'}">
		{error}
	</div>
</div>
