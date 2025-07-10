<script lang="ts">
    import FolderManager from "$components/course-page/folder-manager.svelte";
	import CurrentlyOpened from "$/components/course-page/currently-opened.svelte";
    import { page } from '$app/state';





    $effect(() => {
        let slug = page.url.pathname.split('/').pop();
        console.log("Current Course Slug:", slug);

        
        
    });
    let { data } = $props()

    
    

    
</script>


<h1 class="text-center text-3xl">{data.courseData.course_title}</h1>
<div class="flex items-center w-full px-20 py-20">
    <FolderManager folders={data.folders} />
    <CurrentlyOpened  />
</div>