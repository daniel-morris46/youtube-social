const Repo = require('./repo.js');

const express = require('express');
const app = express();
app.use(express.json());

const repo = new Repo();

app.get('/api/users', (req, res) => {
    let userId = req.params.userId;
    repo.getUsers()
        .then((users) => res.send(users))
        .catch((err) => res.send(new Error("Error retrieving users: " + err)));
});

app.get('/api/users/:channelId', (req, res) => {
    let channelId = req.params.channelId;
    repo.getUser(channelId)
        .then((users) => {
            if (users.length > 0) {
                res.send(users[0]);
            } else {
                res.status(404);
                res.send();
            }
        })
        .catch((err) => res.send(new Error("Error retrieving users: " + err)));
});

app.post('/api/users', (req, res) => {
    let name = req.body.name;
    let channelId = req.body.channelId;
    repo.addUser(name, channelId)
        .then((users) => res.send(users[0]))
        .catch((err) => res.send(new Error("Error adding user: " + err)));
});

app.get('/api/users/:userId/feed', (req, res) => {
    let userId = req.params.userId;
    repo.getFeed(userId)
        .then((feed) => res.send(feed))
        .catch((err) => res.send(new Error("Error retrieving feed: " + err)));
});

app.post('/api/users/:userId/feed', (req, res) => {
    let videoId = req.body.videoId;
    let userId = req.params.userId;
    repo.postToFeed(videoId, userId)
        .then(() => res.send())
        .catch((err) => res.send(new Error("Error adding post to feed: " + err)));
});

app.get('/api/users/:userId/friends', (req, res, next) => {
    let userId = req.params.userId;
    repo.getFriends(userId)
        .then((friends) => res.send(friends))
        .catch((err) => res.status(500).send("Error retrieving friends: " + err));
});

app.post('/api/users/:userId/friends', (req, res) => {
    let userId = req.params.userId;
    let newFriendUserId = req.body.userId;
    repo.addFriend(userId, newFriendUserId)
        .then(() => res.send())
        .catch((err) => res.status(500).send("Error adding friend: " + err));
});

app.delete('/api/users/:userId/friends/:friendUserId', (req, res) => {
    let userId = req.params.userId;
    let friendUserId = req.params.friendUserId;
    repo.removeFriend(userId, friendUserId)
        .then(() => res.send())
        .catch((err) => res.status(500).send("Error removing friend: " + err));
});

app.listen(3000);
