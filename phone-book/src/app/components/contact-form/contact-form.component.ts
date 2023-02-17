import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent  implements OnInit
{
  contactForm: FormGroup; 

  constructor(private _fb: FormBuilder,
              private _contactService: ContactService)
  {}

  ngOnInit(): void 
  {
    this.contactForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      phone: ['', Validators.required],
      address: [''],
      email: ['', Validators.email]
    })
  }

  createContact(contactForm: FormGroup)
  {
    this._contactService.addContact(contactForm.value)
                          .then(res => console.log(res));
  }
}
