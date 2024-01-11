CREATE TABLE Students 
(
 student_id  SERIAL primary key  ,
 name varchar(100),
 email varchar(150) unique
);

CREATE TABLE  Professors (
  professor_id SERIAL primary key,
  name varchar(100) ,
  email varchar(150) unique ,
  isVerified Boolean default false,
  universityName varchar(200)

)


CREATE TABLE Subjects (
 subject_id SERIAL primary key ,
 professor_id INT references Professors(professor_id)  ON DELETE CASCADE ,
 isVerified Boolean default false,
 name varchar(200) 
 
)



CREATE TABLE Files (
 file_id SERIAL primary key ,
 subject_id INT references Subjects(subject_id)  ON DELETE CASCADE ,
 isVerified Boolean default false,
 title varchar(100) ,
 description varchar(255)
 
)
  CREATE TABLE Comments( 
	 student_id INT,
     professor_id  INT,

  	 subjectName varchar(100),
     isVerified Boolean default false,
	 description varchar(255),
	 subjectMastry INT   CHECK (subjectMastry >= 0 AND subjectMastry <= 5) ,
	 teachingCoherence INT  CHECK (teachingCoherence >= 0 AND teachingCoherence <= 5),
     
	  PRIMARY KEY (student_id, professor_id),
	  FOREIGN KEY (student_id) REFERENCES Students(student_id),
	  FOREIGN KEY (professor_id) REFERENCES Professors(professor_id)
	)






  CREATE TABLE FileComments( 
	 student_id INT,
     file_id  INT,

  	 
		 isVerified Boolean default false,
		 description varchar(255),
		 reaction varchar(4),
	
	  PRIMARY KEY (student_id, file_id),
	  FOREIGN KEY (student_id) REFERENCES Students(student_id),
	  FOREIGN KEY (file_id) REFERENCES Files(file_id)
	)