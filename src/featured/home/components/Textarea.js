import { IconSend } from "@tabler/icons-react";
import { toast } from "sonner";
import { useTranslate } from "../context/TranslateContext";

import './styles/textarea.css'

export default function Textarea () {

    const { texto, handleChangeText, handleTranslation } = useTranslate();

    const handleTranslate = () => {
        if (texto === '') return toast.warning('Alerta', { description: 'Ingresa un texto antes de continuar.' })
            handleTranslation(texto)
    }

    return (

        <div className='--textbox'>
            <textarea placeholder="Escribe algo para traducir..." value={texto} className="--textarea" onChange={(e) => handleChangeText(e.target.value)}/>
            <button className='--btn-send' onClick={handleTranslate}><IconSend stroke={'#888'} strokeWidth={1.2} size={24}/></button>
        </div>

    )

}