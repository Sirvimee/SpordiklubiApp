import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-create-registration',
  templateUrl: './create-registration.component.html',
  styleUrls: ['./create-registration.component.scss']
})

export class CreateRegistrationComponent implements OnInit {

  public packages: string[] = ["Kuukaart", "Kvartali kaart", "Aastane leping"];
  public genders: string[] = ["Mees", "Naine"];
  public goalList: string[] = [
    "Rasvapõletus", 
    "Kasvatada lihast", 
    "Tervislik eluviis",
    "Treeningkogemus",
    "Kulturism",
    "Kehatüübi muutus",
    "Fitness"
  ];

  public registerForm!: FormGroup;
  public userIdToUpdate!: number;
  public isUpdateActive: boolean = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private fb: FormBuilder, 
    private activatedRoute: ActivatedRoute,
    private api: ApiService, 
    private router: Router,
    private toastService: NgToastService
    ) { 
  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      id : [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      weight: [''],
      height: [''],
      bmi: [''],
      bmiResult: [''],
      gender: [''],
      requireTrainer: [''],
      packageType: [''],
      goal: [''],
      haveGymBefore: [''],
      packageStart: ['']
    });

    this.registerForm.controls['height'].valueChanges.subscribe((res) => {
      this.calculateBMI(res);
    })

    if(this.router.url.includes('update')) {
      this.activatedRoute.params.subscribe(value => {
        this.userIdToUpdate = value['id'];
        this.api.getUserById(this.userIdToUpdate)
        .subscribe((res: any) => {
          this.isUpdateActive = true;
          this.fillFormToUpdate(res);
        })
      })
    }

  }

  submit() {
    this.api.addUser(this.registerForm.value)
    .subscribe(res => {
      this.toastService.success({detail: "Success", summary :"Kasutaja lisatud", duration: 3000});
      this.registerForm.reset();
    })
  }

  update() {
    this.api.updateUser(this.registerForm.value, this.userIdToUpdate).subscribe(res => {
      this.toastService.success({detail: "Success", summary :"Kasutaja andmed on muudetud", duration: 3000});
      this.registerForm.reset();
      this.router.navigate(['list']);
    })

  }

  calculateBMI(heightValue: number) {
    const weight = this.registerForm.value.weight;
    const height = heightValue / 100;
    const bmi = weight / (height * height);
    this.registerForm.controls['bmi'].patchValue(bmi);
    switch (true) {
      case bmi < 18.5:
        this.registerForm.controls['bmiResult'].patchValue("Alakaal");
        break;
      case (bmi >= 18.5 && bmi <= 24.9):
        this.registerForm.controls['bmiResult'].patchValue("Normaalkaalus");
        break;
      case (bmi >= 25 && bmi <= 29.9):
        this.registerForm.controls['bmiResult'].patchValue("Ülekaal");
        break;
      
      default:
        this.registerForm.controls['bmiResult'].patchValue("Rasvunud");
        break;
    }
  }

  fillFormToUpdate(user: User) {
    this.registerForm.setValue({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      weight: user.weight,
      height: user.height,
      bmi: user.bmi,
      bmiResult: user.bmiResult,
      gender: user.gender,
      requireTrainer: user.requireTrainer,
      packageType: user.packageType,
      goal: user.goal,
      haveGymBefore: user.haveGymBefore,
      packageStart: user.packageStart
    })
  }

}
