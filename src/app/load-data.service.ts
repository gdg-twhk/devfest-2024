import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface SessionIDAndTitle {
  id: string;
  title: string;
}

export interface Speaker {
  bio: string;
  name: string;
  order: number;
  photo: string;
  shortBio: string;
  title: string;
  socials: {
    // the type of social in sessionize 2023
    // Twitter
    // LinkedIn
    // Instagram
    // Sessionize
    // Blog
    // Company_Website
    // Facebook
    // Other
    name: string;
    link: string;
  }[];
  generatedID: string;
  generatedSessions: SessionIDAndTitle[];
}

export interface Schedule {
  date: string; // 2018-11-17
  timeslots: {
    startTime: string;
    // endTime: string;
    sessions: ({
      items: string[];
    } | null)[];
    generatedSessions: Session[];
  }[];
  tracks: {
    title: string;
  }[];
}

export interface Session {
  complexity: string;
  description: string;
  language: string;
  presentation: string;
  speakers: string[]; // speaker_key
  tags: string[];
  title: string;
  format: string;
  startTime: string;
  endTime: string;
  generatedID: string;
  generatedRoom: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoadDataServices {
  public speakersMap: Map<string, Speaker> = new Map();
  public speakers: Speaker[] = [];
  public schedulesMap: Map<string, Schedule> = new Map();
  public schedules: Schedule[] = [];
  public sessionsMap: Map<string, Session> = new Map();

  constructor(private http: HttpClient) {}
  async load(): Promise<void> {
    const sessions = this.http.get<Map<string, Session>>(
      './assets/sessions.json',
    );

    this.sessionsMap = new Map<string, Session>(
      Object.entries(await lastValueFrom(sessions)),
    );

    const userIDToSession: Map<string, SessionIDAndTitle[]> = new Map();

    this.sessionsMap.forEach((session, id) => {
      session.generatedID = id;

      // used for speaker.generatedSession
      session.speakers.forEach((speaker) => {
        if (userIDToSession.has(speaker)) {
          userIDToSession.get(speaker)?.push({
            id: id,
            title: session.title,
          } as SessionIDAndTitle);
        } else {
          userIDToSession.set(speaker, [
            {
              id: id,
              title: session.title,
            },
          ]);
        }
      });
    });

    const speakers = this.http.get<Map<string, Speaker>>(
      './assets/speakers.json',
    );

    this.speakersMap = new Map<string, Speaker>(
      Object.entries(await lastValueFrom(speakers)),
    );

    this.speakersMap.forEach((val, key) => {
      val.generatedID = key;
      val.generatedSessions = userIDToSession.get(key) ?? [];
    });

    this.speakers = Array.from(this.speakersMap.values()).sort((a, b) => {
      return a.order - b.order;
    });

    const schedules = this.http.get<Map<string, Schedule>>(
      './assets/schedules.json',
    );

    this.schedulesMap = new Map<string, Schedule>(
      Object.entries(await lastValueFrom(schedules)),
    );
    this.schedulesMap.forEach((val) => {
      val.timeslots.forEach((slot) => {
        slot.generatedSessions = [];
        slot.sessions.forEach((session, i) => {
          session?.items.forEach((sessionID) => {
            const s = this.sessionsMap.get(sessionID);
            if (s) {
              s.generatedRoom = val.tracks[i].title;
              slot.generatedSessions.push(s);
            }
          });
        });
      });
    });

    this.schedules = Array.from(this.schedulesMap.values()).sort((a, b) => {
      return Date.parse(a.date) - Date.parse(b.date);
    });

    return;
  }
}
