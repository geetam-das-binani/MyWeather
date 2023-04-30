import React, { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
	const [data, setData] = useState({});
	const [location, setLocation] = useState("");
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=79487e10b9a362eec78787a28e30f6e5`;
	// Fetching Data from url with axios 
	const getdata = ({ key }) => {
		if (key === "Enter") {
			axios.get(url).then((response) => {
				setData(response.data);
				setLocation("");
			});
		}
	};
	
	const converToUpperCase = (word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	};

	return (
		<div className="app">
			<div className="search">
				<input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Enter Location"
					onKeyUp={getdata}
				/>
			</div>
			<div className="container">
				<div className="top">
					<div className="location">
						{data.name ? <p>{data.name}</p> : null}
					</div>
					<div className="temp">
						{data.main ? <h1>{Math.ceil(data.main.temp)}&#176;F</h1> : null}
					</div>
					<div className="description">
						{data.weather ? (
							<p>{converToUpperCase(data.weather[0].description)}</p>
						) : null}
					</div>
				</div>
				{data.visibility !== undefined && (
					<div className="bottom">
						<div className="feels">
							{data.main ? (
								<p>{Math.ceil(data.main.feels_like)}&#176;F</p>
							) : null}
							<p className="bold">Feels Like</p>
						</div>
						<div className="humidity">
							{data.main ? <p>{data.main.humidity}&#8453;</p> : null}
							<p className="bold">Humidity</p>
						</div>
						<div className="wind">
							{data.wind ? <p>{Math.floor(data.wind.speed)}MPH</p> : null}
							<p className="bold">Winds</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
