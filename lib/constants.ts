import {AxiosRequestConfig} from 'axios';

export interface Case {
    verifies: string;
    parameters: any;
    expectedResponse: {
        status: number;
        statusText?: string;
        headers?: any;
    };
    expectedResponseBody?: any;
    schemaToValidate?: any;
    requestConfig?: AxiosRequestConfig;
}

export interface Scenario {
    request: (requestParameters?: any, requestConfig?: AxiosRequestConfig<any> | undefined) => any;
    cases: Case[];
}
