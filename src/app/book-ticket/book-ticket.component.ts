import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { FlightService } from '../flight.service';
import { Router } from '@angular/router';
import { Flight } from '../flight';
import { Booking } from '../booking';
import { FormGroup, FormControl, Validators} from '@angular/forms'; 

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent {
  form!: FormGroup;
  flight!: Flight;
  flights: Flight[] = [];
  flag:boolean = false;
  booking!: Booking;
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public bookingService: BookingService,
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
      userId: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      flightId: new FormControl('', [Validators.required]),
      flightName: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      departureDate: new FormControl('', [Validators.required])
    });
    this.flightService.getAll().subscribe((data: Flight[])=>{
      this.flights = data;
      console.log(this.flights);
    })
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
    this.flights.forEach(x => {
      if(x.flightId == this.form.value.flightId){
        this.flag = true;
        return;
      }
    });

    if(!this.flag){
      alert("Sorry, No flight exists with this id");
      this.form.reset();
    }

    this.flightService.find(this.form.value.flightId).subscribe((data: Flight)=>{
      console.log(data);
      this.flight = data;
    });

    if(window.confirm("You have to pay Rs." + this.flight.charges)){
      this.bookingService.create(this.form.value).subscribe((res:any) => {
        alert("Your booking has been successfully created.");
        console.log('Booking added successfully!');
        this.booking = res;
        this.router.navigateByUrl('ticket/'+this.booking.bookingId);
      })
     }else{
      alert("You have not made the payment.");
     }
    
  }
}
