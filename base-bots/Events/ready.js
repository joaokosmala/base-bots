const client = require("../index")

client.on("ready", () => {
    let activities = [
        `com 💖 pelo DG`,
        `Hitmans - OFICIAL`,
        `ComplexoRJ - OFICIAL`
    ],
        i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`),
     10000); 

    client.user
        .setStatus("online")

    client.user.setStatus("online")
    console.log(`✅ - O sistema de status foi iniciado!`)
});