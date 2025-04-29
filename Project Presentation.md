# Phase 4 – Project Presentation


## 🎯 Project title

[Palace of the Holder](http://palaceoftheholder.northeurope.cloudapp.azure.com/)


---

## 📝 Project overview


Fast-paced dungeon crawler built with Javascript and React, while utilizing SQL tables. Players explore randomly generated dungeons, fight varies types of enemies, gain experience points, level up and find new gear. Dungeons scale up in difficulty  as the player progresses through the floors of the dungeon, and there's even some harder boss monsters to encounter. The game has a mechanic that records the place of death and gear the player had, and lets spits out a link that player can then share with someone else. That someone can then find the corpse and gear of that player, and be more equipped to handle the challenges ahead. Our target audience is anyone who needs to waste a few minutes, but you can also play for extended sessions like for example when you're passing through diamonds in the toilet.



---

## 📌 Use case summary


| Use Case | Implemented (Yes/No) | Demonstration / Notes |
|----------|----------------------|------------------------|
| Main menu that has a start game button | Yes | Eventually we'll add a load game button |
| Player starts a new game and enters a randomly generated dungeon | Yes |  |
| Player moves and can engage enemies | Yes | |
| Player and enemy stats | Yes | |
| Player gains EXP and levels up | Yes | |
| Player can find and equip items | Partly | Support is there but no items yet |
| Dungeon enemies scale in difficulty | Yes | |
| Boss enemies | No | |
| Player death creates a shareable dungeon link | Partly | |
| Looting other players corpses | No | |
| UI displays Health, EXP and Gear | Partly | Health and EXP are implemented |



---

## ✍️ Technical implementation

The game is built using JavaScript for core gameplay logic and mechanics. React is used to break the game down into modular pieces that are easy to modify without breaking something else. SQL handles backend storage for player information and dungeon seeds. HTML and CSS are used for visually styling the game and bringing in 2D assets.

---

## 🚂 Development process

At first we created a sort of mock-up of the game only using Javascript, CSS and HMTL canvas, and thought that it would be easy to bring that to React and separate it into modular pieces. It wasn't and converting proved to be a relatively huge undertaking. Once converted the project became easy to manage so there's no real issues after that since we're really just following the original plan we have for the project. 

---

## ☀️ Reflection and future work

As stated before we underestimated the amount of work it would be to make a game in React, but once everything was set up, it was easy to actually work on adding more features and visuals. Once we had an issue near the beginning of the project where both of us were working on large commits at the same time and that caused issues when merging those together. In the future if we continue working on this project, we'll most likely make a version that runs native on windows and linux. That would allow us to spend more time making a more feature rich game.

---

## 📊 Work Hours Log


| Date  | Used hours | Subject(s) |  outcome |
| :---  |     :---:      |     :---:      |     :---:      |
| 19.3.2025 | 40 mins | Planning the phase 1  | Defined User Personas  |
| 27.3.2025 | 4 hours | Planning project structure | Created initial structure |
| 27.3.2025 | 3 hours | Working on player movement | Created base for movement |
| 5.4.2025 | 2 hours | Working on database implementation | SQLite implemented |
| 11.4.2025 | 2 hours | Making assets and implementing them | Graphics enhanced |
| 12.4.2025 | 3 hours | Fixing previous SQLite implementation | Failed |
| 13.4.2025 | 4 hours | Working on menu, UI and backend stuff | SQLite fixed and graphics enhanced |
| 19.4.2025 | 6 hours | Implementing randomly generated maps and enemies | Random generation implemented |
| 24.4.2025 | 3 hours | Working on visuals | Made new sprite for wall tiles, fixed tile scaling issue and changed the UI font |
| 25.4.2025 | 2 hours | Virtual machine and Azure | Project now runs on Virtual machine and on Azure |

---

## 🪢 Presentation link

https://vimeo.com/1078749306/ec9e664a25?share=copy

## Access the Game

[Palace of the Holder](http://palaceoftheholder.northeurope.cloudapp.azure.com/)

Please click the link above to access the game.
