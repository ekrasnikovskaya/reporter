const {Report} = require('./app');

const report = new Report('./report/toxic-report.html')

report.startTheReport('Toxic', 'button.js', 'style.css');
report.addSuccess('Lets pretend it all works');
report.addSuccess('And add another success message');
report.addError('Oops! Something imaginary failed', 'blabla stacktrace', 'cover1.jpeg');
report.addSuccess('God I hope this works');
report.addEnding();
