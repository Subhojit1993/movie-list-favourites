import React from 'react';
import { MovieCard } from './MovieCard';
const Favourites = "favourites";

export const MovieCardsList = (props) => {
	const { movies, error, handleToggleFav, favourites, handleCardClick, isEmpty, loading } = props;
	const urlArr = window.location.href.split('/');
	let favClass = "";
	if(urlArr[3] && urlArr[3] === Favourites)
		favClass = " movies_favOuter";
	let movieList = (
		<div className="list_loadingText">
			Loading ...
		</div>
	);
	if(movies && movies.length > 0) {
		let filteredMovies = [...movies];
		if(favourites) {
			filteredMovies = movies.filter(movie => {
				return movie.isFavourite === favourites;
			})
		}
		movieList = filteredMovies.map((movie, index) => {
			let movieCards = (
				<MovieCard 
					movie={movie} 
					handleToggleFav={handleToggleFav} 
					handleCardClick={handleCardClick}
					isEmpty={isEmpty}
				/>
			);
			return(
				<div key={movie.imdbID} className="movies_cardOuter">
					{movieCards}
				</div>
			);
		})
	}
	if((movies && movies.length === 0 && !loading) || (urlArr[3] && urlArr[3] === Favourites && !movies))
		movieList = (
			<div className={"list_errorText" + favClass}>
				List is empty!
			</div>
		);
	if((error && error !== null && error !== "") && !urlArr[3])
		movieList = (
			<div className="list_errorText">
				{error}
			</div>
		);
	return(
		<div className="movies_classList_outer">
			<div className={"movies_classList" + favClass}>
				{movieList}
			</div>
		</div>
	);
}