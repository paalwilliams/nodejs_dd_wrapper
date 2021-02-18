const { exec, spawn } = require('child_process');

class Write {
	pathIn;
	diskOut;
	showProgress;

	constructor(pathIn, diskOut, showProgress) {
		this.pathIn = pathIn;
		this.diskOut = diskOut
		this.showProgress = showProgress
	}

	buildCommand() {
		try {
			// Initialize options array to output
			let options = []

			if(!this.pathIn) {
				throw "Input path required.";
			}

			options.push(`if=${this.pathIn}`)

			if(!this.diskOut) {
				throw "Output disk required";
			}

			options.push(`of=/dev/${this.diskOut}`)

			// Display progress output in console
			if(this.showProgress) {
				options.push(`status=progress`);
			}

			return options
		}
		catch(err) {
			console.log(err)
		}
	}

	executeCommand() {
		console.log(this.buildCommand())
		return new Promise((resolve, reject) => {

            let dd = spawn('dd', this.buildCommand());

			dd.stdout.on('data', (data) => {
				resolve(`data: ${data}`)
			  });
			  
			  dd.stderr.on('data', (data) => {
				console.error(`stderr: ${data}`);
			  });
			  
			  dd.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
			  });
        })
	}
}

module.exports = Write;
