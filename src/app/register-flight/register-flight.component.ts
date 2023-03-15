import { Component, OnInit } from '@angular/core';
import { FlightService } from '../flight.service';
import { Router } from '@angular/router';
import { Flight } from '../flight';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register-flight',
  templateUrl: './register-flight.component.html',
  styleUrls: ['./register-flight.component.css']
})
export class RegisterFlightComponent implements OnInit {
  form!: FormGroup;
  flight!: Flight;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public flightService: FlightService,
    private router: Router
  ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.form = new FormGroup({
      flightName: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      destination: new FormControl('', Validators.required),
      departuredate: new FormControl('', Validators.required),
      charges: new FormControl('', Validators.required),
    });
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log(this.form.value);
    this.flightService.create(this.form.value).subscribe((res:any) => {
      alert("Flight has been successfully registered.");
      console.log('Flight added successfully!');
      this.form.reset();
  })
}
}
