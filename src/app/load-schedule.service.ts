import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

interface Speaker {
  id: string;
  name: string;
}

interface GeneratedSpeakerInfo{
  id: string;
  name: string;
  profile: string;
}

interface CategoryItems {
  id: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
  categoryItems: CategoryItems[];
  sort: string;
}

interface Session {
  id: string;
  title: string;
  description: string | null;
  startsAt: string;
  endsAt: string;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: Speaker[];
  generatedSpeaker?: GeneratedSpeakerInfo[];
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

interface Room {
  id: number;
  name: string;
  session: Session;
  index: number;
}

interface TimeSlot {
  slotStart: string;
  rooms: Room[];
}

export interface Schedule {
  date: string;
  isDefault: boolean;
  rooms: any;
  timeSlots: TimeSlot[];
}

class GeneratedCategoryInfo {
  constructor(public level: string, public language: string, public tags: string[]) { }
  static fromCategory(value: Category[]): GeneratedCategoryInfo {
    let level: string = "";
    let lang: string = "";
    let tags: string[] = [];
    for (let i = 0; i < value.length; i++) {
      let v = value[i];
      switch (v.name) {
        case "Language":
          for (let i = 0; i < v.categoryItems.length; i++) {
            lang += v.categoryItems[i].name;
          }
          break;
        case "Level":
          level = v.categoryItems.map((u) => u.name).join("");
          break;
        case "Tags":
          tags = v.categoryItems.map((u) => u.name);
          break;
      }
    }
    return new GeneratedCategoryInfo(level, lang, tags);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoadScheduleService {
  public schedules: Schedule[] = [];

  constructor(private http: HttpClient) { }
  async load(): Promise<Schedule[]> {
    let schedule = this.http.get<Schedule[]>("/assets/schedules.json");
    this.schedules = await lastValueFrom(schedule);

    for (let schedule of this.schedules) {
      for (let slot of schedule.timeSlots) {
        for (let room of slot.rooms) {
          room.session.generatedCategories = GeneratedCategoryInfo.fromCategory(room.session.categories);
        }
      }
    }

    return this.schedules;
  }
}
