export class Post {
  id: string;
  createdDate: Date;
  videoId: string;
  userId: string;
  userName: string;

  constructor(id: string, createdDate: Date, videoId: string, userId: string, userName: string) {
    this.id = id;
    this.createdDate = createdDate;
    this.videoId = videoId;
    this.userId = userId;
    this.userName = userName;
  }
}
