const fs = require("fs")
const Discord = require("discord.js")
const { REST } = require("@discordjs/rest") 
const { Routes } = require("discord-api-types/v9")
const { clientId } = require("./config.json")
const commands = []

fs.readdirSync(`./slashcmd`).forEach(subcarpetas => {
  
const slashcommandsFiles = fs.readdirSync(`./slashcmd/${subcarpetas}`).filter(file => file.endsWith('js'));

for (const file of slashcommandsFiles) {
  const slash = require(`./slashcmd/${subcarpetas}/${file}`)
  commands.push(slash.data.toJSON())
   }
})

const rest = new REST({ version: "9" }).setToken(process.env.token)

module.exports = async function createSlash(){
  try{
    await rest.put(
      Routes.applicationCommands(clientId), {
        body: commands
      }
    )
      require("colors")
      { console.log ("╔═════════════════════════════════╗".brightGreen) }
      { console.log ("║                                 ║".brightGreen) }
      { console.log ("║    Slash commands agregados.    ║".brightGreen) }
      { console.log ("║                                 ║".brightGreen) }
      { console.log ("╚═════════════════════════════════╝".brightGreen) }
  } catch(e) {
    console.error(e)
  }
}