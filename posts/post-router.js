const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // get a list of posts from the database
  // SELECT * FROM posts
  db.select("*")
    .from("posts")
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((error) => {
      handleError(error, res);
    });
  //return the list of posts
});

router.get("/:id", (req, res) => {
  // select * from posts where id=id
  const { id } = req.params;

  db.select("*")
    .from("posts")
    .where("id", "=", id)
    .first() //same as grabbing the first element from the array manually with post[0]
    .then((posts) => {
      res.status(200).json({ data: posts });
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.post("/", (req, res) => {
  const postData = req.body;

  //validate the data

  db("posts")
    .insert(postData)
    .returning("id")
    .then((ids) => {
      //if your doing 1 id at a time it will be last record
      db("posts")
        .where({ id: ids[0] })
        .first()
        .then((post) => {
          res.status(200).json({ data: post });
        });
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("posts")
    .where({ id })
    .update(changes) //dont forget to have a where
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "there was no record to update" });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("posts")
    .where({ id })
    .del() //dont forget to have a where
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ data: count });
      } else {
        res.status(404).json({ message: "there was no record to delete" });
      }
    })
    .catch((error) => {
      handleError(error, res);
    });
});

function handleError(error, res) {
  console.log("error", error);
  res.status(500).json({ message: error.message });
}

module.exports = router;
