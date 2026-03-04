import trains from "../data/trains.json"
import es from "../data/standards/electric.json"
import tgs from "../data/standards/track.json"
import lgs from "../data/standards/loading.json"
import pss from "../data/standards/power.json"
import tts from "../data/standards/trains.json"
import als from "../data/standards/automation.json"
import type { Train, Electrification, TrackGauge, LoadingGauge, PowerSupply, TrainType, AutomationLevel } from "../processing/processes.d.ts"
const Trains: Train[] = trains as Train[];
const Electrifications: Electrification[] = es as Electrification[];
const TrackGauges: TrackGauge[] = tgs as TrackGauge[];
const LoadingGauges: LoadingGauge[] = lgs as LoadingGauge[];
const PowerSupplys: PowerSupply[] = pss as PowerSupply[];
const TrainTypes: TrainType[] = tts as TrainType[];
const AutomationLevels: AutomationLevel[] = als as AutomationLevel[];

export function getTrainList() {
    Trains.forEach(t => {
        var lengthList:number[] = []; var consistList:number[] = []; var minStationList:number[] = [];
        for (let step = t.minCars; step < t.maxCars; step += t.carsPerCarSet) {
            lengthList.push(Math.round(step * t.carLength));
            consistList.push(step);
            minStationList.push(Math.round((step * t.carLength + 3) / 50) * 50);
        }
        t.lengthList = lengthList;
        t.consistList = consistList;
        t.minStationList = minStationList;
    })
    return Trains
}

export function getElectrificationList() {
    var out:string[] = [];
    Electrifications.forEach(n => {
        out.push(n.Name);
    })
    return out
}
export function getTrackGaugeList() {
    var out:string[] = [];
    TrackGauges.forEach(n => {
        out.push(n.Name);
    })
    return out
}
export function getLoadingGaugeList() {
    var out:string[] = [];
    LoadingGauges.forEach(n => {
        out.push(n.Name);
    })
    return out
}
export function getPowerSupplyList() {
    var out:string[] = [];
    PowerSupplys.forEach(n => {
        out.push(n.Name);
    })
    return out
}
export function getTrainTypeList() {
    var out:string[] = [];
    TrainTypes.forEach(n => {
        out.push(n.Name);
    })
    return out
}
export function getAutomationLevelList() {
    var out:string[] = [];
    AutomationLevels.forEach(n => {
        out.push(n.Name);
    })
    return out
}

export function compatibleConsists(len:number,t:Train) {
    var outputList:number[] = [];
    t.minStationList.forEach((n:number) => {
        if (n<len) {
            outputList.push(n);
        }
    })
    return outputList
}
