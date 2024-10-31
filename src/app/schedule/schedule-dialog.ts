import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  NgZone,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { LoadDataServices, Speaker, Session } from '../load-data.service';
import { NavigationService } from '../navigation.service';

@Injectable({
  providedIn: 'root',
})
class SessionDataService {
  sessionID: string = '';
}

@Component({
  selector: 'app-schedule-dialog-entry',
  template: '',
})
export class ScheduleDialogEntryComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public dataService: SessionDataService,
    private zone: NgZone,
    private navigation: NavigationService,
    private router: Router,
  ) {
    this.openDialog();
  }
  ngOnInit() {
    this.dataService.sessionID = this.route.snapshot.paramMap.get('id') ?? '';
  }
  openDialog(): void {
    const ref = this.dialog.open(ScheduleDialogComponent, {
      autoFocus: false,
      maxWidth: '80vw', // 設定最大寬度為螢幕寬度的 80%
      width: '1200px', // 設定最大寬度為 1200px
    });

    let withoutNavigation: boolean = false;

    this.zone.run(() => {
      ref.afterClosed().subscribe(() => {
        if (!withoutNavigation) {
          this.navigation.dialogBack('/schedule');
        }
      });
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        withoutNavigation = true;
        ref.close();
      }
    });
  }
}

@Component({
  selector: 'app-schedule-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    LinkTypeToIconPipe,
    MatIconModule,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule-dialog.html',
  styleUrls: ['./schedule.component.css', './schedule-dialog.css'],
})
class ScheduleDialogComponent implements OnInit {
  public session?: Session;
  public speakersMap: Map<string, Speaker> = new Map();
  constructor(
    private dataService: SessionDataService,
    private service: LoadDataServices,
  ) {}
  ngOnInit() {
    this.session = this.service.sessionsMap.get(this.dataService.sessionID);
    this.speakersMap = this.service.speakersMap;
  }
}
