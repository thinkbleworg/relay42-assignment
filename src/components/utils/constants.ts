export const ERRORS = {
    MEMBER_NAME: {
        REQUIRED: "Name is required",
        MAX_LIMIT_REACHED: "Member Name must be less than 32 characters"
    },
    TYPE: {
        REQUIRED: "Member Type is required",
        ONE_PILOT_REQUIRED_RULE: "Alteast one Pilot is required for the mission",
        ONLY_ONE_PILOT_RULE: "Not more than one pilot is allowed",
        ONE_PASSENGER_REQUIRED_RULE: "Alteast one Passenger is required for the mission"
    },
    EXPERIENCE: {
        REQUIRED: "Experience is required",
        INVALID: "Experience is invalid",
        PILOT_EXPERIENCE_RULE: "Experience for pilot should be more than 10"
    },
    WEALTH: {
        REQUIRED: "Wealth is required",
        PASSENGER_WEALTH_THRESHOLD_REACH:
            "Wealth required for the mission is reached(10K), no more passenger is allowed"
    },
    JOB: {
        REQUIRED: "Job is required",
        NO_SAME_JOB_RULE: "Engineers on mission cannot have same job"
    },
    AGE: {
        REQUIRED: "Age is required",
        INVALID: "Age is invalid"
    },
    MISSION_NAME: {
        REQUIRED: "Mission Name is required",
        MAX_LIMIT_REACHED: "Mission Name must be less than 32 characters",
        ALREADY_PRESENT: "Mission name is taken"
    },
    DEPARTURE_DATE: {
        REQUIRED: "Departure Date is required",
        PAST_DEPATURE_DATE: "Departure Date cannot be set to a past date"
    },
    DEPARTED_MISSION: "Departed Mission",
    FIELD_NUMBER: {
        MAX_LIMIT_REACHED_30: "Number must be less than or equal to 30",
        MAX_LIMIT_REACHED_60: "Number must be less than or equal to 60",
        MIN_REQUIRED_10: "Number must be greater than or equal to 10"
    }
};

export const memberTypes = ["Pilot", "Engineer", "Passenger"] as const;
export const memberJobs = [
    "Navigation",
    "Solar Panels",
    "Maintenance",
    "Mechanics",
    "Fuelling"
] as const;

export const missionDestination = [
    "Mars Alpha - 100",
    "Mars Alpha - 111",
    "Mars Alpha - 110",
    "Mars Alpha - 105"
] as const;

export const NEW_MISSION_DATE_TO_SET = 30; // Sets 30 days from current date
export const STATIC_TEXTS = {
    CONFIGURE_NEW_MISSION: "Configure a new mission",
    EDIT_MISSION: "Edit a mission",
    CREATE: "Create",
    EDIT: "Edit"
};
