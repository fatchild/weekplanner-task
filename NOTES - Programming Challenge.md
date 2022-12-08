# Programming Challenge

- Task outcomes (First)  
    [X] - Analysis (Noun / Verb) to extract requirements   
    [X] - Class structure  
    [ ] - Technology Usage  
    [ ] - User Experience Flow 

- Designs Visual (Comes last)  
    [X] - Examples  
    [X] - Build Visual mock up  
    [ ] - Quick Styling using vanilla Bootstrap  
    [ ] - Styling proper to align with examples  

- Extras  
    [ ] - Persistance i.e. database  


### Requirement Analysis

___
#### Objectives
- Front-end Dev Skills Demo
- Build a tool for users
- Organise sessions within the week  
- Responsive Design: target mobile form factor  

- Users: plural 
- Session List
- Session Completion: datetime / notes
- Week: view

A file called data.json is provided containing a list of sessions to be scheduled. Your tool should load data from this file.

___
#### Basic Flow / Format
- User  
    - Week
        - list of sessions to complete: unorganised
        - list of sessions to complete: organised
            - session: session details to aid UX

___
#### Questions
- How does the user view the week? 
    - inifinate scroll / blocks / timeline
- How is a session noted as completed? 
    - bool / greyed out / ticked (satisfying)
- How does the user view completed sessions? 
    - 3 colomns 
        1. to shedule 
        2. scheduled not completed
        3. scheduled completed
- How much information is useful?
    - Session time / intensity / symbols for session type and variation
    - It would be usefult to click on a session to get more info
- Should there be a button to reset all scheduling?
    - If so, it should have a "do you really mean it button behind..."
- Multiple people accessing the website and manipulating the JSON on disk
    - Either have a server side version
    - or a lock on the 


> Only one users datastrure has been given, only code for one user for now
> Only one week is provided in the datastructure, only code for one user for now

___
#### Data

data.json

Session in JSON format

- name: of the session - text field
- description: long format description - text field
- type: category - text field
- type_colour: colour associated with type (above) - text / hex value
- length: session time in minutes - number or datetime
- target_intensity: score 1 to 10 RPE - number (max 10)
- target_fatigue: score 1 to 10 desired fatigue post session - number (max 10)
- variation: optional! describes minor modifications - text

name
description
type
type_colour
length
target_intensity
target_fatigue
variation


> The data structure has been provided 

- Should I provide persistance through manipulating the JSON?


```json
{
    "Unscheduled": [
        {
            "name": "Max Hangs",
            "description": "...",
            "type": "Strength and Power",
            "type_colour": "#f55142",
            "length": 20,
            "target_intensity": 9,
            "target_fatigue": 4,
            "variation": "Four finger Half Crimp"
        },
    ],
    "Monday": [],
    "Tuesday": [],
    "Wednesday": [],
    "Thursday": [],
    "Friday": [],
    "Saturday": [],
    "Sunday": []
}
```


#### Basic class structure diagram

![](./NOTES%20-%20Resources/back-end-design/Weekplanner_class.drawio.png)

___
### Tech Stack

- JS built tool & bundler: Vite
- React for the front-end
- Bulma: initial styling 
- bespoke specializations


___
### Design (Visual / Front-End)

- Neumorphism
- Neo Brutalism

- transfering to adobe XD to make an image board


#### Include in design 
- Modules  
        - Scheduler  
        - Stats  
        - Next Up
        - History

- Module abilities
    - Maximize Minimize for each module
    - organise modules

- Sessions
    - Drag and drop

- Night Mode

### Thought board

![](./NOTES%20-%20Resources/front-end-design/thought%20board.png)

### Wireframes

![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%202.png)

![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%203.png)

### Finalizing designs

![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%208.png)

![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%209.png)
![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%2010.png)
![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%2011.png)
![](./NOTES%20-%20Resources/front-end-design/Web%201920%20%E2%80%93%2012.png)


NEXT:
- Find out if I can use a bundler?
- Should I host it so you can see it working?
- Or do you want a really simple setup with a signgle HTML / JS / CSS file?

___
### Deliverables

- HTML file: SINGULAR? -> SPA?
- JS files: package bundler
- CSS: framework -> Bootstrap / bulmer + customizations



## Development Notes

[X] - Basic Page
[X] - Modules and Layout
[X] - Backend classes
[X] - Scheduler module functionality
    [X] - maximize module
    [X] - click where you wish the session to go
    [ ] - drag and drop
    [X] - display sessions
        [X] - get whole object 
        [X] - iterate through function returning html components 
> That's a lot of yoga 🥵
[ ] - Settings
    [X] - Darkmode
    [X] - Switch modules on and off
    [X] - Start again / remove all saved data from local storage
[X] - Scheduler
    [X] - Make it responsive
[X] - Develop completed sessions
    [ ] - A form for input of notes
    [ ] - Display in the history module
[X] - Scheduler
    [X] - Click and expand sessions to see details
[ ] - Today's sessions
    [ ] - Day picker
[ ] - Notes
    [ ] - Last sessions
    [ ] - Coaches Notes
[ ] - Stylistic touches to make it more app-like
    [X] - No highlighting
    [ ] - pointer icon

[X] - Clean up the code
[ ] - Write tests
[X] - Deploy to netlify 


BUG:
[ ] - minimize issue: 1. select scheduler 2. schedule a session 3. minimize. The icon is not responsive the first click.


TODO: 
[ ] - Sessions today navigation  
```html
<div class="d-flex flex-direction-row justify-content-around p-3 mt-2">
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
</div>
```

```css
.bi-arrow-right, .bi-arrow-left {
  transition: 0.2s;
}
.bi-arrow-right:hover {
  transform: translate(0.3em, 0);
}
.bi-arrow-left:hover {
  transform: translate(-0.3em, 0);
}
```

___
### Considerations

[ ] - Accessibility  
[ ] - Speed  
[ ] - Testing - Unit tests  
[ ] - Extra data  
[ ] - Default values  


___
## Change Log

