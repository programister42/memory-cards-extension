document.addEventListener("click", () => {
  const selection = window.getSelection().toString();
  if (selection) {
    chrome.runtime.sendMessage(
      {
        msg: "selection",
        data: selection,
      },
      console.log
    );
  }
});
