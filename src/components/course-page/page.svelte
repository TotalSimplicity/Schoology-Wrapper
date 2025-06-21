<script>
    let { page } = $props();
    import { Scroll } from '@lucide/svelte';

    async function handleClick() {
        const match = page.location.match(/sections\/(\d+)/);
        const courseId = match ? match[1] : null;
        if (courseId) {
            const response = await fetch(`/api/page-info/${courseId}/${page.id}`);
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
    <Scroll /> {page.title}
</button>