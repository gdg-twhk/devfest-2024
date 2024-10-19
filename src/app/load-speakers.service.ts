import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

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

export interface Speaker {
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

@Injectable({
  providedIn: 'root'
})
export class LoadSpeakersService {
  public speakers: Speaker[] = [];
  public speakersMap: Map<string, Speaker> = new Map();
  constructor(private http: HttpClient) {}
  async load(): Promise<Speaker[]> {
    let speakers = this.http.get<Speaker[]>("./assets/speakers.json");
    this.speakers = await lastValueFrom(speakers);
    for(let i = 0; i < this.speakers.length; i++) {
      this.speakersMap.set(this.speakers[i].id, this.speakers[i]);
    }
    return this.speakers;
  }
}
