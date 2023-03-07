interface IPilot {
    type: "Pilot";
    experience: number;
}

interface IEngineer {
    type: "Engineer";
    experience: number;
    job: "Navigation" | "Solar Panels" | "Maintenance" | "Mechanics" | "Fuelling";
}

interface IPassenger {
    type: "Passenger";
    wealth: string;
    age: number;
}

export interface IMembers {
    id: string;
    name: string;
    type: IPilot | IEngineer | IPassenger;
}

export interface IData {
    missionName: string;
    id: string;
    destination: string;
    departureDate: Date;
    memberList: Array<IMembers>;
}

export type IDataList = Array<IData>;

export type TSortOrder = "asc" | "desc";

export type TDialogWidth = "xl" | "lg" | "md" | "sm";

export type TOpenDialog = (args: {
    component: React.ReactNode;
    title: string;
    okCallback: () => void;
    cancelCallback?: () => void;
    width?: TDialogWidth;
    okText?: string;
    cancelText?: string;
}) => void;

export interface IDialogPropTypes {
    showModal: TOpenDialog;
    closeModal: TEmptyFn;
}

export type TEmptyFn = () => void;
