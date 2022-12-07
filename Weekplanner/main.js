import './style.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// components
import { navbar } from './components/navbar'
import { history } from './components/history'
import { scheduler } from './components/scheduler'
import { sessionPrevious } from './components/session-previous'
import { sessionToday } from './components/sessions-today'
import { statistics } from './components/statistics'

import { Sessions } from './src/Sessions'
const sessions = new Sessions()

var knownTransactionID = sessions.transactionID;

const refreshRateInterval = 250

let persistentScrollScheduler = 0

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

    // Build components of the page
    navbar()
    // history()
    scheduler(sessions)
    // sessionPrevious()
    // sessionToday()
    // statistics()

    // Maximize icons
    maximize()

    // Assignment of sessions to weekdays
    weekdayAssign()

    // Session controls once assigned
    adjustSessionPosition()

    // persistent scroll 
    persistentScrollEvent()

    // Unschedule all button
    unscheduleAllSessions()

    // long-polling using a transactionID
    setInterval(() => {
        if (knownTransactionID !== sessions.transactionID){

            // update the known transaction id so we do not loop forever
            knownTransactionID = sessions.transactionID

            scheduler(sessions)
            persistentScroll()
            persistentScrollEvent()
            weekdayAssign()
            maximize()
            adjustSessionPosition()
            unscheduleAllSessions()
        } else {
            console.log("No updates needed")
        }
    }, refreshRateInterval)
}

// 
// Maximize and minimize the modules
// 
const maximize = () => {
    let moduleBoxes = document.querySelectorAll(".module")
    let body = document.querySelector("body")

    moduleBoxes.forEach((moduleBox) => {
        let iconExpand = moduleBox.querySelector(':scope .bi-arrows-angle-expand');
        let iconClose = moduleBox.querySelector(':scope .bi-arrows-angle-contract');

        if (iconExpand) {
            iconExpand.addEventListener("click", () => {
                moduleBox.classList.add("maximize")
                body.style.overflow = "hidden"
                iconExpand.classList.add("d-none")
                iconClose.classList.remove("d-none")
            })
        }

        if (iconClose) {
            iconClose.addEventListener("click", () => {
                moduleBox.classList.remove("maximize")
                body.style.overflow = "unset"
                iconClose.classList.add("d-none")
                iconExpand.classList.remove("d-none")
            })
        }
    })
}

// 
// event listeners for assigning sessions to weekdays
// 
const weekdayAssign = () => {
    let weekdays = document.querySelectorAll(".weekday-assignment")

    weekdays.forEach((weekdayElem) => {
        let weekdayStr = weekdayElem.getAttribute('id')
        let parentIdAttribute = weekdayElem.parentNode.parentNode.getAttribute('id').split("-")
        let parentKey = parentIdAttribute[0]
        let parentIndex = Number(parentIdAttribute[1])

        weekdayElem.addEventListener("click", () => {
            if (knownTransactionID === sessions.transactionID){
                sessions.scheduleSession(parentKey, parentIndex, weekdayStr)
            }
        })
    })
}

// 
// event handlers for controlling individual sessions
// 
const adjustSessionPosition = () => {
    let controls = document.querySelectorAll(".weekday-control")

    controls.forEach((controlElem) => {

        let parentIdAttribute = controlElem.parentNode.parentNode.getAttribute('id').split("-")
        let parentKey = parentIdAttribute[0]
        let parentIndex = Number(parentIdAttribute[1])

        const arrowControlEvent = (callback) => {
            controlElem.addEventListener("click", () => {
                if (knownTransactionID === sessions.transactionID){
                    callback()
                }
            })
        }

        if (controlElem.classList.contains("weekday-control-up")){
            arrowControlEvent(() => {
                sessions.scheduleSession(parentKey, parentIndex, parentKey, parentIndex - 1)
            })
        } else if (controlElem.classList.contains("weekday-control-down")){
            arrowControlEvent(() => {
                sessions.scheduleSession(parentKey, parentIndex, parentKey, parentIndex + 1)
            })
        } else if (controlElem.classList.contains("weekday-control-unassign")){
            arrowControlEvent(() => {
                sessions.unscheduleSession(parentKey, parentIndex)
            })
        } else if (controlElem.classList.contains("weekday-control-completed")){
            
            // get session
            // test if it is completed
            // add completed remove if not
            arrowControlEvent(() => {
                if (sessions.sessionCompletedStatus(parentKey, parentIndex)){
                    sessions.sessionCompleted(parentKey, parentIndex, false)
                    controlElem.classList.remove("session-completed")
                } else {
                    sessions.sessionCompleted(parentKey, parentIndex, true)
                    controlElem.classList.add("session-completed")
                }
            })
        }
    })
}

// 
// remember scroll position so users don't have to scroll each time an update is made to the element
// 
const persistentScrollEvent = () => {
    let moduleScheduler = document.querySelector("#scheduler-module")

    moduleScheduler.addEventListener("scroll", () => {
        persistentScrollScheduler = moduleScheduler.scrollTop
    })
}
const persistentScroll = () => {
    let moduleScheduler = document.querySelector("#scheduler-module")

    moduleScheduler.scrollTop = persistentScrollScheduler
}

// 
// unschedule all sessions event handler
// 
const unscheduleAllSessions = () => {
    let unscheduleButton = document.querySelector("#unschedule-all")

    unscheduleButton.addEventListener("click", () => {
        sessions.unscheduleAll()
    })
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




