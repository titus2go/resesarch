use research;




drop table Symptoms;

create table Symptoms
(
	SymptomID INTEGER,
    SymptomName VARCHAR(255),
    PRIMARY KEY (SymptomID)
);

create table Options
(
	OptionID INTEGER,
    OptionName VARCHAR(255),
    primary key (OptionID)
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

drop table SurveyQuestionBridge;

create table SurveyQuestionBridge
(
	SurveyID varchar(50),
    QuestionID  varchar(50),
    QuestionType varchar(50)
);

drop table Surveys;

create table Surveys
(
	QuestionID varchar(50),
    UserID varchar(25),
    OptionID INTEGER not null,
    OptionStatus BOOLEAN not null
);

drop table Questions;

create table Questions
(
	QuestionType integer,
    QuestionText varchar(200)
);






