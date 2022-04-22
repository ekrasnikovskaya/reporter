# toxic-reporter
Hello! I'm just a little module, which will help people and QA's to make more colorful html report after running all the tests. 

What I do?
- generate an HTML file, which contains of success or error messages. You can see an example if you copy the report folder to your computer and open 'report.html' in your browser

How to use me?
1) install the latest version of Toxic reporter by npm in you console:  
$ npm install toxic-reporter. 
2) import class Report in your script like. 
const { Report } = require('./app');  
3) Make a new report folder for your tests and name the report file:  
const report = new Report('reportfolder', 'toxic-report.html'). 
4) Add error or success messages to your new report, like:  
report.addSuccess('Yay, it worked!'); // adds green line which tells that test have passed.   
report.addError('Oops, something is wrong', 'Here is a stacktrace', 'optional-image.png'); /* when you add an error message, you can also give diagnostical info  like a stacktrace and a screenshot, which is very useful if you are running UI test with Puppeteer/Playwright */ 
report.addMessage('I am a line with no colors'); // adds just a text without any coloring.  
5) When all tests have passed, add a finishing part to your report:   
report.addEnding(); // it is not nessesary but it's a good style. 

- you can also see an example of usage in 'usingExample.js' with command 'node usingExample.js'.   
