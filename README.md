# relay42-assignment

Mars Mission Project

# Functionalities

1. Mission can be searched with mission names
2. Missions can be selected and deleted as a single mission or as a whole
3. Mission Table is sortable
4. Mission with Departure Date in past are set as "Departed"
5. Mission table is paginated and no. of entities can be choosen.
6. Mission can be edited when clicked on edit icon which opens a modal
7. Create Button is used to create a new mission
8. A new mission can be created with members and mission properties
9. Mission Schema
    - Id: Unique Identifier
    - Mission Name: String
    - Destination: String
    - Departure Date: Date
    - Members: Array
        - Id: Unique Identifier
        - Name: String
        - Type: Enum
        - Experience: Number: Optional(Dependent on Type as "Pilot" | "Engineer")
        - Age: Number: Optional(Dependent on Type as "Passenger")
        - Job: Enum: Optional((Dependent on Type as "Engineer"))
        - Wealth: String: Optional(Dependent on Type as "Passenger")

# Validations

1. Mission name and departure date are required
2. A mission must have exactly 1 pilot
3. Pilot should have at least 10 years of experience
4. All engineers have different job (can't have 2 engineers with the same job)
5. At least 1 passenger
6. Member name is required
7. Missions with past dates are not be editable, and datepicker are not let select past dates
8. While creating a new mission, departure date should be set to 1 month of current date

# TODO

1. Select Field Keyboard nav not working
2. Scroll for Mission Table
3. JS Comments for methods and modules
4. Fix Typescript Eslint warnings

# Components Defined

1. Loading as HOC
2. Modal Component as both HOC and context
3. React Hook Form Controller based inputs

# Modules used

1. Zod for handling schema. Optional Zod to ts module included
2. Material UI for handling UI components and emotion for styling
3. UUID for generating unique identifier
4. Typescript
5. react-hook-form for handling form data
6. Hook form resolvers for bridging Zod to react-hook-form
7. Eslint and its related modules
8. Webpack and TS-loader for bundling and transpiling
