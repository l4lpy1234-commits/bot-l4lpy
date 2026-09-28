const noblox = require('noblox.js');
const express = require('express');
const app = express();

app.use(express.json());
const PORT = process.env.PORT || 3000;

async function iniciarBot() {
    try {
        await noblox.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CAEQAhoGCAIQBBgBIhsKBGR1aWQSEzYxMzQ4NzMwMTUxMjkxMDUwODEiDgoFdW5hbWUSBWw0bHB5IhIKA3VpZBILMTE3MzA3Mzg1ODUoAw.OcmseF9vYoBC3QS6Cb0qv7BngTiSvqgeAzutyqrFTVpdaVTPitS3hgfx9dDa8ouTBs3CMNrPFqwPPJrw8WFkNn_LQPUVCKhu6sn7mqctnDJTO7GZSidxxG55lraad8b5bQVJI7NdwA36EEyNvfVl-dEJLgKtBxfwpJHLiyQX1kiu-7_uhFzn5TFoL3GIPzYEQENXc2-Q3RSJ0qUPVGmOERZoQACw8hjir5dp9nRPS9lRFChydmqkicpVugEWBz7rgzslYWjpWZmeujj45NR1t6kU5k3-_rLZjbIRiip8NIS-dUGDsI8Ilmj_cZTCM00WuMJCsVUHRE-01bMC8sC7UZFF3KgNCLPkFm1782fpERdJ4pwpjsMto38KWnlGaLj6yfqSIsHDyyI96BF8O6K7tzh7SrNuvgV4UUKmd3sP2ctK3olTKaaBgWCR67D8sm6ge2x0zYTZ2qfiZEk3mjvE-PQlPRLDC_k8M7t7vnvxmFtJLKhfk6eH6Nz1HM3iy0i5TdDC1ooIhxfkwZGRIolUjvOMi_acHrbM5v-nuADNLgVHykeUNQGU5wzPn3dVT3O3Z7-ewQF9SOp7TB5eoGY5I_dsso3UELm4F_Vw1B1IMtMMA49nN6mKknrwa2f5bmd0BvZmIndG_AgcDgDvbCvDGO1NodSI-lI_NCGGNvVzDm15e5KQ2tX0UfNymNz77wQVHQ0MFF35dzA-LZvri12WJMCJFdozMjhjxY8DPfJ_wbE7RY6FQLQt6FpEi55FAg0HmEY-Zxq-uY5M8YQH7K3ew93jAytBqtj9aBNREjFhpMa0AG0aMNA3gNKZHhNmsR7Mh3Y0LJe6Yjyjp00dYiuS8e3jM5qa_-N8NiyMeiI4XYwnNRdhfv26IKkaVboIpSb6fMQpylD12ZA8vhLnM4SzjQ.VKYuAO13jApXYbXTWJeJeGFWtrI");
        const currentUser = await noblox.getCurrentUser();
        console.log(`¡Bot conectado exitosamente como: ${currentUser.UserName}!`);
    } catch (error) {
        console.error("Error al iniciar sesión en Roblox:", error);
    }
}

iniciarBot();

// Ruta de prueba directa vía navegador con la ID fija
app.get('/seguir-directo', async (req, res) => {
    try {
        const targetId = 8873453002;
        await noblox.follow(targetId);
        console.log(`¡Éxito! El bot siguió directamente a la ID: ${targetId}`);
        res.send(`¡LISTO! El bot ya siguió a la ID ${targetId}. Revisa el perfil.`);
    } catch (error) {
        console.error("Error al seguir por enlace directo:", error);
        res.send("Error al intentar seguir: " + error.message);
    }
});

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
