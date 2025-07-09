<script lang="ts">
    import '../app.css';
    import { onMount, onDestroy } from 'svelte';
    import Sidebar from '../components/sidebar.svelte';

    let { data, children } = $props();
    let courses = data.globalData.courses || [];

    let showSidebar = $state(false);

    function handleMouseMove(event: MouseEvent) {
        if(!showSidebar)
            showSidebar = event.clientX < 40;
        else
            showSidebar = event.clientX < 250;
    }

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('mousemove', handleMouseMove);
        }
    });
    onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('mousemove', handleMouseMove);
        }
    });
</script>

<div class="bg-black min-h-svh w-full text-white flex">
    {#if showSidebar}
        <Sidebar {courses} />
    {/if}
    <div>{@render children()}</div>
</div>  