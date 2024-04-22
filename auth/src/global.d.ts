export declare global {
    declare module globalThis {
        function loginCookie() : Promise<string[]>;
    }
 }