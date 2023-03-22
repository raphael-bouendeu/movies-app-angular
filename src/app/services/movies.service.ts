import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieDto, Movie, MovieVideoDto, MovieImages, MovieCredits, GenresDto } from '../models/movie';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '532a35962e4cf4d0e4fa46ebaffb8f53';
  constructor(private http: HttpClient) { }

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res.results.slice(0, count)))
    );
  }

  searchMovies(page: number, searchValue?: string) {
    const uri = searchValue ? '/search/movie' : '/movie/popular'
    return this.http.get<MovieDto>(`${this.baseUrl}${uri}?page=${page}&query=${searchValue}&api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res.results))
    );
  }

  getMovie(id: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}`)
  }

  getMovieVideo(id: string) {
    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${id}/videos?api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res.results))
    );
  }
  getMovieImage(id: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${id}/images?api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res))
    );
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res))
    );
  }

  getMovieGenres() {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res.genres))
    );
  }

  getMoviesByGenre(genreId: string, page: number) {
    return this.http.get<MovieDto>(`${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`).pipe(
      switchMap(res => of(res.results))
    );
  }

}
