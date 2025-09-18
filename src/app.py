"""
Citigroup Clubs and Teams Management System

A FastAPI application that allows employees to view and sign up
for clubs and teams at Citigroup.
"""

from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import os
from pathlib import Path

app = FastAPI(title="Citigroup Clubs and Teams API",
              description="API for viewing and signing up for clubs and teams")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the Angular build files directory
current_dir = Path(__file__).parent
frontend_build_dir = current_dir / "frontend" / "dist" / "frontend"

if frontend_build_dir.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_build_dir)), name="static")
else:
    app.mount("/static", StaticFiles(directory=os.path.join(Path(__file__).parent,
              "static")), name="static")

# In-memory activity database
activities = {
    "Chess Club": {
        "description": "Learn strategies and compete in chess tournaments",
        "schedule": "Fridays, 3:30 PM - 5:00 PM",
        "max_participants": 12,
        "participants": ["michael@mergington.edu", "daniel@mergington.edu"]
    },
    "Programming Class": {
        "description": "Learn programming fundamentals and build software projects",
        "schedule": "Tuesdays and Thursdays, 3:30 PM - 4:30 PM",
        "max_participants": 20,
        "participants": ["emma@mergington.edu", "sophia@mergington.edu"]
    },
    "Gym Class": {
        "description": "Physical education and sports activities",
        "schedule": "Mondays, Wednesdays, Fridays, 2:00 PM - 3:00 PM",
        "max_participants": 30,
        "participants": ["john@mergington.edu", "olivia@mergington.edu"]
    },
    "Soccer Team": {
        "description": "Join the school soccer team and compete in matches",
        "schedule": "Tuesdays and Thursdays, 4:00 PM - 5:30 PM",
        "max_participants": 22,
        "participants": ["liam@mergington.edu", "noah@mergington.edu"]
    },
    "Basketball Team": {
        "description": "Practice and play basketball with the school team",
        "schedule": "Wednesdays and Fridays, 3:30 PM - 5:00 PM",
        "max_participants": 15,
        "participants": ["ava@mergington.edu", "mia@mergington.edu"]
    },
    "Art Club": {
        "description": "Explore your creativity through painting and drawing",
        "schedule": "Thursdays, 3:30 PM - 5:00 PM",
        "max_participants": 15,
        "participants": ["amelia@mergington.edu", "harper@mergington.edu"]
    },
    "Drama Club": {
        "description": "Act, direct, and produce plays and performances",
        "schedule": "Mondays and Wednesdays, 4:00 PM - 5:30 PM",
        "max_participants": 20,
        "participants": ["ella@mergington.edu", "scarlett@mergington.edu"]
    },
    "Math Club": {
        "description": "Solve challenging problems and participate in math competitions",
        "schedule": "Tuesdays, 3:30 PM - 4:30 PM",
        "max_participants": 10,
        "participants": ["james@mergington.edu", "benjamin@mergington.edu"]
    },
    "Debate Team": {
        "description": "Develop public speaking and argumentation skills",
        "schedule": "Fridays, 4:00 PM - 5:30 PM",
        "max_participants": 12,
        "participants": ["charlotte@mergington.edu", "henry@mergington.edu"]
    },
    "Cricket Club": {
        "description": "Join our cricket team and represent the Man with Blue Indian team colors. Learn cricket fundamentals, practice batting and bowling techniques, and compete in inter-school matches",
        "schedule": "Monday to Friday, 4:40 PM - 5:00 PM",
        "max_participants": 10,
        "participants": []
    }
}


@app.get("/")
def root():
    frontend_build_dir = Path(__file__).parent / "frontend" / "dist" / "frontend"
    if frontend_build_dir.exists():
        return RedirectResponse(url="/static/index.html")
    else:
        return RedirectResponse(url="/static/index.html")


@app.get("/activities")
def get_activities():
    return activities


@app.post("/activities/signup")
def signup_for_activity(email: str, activity: str):
    """Sign up an employee for a club or team"""
    # Validate activity exists
    if activity not in activities:
        raise HTTPException(status_code=404, detail="Activity not found")

    # Get the specific activity
    activity_data = activities[activity]

    # Validate employee is not already signed up
    if email in activity_data["participants"]:
        raise HTTPException(
            status_code=400,
            detail="Employee is already signed up"
        )

    activity_data["participants"].append(email)
    return {"message": f"Signed up {email} for {activity}"}


@app.post("/activities/unregister")
def unregister_from_activity(email: str, activity: str):
    """Unregister an employee from a club or team"""
    # Validate activity exists
    if activity not in activities:
        raise HTTPException(status_code=404, detail="Activity not found")

    # Get the specific activity
    activity_data = activities[activity]

    # Validate employee is signed up
    if email not in activity_data["participants"]:
        raise HTTPException(
            status_code=400,
            detail="Employee is not signed up for this activity"
        )

    activity_data["participants"].remove(email)
    return {"message": f"Unregistered {email} from {activity}"}
