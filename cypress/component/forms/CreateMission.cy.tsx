import "../../support/commands";
import {mount} from "cypress/react18";

import React from "react";
import CreateMission from "../../../src/components/Forms/CreateMission";
import {
    STATIC_TEXTS,
    missionDestination,
    memberTypes,
    memberJobs,
    ERRORS,
    NEW_MISSION_DATE_TO_SET
} from "../../../src/components/utils/constants";
import {formatDate, findDateDifference} from "../../../src/components/utils/utils";

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add("mount", mount);

// -- Start: Our Application Code --

const handleModalOkClick = (callbackValues: any) => {
    console.log("callbackValues -->", callbackValues);
};
const existingMissionNames = ["Mars Mission 01", "Mars Mission 02"];
const pastDate = formatDate(new Date(Date.now() - NEW_MISSION_DATE_TO_SET * 86400000));
const initialDepartureDate = formatDate(new Date(Date.now() + NEW_MISSION_DATE_TO_SET * 86400000));
const longNameString = "avhrephzspwlbyetzsigbujimydprzcnuvfxidgqgbhxtycujw";
// -- End: Our Application Code --

// -- Start: Our Cypress Tests --
const addMemberWithType = (memberId: number, memberType: number) => {
    cy.log("Adding new Member");
    cy.get("button[aria-label='add member']").click(); //Add Member
    cy.get(`.member-block-${memberId}`).should("exist");
    cy.get(`input[name='memberList.${memberId}.type'`).parent().click();
    cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(memberType).click(); //selecting member
};

const deleteMember = (memberId) => {
    cy.get(`.delete-member-${memberId}`).click(); //Delete member click
    cy.get(`.member-block-${memberId}`).should("not.exist");
};

const validateMemberErrors = (errorMsg: string) => {
    cy.get("button[type='submit']").click(); //submit click
    cy.get(".member-errors").should("contain.text", errorMsg); //Member error
};

const noMemberError = () => {
    cy.get("button[type='submit']").click(); //submit click
    cy.get(".member-errors").should("not.exist"); //No member error
};

describe("Tests for new mission", () => {
    beforeEach(function () {
        cy.fixture("new-form").then((data) => {
            this.fixtureData = data;
        });
    });

    // New Mission Mode
    it("Mount Create Mission Form and Verify the elements on New Form", () => {
        cy.mount(
            <CreateMission
                okCallback={handleModalOkClick}
                mode="new"
                missionData={undefined}
                existingMissionNames={undefined}
            />
        );
        cy.get("button").should("contains.text", STATIC_TEXTS.CREATE);

        //Mission Details
        cy.get("input[name='missionName']").should("be.empty").should("be.visible");
        cy.get("input[name='destination']").should("have.value", missionDestination[0]);
        cy.get("input[name='destination']")
            .parent()
            .get(".MuiSelect-select")
            .should("contains.text", missionDestination[0]);
        cy.get("input[name='departureDate']").should("have.value", initialDepartureDate);

        //Mission Member Details
        //Default Member 1
        cy.get("input[name='memberList.0.name'").should("be.empty").should("be.visible");
        cy.get("input[name='memberList.0.type'").should("have.value", memberTypes[0]);
        cy.get("input[name='memberList.0.type']")
            .parent()
            .get(".MuiSelect-select")
            .should("contains.text", memberTypes[0]);
        cy.get("input[name='memberList.0.experience'").should("have.value", 10);

        //Default Member 2
        cy.get("input[name='memberList.1.name'").should("be.empty").should("be.visible");
        cy.get("input[name='memberList.1.type'").should("have.value", memberTypes[2]);
        cy.get("input[name='memberList.1.type']")
            .parent()
            .get(".MuiSelect-select")
            .should("contains.text", memberTypes[2]);
        cy.get("input[name='memberList.1.age'").should("have.value", 1);
        cy.get("input[name='memberList.1.wealth'").should("be.empty").should("be.visible");
    });

    it("Mission name validations on new mission", () => {
        cy.mount(
            <CreateMission
                okCallback={handleModalOkClick}
                mode="new"
                missionData={undefined}
                existingMissionNames={existingMissionNames}
            />
        );
        cy.get("input[name='missionName']")
            .type(existingMissionNames[0])
            .parent()
            .should("have.class", "Mui-error")
            .next()
            .should("contain.text", ERRORS.MISSION_NAME.ALREADY_PRESENT);

        cy.get("input[name='missionName']").clear({force: true});
        cy.get("button[type='submit']").click(); //submit click

        cy.get("input[name='missionName']")
            .type(longNameString)
            .parent()
            .should("have.class", "Mui-error")
            .next()
            .should("contain.text", ERRORS.MISSION_NAME.MAX_LIMIT_REACHED);

        cy.get("input[name='missionName']")
            .clear({force: true})
            .type("Some mission")
            .parent()
            .should("not.have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("not.exist");
    });

    it("Departure Date validations", () => {
        cy.mount(
            <CreateMission
                okCallback={handleModalOkClick}
                mode="new"
                missionData={undefined}
                existingMissionNames={undefined}
            />
        );
        cy.get("input[name='departureDate']").type(pastDate).trigger("keydown", {
            key: "Enter"
        });
        cy.get("button[type='submit']").click(); //submit click
        cy.get("input[name='departureDate']")
            .parent()
            .should("have.class", "Mui-error")
            .next()
            .should("contain.text", ERRORS.DEPARTURE_DATE.PAST_DEPATURE_DATE);
        cy.get("input[name='departureDate']").type(initialDepartureDate).trigger("keydown", {
            key: "Enter"
        });
        cy.get("input[name='departureDate']")
            .parent()
            .should("not.have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("not.exist");
        cy.get("input[name='departureDate']")
            .clear({force: true})
            .parent()
            .should("have.class", "Mui-error")
            .next()
            .should("contain.text", ERRORS.DEPARTURE_DATE.REQUIRED);
    });

    it("Members validation", () => {
        cy.mount(
            <CreateMission
                okCallback={handleModalOkClick}
                mode="new"
                missionData={undefined}
                existingMissionNames={undefined}
            />
        );

        //Correct Mission name added
        cy.get("input[name='missionName']").type(existingMissionNames[0]);

        cy.get("button[aria-label='Delete Member']").first().click(); //Removing pilot
        cy.get("input[name='memberList.0.type'").should("have.value", memberTypes[2]); // only passenger present

        validateMemberErrors(ERRORS.TYPE.ONE_PILOT_REQUIRED_RULE);

        cy.get("input[name='memberList.0.type'").parent().click(); //modifying the existing member to pilot thereby removing passenger
        cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(1).click(); //selecting pilot
        cy.get("input[name='memberList.0.experience'").should("exist"); // checking experience field
        validateMemberErrors(ERRORS.TYPE.ONE_PASSENGER_REQUIRED_RULE);

        //adding passenger back
        addMemberWithType(1, 3);
        cy.get("input[name='memberList.1.age'").should("exist"); // checking experience field
        cy.get("input[name='memberList.1.wealth'").should("exist"); // checking experience field

        //validating pilot
        cy.get("button[type='submit']").click(); //submit click
        cy.get("input[name='memberList.0.name'")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.MEMBER_NAME.REQUIRED);
        cy.get("input[name='memberList.0.name'")
            .clear({force: true})
            .type(longNameString)
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.MEMBER_NAME.MAX_LIMIT_REACHED);
        cy.get("input[name='memberList.0.experience'")
            .clear({force: true})
            .type("5")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.EXPERIENCE.PILOT_EXPERIENCE_RULE);
        cy.get("input[name='memberList.0.experience'")
            .clear({force: true})
            .type("50")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.FIELD_NUMBER.MAX_LIMIT_REACHED_30);
        cy.get("input[name='memberList.0.age'").should("not.exist"); //checking for absence of other fields
        cy.get("input[name='memberList.0.wealth'").should("not.exist");
        cy.get("input[name='memberList.0.job'").should("not.exist");
        addMemberWithType(2, 1);
        validateMemberErrors(ERRORS.TYPE.ONLY_ONE_PILOT_RULE);
        deleteMember(2);

        //correct usecase for pilot
        cy.get("input[name='memberList.0.name'")
            .clear({force: true})
            .type("pilotname")
            .parent()
            .should("not.have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("not.exist");
        cy.get("input[name='memberList.0.experience'")
            .clear({force: true})
            .type("20")
            .parent()
            .should("not.have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("not.exist");

        //validating passenger
        cy.get("button[type='submit']").click(); //submit click
        cy.get("input[name='memberList.1.age'")
            .clear({force: true})
            .type("5")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.FIELD_NUMBER.MIN_REQUIRED_10);
        cy.get("input[name='memberList.1.age'")
            .clear({force: true})
            .type("80")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.FIELD_NUMBER.MAX_LIMIT_REACHED_60);
        cy.get("input[name='memberList.1.wealth'").clear({force: true}).type("12000");
        cy.get("input[name='memberList.1.experience'").should("not.exist"); //checking for absence of other fields
        cy.get("input[name='memberList.1.job'").should("not.exist");

        addMemberWithType(2, 3);
        cy.get("input[name='memberList.2.wealth'").clear({force: true}).type("100");
        validateMemberErrors(ERRORS.WEALTH.PASSENGER_WEALTH_THRESHOLD_REACH);
        deleteMember(2);
        noMemberError();

        //correct usecase for passenger
        cy.get("input[name='memberList.1.name'").clear({force: true}).type("passengername");
        cy.get("input[name='memberList.1.age'").clear({force: true}).type("23");

        //validating engineer
        addMemberWithType(2, 2); //selecting engineer
        cy.get("input[name='memberList.2.experience'").clear({force: true}).type("34");
        cy.get("button[type='submit']").click(); //submit click
        cy.get("input[name='memberList.2.experience'")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.FIELD_NUMBER.MAX_LIMIT_REACHED_30);
        cy.get("input[name='memberList.2.job'")
            .parent()
            .should("have.class", "Mui-error")
            .parent()
            .find(".MuiFormHelperText-root")
            .should("contain.text", ERRORS.JOB.REQUIRED);
        cy.get("input[name='memberList.2.job'").parent().click();
        cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(1).click(); //selecting a job for engineer 1

        addMemberWithType(3, 2); //selecting another engineer
        cy.get("input[name='memberList.3.job'").parent().click();
        cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(1).click(); //selecting a job for engineer 2 same as engineer 1
        validateMemberErrors(ERRORS.JOB.NO_SAME_JOB_RULE);
        cy.get("input[name='memberList.3.job'").parent().click();
        cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(2).click(); //Selecting different job for engineer 2

        noMemberError();

        deleteMember(3);

        //correct usecase for engineer
        cy.get("input[name='memberList.2.name'").clear({force: true}).type("engineer name 1");
        cy.get("input[name='memberList.2.experience'").clear({force: true}).type("20");
    });

    it("Mission submission with proper data", function () {
        cy.mount(
            <CreateMission
                okCallback={cy.stub().as("okCallback")}
                mode="new"
                missionData={undefined}
                existingMissionNames={undefined}
            />
        );

        //Correct Mission name added

        cy.get("input[name='missionName']").type(existingMissionNames[0]);
        cy.get("input[name='departureDate']").clear({force: true}).type(initialDepartureDate);

        //correct usecase for pilot
        cy.get("input[name='memberList.0.name'").clear({force: true}).type("pilotname");
        cy.get("input[name='memberList.0.experience'").clear({force: true}).type("20");

        //correct usecase for passenger
        cy.get("input[name='memberList.1.name'").clear({force: true}).type("passengername");
        cy.get("input[name='memberList.1.age'").clear({force: true}).type("23");
        cy.get("input[name='memberList.1.wealth'").clear({force: true}).type("2300");

        //correct usecase for engineer
        addMemberWithType(2, 2); //selecting engineer
        cy.get("input[name='memberList.2.name'").clear({force: true}).type("engineer name 1");
        cy.get("input[name='memberList.2.experience'").clear({force: true}).type("20");
        cy.get("input[name='memberList.2.job'").parent().click();
        cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(2).click();

        //submit click
        // cy.get("form").submit();
        cy.get("button[type='submit']").click(); //submit click

        const callbackValue = cy
            .get("@okCallback")
            .should("have.been.calledOnce")
            .should("have.been.calledWith", Cypress.sinon.match.object)
            .its("firstCall.args.0");
        callbackValue.then((data) => {
            expect(Cypress._.omit(data, ["values.id", "values.memberList"])).to.deep.include({
                mode: "new",
                values: {
                    departureDate: initialDepartureDate,
                    destination: "Mars Alpha - 100",
                    missionName: "Mars Mission 01"
                }
            });
        });
    });
});

describe("Tests for a existing mission", () => {
    beforeEach(function () {
        cy.fixture("new-form").then((data) => {
            this.fixtureData = data;
        });
        cy.fixture("past-date-form").as("pastFixtureData");
    });

    it("Validate Mission Details with existing data and future date", function () {
        console.log("fixtureData values ==>", this.fixtureData.values);
        cy.mount(
            <CreateMission
                okCallback={cy.stub().as("okCallback")}
                mode="edit"
                missionData={this.fixtureData.values}
                existingMissionNames={undefined}
            />
        );

        //Correct Mission name added
        cy.get("input[name='missionName']").should("have.value", existingMissionNames[0]);
        cy.get("input[name='missionName']").should("be.disabled"); // edit mode, mission names are not editable
        cy.get("input[name='destination']").should("have.value", missionDestination[0]);
        cy.get("input[name='departureDate']").should("have.value", "2023-04-17");

        //correct usecase for pilot
        cy.get("input[name='memberList.0.name'").should("have.value", "pilotname");
        cy.get("input[name='memberList.0.experience'").should("have.value", "20");

        //correct usecase for passenger
        cy.get("input[name='memberList.1.name'").should("have.value", "passengername");
        cy.get("input[name='memberList.1.age'").should("have.value", "23");
        cy.get("input[name='memberList.1.wealth'").should("have.value", "2300");

        //correct usecase for engineer
        cy.get("input[name='memberList.2.name'").should("have.value", "engineer name 1");
        cy.get("input[name='memberList.2.experience'").should("have.value", "20");
        cy.get("input[name='memberList.2.job'").should("have.value", memberJobs[1]);

        cy.get("button[type='submit']").should("not.be.disabled"); //Future mission
        cy.get("button[aria-label='add member']").should("not.be.disabled");

        // Ability to add another member and save
        addMemberWithType(3, 2); //selecting another engineer
        cy.get("input[name='memberList.3.name'").clear({force: true}).type("engineer name 2");
        cy.get("input[name='memberList.3.experience'").clear({force: true}).type("20");
        cy.get("input[name='memberList.3.job'").parent().click();
        cy.get(".MuiMenu-list").find(".MuiMenuItem-root").eq(3).click();

        cy.get("form").submit();

        const callbackValue = cy
            .get("@okCallback")
            .should("have.been.calledOnce")
            .should("have.been.calledWith", Cypress.sinon.match.object)
            .its("firstCall.args.0");
        callbackValue.then((data) => {
            const members = data && data.values && data.values.memberList;
            console.log("members in callback", members);
            cy.wrap(members)
                .then((list) =>
                    // from every object in the list, pick the all properties except id
                    Cypress._.map(list, (o) =>
                        Cypress._.pick(o, ["experience", "job", "name", "type"])
                    )
                )
                .should("deep.include", {
                    experience: 20,
                    job: "Maintenance",
                    name: "engineer name 2",
                    type: "Engineer"
                });
        });
    });

    it("Departed Mission check for disabled fields", () => {
        cy.get("@pastFixtureData").then((pastData: any) => {
            console.log("past fixtureData values ==>", pastData.values);
            cy.mount(
                <CreateMission
                    okCallback={cy.stub().as("okCallback")}
                    mode="edit"
                    missionData={pastData.values}
                    existingMissionNames={undefined}
                />
            );

            cy.get("input[name='missionName']")
                .should("have.value", existingMissionNames[0])
                .should("be.disabled");
            cy.get("input[name='destination']")
                .should("have.value", missionDestination[0])
                .should("be.disabled");
            cy.get("input[name='departureDate']")
                .should("have.value", "2023-02-17")
                .should("be.disabled");

            //correct usecase for pilot
            cy.get("input[name='memberList.0.name'")
                .should("have.value", "pilotname")
                .should("be.disabled");
            cy.get("input[name='memberList.0.experience'")
                .should("have.value", "20")
                .should("be.disabled");

            //correct usecase for passenger
            cy.get("input[name='memberList.1.name'")
                .should("have.value", "passengername")
                .should("be.disabled");
            cy.get("input[name='memberList.1.age'")
                .should("have.value", "23")
                .should("be.disabled");
            cy.get("input[name='memberList.1.wealth'")
                .should("have.value", "2300")
                .should("be.disabled");

            //correct usecase for engineer
            cy.get("input[name='memberList.2.name'")
                .should("have.value", "engineer name 1")
                .should("be.disabled");
            cy.get("input[name='memberList.2.experience'")
                .should("have.value", "20")
                .should("be.disabled");
            cy.get("input[name='memberList.2.job'")
                .should("have.value", memberJobs[1])
                .should("be.disabled");

            cy.get("button[type='submit']").should("be.disabled"); //past mission
            cy.get("button[aria-label='add member']").should("not.exist");
            cy.get("button[type='submit']")
                .parent()
                .find(".mission-errors")
                .should("contain.text", ERRORS.DEPARTED_MISSION);
        });
    });
});
