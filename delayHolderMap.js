const fs = require('fs')

module.exports = class delayHolderMap
{
    map = new Map(); //delay is stored in days
    
    constructor(file) 
    {
        var mapLine = "";
        const allContents = fs.readFileSync('output.txt', 'utf-8');
        mapLine = allContents.split(/\n|:/)
       // console.log(mapLine)
        if (mapLine.length > 0)
            for(let i = 1; i < mapLine.length; i += 2)
            {
                this.map.set(mapLine[i], mapLine[i+1])
            }


    }
    add(element, delay)
    {
        if (delay == undefined)
        {
            delay = 7
        }
        this.map.set(element, delay * 1000) //days, hours, minutes, seconds, ms
       // console.log(this.map)
        this.write()
    }
    changeDelay(element, newDelay)
    {
        add(element, newDelay)
    }
    get(element) //returns the delay of that element
    {
        return this.map.get(element)
    }
    write()
    {
        var result = "";
        this.map.forEach((key, value) => {
            result += "\n" + value + ":" + key //easier to throw out the first line than the last line
        })
        fs.writeFile("output.txt", result, (error) =>{ if (error) throw error;})
        return true
        //private method that writes what we have to a txt file to remember it.
    }
};