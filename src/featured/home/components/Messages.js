import { toast } from "sonner";
import { IconCopy, IconVolume } from "@tabler/icons-react";
import { useTranslate } from "../context/TranslateContext"

import './styles/messages.css'

export default function Messages () {

    const { messages } = useTranslate();

    const handleCopy = async (copie) => {
        try {
            await navigator.clipboard.writeText(copie);
            toast.success('Éxito', { description: 'Se copió el texto' })
        } catch (error) {
            toast.error('Error', { description: `Error al copiar: ${error}` })
        }
    }

    const handleSpeak = (text) => {
        if (!text) return toast.warning('Alerta', { description: 'No hay texto para leer o no es legible' });
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "qu-PE"; // 👈 si quieres que intente voz Quechua (depende soporte del navegador)
            utterance.rate = 1;
            utterance.pitch = 1;

            utterance.onerror = (err) => {
                toast.error("Error", { description: `No se pudo leer el texto: ${err.error}` });
            };

            speechSynthesis.speak(utterance);
    };

    return (

        messages.map((m, i) => (
            <div key={i} className={`--row-burble --row-burble-${m.type}`}>
                <div className={`--burble --burble-${m.type}`} dangerouslySetInnerHTML={{__html: m.text}}/>
                {m.type === 'response' && (
                    <>
                        <button className='--btn --btn-voz' onClick={() => handleSpeak(m.text)}><IconVolume size={18} strokeWidth={1.2} stroke={'#181818'}/></button>
                        <button className="--btn --btn-copy" onClick={() => handleCopy(m.text)}><IconCopy size={18} strokeWidth={1.2} stroke={'#181818'}/></button>
                    </>
                )}
            </div>
        ))

    )

}