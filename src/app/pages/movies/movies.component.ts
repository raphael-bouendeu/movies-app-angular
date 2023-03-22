import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  searchValue: string | null = null;
  movies: Movie[] = [];
  genreId: string | null = null;
  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1)
      }
      else {
        this.getPageMovies(1);
      }
    })

  }
  getMoviesByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesByGenre(genreId, page).subscribe(movies => {
      this.movies = movies
    })
  }

  paginate($event: any) {
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, $event.page + 1);
    } else {
      if (this.searchValue) {
        this.getPageMovies($event.page + 1, this.searchValue)
      } else {
        this.getPageMovies($event.page + 1)
      }

    }

  }

  getPageMovies(page: number, searchKeyword?: string) {
    this.moviesService.searchMovies(page, searchKeyword).subscribe(movies => {
      this.movies = movies;
    })
  }

  searchChanged() {
    if (this.searchValue) {
      this.getPageMovies(1, this.searchValue);
    }

  }
}
