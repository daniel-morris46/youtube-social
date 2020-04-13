export class Profile {
  id: string;
  name: string;
  profileImageUrl: string;

  constructor(id: string, name: string, profileImageUrl: string) {
    this.id = id;
    this.name = name;
    this.profileImageUrl = profileImageUrl;
  }
}
