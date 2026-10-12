import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mock In-Memory Database Table with initial data matching the prompt reference
let employees = [
    { id: 1, name: 'Vishnu', age: 29, mobile: '912345678', city: 'chennai', department: 'Engineering', salary: 75000 },
    { id: 2, name: 'Rajesh', age: 30, mobile: '9412345678', city: 'Bangalore', department: 'HR', salary: 50000 },
    { id: 3, name: 'Saravanan', age: 31, mobile: '6812345678', city: 'Hyderabad', department: 'Marketing', salary: 60000 },
    { id: 4, name: 'Ramesh', age: 32, mobile: '9781234561', city: 'Mumbai', department: 'Finance', salary: 80000 },
    { id: 5, name: 'John', age: 33, mobile: '9456781234', city: 'Delhi', department: 'Sales', salary: 55000 }
];
let nextId = 6;

const findById = (id) => employees.find((e) => e.id === parseInt(id, 10));

// 1. Get All Employees
app.get('/api/employees', (req, res) => {
    res.status(200).json(employees);
});

// 2. Get Employee by ID
app.get('/api/employees/:id', (req, res) => {
    const emp = findById(req.params.id);
    if (!emp) return res.status(200).json({ message: 'Employee not found' });
    res.status(200).json(emp);
});

// 3. Add a New Employee
app.post('/api/employees', (req, res) => {
    const { name, age, mobile, city, department, salary } = req.body;
    const newEmployee = {
        id: nextId++,
        name,
        age: parseInt(age, 10),
        mobile,
        city,
        department,
        salary: parseFloat(salary)
    };
    employees.push(newEmployee);
    res.status(200).json(newEmployee);
});

// 4. Update an Existing Employee
app.put('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = employees.findIndex((e) => e.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...req.body, id }; // Ensure ID remains immutable
        res.status(200).json({ success: true, employee: employees[index] });
    } else {
        res.status(200).json({ success: false, message: 'Employee not found' });
    }
});

// 5. Delete an Employee
app.delete('/api/employees/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    employees = employees.filter((e) => e.id !== id);
    res.status(200).json({ success: true, message: 'Employee deleted successfully' });
});

// 6. Get Compensation (Department & Salary) by Employee ID
app.get('/api/employees/compensation/:id', (req, res) => {
    const emp = findById(req.params.id);
    if (!emp) return res.status(200).json({ message: 'Employee not found' });
    res.status(200).json({
        department: emp.department,
        salary: emp.salary
    });
});

app.listen(PORT, () => {
    console.log(`Employee Management API running on http://localhost:${PORT}`);
});