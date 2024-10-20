import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleDialogEntryComponent } from './schedule/schedule-dialog';
import { SpeakersComponent } from './speakers/speakers.component';
import { SpeakerDialogEntryComponent } from './speakers/speaker-dialog';
import { TeamComponent } from './team/team.component';
import { BlogComponent } from './blog/blog.component';
import { CodComponent } from './cod/cod.component';
import { animation } from '@angular/animations';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { animations: 'homePage' } },
    {
        path: 'speakers', component: SpeakersComponent, data: { animations: 'speakersPage' }, children: [
            {
                path: ':id',
                component: SpeakerDialogEntryComponent,
            }
        ]
    },
    {
        path: 'schedule', component: ScheduleComponent, data: { animations: 'schedulePage' }, children: [
            {
                path: ':id',
                component: ScheduleDialogEntryComponent,
            }
        ]
    },
    { path: 'team', component: TeamComponent, data: { animations: 'teamPage' } },
    { path: 'blog', component: BlogComponent, data: { animations: 'blogPage' } },
    { path: 'cod', component: CodComponent, data: { animations: 'codePage' } }
];
