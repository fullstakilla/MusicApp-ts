import moment from "moment"

export default (seconds:number) => {
    return moment.utc(seconds * 1000).format("mm:ss") as string
}