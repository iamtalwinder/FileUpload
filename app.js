import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import "./dotenv";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "./uploads/");
	},
	filename: function (req, file, cb) {
		const fileName = file.originalname.split(" ").join("-");
		cb(null, uuidv4() + "-" + fileName);
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png|gif/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase()
		);
		const mimetype = filetypes.test(file.mimetype);
		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb(null, false);
			cb({ message: "jpeg or jpg or png or gif only" });
		}
	},
}).single("file");

const app = express();

app.post("/upload", (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (req.file === undefined) {
			res.status(500).send("Select a file");
		} else {
			res.status(200).send("uploaded");
		}
	});
});

app.listen(process.env.PORT, () =>
	console.log(`Running on PORT: ${process.env.PORT}`)
);
