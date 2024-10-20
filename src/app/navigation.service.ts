// modified from: https://nils-mehlhorn.de/posts/angular-navigate-back-previous-page/
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private history: string[] = [];
  private disablePush: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (!this.disablePush) {
          this.history.push(event.urlAfterRedirects);
        } else {
          this.disablePush = false;
        }
        // console.log(this.history);
      }
    });
  }

  // Upon closing the dialog, navigate back to the previous page.
  dialogBack(url: string): void {
    this.history.pop();
    if (this.history.length > 0) {
      url = this.history[this.history.length - 1];
      this.disablePush = true;
    }
    this.router.navigate([url]);
  }
}
