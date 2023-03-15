import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FlightService } from '../flight.service';
import { Flight } from '../flight';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-view-flights',
  templateUrl: './view-flights.component.html',
  styleUrls: ['./view-flights.component.css']
})
export class ViewFlightsComponent implements OnInit {
  // flights:any;
  IsAdmin:boolean=false;
  id!:number;
  flights: Flight[] = [];
  form!: FormGroup;

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {

    // this.dataService.sendGetRequest().subscribe((data: any)=>{
    //   console.log(data);
    //   this.flights = data;
    // }) 

    var x = localStorage.getItem("User");
   if(x){
    this.IsAdmin=JSON.parse(x).value.userType=='Admin';
      this.id = JSON.parse(x).value.userId;
      console.log(this.id);
      this.flightService.getAll().subscribe((data: Flight[])=>{
        this.flights = data;
        console.log(this.flights);
      })  
    }

    this.form = new FormGroup({
      source: new FormControl('', [Validators.required]),
      destination: new FormControl('', [Validators.required])
    });
    
  }

  get f(){
    return this.form.controls;
  }

  deleteFlight(fid:number){
    this.flightService.delete(fid).subscribe(res => {
         this.flights = this.flights.filter(item => item.flightId !== fid);
         console.log('Flight deleted successfully!');
         alert('Flight deleted successfully!');
    })
}

submit(){
  console.log(this.form.value);
  
  this.flights = this.flights.filter(x => x.source == this.form.value.source && x.destination == this.form.value.destination);
  if(this.flights.length == 0){
    alert("Sorry there is no flight registered with this source and destination.");
  }else{
    console.log(this.flights);
  }
}

reset(){
  this.flightService.getAll().subscribe((data: Flight[])=>{
    this.flights = data;
    console.log(this.flights);
  })
  this.form.reset();
}

  
}
