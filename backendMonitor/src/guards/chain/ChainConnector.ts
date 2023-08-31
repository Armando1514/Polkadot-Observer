import '@polkadot/api-augment';
import { ApiPromise, WsProvider } from '@polkadot/api';
import keys from '../../keys';
// Singleton
export class ChainConnector {
  private static instance: ChainConnector;
  private _api: ApiPromise;
  private constructor() {
    if (!keys.chainURI) {
      // default if not defined
      keys.chainURI = 'wss://westend-rpc.polkadot.io';
    }
  }

  public static async getInstance(): Promise<ChainConnector> {
    if (!ChainConnector.instance) {
      ChainConnector.instance = new ChainConnector();
    }
    await ChainConnector.instance.connectToTheChain();
    return ChainConnector.instance;
  }
  get api() {
    return this._api;
  }

  private async connectToTheChain() {
    const wsProvider = new WsProvider(keys.chainURI);
    this._api = await ApiPromise.create({ provider: wsProvider });
    console.log(
      `Correctly connected to the chain: ${
        keys.chainURI
      }, with Genesis hash: ${this._api.genesisHash.toHex()}`
    );
  }
}
