const express = require("express");
const userRoutes = express.Router();
const { prisma } = require("../config/prisma");
const bcrypt = require("bcrypt");

// get all users
userRoutes.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).send(users);
});

// Search users by Id
userRoutes.get("/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (!user)
    res.status(404).json({
      message: "User tidak ditemukan",
    });
  res.status(200).send(user);
});

// create users
userRoutes.post("/", async (req, res) => {
  const { user_username, user_email, user_name, user_password } = req.body;

  const salt = await bcrypt.genSalt(10);

  const hashUserPassword = await bcrypt.hash(user_password, salt);

  const new_user = await prisma.user.create({
    data: {
      user_username: user_username,
      user_email: user_email,
      user_name: user_name,
      user_password: hashUserPassword,
    },
  });

  res.status(200).json({
    data: new_user,
    message: `Users has been created`,
  });
});

// edit users
userRoutes.put("/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const { user_username, user_email, user_name, user_password } = req.body;

  let hashUserPassword;
  if (user_password) {
    const salt = await bcrypt.genSalt(10);
    hashUserPassword = await bcrypt.hash(user_password, salt);
  }

  const edit_user = await prisma.user.update({
    where: {
      user_id: parseInt(user_id),
    },
    data: {
      user_username: user_username ? user_username : undefined,
      user_email: user_email ? user_email : undefined,
      user_name: user_name ? user_name : undefined,
      user_password: hashUserPassword,
    },
  });

  res.status(200).json({
    data: edit_user,
    message: `User dengan id: ${user_id} telah diupdate`,
  });
});

// delete users
userRoutes.delete("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  await prisma.user.delete({
    where: {
      user_id: parseInt(user_id),
    },
  });

  res.status(200).json({
    message: `User dengan id: ${user_id} berhasil di hapus`,
  });
});

module.exports = { userRoutes };
