browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_ASSIGNMENT") {
    const assignmentUrl = `https://wilton.schoology.com/assignment/${request.assignmentId}/info`;

    // Find the tab with the assignment open
    browser.tabs.query({ url: assignmentUrl }, (tabs) => {
      if (tabs.length > 0) {
        // Send a message to the content script in that tab to scrape the data
        browser.tabs.sendMessage(
          tabs[0].id,
          { type: "SCRAPE_ASSIGNMENT" },
          (response) => {
            sendResponse({ data: response.data });
          }
        );
      } else {
        sendResponse({ data: "Assignment page not open in any tab." });
      }
    });

    // Indicate async response
    return true;
  }
});
