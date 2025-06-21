<script lang="ts">
	import Folder from "$/components/course-page/folder.svelte";
    import FolderManager from "$components/course-page/folder-manager.svelte";
    let { data } = $props()

</script>

<div>
    <h1>{data.courseData.course_title}</h1>
    <h2>{data.courseData.section_title}</h2>

    
    <FolderManager folders={data.folders} />
</div>