INSERT INTO department (name)
VALUES ("Engineering"),
       ("Sales"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Engineering Manager", 150000, 1),
       ("Lead Engineer", 150000, 1),
       ("Software Engineer", 120000, 1),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, null),
       ("Rob", "Doe", 2, 1),
       ("Nick", "Doe", 3, 2),
       ("Jack", "Doe", 4, null),
       ("Peter", "Doe", 5, 4),
       ("Veronica", "Doe", 6, null),
       ("Pam", "Doe", 7, 6);


       
