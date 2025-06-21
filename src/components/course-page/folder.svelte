<script lang="ts">
    import { onMount } from "svelte";
    import Folder from "./folder.svelte";
    import { ChevronDown, ChevronRight } from '@lucide/svelte';

    let { folder } = $props()

    type FolderChild = {
        id: number;
        title: string;
        body: string;
        location: string;
        type: string;
    };
    let folderChildren: FolderChild[] = $state([]);

    let isOpened = $state(false);

    onMount(async () => {
        const match = folder.location.match(/courses\/(\d+)/);
        const folderChildrenRes = await fetch(`/api/folder-children/${match[1]}/${folder.id}`)
        folderChildren = await folderChildrenRes.json();
        console.log(folderChildren);
        
    })
</script>

<div class="flex ">
    <div>
        <div class="flex">
            <h2>📁{folder.title}</h2>
            {#if folderChildren && folderChildren.length > 0}
                <button
                    class="ml-2 text-blue-500 hover:underline"
                    onclick={() => (isOpened = !isOpened)}
                >
                    {#if isOpened}
                        <ChevronDown color="#FFFFFF" />
                    {:else}
                        <ChevronRight color="#FFFFFF" />
                    {/if}
                </button>
            {/if}
        </div>
        {#if folderChildren && isOpened}
            <div class="ml-4">
                {#each folderChildren as child}
                    {#if child.type === 'folder'}
                        <Folder folder={child} />
                    {:else}
                        <div>{child.title}</div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>