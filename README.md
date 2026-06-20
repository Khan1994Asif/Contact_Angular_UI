# ContactSyncUI
This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.16.

## Created one Contact component and added form and list view in it. 
On button click checking and validating the user's input other showing error. 
In syncstatus column adding i button on hovering it showing the required data or success failure messages.
<img width="1896" height="622" alt="image" src="https://github.com/user-attachments/assets/76609b40-ea40-480d-b9df-8a9c50030716" />

## Developer console to check Contact Object at salesforce
Open the the Developer console and use below query to check synced record.
Query : SELECT Id,SQL_Id__c, EmpFirstName__c, EmpLastName__c, EmpAddress__c FROM Contact WHERE Id= '003g500000MhzrfAAB'
<img width="1917" height="522" alt="image" src="https://github.com/user-attachments/assets/f7abcc83-1cbb-4fef-a8f3-890d49be25c6" />



## Run frontend project on your own local with below steps
Download zip and extract it your folder. 
Open in VS code and than run below command:
```bash
Remove-Item -Recurse -Force node_modules, package-lock.json;
npm cache clean --force
npm install
ng build
```
To start a local development server, run:
And than configure local URL in backend to allow UI to communicate.
http://localhost:4200/contact
```bash
ng serve -o
```

