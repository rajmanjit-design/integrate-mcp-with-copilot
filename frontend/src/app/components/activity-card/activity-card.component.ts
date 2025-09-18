import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Activity } from '../../models/activity.interface';

@Component({
  selector: 'app-activity-card',
  imports: [CommonModule],
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.css'
})
export class ActivityCardComponent {
  @Input() activityName!: string;
  @Input() activity!: Activity;
  @Output() unregister = new EventEmitter<{email: string, activity: string}>();

  getAvailabilityText(): string {
    const available = this.activity.max_participants - this.activity.participants.length;
    if (available === 0) {
      return 'Full';
    }
    return `${available} spots left`;
  }

  onUnregister(email: string): void {
    this.unregister.emit({ email, activity: this.activityName });
  }
}
