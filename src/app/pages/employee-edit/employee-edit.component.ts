import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
})
export class EmployeeEditComponent {
  empId: any;
  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}
  empForm: FormGroup = this.fb.group({
    name: [''],
    email: [''],
    phone: [''],
  });

  ngOnInit() {
    this.getEmployee();
  }
  getEmployee() {
    // this.activeRoute.paramMap.subscribe((params) => {
    //   this.empId = params.get('id');
    // });
    this.empId = this.activeRoute.snapshot.paramMap.get('id');
    this.empService.getEmployeeById(this.empId).subscribe((data) => {
      console.log(data);
      this.empForm.patchValue(data);
    });
  }

  onSubmit() {
    const newEmpData = this.empForm.value;
    this.empService.updateEmployee(this.empId, newEmpData).subscribe((data) => {
      if (data) {
        console.log('add success');
        this.router.navigate(['/employees']);
      }
    });
  }
}
