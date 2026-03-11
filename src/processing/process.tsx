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
        t.maxStationList = minStationList;
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

export function getAll(names:string[],o:(keyof typeof aliasTable)[]) {
    return names.map((n, i) => {
        const hold = getOne(n, o[i]);
        if (!hold) throw new Error("Something went horribly wrong");
        return hold;
    });
}
export function compatibleConsists(len:number,t:Train) {
    var output:number[] = [];
    t.consistList.forEach((n:number,i:number) => {
        const hold:any[] = t.minStationList;
        if (hold[i]<=len) {
            output.push(n);
        }
    })
    return output
}
