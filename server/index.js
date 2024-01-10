const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const secp = require("ethereum-cryptography/secp256k1");
const JSONbig = require("json-bigint");

const {toHex, utf8ToBytes,hexToBytes} = require("ethereum-cryptography/utils");
const {keccak256} = require("ethereum-cryptography/keccak");

const balances = {
  "02b8dcdc3004d9f0fee68d1c3d03e365a25266b75a204ba6f62e25e342338528ea": 100,
  "0336d2a9ce1242b08d8d93a40890dc44bbbeeec30e7a5da15d6112c604a1f5cef4": 50,
  "020837b1e6d32415c3eb122bda8ba87e9c65dec3c568157a69af03eeac993e4238": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => { 
  // TODO: get a signature from the client-side application
  // recover the public address from the signature
  const { sender, recipient, amount,signatureHex,hexMessage,recovery } = req.body;
  const signature = secp.secp256k1.Signature.fromCompact(signatureHex)
     
  signature.recovery = recovery;
  const publicKey = signature.recoverPublicKey(hexMessage);   
  const signatureAddressNotHex = keccak256(publicKey.toRawBytes().slice(1)).slice(-20); 
  const signatureAddress = toHex(signatureAddressNotHex);   
  if (publicKey.toHex() !== sender) {
    res.status(400).send({message: "Sender address and signature address are not equal!"})
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
