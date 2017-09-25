
# MsgTrans (Message Transmission)   
Angular Web App that demos network message transmission   
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.  

## Functionality and Notes: 
This application takes in a string that the user inputs and triggers a simulation of traversing the 7 layers of the OSI (Open System Interconnection) model.
The string is converted to binary and this binary, which is currently only displayed at the data link and physical layers (at least for now).  After three progress bars signifying signal transmission completes, the simulation continues back up the 7 layers of the other modeled machine.  The message is finally displayed as if it had reach the application layer of the targeted address.  

## What is Missing:
The encapsulation that takes place ate each level needs to be more thoroughly modeled.  The decision to use popover windows to display these various encapsulations has proven less than optimal and limiting in terms of extensibility and formatting.  

There should be a digital binary signal displayed after the binary message leaves the physical layer and before the modulator begins to function.  

An analog signal should be displayed from the modulator to the demodulator using binary frequency shift keying to display a sine wave of the appropriate modulation.  

## Bugs: 
For a currently unkown reason, the binary translation of the first string passed in does not get reset to the next string being passed in, therefore it is nessecary to refresh the browser screen before each iteration in order to view the correct binary translation of the message. 

## Node Modules 
Several modules where installed via the npm (node project manager).  These module dependancies are not included in this repo, therefore it will be necessary to install them locally to run this application.  



## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
=======
