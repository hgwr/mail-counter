// background.js

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'UNREAD_COUNT') {
    const count = message.unreadCount
    if (count === 0) {
      browser.action.setBadgeText({ text: '' })
    } else {
      browser.action.setBadgeText({ text: count.toString() })
    }
  }
})
