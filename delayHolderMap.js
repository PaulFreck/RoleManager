const fs = require('fs')

module.exports = class delayHolderMap
{
    map = new Map(); //delay is stored in days
    
    constructor() 
    {
        var mapLine;
        const allContents = fs.readFileSync('output.txt', 'utf-8');
        mapLine = allContents.split(/\n|:/)
       // console.log(mapLine)
        if (mapLine.length > 0)
            for(let i = 0; i < mapLine.length; i += 2)
            {
                this.map.set(mapLine[i], mapLine[i+1])
            }
    }
    update() //function here that takes what's currently in the map structure and updates it. This should be done by what's currently in the text file as that's the easiest way to resolve state probably?
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
        this.map.set(element, delay * 1000 * 24 * 60 * 60 ) //days, hours, minutes, seconds, ms
                                    //
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
            result += "\n" + value + ":" + key 
        })
        fs.writeFile("output.txt", result, (error) =>{ if (error) throw error;})
        return true
        //private method that writes what we have to a txt file to remember it.
    }
};