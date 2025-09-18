import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityCardComponent } from '../activity-card/activity-card.component';
import { Activities } from '../../models/activity.interface';

@Component({
  selector: 'app-activities-list',
  imports: [CommonModule, ActivityCardComponent],
  templateUrl: './activities-list.component.html',
  styleUrl: './activities-list.component.css'
})
export class ActivitiesListComponent implements OnInit {
  activities: Activities = {};
  loading = true;
  error: string | null = null;
  message: string | null = null;

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.loading = true;
    this.error = null;
    
    this.activitiesService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load activities. Please try again.';
        this.loading = false;
        console.error('Error loading activities:', err);
      }
    });
  }

  onUnregister(event: {email: string, activity: string}): void {
    this.activitiesService.unregister(event).subscribe({
      next: () => {
        this.loadActivities();
      },
      error: (error) => {
        console.error('Error unregistering:', error);
        alert('Failed to unregister. Please try again.');
      }
    });
  }

  get activitiesArray() {
    if (!this.activities) return [];
    return Object.entries(this.activities).map(([name, data]) => ({
      name,
      data
    }));
  }
}
