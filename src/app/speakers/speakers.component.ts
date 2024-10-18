import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Injectable, NgZone } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LinkTypeToIconPipe } from '../pipes/to-social-link-icon.pipe';
import { TruncateStringPipe } from '../pipes/truncate.pipe';
import { LoadSpeakersService, Speaker } from '../load-speakers.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-speakers',
  standalone: true,
  imports: [MatCardModule, FontAwesomeModule, CommonModule, LinkTypeToIconPipe, TruncateStringPipe, RouterModule],
  templateUrl: './speakers.component.html',
  styleUrl: './speakers.component.css'
})
export class SpeakersComponent {
  speakers: Speaker[] = [];
  constructor(private service: LoadSpeakersService) {
    this.speakers = this.service.speakers;
  }
}

@Injectable({
  providedIn: 'root',
})
export class SpeakerDataService {
  userID: string = "";
}

@Component({
  template: ''
})
export class SpeakerDialogEntryComponent {
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, public dataService: SpeakerDataService, private zone: NgZone) {
    this.openDialog();
  }
  ngOnInit() {
    this.dataService.userID = this.route.snapshot.paramMap.get('id') ?? "";
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SpeakerDialogComponent, {
      autoFocus: false,
      maxWidth: "1000px",
    });
    dialogRef.afterClosed().subscribe(_ => {
      this.zone.run(() => {
        // if (document && document.referrer && document.referrer.startsWith(window.location.origin)) {
        //   window.history.back();
        // } else {
          this.router.navigate(['../'], { relativeTo: this.route })
        // }
      });
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
export class SpeakerDialogComponent {
  public speaker?: Speaker;
  constructor(private dataService: SpeakerDataService, private service: LoadSpeakersService) {
  }
  ngOnInit() {
    this.speaker = this.service.speakersMap.get(this.dataService.userID);
  }
}
