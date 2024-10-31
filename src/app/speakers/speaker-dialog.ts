import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  NgZone,
  OnInit,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { LoadDataServices, Speaker } from '../load-data.service';
import {
  ActivatedRoute,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../navigation.service';

@Injectable({
  providedIn: 'root',
})
class SpeakerDataService {
  userID: string = '';
}

@Component({
  template: '',
  selector: 'app-speaker-dialog-entry',
})
export class SpeakerDialogEntryComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public dataService: SpeakerDataService,
    private zone: NgZone,
    private navigation: NavigationService,
    private router: Router,
  ) {
    this.openDialog();
  }
  ngOnInit() {
    this.dataService.userID = this.route.snapshot.paramMap.get('id') ?? '';
  }
  openDialog(): void {
    const ref = this.dialog.open(SpeakerDialogComponent, {
      autoFocus: false,
      maxWidth: '1000px',
    });
    let withoutNavigation: boolean = false;

    this.zone.run(() => {
      ref.afterClosed().subscribe(() => {
        if (!withoutNavigation) {
          this.navigation.dialogBack('/speakers');
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
  selector: 'app-speaker-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    LinkTypeToIconPipe,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './speaker-dialog.html',
  styleUrls: ['./speakers.component.css', './speaker-dialog.css'],
})
class SpeakerDialogComponent implements OnInit {
  public speaker?: Speaker;
  constructor(
    private dataService: SpeakerDataService,
    private service: LoadDataServices,
  ) {}
  ngOnInit() {
    this.speaker = this.service.speakersMap.get(this.dataService.userID);
  }
}
