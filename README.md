# todo-list

A simple todo web app.

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

## Planned Features

### Custom Color Scheme

Settings page with options to pick colors such as font, background, secondary colors, etc. 

## Code Style

[Airbnb Javascript Style](https://airbnb.io/javascript/)

## Credits

Built using [https://github.com/bartbergmans/Palettey](https://github.com/bartbergmans/Palettey) by [bartbergmans](https://github.com/bartbergmans)