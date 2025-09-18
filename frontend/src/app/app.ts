import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ActivitiesListComponent, SignupFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'Citigroup Clubs and Teams';
}
