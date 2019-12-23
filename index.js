const inject = (client_object, field) => {
    new Promise((resolve, reject) => {
        client = client_object;
        delete module.exports['inject'];
        try {
            if (!client.dataManager) throw new Error("Sorry, discord.js only!")
            Object.defineProperty(client, field ? field : 'pagination', {
                get: function () { return module.exports['Pages']; },
                enumerable: false,
                configurable: false
            })
            resolve(true);
        } catch (error) {
            throw new Error(error.message === 'Sorry, discord.js only!' ? 'Sorry, discord.js only!' : "Please, provide a client");
        };
    });
}
const checkForClient = () => this.client ? true : new Error("No client provided");
/** 
* Author @MiracleUnona
* Author https://github.com/MiracleUnona
*/
const Pages = class Pages {
    constructor(userId = '', pages = [], time = 120000, reactions = {
        first: '⏪', back: '⬅', stop: '⏸', next: '➡', last: '⏩'
    }) {
        this.pages = pages;
        this.time = time;
        this.reactions = reactions;
        this.page = 1;
        this.userId = userId
    }

    add(page) {
        this.pages.push(page);
    }

    async send(channel) {
        const msg = await channel.send(this.pages[0]);
        this.msg = msg;
        await this.addReactions();
        this.createCollector(this.userId);
        return msg;
    }

    select(page = 1) {
        this.page = page;
        this.msg.edit(this.pages[page - 1]);
    }

    createCollector(userId) {
        const collector = this.msg.createReactionCollector((_, u) => u.id === userId, { time: this.time });
        this.collector = collector;
        collector.on('collect', react => {
            if (react.emoji.name === this.reactions.back && this.page !== 1) this.select(this.page - 1);
            else if (react.emoji.name === this.reactions.stop) {
                this.msg.delete().catch(err => { });
                this.collector.stop()
            } else if (react.emoji.name === this.reactions.first) {
                this.select(1);
            } else if (react.emoji.name === this.reactions.last) {
                this.select(this.pages.length);
            }
            else if (react.emoji.name === this.reactions.next && this.page !== this.pages.length) this.select(this.page + 1);

            react.remove(userId).catch(() => { });
        });
        collector.on('end', () => this.msg.clearReactions());
    }
    async addReactions() {
        if (this.reactions.first) await this.msg.react(this.reactions.first);
        if (this.reactions.back) await this.msg.react(this.reactions.back);
        if (this.reactions.next) await this.msg.react(this.reactions.next);
        if (this.reactions.last) await this.msg.react(this.reactions.last);
        if (this.reactions.stop) await this.msg.react(this.reactions.stop);
    }
}


module.exports = {
    inject, Pages
}
