<script lang="ts">
    import { currentlyOpened } from "$/lib/openedAssignment.svelte";

    
</script>

<style>
    description :global {
        a { color: blue;}
    }
</style>

<div class="flex gap-8 max-w-2/3 pl-18">
    {#if currentlyOpened && currentlyOpened.apiData}
    <div class="flex flex-col items-center">
        <h2>API DATA</h2>
        <h3>{currentlyOpened.apiData.title}</h3>
        <p>{currentlyOpened.apiData.description}</p>
    </div>
    {/if}
    {#if currentlyOpened && currentlyOpened.scrapedData}
    <div class="flex flex-col items-center">
        <h2>SCRAPED DATA</h2>
        <h3>{currentlyOpened.scrapedData.title}</h3>
        <description>
            <p>{@html currentlyOpened.scrapedData.description}</p>
        </description>
        
    </div>
    <iframe src={currentlyOpened.scrapedData.docLink} class="w-full h-96" />
    {/if}
</div>

