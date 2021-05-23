<script lang="ts">
    import MapSelection from './MapSelection.svelte';
    import ExpeditionMode from './ExpeditionMode.svelte';

    let mapSelectionMode = true;

    const startExpedition = (payload: string) => {
        mapSelectionMode = false
    }

</script>

{#if mapSelectionMode}
    <MapSelection on:startExpedition={startExpedition} />
{:else}
    <ExpeditionMode />
{/if}



