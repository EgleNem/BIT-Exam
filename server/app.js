const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
const md5 = require("js-md5");
const uuid = require("uuid");
app.use(
express.urlencoded({
extended: true,
})
);
app.use(express.json());

const con = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "library",
});

app.listen(port, () => {
console.log(`Portas nr ${port}`);
});



const doAuth = function (req, res, next) {
    if (0 === req.url.indexOf("/admin")) {
      // admin
      const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
      con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== "admin") {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      });
    } else if (
      0 === req.url.indexOf("/login-check") ||
      0 === req.url.indexOf("/login")
    ) {
      next();
    } else {
      // front
      const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
      con.query(sql, [req.headers["authorization"] || ""], (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      });
    }
  };
  setTimeout(()=> {app.use(doAuth)}, 10000);
  
  // AUTH
  app.get("/login-check", (req, res) => {
    let sql;
    let requests;
    if (req.query.role === "admin") {
      sql = `
        SELECT
        name
        FROM users
        WHERE session = ? AND role = ?
        `;
      requests = [req.headers["authorization"] || "", req.query.role];
    } else {
      sql = `
        SELECT
        name, id
        FROM users
        WHERE session = ?
        `;
      requests = [req.headers["authorization"] || ""];
    }
    con.query(sql, requests, (err, result) => {
      if (err) throw err;
      if (!result.length) {
        res.send({ msg: "error" });
      } else {
        res.send({ msg: "ok", result });
      }
    });
  });
  
  //LOGIN
  app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
        res.send({ msg: "error", key: "" });
      } else {
        res.send({ msg: "ok", key });
      }
    });
  });
  
// ------------------- BACK BOOKS -----------------------

// CREATE books
app.post("/admin/books", (req, res) => {
    const sql = `
    INSERT INTO books
    (title, author, category_id, reservation, photo)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.author, req.body.category, req.body.reservation, req.body.photo], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, new and book was created', type: 'success' } });
    });
});


// READ books
app.get("/admin/books", (req, res) => {
    const sql = `
  SELECT b.id, title, author, c.name AS category, reservation, photo
  FROM books AS b
  LEFT JOIN categories AS c
  ON c.id = b.category_id
  ORDER BY title
`;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// EDIT 

//BACK EDIT book
app.put("/admin/books/:id", (req, res) => {
    const sql = `
    UPDATE books
    SET title = ?, author = ?, category_id = ?, reservation = ?, photo = ?
    WHERE id = ?
    `;
    con.query(
      sql,
      [
        req.body.title,
        req.body.author,
        req.body.category,
        req.body.reservation,
        req.body.photo,
        req.params.id,
      ],
      (err, result) => {
        if (err) throw err;
        res.send({
          result,
          msg: { text: "Your category has been edited!", type: "great" },
        });
      }
    );
  });
  


// DELETE
app.delete("/admin/books/:id", (req, res) => {
    const sql = `
    DELETE FROM books
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send({ result, msg: { text: 'OK, book is gone', type: 'success' } });
    });
});



//--------------ADMIN CATEGORIES---------------

app.post("/admin/categories", (req, res) => {
    const sql = `
      INSERT INTO categories
      (name)
      VALUES (?)
      `;
    con.query(sql, [req.body.name], (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "New category was created", type: "success" },
      });
    });
  });


app.get("/admin/categories", (req, res) => {
    const sql = `
    SELECT *
    FROM categories
    `;
    con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

  app.put("/admin/categories/:id", (req, res) => {
    const sql = `
    UPDATE categories
    SET name = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.name, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Your category has been edited!", type: "info" },
      });
    });
  });

  app.delete("/admin/categories/:id", (req, res) => {
    const sql = `
      DELETE FROM categories
      WHERE id = ?
      `;
    con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "Category was deleted!", type: "danger" },
      });
    });
  });


  //FRONT READ BOOKS
app.get("/books", (req, res) => {    
  let sql;
  let requests;
  console.log(req.query['category-id']);
  if (!req.query['category-id'] && !req.query['s']) {
 sql = `
    SELECT b.id, c.id AS cid, b.title, b.author, c.name AS category, b.reservation, b.photo
    FROM books AS b
    LEFT JOIN categories AS c
    ON c.id = b.category_id
  `;
  requests = [];
} else if (req.query['category-id']) {
  sql = `
  SELECT b.id, c.id AS cid, b.title, b.author, c.name AS category, b.reservation, b.photo
  FROM books AS b
  LEFT JOIN categories AS c
  ON c.id = b.category_id
  WHERE b.category_id = ?
`;
requests = [req.query['category-id']];
     } else {
         sql = `
         SELECT b.id, c.id AS cid, b.title, b.author, c.name AS category, b.reservation, b.photo
         FROM books AS b
         LEFT JOIN categories AS c
         ON c.id = b.category_id
         WHERE b.title LIKE ?
         `;
         requests = ['%' + req.query['s'] + '%'];
     }
         con.query(sql, requests, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });

     // b.rates, b.rate_sums
  
  // app.put("/rates/:id", (req, res) => {
  //   const sql = `
  //   UPDATE books
  //   SET rates = rates + 1, rate_sum = rate_sum + ?
  //   WHERE id = ?
  // `;
  //   con.query(sql, [req.body.rate, req.params.id], (err, result) => {
  //     if (err) throw err;
  //     res.send({ result, msg: { text: "Thank you for voting!", type: "success" } });
  //   });
  // });
  