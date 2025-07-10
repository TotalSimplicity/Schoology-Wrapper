

export let currentlyOpened: {
    apiData: any | null;
    scrapedData: any | null;
} = $state({
    apiData: null,
    scrapedData: null
});

export function reset() {
    currentlyOpened.apiData = null;
    currentlyOpened.scrapedData = null;
}

export function setApiData(assignment: any) {
    if (currentlyOpened) {
        currentlyOpened.apiData = assignment;
    }
}

export function setScrapedData(assignment: any) {
    if (currentlyOpened) {
        currentlyOpened.scrapedData = assignment;
    }
}

export function get() {
    return currentlyOpened;
}