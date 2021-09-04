function sendToSlack(body, channel) {
  // ToDo: Entry Slack webhook URL
  var url = ''
  var data = {
    channel: channel,
    username: 'Googleフォーム Bot',
    text: body,
    icon_emoji: ':date: ',
  }
  var payload = JSON.stringify(data)
  var options = {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
  }
  var response = UrlFetchApp.fetch(url, options)
}

function test() {
  // ToDo: Entry Slack channel name (ex: #general)
  sendToSlack('テスト通知確認です', '#general')
}

function onFormSubmit(e) {
  var itemResponse = e.response.getItemResponses()

  var name = ''
  var email = ''
  var detail = ''
  for (var j = 0; j < itemResponse.length; j++) {
    var formData = itemResponse[j]
    var title = formData.getItem().getTitle()
    var response = formData.getResponse()
    // ToDo: Entry columns in order
    switch (title) {
      case 'お名前':
        name = response
        break
      case '連絡先':
        email = response
        break
      case 'お問い合わせ内容':
        detail = response
        break
      default:
        break
    }
  }

  var bodyPublic = 'お名前:' + name + '\n連絡先:' + email + '\nお問い合わせ内容:' + detail

  // ToDo: Entry Slack channel name (ex: #general)
  sendToSlack(bodyPublic, '#general')
}
