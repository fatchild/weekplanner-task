
export const navbar = () => { 
  document.querySelector('#navbar').innerHTML = `
  <nav class="navbar">
    <div class="container-fluid" id="app-nav">
      <a class="navbar-brand d-flex flex-direction-row align-items-center" href="/">
        <img src="/company-logo.png" alt="" width="30" height="30" class="d-inline-block align-text-bottom">
        <h1 class="ps-3 m-auto text-light">Weekplanner</h1>
      </a>
      <div class="d-flex flex-direction-row align-items-center text-light">
        <p class="p-3 text-center m-auto mt-1" id="nav-username">Ed’s Training Planner</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-double-down" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
        </svg>
        <img src="/profile-pic.png" alt="" class="ps-3" id="" height="40"></img>
      </div>
    </div>
  </nav>
  `
}
