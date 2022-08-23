import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usersview',
  templateUrl: './usersview.component.html',
  styleUrls: ['./usersview.component.css']
})
export class UsersviewComponent implements OnInit {

  users:User[]=[{}]
  addform=false;
  updateform=false;
  name:string|undefined=''
  phone:number|undefined=0
  id:number|undefined=0
  constructor(private userSrevice:UserService) { }

  ngOnInit(): void {
    this.userSrevice.getUsers().subscribe((data:any)=>{this.users=data.value.result;console.log(this.users)})
  }

  Delete(id?:number){
    let updatedusers: any[]=[]
      this.userSrevice.DeleteUser(id).subscribe((data:any)=>{console.log(data.value.result)})
      for(let u of this.users){
        if(u.id===id){}
        else{
          updatedusers=[...updatedusers,u]
          this.users=updatedusers
          console.log(this.users)
        }
        if(updatedusers.length===0){this.users=[]}
      }
  }

  addUser(){
    this.addform=true;
  }

  updateUser(phone:number|undefined,name:string|undefined,id:number|undefined){
    this.updateform=true;
    this.name=name;
    this.phone=phone;
    this.id=id
  }

  changeview(ev:boolean){
    this.addform=ev;
    this.addform=false;
    this.updateform=false;
  }

  changeUsers(users:boolean){
   setTimeout(()=>{this.userSrevice.getUsers().subscribe((data:any)=>{this.users=data.value.result;console.log(this.users)})},750)
  }

}
