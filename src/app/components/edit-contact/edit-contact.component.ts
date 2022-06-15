import { Component, OnInit } from '@angular/core';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';
import { ActivatedRoute,ParamMap, Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {
  public loading : boolean = false;
  public contactId: string | null = null;
  public contact : IContact = {} as IContact;
  public errorMessage: string | null = null;
  public groups: IGroup[] = [] as IGroup[];
  constructor(private activatedroute:ActivatedRoute, private contactservice: ContactService, private route: Router) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedroute.paramMap.subscribe((param : ParamMap)=>{
    this.contactId = param.get('contactId');
    });
    if(this.contactId){
      
      this.contactservice.getContact(this.contactId).subscribe((data:any)=>{
      this.contact = data;
      this.loading = false;  
      this.contactservice.getAllgroups().subscribe((data:any)=>{
        this.groups = data;
      });
    },(error:any)=>{
       this.errorMessage = error;
       this.loading = false;
    })
    }
  }
  SubmitUpdate(){
    if(this.contactId){
      this.contactservice.updateContact(this.contact, this.contactId).subscribe((data:IContact[])=>{
        this.route.navigate(['/']).then();
      },(error:any)=>{
        this.errorMessage = error;
        this.route.navigate(['/contacts/edit/${this.contactId}']).then();
      })
    }
  }

}
