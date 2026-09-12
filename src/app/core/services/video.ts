import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '@core/models/video';
import { SaveVideoRequest } from '@core/models/save-video-request';
import { MOCK_VIDEOS } from '@core/mock-data/videos.mock';
import { mockResponse, nextId } from '@core/mock-data/mock-utils';

/**
 * Frontend-only video store (in-memory, resets on reload).
 * API-READY: swap each body for the commented HttpClient call.
 */
@Injectable({ providedIn: 'root' })
export class VideoService {
  private videos: Video[] = MOCK_VIDEOS.map((v) => ({ ...v }));

  getAll(): Observable<Video[]> {
    // return this.http.get<Video[]>(`${environment.apiUrl}/Video`);
    return mockResponse(this.videos);
  }

  save(request: SaveVideoRequest): Observable<{ message: string }> {
    // return this.http.post(`${environment.apiUrl}/Video`, request);
    if (request.videoId) {
      const idx = this.videos.findIndex((v) => v.videoId === request.videoId);
      if (idx > -1) {
        this.videos[idx] = {
          ...this.videos[idx],
          ...request,
          updatedOn: new Date().toISOString(),
        };
      }
    } else {
      this.videos.push({
        videoId: nextId(this.videos, 'videoId'),
        title: request.title,
        description: request.description,
        youtubeUrl: request.youtubeUrl,
        thumbnailUrl: request.thumbnailUrl,
        displayOrder: request.displayOrder,
        isActive: request.isActive,
        createdBy: request.userId ?? 1,
        createdOn: new Date().toISOString(),
        updatedBy: request.userId ?? 1,
        updatedOn: new Date().toISOString(),
      });
    }
    return mockResponse({ message: 'Video saved successfully.' });
  }

  delete(id: number): Observable<{ message: string }> {
    // return this.http.delete(`${environment.apiUrl}/Video/${id}`);
    this.videos = this.videos.filter((v) => v.videoId !== id);
    return mockResponse({ message: 'Video deleted successfully.' });
  }
}
