import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { TruncateStringPipe } from '../pipes/truncate.pipe';

interface Link {
  title: string;
  url: string;
  linkType: string;
  /*
    Twitter
    LinkedIn
    Instagram
    Sessionize
    Blog
    Company_Website
    Facebook
    Other
  */
}

interface Session {
  id: number;
  name: string;
}

interface Speaker {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  bio: string | null;
  tagLine: string | null;
  profilePicture: string | null;
  isTopSpeaker: boolean;
  links: Link[];
  sessions: Session[];
}

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [MatCardModule, FontAwesomeModule, HttpClientModule, CommonModule, LinkTypeToIconPipe, TruncateStringPipe],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.css'
})
export class SpeakersComponent {
  speakers: Speaker[] = [];
  constructor(private http: HttpClient) {
    this.http.get<Speaker[]>("/assets/speakers.json").subscribe(speakers => {
      this.speakers = speakers;
    });
  }
}
