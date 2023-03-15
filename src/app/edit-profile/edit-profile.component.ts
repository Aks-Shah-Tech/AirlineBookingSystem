import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId!: number;
  user!: User;
  id!:number;
  form!: FormGroup;
  users: User[] = [];
    
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router
   ) { }
    
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.userId = this.route.snapshot.params['userId'];
        console.log(this.userId);
    this.userService.find(this.userId).subscribe((data: User)=>{
      console.log(data);
      this.user = data;
    });

    this.userService.getAll().subscribe((data: User[])=>{
      this.users = data;
      console.log(this.users);
    });

    this.form = new FormGroup({
      userId: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      userType: new FormControl('', Validators.required)
    });
  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    if(this.form.value.password != this.form.value.confirmPassword){
      alert("Password and Confirm Password should be same.");
    }
    this.userService.update(this.userId, this.form.value).subscribe((res:any) => {
         console.log('User updated successfully!');
         alert("Profile updated successfully!");
         this.router.navigateByUrl('/customerDashboard');
    })
  }

  deleteProfile(uid:number){
    this.userService.delete(uid).subscribe(res => {
         this.users = this.users.filter(item => item.userId !== uid);
         console.log('Profile deleted successfully!');
         alert('Profile deleted successfully!');
         localStorage.removeItem("User");
        location.href = "/login";
    })
}
}
