<script>
	import HomeScreen from "./containers/HomeScreen.svelte";
	import GameLoop from "./GameLoop.svelte";
</script>

<HomeScreen />
<GameLoop />

<style global lang="postcss">
	/* only apply purgecss on utilities, per Tailwind docs */
	/* purgecss start ignore */
	@tailwind base;
	@tailwind components;
	/* purgecss end ignore */

	@tailwind utilities;

	@layer utilities {
		.selected {
			background-image: url("../img/button-down.png") !important;
		}
	}
</style>
