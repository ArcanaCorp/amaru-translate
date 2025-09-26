import { UIProvider } from "../featured/context/UIContext"
import { TranslateProvider } from "../featured/home/context/TranslateContext"

export default function Providers ({ children }) {
    return (
        <UIProvider>
            <TranslateProvider>
                {children}
            </TranslateProvider>
        </UIProvider>
    )
}