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

router.delete("/members/:id", verifyAuth, async (req, res) => {
  console.log(`DELETE request received to "/user/members"`);

  const index = await req.user.members.findIndex(
    (element) => element.id === req.params.id
  );
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Address to delete was not found",
    });
  }
  req.user.members.splice(index, 1);
  users.update(
    { _id: req.user._id },
    { $set: { members: req.user.members } },
    {},
    (err) => {
      if (err) {
        handleError(res, err);
      }

      console.log(`member deleted..`);

      return res.status(200).json(req.user.members);
    }
  );
});

module.exports = router;
