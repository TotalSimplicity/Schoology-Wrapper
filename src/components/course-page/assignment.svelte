<script lang="ts">
    
    import { NotebookText } from '@lucide/svelte';
    let { assignment } = $props();

    async function handleClick() {
        const match = assignment.location.match(/sections\/(\d+)/);
        const courseId = match ? match[1] : null;
        if (courseId) {
            const response = await fetch(`/api/assignment-info/${courseId}/${assignment.id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Failed to fetch assignment details');
            }
        } else {
            console.error('Invalid course ID in assignment location');
        }
    }
</script>

<button class="flex" onclick={handleClick}><NotebookText /> {assignment.title}</button>