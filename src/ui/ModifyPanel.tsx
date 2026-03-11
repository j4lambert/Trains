import { useState, useEffect } from 'react';
import * as p from '../processing/process.jsx';
import type * as c from "../processing/processes.d.ts";
import type * as o from "../processing/register.tsx";
import type * as t from "../types/trains";
import * as reg from "../processing/register";
import { specPicker } from './TrainPanel.js';

export function ModifyPanel(saved:Record<string, o.trainStorageData>) {
    var configList:t.TrainTypeConfig[] = [];
    var trainList:c.Train[] = p.getTrainList();
    var nameList:string[] = [];
    Object.entries(saved).forEach(o => {
        configList.push(o[1].config);
        nameList.push(o[1].config.name);
    });

    trainList.filter(t => {
        nameList.includes(t.name);
    })

    const [tName, setTName] = useState(nameList[0]);
    const [train, setTrain] = useState(trainList.find(e => {e.name == nameList[0]}));

    function trainPicker() {
        return (
        <select
            name="Train Picker"
            className="text-sm text-muted-foreground bg-black"
            onChange={v => trainSelect(v.target.value)}
            value={tName}
        >
            {trainList.map((e) => (
            <option key={e.name} value={e.name}>
                {e.name}
            </option>
            ))}
        </select>
        )
    }

    function trainSelect(name:string) {
        setTName(name);
        setTrain(trainList.find(e => {e.name == name}));
    }


}