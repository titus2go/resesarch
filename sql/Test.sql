use research;

-- INSERT INTO WeeklySymptomSurvey VALUES
-- (
-- 	20150710,
--     "2015-7-10 11:59:00",
--     "2015-7-17 11:59:00",
--     0861553
--     
-- )

-- INSERT INTO SurveyWeeks (UserID, StartDate, EndDate, SurveyID, SurveyType) VALUES
-- (
-- 	0861553,
--     "2015-7-10 11:59:00",
--     "2015-7-17 11:59:00",
--     2015071010,
--     10
-- )


-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     602,
--     true
-- );
-- 
-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     603,
--     true
-- );
-- 
-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     604,
--     true
-- );
-- 
-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     605,
--     true
-- );
-- 
-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     606,
--     true
-- );
-- 
-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     607,
--     true
-- );
-- 
-- INSERT INTO Surveys (SurveyID, UserID, SymptomID, SymptomStatus) VALUES
-- (
-- 	2015071010,
--     0861553, 
--     608,
--     true
-- );

-- select SurveyID, UserID, sympt.SymptomName
-- from Surveys as surv left outer join Symptoms as sympt
-- on surv.SymptomID = sympt.SymptomID;

-- select UserID 
-- from Users
-- where UserName like 'titus2go@gmailcom' and UserPassword like 'test1ng'
select s.SymptomID, s.SymptomStatus
from WeeklySymptomSurvey as wss left join Surveys as s
on wss.SurveyID = s.SurveyID


-- insert into Users (UserID, UserName, UserPassword) values (123456789, 'titus2go@gmail.com', 'test1ng');





