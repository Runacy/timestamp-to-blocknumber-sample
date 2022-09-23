import { AlchemyProvider, BaseProvider} from "@ethersproject/providers";
import { median } from "./math/median"

export const timeStampToBlocknumber = async(timestamp: number, provider:AlchemyProvider|BaseProvider) => {
  const fromTimestamp = timestamp / 1000
  try{
    const latestNum = await provider.getBlockNumber()

    // 50回ほど取得してタイムスタンプの差の中央値をとる
    const timestamp = (await provider.getBlock(latestNum)).timestamp
    let flag=timestamp
    let diffs:number[] = []
    for(let i=0; i<100; ++i){
      const bn = latestNum-i
      const timestamp = (await provider.getBlock(bn)).timestamp
      const diff = flag - timestamp
      diffs.push(diff)
      // flagを更新する
      flag = timestamp
    }
    //差の中央値をとる
    const med = median(diffs)

    //最新のtimestampから何回、(-med)すれば、指定したtimestampになるか
    // 計算式
    // 最新のtimestamp= x, 指定したtimestampをy, 回数をnとすると
    // n = (x - y)/med
    const n = (timestamp - fromTimestamp)/med
    // Math.floorで整数にする
    const fromBlockNumber = Math.floor(latestNum - n)
    return fromBlockNumber

  }catch(e){
    console.log("blockTimestampToDateTimeUTC -> タイムスタンプ取得に失敗したにゃん。")
    return '-'
  }
}