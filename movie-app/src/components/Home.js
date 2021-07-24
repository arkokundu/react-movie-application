//Container component

import React from 'react';
//API
import API from '../API';

//import from config.js

import {POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL} from '../config';

//import Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';

//import Hook 
import {useHomeFetch} from '../hooks/useHomeFetch';
//import Image
import NoImage from '../images/no_image.jpg';

const Home = () => {
    const {state, loading, error, setSearchTerm} = useHomeFetch();
    
    console.log(state);

    return (
        <>
            {state.results[0] ? (
            <HeroImage
                image = {`${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.results[0].backdrop_path}`}
                title = {state.results[0].original_title}
                text = {state.results[0].overview}
                /> 
            )
            : null
            }
            <SearchBar setSearchTerm={setSearchTerm} />
            <Grid header='Popular Movies'>
                {state.results.map(movie=>(
                    <Thumb 
                    key={movie.id}
                    clickable
                    image={
                        movie.poster_path
                          ? IMAGE_BASE_URL + POSTER_SIZE + movie.poster_path
                          : NoImage
                    }
                    movieId = {movie.Id}
                    />
                ))}
            </Grid>
            <Spinner />
        </>
    );
}

export default Home;