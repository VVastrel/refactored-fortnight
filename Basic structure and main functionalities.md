# Project phase 2 - Basic structure and main functionalities

In this phase we focused on creating the skeleton of the project that is able to whitstand the weight of all the upcoming features. Making an entire game (even if it's a smaller one) is not a small or easy undertaking. 

## 1. Environment

Our project is a web-based dungeon crawling game built using javascript. We use React for the frontend and Redux for state management. Backend is powered by SQLite for database management.

## 2. Backend

The Backend is implemented using Express and SQLite. It provides APIs for saving and retrieving dungeon seeds and supports database operations for player data and dungeon generation.

## 3. Frontend

With React we built the frontend and made the project modular by dividing features into their own components. State management is handled using Redux, and the UI is styled with CSS.

## 4. Database

We decided to use SQLite for our project because we're familiar with it. We use it to store dungeon seeds, player stats and inventory tables.

## 5. Basic structure and architecture

Component-based architecture is what we wanted to use for this project, because it seemed like the best way to start building a game. Modularity lets us modify different parts of the project without breaking others. 

## 6. Functionalities

Game Loop (GameLoop.js) manages real-time and turn-based updates for the game.
Database records player stats, data and enables sharing of progress.


## 7. Code quality and documentation

As mentioned before, we strive to create a modular project that is easy to add things to, and that took most of our time.

## 8. Testing and error handling

We haven't implemented anything more complex than simple console logs for catching errors.

## 9. User interface and interaction

Since this is a browser game that's supposed to be very easy to pick up and play, we're planning to keep things simple when it comes to UI. We opted to use a 2D 1bit (plus some red) style for all the art assets to make producing more assets a simple and quick task. We have a main menu, player stats and a game over -overlay when the player dies. What is still left to be implemented is loading a specific seed and an inventory system. There's framework for both of those systems in place but we need a bit more time before we can implement them fully.
Interaction is important for our project since it's a game, although a simple one. We got basic movement and attacking in place and have planned to expand from there. We're using the mouse, the arrow keys and 'R' on keyboard for controls. The modularity of our component based systems allows us to implement new gameplay features easily.
