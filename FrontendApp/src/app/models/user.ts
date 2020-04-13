export class User {
  id: string;
  name: string;
  channelId: string;

  constructor(id: string, name: string, channelId: string) {
    this.id = id;
    this.name = name;
    this.channelId = channelId;
  }
}
