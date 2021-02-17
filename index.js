const { exec, spawn } = require('child_process');
const inquirer = require('inquirer')
const Disk = require('./Disk')
const Write = require('./Write')

let disks = []
let mounts = []
let myDisk;

Disk.getDisks();

exec("lsblk", (error, stdout, stderr) => {
	if(error ) {
		console.log('error');
	}
	if(stderr) {
		console.log('stderr')
	}

	stdout.split('\n').forEach((disk) => {
		if(disk.includes('disk')) {
			myDisk = new Disk(disk)
			mounts.push(myDisk.mntpt[0])
			disks.push(myDisk)	
		}
	})

const notNull = (input) => {
	if(input == '') {
		return 'Please enter a valid input'
	}
	if (input == null){
		return 'Please enter a valid input'
	}
	if(!input) {
		return 'Please enter a valid input'
	}
	return true
}
	inquirer.prompt([{
		type: "list", name: 'disksel', message: 'Choose Your disk', choices: mounts, validate: notNull
	},
	{type: 'input', name: 'imgpath', message: 'Input the path to your image', validate: notNull},

	]).then(result => {
		let {imgpath, disksel} = result
		imgpath = imgpath.replace(/\'/g, "")
		let command = new Write(imgpath, disksel).buildCommand();
		inquirer.prompt([
			{type: "list", name: "confirm", message: `Are you sure you want to execute the command "dd ${command}"? This action cannot be undone.`, choices: ['yes', 'no']}
		]).then(result => {
			if(result.confirm == 'yes') {
				const dd = spawn('dd', command)
				dd.stdout.on('data', (data) => {
					console.clea
					console.log(`${data}` + "\r\033[K")
				})

				dd.stderr.on('data', (data) => {
					console.error(`stderr: ${data}`);
				  });
				  
				  dd.on('close', (code) => {
					console.log(`child process exited with code ${code}`);
				  });

			}
			else {
				console.log('bye')
			}
		})
	})

});
