# Java EE 7 - Angular - Sample Application #

## Blog posts ##

* [Java EE 7 with Angular JS – Part 1](http://www.radcortez.com/java-ee-7-with-angular-js-part-1)

* [Java EE 7 with Angular JS – CRUD, REST, Validations – Part 2](http://www.radcortez.com/java-ee-7-with-angular-js-crud-rest-validations-part-2)

* [Codenvy setup to demo applications using Docker: Java EE 7 with Angular](http://www.radcortez.com/codenvy-setup-to-demo-applications-using-docker-java-ee-7-with-angular/)

* [Java EE 7 with Angular Demo](https://codenvy.com/f?id=ybnr6nsyrimeoyhg)

## How to run ? ##

* You need JDK 7 or higher, Maven 3 and Wildfly 8 or Glassfish 4.1 to run the application.

* Build the code using Maven with the command: `mvn clean install`.

* ## Deploy in the Wildfly 8 ##

  * Copy the file javaee7-angular-3.4.war from target directory to your Wildfly installation folder /standalone/deployments

  * You can also deploy the app, using Maven Wildfly Plugin with the following command: `mvn wildfly:deploy`. You need to have Wildfly running.

  * Start Wildfly 8 and go to http://localhost:8080/javaee7-angular-3.4/

* ## Deploy in the Glassfish 4.1 ##

  * Open Admin Console (http://localhost:8484/)
  
  * Go to menu "Application" 
  
  * In the button "Deploy..." select the file javaee7-angular-3.4.war
   
  * Go to http://localhost:8080/javaee7-angular-3.4/

## Javascript Package Management (optional) ##

* The required JS libraries are included in the project, but it also possible to manage them with the next steps.

* You need NPM. Please go to http://nodejs.org/download/ to get a copy.

* Once NPM is installed run the command `npm install`.

* Install Grunt `npm install -g grunt-cli`  for more information please go to http://gruntjs.com/getting-started.

* Run the command 'grunt' to download all the web dependencies and build an optimized version of the project.
