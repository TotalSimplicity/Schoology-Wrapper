<script lang="ts">
    import { onMount } from "svelte";
    import Folder from "./folder.svelte";
    import Assignment from "./assignment.svelte";
    import Page from "./page.svelte";
    import { ChevronDown, ChevronRight} from '@lucide/svelte';

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
        <button class="flex" onclick={() => (isOpened = !isOpened)}>
            <h2>📁{folder.title}</h2>
            {#if folderChildren && folderChildren.length > 0}
                <div
                    class="ml-2"
                    
                >
                    {#if isOpened}
                        <ChevronDown color="#FFFFFF" />
                    {:else}
                        <ChevronRight color="#FFFFFF" />
                    {/if}
                </div>
            {/if}
        </button>
        {#if folderChildren && isOpened}
            <div class="ml-4 flex flex-col items-start">
                {#each folderChildren as child}
                    {#if child.type === 'folder'}
                        <Folder folder={child} />
                    {:else if child.type === 'assignment'}
                        <Assignment assignment={child} />
                    {:else if child.type === 'page'}
                        <Page page={child} />
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>