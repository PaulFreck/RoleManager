module.exports = class delayHolderMap
{
    map = new Map(); //delay is stored in days
    
    constructor(file) 
    {
        console.log(file);
        //read file in and create our collection. If empty console.log it 
    }
    add(element, delay)
    {
        if (delay == undefined)
        {
            delay = 7
        }
        this.map.set(element, delay * 1000) //days, hours, minutes, seconds, ms
        console.log(this.map)
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
        return true
        //private method that writes what we have to a txt file to remember it.
    }
};