
export const settings = () => { 
  document.querySelector('#settings').innerHTML = `
    <div id="settings-box" class="d-flex flex-column text-white p-5">
      <div class="align-self-end mb-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
        </svg>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill align-self-center" viewBox="0 0 16 16">
        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
      </svg>
      <h1 class="border-bottom p-3 border-white text-center w-100">Settings</h1>

      <!-- DARK MODE -->
      <h1 class="p-0 mt-3 text-start w-100">Visual</h1>
      <div class="d-flex text-white mt-0">
        <div class="me-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-off" id="dark-mode" viewBox="0 0 16 16">
            <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-on d-none" id="dark-mode" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </div>
        <div class="align-self-center pt-2"><span class="">DARK MODE</span></div>
      </div>
      <h1 class="p-0 mt-4 text-start w-100">Module View</h1>

      <!-- SCHEDULER -->
      <div class="d-flex text-white mt-0">
        <div class="me-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-off" id="module-scheduler" viewBox="0 0 16 16">
            <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-on d-none" id="module-scheduler" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </div>
        <div class="align-self-center pt-2"><span class="">SCHEDULER</span></div>
      </div>

      <!-- TODAYS SESSIONS -->
      <div class="d-flex text-white mt-0">
        <div class="me-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-off" id="module-todays-sessions" viewBox="0 0 16 16">
            <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-on d-none" id="module-todays-sessions" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </div>
        <div class="align-self-center pt-2"><span class="">TODAYS SESSIONS</span></div>
      </div>

      <!-- TODAYS SESSIONS -->
      <div class="d-flex text-white mt-0">
        <div class="me-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-off" id="module-statistics" viewBox="0 0 16 16">
            <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-on d-none" id="module-statistics" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </div>
        <div class="align-self-center pt-2"><span class="">STATISTICS</span></div>
      </div>

      <!-- DETAILS -->
      <div class="d-flex text-white mt-0">
        <div class="me-5">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-off" id="module-details" viewBox="0 0 16 16">
            <path d="M11 4a4 4 0 0 1 0 8H8a4.992 4.992 0 0 0 2-4 4.992 4.992 0 0 0-2-4h3zm-6 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zM0 8a5 5 0 0 0 5 5h6a5 5 0 0 0 0-10H5a5 5 0 0 0-5 5z"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-toggle-on d-none" id="module-details" viewBox="0 0 16 16">
            <path d="M5 3a5 5 0 0 0 0 10h6a5 5 0 0 0 0-10H5zm6 9a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/>
          </svg>
        </div>
        <div class="align-self-center pt-2"><span class="">SESSION DETAILS</span></div>
      </div>

      <!-- REMOVE STORED INFO --> 
      <h1 class="p-0 pt-3 mt-5 text-center w-100 border-top border-white">Restore JSON Data</h1>
      <div class="d-flex justify-content-center text-white mt-0">
        <div class="align-self-center pt-2 mt-1 btn btn-danger" id="refresh-data">REFRESH</div>
      </div>
    </div>
  `
}
