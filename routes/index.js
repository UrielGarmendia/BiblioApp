const { Router } = require("express");
const fs = require("fs");
const { uuid } = require("uuidv4");
const router = Router();
const jsonBooks = fs.readFileSync("src/books.json", "utf-8");
let books = JSON.parse(jsonBooks);

router.get("/", (req, res) => {
  res.render("index.ejs", {
    books,
  });
});

router.get("/new-entry", (req, res) => {
  res.render("new-entry");
});

router.post("/new-entry", (req, res) => {
  const { title, author, image, description } = req.body;
  if (!title || !author || !image || !description) {
    res.status(400).send("Completa todos los campos");
    return;
  }

  let newBook = {
    id: uuid(),
    title,
    author,
    image,
    description,
  };

  books.push(newBook);

  const jsonBooks = JSON.stringify(books);
  fs.writeFileSync("src/books.json", jsonBooks, "utf-8");

  res.redirect("/");
});

router.get("/delete/:id", (req, res) => {
  books = books.filter((book) => book.id != req.params.id);
  const jsonBooks = JSON.stringify(books);
  fs.writeFileSync("src/books.json", jsonBooks, "utf-8");
  res.redirect('/')
});

module.exports = router;
