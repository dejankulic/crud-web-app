const express = require("express");
const Joi = require("joi");
const mysql = require("mysql");

const pool = mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "",
    database: "skripte",
});

const komentari = express.Router();

const sema = Joi.object().keys({
    ime: Joi.string().trim().min(4).max(30).required(),
    komentar: Joi.string().max(500).required(),
    ocena: Joi.number().integer().min(1).max(5),
});

komentari.use(express.json());

komentari.get("/komentari", (req, res) => {
    pool.query("select * from komentari", (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else res.send(rows);
    });
});

komentari.post("/komentari", (req, res) => {
    let { error } = sema.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query =
            "insert into komentari (ime, komentar, ocena) values (?, ?, ?)";
        let formated = mysql.format(query, [
            req.body.ime,
            req.body.komentar,
            req.body.ocena,
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from komentari where id=?";
                formated = mysql.format(query, [response.insertId]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

komentari.put("/komentari/:id", (req, res) => {
    let { error } = sema.validate(req.body);

    if (error) res.status(400).send(error.details[0].message);
    else {
        let query =
            "update komentari set ime=?, komentar=?, ocena=? where id=?";
        let formated = mysql.format(query, [
            req.body.ime,
            req.body.komentar,
            req.body.ocena,
            req.params.id,
        ]);

        pool.query(formated, (err, response) => {
            if (err) res.status(500).send(err.sqlMessage);
            else {
                query = "select * from komentari where id=?";
                formated = mysql.format(query, [req.params.id]);

                pool.query(formated, (err, rows) => {
                    if (err) res.status(500).send(err.sqlMessage);
                    else res.send(rows[0]);
                });
            }
        });
    }
});

komentari.delete("/komentari/:id", (req, res) => {
    let query = "select * from komentari where id=?";
    let formated = mysql.format(query, [req.params.id]);

    pool.query(formated, (err, rows) => {
        if (err) res.status(500).send(err.sqlMessage);
        else {
            let komentar = rows[0];

            let query = "delete from komentari where id=?";
            let formated = mysql.format(query, [req.params.id]);

            pool.query(formated, (err, rows) => {
                if (err) res.status(500).send(err.sqlMessage);
                else res.send(komentar);
            });
        }
    });
});

module.exports = komentari;
