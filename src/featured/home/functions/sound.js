const handlePlaySound = (word) => {
    try {
        const cleanWord = word.trim().toLowerCase();

        // Ruta hacia /public/sound/
        const audioPath = `/sound/${cleanWord}.m4a`;

        const audio = new Audio(audioPath);

        // 🚨 Captura cuando el archivo no existe o no carga
        audio.onerror = () => {
            toast.error("Error", {
                description: `No se encontró el audio para "${cleanWord}"`
            });
        };

        audio.play().catch(err => {
            toast.error("Error", {
                description: `No se pudo reproducir el audio: ${err.message}`
            });
        });

    } catch (error) {
        toast.error("Error", {
            description: `No se pudo reproducir el audio: ${error.message}`
        });
    }
};