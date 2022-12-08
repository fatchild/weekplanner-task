export const statistics = (sessions) => { 

    let totalSessions = sessions.stats.totalSessions
    console.log(sessions.stats)
    let sessionsCompleted = 0
    let minutesCompleted = 0
    for (let key in sessions.data){
        let sessionArray = sessions.data[key]
        for (let i = 0; i < sessionArray.length; i++){
            if (sessionArray[i]["completed"] && sessionArray[i]["completed"] === true) {
                // sessions already completed
                sessionsCompleted += 1
                // hours trained
                minutesCompleted += sessionArray[i]["length"]
            }
        }
    }

    // rest days 
    let restDays = 0
    let weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    const dayOfWeekName = new Date().toLocaleString('default', { weekday: 'long' })
    let weekdayIndex = weekdays.indexOf(dayOfWeekName) 

    for (let i = weekdayIndex-1; i >= 0; i--){
        if (sessions.data[weekdays[i]].length > 0) { break }
        console.log(sessions.data[weekdays[i]].length, weekdays[i], "2")
        restDays += 1
    }



    document.querySelector('#statistics').innerHTML = `
    <div class="d-flex flex-direction-row justify-content-between p-3 mt-2">
        <h1 class="text-white">Statistics</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand text-light ms-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrows-angle-contract text-light ms-2 d-none" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
        </svg>
    </div>
    <div class="box-module bg-blue">
        <div class="row g-3">
            <div class="col-lg-4">
                <div class="d-flex flex-column text-white stats-module">
                    <span class="w-100 h-100 text-center pb-3">Sessions Completed</span>
                    <h3 class="w-100 h-100 text-center">${sessionsCompleted}</h3>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="d-flex flex-column text-white stats-module">
                    <span class="w-100 text-center pb-3">Minutes Trained</span>
                    <h3 class="w-100 text-center">${minutesCompleted}</h3>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="d-flex flex-column text-white stats-module">
                    <span class="w-100 text-center pb-3">Rest Days</span>
                    <h3 class="w-100 text-center">${restDays}</h3>
                </div>
            </div>
        </div>
    </div>
    `
}