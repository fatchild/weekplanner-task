export const sessionToday = (sessions) => { 

    // current date
    const dayOfWeekName = new Date().toLocaleString('default', { weekday: 'long' })

    // Total work time
    let totalWorkTime = 0

    // Get todays session objects
    let sessionList = ""
    let sessionArray = sessions.data[dayOfWeekName]
    for (let i = 0; i < sessionArray.length; i++){

        // count up the worktime
        totalWorkTime += sessionArray[i]["length"]

        // fatigue blocks
        let fatigue = sessionArray[i]["target_fatigue"]
        let fatigueArray = ["", "", "", "", ""]
        if (fatigue >= 2) {fatigueArray[0] = "active"}
        if (fatigue >= 4) {fatigueArray[1] = "active"}
        if (fatigue >= 6) {fatigueArray[2] = "active"}
        if (fatigue >= 8) {fatigueArray[3] = "active"}
        if (fatigue == 10) {fatigueArray[4] = "active"}

        sessionList += `
            <div id="${dayOfWeekName}-${i}" class="d-flex flex-direction-row justify-content- single-box-module bg-light-fade text-white" style="border: 1px solid ${sessionArray[i]["type_colour"]}; box-shadow: 0px 0px 8px -4px white;">
                <span class="pt-2 px-3 border-end"><b>${sessionArray[i]["name"]}</b></span>
                <span class="pt-2 px-3 border-end">${sessionArray[i]["type"]}</span>
                <span class="pt-2 px-3">${sessionArray[i]["length"]}m</span>
                <span class="ms-auto pt-2 px-2"><progress id="intensity" value="${sessionArray[i]["target_intensity"]*10}" max="100"></progress></span>
                <span class="ps-2">
                    <div class="d-flex flex-direction-row h-100 align-items-end">
                        <div class="fatigue-col ${fatigueArray[0]} one-five-fatigue"></div>
                        <div class="fatigue-col ${fatigueArray[1]} two-five-fatigue"></div>
                        <div class="fatigue-col ${fatigueArray[2]} three-five-fatigue"></div>
                        <div class="fatigue-col ${fatigueArray[3]} four-five-fatigue"></div>
                        <div class="fatigue-col ${fatigueArray[4]} five-five-fatigue"></div>
                    </div>
                </span>
            </div>
        `
    }

    if (sessionArray.length === 0){
        sessionList += `
            <div id="" class="d-flex flex-direction-row justify-content- single-box-module bg-light-fade text-white" style="border: 1px solid white; box-shadow: 0px 0px 8px -4px white;">
                <span class="pt-2">Rest day</span>
            </div>
        `
    }

    document.querySelector('#sessions-today').innerHTML = `
    <div class="d-flex flex-direction-row justify-content-between p-3 mt-2">
        <h1 class="text-white">${dayOfWeekName}'s Sessions (${Math.floor(totalWorkTime/60)}h ${totalWorkTime%60}m)</h1>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand text-light ms-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707zm4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-arrows-angle-contract text-light ms-2 d-none" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707zM15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707z"/>
        </svg>
    </div>
<!--    <div class="d-flex flex-direction-row justify-content-around p-3 mt-2">
        <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-left text-white d-none" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg>
        </div>
        <div class="text-white pt-2">
            <span class="">${dayOfWeekName}</span>
        </div>
        <div class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right text-white d-none" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
        </div>
    </div> -->

    <!-- Todays sessions -->
    <div class="">
        ${sessionList}
    </div>
    <div class="w-100 d-flex justify-content-center p-3 bubbles">
        <span class="bubble"></span>
        <span class="bubble"></span>
        <span class="bubble"></span>
    </div>
    `
}
