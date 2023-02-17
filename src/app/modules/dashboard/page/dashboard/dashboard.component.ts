import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { API_URL } from 'src/app/core/constants/api.constant';
import { CONTACT_TYPE } from 'src/app/core/constants/other.constant';
import { TrackService } from 'src/app/data/service/track.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  contactTypes = CONTACT_TYPE;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public tracks: TrackService,
    private toastService: HotToastService,
  ) {}

  ngOnInit(): void {
    this.http.get(`${API_URL}/track`).subscribe({
      next: (res: any) => {
        this.tracks.saveTracks(res.tracks);
      },
      error: () => {
        this.toastService.error('خطا در دریافت پیگیری ها');
      },
    });
  }

  onDisable(id: number, isActive: boolean): void {
    this.http.patch(`${API_URL}/track/${id}/status`, { isActive }).subscribe({
      next: (res: any) => {
        const updatedState = res.isActive;
        const persianState = updatedState ? 'فعال' : 'غیر فعال';
        const newTracks = this.tracks.getTracks().map((track) => {
          if (track.id == id) return { ...track, isActive: updatedState };
          else return track;
        });
        this.toastService.success(` پیگیری با موفقیت ${persianState} شد 😉`);
        this.tracks.saveTracks(newTracks);
      },
      error: (err: any) => {
        this.toastService.error(err.message);
      },
    });
  }

  openDialog(id: number) {
    this.dialog.open(DashboardComponentDialog, {
      data: {
        id,
      },
    });
  }
}

@Component({
  selector: 'app-dashboard-dialog',
  templateUrl: 'dashboard.component-dialog.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponentDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private http: HttpClient,
    private tracks: TrackService,
    private toastService: HotToastService,
  ) {}
  onTrackDelete(id: number): void {
    this.http.delete(`${API_URL}/track/${id}`).subscribe({
      next: (res: any) => {
        const newTracks = this.tracks.getTracks().filter((track) => {
          if (track.id !== id) return true;
          else return false;
        });
        this.tracks.saveTracks(newTracks);
        this.toastService.success('پیگیری با موفقیت حذف شد 😉');
      },
      error: (err: any) => {
        this.toastService.error(err.message);
      },
    });
  }
}
