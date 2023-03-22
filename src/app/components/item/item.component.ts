import { IMAGES_SIZES } from './../../constants/images-sizes';
import { Component, Input } from '@angular/core';
import { Movie } from '../../models/movie';


@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  imageSizes = IMAGES_SIZES;
  @Input() itemData: Movie | null = null;
}
