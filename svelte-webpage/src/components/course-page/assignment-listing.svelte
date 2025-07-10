<script lang="ts">
    
    import { NotebookText } from '@lucide/svelte';
    import * as openedAssignment from "$/lib/openedAssignment.svelte.js";
    let { assignment } = $props();

    let scrapedAssignment;

    async function handleClick() {
        openedAssignment.reset();
        const match = assignment.location.match(/sections\/(\d+)/);
        const courseId = match ? match[1] : null;
        if (courseId) {
            const response = await fetch(`/api/assignment-info/${courseId}/${assignment.id}`);
            if (response.ok) {
                const data = await response.json();
                // console.log(data);
                openedAssignment.setApiData(data);
            } else {
                console.error('Failed to fetch assignment details');
            }
        } else {
            console.error('Invalid course ID in assignment location');
        }

        window.postMessage({ type: "FETCH_ASSIGNMENT", assignmentId: assignment.id }, "*");

        window.addEventListener("message", (event) => {
        if (event.data.type === "ASSIGNMENT_DATA") {
            scrapedAssignment = event.data.payload;
            openedAssignment.setScrapedData(scrapedAssignment);
            console.log("Scraped Assignment Data:", event.data.payload);
        }
        });
    }
</script>

<button class="flex" onclick={handleClick}><NotebookText /> {assignment.title}</button>