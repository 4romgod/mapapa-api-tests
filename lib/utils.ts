import joi from 'joi';
import {getInstanceOfMapapaClient, STAGES} from '@mapapa/api-client';
import {Scenario} from './constants';
import dotenv from 'dotenv';
dotenv.config();

const {STAGE} = process.env;
const stage = STAGES[STAGE?.toUpperCase() || STAGES.DEV];
export const mapapaClient = getInstanceOfMapapaClient(stage).mapapaClient;

export const verifyResponse = (response: any, expectedResponse: any) => {
    if (expectedResponse) {
        expect(response).toMatchObject(expectedResponse);
    }
};

export const verifyBody = (responseBody: any, expectedBody: any) => {
    if (expectedBody) {
        expect(responseBody).toMatchObject(expectedBody);
    }
};

export const verifySchema = (response: any, schema: joi.Schema) => {
    if (schema) {
        const validationResult = schema.validate(response);
        if (validationResult.error) {
            console.log(response);
            console.log(validationResult.error);
        }
        expect(validationResult.error).toBe(undefined);
    }
};

export const generatePositiveScenarioTests = (parameters: any, positiveScenarios: Scenario[], beforeEachFn?: any, afterEachFn?: any) => {
    let beforeEachParameters: any;
    if (beforeEachFn) {
        beforeEach(async () => {
            beforeEachParameters = await beforeEachFn();
        });
    }
    if (afterEachFn) {
        afterEach(async () => {
            await afterEachFn();
        });
    }
    describe('positive scenarios', () => {
        for (const scenario of positiveScenarios) {
            for (const testCase of scenario.cases) {
                it(testCase.verifies, async () => {
                    try {
                        const requestParameters = {
                            ...parameters,
                            ...beforeEachParameters,
                            ...testCase.parameters,
                        };
                        const result = await scenario.request(requestParameters, testCase.requestConfig);

                        testCase.schemaToValidate && verifySchema(result.data, testCase.schemaToValidate);
                        testCase.expectedResponseBody && verifyBody(result.data, testCase.expectedResponseBody);
                        verifyResponse(result, testCase.expectedResponse);
                    } catch (error: any) {
                        console.log(error);
                        throw new Error('Request Should Not Throw an Error');
                    }
                });
            }
        }
    });
};

export const generateNegativeScenarioTests = (parameters: any, negativeScenarios: Scenario[], beforeEachFn?: any, afterEachFn?: any) => {
    let beforeEachParameters: any;
    if (beforeEachFn) {
        beforeEach(async () => {
            beforeEachParameters = await beforeEachFn();
        });
    }
    if (afterEachFn) {
        afterEach(async () => {
            await afterEachFn();
        });
    }
    describe('negative scenarios', () => {
        for (const scenario of negativeScenarios) {
            for (const testCase of scenario.cases) {
                it(testCase.verifies, async () => {
                    try {
                        const requestParameters = {
                            ...parameters,
                            ...beforeEachParameters,
                            ...testCase.parameters,
                        };
                        await scenario.request(requestParameters, testCase.requestConfig);
                        throw new Error('Request Should Throw an Error');
                    } catch (error: any) {
                        console.log(error.response.data);
                        verifyResponse(error.response, testCase.expectedResponse);
                        testCase.expectedResponseBody && verifyBody(error.response.data, testCase.expectedResponseBody);
                    }
                });
            }
        }
    });
};
