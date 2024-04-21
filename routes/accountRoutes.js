const express = require("express");
const accountRoutes = express.Router();
const { prisma } = require("../config/prisma");
const { parse } = require("dotenv");

//get all Account
accountRoutes.get("/", async (req, res) => {
  const account = await prisma.account.findMany();
  res.status(200).send(account);
});

//create Account
accountRoutes.post("/", async (req, res) => {
  const { account_idAccount, account_server, addedBy } = req.body;

  try {
    const existingAccount = await prisma.account.findFirst({
      where: {
        account_idAccount: parseInt(account_idAccount),
        addedBy: parseInt(addedBy),
      },
    });

    if (existingAccount) {
      res.status(400).json({
        message: "Account dengan ID tersebut sudah ada untuk pengguna ini",
      });
      return;
    }

    const addAccount = await prisma.account.create({
      data: {
        account_idAccount: parseInt(account_idAccount),
        account_server: parseInt(account_server),
        addedBy: parseInt(addedBy),
      },
    });

    res.status(200).json({
      message: "Account telah ditambahkan",
      data: addAccount,
    });
  } catch (error) {
    if (
      error.code === "P2002" &&
      error.meta.target.includes("account_idAccount")
    ) {
      res.status(400).json({
        message: "Account dengan ID tersebut sudah ada",
      });
    } else {
      res.status(500).json({
        message: "Terjadi kesalahan saat menambahkan akun",
        error: error.message,
      });
    }
  }
});

accountRoutes.delete("/:account_id", async (req, res) => {
  const { account_id } = req.params;

  try {
    await prisma.account.delete({
      where: {
        account_id: parseInt(account_id),
      },
    });

    res.status(200).json({
      message: `Account dengan id: ${account_id} berhasil di hapus`,
    });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(400).json({
        message: "Account dengan ID tersebut tidak ada",
      });
    } else {
      res.status(500).json({
        message: "Terjadi kesalahan saat menghapus account",
        error: error.message,
      });
    }
  }
});

module.exports = { accountRoutes };
