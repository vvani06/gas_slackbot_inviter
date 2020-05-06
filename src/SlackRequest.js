class SlackRequest {
  constructor(eventOnRequest) {
    try {
      const parameters = JSON.parse(eventOnRequest.postData.getDataAsString());
      this.token = parameters.token;
      this.hasEvent = false;
      this.type = parameters.type;

      if (parameters.type === "url_verification") {
        this.parameters = parameters;
        return;
      }

      if (parameters.event) {
        const event = parameters.event;
        this.hasEvent = true;
        this.type = event.type;
        this.parameters = event;
        this.user = event.user.id;
        return;
      }
    }
    catch(error) {
      // not API request
      const parameters = eventOnRequest.parameter;
      if (parameters.payload) {
        const payload = JSON.parse(parameters.payload);
        if (payload.type === "interactive_message") {
          this.parameters = payload;
          this.type = payload.type;
          this.actionType = payload.callback_id;
          this.user = payload.user.id;
          this.actions = {};
          for(let action of payload.actions) {
            this.actions[action.value] = action.name;
          }
          return;
        }
      }

      this.type = "slash_command";
      this.parameters = eventOnRequest.parameter;
      this.user = eventOnRequest.parameter.user_id;
    }
  }
}
