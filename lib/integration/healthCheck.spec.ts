import {positiveScenarios} from '../config/healthCheck';
import {generatePositiveScenarioTests} from '../utils';

describe('healthcheck', () => {
    generatePositiveScenarioTests({}, positiveScenarios);
});
