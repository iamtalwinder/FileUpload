import express from "express";
import multer from "multer";
import "./dotenv";

const upload = multer({ dest: "./public/" });

const app = express();

app.post("/upload", upload.single("file"), (req, res) => {
	res.send("ok");
});

app.listen(process.env.PORT, () =>
	console.log(`Running on PORT: ${process.env.PORT}`)
);
