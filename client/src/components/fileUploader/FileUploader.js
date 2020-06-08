import React, { useState, Fragment } from "react";
import axios from "axios";
import "./FileUploader.css";

export default function FileUploader() {
	const [file, setFile] = useState();

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const upload = async () => {
		const data = new FormData();
		data.append("file", file);

		try {
			const response = await axios.post("/upload", data, {});
			alert(response.data);
		} catch (err) {
			alert(err.response.data);
		}
	};
	return (
		<Fragment>
			<input type="file" name="file" onChange={handleFileChange} />
			<button onClick={upload}>upload</button>
		</Fragment>
	);
}
