import { Component, OnInit } from '@angular/core';

import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { Contact } from 'src/app/models/contact.interface';

import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})

export class ContactTableComponent implements OnInit 
{

  displayedColumns: string[] = ['name', 'actions'];

  dataSource: MatTableDataSource<Contact> = new MatTableDataSource();

  constructor(private _contactService: ContactService,
              private _router: Router){}

  ngOnInit(): void {
    const contacts$ = this._contactService.getContacts();

    //set mat table data
    contacts$.subscribe(contacts => this.dataSource.data = contacts);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteContact(contactId: string)
  {
    this._contactService.deleteContact(contactId)
                          .then(res => console.log('Contact successfully deleted.'))
                          .catch(res => console.log('Ooops, something went wrong'))
  }

  addContact()
  {
    this._router.navigate(['contact-form'])
  }

}