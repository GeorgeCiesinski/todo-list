# todo-list

A todo web app with local storage.

## Features

### Local Storage

Lists and Settings are stored using local storage. As long as you access the app on the same computer and browser, you should be able to access your saved data. The local storage data can also be deleted in the settings.

### Customize Color Theme

The `Primary Color` setting in the Settings menu allows you to specify a color theme. Thanks to the Palettey library, a Tailwinds style 10 color palette is generated for the website to use.

### Alternating Font Color

In order to abide by the [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/), I wrote a script that tests if a dark or light `font-color` contrasts more strongly against the user's primary color. You can read more about this in [this section](#color-luminance-math).

## JSON Objects

The Todo app generates a dom based on a json object in `localStorage`. These objects are modified as the app runs, and saved automatically. On first run, if there is no data in `localStorage`, a default object is generated from `src/assets/data/default.json`.

### Lists Object

The Lists object contains all of the lists. The app starts with a default list to show the user what is possible, but this can be deleted by the user. New lists can also be added. Each list contains an array called "todos" which contains an array of `Todo objects`.

```json
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

```json
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

```json
{
    "name": "Car Wash",
    "checked": "False"
}
```

## Challenges

As this app was created to hone my skills in dom manipulation and web development, I encountered a number of challenges which I documented on [this page](https://github.com/GeorgeCiesinski/todo-list/wiki/Challenges) of the project wiki. Feel free to check it out if this interests you!

## Code Style

[Airbnb Javascript Style](https://airbnb.io/javascript/)

## Credits

Built using [https://github.com/bartbergmans/Palettey](https://github.com/bartbergmans/Palettey) by [bartbergmans](https://github.com/bartbergmans)
