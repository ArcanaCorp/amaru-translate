import './styles/page.css'
import Textarea from './components/Textarea';
import Messages from './components/Messages';
import { useEffect, useRef } from 'react';
import { useTranslate } from './context/TranslateContext';

export default function HomePage () {

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
                    <h1>Amaru</h1>
                    <div>ESP-QUE</div>
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