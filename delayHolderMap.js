module.exports = class delayHolderMap
{
    map = new Map(); //delay is stored in days
    
    constructor(file) 
    {
        console.log(file);
        //read file in and create our collection. If empty console.log it 
    }
    add(element)
    {
        add(element, 7)
    }
    add(element, delay)
    {
        this.map.set(element, delay)
        write()
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
        //private method that writes what we have to a txt file to remember it.
    }
};