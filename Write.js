const {exec} = require('child_process');

class Write {
	path_in;
	disk_out;

	constructor(path_in, disk_out) {
		this.path_in = path_in;
		this.disk_out = disk_out
	}

	buildCommand() {
		let cmdarr = [`if=${this.path_in}`, `of=/dev/${this.disk_out}`, `status=progress`]
		
		return cmdarr
	}

	executeCommand() {
		try {

		exec(this.buildCommand(), (error, stdout, stderr) => {
			if(error) {
				console.log('error');
			}
			if(stderr) {
				console.log('stderr')
			}
			console.log(stdout)
		})
	} catch(err) {
		console.log(err)
	}
	}
}

module.exports = Write;
