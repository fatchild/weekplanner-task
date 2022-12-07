export const scheduler = (sessions) => { 
    console.log(sessions.data)

    let sessionList = ""

    for (let key in sessions.data) {
        // Create the heading
        sessionList += `<h1 class="text-light">${key}</h1>`

        let weekdayButtons = ""
        let controlButton = ""
        let sessionCompleted = ""

        let sessionArray = sessions.data[key]
        for (let i = 0; i < sessionArray.length; i++){

            if (key === "Unscheduled") {
                weekdayButtons = `
                    <div id="Monday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">Mo</span></div>
                    <div id="Tuesday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">Tu</span></div>
                    <div id="Wednesday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">We</span></div>
                    <div id="Thursday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">Th</span></div>
                    <div id="Friday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">Fr</span></div>
                    <div id="Saturday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">Sa</span></div>
                    <div id="Sunday" class="weekday-assignment tiny-module d-flex ms-2"><span class="d-flex pt-2 m-auto">Su</span></div>
                `
            } else {
                console.log(key, i)
                if (sessions.sessionCompletedStatus(key, i)) {
                    sessionCompleted = "session-completed"
                }
                controlButton = `
                    <div class="weekday-control weekday-control-down tiny-module d-flex ms-2"><span class="d-flex m-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                    </span></div>
                    <div class="weekday-control weekday-control-up tiny-module d-flex ms-2"><span class="d-flex m-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                    </span></div>
                    <div class="weekday-control weekday-control-unassign tiny-module d-flex ms-2"><span class="d-flex m-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                        </svg>
                    </span></div>
                    <div class="${sessionCompleted} weekday-control weekday-control-completed tiny-module tiny-module-completed d-flex ms-2"><span class="d-flex m-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
                        </svg>
                    </span></div>
                `
            }

            sessionList += `
                <div id="${key}-${i}" class="session bg-light-fade small-box-module mb-2 align-center d-flex justify-content-start">
                    <span class="d-flex text-center px- ms-0">
                        <span style="background-color: ${sessionArray[i]["type_colour"]};" class="title-border">&nbsp;</span>
                    </span>
                    <h1 class="schedule-module-title align-middle my-auto pe-2 text-start ">
                        ${sessionArray[i]["name"]}
                    </h1>
                    <span class="d-flex mb-0 text-center pt-2 px-3 border-start border-dark">
                        ${sessionArray[i]["length"] + "m"}
                    </span>
                    <span class="d-flex mb-0 text-center pt-2 px-3 border-start border-dark">
                        ${sessionArray[i]["description"].substring(0, 50) + "..."}
                    </span>
                    <div class="ms-auto d-flex flex-direction-row">
                        ${weekdayButtons}
                        ${controlButton}
                    </div>
                </div>
            `

            sessionCompleted = ""
        }

        sessionList += `<hr>`
    }

    document.querySelector('#scheduler').innerHTML = `
    <div class="d-flex flex-direction-row justify-content-between p-3 mt-2">
        <h1 class="text-white">Scheduler</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand text-light ms-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrows-angle-contract text-light ms-2 d-none" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
        </svg>
    </div>
    <div id="scheduler-module" class="box-module bg-pink">
        ${sessionList}
        <div class="d-flex justify-content-end">
            <div id="unschedule-all" class="btn btn-danger">
                <h1 class="m-auto">Unschedule All Sessions</h1>
            </div>
        </div>
    </div>
    `
}
