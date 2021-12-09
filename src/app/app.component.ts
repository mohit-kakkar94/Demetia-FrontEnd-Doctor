import { Component, OnInit } from '@angular/core';
import { Patient } from './patient';
import { PatientService } from './patient.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public patients: Patient[];

  title = 'Dementia-FrontEnd-Doctor';

  constructor(private patientService: PatientService){}

  ngOnInit() {
    this.getPatients();
  }

  public getPatients(): void {
    this.patientService.getAllPatientInQ().subscribe(
      (response: Patient[]) => {
        this.patients = response;
        console.log(this.patients);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddPatient(addForm: NgForm): void {
    document.getElementById('add-patient-form').click();
    this.patientService.addVisitDetails(addForm.value).subscribe(
      (response: string) => {
        console.log(response);
        this.getPatients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdatePatient(addForm: NgForm): void {
    document.getElementById('add-patient-form').click();
    this.patientService.addVisitDetails(addForm.value).subscribe(
      (response: string) => {
        console.log(response);
        this.getPatients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Patient[] = [];
    for (const patient of this.patients) {
      if (patient.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || patient.uhid.toLowerCase().indexOf(key.toLowerCase()) !== -1 {
        results.push(patient);
      }
    }
    this.patients = results;
    if (results.length === 0 || !key) {
      this.getPatients();
    }
  }

}
