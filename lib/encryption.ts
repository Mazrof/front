export async function encryptMessage(publicKeyJwk: JsonWebKey, message: string): Promise<string> {
    const publicKey = await window.crypto.subtle.importKey(
        "jwk",
        publicKeyJwk,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["encrypt"]
    );

    const encodedMessage = new TextEncoder().encode(message);

    const encryptedMessage = await window.crypto.subtle.encrypt(
        { name: "RSA-OAEP" },
        publicKey,
        encodedMessage
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedMessage))); // Base64 encode
}

export async function decryptMessage(
    privateKeyJwk: JsonWebKey,
    encryptedMessage: string
): Promise<string> {
    const privateKey = await window.crypto.subtle.importKey(
        "jwk",
        privateKeyJwk,
        { name: "RSA-OAEP", hash: "SHA-256" },
        true,
        ["decrypt"]
    );

    const decodedMessage = atob(encryptedMessage);
    const encryptedBuffer = new Uint8Array([...decodedMessage].map((char) => char.charCodeAt(0)));

    const decryptedBuffer = await window.crypto.subtle.decrypt(
        { name: "RSA-OAEP" },
        privateKey,
        encryptedBuffer
    );

    return new TextDecoder().decode(decryptedBuffer);
}
