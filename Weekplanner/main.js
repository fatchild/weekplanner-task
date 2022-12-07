import './style.css'
import './darkmode.css'
import './responsive.css'
// import javascriptLogo from './javascript.svg'
// import { setupCounter } from './counter.js'

// components
import { navbar } from './components/navbar'
import { settings } from './components/settings'
import { history } from './components/history'
import { scheduler } from './components/scheduler'
import { sessionPrevious } from './components/session-previous'
import { sessionToday } from './components/sessions-today'
import { statistics } from './components/statistics'

import { Sessions } from './src/Sessions'
const sessions = new Sessions()

import { settingsLocal } from './src/Settings'
const localSettings = new settingsLocal()

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
    // fresh settings
    let freshSettings = localSettings.refreshSettings()

    // Build components of the page
    navbar()
    settings()
    // history()
    // sessionPrevious()
    // sessionToday()
    // statistics()

    // event Handlers for settings
    settingsMenu()
    toggleSettings()
    toggleSettingsInit(freshSettings)

    // dark mode
    darkModeOnload(freshSettings)

    // module state
    moduleStateOnLoad(freshSettings, {
        'moduleScheduler':"#scheduler",
    })

    // create sessions and event handlers
    updatePage()

    // restore data
    restoreHandler()

    // long-polling using a transactionID
    setInterval(() => {
        if (knownTransactionID !== sessions.transactionID){

            // update the known transaction id so we do not loop forever
            knownTransactionID = sessions.transactionID

            // Keep the page updated and the event handlers fresh
            updatePage()

        } else {
            console.log("No updates needed")
        }
    }, refreshRateInterval)
}

// 
// components and eventHandlers which need regenerating for the page to be fully dynamic
// 
const updatePage = () => {
    scheduler(sessions)
    persistentScroll()
    persistentScrollEvent()
    weekdayAssign()
    maximize()
    adjustSessionPosition()
    unscheduleAllSessions()
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

// 
// event handler for opening ans closing the settings menu
// 
const settingsMenu = () => {
    let openSettingsIconElem = document.querySelector(".navbar .bi-chevron-double-down")
    let settingsPageElem = document.querySelector("#settings")
    let settingsBoxExitElem = document.querySelector("#settings-box .bi-x-lg")

    // close via background
    settingsPageElem.addEventListener("click", (e) => {
        if(e.target !== e.currentTarget) return;
        console.log("Close settings box 1")
        settingsPageElem.classList.add("d-none")
    })

    // close via icon
    settingsBoxExitElem.addEventListener("click", () => {
        console.log("Close settings box")
        settingsPageElem.classList.add("d-none")
    })

    // open via icon in navbar
    openSettingsIconElem.addEventListener("click", () => {
        console.log("Open settings box")
        settingsPageElem.classList.remove("d-none")
    })
}

// 
// event handler for toggling he settings
// 
const toggleSettings = () => {
    let settingsToggleIconElems = document.querySelectorAll("#settings .bi-toggle-off")

    settingsToggleIconElems.forEach((toggleOffElem) => {

        // Toggle on
        let toggleOnElem = toggleOffElem.nextElementSibling;
        toggleOffElem.addEventListener("click", () => {
            console.log("toggle ON")
            // remove toggle
            // replace with toggled on
            toggleHide(toggleOnElem, toggleOffElem)

            if (toggleOnElem.getAttribute("id") === "dark-mode"){
                makeDark(document.querySelector("body"))
            } 
            else if (toggleOnElem.getAttribute("id") === "module-scheduler"){
                document.querySelector("#scheduler").classList.remove("d-none")
                openModule("moduleScheduler")
            }
        })

        // Toggle off
        toggleOnElem.addEventListener("click", () => {
            console.log("toggle OFF")
            // remove toggle
            // replace with toggled on
            toggleHide(toggleOffElem, toggleOnElem)

            // do related settings changes
            if (toggleOnElem.getAttribute("id") === "dark-mode"){
                makeLight(document.querySelector("body"))
            } 
            else if (toggleOnElem.getAttribute("id") === "module-scheduler"){
                document.querySelector("#scheduler").classList.add("d-none")
                closeModule("moduleScheduler")
            }
        })
    })
}
// 
// toggle helper
// 
const toggleHide = (elemShow, elemHide) => {
    elemShow.classList.remove("d-none")
    elemHide.classList.add("d-none")
}

// 
// setup the menu based on the settings we know from localStorage
// 
const toggleSettingsInit = (localSettings) => {

    // internal helper
    const toggleSettingHelper = (localSet, OffElemSel, OnElemSel, localStoreId, testVal) => {
        // darkMode
        let OffElem = document.querySelector(OffElemSel)
        let OnElem = document.querySelector(OnElemSel)
        console.log(localSet[localStoreId], testVal)
        if (localSet[localStoreId] === testVal){
            toggleHide(OnElem, OffElem)
        } else {
            toggleHide(OffElem, OnElem)
        }
    }

    // Dark mode
    toggleSettingHelper(localSettings, "#settings #dark-mode.bi-toggle-off", "#settings #dark-mode.bi-toggle-on", "darkMode", "dark")

    // module scheduler
    toggleSettingHelper(localSettings, "#settings #module-scheduler.bi-toggle-off", "#settings #module-scheduler.bi-toggle-on", "moduleScheduler", "open")
}

// 
// darkmode helpers
// 
const darkModeOnload = (localSettings) => {

    // Select the body element
    let body = document.querySelector('body')

    // system and local settings
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light').matches && localSettings.darkMode !== 'dark') {
        // System is light, website is light or no preference = Make light
        makeLight(body);
        console.log("1")
    } 
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light').matches && localSettings.darkMode === 'dark') {
        // System is light, website is dark = Make dark
        makeDark(body);
        console.log("2")
    }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches && localSettings.darkMode === 'dark') {
        // System is dark, website is dark = Make dark
        makeDark(body);
        console.log("3")
    }
    else {
        // System must be dark, website must be light or no preference
        makeLight(body);
        console.log("4")
    }
    
    // Add an event listener which checks for system preference changes, do exactly what it says
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
        if (event.matches) {
                makeDark(body);
        } else {
                makeLight(body);
        }
    });
}

// module open or closed onload
const moduleStateOnLoad = (localSettings, moduleObj) => {
    for (let module in moduleObj) {
        if (localSettings[module] && localSettings[module] === "closed"){
            document.querySelector(moduleObj[module]).classList.add("d-none")
        }
    }
}

// Helper Functions
const makeDark = (body) => {
    body.classList.add("dark");
    localStorage.setItem('darkMode', 'dark');
}
const makeLight = (body) => {
    body.classList.remove("dark");
    localStorage.setItem('darkMode', 'light');
}

const openModule = (id) => {
    localStorage.setItem(id, 'open');
}
const closeModule = (id) => {
    localStorage.setItem(id, 'closed');
}

// 
// event handler for refresh data button
// 
const restoreHandler = () => {
    let refreshDataElem = document.querySelector("#refresh-data")

    refreshDataElem.addEventListener("click", () => {
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




