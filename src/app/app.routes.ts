import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDialogEntryComponent } from './schedule/schedule-dialog';
import { SpeakersComponent } from './speakers/speakers.component';
import { SpeakerDialogEntryComponent } from './speakers/speaker-dialog';

const titleSuffix = 'GDG DevFest Taipei 2024';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { animations: 'homePage' },
    title: titleSuffix,
  },
  {
    path: 'speakers',
    component: SpeakersComponent,
    data: { animations: 'speakersPage' },
    children: [
      {
        path: ':id',
        component: SpeakerDialogEntryComponent,
      },
    ],
    title: `講者 | ${titleSuffix}`,
  },
  {
    path: 'schedule',
    component: ScheduleComponent,
    data: { animations: 'schedulePage' },
    children: [
      {
        path: ':id',
        component: ScheduleDialogEntryComponent,
      },
    ],
    title: `議程 | ${titleSuffix}`,
  },
];
