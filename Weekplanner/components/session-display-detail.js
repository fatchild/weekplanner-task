export const displaySessionDetail = (sessions, day, index) => { 

    let sessionInfo = `
        <span>Click on any session in the scheduler or in today's session list.</span>
    `
    console.log(sessions.data, "2")
    if (sessions.data && day && index) {
        let sessionData = sessions.data[day][index]

        sessionInfo = `
            <h2 class="display">${sessionData["name"]}</h2>
            <hr>
            <h3>Description</h3>
            <p>${sessionData["description"]}</p>
            <h3>Type</h3>
            <p>${sessionData["type"]}</p>
        `
        if (sessionData["variation"] && sessionData["variation"] !== null){
            sessionInfo += `
                <h3>Variation</h3>
                <p>${sessionData["variation"]}</p>
            `
        }

        // fatigue blocks
        let fatigue = sessionData["target_fatigue"]
        let fatigueArray = ["", "", "", "", ""]
        if (fatigue >= 2) {fatigueArray[0] = "active"}
        if (fatigue >= 4) {fatigueArray[1] = "active"}
        if (fatigue >= 6) {fatigueArray[2] = "active"}
        if (fatigue >= 8) {fatigueArray[3] = "active"}
        if (fatigue == 10) {fatigueArray[4] = "active"}

        sessionInfo += `
            <div class="">
            <div class="row g-3">
                <div class="col-md-4">
                    <div class="d-flex flex-column text-white session-details-module">
                        <h2 class="text-center">Intensity</h2>
                        <span class="m-auto pt-2 px-2"><progress id="intensity" value="${sessionData["target_intensity"]*10}" max="100"></progress></span>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex flex-column text-white session-details-module">
                        <h2 class="text-center">Fatigue</h2>
                        <div class="d-flex flex-direction-row h-100 align-items-end m-auto">
                            <div class="fatigue-col ${fatigueArray[0]} one-five-fatigue"></div>
                            <div class="fatigue-col ${fatigueArray[1]} two-five-fatigue"></div>
                            <div class="fatigue-col ${fatigueArray[2]} three-five-fatigue"></div>
                            <div class="fatigue-col ${fatigueArray[3]} four-five-fatigue"></div>
                            <div class="fatigue-col ${fatigueArray[4]} five-five-fatigue"></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex flex-column text-white session-details-module">
                        <h2 class="text-center">Duration</h2>
                        <p class="m-auto">${sessionData["length"]}m</p>
                    </div>
                </div>
            </div>
            </div>
        `
    }

    document.querySelector('#session-detail').innerHTML = `
    <div class="d-flex flex-direction-row justify-content-between p-3 mt-3">
        <h1 class="text-white">Session Details</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand text-light ms-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrows-angle-contract text-light ms-2 d-none" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
        </svg>
    </div>
    <div class="box-module bg-cyan">
        <h1>${sessionInfo}</h1>
    </div>
    `
}