
import { ethers, Contract } from "ethers";
import { AlchemyProvider } from "@ethersproject/providers";

export class ChainAlchemyEntity{
  private _provider: AlchemyProvider;

  constructor(alchemyNetworkName: string, alchemyNetworkKey:string){
    this._provider = new AlchemyProvider(alchemyNetworkName, alchemyNetworkKey)
  }

  get provider(){
    return this._provider
  }
}