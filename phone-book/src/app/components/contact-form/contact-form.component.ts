import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent  implements OnInit
{
  contactForm: FormGroup; 

  diameter = 20;

  isLoading: boolean;

  isDisabled: boolean;

  constructor(private _fb: FormBuilder,
              private _router: Router,
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
    this.isLoading = true;

    this.isDisabled = true;

    this._contactService.addContact(contactForm.value)
                          .then(res => {
                            this.isLoading = false;
                            this.isDisabled = false;

                            //redirect to home page once successfull
                            this._router.navigate(['/'])
                          });
  }

  cancel()
  {
    this._router.navigate(['/'])
  }
}
