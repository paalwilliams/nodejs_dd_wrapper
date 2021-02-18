const {exec} = require('child_process');
const { resolve } = require('path');

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

    static getDisks() {
        return new Promise((resolve, reject) => {
            exec('lsblk', (error, stdout, stderr) => {
                if(error) {
                    reject(error)
                    return;
                }
                let diskArr = stdout.split('\n');
                let disks = [];
                let mounts = []
                diskArr.forEach((diskstr) => {
                    if(diskstr.includes('disk')) {
                        let myDisk = new Disk(diskstr)
                        disks.push(myDisk);
                        mounts.push(myDisk.mntpt[0])
                    }
                })
                resolve({disks, mounts});
            })
        })
    }

}

module.exports = Disk;