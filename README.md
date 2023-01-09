# todo-list

A simple todo web app.

## JSON Objects

The Todo app generates a dom based on a json object. The object contains different lists which can be added and removed. Each list contains Todo objects. 

### Lists Object

The Lists object contains all of the lists. The app starts with a default list, but this can be removed. New lists can also be added. Each list contains a property called "todo-array" which contains an array of `Todo objects`

```
{
    "lists": [
        {
            "name": "default",
            "description": "Basic list for any kind of todo's"
            "todo-array": [
                todo-object, 
                another-todo-object
            ]
        },
        {
            Another list...
        }
    ]
}
```

### Todo Object

Each Todo object contains information about that Todo. The app populates some fields automatically, such as date-added. Some fields are mandatory such as title. Some are optional such as description, due, and priority. 

```
{
    "title": "Clean fridge",
    "date-added": "date",
    "description": "Throw out rotten food and wash stains",
    "due": "date",
    "priority": "low/medium/high"
}
```

## Planned Features

### Custom Color Scheme

Settings page with options to pick colors such as font, background, secondary colors, etc. 

### Dark Mode

Dark Mode Toggle in settings. 

## Code Style

Built using the [Airbnb Javascript Style](https://airbnb.io/javascript/).