
const paystack = (request) => {
    const headers = {
      authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      "content-type": "application/json",
      "cache-control": "no-cache",
    };

    const initializePayment = (form, mycallback) => {
      const options = {
        url: `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
        headers,
        form,
      };
      const callback = (error, response, body) => {
        return mycallback(error, body);
      };
      request.post(options, callback);
    };

    const verifyPayment = (ref, mycallback) => {
      const options = {
        url: `${
          process.env.PAYSTACK_BASE_URL
        }/transaction/verify/${encodeURIComponent(ref)}`,
        headers,
      };
      const callback = (error, response, body) => {
        return mycallback(error, body);
      };
      request(options, callback);
    };

    return { initializePayment, verifyPayment };
}

export const paystack_init_payment = (req, res) => {
    const { initializePayment } = paystack();
    // const form = _.pick(req.body, ["amount", "email", "fullName"]);
    const form = {
        fullName: "Pius Henry",
        email: "oemuraye@gmail.com",
        amount: 10000
    }

    form.metadata = {
      fullName: form.fullName,
    };
    form.amount *= 100;

    initializePayment(form, (error, body) => {
      if (error) {
        return res.redirect("error");
      }
      const response = JSON.parse(body);
      res.redirect(response.data.authorization_url);
    });
}

export const paystack_verify_payment = (req, res) => {
    const { verifyPayment } = paystack();
    const ref = req.query.reference;

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
        
        const [reference, amount, email, fullName] = data;
        const donor = new Donor({ reference, amount, email, fullName });

        donor
          .save()
          .then((donor) => {
            if (!donor) {
              return res.redirect("error");
            }
            res.redirect("/receipt/" + donor._id);
          })
          .catch((e) => {
            res.redirect("error");
          });
        
    })
}

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
}

export const paymentRequest = (req, res) => {
    
}