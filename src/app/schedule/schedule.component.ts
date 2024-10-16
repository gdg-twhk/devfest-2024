import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

interface Speaker {
  id: string;
  name: string;
}

interface CategoryItems{
  id: string;
  name: string;
}

interface Category{
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
  categories: Category[];
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

interface Schedule {
  date: string;
  isDefault: boolean;
  rooms: any;
  timeSlots: TimeSlot[];
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  slots: TimeSlot[] = [];
  cols: number = 0;
  schedules: Schedule[] = [];

  constructor(private http: HttpClient) {
    this.http.get<Schedule[]>("/assets/schedules.json")
      .subscribe(schedules => {
        this.schedules = schedules;
        this.slots = schedules[0].timeSlots;
        let cols = 0;
        for (let i = 0; i < this.slots.length; i++) {
          let n = this.slots[i].rooms.length;
          if (n > cols) {
            cols = n;
          }
        }
        this.cols = cols;
      });
  }
}
