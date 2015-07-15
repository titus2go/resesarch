use research;




drop table Symptoms;

create table Symptoms
(
	SymptomID INTEGER,
    SymptomName VARCHAR(255),
    PRIMARY KEY (SymptomID)
);


drop table Actions;

create table Actions
(
	ActionID INTEGER,
    ActionName VARCHAR(255),
    PRIMARY KEY (ActionID)
);

drop table WeeklySymptomSurvey;

create table WeeklySymptomSurvey
(
	SurveyID varchar(50),
	StartTime DATETIME,
    EndTime DATETIME not null,
    UserID varchar(20),
    PRIMARY KEY (SurveyID, UserID, StartTime)
);

drop table SurveyWeeks;

create table SurveyWeeks
(
    UserID varchar(20),
    StartDate DATETIME,
    EndDate DATETIME,
    SurveyID varchar(50) not null,
    SurveyType INTEGER not null,
    PRIMARY KEY (UserID, StartDate, SurveyType)
);

drop table Surveys;

create table Surveys
(
	SurveyID varchar(50),
    UserID INTEGER,
    SymptomID INTEGER not null,
    SymptomStatus BOOLEAN not null,
    PRIMARY KEY (SurveyID, UserID, SymptomID)
);

drop table Users;

create table Users
(
	UserID varchar(20),
    UserName VARCHAR(50) not null,
    UserPassword VARCHAR(20) not null,
    PRIMARY KEY (UserID)
);

drop table Sessions;

create table Sessions
(
	UserID varchar(20),
    SessionID VARCHAR(255),
    LastLoginTime DATETIME,
    PRIMARY KEY(UserID)
);



