import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { Movie, MovieImages, MovieVideo, MovieCredits } from '../../models/movie';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { first } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  imageSizes = IMAGES_SIZES;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {

  }

  ngOnInit(): void {
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    })
  }
  getMovieVideos(id: string) {
    this.moviesService.getMovieVideo(id).subscribe(data => {
      console.log(data)
      this.movieVideos = data;
    })


  }

  getMovie(id: string) {
    this.moviesService.getMovie(id).subscribe(data => {
      console.log(data)
      this.movie = data;
    })
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImage(id).subscribe(data => {
      console.log(data)
      this.movieImages = data;
    })
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe(data => {
      console.log(data)
      this.movieCredits = data;
    })
  }

  ngOnDestroy(): void {

  }

}
