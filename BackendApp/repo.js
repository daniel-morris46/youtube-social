const uuidGenerator = require('uuid');
const { Pool } = require('pg');

class Repo {
    getUsersQuery =
        "SELECT id, name, channel_id FROM users";

    addUserQuery =
        " INSERT INTO users (id, name, channel_id) " +
        " VALUES ($1, $2, $3)";

    getUserQuery =
        " SELECT id, name, channel_id FROM users " +
        " WHERE channel_id = $1";

    getFeedQuery =
        " SELECT feed.id, feed.createddate, feed.video_id, feed.user_id, users.name FROM feed " +
        " JOIN users ON feed.user_id = users.id " +
        " WHERE feed.user_id IN (" +
        "    SELECT user_id_2 FROM friends " +
        "        WHERE user_id_1 = $1 " +
        "            AND friends.deleteddate IS NULL " +
        "    ) OR feed.user_id = $1 " +
        " AND feed.deleteddate IS NULL " +
        " ORDER BY feed.createddate DESC";

    postToFeedQuery =
        " INSERT INTO feed (id, createddate, video_id, user_id) " +
        " VALUES ($1, now(), $2, $3)";

    getFriendsQuery =
        " SELECT id, name, channel_id FROM users " +
        " WHERE users.id IN ( " +
        "    SELECT user_id_2 FROM friends " +
        "        WHERE user_id_1 = $1 " +
        "            AND deleteddate IS NULL " +
        "    )";

    addFriendQuery =
        " INSERT INTO friends (user_id_1, user_id_2, createddate) " +
        " VALUES ($1, $2, now()), ($2, $1, now())";

    removeFriendQuery =
        " UPDATE friends SET deleteddate = now() " +
        " WHERE (user_id_1 = $1 AND user_id_2 = $2 AND deleteddate IS NULL) OR " +
        "       (user_id_1 = $2 AND user_id_2 = $1 AND deleteddate IS NULL)";

    db = new Pool({
        user: 'postgres',
        host: 'localhost',
        database: 'youtube_social',
        password: 'admin',
        port: 5432,
    });

    async getUsers() {
        let dbObject = await this.db.query(this.getUsersQuery);
        return dbObject.rows;
    }

    async getUser(channelId) {
        let dbObject = await this.db.query(this.queryWithParams(this.getUserQuery, [channelId]));
        return dbObject.rows;
    }

    async addUser(name, channelId) {
        let userId = this.generateUuid();
        await this.db.query(this.queryWithParams(this.addUserQuery, [userId, name, channelId]));
        return this.getUser(channelId);
    }

    async getFeed(userId) {
        let dbObject = await this.db.query(this.queryWithParams(this.getFeedQuery, [userId]));
        return dbObject.rows;
    }

    async postToFeed(videoId, userId) {
        let feedId = this.generateUuid();
        await this.db.query(this.queryWithParams(this.postToFeedQuery, [feedId, videoId, userId]));
    }

    async getFriends(userId) {
        let dbObject = await this.db.query(this.queryWithParams(this.getFriendsQuery, [userId]));
        return dbObject.rows;
    }

    async addFriend(userId, newFriendUserId) {
        await this.db.query(this.queryWithParams(this.addFriendQuery, [userId, newFriendUserId]));
    }

    async removeFriend(userId, friendUserId) {
        await this.db.query(this.queryWithParams(this.removeFriendQuery, [userId, friendUserId]));
    }

    queryWithParams(query, params) {
        return {
            text: query,
            values: params
        }
    }

    generateUuid() {
        return uuidGenerator.v4();
    }
}

module.exports = Repo;


