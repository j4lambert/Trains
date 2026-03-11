/**
 * Example Panel Component
 * Demonstrates how to create React components for Subway Builder mods.
 *
 * Note: Floating panels provide their own container, so don't wrap in Card.
 */

import { useState, useEffect } from 'react';
import * as p from '../processing/process.jsx';
import type * as c from "../processing/processes.d.ts";
import type * as o from "../processing/register.tsx";
import * as reg from "../processing/register";

import trains from "../data/trains.json"
import Electrifications from "../data/standards/electric.json"
import TrackGauges from "../data/standards/track.json"
import LoadingGauges from "../data/standards/loading.json"
import PowerSupplys from "../data/standards/power.json"
import TrainTypes from "../data/standards/trains.json"
import AutomationLevels from "../data/standards/automation.json"
const Trains: c.Train[] = trains as c.Train[];
const es: c.Electrification[] = Electrifications as c.Electrification[];
const tgs: c.TrackGauge[] = TrackGauges as c.TrackGauge[];
const lgs: c.LoadingGauge[] = LoadingGauges as c.LoadingGauge[];
const pss: c.PowerSupply[] = PowerSupplys as c.PowerSupply[];
const tts: c.TrainType[] = TrainTypes as c.TrainType[];
const als: c.AutomationLevel[] = AutomationLevels as c.AutomationLevel[];

const api = window.SubwayBuilderAPI;
const r = api.utils.React;
const h = r.createElement;
const {Switch} = api.utils.components;

// Cast components to any to bypass strict typing (components work at runtime)
const { Button } = api.utils.components as Record<string, React.ComponentType<any>>;
function filterItems(la:string[],lb:string[],items:any[]) {
  const indices:number[] = lb.map((item:string, idx:number) => (la.includes(item) ? idx : -1)).filter(idx => idx !== -1);
  var itemsout:any[] = [];
  indices.forEach(ind => {
    itemsout.push(items[ind])
  })
  return itemsout
}

var tosave:  Record<string, o.trainStorageData> = {};

export function getSaveData() {
  return tosave;
}

function handleSelect(value:string,f:Function) {
  f(value);
}

export function specPicker(n:string,items:any[],value:string|number,f:Function,className?:string) {
  return (
    <select
      name={n}
      className={className || "text-sm white bg-black w-full"}
      onChange={v => handleSelect(v.target.value,f)}
      value={value}
      style={{
        backgroundColor: "#000000"
      }}
    >
      <option key={"Select "+n} value={""}>
        {"No Selection"}
      </option>
      {items.map((e) => (
        <option key={e.Name} value={e.Name}>
          {e.Name}
        </option>
      ))}
    </select>
  )
}
function numberListToLengthList(l:number[]) {
  let litems:lengthItem[] = [];
  l.forEach(le => {
    const len:lengthItem = {
      Name: String(le),
      value: le
    }
    litems.push(len)
  })
  return litems;
}
const lhold:number[] = Array.from({length:Math.floor((400-40)/20)+1},(_,i) => 40 + i*20).concat(620);
interface lengthItem {
  Name: String
  value: number
}
const lens = numberListToLengthList(lhold);

export function TrainPanel() {
  const [elect, setElect] = useState(""); const [auto, setAuto] = useState(""); const [gauge, setGauge] = useState("");
  const [width, setWidth] = useState(""); const [power, setPower] = useState(""); const [type, setType] = useState("");
  const [electBool, setElectBool] = useState(false); const [autoBool, setAutoBool] = useState(false); const [gaugeBool, setGaugeBool] = useState(false);
  const [widthBool, setWidthBool] = useState(false); const [powerBool, setPowerBool] = useState(false); const [typeBool, setTypeBool] = useState(false);
  const [minBool, setMinBool] = useState(false); const [maxBool, setMaxBool] = useState(false);
  const [min, setMin] = useState(""); const [max, setMax] = useState("");
  const [train, setTrain] = useState(Trains[0].name);
  const [regDisable,setRegDisable] = useState(true);
  const [regText,setRegText] = useState("Make all selections first.")
  var [eitems,setEItems] = useState(es);
  var [titems,setTItems] = useState(tts);
  var [witems,setWItems] = useState(lgs);
  var [pitems,setPItems] = useState(pss);
  var [gitems,setGItems]= useState(tgs);
  var [aitems,setAItems] = useState(als);
  var [minopts,setMinOpts] = useState(lens);
  var [maxopts,setMaxOpts] = useState(lens); 
  //eitems.push(""); titems.push(""); witems.push(""); gitems.push(""); pitems.push(""); aitems.push("");
  var [tlist,setTList]:[c.Train[],any] = useState(Trains);
  var all = {
    Electrification: power,
    Voltage: elect, 
    TrackGauge: gauge,
    LoadingGauge: width,
    trainType: type,
    Automation: auto,
    minStationList: min,
    maxStationList: max
  }
  const baseOptions = {
    elect: es,
    auto: als,
    gauge: tgs,
    width: lgs,
    power: pss,
    type: tts,
    min: lens,  
    max: lens 
  };
  const boolToTrainKey = {
    elect: "Voltage",
    auto: "Automation",
    gauge: "TrackGauge",
    width: "LoadingGauge",
    power: "Electrification",
    type: "trainType",
    min: "minStationList",  // new
    max: "maxStationList"   // new
  };

  type BoolListPair<T = any> = [boolean, T[],Function];

  type BoolMap = {
    elect: BoolListPair;
    auto: BoolListPair;
    gauge: BoolListPair;
    width: BoolListPair;
    power: BoolListPair;
    type: BoolListPair;
    min: BoolListPair;   // new
    max: BoolListPair;   // new
  };
  var bools:BoolMap = {
    "elect": [electBool,eitems,setEItems],
    "auto": [autoBool,aitems,setAItems],
    "gauge": [gaugeBool,gitems,setGItems],
    "width": [widthBool,witems,setWItems],
    "power": [powerBool,pitems,setPItems],
    "type": [typeBool,titems,setTItems],
    "min": [minBool, minopts,setMinOpts],  // min selector
    "max": [maxBool, maxopts,setMaxOpts]   // max selector
  }

  function updateBools() {
    bools = {
      "elect": [electBool,eitems,setEItems],
      "auto": [autoBool,aitems,setAItems],
      "gauge": [gaugeBool,gitems,setGItems],
      "width": [widthBool,witems,setWItems],
      "power": [powerBool,pitems,setPItems],
      "type": [typeBool,titems,setTItems],
      "min": [minBool, minopts,setMinOpts],  // min selector
      "max": [maxBool, maxopts,setMaxOpts]   // max selector
    }
  }

  function getLengthsGreaterThan(num:number,equalto:boolean=false) {
    if (equalto) {
      return lens.filter(l => l.value >= num); 
    } else {
      return lens.filter(l => l.value > num);
    }
  }

  function fixedFilter(l:any[], name:keyof c.Train) {
    const t:c.Train|undefined = p.getTrain(train);
    if (!t) {
      return l;
    }
    const val:any = t[name];
    var hold:any[] = [];
    if (name == "minStationList") {
      return getLengthsGreaterThan(val[0],true);
    }

    if (name == "maxStationList") {
      if (min != "") {
        return getLengthsGreaterThan(Number(min))
      } else {
        return getLengthsGreaterThan(Math.max(...t["minStationList"]))
      }
    }

    if (Array.isArray(val)) {
      return l.filter(item => val.includes(item.Name));
    }

    return l.filter(item => item.Name === val);
  }

  function filterAll() {
    (Object.keys(bools) as (keyof typeof bools)[]).forEach(key => {
      const trainKey = boolToTrainKey[key] as keyof c.Train;
      let func:Function = bools[key][2];

      if (bools[key][0]) {
        func(fixedFilter(baseOptions[key], trainKey));
      } else {
        func(baseOptions[key]);
      }
    });
  }
  
  function trainFilterCond(key:keyof c.Train,value:string,t:c.Train,relative:boolean) {
  if (value=="" || relative || String(key) == "maxStationList") {
    return true
  }
  
  if ((String(key) == "minStationList") && (typeof t[key] === "object")) {
    var holdlist = t[key];
    var hold = false;
    holdlist.forEach(len => {
      if((typeof len) != "number") {
      } else {
        if(len <= Number(value)) {hold = true}
      }
    })
    return hold;
  }
  if (typeof t[key] === "string") {
    return t[key] == value;
  }

  if (typeof t[key] === "object") {
    const hold:any[] = t[key];
    return hold.includes(value);
  }
  return false;
}

  function ableCheck() {
    var hold = false; var text = "Register";
    Object.entries(all).forEach(entry => {
      if (typeof entry[1] == "string" && entry[1] == "") {
        hold = true;
        text = "Make all selections first.";
      }
    })
    setRegDisable(hold);
    setRegText(text);
  }

  useEffect(() => {
    console.log(min);
    console.log(max);
    updateBools();
    const map:any = {
      Electrification:electBool,
      Voltage:electBool,
      TrackGauge:gaugeBool,
      LoadingGauge:widthBool,
      trainType:typeBool,
      Automation:autoBool,
      minStationList:minBool,
      maxStationList:maxBool
    }
    //console.log("Before: "+String(tlist.length))+String(all["Electrification"]);
    setTList(Trains);
    lengthFix();
    //console.log("Reset: "+String(tlist.length)+String(all["Electrification"]));
    const hold:[string,string][] = Object.entries(all);
    const out = Trains.filter(t => {
      return hold.every(([key,value]) => {
        return trainFilterCond(key as keyof c.Train,value,t,map[key])
      })
    })
    setTList(out);
    filterAll();
    ableCheck();
    //console.log("After: "+String(tlist.length)+String(all["Electrification"]));
  },[elect, auto, gauge, width, power, type, min, max, train,electBool, autoBool, gaugeBool, widthBool, powerBool, typeBool,minBool,maxBool])

  function lengthFix() {
    if (min != "" && max != "") {
      const minn = Number(min); const maxn = Number(max);
      if (minn <= maxn) {} else if (minn < 0 || maxn < 0) {} 
      else {
        const hold:number = lhold.indexOf(minn);
        setMax(String(lhold[hold+1]))
      }
    }
  }

  function trainSelect(value:string) {
    setTrain(value);
  }

  function trainPicker() {
    return (
      <select
        name="Train Picker"
        className="text-sm text-muted-foreground bg-black w-full"
        onChange={v => trainSelect(v.target.value)}
        value={train}
      >
        {tlist.map((e) => (
          <option key={e.name} value={e.name}>
            {e.name}
          </option>
        ))}
      </select>
    )
  }
  
  function resetAll() {
    setElect("");
    setAuto("");
    setGauge("");
    setWidth("");
    setPower("");
    setType("");
    setTrain(Trains[0].name);
    setTList(Trains);
    setMin("");
    setMax("");
  }

  function resetButton() {
    return(
      <Button
        variant="secondary"
        onClick={() => resetAll()}
      >
        Reset All
      </Button>
    )
  }

  function registrationProccess() {
    const ordernames = {
      order:["elect" , "track" , "load" , "power" , "type" , "auto"],
      names:[elect , gauge , width , power , type , auto]
    }
    const values:(c.TrackGauge|c.LoadingGauge|c.Electrification|c.PowerSupply|c.TrainType|c.AutomationLevel)[] = p.getAll(ordernames.names,ordernames.order as ("elect" | "auto" | "power" | "type" | "track" | "load")[]);
    const tr = p.getTrain(train) as c.Train;
    const calcin:o.statsCalcInput = {
      y: values[4] as c.TrainType,
      a: values[5] as c.AutomationLevel,
      v: values[0] as c.Electrification,
      e: values[3] as c.PowerSupply,
      t: values[1] as c.TrackGauge,
      l: values[2] as c.LoadingGauge,
      train: tr,
      min: Number(min),
      max: Number(max)
    }
    const calcout:o.statsCalcOutput = reg.statsCalc(calcin);
    const hold:any = reg.compileTrain(tr,calcout,Number(max),String(Date.now()));
    reg.registerTrain(hold.trainConfig);
    tosave[hold.storageData.id] = hold.storageData;
  }

  function registerButton() {
    return(
      <Button
        variant="secondary"
        onClick={() => registrationProccess()}
        disabled = {regDisable}
      >
        {regText}
      </Button>
    )
  }

  function pickerWithMode(
    picker: any,
    state: boolean,
    setState: Function
  ) {
    return (
      <div className="flex items-center gap-1 flex-1">
        {picker}
        {h(Switch,{
          defaultValue:false,
          checked:state,
          onChange:() => setState((prevState:boolean) => !prevState)
        })}
      </div>
    )
  }
  
  return (
    <div className="">
      <p className="text-sm text-muted-foreground">
        Dan Trains Picker 
      </p>
      <div className="flex justify-between gap-2 w-full">
        {pickerWithMode(specPicker("Automation Standard",aitems,auto,setAuto),autoBool,setAutoBool)}
        {pickerWithMode(specPicker("Electrification Standard",eitems,elect,setElect),electBool,setElectBool)}
        {pickerWithMode(specPicker("Track Gauge",gitems,gauge,setGauge),gaugeBool,setGaugeBool)}
      </div>
      <div className="flex justify-between gap-2 w-full">
        {pickerWithMode(specPicker("Loading Gauge",witems,width,setWidth),widthBool,setWidthBool)}
        {pickerWithMode(specPicker("Power Supply",pitems,power,setPower),powerBool,setPowerBool)}
        {pickerWithMode(specPicker("Train Type",titems,type,setType),typeBool,setTypeBool)}
      </div>
      <div className="flex justify-between gap-2 w-full">
        {pickerWithMode(specPicker("Minimum Station Length",minopts,min,setMin),minBool,setMinBool)}
        {pickerWithMode(specPicker("Maximum Station Length",maxopts,max,setMax),maxBool,setMaxBool)}
      </div>
      <p className="text-sm text-muted-foreground">
        {trainPicker()}
      </p>
      <p className="text-sm text-muted-foreground">
        {resetButton()}
      </p>
      <p className="text-sm text-muted-foreground">
        {registerButton()}
      </p>
    </div>
  );
}