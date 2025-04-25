# Phase 4 – Project Presentation


## 🎯 Project title

Palace of the Holder

---

## 📝 Project overview


Fast-paced dungeon crawler built with Javascript and React, while utilizing SQL tables. Players explore randomly generated dungeons, fight varies types of enemies, gain experience points, level up and find new gear. Dungeons scale up in difficulty  as the player progresses through the floors of the dungeon, and there's even some harder boss monsters to encounter. The game has a mechanic that records the place of death and gear the player had, and lets spits out a link that player can then share with someone else. That someone can then find the corpse and gear of that player, and be more equipped to handle the challenges ahead. Our target audience is anyone who needs to waste a few minutes, but you can also play for extended sessions like for example when you're passing through diamonds in the toilet.



---

## 📌 Use case summary


| Use Case | Implemented (Yes/No) | Demonstration / Notes |
|----------|----------------------|------------------------|
| Main menu that has a start game button | Yes |  |
| Player starts a new game and enters a randomly generated dungeon | Yes |  |
| Player moves and can engage enemies | Yes | |
| Player and enemy stats | Yes | |
| Player gains EXP and levels up | Yes | |
| Player can find and equip items | No | |
| Dungeon enemies scale in difficulty | Yes | |
| Boss enemies | No | |
| Player death creates a shareable dungeon link | Partly | |
| Looting other players corpses | No | |
| UI displays Health, EXP and Gear | Partly | Health and EXP are implemented |



---

## ✍️ Technical implementation

_Describe technologies used, architectural decisions, and how key features were implemented._

The game is built using JavaScript for core gameplay logic and mechanics. React is used to break the game down into modular pieces that are easy to modify without breaking something else. SQL handles backend storage for player information and dungeon seeds. HTML and CSS are used for visually styling the game and bringing in 2D assets.

---

## 🚂 Development process

_Summarize your progress from start to finish, mentioning key decisions or changes along the way._

At first we created a sort of mock-up of the game only using Javascript, CSS and HMTL canvas, and thought that it would be easy to bring that to React and separate it into modular pieces. It wasn't and converting proved to be a relatively huge undertaking. Once converted the project became easy to manage so there's no real issues after that since we're just really following the original plan we have for the project.

---

## ☀️ Reflection and future work

_What worked well? What challenges did you face? What would you add or improve in the future?_



---

## 📊 Work Hours Log

_You can copy from the logbook here._

| Date  | Used hours | Subject(s) |  outcome |
| :---  |     :---:      |     :---:      |     :---:      |
| 19.3.2025 | 40 mins | Planning the phase 1  | Defined User Personas  |
| 27.3.2025 | 4 hours | Planning project structure | Created initial structure |
| 27.3.2025 | 3 hours | Working on player movement | Created base for movement |
| 5.4.2025 | 2 hours | Working on database implementation | SQLite implemented |
| 11.4.2025 | 2 hours | Making assets and implementing them | Graphics enhanced |
| 12.4.2025 | 3 hours | Fixing previous SQLite implementation | Failed |
| 13.4.2025 | 4 hours | Working on menu, UI and backend stuff | SQLite fixed and graphics enhanced |

---

## 🪢 Presentation link

_Add a link to your video presentation or state that it was presented live._
