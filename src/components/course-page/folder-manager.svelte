<script lang="ts">
    import Folder from "./folder.svelte";

    let { folders } = $props();
</script>

<div class="flex flex-col">
    {#each folders as folder}
        {#if folder.parent_id == 0}
            <Folder {folder} />
        {/if}
    {/each}
</div>