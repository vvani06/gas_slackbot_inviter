function getChannelsFromSpreadsheet() {
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet();

  return spreadSheet
    .getRangeByName("channels")
    .getValues().map(c => ({ name: c[0], id: c[1] }))
    .filter(c => c.name);
}

const slackApi = new SlackAPI(PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN'));

function doPost(e) {
  const request = new SlackRequest(e);
  // slackApi.log(request.parameters);
  
  if (request.type === "url_verification") {
    return slackApi.createTextResponse(request.parameters.challenge);
  }
  
  if (request.type === "slash_command") {
    return respondChannels();
  }

  if (request.type === "interactive_message" && request.actionType === "request_invitation") {
    slackApi.invite([request.user], request.actions["channel"]);
    return slackApi.createTextResponse("招待しておいたよ");
  }
}

function respondChannels() {
  const response = {
    text: "やあ。闇Botだよ。招待してほしい闇チャネルのボタンを押してみたまえ。",
    reponse_type: "ephemeral",
    attachments: [
      {
        title: "闇のチャンネルたち",
        text: "闇チャンネルリスト",
        fallback: "非対応機種だわ",
        callback_id: "request_invitation",
        color: "#ff00000",
        attachment_type: "default",
        actions: getChannelsFromSpreadsheet().map(c => ({
          name: c.id,
          text: c.name,
          type: "button",
          value: "channel"
        }))
      }
    ]
  };
  
  return slackApi.createJsonResponse(response);
}