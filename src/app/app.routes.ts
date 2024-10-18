import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SpeakersComponent, SpeakerDialogEntryComponent } from './speakers/speakers.component';
import { TeamComponent } from './team/team.component';
import { BlogComponent } from './blog/blog.component';

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
    { path: 'schedule', component: ScheduleComponent, data: { animations: 'schedulePage' } },
    { path: 'team', component: TeamComponent, data: { animations: 'teamPage' } },
    { path: 'blog', component: BlogComponent, data: { animations: 'blogPage' } },
];
