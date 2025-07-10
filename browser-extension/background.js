browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_ASSIGNMENT") {
    const assignmentUrl = `https://wilton.schoology.com/assignment/${request.assignmentId}/info`;

    browser.tabs.query({ url: assignmentUrl }, (tabs) => {
      if (tabs.length > 0) {
        browser.tabs.sendMessage(
          tabs[0].id,
          { type: "SCRAPE_ASSIGNMENT" },
          (response) => sendResponse({ data: response.data })
        );
      } else {
        browser.tabs.create({ url: assignmentUrl, active: false }, (tab) => {
          function handleUpdated(tabId, changeInfo) {
            if (tabId === tab.id && changeInfo.status === "complete") {
              browser.tabs.onUpdated.removeListener(handleUpdated);
              browser.tabs.sendMessage(
                tab.id,
                { type: "SCRAPE_ASSIGNMENT" },
                (response) => {
                  sendResponse({ data: response.data });
                  browser.tabs.remove(tab.id);
                }
              );
            }
          }
          browser.tabs.onUpdated.addListener(handleUpdated);
        });
      }
    });

    return true;
  }
});
