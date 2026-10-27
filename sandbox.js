// const express = require('express');
// const app = express();
// const port = 3000;
// const pool = require("./db");

// app.use(express.urlencoded({extended: true}))
// app.use(express.json()); // parse JSON bodies   ​

// app.get('/' , (req, res) => {
//   res.send('Hello World2!' );
// });

// // function definition examples
// function myFunction() {
//     console.log("Hello from my function");
// }
// const myFunction2 = (req, res) => {
//     console.log("Hello from my function 2");
// }

// app.get('/loans', async (req, res) => {
//     try {
//         const result = await pool.query('SELECT * FROM "one-to-many".loans' );
//         console.log(result.rows);
//         res.status(200).json(result.rows);
//     } catch(error) {
//         res.status(500).send({message: "Error connecting to database"});
//     }
// })

app.post("/loans", async (req, res) => {
  console.log(req.body);
  const { name, fk_members } = req.body;

  const result = await pool.query(
    `INSERT INTO "one-to-many".loans (name, fk_members)
VALUES ($1, $2)
RETURNING id, name, fk_members`,
    [name, fk_members],
  );

  // result.rows[0]

  res.status(201).send({ status: "ok" }); // answers the client
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// app.put('/loans/:id', async (req, res) => {
//     try {
//         const { name, fk_members } = req.body;
//         const upd = await pool.query(
//             `UPDATE "one-to-many".loans SET name = $1, fk_members = $2
//              WHERE id = $3
//              RETURNING id, name, fk_members`,
//             [name, fk_members, req.params.id]
//         );

//         if (upd.rowCount === 0) {
//             return res.status(404).send({ message: "Loan not found" });
//         }

//         res.status(200).send(upd.rows[0]);
//     } catch (error) {
//         res.status(500).send({ message: "Error connecting to database" });
//     }
// });

// app.delete('/loans/:id', async (req, res) => {
//     try {
//         const del = await pool.query(
//             'DELETE FROM "one-to-many".loans WHERE id = $1',
//             [req.params.id]
//         );

//         if (del.rowCount === 0) {
//             return res.status(404).send({ message: "Loan not found" });
//         }

//         res.status(204).send({ status: 'ok' });
//     } catch (error) {
//         res.status(500).send({ message: "Error connecting to database" });
//     }

// });

app.get("/houses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM teachers");
    console.log(result.rows);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
});

app.get("/houses/:id", async (req, res) => {
  try {
    // const id = req.params.id; //kan man også gøre og så erstatte [req.params.id] under med [id]

    const result = await pool.query("SELECT * FROM teachers Where id = $1", [
      req.params.id,
    ]);

    if (result.rowCount === 0) return res.sendStatus(404);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Database error", code: error.code });
  }
});

app.put("/teachers/:id", async (req, res) => {
  try {
    const { name, house } = req.body;

    const upd = await pool.query(
      `UPDATE teachers SET name = $1, house = $2
             WHERE id = $3
             RETURNING id, name, house`,
      [name, house, req.params.id],
    );

    if (upd.rowCount === 0) {
      return res.status(404).send({ error: "Teacher not found" });
    }

    res.status(200).send(upd.rows[0]);
  } catch (error) {
    res.status(500).send({ error: "Error connecting to database" });
  }
});

//PUT teachers/:id

//find id fra routen (request)
//Hvis den ikke findes i databasen - returner 404
//Ellers:
// find vores body-teacher
//ændr name og house i database-teacheren til samme som body-teacheren
//* gem database-teacheren i databasen  *
// lav  database-teacheren om til json
//returner den med en 200
