![cardforge](https://socialify.git.ci/Vincent-the-gamer/cardforge/image?description=1&font=Rokkitt&language=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2FVincent-the-gamer%2Fcardforge%2Fmain%2F.github%2Flogo%2Fcardforge-logo.png&name=1&owner=1&pattern=Formal%20Invitation&stargazers=1&theme=Auto)

<h1 align="center">CardForge</h1>

<p align="center">A HearthStone card maker.</p>

<p align="center" style="font-style: italic;">Alpha Version: V0.1.2</p>

<p align="center">
    <a href="https://github.com/vincent-the-gamer/cardforge/blob/main/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/vincent-the-gamer/cardforge?style=flat-square"/>
    </a>
</p>

<p align="center">
    <span>English</span>
    <span>|</span>
    <a href="./README_zh.md">中文文档</a>
</p>

> [!NOTE]
> This repo is in progress, some details will be added in the future.

# Features
- 💪 Real-time card part switching --- Card is built by tiny parts instead of pre-exported pictures.
- 🌏 i18n --- multi-language support.
- 👀 Keep Newest --- Sync with latest version of HearthStone game.
- 😁 High Similarity --- try my best to make the cards look like those in game.
- 🆒 [Passive Control](#passive-control) --- call websocket server to control your web page, then get your picture^_^.

## Feature Details
### Passive Control 
Server required. Download it in [v0.0.6 Alpha Release](https://github.com/Vincent-the-gamer/cardforge/releases/tag/v0.0.6-alpha).

#### How to use `Passive Control Server`
- [Download](https://github.com/Vincent-the-gamer/cardforge/releases/tag/v0.0.6-alpha).

- Run!
  ```shell
  # Run at default port 8081
  ./cardforge-passive-server
  cardforge-passive-server.exe

  # Run at custom port
  ./cardforge-passive-server 9000
  cardforge-passive-server.exe 9000
  ```

#### Demo
Send JSON message to websocket server to control your webpage. (Please do not close your webpage.)

🚧 Warning: 🚧
the card face picture will have a fixed position and size in `Passive Control Mode` , so please
adjust picture yourselves. 

Using this data structure to control the page.

PS: you shouldn't bring the comments while sending message to server.(JSON doesn't allow comments).

```js
{
    "language": "en",
    "cardType": "spell",
    "classType": "dual",
    "cardClass": "mage",    // Only work while classType === "single"
    "leftClass": "warrior", // Only work while classType === "dual"
    "rightClass": "hunter", // Only work while classType === "dual"
    "rarity": "rare",
    "name": "Test",
    "kindType": "dual",
    "cardKind": "kind",  // Only work while cardKind === "single"
    "upKind": "kind1",   // Only work while cardKind === "dual"
    "downKind": "kind2", // Only work while cardKind === "dual"
    "description": "**Battlecry**: Testing.",
    "watermark": "year-of-the-wolf",
    "desFontSize": 20,
    "cost": 3,
    "vitality": 3, // Work in Minion, Battleground Minion, Hero(armor), Weapon(durability), Location(durability)
    "armor": 3,  // Alias of vitality on Hero Cards
    "durability": 3, // Alias of vitality on Weapon Cards/Location Cards
    "cardFaceUrl": "https://image-static.segmentfault.com/596/308/596308474-6389c86c5126c_cover" // web picture is available.
}
```

![passive-control-demo](./.github/passive-control-demo.gif)

#### Interact with Koishi Plugin

What is Koishi? A bot framework for multiple chatting platforms. 

Link: [Koishi.js](https://koishi.chat/zh-CN/)

Use `Passive Control Server` above for implementation.

![cardforge-koishi](./.github/cardforge-koishi.png)

Plugin is coming soon.

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

## Hero
| Chinese | English |
|  -      |   -     | 
|  ![hero-zh](./.github/cards/hero-zh.png)       |   ![hero-en](./.github/cards/hero-en.png)  |

## Location
| Chinese | English |
|  -      |   -     | 
|  ![hero-zh](./.github/cards/location-zh.png)       |   ![hero-en](./.github/cards/location-en.png)  |

# License
[MIT](./LICENSE)