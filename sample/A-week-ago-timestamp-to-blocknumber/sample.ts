import {ChainAlchemyEntity} from "./entity/chainEntity"
import {timeStampToBlocknumber} from "../../src/timestampToBlockNumber"
import 'dotenv/config'


export const getAweekTimestamp = () => {
  const current = new Date()
  current.setDate(current.getDate() - 7)
  return current
}


(async function() {
  console.log("##############")
  const date = getAweekTimestamp()
  console.log(date)
  const entity = new ChainAlchemyEntity(process.env.ALCHEMY_NETWORK_NAME!, process.env.ALCHEMY_NETWORK_KEY!)
  console.log("直近のブロックナンバー: ", await entity.provider.getBlockNumber())
  const fromBlockNumber = await timeStampToBlocknumber(date.getTime(), entity.provider)
  console.log("大体一週間前のfromBlockNumber", fromBlockNumber)
  console.log("##############")
})()