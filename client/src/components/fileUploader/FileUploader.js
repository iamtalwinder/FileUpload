import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "../progressBar/ProgressBar";
import "./FileUploader.css";

export default function FileUploader() {
	const [file, setFile] = useState({
		name: "Choose a file",
	});

	const [progress, setProgress] = useState(0);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
		console.log(file);
	};

	const handleBrowse = () => {
		document.getElementById("inputFile").click();
	};

	const upload = async () => {
		const data = new FormData();
		data.append("file", file);

		try {
			const response = await axios.post("/upload", data, {
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: (progressEvent) => {
					setProgress(
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
					);
				},
			});
			alert(response.data);
		} catch (err) {
			alert(err.response.data);
		}
	};
	return (
		<div className="container">
			<input
				id="inputFile"
				type="file"
				name="file"
				onChange={handleFileChange}
			/>
			<div className="fileName">{file.name}</div>
			<button className="browse" onClick={handleBrowse}>
				Browse
			</button>
			<button className="upload" onClick={upload}>
				Upload
			</button>
			<ProgressBar progress={progress} />
		</div>
	);
}
