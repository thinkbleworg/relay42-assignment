type TPilot = {
    type: "Pilot";

    /**
     * The experience of Pilot
     *
     * @minimum 10
     * @maximum 30
     */
    experience: number;
};

type TEngineer = {
    type: "Engineer";

    /**
     * The experience of Engineer
     *
     * @minimum 1
     * @maximum 30
     */
    experience: number;

    job: "Navigation" | "Solar Panels" | "Maintenance" | "Mechanics" | "Fuelling";
};

type TPassenger = {
    type: "Passenger";
    wealth: number;

    /**
     * The age of the passenger
     *
     * @minimum 10
     * @maximum 60
     */
    age: number;
};

type TMemberType = TPilot | TEngineer | TPassenger;

type TAnyMember<T> = T extends any ? T : never;

export interface IMembers {
    id: string;
    name: string;
    type: TAnyMember<TMemberType>;
}

export interface IData {
    id: string;
    missionName: string;
    destination?: string;
    departureDate: Date;
    memberList: Array<IMembers>;
}

export type IDataList = Array<IData>;
