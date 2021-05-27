<script lang="ts">
    import MapSelection from "./MapSelection.svelte";
    import ExpeditionMode from "./ExpeditionMode.svelte";
import { inExpedition } from "~/store/gameState";

    let mapSelectionMode = true;

    const startExpedition = (payload: string) => {
        mapSelectionMode = false;
        console.log(payload.detail);
        inExpedition.set(true);
    };

    const handleVictory = () => {
        mapSelectionMode = true;
        inExpedition.set(false);
    }

    const handleDefeat = () => {
        console.log('received');
        mapSelectionMode = true;
        inExpedition.set(false);
    }

</script>

{#if mapSelectionMode}
    <MapSelection on:startExpedition={startExpedition} />
{:else}
    <ExpeditionMode
        on:VICTORY={handleVictory}
        on:DEFEAT={handleDefeat}
    />
{/if}
