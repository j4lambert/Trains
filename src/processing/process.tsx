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

export function getTrain(name:string) {
    const hold = Trains.find(t => t.name === name);
    if (typeof hold == "object") {
        return Trains.find(t => t.name === name)
    } else {
        throw "Something went horribly wrong";
    }
}

const aliasTable = {
    elect: Electrifications,
    track: TrackGauges,
    load: LoadingGauges,
    power: PowerSupplys,
    type: TrainTypes,
    auto: AutomationLevels
}

export function getOne(name:string,t:keyof typeof aliasTable) {
    const hold = aliasTable[t];
    return hold.find(h => h.Name === name);
}

export function getAll(names:string[],o:string[]) {
    const order = o as (keyof typeof aliasTable)[];
    var out:(TrackGauge|LoadingGauge|Electrification|PowerSupply|TrainType|AutomationLevel)[] = [];
    names.forEach(n => {
        const ind:number = names.indexOf(n);
        const hold = getOne(n,order[ind])
        if (hold != undefined) {out.push(hold)}
        else {throw "Something went horribly wrong";}
    })
    return out
}
export function compatibleConsists(len:number,t:Train) {
    var output:number[] = [];
    t.minStationList.forEach((n:number) => {
        if (n<len) {
            output.push(n);
        }
    })
    return output
}
