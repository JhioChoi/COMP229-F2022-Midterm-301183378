/*
File Name: employees.js
Author's name: Jiho Choi
StudentID: 301183378
Web App name: Employee Information
*/

// modules required for routing
const { RSA_NO_PADDING } = require("constants");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the employee model
let employee = require("../models/employees");

/* GET employee List page. READ */
router.get("/", (req, res, next) => {
  // find all employee in the employee_detail collection
  employee.find((err, employees) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("employees/index", {
        title: "Emplyoees",
        employees: employees,
      });
    }
  });
});

// add part start
//  GET the Employee Details page in order to add a new employee
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("employees/add", {title : "add employee"});

});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newEmployee = employee({
    "Employeeid": req.body.employeeid,
    "Employeename": req.body.employeename,
    "Department": req.body.department,
    "Designation": req.body.designation,
    "Salary": req.body.salary,
  });

  employee.create(newEmployee, (err, employee) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }else
    {
      res.redirect('/employees');
    }
  })
});
// add part end

// edit part start
// GET the Employee Details page in order to edit an existing Employee
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;

  employee.findById(id, (err, editedEmployee) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }else
    {
      res.render('employees/details', {title : "Edit Employee", employee : editedEmployee});
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;

   let updateEmployee = employee({
    "_id" : id,
    "Employeeid": req.body.Employeeid,
    "Employeename": req.body.Employeename,
    "Department": req.body.Department,
    "Designation": req.body.Designation,
    "Salary": req.body.Salary,
  });

  employee.updateOne({_id : id}, updateEmployee, (err) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }else
    {
      res.redirect('/employees');
    }
  })

});
// edit part end

// delete part start
// GET - process the delete by specific employeename
router.get("/delete/employ/employee2", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

   employee.deleteOne({Employeename : "employee2"},(err)=>{
    if(err)
      {
        console.log(err);
        res.end(err);
      }else
      {
        res.redirect('/employees');
      }
  });
});
// delete part end

module.exports = router;

