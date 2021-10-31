# Am I Ok?  
  
	### Evaluate User's Blood Test Results  
#### Usage  
To compile and run the app on an android device do the following:  
- $ clone the repository  
- $ npm install  
- Connect Android device to your computer  
- $ npm run android  
  
The app was developed in React Native on Mac PC using the following:  
* macOS version 11.5.2  
* Android SDK version 30  
* npm version 8.1.1  
  
#### Screens / Components  
Single Page App with the following components:  
- MainSceen - controls user flow and other components  
- InputBloodTest - provides text input for Test Name and Test Result  
- BloodTestCategory -  
- Analyze user input using an external dataset  
- Identify the category of the test by parsing the Test name's free text  
- Evaluate the result value based on the test category and the resulting threshold  
- Inform the user whether their result is "Good!" (i.e. below threshold), "Bad!" (i.e. above threshold), or “Unknown” (i.e test not found in the dataset)  
  
  
  
#### Other files  
- AppStateContext - Application State Context  
- AppStateLogic - Manage App State Logic such as user input, network activity, etc,  
- InterfaceType - Interface between JSON response and Typescript data structure  
- WebServiceCall - handles rest api calls  
  
  
#### Logic Used for input analysis - Implementation details  
The app parses the Test Name into separate words and checks each word against each element of the dataset. The app scores each element in the dataset against the test name input. In case they are a few matches, the app selects the category which has the highest score. For example:  
If the user enters 'CHOLESTEROL-LDL' for the test name, the app evaluates the entry against 'HDL Cholesterol' and 'LDL Cholesterol' and scores the highest for the 'LDL Cholesterol' since both words in the test name was found vs. only one for 'HDL Cholesterol'.
