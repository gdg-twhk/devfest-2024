import { Component } from '@angular/core';
import {
  ChildrenOutletContexts,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { slideInAnimation } from './animation';
import { CommonModule } from '@angular/common';

interface Link {
  name: string;
  link: string;
  exact: boolean;
  emoji: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) {}
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.[
      'animations'
    ];
  }

  // shown in navbar and sidebar
  // `emoji` is shown in sidebar only
  // `exact` means the "active" if the current path exactly match the link
  links: Link[] = [
    {
      name: '首頁',
      link: '/',
      exact: true,
      emoji: '🏠',
    },
    {
      name: '講者',
      link: '/speakers',
      exact: false,
      emoji: '🎤',
    },
    {
      name: '議程',
      link: '/schedule',
      exact: false,
      emoji: '🎤',
    },
  ];

  // shown in navbar and sidebar with highlight
  highlightLink: Link = {
    name: '免費報名',
    link: 'https://gdg.community.dev/events/details/google-gdg-taipei-presents-devfest-taipei-2024/',
    exact: false, // not used
    emoji: '📝',
  };
}
