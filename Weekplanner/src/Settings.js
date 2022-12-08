export class settingsLocal {
    constructor (){
        // local settings object
        this.settings = {}
        
    }

    refreshSettings(){
        this.darkModeSetting()
        this.moduleSchedulerSetting()
        this.moduleTodaysSessionsSetting()
        this.moduleStatisticsSetting()
        this.moduleDetailsSetting()

        return this.settings
    }

    darkModeSetting(){
        this.checkLocalStorageSetting("darkMode", "dark", "light")
    }

    moduleSchedulerSetting(){
        this.checkLocalStorageSetting("moduleScheduler", "closed", "open")
    }

    moduleTodaysSessionsSetting(){
        this.checkLocalStorageSetting("moduleTodaysSessions", "closed", "open")
    }

    moduleStatisticsSetting(){
        this.checkLocalStorageSetting("moduleStatistics", "closed", "open")
    }

    moduleDetailsSetting(){
        this.checkLocalStorageSetting("moduleDetails", "closed", "open")
    }

    checkLocalStorageSetting(id, expectedValue, defaultValue){
        // checks for the setting, setting a default if none exist
        let localStorageVal = localStorage.getItem(id)

        if (localStorageVal && localStorageVal === expectedValue){
            this.settings[id] = localStorageVal
        } else {
            this.settings[id] = defaultValue
        }
    }
}