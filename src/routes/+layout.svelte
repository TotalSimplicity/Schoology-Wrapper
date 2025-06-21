<script lang="ts">
    import '../app.css';
    import { onMount, onDestroy } from 'svelte';
    import Sidebar from '../components/sidebar.svelte';

    let { data, children } = $props();
    let courses = data.globalData.courses || [];

    let showSidebar = $state(false);

    function handleMouseMove(event: MouseEvent) {
        showSidebar = event.clientX < 40;
    }

    onMount(() => {
        window.addEventListener('mousemove', handleMouseMove);
    });
    onDestroy(() => {
        window.removeEventListener('mousemove', handleMouseMove);
    });
</script>

<div class="bg-black min-h-svh w-full text-white flex">
    {#if showSidebar}
        <Sidebar {courses} />
    {/if}
    <div>{@render children()}</div>
</div>