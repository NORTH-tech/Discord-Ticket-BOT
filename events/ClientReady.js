module.exports = async (client) => {
    //icon&name set
    const iconurl = await client.user.displayAvatarURL()
    const name = await client.user.username
    global.boticon = iconurl;
    global.botname = name;

    const size = client.guilds.cache.size
    client.user.setActivity({
        name: `How to use 'help'`
    })

    console.log("Bot is now online!!!")
}