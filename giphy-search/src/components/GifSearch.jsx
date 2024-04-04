import { useState } from "react"

function GifSearch({ handleSubmit, handleChange }) {
	const [inputValue, setInputValue] = useState("")

	const onChange = e => {
		setInputValue(e.target.value)
		handleChange(inputValue)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='textInput'>Search:</label>
			<input
				type='text'
				id='textInput'
				value={inputValue}
				onChange={onChange}
			/>
			<button type='submit' id="submit">Submit</button>
		</form>
	)
}

export default GifSearch
