# SETUP INSTRUCTIONS  
This project requires node & npm.  

1. Clone this repo `https://github.com/fatchild/weekplanner-task`  
2. cd into Weekplanner `cd Weekplanner`  
3. Execute `npm run setupLocal`  
>This should install vite, serve the app locally and to your network, ip addresses will be displayed in the terminal

Running after setup, use
```bash
npm run local
```

## This has also been deployed to netlify

You can find the latest commited version of the app running at...  
`https://astounding-dragon-765808.netlify.app/`  
LINK: [Netlify Deployment](https://astounding-dragon-765808.netlify.app/)


# Weekplanner

This is a short programming task designed to let you demonstrate your skills in frontend web development. You should aim to spend around 2 hours on this task.

## The Problem

Users have a list of sessions they should complete within a week. Your task is to build a tool to help them organise those sessions within the week. For example, the user might have the following sessions:

 - Max Hangs
 - Max Hangs
 - Indoor Bouldering
 - Pull Ups

 and they may decide to schedule their sessions as

  - Tuesday: Max Hangs, Indoor Bouldering
  - Thursday: Max Hangs, Pull Ups

The tool should provide information to help the user make scheduling decisions. For example, if the user only has 1 hour to train on a given day they would not want to schedule sessions lasting more than 1 hour.

A mobile form factor should be targeted.

## Resources

A file called `data.json` is provided containing a list of sessions to be scheduled. Your tool should load data from this file.

A session looks like this:

```json
{
    "name": "Max Hangs",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "type": "Strength and Power",
    "type_colour": "#f55142",
    "length": 20,
    "target_intensity": 9,
    "target_fatigue": 4,
    "variation": "Four finger Half Crimp"
}
```

 - `name` is the name of the session.
 - `description` is a long form description of the session, with details of how the session should be performed, sets, reps etc.
 - `type` is the type of the session.
 - `type_colour` is a colour associated with the type of the session.
 - `length` is the length of the session in minutes.
 - `target_intensity` is a score from 1 to 10 describing how hard the user should be trying in the session.
 - `target_fatigue` is a score from 1 to 10 describing how fatigued the user should feel after the session.
 - `variation` is an optional field that can be used to describe minor modifications to the session.

## Deliverables

You should start by forking this repo. Commit your changes to your fork and provide a link to your forked repo.

The tool should consist of an html file that you can open in the browser to use the tool. Google Chrome will be used. Additional js and css files may also be included in the repo. External dependencies are allowed.