<script lang="ts">
    import { resources } from "./store/resources.js";
    import { resourceTypes } from './constants/resourceTypes.js';

    let previousTime = new Date();
    let toggledFarm = false, toggledWood = false;

    const gameLoop = () => {
        const currentTime = new Date();
        const secondsElapsed = Math.round(
            (currentTime.getTime() - previousTime.getTime()) / 1000
        );
        processEvents(secondsElapsed);
        previousTime = currentTime;
    };

    const processEvents = (secondsElapsed: number) => {
        processResources(secondsElapsed);
        
    };

    const processResources = (secondsElapsed: number) => {
        const newFoodValue = $resources.food.value + $resources.farms.value * secondsElapsed;
        resources.updateResourceValue(resourceTypes.FOOD, newFoodValue);
        if (!toggledWood && newFoodValue > 10) {
            resources.toggleDisplay(resourceTypes.WOOD);
            toggledWood = true;
            resources.toggleDisplay(resourceTypes.STORAGE);
        }
        if (!toggledFarm && $resources.wood.value > 5) {
            resources.toggleDisplay(resourceTypes.FARMS);
            toggledFarm = true;
        }
    }

    setInterval(gameLoop, 1000);
	// document.addEventListener("DOMContentLoaded", function (event) {
	// 	setInterval(gameLoop, 1000);
	// });
</script>
