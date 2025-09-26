import { TranslateProvider } from "../featured/home/context/TranslateContext"

export default function Providers ({ children }) {
    return (
        <TranslateProvider>
            {children}
        </TranslateProvider>
    )
}