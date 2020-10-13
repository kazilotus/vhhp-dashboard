API endpoints

---

- Set status of a room

```
POST => /api/v1/admin/conferenceRoom
body  =>
    {
    "roomName": "test",
    "currentStatus": "Stream Youtube 1",
    "link":"https://www.youtube.com/watch?v=l3qUvdy1Dh8", //if any
    "textInput":"Nice conference" //if any
}
```

- Get a room info (current status)
```
GET => /api/v1/admin/conferenceRoom/test
res e.g. => {
    "status": "success",
    "data": {
        "room": {
            "_id": "5f846dd174164110d8036184",
            "roomName": "test",
            "currentStatus": "Stream Youtube ",
            "__v": 0,
            "link": "https://www.youtube.com/watch?v=l3qUvdy1Dh8" // if any
        }
    }
}
```