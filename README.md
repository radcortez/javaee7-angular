# Java EE 7 - Angular - Sample Application #

## How to run ? ##

* You need JDK 7 or higher, Maven 3 and Wildfly 8 to run the application.

* Build the code using Maven with the command: `mvn clean install`.

* Copy the file javaee7-angular-1.0-SNAPSHOT.war from target directory to your Wildfly installation folder /standalone/deployments

* Start Wildfly and go to http://localhost:8080/javaee7-angular-1.0-SNAPSHOT/

## New Stuff ##

* Install NPM `npm install -g npm-install` for detailed information please go to https://www.npmjs.org/package/npm-install
* Once NPM is installed run `npm install` to load all dependencies defined on package.json; A node_modules folder will be created.

* Install Bower `npm install -g bower` for detailed information please go to https://github.com/bower/bower
* Once Bower is installed run `bower install` to load all dependencies defined on bower.json. A web_app\lib\bower\ folder will be created.

* Install Grunt `npm install -g grunt-cli`  for more information please go to http://gruntjs.com/getting-started
* Once Grunt is installed run `grunt`.