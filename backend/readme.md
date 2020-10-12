API endpoints

---

- Set status of a room

```
POST => /api/v1/admin/conferenceRoom
body  => {
    {
    "roomName": "test",
    "currentStatus": "Stream Youtube 1",
    "link":"https://www.youtube.com/watch?v=l3qUvdy1Dh8" // If any
}
}
```
