import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from "@angular/router";
declare var bootstrap: any;

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit, AfterViewChecked {
  contactForm!: FormGroup;
  isSubmitting = false;
  contactList: any[]= []


  constructor(
    private fb: FormBuilder,
    private http: HttpClient, // In production, move this to a dedicated contact.service.ts
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllContact();

    // Initialize the Form Group with corresponding validators
    this.contactForm = this.fb.group({
      EmpFirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      EmpLastName: ['', [Validators.required, Validators.minLength(2)]],
      EmpAddress: ['', [Validators.required]],
      EmpProfile: ['', [Validators.required]]
      //MobilePhone: ['', [Validators.pattern('^[0-9]{10,15}$')]] // Optional but validated if typed
    });
  }

  ngAfterViewChecked() {
    // Select all elements with data-bs-toggle="tooltip" and initialize them
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  }

  getAllContact() {
    this.http.get("https://localhost:7086/api/ContactDetails").subscribe({
      next: (result:any) => {
        this.contactList = result;
        console.log(this.contactList.length);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log("test");
      }
    })
  }

  // Submit trigger method called from HTML
  onSyncSubmit(): void {
    // 1. Mark all controls as touched to trigger CSS validation highlights immediately
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Please fill out all required fields properly before syncing.');
      return;
    }

    // 2. Fetch data fields payload from the form structure cleanly
    const payload = this.contactForm.value;
    console.log('Valid Payload Prepared for Backend Integration:', payload);

    this.isSubmitting = true;

    // 3. Post data payload to your backend Web API endpoint
    const backendUrl = 'https://localhost:7086/api/ContactDetails'; 
    this.http.post(backendUrl, payload).subscribe({
      next: (response: any) => {
        this.getAllContact();
        alert('Data saved to local database successfully!');
        this.contactForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        console.error('Synchronization failed due to schema drift or server down:', err);
        alert(err.error?.message || 'Error occurred during backend synchronization pipeline.');
        this.isSubmitting = false;
      }
    });
  }
    

}
