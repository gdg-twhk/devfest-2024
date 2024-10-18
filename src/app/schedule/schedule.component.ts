import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { TruncateStringPipe } from '../pipes/truncate.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { LoadScheduleService, Schedule } from '../load-schedule.service';
import { LoadSpeakersService, Speaker } from '../load-speakers.service';
import { RouterModule } from '@angular/router';

@Pipe({
  standalone: true,
  name: 'toDate',
})
export class ToDatePipe implements PipeTransform {
  transform(value: string): Date {
    return new Date(value);
  }
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [MatGridListModule, CommonModule, MatCardModule, ToDatePipe, TruncateStringPipe, MatChipsModule, RouterModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {
  cols: number = 0;
  schedules: Schedule[] = [];
  speakerMap: Map<string, Speaker> = new Map(); 
  constructor(private service: LoadScheduleService, private speakerService: LoadSpeakersService) {
    this.schedules = this.service.schedules;
    this.speakerMap = this.speakerService.speakersMap;
  }
}