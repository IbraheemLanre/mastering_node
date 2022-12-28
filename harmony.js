"use strict"

let owners = new WeakMap()

let task = {
    title: "Big Project", 
}

let home = {
    address: "riversdale"
}

owners.set(task, 'John')
owners.set(home, "atlanta")

function owner(some) {
    if (owners.has(some)) {
        return console.log(owners.get(some))
    }
    console.log("No owner for this task")
}

// my way
/*function owner(some) {
    if (!owners.has(some)) {
        console.log("No owner for this task")
    } else {
        return console.log(owners.get(some))
    }     
}*/


owner(task)
owner({})