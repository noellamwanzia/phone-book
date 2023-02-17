import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";
import { map, Observable } from "rxjs";
import { Contact } from "../models/contact.interface";

@Injectable({providedIn: "root"})

/**This constructor is responsible for performing
 * crud operations on the firestore DB.
 */
export class ContactService
{
  private contactCollectionRef: AngularFirestoreCollection<Contact>;

  private contacts$: Observable<Contact[]>

  constructor(private _db: AngularFirestore)
  {
    this.contactCollectionRef = this._db.collection<Contact>('contacts');

    //Get collection data including id to facilitate manipulation.
    this.contacts$ = this.contactCollectionRef.snapshotChanges().pipe(
                      map( data => data.map( contactPayload=> {
                        const contact = contactPayload.payload.doc.data() as Contact;
                        const id = contactPayload.payload.doc.id;
                        return { id, ...contact }
                      })));
  }

  /** Retrieve all contacts on the db */
  getContacts()
  {
    return this.contacts$;
  }

  /** Create new contact */
  addContact(contact: Contact)
  {
    return this.contactCollectionRef.add(contact);
  }

}