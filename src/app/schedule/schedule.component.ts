import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Schedule } from '../load-data.service';
import { LoadDataServices, Speaker } from '../load-data.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    MatGridListModule,
    CommonModule,
    MatCardModule,
    MatChipsModule,
    RouterModule,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})
export class ScheduleComponent {
  cols: number = 0;
  schedules: Schedule[] = [];
  speakersMap: Map<string, Speaker> = new Map();
  constructor(private service: LoadDataServices) {
    this.schedules = this.service.schedules;
    this.speakersMap = this.service.speakersMap;
  }
}
