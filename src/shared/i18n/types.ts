/**
 * Misma forma que el recurso en español pero con valores `string`: obliga a que el inglés
 * tenga EXACTAMENTE las mismas claves (TypeScript falla si falta o sobra una).
 */
export type StringRecord<T> = { [K in keyof T]: string };

export type Locale = 'es' | 'en';
export const LOCALES: readonly Locale[] = ['es', 'en'];
