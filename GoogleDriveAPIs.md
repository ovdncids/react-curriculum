# Google Drive APIs
https://developers.google.com/drive/api/v3/about-sdk

## Node.js
### 설치
```js
npm init
```

### ENABLE THE DRIVE API
https://developers.google.com/drive/api/v3/quickstart/nodejs

프로젝트 생성 후 여기 설명을 따라 한다.

### 파일 CRUD
index.js
```js
// 애플리케이션 권한에 맞게 설정 하자.
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/drive.apps.readonly'
];

function createFile(auth) {
  drive.files.create({
    resource: {
      name: 'a.txt'
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hello World'
    }
  }, function (err, file) {
    if (err) {
      console.error(err);
    } else {
      console.log('File Id:', file.data.id);
    }
  });
}

function updateFile(auth) {
  drive.files.update({
    fileId: '1Agdf08QDEJLSo-Zj2Y3DLPAJqWLGkP-2',
    resource: {
      name: 'a.txt'
    },
    media: {
      mimeType: 'text/plain',
      body: 'Hi! World'
    }
  }, function (err, file) {
    if (err) {
      console.error(err);
    } else {
      console.log('File Id:', file.data.id);
    }
  });

function deleteFile(auth) {
  drive.files.delete({
    fileId: 'fileId'
  }, function (err, file) {
    if (err) {
      console.error(err);
    } else {
      console.log('File Id:', file.data);
    }
  });
}

```
