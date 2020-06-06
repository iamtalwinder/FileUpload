import React, { Fragment, useState } from "react";
import axios from "axios";

function App() {
	const [files, setFiles] = useState();

	const handleFileChange = (event) => {
		setFiles(event.target.files);
	};

	const upload = async () => {
		const data = new FormData();
		for (let file of files) data.append("file", file);

		try {
			const response = await axios.post("/upload", data, {});
			alert(response.data);
		} catch (err) {
			alert(err.response.data);
		}
	};
	return (
		<Fragment>
			<input type="file" name="file" multiple onChange={handleFileChange} />
			<button onClick={upload}>upload</button>
		</Fragment>
	);
}

export default App;
