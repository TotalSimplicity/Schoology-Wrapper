<script>
    let { document } = $props();
    import { Link } from '@lucide/svelte';

    async function handleClick() {
        const match = document.location.match(/sections\/(\d+)/);
        const courseId = match ? match[1] : null;
        if (courseId) {
            const response = await fetch(`/api/document-info/${courseId}/${document.id}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                console.error('Failed to fetch page details');
            }
        } else {
            console.error('Invalid course ID in page location');
        }
    }
</script>

<button class="flex" onclick={handleClick}>
    <Link /> {document.title}
</button>