export interface Activity {
  description: string;
  schedule: string;
  max_participants: number;
  participants: string[];
}

export interface Activities {
  [key: string]: Activity;
}

export interface SignupRequest {
  email: string;
  activity: string;
}

export interface UnregisterRequest {
  email: string;
  activity: string;
}
