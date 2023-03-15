import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Email:string='Email';
  PWD:string='pwd';
  

  constructor(private http: HttpClient) { }


  ngOnInit(): void {

  }
  Login(Email:string,PWD:string):any  {
   
   
    var param = {email:Email,pwd:PWD}; 

    this.http.get<any>('http://localhost:53600/api/registerusers/'+Email+'/'+PWD).subscribe(data => {
       
    
     console.log(data);
     
      if(data.Status=='Error') { alert(data.Message);}
        else{
          localStorage.setItem("User",JSON.stringify(data));
          
          if(data.value.userType == 'Admin'){
            window.location.href="/adminDashboard";
          }else{
            window.location.href="/customerDashboard";
          }
          
        }
        
        
      });
 return false;

  }

}
function go(arg0: string) {
  throw new Error('Function not implemented.');
}

