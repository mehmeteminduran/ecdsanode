import { useState } from "react";
import server from "./server";
import * as secp from 'ethereum-cryptography/secp256k1';
import { toHex, utf8ToBytes } from 'ethereum-cryptography/utils';
import { keccak256 } from "ethereum-cryptography/keccak";

function Transfer({ address, setBalance, privateKey }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    try {

      const transactionMessage = {
        sender: address,
        amount: parseInt(sendAmount),
        recipient: recipient
      }

      // hash the transaction. You have to change the message to string first, then byte. After that hash it.
      const hashedMessage = keccak256(utf8ToBytes(JSON.stringify(transactionMessage)));
      let hexMessage = toHex(hashedMessage);
      const signature = await secp.secp256k1.sign(hexMessage, privateKey);
      const signatureHex = signature.toCompactHex();
      const recovery = signature.recovery;

      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
        signatureHex,
        hexMessage,
        recovery
      }, { 'Content-Type': 'application/json' });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, for example: 0x2"
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
