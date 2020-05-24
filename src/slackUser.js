class slackUser {
  constructor(slackUserApiResponse) {
    this.identifier = slackUserApiResponse.id;
    this.isDeleted = slackUserApiResponse.deleted;

    const profile = slackUserApiResponse.profile;
    this.name = profile.real_name;
    this.email = profile.email;
  }
}