# ECDSA-Node

This project initially have clonned from https://github.com/alchemyplatform/ecdsa-node . After that according to project goals below, necessary codes implemented.

## Project Goals

This project begins with a client that is allowed to transfer any funds from any account to another account. That's not very secure. By applying digital signatures we can require that only the user with the appropriate private key can create a signature that will allow them to move funds from one account to the other. Then, the server can verify the signature to move funds from one account to another.

Incorporate Public Key Cryptography so transfers can only be completed with a valid signature
The person sending the transaction should have to verify that they own the private key corresponding to the address that is sending funds

## Addresses used

    private key :  40be0af5e76a20ca070a69f6c26e87a7fb4f83c79da25bdc69353121635db959
    public key :  02b8dcdc3004d9f0fee68d1c3d03e365a25266b75a204ba6f62e25e342338528ea
    address :  853a58e98afa5b85590d344c26d2c4bc45c5e0fd


    private key :  69859dc7fd45eedb49344455a7cc1f69d855985a2a32ca0bc79743ceabb94fcd
    public key :  0336d2a9ce1242b08d8d93a40890dc44bbbeeec30e7a5da15d6112c604a1f5cef4
    address :  7d3f751eca7b52cb537661a53d63f7be2f8d2ffb


    private key :  e2faca0629aa26ba2a785c28e0092b054534ffb88b26a12fffceeb6e00b9189b
    public key :  020837b1e6d32415c3eb122bda8ba87e9c65dec3c568157a69af03eeac993e4238
    address :  6eb17f87fecc02120d42f7f99cad30cbb82848ab
