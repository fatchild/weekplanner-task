// style
import './style/style.css'
import './style/darkmode.css'
import './style/responsive.css'


// components
import { navbar } from './components/navbar'
import { settings } from './components/settings'
import { scheduler } from './components/scheduler'
import { sessionToday } from './components/sessions-today'
import { statistics } from './components/statistics'
import { displaySessionDetail } from './components/session-display-detail'


// sessions Class
import { Sessions } from './src/Sessions'
const sessions = new Sessions()


// local sessions class
import { settingsLocal } from './src/Settings'
const localSettings = new settingsLocal()


// instantiate a known transaction ID for long-polling and set interval time
var knownTransactionID = sessions.transactionID;
const refreshRateInterval = 250


// track scroll position
let persistentScrollScheduler = 0


// make sure the DOM is loaded before running application code
document.addEventListener("DOMContentLoaded", function() {

    // load the local JSON id there is no local session data
    if (!sessions.data) {
        async function loadJSON() {

            // await for the json to load using fetch
            const response = await fetch("./data.json");
            const json = await response.json();
            
            // if we do not have local data, then initialize using this data
            sessions._initializeJSON(json)
            
            // Start Application
            app()
        }
        loadJSON()
    } else {
        // If the JSON has been loaded before then sessions.data will have been constructed
        app()
    }



});

// the application code
const app = () => {
    // load in refreshed settings
    let freshSettings = localSettings.refreshSettings()

    // Build components of the page which do not require reloading
    navbar()
    settings()
    displaySessionDetail(sessions)

    // event Handlers for settings
    settingsMenu()
    toggleSettings()
    toggleSettingsInit(freshSettings)

    // dark mode
    darkModeOnload(freshSettings)

    // module state when the app is loaded i.e. persist user settings
    moduleStateOnLoad(freshSettings, {
        'moduleScheduler':"#scheduler",
        'moduleTodaysSessions':"#sessions-today",
        'moduleStatistics':"#statistics",
        'moduleDetails':"#session-detail",
    })

    // create sessions and event handlers on startup before the db has been touched
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

        }
    }, refreshRateInterval)
}


// 
// components and eventHandlers which need regenerating for the page to be fully dynamic
// 
const updatePage = () => {
    sessions.buildStats()
    scheduler(sessions)
    sessionToday(sessions)
    persistentScroll()
    persistentScrollEvent()
    weekdayAssign()
    adjustSessionPosition()
    unscheduleAllSessions()
    statistics(sessions)
    sessionDisplayHandler(sessions)
    maximize()
}

// 
// event handler for updating the session display
// 
const sessionDisplayHandler = (sessions) => {
    let allModules = document.querySelectorAll(".single-box-module, .small-box-module")

    allModules.forEach((module) => {
        module.addEventListener("click", (e) => {
            if(e.currentTarget.classList.contains("bi") ||
                e.currentTarget.classList.contains("weekday-control")) return;
            let id = module.getAttribute("id").split("-")
            let day = id[0]
            let index = id[1]

            displaySessionDetail(sessions, day, index)
        })
    })
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
                window.scrollTo(0,0);
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
            
            // get session, test if it is completed, add completed remove if not
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
    let body = document.querySelector("body")

    // close via background
    settingsPageElem.addEventListener("click", (e) => {
        if(e.target !== e.currentTarget) return;
        settingsPageElem.classList.add("d-none")
        body.style.overflow = ""
    })

    // close via icon
    settingsBoxExitElem.addEventListener("click", () => {
        settingsPageElem.classList.add("d-none")
        body.style.overflow = ""
    })

    // open via icon in navbar
    openSettingsIconElem.addEventListener("click", () => {
        settingsPageElem.classList.remove("d-none")
        body.style.overflow = "hidden"
    })
}

// 
// event handler for toggling he settings
// TODO: This is a mess, cleanup and decouple
// 
const toggleSettings = () => {
    let settingsToggleIconElems = document.querySelectorAll("#settings .bi-toggle-off")

    settingsToggleIconElems.forEach((toggleOffElem) => {

        // Toggle on
        let toggleOnElem = toggleOffElem.nextElementSibling;
        toggleOffElem.addEventListener("click", () => {
            // remove toggle, replace with toggled on
            toggleHide(toggleOnElem, toggleOffElem)

            if (toggleOnElem.getAttribute("id") === "dark-mode"){
                makeDark(document.querySelector("body"))
            } 
            else if (toggleOnElem.getAttribute("id") === "module-scheduler"){
                document.querySelector("#scheduler").parentNode.classList.remove("d-none")
                openModule("moduleScheduler")
            }
            else if (toggleOnElem.getAttribute("id") === "module-todays-sessions"){
                document.querySelector("#sessions-today").parentNode.classList.remove("d-none")
                openModule("moduleTodaysSessions")
            }
            else if (toggleOnElem.getAttribute("id") === "module-statistics"){
                document.querySelector("#statistics").classList.remove("d-none")
                openModule("moduleStatistics")
                document.querySelector("#sessions-today").parentNode.classList.remove("col-lg-12")
                document.querySelector("#sessions-today").parentNode.classList.add("col-lg")
            }
            else if (toggleOnElem.getAttribute("id") === "module-details"){
                document.querySelector("#session-detail").classList.remove("d-none")
                openModule("moduleDetails")
                document.querySelector("#sessions-today").parentNode.classList.remove("col-lg-12")
                document.querySelector("#sessions-today").parentNode.classList.add("col-lg")
            }
        })

        // Toggle off
        toggleOnElem.addEventListener("click", () => {
            // remove toggle, replace with toggled on
            toggleHide(toggleOffElem, toggleOnElem)

            // do related settings changes
            if (toggleOnElem.getAttribute("id") === "dark-mode"){
                makeLight(document.querySelector("body"))
            } 
            else if (toggleOnElem.getAttribute("id") === "module-scheduler"){
                document.querySelector("#scheduler").parentNode.classList.add("d-none")
                closeModule("moduleScheduler")
            }
            else if (toggleOnElem.getAttribute("id") === "module-todays-sessions"){
                document.querySelector("#sessions-today").parentNode.classList.add("d-none")
                closeModule("moduleTodaysSessions")
            }
            else if (toggleOnElem.getAttribute("id") === "module-statistics"){
                document.querySelector("#statistics").classList.add("d-none")
                closeModule("moduleStatistics")
                if (document.querySelector("#session-detail").classList.contains("d-none")){
                    document.querySelector("#sessions-today").parentNode.classList.add("col-lg-12")
                }
            }
            else if (toggleOnElem.getAttribute("id") === "module-details"){
                document.querySelector("#session-detail").classList.add("d-none")
                closeModule("moduleDetails")
                if (document.querySelector("#statistics").classList.contains("d-none")){
                    document.querySelector("#sessions-today").parentNode.classList.add("col-lg-12")
                }
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

    // module todays sessions
    toggleSettingHelper(localSettings, "#settings #module-todays-sessions.bi-toggle-off", "#settings #module-todays-sessions.bi-toggle-on", "moduleTodaysSessions", "open")

    // module statistics
    toggleSettingHelper(localSettings, "#settings #module-statistics.bi-toggle-off", "#settings #module-statistics.bi-toggle-on", "moduleStatistics", "open")

    // module session
    toggleSettingHelper(localSettings, "#settings #module-details.bi-toggle-off", "#settings #module-details.bi-toggle-on", "moduleDetails", "open")
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
        // console.log("1")
    } 
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light').matches && localSettings.darkMode === 'dark') {
        // System is light, website is dark = Make dark
        makeDark(body);
        // console.log("2")
    }
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark').matches && localSettings.darkMode === 'dark') {
        // System is dark, website is dark = Make dark
        makeDark(body);
        // console.log("3")
    }
    else {
        // System must be dark, website must be light or no preference
        makeLight(body);
        // console.log("4")
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


// 
// module open or closed onload
// 
const moduleStateOnLoad = (localSettings, moduleObj) => {
    for (let module in moduleObj) {
        if (localSettings[module] && localSettings[module] === "closed"){
            document.querySelector(moduleObj[module]).classList.add("d-none")
        }
    }
}


// 
// Helper Functions
// 
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