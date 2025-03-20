// content.js

function extractUnreadCountFromDOM() {
  const inboxLink = document.querySelector('a[href^="https://mail.google.com/mail/u/0/#inbox"]')
  if (inboxLink) {
    const parentSpan = inboxLink.parentElement
    if (parentSpan) {
      const unreadDiv = parentSpan.nextElementSibling
      if (unreadDiv && /^\d+$/.test(unreadDiv.textContent.trim())) {
        return parseInt(unreadDiv.textContent.trim(), 10)
      }
    }
  }
  return 0 // 見つからない場合は0を返す
}

function sendUnreadCount() {
  const unreadCount = extractUnreadCountFromDOM()
  browser.runtime.sendMessage({ type: 'UNREAD_COUNT', unreadCount })
}

// 初回実行
sendUnreadCount()

// DOMの変化を監視するためのMutationObserver設定
const observer = new MutationObserver((mutations) => {
  sendUnreadCount() // DOM変化ごとに再度未読数を送る
})

// 監視対象をbody全体に設定（広範囲に変化を監視）
observer.observe(document.body, { childList: true, subtree: true })
