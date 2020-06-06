import React, { Fragment, useState } from "react";
import axios from "axios";

function App() {
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
			console.log(err);
			alert("Error");
		}
	};
	return (
		<Fragment>
			<input type="file" onChange={handleFileChange} />
			<button onClick={upload}>upload</button>
		</Fragment>
	);
}

export default App;
