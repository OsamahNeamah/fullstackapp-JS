import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {

    users:User[]=[]
    addUser!:FormGroup
    @Input() name:string|undefined=''
    @Input() phone:number|undefined=0
    @Input() id:number|undefined=0
    @Output() submitEvent:EventEmitter<boolean>=new EventEmitter()
    @Output() usersEvent:EventEmitter<boolean>=new EventEmitter()

    constructor(private builder:FormBuilder, private service:UserService) { }

    ngOnInit(): void {
      this.addUser=this.builder.group({
        name:this.name,
        phone:this.phone
      })
    }

    submit(){
      let users:any=[]
      let name= this.addUser.get('name')?.value
      let phone= this.addUser.get('phone')?.value
      let id=this.id
      this.service.updateUser(name,phone,id).subscribe((data:any)=>{users=data.value.result;})
      this.usersEvent.emit(true)
      this.submitEvent.emit(false)
    }
  }
