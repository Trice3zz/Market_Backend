import express from "express";
import { createUser, getUser, getUsers, deleteUsers, updateUser } 

const router = express.Router();

router.route("/").get(async (req, res) => {
    const movies = await getUsers();
    res.send(users);
})

