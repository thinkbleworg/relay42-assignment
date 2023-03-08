import {z, object, array, string, number, TypeOf, infer, enum as zodEnum} from "zod";
import {createTypeAlias, printNode, zodToTs} from "zod-to-ts";

const memberTypes = ["Pilot", "Engineer", "Passenger"] as const;
const memberJobs = ["Navigation", "Solar Panels", "Maintenance", "Mechanics", "Fuelling"] as const;

export const memberSchema = object({
    id: string().uuid(),
    name: string()
        .nonempty("Name is required")
        .max(32, "Member Name must be less than 32 characters"),
    type: zodEnum(memberTypes),
    experience: string().regex(/^\d+$/).transform(Number).optional().or(z.literal("")),
    wealth: string().optional().or(z.literal("")),
    job: zodEnum(memberJobs).optional().or(z.literal("")),
    age: string().regex(/^\d+$/).transform(Number).optional().or(z.literal(""))
}).superRefine((data, ctx) => {
    console.log("data.type -->", data.type);

    if (data.type === undefined || data.type === null) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["type"],
            message: "Type of member is required"
        });
        return false;
    }
    if (data.type === "Pilot") {
        if (data.experience === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["experience"],
                message: "Experience is required"
            });
            return false;
        }
        if (data.experience !== undefined && data.experience < 10) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["experience"],
                message: "Experience for pilot should be more than 10"
            });
            return false;
        }
    }

    if (data.type === "Engineer") {
        if (data.experience === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["experience"],
                message: "Experience is required"
            });
            return false;
        }
        if (data.job === undefined || data.job === null) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["job"],
                message: "Job is required"
            });
            return false;
        }
    }

    if (data.type === "Passenger") {
        if (data.age === undefined) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["age"],
                message: "Age is required"
            });
            return false;
        }
        if (data.wealth === undefined || data.wealth === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["wealth"],
                message: "Wealth is required"
            });
            return false;
        }
    }
    return true;
});

export const missionSchema = object({
    id: z.string().uuid(),
    missionName: string()
        .nonempty("Mission Name is required")
        .max(32, "Mission Name must be less than 32 characters"),
    destination: string().optional(),
    departureDate: string().nonempty("Departure Date is required"),
    memberList: array(memberSchema).superRefine((data, ctx) => {
        console.log("memberList array data", data);

        //Contains atleast one pilot
        const pilotList = data.filter((d) => d.type === "Pilot");
        console.log("pilotList", pilotList);
        if (pilotList.length === 0) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "One pilot is required"
            });
            return false;
        } else if (pilotList.length > 1) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Not more than one pilot is allowed"
            });
            return false;
        }

        //Contains atleast one passenger
        if (!data.some((d) => d.type === "Passenger")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Atleast one passenger is required"
            });
            return false;
        }

        // Duplicate of engineer job list
        const engineerJobList = data.filter((d) => d.type === "Engineer").map((d) => d.job);
        if (engineerJobList.some((d, idx) => engineerJobList.indexOf(d) !== idx)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Engineers cannot have same job"
            });
            return false;
        }

        return true;
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
