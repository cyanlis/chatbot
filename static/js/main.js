const messageList = document.querySelector('.message-list');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// 绑定发送按钮事件
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    // 发送消息给后端
    sendMessage(message);
    // 清空输入框
    messageInput.value = '';
  }
});

// 监听回车键按下事件
messageInput.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    const message = messageInput.value.trim();
    if (message !== '') {
      // 发送消息给后端
      sendMessage(message);
      // 清空输入框
      messageInput.value = '';
    }
  }
});

// 添加新消息到聊天记录中
function addMessage(content, avatar, isSent = false) {
  const messageItem = document.createElement('div');
  messageItem.classList.add('message-item');
  messageItem.classList.add(isSent ? 'message-item-sent' : 'message-item-received');

  const avatarWrapper = document.createElement('div');
  avatarWrapper.classList.add('avatar-wrapper');
  messageItem.appendChild(avatarWrapper);

  const avatarImage = document.createElement('img');
  avatarImage.classList.add('avatar');
  avatarImage.setAttribute('src', avatar);
  avatarWrapper.appendChild(avatarImage);

  const messageBubble = document.createElement('div');
  messageBubble.classList.add('message-bubble');
  messageBubble.textContent = content;
  messageItem.appendChild(messageBubble);

  messageList.appendChild(messageItem);
  scrollToBottom();
}

// 向后端发送消息
function sendMessage(message) {
  addMessage(message, '/static/images/avatar2.jpg', true); // 先将发送方的消息添加到聊天记录中
  fetch('/api/send_message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: message })
  }).then(response => {
    return response.json();
  }).then(data => {
    addMessage(data.message, data.avatar);
  });
}

// 将聊天记录滚动到底部
function scrollToBottom() {
  messageList.scrollTop = messageList.scrollHeight;
}

// 初始化页面
scrollToBottom();
