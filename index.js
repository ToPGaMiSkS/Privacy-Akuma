const Discord = require("discord.js");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const mongoose = require("mongoose");
const { MessageEmbed, Collection, Guild } = require("discord.js");
const keepAlive = require('./server.js');
const express = require("express")().get("/", (req,res)=>res.send("<h1>🎉 ¡Bot Encendido! 👍</h1>")).listen(3000)

const qdb = require('quick.db')

require('dotenv').config();

client.on('ready', () => {

  const loadSlash = require("./slashcommands.js");

  ///Presencia///
  
  const time = (1000*5)

  let status = [
   [{
      name: `/help para ver meus comandos.`,
      type: 'PLAYING'
    }],
    [{
      name: `meu criador me desenvovendo.`,
      type: 'WATCHING'
    }],
    [{
      name: `🟢 Estou Ligado e Tentando ajudar a todos!`,
      type: 'LISTENING'
    }],
    [{
      name: `👤 Usuarios:${client.users.cache.size}`,
      type: 'WATCHING'
    }],
    [{
      name: `📢 Canais de Texto:${client.channels.cache.size}`,
      type: 'WATCHING'
    }],
    [{
      name: `📖 Servidores: ${client.guilds.cache.size}`,
      type: 'WATCHING'
    }]
  ]
  setInterval(()=>{
    function randomStatus() {
      let rstatus = status[Math.floor(Math.random() * status.length)];
      client.user.setPresence({ activities: rstatus, status: 'dnd' });
    }
    randomStatus();
  }, time )

  ///Presencia/// 

  require('colors')
  { console.log("╔══════════════════════╗".brightGreen) }
  { console.log("║     Estoy Listo      ║".brightGreen) }
  { console.log("║   Preparado a Todo   ║".brightGreen) }
  { console.log("╚══════════════════════╝".brightGreen) }
  { console.log("╔═════════════════════╗".brightGreen) }
  { console.log("║   Akuma     | Bot   ║".brightGreen) }
  { console.log("║   Bot Esta En Run   ║".brightGreen) }
  { console.log("╚═════════════════════╝".brightGreen) }

  loadSlash();

  ///Evitar Crasheos///

    process.on('unhandledRejection', error => {
      console.error(`¡Crasheo Evitado!\nError: ${error}`);
  });

    client.on('shardError', error => {
      console.error(`¡Crasheo Evitado!\nError: ${error}`);
  });

    const botlisto = new Discord.MessageEmbed()
     .setAuthor({ name: `Estado de ${client.user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
     .setDescription(`> **▬▬▬ \🤖 Bot \🤖 ▬▬▬**\n> \n> **🟢 Estou Funcionando **\n> \n> **⚡ Comandos Carregados**\n> \n> **📡 Base De Dados Conectada** \n> \n> **▬▬▬ \📄 Info \📄 ▬▬▬** \n> \n> **📖 Servidores: ${client.guilds.cache.size} **\n > \n> **👤 Usuarios: ${client.users.cache.size} **\n> \n> **📢 Canais: ${client.channels.cache.size} **\n> \n> **📚 Comandos: ${client.slashcommands.size} **`)
  .setThumbnail(client.user.avatarURL({ dynamic: true }))
   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
})
///Mongoose///

mongoose.connect((process.env.mongoose), {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
require("colors")
{ console.log ("╔═════════════════════════════════════╗".brightGreen) }
{ console.log ("║                                     ║".brightGreen) }
{ console.log ("║  Conectado correctamente a MongoDB  ║".brightGreen) }
{ console.log ("║                                     ║".brightGreen) }
{ console.log ("╚═════════════════════════════════════╝".brightGreen) }
}).catch(() => {
require("colors")
{ console.log ("╔════════════════════════════════════════════╗".red) }
{ console.log ("║                                            ║".red) }
{ console.log ("║  Ocurrió un error al conectarse a MongoDB  ║".red) }
{ console.log ("║                                            ║".red) }
{ console.log ("╚════════════════════════════════════════════╝".red) }
})
  
///Mongoose///

///Distube///

const { DisTube } = require('distube');
client.distube = new DisTube(client, {
  emitNewSongOnly: false
});

client.distube.on("playSong", async (queue, song) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("🎶 Reproduciendo ahora 🎶")
  .setDescription(`[${song.name}](${song.url}) | \`${song.formattedDuration}\``)
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(song.thumbnail)
  .setFooter({ text: `Canción añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({ dynamic: true}) })
  
  queue.textChannel.send({ embeds: [embed] })
});

client.distube.on("addSong", async (queue, song) => {

  const embed = new Discord.MessageEmbed()
  .setTitle("🎶 Canción añadida 🎶")
  .setDescription(`[${song.name}](${song.url}) | \`${song.formattedDuration}\``)
  .setColor("RANDOM")
  .setTimestamp()
  .setThumbnail(song.thumbnail)
  .setFooter({ text: `Canción añadida por ${song.user.tag}`, iconURL: song.user.displayAvatarURL({ dynamic: true}) })

queue.textChannel.send({ embeds: [embed] })

});

client.distube.on('finish', queue => { 
  queue.textChannel.send('Ha finalizado la lista de canciones.')
  client.distube.voices.leave(queue.voice.channel)
})


///Niveles Resetear///

client.on("guildMemberRemove", async (member) => {
if(member.guild.id === "979832140386693231"){
      const data = require("./Schemas/LevelsSchema")
       const { findOneAndDelete } = require("./Schemas/LevelsSchema");
        await data.findOneAndDelete({ guildId: message.guild.id, userId: message.user.id })

     const embed = new Discord.MessageEmbed()
        .setTitle(`\`\`\`DATOS BORRADOS\`\`\``)
        
        client.channels.cache.get("979832140944519260").send({ embeds: [embed]})

}
})

///Niveles Resetear///

///Tic-Tac-Toe///

const { Client } = require("djs-minigames")

client.games = new Client({
  emotEvents: true,
  language: "ES", 
  playMoreTahnOne: false,
  defaultTimeout: 60000,
})

client.games.on("tictactoeEnd", async(data) => {
  if(data.status === "won"){
    const embed = new Discord.MessageEmbed()
    .setTitle("TicTacToe terminado")
    .setDescription(`Se enfrentaron ${data.target.username} Vs ${data.user.username} y ganó ${data.winner.username}.`)
    .setColor("RANDOM")
    .setTimestamp()

    return data.textChannel.send({ embeds: [embed] })
  }

  if(data.status === "tied"){
    const embed = new Discord.MessageEmbed()
    .setTitle("TicTacToe terminado")
    .setDescription(`Se enfrentaron ${data.target.username} Vs ${data.user.username} y quedaron empate.`)
    .setColor("RANDOM")
    .setTimestamp()

    return data.textChannel.send({ embeds: [embed] })
  }
})

///Tic-Tac-Toe///

///Slash Commands///

const fs = require('fs')
let { readdirSync } = require('fs') 

client.slashcommands = new Discord.Collection();

  require("colors")
  { console.log(`╔════════════════ Slash Commands ═════════════════`.brightGreen) }

fs.readdirSync(`./slashcmd`).forEach(subcarpetas => {
  
const slashcommandsFiles = fs.readdirSync(`./slashcmd/${subcarpetas}`).filter(file => file.endsWith('js'));
  
for (const file of slashcommandsFiles) {
  const slash = require(`./slashcmd/${subcarpetas}/${file}`)
  require("colors")
  { console.log(`║ Slash Commands - ${file.replace(/.js/, "")} Cargado.`.brightGreen) }
  client.slashcommands.set(slash.data.name, slash)
}

})

  require("colors")
  { console.log(`╚═══════════════════════════════════════════════════`.brightGreen) }

client.on("interactionCreate", async (interaction) => {

  ///Verificación///

  if(interaction.isButton()){
      if(interaction.customId === "verificarte"){
        const db = require("quick.db")
        const role = await db.get(`rolv_${interaction.guild.id}`)

        const member = interaction.member
        
        member.roles.add(role)
        interaction.reply({ content: '¡Te has verificado correctamente!', ephemeral: true });
       }
      }

  ///Verificación///

   ///Tickets///

    if(interaction.isButton()){
    if(interaction.customId === "tickets"){
      
      const everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
   interaction.guild.channels.create(`${interaction.user.username}`, {
        type: "GUILD_TEXT",
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: everyone.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          }
        ]
      
      }).then(c => {
        const mensaje = new Discord.MessageEmbed()
        .setTitle(`Bienvenido a tu ticket ${interaction.user.username}.`)
        .setDescription(`👋 Bienvenido ${interaction.user} 👋, gracias por abrir ticket.

Se te atendera en un momento, solo ten paciencia mientras un miembro del staff te atiende.`)
        .setColor("RANDOM")

        const row2 = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton()
    .setCustomId("Cerrar")
    .setStyle("SUCCESS")
    .setLabel("Fechar Ticket")
    .setEmoji("🎟")
    )

        c.send({ embeds: [mensaje], components: [row2] })
      })
      interaction.reply({ content: `${interaction.user} Seu ticket foi criado, vá até lá em cima na barra de canais!`, ephemeral: true });
    
    }
  }   

  if(interaction.isButton()){
    if(interaction.customId === "Fechar"){ 

      if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true })

      const embed = new Discord.MessageEmbed()
      .setDescription(`**👮‍♂️ Já foi atendido?

🎟 Pulsa el boton para fechar el ticket.**`)
      .setColor("RANDOM")
      
      const cerrar = new Discord.MessageActionRow()
      .addComponents([

      new Discord.MessageButton().setStyle("SUCCESS").setLabel("Fechar Ticket").setEmoji("🎟").setCustomId("borrar")
    ])

      interaction.reply({ embeds: [embed], components: [cerrar] })
      
    }
  }

    if(interaction.isButton()){
    if(interaction.customId === "borrar"){ 

      if(!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply({ content: "¡No tienes permisos para esto!", ephemeral: true })
          
      interaction.channel.delete(`${interaction.channels}`)
      
    }
  }

  ///Tickets///

    ///Sugerencias///

    if(interaction.isButton()){
        const sugSchema = require("./Schemas/SugerenciasSchema")
        const votosSchema = require("./Schemas/VotosSchema")
        try{
            let setup_data = await sugSchema.findOne({ guildId: interaction.guild.id })
            let msg_data = await votosSchema.findOne({ messageId: interaction.message.id })
    
            if(!msg_data || !setup_data || !setup_data.channelId || interaction.channelId !== setup_data.channelId) return
            switch(interaction.customId){
                case "votar_si": {
                    if(msg_data.si.includes(interaction.user.id)) return interaction.reply({ content: `Ya has votado \`si\` en la sugerencia de <@${msg_data.author}>.`, ephemeral: true })
    
                    if(msg_data.no.includes(interaction.user.id)) msg_data.no.splice(msg_data.no.indexOf(interaction.user.id), 1)
    
                    msg_data.si.push(interaction.user.id)
                    msg_data.save()
    
                    interaction.message.embeds[0].fields[0].value = `\`\`\`${msg_data.si.length} votos \`\`\``;
                    interaction.message.embeds[0].fields[1].value = `\`\`\`${msg_data.no.length} votos \`\`\``;
    
                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();
    
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] })
                    interaction.deferUpdate()
                }
                    break;
    
                case "votar_no": {
                    if(msg_data.no.includes(interaction.user.id)) return interaction.reply({ content: `Ya has votado \`no\` en la sugerencia de <@${msg_data.author}>.`, ephemeral: true })
                    if(msg_data.si.includes(interaction.user.id)) msg_data.si.splice(msg_data.si.indexOf(interaction.user.id), 1)
                    msg_data.no.push(interaction.user.id)
                    msg_data.save()
    
                    interaction.message.embeds[0].fields[0].value = `\`\`\`${msg_data.si.length} votos \`\`\``;
                    interaction.message.embeds[0].fields[1].value = `\`\`\`${msg_data.no.length} votos \`\`\``;
    
                    interaction.message.components[0].components[0].label = msg_data.si.length.toString();
                    interaction.message.components[0].components[1].label = msg_data.no.length.toString();
    
                    await interaction.message.edit({ embeds: [interaction.message.embeds[0]], components: [interaction.message.components[0]] })
                    interaction.deferUpdate()
                }
                    break;
                case "ver_votos": {
                    interaction.reply({
                        embeds: [new Discord.MessageEmbed()
                            .setTitle("Votos de la sugerencia")
                            .addField("✅ Votos positivos", msg_data.si.length >= 1 ? msg_data.si.map(u => `<@${u}>\n`).toString() : "No hay votos.", true)
                            .addField("❌ Votos negativos", msg_data.no.length >= 1 ? msg_data.no.map(u => `<@${u}>\n`).toString() : "No hay votos.", true)
                            .setColor("RANDOM")
                        ],
    
                        ephemeral: true,
                    })
                }
                    break;
                
                default: 
                    break;
            }
        } catch(e){
            console.log(e)
        }

    }
  
  ///Sugerencias///

  ///Slash Commands///
  
  if (interaction.isCommand()) {
    
    const slashcmds = client.slashcommands.get(interaction.commandName)

    if(!slashcmds) return;

    try{

          const perms = interaction.user.id === "835232480931348531" || interaction.user.id === "979884922468712550"
    
    if (perms) return interaction.reply({ content: "Tú no puedes interactuar conmigo.", ephemeral: true })

      
      await slashcmds.run(client, interaction)
    } catch(e) {
      console.error(e)
    }
  }

  ///Slash Commands///
  
  ///Reseñas///
  
  if (interaction.isModalSubmit()) {
    if (interaction.customId === "reseña") {
      const reseñaenviar = interaction.fields.getTextInputValue("reseña-enviar");
      const reseñapuntuaje = interaction.fields.getTextInputValue("reseña-puntuaje");

    if(isNaN(reseñapuntuaje) || reseñapuntuaje < 1) {
      return interaction.reply({ content: 'El puntuaje esta inválido intenta escribir un número del 1 al 10.', ephemeral: true })
    }

    if(parseInt(reseñapuntuaje) > 10) {
      return interaction.reply({ content: 'El puntuaje esta inválido intenta escribir un número del 1 al 10.', ephemeral: true })
    } 

      let texto = interaction.fields.getTextInputValue("reseña-enviar")

      if(texto.length > 1024) return interaction.reply({ content: "¡No puedes escribir más de 1024 argumentos!", ephemeral: true })

      const embed = new Discord.MessageEmbed()
          .setTitle("¡Nueva Reseña!")
          .setDescription(`**Hay una nueva reseña de ${interaction.user.username}.**`)
          .addField("📖 | Reseña:", `**${reseñaenviar}**`)
          .addField("⭐ | Puntuaje:", `**${reseñapuntuaje}/10**`)
          .setColor("RANDOM")
    
          interaction.reply({ content: "Tu reseña fue enviada correctamente.", ephemeral: true });

    ///Canales///

    client.channels.cache.get("981379639672963152").send({ embeds: [embed] })
      
    client.channels.cache.get("997319449675841577").send({ embeds: [embed] })

    ///Canales///
      
    }
  } 

    ///Reseñas///
})

  ///Bienvenidas///

client.on("guildMemberAdd", async member => {
  
    const moment = require('moment');

    const qdb = require('quick.db')
  
    const canal = await qdb.get(`bienvenida_${member.guild.id}`)
  
    if(canal === null) return;
    if(canal === undefined) return;
  
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({ name: `😄 Bem vindo ${member.user.tag}! 👋` })
    .setDescription(`😀 Bem vindo ao servidor ${member.guild.name}.\n\n👤 Usuario: ${member.user}\n\n🗓️ Se unio el: ${moment(member.joinedAt).format('YYYY-MM-DD')} \n\n😎 Membro Número: #${member.guild.memberCount}`)
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setImage("https://images-ext-2.discordapp.net/external/d1FYERgN0wNQJvzmZeEAeAC2Ttnnv0YrFH58Mp9M4Kw/https/media.discordapp.net/attachments/907460919016161340/937216403767984188/banner-welcome.gif")
    .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
    .setTimestamp()

   member.client.channels.cache.get(await canal).send({ embeds: [embed] })
  
})

  ///Bienvenidas///

  ///Despedidas///

client.on("guildMemberRemove", async member => {
  
    const moment = require('moment');

    const qdb = require('quick.db')
  
    const canal = await qdb.get(`despedida_${member.guild.id}`)
  
    if(canal === null) return;
    if(canal === undefined) return;
  
  const embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor({ name: `😥 Até mais ${member.user.tag}! 👋` })
    .setDescription(`😔 Alguém foi embora do servidor 😔

👤 Usuario: ${member.user}

📝 Agora somos ${member.guild.memberCount} membros 📝

😢 Esperamos que volte um dia! 😢`)
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setImage("https://static.vecteezy.com/system/resources/thumbnails/003/288/181/small/goodbye-polka-dots-greeting-text-title-expression-vector.jpg")
    .setFooter({ text: member.guild.name, iconURL: member.guild.iconURL({ dynamic: true }) })
    .setTimestamp()

   member.client.channels.cache.get(await canal).send({ embeds: [embed] })
  
})

  ///Despedidas///

client.on("messageCreate", async (message) => {
  
  ///afk//// 

  if(qdb.has(`AFK ${message.author.id}+${message.guild.id}`)){
 await qdb.delete(`AFK ${message.author.id}+${message.guild.id}`)
   message.member.setNickname(`${message.author.username}`)
  message.channel.send({embeds:
    [new Discord.MessageEmbed()
    .setTitle("AFK Removido")
    .setDescription(`Está de volta! 

Seu modo afk foi removido.`)
     .setThumbnail(`${message.author.avatarURL()}`)
    .setFooter({ text: "Seu afk foi removido em exito."})
    .setColor("RANDOM")
     .setTimestamp()
     
    ]})
}

if(message.mentions.members.first()){
  const info = qdb.get(`AFK ${message.mentions.members.first().id}+${message.guild.id}`)
  if(qdb.has(`AFK ${message.mentions.members.first().id}+${message.guild.id}`)){
    message.channel.send({ embeds: [
      new Discord.MessageEmbed()
      .setTitle("AFK Ativo")
      .setDescription(`${message.mentions.users.first()} nõ está disponivel.\n\nMotivo: ${info}`)
      .setColor("RANDOM") ] })
  }
}

  ///afk///

  ///Cuando mencionan el bot///

  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`)))
{

   const links = new Discord.MessageActionRow()
      .addComponents([
        new Discord.MessageButton({
          style: 'LINK',
          url: "https://discord.com/api/oauth2/authorize?client_id=1008099062609887263&permissions=8&scope=bot",
          label: "Me convide a seu server",
          emoji: "🤖",
        }),
        new Discord.MessageButton({
          style: 'LINK',
          url: "https://discord.gg/CFV3d9DZQm",
          label: "Suporte",
          emoji: "🛠",
        })
    ])

  const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`\`👋\` | Oi<@${message.author.id}>!

\`🤖\` | Sou um bot de slash commands.

\`📚\` | Pode ver meus comandos usando: \`/help\`!

\`❓\` | Necesitas de ajuda? Entre em nosso servidor de suporte.`)
    .setThumbnail(client.user.avatarURL())

  message.channel.send({ embeds: [embed], components: [links] })
    
}
  
  ///Cuando mencionan el bot///

  ///Sistema de Niveles///

  if(message.author.bot) return;

  const levels = require("./Schemas/LevelsSchema")
  const config2 = require('./Schemas/config')

  const data2 = await config2.findOne({ guildId: message.guild.id })

  if(!data2){
    let n = new config2({ 
      guildId: message.guild.id,
      activado: false
    })
   await n.save()
  } 
  
  const data = await levels.findOne({ guildId: message.guild.id, userId: message.author.id })
  
  if(data2.activado === false) return;
  if(data2.activado === null) return;
  
let randomXp
if(message.content.length <= 5){
        randomXp = Math.floor(Math.random() * 3) + 1
} else if (message.content.length >= 5 && message.content.length <= 30){
        randomXp = Math.floor(Math.random() * 20) + 1
} else if (message.content.length >= 30 && message.content.length <= 50){
        randomXp = Math.floor(Math.random() * 45) + 1
} else if (message.content.length >= 50 && message.content.length <= 70){
        randomXp = Math.floor(Math.random() * 60) + 1
} else if (message.content.length >= 70 && message.content.length <= 80){
        randomXp = Math.floor(Math.random() * 70) + 1
} else if (message.content.length > 80){
        randomXp = Math.floor(Math.random() * 75) + 1
}

if(!data){
       const newdata = new levels({
             guildId: message.guild.id,
             userId: message.author.id, 
             xp: randomXp,
       })

        return await newdata.save()
}

        const xpTotal = data.xp + randomXp

        if(xpTotal >= data.limit){

          const qdb = require('quick.db')

          let canal = await qdb.get(`niveles_${message.guild.id}`)

    if(client.channels.cache.get(await canal)){

      client.channels.cache.get(await canal).send({ content: `¡Felicidades, **${message.author.username}**! has llegado al nivel **${data.level + 1}**.` })
         } else {
            message.channel.send({ content: `¡Felicidades, **${message.author.username}**! has llegado al nivel **${data.level + 1}**.` })
         } 
      
                return await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal, level: data.level + 1, limit: data.limit + 500})
        }

         await levels.findOneAndUpdate({ guildId: message.guild.id, userId: message.author.id }, { xp: xpTotal})
        
  ///Sistema de Niveles///

  ///Cuando mencionan el bot///

});

///Snipe///

  client.on("messageDelete", async(message) => {
    const snipe = require("./Schemas/SnipeSchema")

    let data = await snipe.findOne({ channelId: message.channel.id })

    if(!data){

      let newdata = new snipe({
        channelId: message.channel.id,
        message: message.content,
        author: message.author.tag,
        time: Math.floor(Date.now() / 1000),
      })

      return await newdata.save()

    }

    await snipe.findOneAndUpdate({
      channelId: message.channel.id,
      message: message.content,
      author: message.author.tag,
      time: Math.floor(Date.now() / 1000),
    })
    
  });

client.on("guildCreate", async (guild) => {
  const embed = new Discord.MessageEmbed()
  .setTitle("Nuevo Servidor")
  .addField("Nombre:", `${guild.name}`)
  .addField("ID:", `${guild.id}`)
  .addField("Owner:", `${await (await guild.fetchOwner()).user.tag}`)
  .addField("ID Owner:", `${guild.ownerId}`)
  .addField("Miembros:", `${guild.memberCount}`)
  .setColor("GREEN")
  .setThumbnail(guild.iconURL())

  client.channels.cache.get("1004884523399516173").send({ embeds: [embed] })
});

client.on("guildDelete", async (guild) => {
    const embed = new Discord.MessageEmbed()
     .setTitle("Me han removido de un servidor")
     .addField("Nombre:", `${guild.name}`)
     .addField("ID:", `${guild.id}`) 
     .addField("Owner:", `${await (await guild.fetchOwner()).user.tag}`)
     .addField("ID Owner:", `${guild.ownerId}`)
     .addField("Miembros:", `${guild.memberCount}`)
     .setColor("GREEN")
     .setThumbnail(guild.iconURL())

  client.channels.cache.get("1004884523399516173").send({ embeds: [embed] })
});

client.login(process.env['token'])