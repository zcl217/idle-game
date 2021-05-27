<script lang="ts">
    import { resources } from "./store/resources";
    import { workers } from "./store/workers";
    import { act, scene } from "./store/gameState";
    import { RESOURCE_TYPES, GENERATABLE_RESOURCES } from './constants/resourceTypes';
    import { calculateGenerationRate } from './utils/helpers';

    let previousTime = new Date();
    
    const gameLoop = () => {
        const currentTime = new Date();
        const secondsElapsed = Math.round(
            (currentTime.getTime() - previousTime.getTime()) / 1000
        );
        processResources(secondsElapsed);
        processEvents(secondsElapsed);
        previousTime = currentTime;
    };

    const processResources = (secondsElapsed: number) => {
        for (let resource of GENERATABLE_RESOURCES) {
            handleResourceGeneration(secondsElapsed, resource)
        }
    }

    const handleResourceGeneration = (secondsElapsed: number, type: string) => {
        const generationRate = parseInt(calculateGenerationRate(type, $resources, $workers));
        const newValue = $resources[type].value + (generationRate * secondsElapsed);
        resources.updateResourceValue(type, newValue);
    }

    const processEvents = (secondsElapsed: number) => {
        
    };

    setInterval(gameLoop, 1000);
	// document.addEventListener("DOMContentLoaded", function (event) {
	// 	setInterval(gameLoop, 1000);
	// });
</script>
