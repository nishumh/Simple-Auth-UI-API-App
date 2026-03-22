import { Component } from '@angular/core';
import { AuthEffects } from '../auth/state/auth.effect';

@Component({
  selector: 'app-home',
  imports: [],
  providers: [AuthEffects],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent {

}
