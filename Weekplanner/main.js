import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

import { Sessions } from './src/Sessions'
const sessions = new Sessions()

// make sure the DOM is loaded before running application code
document.addEventListener("DOMContentLoaded", function() {

    // load the local JSON id there is no local session data
    if (!sessions.data) {
        async function loadJSON() {
            // await for the json to load using fetch
            const response = await fetch("./src/data.json");
            const json = await response.json();
            
            // if we do not have local data, then initialize using this data
            sessions._initializeJSON(json)
            
            // Start Application
            app()
        }
        loadJSON()
    } else {
        app()
    }



});

// the main application code
const app = () => {
        console.log(sessions.data, "8")
        sessions.scheduleSession("Unscheduled", 0, "Monday")
        console.log(sessions.data, "11")

        sessions.unscheduleAll()
        console.log(sessions.data)
}


// console.log(sessions.totalSessions)
// console.log(sessions.totalScheduledSessions)
// console.log(sessions.totalUnscheduledSessions)
// sessions.buildStats()
// console.log(sessions.totalSessions)
// console.log(sessions.totalScheduledSessions)
// console.log(sessions.totalUnscheduledSessions)

// console.log(sessions.sessionsOnDay("Monday"))
// console.log(sessions.sessionsOnDay("Tuesday"))
// console.log(sessions.sessionsOnDay("Wednesday"))
// console.log(sessions.sessionsOnDay("Thursday"))
// console.log(sessions.sessionsOnDay("Friday"))
// console.log(sessions.sessionsOnDay("Saturday"))
// console.log(sessions.sessionsOnDay("Sunday"), "5")


// console.log(sessions.sessionsToday(), "7");
// console.log(sessions.data, "8")
// sessions.scheduleSession("Unscheduled", 0, "Monday")
// console.log(sessions.sessionsOnDay("Monday"))
// console.log(sessions.data)
// sessions.unscheduleAll()
// console.log(sessions.data)




// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))




