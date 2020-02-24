import PNotify from 'pnotify/dist/es/PNotifyButtons'

const notificationsStack = {
  dir1: 'up',
  dir2: 'left',
  push: 'top',
  spacing1: 5,
  spacing2: 5
}

const notify = function (title, message, style = 'primary') {
  const options = {
    title: title,
    addClass: 'stack-bottom-right bg-' + style + ' border-' + style,
    icon: 'icon-info22',
    stack: notificationsStack,
    delay: 30000
  }

  if (message) {
    options.text = message
  }

  PNotify.notice(options)
}

export default notify
