import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { LoadDataServices, Speaker } from '../load-data.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [
    MatCardModule,
    FontAwesomeModule,
    CommonModule,
    LinkTypeToIconPipe,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.css',
})
export class SpeakersComponent {
  speakers: Speaker[] = [];
  constructor(private service: LoadDataServices) {
    this.speakers = this.service.speakers;
  }
}
