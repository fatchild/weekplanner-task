import { JSONdb } from "./JSONdb";

export class Sessions{
    constructor(){
        // pull in data 
        this._db = new JSONdb()
        this.data = this._db.getData     
        
        // stats object
        this.stats = {
            totalSessions: 0,
            totalScheduledSessions: 0,
            totalUnscheduledSessions: 0,
        }

        // setup transaction id for long-polling, websockets too much overhead for this size of project
        this.transactionID = Date.now()
    }

    // 
    // initializer function
    // 
    _initializeJSON(jsonData){
        // commit the data being read in
        this._db.commitData = jsonData

        // make sure this object is up to date with that json data
        this.data = this._db.getData 

        console.log("data built")
    }

    // 
    // set transaction ID
    // 
    _setTransactionID(){
        this.transactionID = Date.now()
    }

    // 
    // build basic statistics object property
    // 
    buildStats(){
        // loop through all children and count length of array value
        for (const key in this.data) {
            this.stats.totalSessions += this.data[key].length
            if (key !== "Unscheduled") {
                this.stats.totalScheduledSessions += this.data[key].length
            }
        }
        this.stats.totalUnscheduledSessions = this.stats.totalSessions - this.stats.totalScheduledSessions
    }

    // 
    // getters for stats object, buildStats will need to be run first TODO: too tightly coupled?
    // 
    get totalSessions(){ return this.stats.totalSessions }
    get totalScheduledSessions(){ return this.stats.totalScheduledSessions }
    get totalUnscheduledSessions(){ return this.stats.totalUnscheduledSessions }


    // 
    // session helpers
    // 
    sessionsOnDay(day){ 
        return this.data[day] 
    }

    currentDayName(){
        let weekday = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format()
        return weekday
    }

    sessionsToday(){ 
        return this.sessionsOnDay(this.currentDayName())
    }

    // 
    // scheduling methods
    // 
    scheduleSession(fromWhere, fromIndex, toWeekday, toIndex){
        // get the session
        let session = this.data[fromWhere].splice(fromIndex, 1)[0]

        if (session && session.length > 0) {
            console.log(toIndex, "TO INDEX")

            // assign it to it's new array, if it has an index be specific, push() if not
            if (typeof toIndex === "number"){
                console.log(this.data[toWeekday], toWeekday)
                this.data[toWeekday].splice(toIndex, 0, session)
            } else {
                this.data[toWeekday].push(session)
            }

            // commit this back for persistance
            this._db.commitData = this.data

            // update the transaction ID
            this._setTransactionID()

            console.log("Session committed")
        }
        
    }

    // wrapper for the above for schedules only going into unscheduled
    unscheduleSession(fromWhere, fromIndex) { this.scheduleSession(fromWhere, fromIndex, "Unscheduled") }

    unscheduleAll(){
        for (const key in this.data) {
            if (key !== "Unscheduled") {
                // for each of the weekdays put all the sessions back into unscheduled
                let weekdaySessions = this.data[key].splice(0, this.data[key].length)
                let unscheduledSessions = this.data["Unscheduled"].concat(weekdaySessions)

                this.data["Unscheduled"] = unscheduledSessions
            }
        }
        this._db.commitData = this.data

        // update the transaction ID
        this._setTransactionID()
    }

    sessionCompleted(fromWhere, fromIndex, bool){
        this.data[fromWhere][fromIndex]["completed"] = bool

        // commit the data back to the JSONdb
        this._db.commitData = this.data

        // update the transaction ID
        this._setTransactionID()
    }

    sessionCompletedStatus(fromWhere, fromIndex) {
        if (this.data[fromWhere] && 
            this.data[fromWhere][fromIndex] && 
            this.data[fromWhere][fromIndex]["completed"] === true){
            console.log(true)
            return true
        } else {
            console.log(false)
            return false
        }
    }
}