import request from "request";
import _ from "lodash";
import { paystack } from "../utils/paystack.js";

const { initializePayment, verifyPayment } = paystack(request);

export const paystack_init_payment = (req, res) => {
  const form = _.pick(req.body, ["amount", "email", "fullName"]);
  // const form = {
  //   fullName: "Pius Henry",
  //   email: "oemuraye@gmail.com",
  //   amount: 10000,
  // };

  form.metadata = {
    fullName: form.fullName,
  };
  form.amount *= 100;

  initializePayment(form, (error, body) => {
    if (error) {
      return res.redirect("error");
    } 
    const response = JSON.parse(body);

    if (response.status === false) {
      return res.status(400).redirect("error");
    } else {
      return res.status(200).redirect(response.data.authorization_url);
    }
  });
};

export const paystack_verify_payment = (req, res) => {
  const ref = 'ntqv86klod';
  // const ref = req.query.reference;

  verifyPayment(ref, (error, body) => {
    if (error) {
      return res.redirect("error");
    }
    const response = JSON.parse(body);

    const data = _.at(response.data, [
      "reference",
      "amount",
      "customer.email",
      "metadata.fullName",
    ]);

    console.log(response);
    res.send({payment_status: true});

    // const [reference, amount, email, fullName] = data;

    // const donor = new Donor({ reference, amount, email, fullName });

    // donor
    //   .save()
    //   .then((donor) => {
    //     if (!donor) {
    //       return res.redirect("error");
    //     }
    //     res.redirect("/receipt/" + donor._id);
    //   })
    //   .catch((e) => {
    //     res.redirect("error");
    //   });
  });
};

export const get_payment_receipt = (req, res) => {
  const id = req.params.id;

  Donor.findById(id)
    .then((donor) => {
      if (!donor) {
        res.redirect("error");
      }
      res.render("success", { donor });
    })
    .catch((e) => {
      res.redirect("error");
    });
};

export const paymentRequest = (req, res) => {};
