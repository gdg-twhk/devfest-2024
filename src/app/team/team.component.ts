import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';

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

    Github
  */
}

interface TeamMember {
  name: string;
  bio: string;
  profilePicture: string | null;
  links: Link[];
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [MatCardModule, FontAwesomeModule, CommonModule, LinkTypeToIconPipe],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
})
export class TeamComponent {
  members: TeamMember[] = [
    {
      name: 'name',
      bio: 'bio',
      profilePicture: null,
      links: [],
    },
  ];
}
