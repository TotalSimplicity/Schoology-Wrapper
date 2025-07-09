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
