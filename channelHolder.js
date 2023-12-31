const fs = require('fs')

module.exports = class channelHolder
{
    channels
    channel = [];
    constructor() 
    {
        const allContents = fs.readFileSync('channels.txt', 'utf-8');
        this.channel = allContents.split(/\n/)
    }
    add(forum)
    {
        this.channel.push(forum)
    }
    remove(forum)
    {
        var index = this.channel.indexOf(forum);
        if (index !== -1) {
            this.channel.splice(index, 1);
            return true
        }
        return false //implied else
    }
    contains(forum)
    {
       /* if (this.channel == undefined)
        {
            return false
        }*/
        return this.channel.includes(forum)
    }
    write()
    {
        var result = "";
        this.channel.forEach((key) => {
            result += "\n" + key 
        })
        fs.writeFile("channels.txt", result, (error) =>{ if (error) throw error;})
        return true
        //private method that writes what we have to a txt file to remember it.
    }
    update()
    {
        const allContents = fs.readFileSync('channels.txt', 'utf-8');
        this.channel = allContents.split(/\n/)
    }
}