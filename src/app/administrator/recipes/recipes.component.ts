import { Component } from '@angular/core';
import { AmenuComponent } from '../amenu/amenu.component';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [AmenuComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {

}
