import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { FlightService } from '../flight.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Booking } from '../booking';
import { Flight } from '../flight';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  id!: number;
  flights: Flight[] = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(public bookingService: BookingService, public flightService: FlightService) { }

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    var x = localStorage.getItem("User");
    if (x) {
      this.id = JSON.parse(x).value.userId;
      console.log(this.id);
      this.bookingService.getAll().subscribe((data: Booking[]) => {
        this.bookings = data;
        console.log(this.bookings);
      })
    }
  }

  deleteBooking(bid: number) {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      this.bookingService.delete(bid).subscribe(res => {
        this.bookings = this.bookings.filter(item => item.bookingId !== bid);
        console.log('Booking deleted successfully!');
        alert("Your booking with booking id " + bid + " has been cancelled.");
        alert("Your money will be refunded within 2 days.");
        // location.href = "/customerDashboard";
      })
    } else {
        alert("Your booking is not cancelled.");
    }

  }
}
