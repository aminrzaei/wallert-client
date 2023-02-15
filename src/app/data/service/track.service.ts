import { Injectable } from '@angular/core';

interface iTrack {
  contactAddress: string;
  contactType: string;
  id: number;
  interval: number;
  isActive: boolean;
  lastCheckTime: string;
  lastPostToken: string;
  query: string;
  title: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class TrackService {
  private tracks: iTrack[] = [];

  saveTracks(tracks: iTrack[]): void {
    this.tracks = tracks;
  }

  getTracks(): iTrack[] {
    return this.tracks;
  }
}
