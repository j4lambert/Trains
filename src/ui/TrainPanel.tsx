/**
 * Example Panel Component
 * Demonstrates how to create React components for Subway Builder mods.
 *
 * Note: Floating panels provide their own container, so don't wrap in Card.
 */

import { useState } from 'react';
import * as p from '../processing/process.jsx';
import type * as c from "../processing/processes.d.ts";

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

interface DropdownItem {
  
}

const api = window.SubwayBuilderAPI;
const r = api.utils.React;
const h = r.createElement;

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

export function TrainPanel() {
  const [elect, setElect] = useState("");
  const [auto, setAuto] = useState("");
  const [gauge, setGauge] = useState("");
  const [width, setWidth] = useState("");
  const [power, setPower] = useState("");
  const [type, setType] = useState("");
  const [train, setTrain] = useState("");
  var eitems:any[] = []; var titems:any[] = []; var witems:any[] = []; var gitems:any[] = []; var pitems:any[] = []; var aitems:any[] = [];
  
  aitems = p.getAutomationLevelList();

  function handleAutoSelect(value:string) {
    setAuto(value);
  }


  return (
    <div className="flex flex-col gap-3 p-3">
      <p className="text-sm text-muted-foreground">
        Dan Trains Picker 
      </p>
      <select
        name="AutomationPicker"
        onChange={v => setAuto(v.target.value)}
      >
        {aitems.map((a) => (
          <option key={a.Name} value={a.Name}>
            {a.Name}
          </option>
        ))}
      </select>
      <Button
        variant="secondary"
        onClick={() => api.ui.showNotification('Hello!', 'info')}
      >
        Show Notification
      </Button>
    </div>
  );
}
