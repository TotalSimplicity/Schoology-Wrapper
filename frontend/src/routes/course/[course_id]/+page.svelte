<script lang="ts">
    let { data } = $props()

    $effect: {
        console.log(data.folders)
    }
</script>

<div>
    <h1>{data.courseData.course_title}</h1>
    <h2>{data.courseData.section_title}</h2>

    <div class="flex flex-col">
        {#each data.folders as folder}
            {#if folder.parent_id == 0}
                <div>folderico {folder.title}</div>
            {/if}
        {/each}
    </div>
</div>