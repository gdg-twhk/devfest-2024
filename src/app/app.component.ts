import { Component } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { slideInAnimation } from './animation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatTabsModule, MatSidenavModule, MatListModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [slideInAnimation],
})
export class AppComponent {
  constructor(private contexts: ChildrenOutletContexts) { }
  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animations'];
  }

  title = 'dev-fest-2024';
  links = [
    new Link('首頁', '/', true, '🏠'),
    new Link('講者', '/speakers', false, '🎤'),
    new Link('議程', '/schedule', false, '🗓️'),
    new Link('團隊', '/team', false, '👨‍👩‍👧‍👦'),
    new Link('部落格', '/blog', false, '📝')
  ];
}

class Link {
  constructor(public name: string, public link: string, public exact: boolean, public emoji: string) {
  }
}