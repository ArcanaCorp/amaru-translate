// ===== Diccionario básico =====
const glossary = {
    "casa": "wasi",
    "perro": "allqu",
    "grande": "hatun",
    "día": "punchaw",
    "buenos días": "allin punchaw",
    "hola": "rimaykullayki"
};

// ===== Reglas morfológicas =====
const rules = [
    {
        // Plural -kuna
        pattern: /(.*)s$/, // si termina en "s" en español
        apply: (word, dict) => {
            const singular = word.slice(0, -1); // quitar la "s"
            if (dict[singular]) {
                return dict[singular] + "-kuna"; // añadir sufijo plural
            }
            return null;
        }
    }
];

// ===== Pipeline de traducción =====
export const translate = (text, direction = "es-qu") => {

    try {

        if (!text || typeof text !== "string") return { ok: false, translate: null, message: "Entrada inválida, se esperaba un texto.", error: "INVALID_INPUT", code: 400 }

            text = text.toLowerCase().trim();

            // 1. Buscar frase completa
            if (glossary[text]) return { ok: true, translate: glossary[text], message: "Traducción encontrada en diccionario directo.", error: null, code: 200 }

                // 2. Tokenizar por palabras
                const tokens = text.split(/\s+/);
                const translatedTokens = [];

                for (let token of tokens) {
                    let translated = null;

                    // 2.1 Buscar palabra exacta
                    if (glossary[token]) {
                        translated = glossary[token];
                    }

                    // 2.2 Aplicar reglas si no hay traducción
                    if (!translated) {
                        for (let rule of rules) {
                            const match = token.match(rule.pattern);
                            if (match) {
                                translated = rule.apply(token, glossary);
                                if (translated) break; // salimos del for si encontramos
                            }
                        }
                    }

                    // 2.3 Si aún no se encontró nada
                    if (!translated) {
                        return {
                            ok: false,
                            translate: null,
                            message: `No se encontró traducción para: "${token}".`,
                            error: "NOT_FOUND",
                            code: 404
                        };
                    }

                    translatedTokens.push(translated);
                }

                // 3. Retornar resultado final
                return { ok: true, translate: translatedTokens.join(" "), message: "Traducción generada exitosamente.", error: null, code: 200 };

    } catch (err) {
        return { ok: false, translate: null, message: "Ocurrió un error inesperado durante la traducción.", error: err.message, code: 500 };
    }
};