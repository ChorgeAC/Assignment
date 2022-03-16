const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const { handleError, verifyAuth } = require("../utils");
const { users } = require("../db");

router.get("/members", verifyAuth, (req, res) => {
  console.log(`GET request received to "/user/members"`);

  return res.status(200).json(req.user.members);
});

router.post("/members", verifyAuth, (req, res) => {
  console.log(`POST request received to "/user/members"`);

  req.user.members.push({
    id: nanoid(),
    name: req.body.name,
    compony: req.body.compony,
    status: req.body.status,
    note: req.body.note,
    date: req.body.date,
  });
  users.update(
    { _id: req.user._id },
    {
      $set: { members: req.user.members },
    },
    {},
    (err) => {
      if (err) {
        handleError(res, err);
      }

      console.log(`compony added to members list`);
      return res.status(200).json(req.user.members);
    }
  );
});

router.delete("/addresses/:id", verifyAuth, async (req, res) => {
  console.log(`DELETE request received to "/cart/addresses"`);

  const index = await req.user.addresses.findIndex(
    (element) => element._id === req.params.id
  );
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Address to delete was not found",
    });
  }
  req.user.addresses.splice(index, 1);
  users.update(
    { _id: req.user._id },
    { $set: { addresses: req.user.addresses } },
    {},
    (err) => {
      if (err) {
        handleError(res, err);
      }

      console.log(
        `Address with id ${req.user._id} deleteed from user ${req.user.username}'s address list`
      );

      return res.status(200).json(req.user.addresses);
    }
  );
});

module.exports = router;
