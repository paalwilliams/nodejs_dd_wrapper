const { exec, spawn } = require('child_process');
const inquirer = require('inquirer')
const Disk = require('./diskutils/Disk')
const Write = require('./diskutils/Write')
const notNull = require('./prompt/validate')
const getQuestions = require('./prompt/questions');

Disk.getDisks().then(({disks, mounts}) => {	

	const questions = getQuestions(mounts, notNull);
		
	inquirer.prompt(questions).then(result => {
		let {imgpath, disksel, rdisk, output} = result
		imgpath = imgpath.replace(/\'/g, "")
		let w = new Write(imgpath, disksel, rdisk, output)
		let command = w.buildCommand();
		inquirer.prompt([
			{type: "confirm", name: "confirm", message: `Are you sure you want to execute the command "dd ${command}"? This action cannot be undone.`, default: false}
		]).then(result => {
			if(result.confirm) {
				w.executeCommand().then((x) => {
					console.log(`dd: ${dd} x: ${x}`)
				})
			}
			else {
				console.log('bye')
			}
		})
	})
	}).catch(e => console.log(e))