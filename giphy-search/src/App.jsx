import NavBar from "./components/NavBar"
import GifContainer from "./components/GifContainer"
import GifSearch from "./components/GifSearch"
import { useState, useEffect } from "react"
import "./styles/main.css"
import fetchData from "./utils/fetchData"

function App() {
	const [data, setData] = useState([])
	const [error, setError] = useState("")
	const [url, setURL] = useState('/api/gifs')

	useEffect(() => {
		const doFetch = async () => {
			const [data, error] = await fetchData(url)
			console.log(data)
			if (data) setData(data.data)
			if (error) setError(error.message)
		}
		doFetch()
	}, [url])

	const gifs = data.map(gif => (
		<li key={gif.id}>
			<img src={gif.images.original.url} className='gif' />
		</li>
	))

	const handleSubmit = e => {
		e.preventDefault()
		const query = e.target[0].value
		setURL(
			`/api/gifs?search=${query}`
		)
	}

	const handleChange = inputValue => {
		setURL(
			`/api/gifs?search=${inputValue}`
		)
	}

	return (
		<>
			<NavBar color='black' title='Giphy Search' />
			<p>{"[Giphy Search]"}</p>
			<div className='ui container'>
				<GifSearch handleSubmit={handleSubmit} handleChange={handleChange} />
				<br />
				{error && <p>{error.message}</p>}
				<GifContainer gifs={gifs} />
			</div>
		</>
	)
}

export default App
