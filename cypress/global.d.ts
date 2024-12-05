/// <reference types="cypress" />

declare namespace Cypress {
    import { authService } from "../src/machines/authMachine";
    import { createTransactionService } from "../src/machines/createTransactionMachine";
    import { publicTransactionService } from "../src/machines/publicTransactionsMachine";
    import { contactsTransactionService } from "../src/machines/contactsTransactionsMachine";
    import { personalTransactionService } from "../src/machines/personalTransactionsMachine";
    // import {
    //     User,
    //     BankAccount,
    //     Like,
    //     Comment,
    //     Transaction,
    //     BankTransfer,
    //     Contact,
    // } from "../src/models";

    interface CustomWindow extends Window {
        authService: typeof authService;
        createTransactionService: typeof createTransactionService;
        publicTransactionService: typeof publicTransactionService;
        contactTransactionService: typeof contactsTransactionService;
        personalTransactionService: typeof personalTransactionService;
    }

    interface UserSignUp {
        name: string;
        password: string;
        repeatPassword: string;
        email: string;
        phone: string;
        username: string;
    }

    type dbQueryArg = {
        entity: string;
        query: object | [object];
    };

    type LoginOptions = {
        rememberUser: boolean;
    };

    interface Chainable {
        /**
         *  Window object with additional properties used during test.
         */
        window(options?: Partial<Loggable & Timeoutable>): Chainable<CustomWindow>;

        /**
         * Custom command to make taking Percy snapshots with full name formed from the test title + suffix easier
         */
        visualSnapshot(maybeName?): Chainable<unknown>;

        getBySel(dataTestAttribute: string, args?: unkown): Chainable<JQuery<HTMLElement>>;
        getBySelLike(
            dataTestPrefixAttribute: string,
            args?: object
        ): Chainable<JQuery<HTMLElement>>;

        /**
         *  Cypress task for directly querying to the database within tests
         */
        task(
            event: "filter:database",
            arg: dbQueryArg,
            options?: Partial<Loggable & Timeoutable>
        ): Chainable<unkown[]>;

        /**
         *  Cypress task for directly querying to the database within tests
         */
        task(
            event: "find:database",
            arg?: unkown,
            options?: Partial<Loggable & Timeoutable>
        ): Chainable<unkown>;

        /**
         * Find a single entity via database query
         */
        database(
            operation: "find",
            entity: string,
            query?: object,
            log?: boolean
        ): Chainable<unkown>;

        /**
         * Filter for data entities via database query
         */
        database(
            operation: "filter",
            entity: string,
            query?: object,
            log?: boolean
        ): Chainable<unkown>;

        /**
         * Fetch React component instance associated with received element subject
         */
        reactComponent(): Chainable<unkown>;

        /**
         * Select data range within date range picker component
         */
        pickDateRange(startDate: Date, endDate: Date): Chainable<void>;

        /**
         * Select transaction amount range
         */
        setTransactionAmountRange(min: number, max: number): Chainable<unkown>;

        /**
         * Paginate to the next page in transaction infinite-scroll pagination view
         */
        nextTransactionFeedPage(service: string, page: number): Chainable<unkown>;

        /**
         * Logs-in user by using UI
         */
        signup({ name, phone, email, password, repeatPassword, username }: UserSignUp): void;

        /**
         * Logs-in user by using UI
         */
        login(username: string, password: string, loginOptions?: LoginOptions): void;

        /**
         * Logs-in user by using API request
         */
        loginByApi(email: string, password?: string): Chainable<Response>;

        /**
         * Check successful login using user data
         */
        AssertSuccessfulOAuth(email: string): Chainable<Response>;

        /**
         * Logs-in using GitHub
         */

        loginByGitHub(email: string, password: string): Chainable<Response>;

        /**
         * Logs-in user by using Google API request
         */
        loginByGoogleApi(): Chainable<Response>;

        /**
         * Logs-in user by using Okta API request
         */
        loginByOktaApi(username: string, password?: string): Chainable<Response>;

        /**
         * Logs-in user by navigating to Okta tenant with cy.origin()
         */
        loginByOkta(username: string, password: string): Chainable<Response>;

        /**
         * Logs in bypassing UI by triggering XState login event
         */
        loginByXstate(username: string, password?: string): Chainable<unkown>;

        /**
         * Logs out via bypassing UI by triggering XState logout event
         */
        logoutByXstate(): Chainable<string>;

        /**
         * Logs in via Auth0 login page
         */
        loginToAuth0(username: string, password: string): Chainable<unkown>;

        /**
         * Switch current user by logging out current user and logging as user with specified username
         */
        switchUserByXstate(username: string): Chainable<unkown>;

        /**
         * Create Transaction via bypassing UI and using XState createTransactionService
         */
        createTransaction(payload): Chainable<unkown>;

        /**
         * Logs in to AWS Cognito via Amplify Auth API bypassing UI using Cypress Task
         */
        loginByCognitoApi(username: string, password: string): Chainable<unkown>;

        /**
         * Logs in to AWS Cognito Federated via cy.origin()
         */
        loginByCognito(username: string, password: string): Chainable<unkown>;

        /**
         * Assert message in sel element
         */
        // errorAssertions(sel: string, message: string): void;

        /**
         * Assert message in sel element
         */
        errorAssertions(errorFields: string[]): void;

        /**
         * Assert message in sel element
         */
        loginErrorAssertions(errorFields: string[]): void;

        /**
         * Go To Personal Settings
         */
        goToSettings(): Chainable<Response>;
        loginAndGoToSettings(): Chainable<Response>;

        /**
         * Logs-in user by using Google UI request
         */
        loginByGoogleUI(email: string, password: string): Chainable<Response>;
    }
}
