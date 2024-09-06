// index.js
// Arrays (Creation, Access, Methods like push, pop, shift, unshift, map, filter, reduce)

// Manage a list of employees example

// 1. Create an array of employee objects
let employees = [
  { id: 1, name: "Alice", department: "Engineering", salary: 75000 },
  { id: 2, name: "Bob", department: "Marketing", salary: 55000 },
  { id: 3, name: "Charlie", department: "HR", salary: 60000 },
  { id: 4, name: "David", department: "Engineering", salary: 80000 },
];

// 2. Add a new employee to the array (using push)
employees.push({ id: 5, name: "Eva", department: "Marketing", salary: 60000 });

// 3. Remove the first employee from the array (using shift)
let removedEmployee = employees.shift();
console.log("Removed Employee:", removedEmployee);

// 4. Add a new employee to the beginning of the array (using unshift)
employees.unshift({ id: 6, name: "Frank", department: "Sales", salary: 65000 });

// 5. Access and update an employee's salary
employees[1].salary = 57000; // Bob's new salary

// 6. Use map to create an array of employee names
let employeeNames = employees.map((employee) => employee.name);
console.log("Employee Names:", employeeNames);

// 7. Use filter to find employees in the Engineering department
let engineeringEmployees = employees.filter(
  (employee) => employee.department === "Engineering"
);
console.log("Engineering Employees:", engineeringEmployees);

// 8. Use reduce to calculate the total salary of all employees
let totalSalary = employees.reduce(
  (total, employee) => total + employee.salary,
  0
);
console.log("Total Salary:", totalSalary);

// 9. Find an employee by id using find
let employeeById = employees.find((employee) => employee.id === 3);
console.log("Employee with ID 3:", employeeById);

// 10. Check if there's any employee in the Marketing department (using some)
let hasMarketingEmployee = employees.some(
  (employee) => employee.department === "Marketing"
);
console.log("Is there any Marketing employee?", hasMarketingEmployee);

// 11. Sort employees by salary (using sort)
employees.sort((a, b) => a.salary - b.salary);
console.log("Employees Sorted by Salary:", employees);

// 12. Create a shallow copy of the array (using slice)
let employeesCopy = employees.slice();
console.log("Shallow Copy of Employees:", employeesCopy);

// 13. Join employee names into a single string (using join)
let employeeNamesString = employeeNames.join(", ");
console.log("Employee Names as a String:", employeeNamesString);

// 14. Use splice to remove an employee at a specific position
// Remove 1 employee starting from index 2
let removedSplicedEmployee = employees.splice(2, 1); // Removes Charlie
console.log("Removed Employee via Splice:", removedSplicedEmployee);
console.log("Employees after Splice Removal:", employees);

// 15. Use splice to add a new employee at a specific position
// Add a new employee at index 2
employees.splice(2, 0, {
  id: 7,
  name: "Grace",
  department: "Engineering",
  salary: 70000,
});
console.log("Employees after Splice Addition:", employees);

/** Output:
 *  Removed Employee: { id: 1, name: 'Alice', department: 'Engineering', salary: 75000 }
    Employee Names: [ 'Frank', 'Bob', 'Charlie', 'David', 'Eva' ]
    Engineering Employees: [ { id: 4, name: 'David', department: 'Engineering', salary: 80000 } ]
    Total Salary: 322000
    Employee with ID 3: { id: 3, name: 'Charlie', department: 'HR', salary: 60000 }
    Is there any Marketing employee? true
    Employees Sorted by Salary: [
    { id: 2, name: 'Bob', department: 'Marketing', salary: 57000 },
    { id: 3, name: 'Charlie', department: 'HR', salary: 60000 },
    { id: 5, name: 'Eva', department: 'Marketing', salary: 60000 },
    { id: 6, name: 'Frank', department: 'Sales', salary: 65000 },
    { id: 4, name: 'David', department: 'Engineering', salary: 80000 }
    ]
    Shallow Copy of Employees: [
    { id: 2, name: 'Bob', department: 'Marketing', salary: 57000 },
    { id: 3, name: 'Charlie', department: 'HR', salary: 60000 },
    { id: 5, name: 'Eva', department: 'Marketing', salary: 60000 },
    { id: 6, name: 'Frank', department: 'Sales', salary: 65000 },
    { id: 4, name: 'David', department: 'Engineering', salary: 80000 }
    ]
    Employee Names as a String: Frank, Bob, Charlie, David, Eva
    Removed Employee via Splice: [ { id: 5, name: 'Eva', department: 'Marketing', salary: 60000 } ]
    Employees after Splice Removal: [
    { id: 2, name: 'Bob', department: 'Marketing', salary: 57000 },
    { id: 3, name: 'Charlie', department: 'HR', salary: 60000 },
    { id: 6, name: 'Frank', department: 'Sales', salary: 65000 },
    { id: 4, name: 'David', department: 'Engineering', salary: 80000 }
    ]
    Employees after Splice Addition: [
    { id: 2, name: 'Bob', department: 'Marketing', salary: 57000 },
    { id: 3, name: 'Charlie', department: 'HR', salary: 60000 },
    { id: 7, name: 'Grace', department: 'Engineering', salary: 70000 },
    { id: 6, name: 'Frank', department: 'Sales', salary: 65000 },
    { id: 4, name: 'David', department: 'Engineering', salary: 80000 }
    ]
 */
