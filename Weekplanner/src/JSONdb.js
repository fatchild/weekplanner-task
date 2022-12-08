/*
 *
 * Data Storage
 *
 */

export class JSONdb {
    // 
    // consume the JSON and create a property containing the JSON data
    // 
    constructor (){
        // the id data will be stored locally with
        this.dataStorageId = "lattice-weekplanner"
        
        // Check if the user has visited before and if so use their locally stored data
        let localDataSet = (localStorage.getItem(this.dataStorageId) !== null);

        if (localDataSet) {
            // Local storage set so use this when manipulating and loading data
            this.data = JSON.parse(localStorage.getItem(this.dataStorageId));
        }
    }


    // 
    // setter for committing the data back to localStorage
    // args is the new data TODO: checking
    // 
    set commitData(data){
        // will be stored as a string
        localStorage.setItem(this.dataStorageId, JSON.stringify(data));
    }

    // 
    // Getter for retrieving the data back from localStorage
    // 
    get getData(){
        return JSON.parse(localStorage.getItem(this.dataStorageId))
    }
}