use research;


create table Symptoms
(
	SymptomID INTEGER,
    SymptomName VARCHAR(255),
    PRIMARY KEY (SymptomID)
);

create table Actions
(
	ActionID INTEGER,
    ActionName VARCHAR(255),
    PRIMARY KEY (ActionID)
);

create table WeeklySymptomSurvey
(
	SurveyID INTEGER,
	StartTime DATETIME,
    EndTime DATETIME,
    UserID INTEGER,
    PRIMARY KEY (SurveyID, UserID, StartTime)
);

create table SurveyWeeks
(
    UserID INTEGER,
    StartDate DATETIME,
    EndDate DATETIME,
    SurveyID INTEGER,
    SurveyType INTEGER,
    PRIMARY KEY (UserID, StartDate, SurveyType)
);

create table Surveys
(
	SurveyID INTEGER,
    UserID INTEGER,
    SymptomID INTEGER,
    SymptomStatus BOOLEAN,
    PRIMARY KEY (SurveyID, UserID, SymptomID)
);

create table Users
(
	UserID INTEGER,
    UserName VARCHAR(50),
    UserPassword VARCHAR(20),
    PRIMARY KEY (UserID)
);

create table Sessions
(
	UserID INTEGER,
    SessionID VARCHAR(255),
    LastLoginTime DATETIME,
    PRIMARY KEY(UserID)
);



