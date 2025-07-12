const GOOGLE_LOGIN_URL = "https://accounts.google.com/";

let lastAssignmentId = null;

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "loading" &&
    tab.url &&
    tab.url.startsWith(GOOGLE_LOGIN_URL)
  ) {
    browser.tabs.update(tabId, { active: true });
  }
});

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_ASSIGNMENT") {
    const assignmentUrl = `https://wilton.schoology.com/assignments/${request.assignmentId}/info`;
    lastAssignmentId = request.assignmentId;
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
                  browser.tabs.get(tab.id, (updatedTab) => {
                    if (!updatedTab.url.startsWith(GOOGLE_LOGIN_URL)) {
                      browser.tabs.remove(tab.id);
                    }
                  });
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

  if (request.type === "SCRAPE_MYDOCUMENT") {
    const mydocUrl = `https://wilton.schoology.com/assignments/${lastAssignmentId}/mydocument`;

    browser.tabs.create({ url: mydocUrl, active: false }, (tab) => {
      function pollForContent(tabId, tries = 0) {
        if (tries > 1000) {
          browser.tabs.sendMessage(
            tabId,
            { type: "SCRAPE_MYDOCUMENT_CONTENT" },
            (response) => {
              sendResponse({ data: response.data });
              browser.tabs.remove(tabId);
            }
          );
          return;
        }
        browser.tabs.sendMessage(
          tabId,
          { type: "CHECK_MYDOCUMENT_READY" },
          (response) => {
            if (response && response.ready) {
              console.log("Document is ready, scraping content...");
              browser.tabs.sendMessage(
                tabId,
                { type: "SCRAPE_MYDOCUMENT_CONTENT" },
                (scrapeResponse) => {
                  sendResponse({ data: scrapeResponse.data });
                  browser.tabs.remove(tabId);
                }
              );
            } else {
              setTimeout(() => pollForContent(tabId, tries + 1), 100);
            }
          }
        );
      }

      function handleUpdated(tabId, changeInfo) {
        if (tabId === tab.id && changeInfo.status === "complete") {
          browser.tabs.onUpdated.removeListener(handleUpdated);
          pollForContent(tab.id);
        }
      }
      browser.tabs.onUpdated.addListener(handleUpdated);
    });

    return true;
  }
});
