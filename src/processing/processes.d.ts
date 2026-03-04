export interface Train {
    /** Maximum acceleration rate (m/s^2) */
    maxAcceleration: number;
    /** Maximum deceleration rate (m/s^2) */
    maxDeceleration: number;
    /** Maximum speed (m/s) */
    maxSpeed: number;
    /** Maximum speed when approaching a local station (m/s) */
    maxSpeedLocalStation: number;
    /** Passenger capacity per car */
    capacityPerCar: number;
    /** Length of each car (meters) */
    carLength: number;
    /** Minimum number of cars per train */
    minCars: number;
    /** Maximum number of cars per train */
    maxCars: number;
    /** Number of cars in a car set (purchase unit) */
    carsPerCarSet: number;
    /** Cost per car */
    carCost: number;
    /** Width of the train (meters) */
    trainWidth: number;
    /** Minimum station platform length */
    minStationLength: number;
    /** Maximum station platform length */
    maxStationLength: number;
    /** Base cost per track segment */
    baseTrackCost: number;
    /** Base cost per station */
    baseStationCost: number;
    /** Hourly operational cost per train */
    trainOperationalCostPerHour: number;
    /** Hourly operational cost per car */
    carOperationalCostPerHour: number;
    /** Cost for a scissors crossover */
    scissorsCrossoverCost: number;
    trackClearance: number;
    maxLateralAcceleration: number;
    minTurnRadius: number;
    minStationTurnRadius: number;
    maxSlopePercentage: number;
    Automation: string[];
    Electrification: string[];
    Voltage: string[];
    TrackGauge: string[];
    LoadingGauge: string[];
    CompatibleTracks: string[];
    ExtraTracks: string[];
    canCrossRoads: boolean;
    TrainGapFillerLength: number;
    stopTimeSeconds: number;
    minStationLength: number;
    maxStationLength: number;
    Old: boolean;
    Multipliers: number[];
    desc: string;
    color: string;
    Manufacturer: string[];
    Cities: string[];
    Nation: string[];
    Cont: string[];
    Generic: boolean;
    Cities2: string[];
    Nation2: string[];
    Ready: boolean;
    name: string;
    trainType: string;
    trainType2: string;
    MainTrack: string;
    mainTrackID: string;
    lengthList:number[];
    consistList:number[];
    minStationList:number[];
}

export interface standards {
    Electrification: string;
    Actual_B: string;
    id_C: string;
    Track_Gauge: string;
    id_E: string;
    Actual_F: number;
    Cost_Multiplier_G: number;
    Loading_Gauge: string;
    id_I: string;
    Average: number;
    Min_No_Filler: number;
    Max_No_Filler: number;
    Cost_Multiplier_M: number;
    parallelTrackSpacing: number;
    trackClearance: number;
    Electrification_Type: string;
    id_Q: string;
    Cost_Multiplier_R: number;
    Tunnel_Cost_Multiplier: number;
    Scissors_Cost_Multiplier: number;
    Cost_Name: string;
    maxSpeedLocalStation_V: number;
    train_CostPerHour_W: number;
    car_CostPerHour_X: number;
    canCrossRoads_Y: boolean;
    stopTimeSeconds_Z: number;
    maxLateralAcceleration_AA: number;
    maxSlopePercentage_AB: number;
    Automation_Level: string;
    maxSpeedLocalStation_AD: number;
    train_CostPerHour_AE: number;
    car_CostPerHour_AF: number;
    canCrossRoads_AG: string;
    stopTimeSeconds_AH: number;
    maxLateralAcceleration_AI: number;
    baseTrackCost: number;
    baseStationCost: number;
    scissorsCrossoverCost: number;
}