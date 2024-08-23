import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent {
  employees: any = [];
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      console.log(res);
      this.employees = res;
    });
  }
  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.getEmployeeList();
    });
  }
  addEmployee() {
    this.router.navigate(['/create']);
  }
  editEmployee(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
