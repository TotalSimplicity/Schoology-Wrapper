<script lang="ts">
	import Folder from "$/components/course-page/folder.svelte";
    import FolderManager from "$components/course-page/folder-manager.svelte";
	import { onMount } from "svelte";
    let { data } = $props()


    // onMount(() => {
    //     if (!data.courseData) {
    //         console.error("Course data is not available");
    //     }
    //     if (!data.folders) {
    //         console.error("Folders data is not available");
    //     }
    //     console.log("Course Data:", data.courseData);
    // });
</script>

<div>
    <h1>{data.courseData.course_title}</h1>
    <h2>{data.courseData.section_title}</h2>

    
    <FolderManager folders={data.folders} />
</div>