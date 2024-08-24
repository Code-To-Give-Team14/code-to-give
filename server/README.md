# Server

Server for backend.

## Database Schema

```mermaid
erDiagram
    Member {
        String Email PK
        String FirstName
        String LastName
        String Password "Hashed"
        String SMS
        JSON Interests "JSON List"
        JSON SKills "JSON List, extra skills not related to training"
        String Location
        String Language
        Bool IsAdmin
        DateTime CreatedAt
        DateTime UpdatedAt
        DateTime DeletedAt
    }

    MemberTraining {
        Integer Id PK
        String MemberEmail FK
        Integer TrainingId FK
        Bool RemindEmail
        Bool RemindSMS
        Bool isCompleted
        DateTime CreatedAt
        DateTime UpdatedAt
        DateTime DeletedAt
    }

    Training {
        Integer Id PK
        Integer EventId FK
        String Title
        String Description
        String VideoLink
        String QuizLink
        JSON Skills "JSON List"
        DateTime CreatedAt
        DateTime UpdatedAt
        DateTime DeletedAt
    }
    
    Program {
        Integer Id PK
        String Name 
    }

    MemberEvent {
        Integer id PK
        String MemberEmail FK
        Integer EventId FK
        Bool RemindEmail
        Bool RemindSMS
        Integer Rating
        String feedback
        DateTime CreatedAt
        DateTime UpdatedAt
        DateTime DeletedAt
    }

    Event {
        Integer Id PK
        Integer ProgramId FK
        String Title
        String Description
        JSON Types "JSON List"
        JSON Interests "JSON List"
        JSON InterestsEmbedding "JSON List"
        JSON Skills "JSON List"
        JSON SkillsEmbedding "JSON List"
        DateTime StartTime
        DateTime EndTime
        String Venue
        Integer Quota
        Bool IsActivated "If false, event is hidden"
        JSON Reminder "JSON List of minutes (UI: Xm, Xh, Xd, Xw) before the event"
        DateTime CreatedAt
        DateTime UpdatedAt
        DateTime DeletedAt
    }

    Member ||--o{ MemberTraining: Has
    MemberTraining }o--|| Training: Refers
    Training }o--|| Event: Depends
    Member ||--o{ MemberEvent: Joins
    MemberEvent }o--|| Event: Refers
    Program ||--o{ Event: Has
```