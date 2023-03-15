import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterFlightComponent } from './register-flight/register-flight.component';
import { SignupComponent } from './signup/signup.component';
import { TicketComponent } from './ticket/ticket.component';
import { ViewAllBookingsComponent } from './view-all-bookings/view-all-bookings.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';

const routes: Routes = [

  {path:"",component:IndexComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"customerDashboard",component:CustomerDashboardComponent},
  {path:"adminDashboard",component:AdminDashboardComponent},
  {path:"viewFlights",component:ViewFlightsComponent},
  {path:"viewProfile/:userId",component:ViewProfileComponent},
  {path:"editProfile/:userId",component:EditProfileComponent},
  {path:"bookTicket",component:BookTicketComponent},
  {path:"viewBookings",component:ViewBookingsComponent},
  {path:"viewAllBookings",component:ViewAllBookingsComponent},
  {path:"registerFlight",component:RegisterFlightComponent},
  {path:"ticket/:bookingId",component:TicketComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
