class SlackAPI {
  constructor(token) {
    this.token = token;
  }

  createTextResponse(text) {
    return ContentService
      .createTextOutput(text)
      .setMimeType(ContentService.MimeType.TEXT);
  }

  createJsonResponse(json) {
    return ContentService
      .createTextOutput(JSON.stringify(json))
      .setMimeType(ContentService.MimeType.JSON);
  }

  call(url, payload) {
    const options = {
      'headers': {
        'Authorization': `Bearer ${this.token}`
      },
      "method": "post",
      "contentType": "application/json",
      "payload": JSON.stringify(payload)
    };
  
    return JSON.parse(UrlFetchApp.fetch(url, options).getContentText());
  }

  invite(userIdentifiers, channelIdentifier) {
    return this.call("https://slack.com/api/conversations.invite", {
      "channel": channelIdentifier,
      "users": userIdentifiers.join(",")
    });
  }

  listUsers() {
    const url = `https://slack.com/api/users.list?token=${this.token}`;
    return JSON.parse(UrlFetchApp.fetch(url, {
      "method": "get",
      "contentType": "application/x-www-form-urlencoded",
    }).getContentText());
  }
  
  log(content) {
    this.call("https://slack.com/api/chat.postMessage", {
      "channel": "UR61XM9GA",
      "text": content
    });
  }
}
