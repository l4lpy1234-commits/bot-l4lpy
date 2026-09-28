const noblox = require('noblox.js');
const express = require('express');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

async function iniciarBot() {
    try {
        await noblox.setCookie(process.env.ROBLOSECURITY);
        const currentUser = await noblox.getCurrentUser();
        console.log(`¡Bot conectado exitosamente como: ${currentUser.UserName}!`);
    } catch (error) {
        console.error("Error al iniciar sesión en Roblox:", error);
    }
}

iniciarBot();

// Ruta central para recibir comandos desde tu juego
app.post('/comando', async (req, res) => {
    const { accion, argumento } = req.body;

    try {
        if (accion === "seguir") {
            const userId = await noblox.getIdFromUsername(argumento);
            await noblox.follow(userId);
            return res.json({ success: true, message: `Ahora sigues a ${argumento}` });
        } 
        else if (accion === "unirse") {
            // argumento puede ser el PlaceId del juego al que quieres que entre
            // Nota: unirse a juegos desde noblox.js requiere lógica de Game Join, 
            // por ahora dejamos el espacio preparado para la acción.
            return res.json({ success: true, message: `Acción de unirse recibida` });
        }
        else {
            return res.status(400).json({ error: "Comando desconocido" });
        }
    } catch (error) {
        console.error(`Error ejecutando la acción ${accion}:`, error);
        return res.status(500).json({ error: "Fallo al ejecutar la orden" });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor del bot escuchando en el puerto ${PORT}`);
});
app.get('/seguir-directo', async (req, res) => {
    try {
        await noblox.follow(8873453002);
        res.send("¡LISTO! El bot ya siguió a la ID 8873453002.");
    } catch (error) {
        res.send("Error: " + error.message);
    }
});
