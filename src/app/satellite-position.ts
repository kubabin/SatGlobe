export interface SatellitePosition {
    info: SatelliteInfo
    positions: Array<SatellitePos>
}
export interface SatelliteInfo {
    satid: number
    satname:string
    transactionscount:number
}
export interface SatellitePos {
    satlatitude:number
    satlongitude:number
    azimuth:number
    elevation:number
    ra:number
    dec:number
    timestamp:number
}