import { CommonModule } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactModel } from '../my-api-service';
import { MyApiService } from '../my-api-service';
declare var bootstrap: any;

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, AfterViewChecked {
  contactForm!: FormGroup;
  isSubmitting = false;
  contactList: ContactModel[] = [];

  constructor(
    private fb: FormBuilder,
    private contactService: MyApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContacts();

    this.contactForm = this.fb.group({
      EmpFirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      EmpLastName: ['', [Validators.required, Validators.minLength(2)]],
      EmpAddress: ['', [Validators.required]],
      EmpProfile: ['', [Validators.required]]
    });
  }

  ngAfterViewChecked(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(item => new bootstrap.Tooltip(item));
  }

  loadContacts(): void {
    this.contactService.getAllContacts().subscribe({
      next: (result) => {
        this.contactList = result;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load contacts', error);
      }
    });
  }

  onSyncSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Please fill out all required fields properly before syncing.');
      return;
    }

    const payload: ContactModel = this.contactForm.value;
    this.isSubmitting = true;

    this.contactService.createContact(payload).subscribe({
      next: () => {
        this.loadContacts();
        alert('Data saved to local database successfully!');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Synchronization failed:', err);
        alert(err.error?.message || 'Error occurred during backend synchronization pipeline.');
        this.isSubmitting = false;
      }
    });
  }
}