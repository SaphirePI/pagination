# Codeblock selections

- [Codeblock selections](#codeblock-selections)
    - [Установка](#%d0%a3%d1%81%d1%82%d0%b0%d0%bd%d0%be%d0%b2%d0%ba%d0%b0)
    - [Подключенние](#%d0%9f%d0%be%d0%b4%d0%ba%d0%bb%d1%8e%d1%87%d0%b5%d0%bd%d0%bd%d0%b8%d0%b5)
    - [Примеры использования](#%d0%9f%d1%80%d0%b8%d0%bc%d0%b5%d1%80%d1%8b-%d0%b8%d1%81%d0%bf%d0%be%d0%bb%d1%8c%d0%b7%d0%be%d0%b2%d0%b0%d0%bd%d0%b8%d1%8f)
### Установка

```bash
git clone https://github.com/thex49/pagination.git

yarn install
```

Вам потребуется создать папку plugins если ее нет, и перекинуть папку туда.

### Подключенние 
```js
const Discord = require('discord.js');
const client = new Discord.Client();

const module = require('./plugins/pagination/index.js');
module.inject(client);
/*
* Теперь плагин доступен в client.pagination
* Нахождение плагина так же можно измен
* ить если передать второй аргумент
*/
module.inject(client, 'pages');
// Плагин доступен в client.pages
```

### Примеры использования 

```js
let pages = new client.pagination(message.author.id) // <= Айди для фильтра

let embeds = [
    new Discord.RichEmbed().setDescription("This is first page of all pages!"),
    new Discord.RichEmbed().setDescription("This is second page with modifications!").setColor("RANDOM"),
    "This is third page with simple text!"
    ];

for (page in embeds) pages.add(pages[page]);
pages.send(message.channel)
```

![image](https://i.imgur.com/Bq0rhpt.gif)