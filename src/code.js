const token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');  

function doPost(e) {
  const parameters = JSON.parse(e.postData.getDataAsString());
  log(JSON.stringify(parameters));
  
  if (parameters.type === "url_verification") {
    return urlVerification(parameters);
  }  

  if (parameters.event) {
    return handleEvent(parameters.event);
  }
}

function handleEvent(event) {
  if (event.type === "app_home_opened") {
    return appHomeOpened(event);
  }
}

function appHomeOpened(parameters) {
  slackApi("https://slack.com/api/conversations.invite", {
    "channel": "G012K0LAPKQ",
    "users": parameters.user,
  });
}

function urlVerification(parameters) {
  const reponse = ContentService.createTextOutput();
  reponse.setMimeType(ContentService.MimeType.TEXT);
  reponse.setContent(parameters.challenge);
  return reponse;
}

function slackApi(url, payload) {
  const options = {
    'headers': {
      'Authorization': `Bearer ${token}`
    },
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
  };

  UrlFetchApp.fetch(url, options);
}

function log(content) {
  slackApi("https://slack.com/api/chat.postMessage", {
    "channel": "UR61XM9GA",
    "text": content
  });
}