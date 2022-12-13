const fs = require('fs');

class Report {
    constructor(directory, file) {
        this.directory = directory;
        this.file = `${directory}/${file}`;
    }
    getTime() {
        const ts = Date.now();

        const dateString = new Date(ts).toLocaleString('ru', {
             timeZone: 'Europe/Moscow',
        });

        const date = dateString.split(', ')[0];
        const time = dateString.split(', ')[1];

        return [date, time];
    }
    randomID() {
        return Math.random()
        .toString(36)
        .substring(2, 15);
    }
    addLine() {
        this.addToFile('\n<hr>');
    }
    // appends file with new lines
    addToFile(lines) {
        fs.appendFileSync(
            this.file, lines,
            function(err) {
              if (err) {
                return console.log(err);
              }
              console.log('err');
            },
          );
    }
    // writes new file 
    startTheReport(title) {
        if (!fs.existsSync(this.directory)){
            fs.mkdirSync(this.directory); // remove previous folder
        }
        if (fs.existsSync(this.file)) {
            fs.unlinkSync(this.file); // remove previous file
        }     
        if (this.file)
        this.addToFile(`<!DOCTYPE html>\n
        <html>\n
        <head>\n
        <title>
        ${title}
        </title>\n
        <script>
        function hideAndShow(id) {
            var x = document.getElementById(id);
            if (x.style.display === "none") {
              x.style.display = "block";
            } else {
              x.style.display = "none";
            }
          }
        </script>
        <style>
        button {
            background-color: #33b1eb; 
            border-radius: 8px;
            color: #1a5c7a;
            padding: 10px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            transition-duration: 0.4s;
            
          } 
        .show-image {
        background-color: #d1eefc;
        border: 2px solid #7ab2cc;
        color: #5d9cb9;
        }
        .show-error {
        background-color: #ade6ad;
        border: 2px solid #62b15b;
        color: #4f9948;
        }
        .show-image:hover {
          background-color: #7ab2cc;
          color: rgb(17, 51, 83);
        }
        .show-error:hover {
        background-color: #62b15b;
        color: rgb(17, 51, 83);
        }
        img {
          max-width: 70%;
          height: auto;
          border-radius: 8px;
        }
        h3 {
          font-family: Arial, Helvetica, sans-serif;
          color: #5d9cb9;
        }
        .message {
          font-family: Arial, Helvetica, sans-serif;
        }
        .message.error {
          color: #ac2121;
        }
        .message.success {
          color: #4f9948;
        }
        </style>
        </head>\n
        <body>\n
        <link rel="stylesheet" href="style.css">
        <p><h3>Started the testing</h3></p>\n
        <p><h3>${this.getTime()[0]}</h3></p><hr>`);
    }
    // adds an error message to body with displayable stacktrace and optional screenshot
    addError(message, stacktrace, image=undefined) {
        const idStacktrace = this.randomID();
        const idScreenshot = this.randomID();
        this.addToFile(
            `\n<p><div class="message error">${this.getTime()[1]} ${message}</div></p>\n`);
        // add buttons and diagnostic stuff, don't touch for God's sake
        if (image !== undefined) {
            this.addToFile(
            `\n<p><button class="show-error" onclick="hideAndShow('${idStacktrace}')">See stacktrace</button>
            <button class="show-image" onclick="hideAndShow('${idScreenshot}')">See screenshot</button></p>
            \n<div id="${idStacktrace}" class ="message" style="display: none">
                <p>${stacktrace}</p>
                </div>
                \n<div id="${idScreenshot}" style="display: none">
                 <p><img src="${image}"></p>
                 </div>`);
        } else {
            this.addToFile(
                `\n<button class="show-error" onclick="hideAndShow('${idStacktrace}')">See stacktrace</button>
                \n<div id="${idStacktrace}" class ="message" style="display: none">
                <p>${stacktrace}</p>
                </div>`);
        }
    }
     // says that test passed
    addSuccess(message) {
        this.addToFile(`\n<p><div class="message success">${this.getTime()[1]} 
        ${message} &#9989;</div></p>`)
    }
    // add a line with no coloring
    addMessage(message) {
        this.addToFile(`\n<p><div class="message">${this.getTime()[1]} 
        ${message}</div></p>`)
    }
    // just adds ending
    addEnding() {
        this.addToFile('\n</body>\n</html>');
    }
}

module.exports = { Report };