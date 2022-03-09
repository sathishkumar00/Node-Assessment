const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const jwtVerification = require('./middleware/index.js');
const fileSystem = require('./src/assessment/file-system-controller.js');
const razorpay = require('./src/assessment/razorpay-controller.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// 3.File Upload using Multer
app.post('/upload', upload.single('file'), fileSystem.addFile);

app.get('/api/get-users', jwtVerification.jwtVerification, fileSystem.getUsers);

// 1. File systems (Read,Write)
app.get('/api/read-file', jwtVerification.jwtVerification, fileSystem.readFile);

app.get('/api/get-token', fileSystem.getToken);

app.post('/api/write-file', jwtVerification.jwtVerification, fileSystem.writeFile);

app.post('/api/razorpay', razorpay.payment);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Application listening on ${PORT}`);
});
