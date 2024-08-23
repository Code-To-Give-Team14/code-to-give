# Server

Server for backend.

## Database Schema

```mermaid
erDiagram
    User {
        String Username PK
        String FirstName
        String LastName
        String Password "Hashed"
        Optional[String] Email
        Optional[String] SMS
        JSON Interests "JSON List"
        String Roles "One of 'Member', 'Volunteer', 'Staff'"
    }

    UserTraining {
        String Username PK
        Integer TrainingId PK
        Bool RemindEmail
        Bool RemindSMS
        Bool Completed "Just for reference, might be optional"
        TBC Feedback
    }

    Training {
        Integer Id PK
        String Title
        String Description
        JSON Links "JSON List"
        JSON Tags "JSON List"
    }

    UserEvent {
        String Username PK
        Integer EventId PK
        Bool RemindEmail
        Bool RemindSMS
        Integer Rating
        String Comment
    }

    Event {
        Integer Id PK
        String Title
        String Description
        JSON Tags "{ 'Interests': [], 'Skills': [] }"
        String Schedule "ISO 8601"
        Bool IsActivated "If false, event is hidden"
        JSON Reminder "JSON List of seconds (UI: Xm, Xh, Xd, Xw) before the event"
    }

    User |o--|| UserTraining: Has
    UserTraining ||--o| Training: Refers
    Training }|--|| Event: Depends
    User |o--|| UserEvent: Joins
    UserEvent ||--o| Event: Refers
```