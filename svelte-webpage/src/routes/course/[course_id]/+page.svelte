<script lang="ts">
	import Folder from "$/components/course-page/folder.svelte";
    import FolderManager from "$components/course-page/folder-manager.svelte";
	import { onMount } from "svelte";
    import { page } from '$app/state';

    $effect(() => {
        let slug = page.url.pathname.split('/').pop();
        console.log("Current Course Slug:", slug);

        window.postMessage({ type: "FETCH_ASSIGNMENT", assignmentId: "12345" }, "*");

        window.addEventListener("message", (event) => {
        if (event.data.type === "ASSIGNMENT_DATA") {
            console.log("Assignment Data:", event.data.payload);
        }
        });
        
    });
    let { data } = $props()
    

    
</script>

<div>
    <h1>{data.courseData.course_title}</h1>
    <h2>{data.courseData.section_title}</h2>

    
    <FolderManager folders={data.folders} />
</div>