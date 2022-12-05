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

![](./NOTES%20-%20Resources/front-end-design/DesignMindMap.png)


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


___
### Considerations

[ ] - Accessibility  
[ ] - Speed  
[ ] - Testing - Unit tests  
[ ] - Extra data  
[ ] - Default values  


___
## Change Log

