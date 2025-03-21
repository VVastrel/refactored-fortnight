# Project phase 1 - Definition and planning

A Browser based, fast-paced dungeon crawling game. Player character can move around, attack enemies, gain experience, level up and find items that further enhances the player character. Dungeons are randomly generated and divided into floors where the monsters get tougher the further you play. Seed value used to generate the dungeon is stored in a database with unique id. When the player dies, a link is generated that can be shared with other players. This way other players can attempt to beat the same dungeon and find the previous players corpse, that they can then loot for items they had on them when they died.

## 1. User Personas

Casual gamer: player who plays for fun and relaxation, often in short sessions without a focus on hardcore mechanics (even though the game has them).
New player: player who is new to the game and wants to quickly learn the basic mechanics of the game such as movement and combat. -> tutorial

## 2. Use Cases and User Flows

Player presses new game and instantly starts moving around and exploring the randomly generated floor and fighting enemies by running against them. Player engaging with an enemy causes their stats to be calculated against the enemy's stats. For example if the players defense stat and armor has a combined 20% of damage reduction for physical damage, the enemy only does 80% of damage based on their physical attack stat. As the player defeats enemies, they gain experience points and once they've accumulated enough, they'll level up and their stats grow either randomly or based on what is their most used weapon type. With every level up, the amount of experience points needed for the next level up gets larger. Harder enemies also give out more experience points so overall the pacing of level ups should remain smooth. 
Player can also find equippable armor and weapons that boost the players power, so if the player is lucky, they can survive longer if they find good gear. Every 10 or so levels of the dungeon, there are harder boss enemies that are randomized. Boss enemies give out a lot of experience points and drop unique equipment for the player.
When the player dies, they can choose to share the link to their generated dungeon that someone else can then continue to play. Also when shared, the previous players characters corpse can be found at the spot they died, and then looted for their gear. 


## 3. UI Prototypes

Add something

## 4. Information Architecture and Technical Design

We're gonna be using javascript and react for the project, also and using SQL to store player stats, inventory and area info in certain cases. UI such as inventory and player status will be visible at all times, and the game will be designed so that the player can see all the info he needs at a glance.
As detailed at part 2, the combat system is gonna be light on the engagement aspect but is instead based around calculating numbers and using that to determine who comes out on top. Essentially the player just moves toward the enemies and once they touch the game is gonna calculate how much damage is dealt or taken by both. The hook is then leveling up your by winning battles, becoming stronger and being able to progress through the game. 
We're gonna be splitting everything up into different components, so that working on the game will be nice, smooth and modular. We're also aiming to make the game as lightweight as possible so optimizing is one of our main challenges and because of that visually the game is gonna be relatively simple and only use 2D assets.

## 5. Project Management and User Testing

Pre-production phase is gonna include concepting, prototyping and confirming what the project needs when it comes to tech. 
Production phase is then gonna be for actually building the games core mechanics, visuals and maybe sound if we have time.
Testing phase is to detect bugs and design flaws so we can fix everything and ensure the final product will run smooth.
