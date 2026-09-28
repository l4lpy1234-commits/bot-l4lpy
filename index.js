const noblox = require("noblox.js");
const http = require("http");

// Servidor web simple para mantener el bot activo en Render
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot de l4lpy funcionando al 100%\n');
}).listen(process.env.PORT || 3000);

async function iniciarBot() {
    try {
        const usuario = await noblox.setCookie(process.env.ROBLOX_COOKIE);
        console.log("¡Conectado exitosamente como: @" + usuario.name + "!");

        setInterval(async () => {
            try {
                const solicitudes = await noblox.getFriendRequests();
                if (solicitudes && solicitudes.data.length > 0) {
                    console.log("Hay solicitudes pendientes para l4lpy.");
                }
            } catch (e) {
                console.log("Error al verificar solicitudes:", e);
            }
        }, 60000);

    } catch (error) {
        console.error("Error al iniciar sesión con la cookie:", error);
    }
}

iniciarBot();
