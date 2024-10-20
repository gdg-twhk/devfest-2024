import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface Category {
  id: number;
  name: string;
  categoryItems: {
    id: string;
    name: string;
  }[];
  sort: string;
}

export interface Session {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: {
    id: string;
    name: string;
  }[];
  categories: Category[];
  generatedCategories?: GeneratedCategoryInfo;
  roomId: number;
  room: string;
  liveUrl: string | null;
  recordingUrl: string | null;
  status: string;
  isInformed: boolean;
  isConfirmed: boolean;
}

export interface Schedule {
  date: string;
  isDefault: boolean;
  // rooms: any;
  timeSlots: {
    slotStart: string;
    rooms: {
      id: number;
      name: string;
      session: Session;
      index: number;
    }[];
  }[];
}

class GeneratedCategoryInfo {
  constructor(
    public level: string,
    public language: string,
    public tags: string[],
  ) {}
  static fromCategory(value: Category[]): GeneratedCategoryInfo {
    let level: string = '';
    let lang: string = '';
    let tags: string[] = [];
    for (let i = 0; i < value.length; i++) {
      const v = value[i];
      switch (v.name) {
        case 'Language':
          for (let i = 0; i < v.categoryItems.length; i++) {
            lang += v.categoryItems[i].name;
          }
          break;
        case 'Level':
          level = v.categoryItems.map((u) => u.name).join('');
          break;
        case 'Tags':
          tags = v.categoryItems.map((u) => u.name);
          break;
      }
    }
    return new GeneratedCategoryInfo(level, lang, tags);
  }
}

@Injectable({
  providedIn: 'root',
})
export class LoadScheduleService {
  public schedules: Schedule[] = [];
  public sessionsMap: Map<string, Session> = new Map();

  constructor(private http: HttpClient) {}
  async load(): Promise<Schedule[]> {
    const schedule = this.http.get<Schedule[]>('./assets/schedules.json');
    this.schedules = await lastValueFrom(schedule);

    for (const schedule of this.schedules) {
      for (const slot of schedule.timeSlots) {
        for (const room of slot.rooms) {
          room.session.generatedCategories = GeneratedCategoryInfo.fromCategory(
            room.session.categories,
          );
          this.sessionsMap.set(room.session.id, room.session);
        }
      }
    }

    return this.schedules;
  }
}
