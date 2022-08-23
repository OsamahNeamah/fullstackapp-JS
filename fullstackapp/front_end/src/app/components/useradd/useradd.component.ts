import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-useradd',
  templateUrl: './useradd.component.html',
  styleUrls: ['./useradd.component.css']
})
export class UseraddComponent implements OnInit {

  users:User[]=[]
  addUser!:FormGroup
  @Output() submitEvent:EventEmitter<boolean>=new EventEmitter()
  @Output() usersEvent:EventEmitter<boolean>=new EventEmitter()

  constructor(private builder:FormBuilder, private service:UserService) { }

  ngOnInit(): void {
    this.addUser=this.builder.group({
      name:'',
      phone:''
    })
  }

  submit(){
    let users:any=[]
    let name= this.addUser.get('name')?.value
    let phone= this.addUser.get('phone')?.value
    this.service.AddUser(name,phone).subscribe((data:any)=>{users=data.value.result;})
    this.usersEvent.emit(true)
    this.submitEvent.emit(false)
  }

}
