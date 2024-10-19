import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { TruncateStringPipe } from '../pipes/truncate.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { LoadScheduleService, Schedule } from '../load-schedule.service';
import { LoadSpeakersService, Speaker } from '../load-speakers.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, TruncateStringPipe, MatChipsModule, RouterModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  cols: number = 0;
  schedules: Schedule[] = [];
  speakersMap: Map<string, Speaker> = new Map();
  constructor(private service: LoadScheduleService, private speakerService: LoadSpeakersService) {
    this.schedules = this.service.schedules;
    this.speakersMap = this.speakerService.speakersMap;
  }
}

