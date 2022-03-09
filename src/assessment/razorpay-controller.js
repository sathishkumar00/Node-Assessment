const Razorpay = require("razorpay");

var razorpay = new Razorpay({
  key_id: 'rzp_test_FoWAh33L5IrE7T',
  key_secret: 'loxDlmuJxfYCk9dtfp6edwJh',
});

// 6.Simple RazorPay Integration
// 5.Implement Nodejs source code using async await keyword

module.exports = {
  async payment(req, res) {
    const payment_capture = 1;
    const amount = 500;
    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: 'test',
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).send({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      res.status(200).send({ success: false, err });
    }
  }
};
