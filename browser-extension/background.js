browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_ASSIGNMENT") {
    console.log("Background got request:", request.assignmentId);

    // Do whatever processing or DOM grabbing you want here

    sendResponse({ data: `This is mock assignment data for assignment ID ${request.assignmentId}` });
  }
  return true; // required for async sendResponse
});
