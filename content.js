chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "sayHello") {
      console.log("Hello from content script!");
      sendResponse({ reply: "Hello from the webpage!" });
    }
  });
  