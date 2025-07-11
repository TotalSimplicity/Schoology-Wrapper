window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data) return;

  if (event.data.type === "FETCH_ASSIGNMENT") {
    browser.runtime.sendMessage(
      { type: "GET_ASSIGNMENT", assignmentId: event.data.assignmentId },
      (response) => {
        window.postMessage(
          {
            type: "ASSIGNMENT_DATA",
            payload: response.data,
          },
          "*"
        );
      }
    );
  }
});

// Listen for scrape requests from the background script
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SCRAPE_ASSIGNMENT") {
    // Example: scrape the assignment title and description
    const title = document.querySelector(".page-title ")?.innerText || "";
    const description = document.querySelector(".info-body")?.innerHTML || "";

    sendResponse({ data: { title, description } });
  }
});
