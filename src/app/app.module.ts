import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ViewFlightsComponent } from './view-flights/view-flights.component';
import { SignupComponent } from './signup/signup.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { ViewAllBookingsComponent } from './view-all-bookings/view-all-bookings.component';
import { RegisterFlightComponent } from './register-flight/register-flight.component';
import { TicketComponent } from './ticket/ticket.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    NavbarComponent,
    CustomerDashboardComponent,
    AdminDashboardComponent,
    ViewFlightsComponent,
    SignupComponent,
    ViewProfileComponent,
    EditProfileComponent,
    BookTicketComponent,
    ViewBookingsComponent,
    ViewAllBookingsComponent,
    RegisterFlightComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
