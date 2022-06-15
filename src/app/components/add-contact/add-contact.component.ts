import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {
  public loading:boolean=false;
  public contact: IContact ={} as IContact;
  public errorMessage: string | null =null;
  public groups: IGroup[] = [] as IGroup[]; 
  constructor(private contactservice: ContactService, private route:Router) { }

  ngOnInit(): void {
  this.contactservice.getAllgroups().subscribe((data:IGroup[])=>{
    this.groups = data; 
  },(error:any)=>{
    this.errorMessage = error;
  });
  }
  CreateSubmit(){
    this.contactservice.createContact(this.contact).subscribe((data:IContact[])=>{
      this.route.navigate(['/']).then();
    },(error:any)=>{
      this.errorMessage = error;
      this.route.navigate(['/contacts/add']).then();
    })
  }

}
