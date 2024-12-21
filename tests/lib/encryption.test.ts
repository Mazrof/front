import { generateKeyPair, encryptMessage, decryptMessage } from "@/lib/encryption";
import { TextEncoder, TextDecoder } from "util";

// Add TextEncoder and TextDecoder to global scope for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("encryption", () => {
    // Mock crypto.subtle
    const mockSubtle: {
        generateKey: jest.Mock<Promise<CryptoKeyPair>, [RsaHashedKeyGenParams, boolean, string[]]>;
        exportKey: jest.Mock<Promise<JsonWebKey>, [string, CryptoKey]>;
        importKey: jest.Mock<Promise<CryptoKey>, [string, JsonWebKey, RsaHashedImportParams, boolean, string[]]>;
        encrypt: jest.Mock<Promise<ArrayBuffer>, [RsaOaepParams, CryptoKey, Uint8Array]>;
        decrypt: jest.Mock<Promise<ArrayBuffer>, [RsaOaepParams, CryptoKey, Uint8Array]>;
    } = {
        generateKey: jest.fn<Promise<CryptoKeyPair>, [RsaHashedKeyGenParams, boolean, string[]]>(),
        exportKey: jest.fn<Promise<JsonWebKey>, [string, CryptoKey]>(),
        importKey: jest.fn<Promise<CryptoKey>, [string, JsonWebKey, RsaHashedImportParams, boolean, string[]]>(),
        encrypt: jest.fn<Promise<ArrayBuffer>, [RsaOaepParams, CryptoKey, Uint8Array]>(),
        decrypt: jest.fn<Promise<ArrayBuffer>, [RsaOaepParams, CryptoKey, Uint8Array]>(),
    };

    // Mock window.crypto
    const mockCrypto = {
        subtle: mockSubtle,
    };

    beforeAll(() => {
        // Setup window.crypto mock
        Object.defineProperty(window, "crypto", {
            value: mockCrypto,
            writable: true,
        });
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("generateKeyPair", () => {
        it("should generate a key pair successfully", async () => {
            const mockKeyPair = {
                publicKey: "mockPublicKey",
                privateKey: "mockPrivateKey",
            };
            const mockJwk = {
                kty: "RSA",
                n: "mockModulus",
                e: "mockExponent",
            };

            mockSubtle.generateKey.mockResolvedValue(mockKeyPair);
            mockSubtle.exportKey.mockResolvedValue(mockJwk);

            const result = await generateKeyPair();

            expect(mockSubtle.generateKey).toHaveBeenCalledWith(
                {
                    name: "RSA-OAEP",
                    modulusLength: 2048,
                    publicExponent: expect.any(Uint8Array),
                    hash: "SHA-256",
                },
                true,
                ["encrypt", "decrypt"]
            );
            expect(mockSubtle.exportKey).toHaveBeenCalledTimes(2);
            expect(result).toHaveProperty("publicKey");
            expect(result).toHaveProperty("privateKey");
        });

        it("should handle errors during key generation", async () => {
            const error = new Error("Failed to generate key");
            mockSubtle.generateKey.mockRejectedValue(error);

            await expect(generateKeyPair()).rejects.toThrow(
                "Failed to generate key pair"
            );
        });
    });

    describe("encryptMessage", () => {
        it("should encrypt a message successfully", async () => {
            const mockPublicKeyJwk = JSON.stringify({
                kty: "RSA",
                n: "mockModulus",
                e: "mockExponent",
            });
            const mockMessage = "Hello, World!";
            const mockEncryptedBuffer = new ArrayBuffer(8);

            mockSubtle.importKey.mockResolvedValue("mockImportedKey");
            mockSubtle.encrypt.mockResolvedValue(mockEncryptedBuffer);

            const result = await encryptMessage(mockPublicKeyJwk, mockMessage);

            expect(mockSubtle.importKey).toHaveBeenCalledWith(
                "jwk",
                JSON.parse(mockPublicKeyJwk),
                { name: "RSA-OAEP", hash: "SHA-256" },
                true,
                ["encrypt"]
            );
            expect(mockSubtle.encrypt).toHaveBeenCalledWith(
                { name: "RSA-OAEP" },
                "mockImportedKey",
                new TextEncoder().encode(mockMessage)
            );
            expect(result).toBeTruthy();
        });

        it("should handle encryption errors", async () => {
            const error = new Error("Encryption failed");
            mockSubtle.importKey.mockRejectedValue(error);

            await expect(
                encryptMessage("{}", "test message")
            ).rejects.toThrow("Failed to encrypt message");
        });
    });

    describe("decryptMessage", () => {
        it("should decrypt a message successfully", async () => {
            const mockPrivateKeyJwk = JSON.stringify({
                kty: "RSA",
                n: "mockModulus",
                d: "mockPrivateExponent",
            });
            const mockEncryptedMessage = "AQID"; // Base64 encoded
            const mockDecryptedBuffer = new TextEncoder().encode("Hello, World!");

            mockSubtle.importKey.mockResolvedValue("mockImportedKey");
            mockSubtle.decrypt.mockResolvedValue(mockDecryptedBuffer);

            const result = await decryptMessage(
                mockPrivateKeyJwk,
                mockEncryptedMessage
            );

            expect(mockSubtle.importKey).toHaveBeenCalledWith(
                "jwk",
                JSON.parse(mockPrivateKeyJwk),
                { name: "RSA-OAEP", hash: "SHA-256" },
                true,
                ["decrypt"]
            );
            expect(mockSubtle.decrypt).toHaveBeenCalledWith(
                { name: "RSA-OAEP" },
                "mockImportedKey",
                expect.any(Uint8Array)
            );
            expect(result).toBe("Hello, World!");
        });

        it("should handle decryption errors", async () => {
            const error = new Error("Decryption failed");
            mockSubtle.importKey.mockRejectedValue(error);

            await expect(
                decryptMessage("{}", "AQID")
            ).rejects.toThrow("Failed to decrypt message");
        });
    });
});
