<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import Sidebar from '../components/sidebar.svelte';

	

	let { data, children } = $props();
	let courses = data.globalData.courses || [];
</script>


<div class="bg-black min-h-svh w-full text-white flex">
	<Sidebar {courses} />
	<div>{@render children()}</div>
</div>
