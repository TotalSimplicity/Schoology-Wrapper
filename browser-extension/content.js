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

let lastDocLinkFound = null;
// Helper to find a Google Docs/Slides/Sheets link
function findGoogleDocLink() {
  const iframes = document.querySelectorAll("iframe");
  const srcList = [];

  for (const iframe of iframes) {
    let src = iframe.getAttribute("src");
    if (src) {
      // Prepend the hostname if the src is a relative path
      if (src.startsWith("/")) {
        src = "https://wilton.schoology.com" + src;
      }
      srcList.push(src);
    }
  }
  //srcList = srcList.filter((src) => src.includes("wilton"));
  return (srcList.length > 1) ? srcList[0] : null;
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "SCRAPE_ASSIGNMENT") {
    const title = document.querySelector(".page-title")?.innerText || "";
    const description =
      document.querySelector(".info-body")?.innerHTML ||
      document.querySelector(".assignment-info-tab-description-2342305181")
        ?.innerHTML ||
      "";

    if (document.querySelector(".assignment-info-tab-description-2342305181")) {
      browser.runtime.sendMessage(
        {
          type: "SCRAPE_MYDOCUMENT",
          assignmentId: request.assignmentId,
        },
        (mydocResponse) => {
          sendResponse({
            data: { title, description, docLink: mydocResponse.data },
          });
        }
      );
      return true;
    } else {
      sendResponse({ data: { title, description } });
    }
  }

  if (request.type === "CHECK_MYDOCUMENT_READY") {
    const docLink = findGoogleDocLink();
    sendResponse({ ready: !!docLink });
  }

  if (request.type === "SCRAPE_MYDOCUMENT_CONTENT") {
    const docLink = lastDocLinkFound || findGoogleDocLink();
    sendResponse({ data: docLink || "no doc link" });
  }
});
