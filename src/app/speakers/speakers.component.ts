import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { TruncateStringPipe } from '../pipes/truncate.pipe';
import { LoadSpeakersService, Speaker } from '../load-speakers.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [MatCardModule, FontAwesomeModule, CommonModule, LinkTypeToIconPipe, TruncateStringPipe, RouterModule],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.css'
})
export class SpeakersComponent {
  speakers: Speaker[] = [];
  constructor(private service: LoadSpeakersService) {
    this.speakers = this.service.speakers;
  }
}