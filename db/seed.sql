USE ugcc;
-- Past Executive Members
INSERT INTO members (name, email, password, role, program, year_of_study)
VALUES
("Ms. Sandra Khan", "sandra.khan@ug.edu.gy", "dummy", "Club Advisor", NULL, NULL),
("Mr. Kwesi Elliot", "kwesi.elliot@ug.edu.gy", "dummy", "President (2017/2018)", NULL, NULL),
("Mr. Teekae Jordon", "teekae.jordon@ug.edu.gy", "dummy", "Vice President (2017/2018)", NULL, NULL),
("Mr. Shemar Austin", "shemar.austin@ug.edu.gy", "dummy", "Secretary (2017/2018)", NULL, NULL),
("Mr. Cloyd London", "cloyd.london@ug.edu.gy", "dummy", "President (2018/2019)", NULL, NULL),
("Mr. Jason Jacobs", "jason.jacobs@ug.edu.gy", "dummy", "President (2019/2020)", NULL, NULL),
("Ms. Waynetta Naughton", "waynetta.naughton@ug.edu.gy", "dummy", "President (2021/2022)", NULL, NULL),
("Mr. Kieron Abrigo", "kieron.abrigo@ug.edu.gy", "dummy", "Vice President (2022/2023)", NULL, NULL);

-- New Test Members
INSERT INTO members (name, email, password, telephone, program, year_of_study, gaming_interest, computing_interest, role)
VALUES
("Test Student", "test@student.com", "1234", "592-600-0000", "Computer Science", "Year 2", "Valorant, FIFA", "Networking, Cybersecurity", "Member"),
("Admin User", "admin@ugcc.com", "adminpass", "592-600-1111", "Software Engineering", "Year 3", "Minecraft, Dota 2", "Cloud, Security", "President");

-- Sample members
INSERT INTO members (name, role, year) VALUES
('John Doe', 'President', 2024),
('Jane Smith', 'Vice President', 2024);

INSERT INTO activities (year, description)
VALUES
("2018/2019", "Held second elections and launched UGCC website."),
("2019/2020", "UGCC participated in OAS DipLoHack event in Washington DC."),
("2020/2021", "Ethical hacking training moved online due to class clashes."),
("2022/2023", "Cybersecurity workshop hosted for UG students.");

-- Sample resources
INSERT INTO resources (title, link) VALUES
('UGCC Constitution', 'https://ugcc.edu.gy/constitution.pdf'),
('Club Logo', 'https://ugcc.edu.gy/logo.png');

