import {z, object, array, string, number, TypeOf, infer, enum as zodEnum, coerce} from "zod";
import {createTypeAlias, printNode, zodToTs} from "zod-to-ts";

import {ERRORS, memberJobs, memberTypes} from "./constants";

export const memberSchema = object({
    id: string().uuid(),
    name: string()
        .nonempty(ERRORS.MEMBER_NAME.REQUIRED)
        .max(32, ERRORS.MEMBER_NAME.MAX_LIMIT_REACHED),
    type: zodEnum(memberTypes, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case "invalid_type":
                    return {message: ERRORS.TYPE.REQUIRED};
                case "invalid_enum_value":
                    return {message: ERRORS.TYPE.REQUIRED};
                default:
                    return {message: ERRORS.TYPE.REQUIRED};
            }
        }
    }),
    wealth: coerce.number().optional(),
    experience: coerce.number().min(1).max(30).optional(),
    job: zodEnum(memberJobs, {
        errorMap: (issue, _ctx) => {
            switch (issue.code) {
                case "invalid_type":
                    return {message: ERRORS.JOB.REQUIRED};
                case "invalid_enum_value":
                    return {message: ERRORS.JOB.REQUIRED};
                default:
                    return {message: ERRORS.JOB.REQUIRED};
            }
        }
    }).optional(),
    age: coerce.number().min(10).max(60).optional()
}).superRefine((data, ctx) => {
    // console.log("data.type -->", data.type);

    if (data.type === undefined || data.type === null) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["type"],
            message: ERRORS.TYPE.REQUIRED
        });
    }
    if (data.type === "Pilot") {
        if (data.experience === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["experience"],
                message: ERRORS.EXPERIENCE.REQUIRED
            });
        }
        if (data.experience !== undefined && data.experience < 10) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["experience"],
                message: ERRORS.EXPERIENCE.PILOT_EXPERIENCE_RULE
            });
        }
    }

    if (data.type === "Engineer") {
        if (data.experience === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["experience"],
                message: ERRORS.EXPERIENCE.REQUIRED
            });
        }
        if (data.job === undefined || data.job === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["job"],
                message: ERRORS.JOB.REQUIRED
            });
        }
    }

    if (data.type === "Passenger") {
        if (data.age === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["age"],
                message: ERRORS.AGE.REQUIRED
            });
        }
    }
    return true;
});

export const missionSchema = object({
    id: string().uuid(),
    missionName: string()
        .nonempty(ERRORS.MISSION_NAME.REQUIRED)
        .max(32, ERRORS.MISSION_NAME.MAX_LIMIT_REACHED),
    destination: string().optional(),
    departureDate: string()
        .nonempty(ERRORS.DEPARTURE_DATE.REQUIRED)
        .superRefine((data, ctx) => {
            if (new Date(data).getTime() <= new Date().getTime()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: ERRORS.DEPARTURE_DATE.PAST_DEPATURE_DATE
                });
            }
        }),
    memberList: array(memberSchema).superRefine((data, ctx) => {
        // console.log("memberList array data", data);

        //Contains atleast one pilot
        const pilotList = data.filter((d) => d.type === "Pilot");
        // console.log("pilotList", pilotList);
        if (pilotList.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERRORS.TYPE.ONE_PILOT_REQUIRED_RULE
            });
        } else if (pilotList.length > 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERRORS.TYPE.ONLY_ONE_PILOT_RULE
            });
        }

        //Contains atleast one passenger
        if (!data.some((d) => d.type === "Passenger")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERRORS.TYPE.ONE_PASSENGER_REQUIRED_RULE
            });
        }

        const passengerList = data.filter((d) => d.type === "Passenger");
        const passengerWealthList = passengerList.filter((d) => d.wealth > 10000);
        if (passengerList.length > 1 && passengerWealthList.length > 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERRORS.WEALTH.PASSENGER_WEALTH_THRESHOLD_REACH
            });
        } else {
        }

        // Duplicate of engineer job list
        const engineerJobList = data.filter((d) => d.type === "Engineer").map((d) => d.job);
        if (engineerJobList.some((d, idx) => engineerJobList.indexOf(d) !== idx)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: ERRORS.JOB.NO_SAME_JOB_RULE
            });
        }
    })
});

export type TMissionForm = TypeOf<typeof missionSchema>;

export type TMemberForm = TypeOf<typeof memberSchema>;

//Optional Code: To convert zod schema to typescript types
// const identifier = "Mission";
// const {node} = zodToTs(missionSchema, identifier);
// const typeAlias = createTypeAlias(node, identifier);
// const nodeString = printNode(typeAlias);

// console.log(" node ---->", nodeString);

//TESTING
// console.log(
//     "userSchema",
//     missionSchema.safeParse({
//         missionName: "Mars Mission 01",
//         memberList: [
//             {
//                 id: "b40dcec0-3732-43c6-a98d-4995f409cc92",
//                 type: "Pilot",
//                 experience: 11,
//                 name: "Wilbur Willms"
//             },
//             {
//                 id: "85417392-36e1-4462-9ec1-8eaae6942b92",
//                 type: "Passenger",
//                 age: 30,
//                 wealth: "Rich",
//                 name: "Kenneth Brakus"
//             },
//             {
//                 id: "0b77da1b-3346-4938-9bdb-5a97793e89fd",
//                 type: "Engineer",
//                 experience: 5,
//                 job: "Navigation",
//                 age: 49,
//                 name: "Felipe Paucek"
//             },
//             {
//                 id: "c5478681-e059-42ee-9255-1b394b0910eb",
//                 type: "Engineer",
//                 experience: 2,
//                 job: "Maintenance",
//                 age: 24,
//                 name: "Seth Russel"
//             },
//             {
//                 id: "c7ed996b-07e0-42d9-bff6-8eb793407215",
//                 type: "Engineer",
//                 experience: 9,
//                 job: "Mechanics",
//                 age: 38,
//                 name: "Seth Thiel"
//             }
//             {
//                 id: "ad691eb1-e4b4-4b69-8d81-acd1a8f913c1",
//                 type: "Passenger",
//                 age: 28,
//                 wealth: "Rich",
//                 name: "Glenda Abernathy"
//             }
//         ],
//         id: "4f5bc723-9500-4cdb-a12b-674ebab66d50",
//         destination: "Mars Alpha - 110",
//         departureDate: "2023-08-29"
//     })
// );

// console.log(
//     "memberSchema",
//     membersSchema.safeParse({
//         id: "85417392-36e1-4462-9ec1-8eaae6942b92",
//         type: "Passenger",
//         age: 30,
//         wealth: "",
//         name: "Kenneth Brakus"
//     })
// );
