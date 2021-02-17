const {exec} = require('child_process')

class Disk {
    mntpt;
    size;
    path;
    constructor(diskStr) {
        this.size = this.getDiskSize(diskStr)
        this.mntpt = this.getMntPt(diskStr);
    }

    getDiskSize(diskStr) {
        let sizeRegex = /\d+\.?\d+[GMKT]/g
        return diskStr.match(sizeRegex);
    }
    getMntPt(diskStr) {
        let diskRegex = /\w{3,}\d?\w?\d?/g
        return diskStr.match(diskRegex); 
    }
    static async getDisks() {

        exec("lsblk", (error, stdout, stderr) => {
            let disks = []
            let mounts = []
            if(error ) {
                console.log('error');
            }
            if(stderr) {
                console.log('stderr')
            }
        
            stdout.split('\n').forEach((disk) => {
                if(disk.includes('disk')) {
                    let myDisk = new Disk(disk)
                    mounts.push(myDisk.mntpt[0])
                    disks.push(myDisk)	
                }
            })

            return {
                disks,
                mounts
            }
        })

    }

}

module.exports = Disk;