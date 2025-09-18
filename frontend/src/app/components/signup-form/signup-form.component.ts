import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { Activities, Activity } from '../../models/activity.interface';

@Component({
  selector: 'app-signup-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  activities: Activities = {};
  submitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private activitiesService: ActivitiesService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      activity: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this.activitiesService.getActivities().subscribe({
      next: (data) => {
        this.activities = data;
      },
      error: (err) => {
        console.error('Error loading activities for form:', err);
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.submitting = true;
      this.errorMessage = null;
      this.successMessage = null;

      const formData = this.signupForm.value;
      
      this.activitiesService.signUp(formData).subscribe({
        next: (response: any) => {
          this.successMessage = `Successfully signed up for ${formData.activity}!`;
          this.signupForm.reset();
          this.loadActivities();
          this.submitting = false;
        },
        error: (error: any) => {
          this.errorMessage = error.error?.detail || 'Failed to sign up. Please try again.';
          this.submitting = false;
        }
      });
    }
  }

  get activitiesArray() {
    if (!this.activities) return [];
    return Object.entries(this.activities).map(([name, data]) => ({
      name,
      data
    }));
  }

  getAvailabilityText(activity: Activity): string {
    const available = activity.max_participants - activity.participants.length;
    if (available === 0) {
      return 'Full';
    }
    return `${available} spots left`;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  get emailControl() {
    return this.signupForm.get('email');
  }

  get activityControl() {
    return this.signupForm.get('activity');
  }
}
