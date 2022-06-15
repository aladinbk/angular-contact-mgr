import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { IContact } from 'src/app/models/IContact';
import { IGroup } from 'src/app/models/IGroup';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.css']
})
export class ViewContactComponent implements OnInit {
  public contactId : string | null = null;
  public loading: boolean=false;
  public contact: IContact = {} as IContact;
  public group: IGroup = {} as IGroup;
  public errorMessage : string | null = null;

  constructor(private activatedroute: ActivatedRoute, private contactservice:ContactService) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe((param : ParamMap)=>{
      this.contactId = param.get('contactId');
    });
    if(this.contactId){
      this.loading = true;
      this.contactservice.getContact(this.contactId).subscribe((data:any)=>{
      this.contact = data;
      this.loading = false;
      this.contactservice.getGroup(data).subscribe((data:any)=>{
        this.group = data;
      });
      },(error:any)=>{
        this.errorMessage = error;
        this.loading = false;
      });
    }
  }
  public isNotEmpty(){
    return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
  }

}
