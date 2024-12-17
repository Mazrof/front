import { Keys } from "@/types/user";

function toBase64(buffer: ArrayBuffer): string {
    return Buffer.from(buffer).toString("base64");
}

function fromBase64(base64: string): Uint8Array {
    const decodedBuffer = Buffer.from(base64, "base64");
    return new Uint8Array(decodedBuffer.buffer, decodedBuffer.byteOffset, decodedBuffer.byteLength);
}

export async function generateKeyPair(): Promise<Keys> {
    try {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "RSA-OAEP",
                modulusLength: 2048,
                publicExponent: new Uint8Array([1, 0, 1]),
                hash: "SHA-256",
            },
            true,
            ["encrypt", "decrypt"]
        );

        const publicKey: JsonWebKey = await window.crypto.subtle.exportKey(
            "jwk",
            keyPair.publicKey
        );
        const privateKey: JsonWebKey = await window.crypto.subtle.exportKey(
            "jwk",
            keyPair.privateKey
        );

        return {
            publicKey: JSON.stringify(publicKey),
            privateKey: JSON.stringify(privateKey),
        };
    } catch (error) {
        throw new Error(`Failed to generate key pair: ${error}`);
    }
}

export async function encryptMessage(publicKeyJwk: string, message: string): Promise<string> {
    try {
        const deserializedPublicKeyJwk: JsonWebKey = JSON.parse(publicKeyJwk);

        const publicKey = await window.crypto.subtle.importKey(
            "jwk",
            deserializedPublicKeyJwk,
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

        return toBase64(encryptedMessage);
    } catch (error) {
        throw new Error(`Failed to encrypt message: ${error}`);
    }
}

export async function decryptMessage(
    privateKeyJwk: string,
    encryptedMessage: string
): Promise<string> {
    try {
        const deserializedPrivateKeyJwk: JsonWebKey = JSON.parse(privateKeyJwk);

        const privateKey = await window.crypto.subtle.importKey(
            "jwk",
            deserializedPrivateKeyJwk,
            { name: "RSA-OAEP", hash: "SHA-256" },
            true,
            ["decrypt"]
        );

        const encryptedBuffer = fromBase64(encryptedMessage);

        const decryptedBuffer = await window.crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            privateKey,
            encryptedBuffer
        );

        return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
        throw new Error(`Failed to decrypt message: ${error}`);
    }
}
