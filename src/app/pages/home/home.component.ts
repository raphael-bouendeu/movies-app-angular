import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie, MovieDto } from '../../models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  constructor(private moviesService: MoviesService) {
  }
  ngOnInit(): void {
    this.moviesService.getMovies("popular").subscribe(data => {
      console.log(data)
      this.popularMovies = data;
    })
    this.moviesService.getMovies("upcoming").subscribe(data => {
      console.log(data)
      this.upcomingMovies = data;
    })
    this.moviesService.getMovies("top_rated").subscribe(data => {
      console.log(data)
      this.topRatedMovies = data;
    })
  }
}
