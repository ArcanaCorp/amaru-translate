import './styles/page.css'
import Textarea from './components/Textarea';
import Messages from './components/Messages';
import { useEffect, useRef } from 'react';
import { useTranslate } from './context/TranslateContext';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useUI } from '../context/UIContext';

export default function HomePage () {

    const { theme, toggleTheme } = useUI();
    const { messages } = useTranslate();
    const containerRef = useRef(null);
    
    useEffect(() => {
        const el = containerRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight; // 🚀 baja siempre al final
        }
    }, [messages]);

    return (

        <div className="--window">

            <header className='--header'>
                <div className='--content'>
                    <h1>Kuyaay</h1>
                    <div className='--col'>
                        <button className='--btn --btn-lenguaje'>QUECHUA</button>
                        <button className='--btn --btn-theme' onClick={toggleTheme}>{theme === 'light' ? <IconMoon size={24} strokeWidth={1.2} /> : <IconSun size={24} strokeWidth={1.2} />}</button>
                    </div>
                </div>
            </header>
            
            <main className='--main'>
                <div className="--content" ref={containerRef}>

                    <h1 className='--tit'>
                        <p className='--tit-a'>Bienvenido</p>
                        <p className='--tit-b'>¿Qué vas aprender hoy?</p>
                    </h1>

                    <Messages/>

                </div>
            </main>

            <footer className='--footer'>
                <div className='--content'>
                    <Textarea/>
                </div>
            </footer>

        </div>

    )

}