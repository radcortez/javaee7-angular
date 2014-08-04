# Java EE 7 - Angular - Sample Application #

## How to run ? ##

* You need JDK 7 or higher, Maven 3 and Wildfly 8 to run the application.

* Build the code using Maven with the command: `mvn clean install`.

* Copy the file javaee7-angular-1.0-SNAPSHOT.war from target directory to your Wildfly installation folder /standalone/deployments

* Start Wildfly and go to http://localhost:8080/javaee7-angular-1.0-SNAPSHOT/

## Javascript Package Management ##

* You need NPM. Please go to http://nodejs.org/download/ to get a copy.

* Once NPM is installed run the command `npm install`.

* Install Grunt `npm install -g grunt-cli`  for more information please go to http://gruntjs.com/getting-started.

* Run the command 'grunt' to download all the web dependencies and build an optimized version of the project.
