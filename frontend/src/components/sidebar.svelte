<script lang=ts>
    
    let { courses } = $props();

</script>

<div class="h-svh w-64">
    {#each courses as course}
        <div class="p-4 border-b border-gray-700 hover:bg-gray-800">
            <a href={`/course/${course.id}`} class="text-white">
                {course.course_title}
            </a>
        </div>
    {/each}
</div>