# File Upload

## React
App.js
```js
import axios from "axios";

function App() {
  const fileUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', event.target[0].files[0]);
    axios.post('http://localhost:3100/api/v1/files', formData);
  };
  return (
    <form onSubmit={event => fileUpdate(event)}>
      <input type="file" />
      <button>File Update</button>
    </form>
  );
}
```

## Express
index.js
```js
// fileUpload
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.use('/api/v1/files', require('./routes/files.js'));
```

routes/files.js
```js
const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/', function(request, response) {
  const uploadFile = request.files.file;
  uploadFile.mv(`./files/${uploadFile.name}`, function (error) {
    if (error) {
      return response.status(500).send(error);
    } else {
      const fileRead = fs.readFileSync(`./files/${uploadFile.name}`, 'utf8');
      response.status(200).send({
        result: 'Uploaded',
        fileRead
      });
    }
  });
});

module.exports = router;
```
* ❕ `error`가 발생한다면 `/files` 폴더가 생성 되었는지 확인
