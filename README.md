<p align="center" style="height: 100px;">
 <img src="./.github/logo/cardforge-logo.png"/>
</p>
<h1 align="center">CardForge</h1>

<p align="center">A HearthStone card DIY tool.</p>

<p align="center" style="font-style: italic;">Alpha Version: V0.0.5</p>

# Notice

This repo is not final, now it can only generate 
- `Minion Cards`
- `Spell Cards`
- `Battlegrounds Minion Cards`
- `Weapon Cards`

# Features
- 💪 Real-time card part switching --- Card is built by tiny parts instead of pre-exported pictures.
- 🌏 i18n --- multi-language support.
- 👀 Keep Newest --- Sync with latest version of HearthStone game.
- 😁 High Similarity --- try my best to make the cards look like those in game.

## Todo: V0.0.6-alpha
- 😃 Hero Cards
- 🆒 Passive Control --- call websocket server to control your web page, then get your picture^_^.
    - Demo see: [Passive Control Demo](#passive-control-demo)
- ...

### Passive Control Demo
Send JSON message to websocket server to control your webpage. (Please do not close your webpage.)

🚧 Warning: the card face picture will have a fixed position and size in `Passive Control Mode` , so please
adjust picture yourselves. 🚧

```json
{
    "cardType": "minion",
    "classType": 0,  // planning to give a string.
    "cardClass": "priest",
    "cost": 7,
    "attack": 7,
    "vitality": 7,
    "rarity": "legendary"
}
```
<video src="./.github/cardforge-demo.mp4" controls="controls" width="500" height="300"></video>



# Play

Play it at：

[https://vincent-the-gamer.github.io/cardforge-live-page/](https://vincent-the-gamer.github.io/cardforge-live-page/)

# Changelog

View Changelog:  [Changelog](./CHANGELOG.md)

# Preview

PS: Not final.

## UI
`i18n` is supported now!!

English:

![preview](./.github/preview.png)

Simplified Chinese(简体中文):
![preview-cn](./.github/preview-cn.png)

## Minion
| Chinese | English |
|  -      |   -     | 
|  ![minion-zh](./.github/cards/minion-zh.png)        |  ![minion-en](./.github/cards/minion-en.png)        |

## Spell
| Chinese | English |
|  -      |   -     | 
|  ![spell-zh](./.github/cards/spell-zh.png)        |  ![spell-en](./.github/cards/spell-en.png)        |

## Weapon
| Chinese | English |
|  -      |   -     | 
|  ![weapon-zh](./.github/cards/weapon-zh.png)       |   ![weapon-en](./.github/cards/weapon-en.png)  |


## Battlegrounds Minion
| Chinese | English |
|  -      |   -     | 
|  ![battlegrounds-zh](./.github/cards/battlegrounds-zh.png)       |   ![battlegrounds-en](./.github/cards/battlegrounds-en.png)  |

# License
[MIT](./LICENSE)