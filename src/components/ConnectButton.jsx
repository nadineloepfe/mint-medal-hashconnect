import React, { useState } from 'react';
import walletConnectFcn from './hedera/walletConnect';
import './Nav.css';

const ConnectButton = ({ setWalletData, setAccountId }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectText, setConnectText] = useState('Connect Wallet');

  const connectWallet = async () => {
    try {
      const [hashconnect, saveData] = await walletConnectFcn();
      
      hashconnect.pairingEvent.once((pairingData) => {
        const accountId = pairingData.accountIds[0];
        console.log(`- Paired account id: ${accountId}`);
        setAccountId(accountId);  
        setIsConnected(true);
        setConnectText(`Connected: ${accountId}`);
        setWalletData([hashconnect, saveData]); 
      });
    } catch (error) {
      console.error('Wallet connection failed', error);
      setConnectText('Connection Failed');
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      disabled={isConnected}
    >
      {connectText}
    </button>
  );
};

export default ConnectButton;
