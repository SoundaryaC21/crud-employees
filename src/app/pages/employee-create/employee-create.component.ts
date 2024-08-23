import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})
export class EmployeeCreateComponent {
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router
  ) {}

  empForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
  });

  onSubmit() {
    const newEmpData = this.empForm.value;
    this.empService.addEmployee(newEmpData).subscribe((data) => {
      if (data) {
        console.log('add success');
        this.router.navigate(['/employees']);
      }
    });
  }
}
