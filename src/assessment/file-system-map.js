module.exports = (function () {
  const success = true;
  return {
    error(req, res, error) {
      res.status(200).send({ success: false, error });
    },

    get(req, res, data) {
      res.status(200).send({ success, data });
    }
  }
}());
