const secp = require("ethereum-cryptography/secp256k1");
const JSONbig = require("json-bigint");

const {toHex, utf8ToBytes,hexToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");
// node .\scripts\generate.js
const privateKey = secp.secp256k1.utils.randomPrivateKey();

console.log('private key : ', toHex(privateKey));


const publicKey = secp.secp256k1.getPublicKey(privateKey);

console.log('public key : ', toHex(publicKey));

const address = keccak256(publicKey.slice(1)).slice(-20);

console.log('address : ', toHex(address));

 const messageHash = keccak256(utf8ToBytes("message"));
 //const msgHash = 'b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9';

// console.log('messageHash : ',messageHash);
// const privateKey1Buffer = Buffer.from(privateKey, 'hex')
// console.log('privateKey1Buffer : ',privateKey1Buffer);
// //const signature = secp.secp256k1.sign(hash, privateKey,"hex", {canonical: true});
const privateKey2 = "6b911fd37cdf5c81d4c0adb1ab7fa822ed253ab0ad9aa18d77257c88b29b718e";

const messageHash2 = "a33321f98e4ff1c283c76998f14f57447545d339b3db534c6d886decb4209f28";
// const signature = secp.secp256k1.sign(messageHash2,Buffer.from(privateKey2, 'hex'));
 const signature = secp.secp256k1.sign(messageHash,privateKey);
 const pblcKey = signature.recoverPublicKey(messageHash);
// //const isSigned = secp.secp256k1.verify(signature, messageHash, publicKey);
const isValid = secp.secp256k1.verify(signature, messageHash, publicKey); 
 
// const signatureObj = JSONbig.parse(signature);
// const signatureHex = toHex(new Uint8Array(signatureObj))

// const fullSignature = new Uint8Array([signature.toCompactHex()]);
// const signatureHex =  toHex(fullSignature);
 console.log('signature : ', signature.toCompactHex());
 console.log('signature : ', hexToBytes(signature.toCompactHex()));
 
 console.log('isvalid : ', isValid);