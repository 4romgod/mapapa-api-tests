import joi from 'joi';
import {Scenario} from '../constants';
import {mapapaClient} from '../utils';

const healthCheckSchema = joi.object().keys({
    uptime: joi.number(),
    message: joi.string(),
    timestamp: joi.date(),
});

const healthcheckRequest = async () => await mapapaClient.getHealthCheck();

export const positiveScenarios: Scenario[] = [
    {
        request: healthcheckRequest,
        cases: [
            {
                verifies: 'successfully gets healthCheck',
                parameters: {},
                expectedResponse: {
                    status: 200,
                },
                schemaToValidate: healthCheckSchema,
            },
        ],
    },
];
