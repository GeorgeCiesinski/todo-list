# todo-list

A todo web app with local storage.

## Features

### Local Storage

Lists and Settings are stored using local storage. As long as you access the app on the same computer and browser, you should be able to access your saved data. The local storage data can also be deleted in the settings.

### Customize Color Theme

The `Primary Color` setting in the Settings menu allows you to specify a color theme. Thanks to the Palettey library, a Tailwinds style 10 color palette is generated for the website to use. 

## JSON Objects

The Todo app generates a dom from a json object. These objects are modified as the app runs, and periodically saved to local storage. 

### Lists Object

The Lists object contains all of the lists. The app starts with a default list, but this can be removed. New lists can also be added. Each list contains an array called "todos" which contains an array of `Todo objects`.

```
{
    "lists": [
        {
            "title": "Default",
            "description": "Basic list for any kind of todo's"
            "todos": [
                todo-object, 
                todo-object-2,
                ...
            ]
        },
        {
            Another list object...
        }
    ]
}
```

### Todo Object

Each Todo object contains information about a todo item. The app populates some fields automatically, such as date-added. Some fields are mandatory such as title. Some are optional such as description, due, and priority. Others are added by the user. Each Todo object contains an array called checklist, which can be empty or contain checklist objects.

```
{
    "title": "Clean fridge",
    "added": "yyyy-mm-dd",
    "description": "Throw out rotten food and wash stains",
    "checklist": [
        checklist-object,
        checklist-object-2,
        ...
    ],
    "due": "yyyy-mm-dd",
    "priority": "1" (Accepted values are 1-3)
}
```

### Checklist Object

The checklist object is optional data a user can add to a todo item. For example, if cleaning the car requires a carwash and detailing, these checklist items can be added to the todo item checklist array:

```
{
    "name": "Car Wash",
    "checked": "False"
}
```

## Challenges

I encountered a number of challenges while working on this app. These challenges were significant and turned a project I hoped to finish in 2 weeks into an almost 8 week long project. I will try to outline some of these below. 

### Custom Framework

Before starting this project, I was not experienced with any javascript front-end frameworks such as React. Consequently, I found myself rebuilding the wheel and creating my own framework. While I learned a lot, including what to avoid next project, I regret the time spent building something that I could have completely avoided had I just started with an existing framework.

### Depracated Libraries

While working on this project, I searched for libraries that would help me build planned features. I found an outdated library that did exactly what I wanted, but the library itself had bugs within it. I got sidetracked and ended up pushing an update for this deprecated library, and finding more issues with it. As the author of the library was not reachable, I opted to create a fix within my own app that negates the bug in the library. The lesson learned here is to be careful when using old deprecated libraries. 

### Color Luminance Math

The most rewarding challenge I experienced with this app was due to a feature I wanted to add. My aim was to let the user pick a primary color and generate a color theme for the site. To meet web accessibility standards, I needed to generate a font color that contrasted against the primary color. This became a challenge when I had to create functions that converted hex to RGB, split it up into components, calculated the relative luminance, and recombined it into the resulting luminance. This took me almost a week to solve, but the result is a functional luminance calculation that can determine whether white or black font contrasts more strongly against the primary color. These functions can be found in `lib/color.js`.

### Circular Imports

I encountered a frustrating bug that took me days to resolve. I imported a module and instantiated the exported function. The issue came when I needed a function from the parent module that imported the function. In this instance, I decided to use a callback function to resolve the issue. During my research, I came across a pattern where a single module is used for all imports, and other modules import this main module, but I have to research this further.

### Unclear Design Pattern

I originally intended to use revealing module pattern for this project before finding out it isn't necessary in the days of ES6 modules. Consequently, I used a module pattern that in retrospect wasn't the most suitable for this project, and lead to many frustrating issues. I decided to do more reading on design patterns so that I can choose more suitable patterns for future projects.

## Code Style

[Airbnb Javascript Style](https://airbnb.io/javascript/)

## Credits

Built using [https://github.com/bartbergmans/Palettey](https://github.com/bartbergmans/Palettey) by [bartbergmans](https://github.com/bartbergmans)