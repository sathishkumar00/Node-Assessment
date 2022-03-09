const fs = require('fs');
const loadsh = require('lodash');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { get } = loadsh;
const map = require('./file-system-map.js');

const SECRET_KEY = 'MY_SECRET_KEY';

module.exports = {
  // 1.ReadFile
  readFile(req, res) {
    const { query: { fileName } } = req;
    const path = fileName ? fileName : 'locationByReview.txt';
    try {
      const data = fs.readFileSync(`./${path}`, { encoding: 'utf8' });
      map.get(req, res, data);
    } catch (error) {
      map.error(req, res, error);
    };
  },
  //1.writefile
  writeFile(req, res) {
    const { query: { fileName } } = req;
    try {
      const data = fileName ? fs.readFileSync(`./${fileName}`, { encoding: 'utf8' }) : get(req, 'body.fileData', '');
      fs.writeFileSync("./testDemo.txt", data);
      map.get(req, res, 'Data Written Successfully');
    } catch (error) {
      map.error(req, res, error);
    };
  },

  addFile(req, res) {
    try {
      const { file } = req;
      map.get(req, res, file);
    } catch (error) {
      map.error(req, res, error);
    }
  },

  // 5.Implement Nodejs source code using async await keyword
  async getUsers(req, res) {
    try {
      const response = await axios.get('https://gorest.co.in/public/v2/users');
      map.get(req, res, get(response, 'data'));
    } catch (error) {
      map.error(req, res, error);
    }
  },
  // 2.JWT implementation
  getToken(req, res) {
    try {
      const payload = { 'user': 'Tester' };
      const accessToken = jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' });
      map.get(req, res, accessToken);
    } catch (error) {
      map.error(req, res, error);
    }
  }
};