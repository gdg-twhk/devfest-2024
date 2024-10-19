import { CommonModule, Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { TruncateStringPipe } from '../pipes/truncate.pipe';
import { LoadSpeakersService, Speaker } from '../load-speakers.service';
import { ActivatedRoute, NavigationStart, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationService } from '../navigation.service';

@Injectable({
  providedIn: 'root',
})
class SpeakerDataService {
  userID: string = "";
}

@Component({
  template: '',
  selector: 'speaker-dialog-entry',
})
export class SpeakerDialogEntryComponent {
  constructor(public dialog: MatDialog, private route: ActivatedRoute,
    public dataService: SpeakerDataService, private zone: NgZone, private navigation: NavigationService, private router: Router) {
    this.openDialog();
  }
  ngOnInit() {
    this.dataService.userID = this.route.snapshot.paramMap.get('id') ?? "";
  }
  openDialog(): void {
    const ref = this.dialog.open(SpeakerDialogComponent, {
      autoFocus: false,
      maxWidth: "1000px",
    });
    let withoutNavigation: boolean = false;

    this.zone.run(() => {
        ref.afterClosed().subscribe(_ => {
            if (!withoutNavigation) {
                this.navigation.dialogBack('/speakers')
            }
        });
    })

    this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
            withoutNavigation = true;
            ref.close();
        }
    });
  }
}

@Component({
  selector: 'speaker-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, RouterModule, FontAwesomeModule, LinkTypeToIconPipe, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './speaker-dialog.html',
  styleUrls: ['./speakers.component.css', './speaker-dialog.css']
})
class SpeakerDialogComponent {
  public speaker?: Speaker;
  constructor(private dataService: SpeakerDataService, private service: LoadSpeakersService) {
  }
  ngOnInit() {
    this.speaker = this.service.speakersMap.get(this.dataService.userID);
  }
}
