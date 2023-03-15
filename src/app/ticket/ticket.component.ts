import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { FlightService } from '../flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking';
import { Flight } from '../flight';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  bookings: Booking[] = [];
  id!: number;
  flights: Flight[] = [];
  bookingId!: number; 
  booking!: Booking;
  flight!: Flight;
  toggled: boolean = false;
  dt!: string;
  tm!: string;

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public bookingService: BookingService, public flightService: FlightService, private route: ActivatedRoute) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {

    this.bookingService.getAll().subscribe((data: Booking[]) => {
      this.bookings = data;
      console.log(this.bookings);
    })

    this.bookingId = this.route.snapshot.params['bookingId'];
        console.log(this.bookingId);
    this.bookingService.find(this.bookingId).subscribe((data: Booking)=>{
      console.log(data);
      this.booking = data;
      
      const dte = new Date(data.departureDate);
      this.dt = dte.toLocaleDateString('en-GB');
      this.tm = dte.toLocaleTimeString();
    });

    console.log(this.booking.flightId)
    
  }

  submit(){

    console.log("button clicked")

    this.flightService.find(this.booking.flightId).subscribe((data: Flight)=>{
      console.log(data);
      this.flight = data;
    });
    this.toggled = !this.toggled;
  }
}
