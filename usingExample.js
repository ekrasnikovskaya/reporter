const { Report } = require('./app');

const report = new Report('reportfolder', 'report.html')

report.startTheReport('This is a report example');
report.addSuccess('Lets pretend it all works');
report.addSuccess('And add another success message');
report.addMessage('This is just a message without any coloring');
report.addError('Oops! Something imaginary failed', 'blabla stacktrace', 'cover1.jpeg');
report.addSuccess('God I hope this works');
report.addEnding();
