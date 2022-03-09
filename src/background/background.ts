chrome.runtime.onMessage.addListener((msg, sender, sendRes) => {
  console.log(msg)
  console.log(sender)
  sendRes("From background script!")
})
