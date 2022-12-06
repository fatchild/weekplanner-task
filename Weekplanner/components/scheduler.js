export const scheduler = (sessions) => { 
    console.log(sessions.data)

    let sessionList = ""

    for (let key in sessions.data) {
        // Create the heading
        sessionList += `<h1 class="text-light">${key}</h1>`

        let sessionArray = sessions.data[key]
        for (let i = 0; i < sessionArray.length; i++){
            sessionList += `
                <div class="bg-light-fade small-box-module mb-2 align-center d-flex justify-content-start">
                    <h1 class="schedule-module-title align-middle my-auto pe-2 text-center">
                        ${sessionArray[i]["name"]}
                    </h1>
                    <span class="d-flex mb-0 text-center pt-2 px-3 border-start border-dark">
                        ${sessionArray[i]["length"] + "m"}
                    </span>
                    <span class="d-flex mb-0 text-center pt-2 px-3 border-start border-dark">
                        ${sessionArray[i]["description"].substring(0, 50) + "..."}
                    </span>
                </div>
            `
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
    </div>
    `
}
