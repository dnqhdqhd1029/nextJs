/* tslint:disable */
/* eslint-disable */
/**
 * MediaBee Service API
 * MediaBee Service API
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BaseResponseCommonListThreadDto,
  BaseResponseCommonLong,
} from '../models/index';
import {
    BaseResponseCommonListThreadDtoFromJSON,
    BaseResponseCommonListThreadDtoToJSON,
    BaseResponseCommonLongFromJSON,
    BaseResponseCommonLongToJSON,
} from '../models/index';

export interface CheckThreadReadRequest {
    threadId: number;
}

/**
 * 
 */
export class ThreadControllerApi extends runtime.BaseAPI {

    /**
     * 새소식 읽음 처리, 다음 목록 가져올시 가져오지 않음 
     * 새소식 읽음 처리 
     */
    async checkThreadReadRaw(requestParameters: CheckThreadReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonLong>> {
        if (requestParameters['threadId'] == null) {
            throw new runtime.RequiredError(
                'threadId',
                'Required parameter "threadId" was null or undefined when calling checkThreadRead().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/threads/{threadId}`.replace(`{${"threadId"}}`, encodeURIComponent(String(requestParameters['threadId']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonLongFromJSON(jsonValue));
    }

    /**
     * 새소식 읽음 처리, 다음 목록 가져올시 가져오지 않음 
     * 새소식 읽음 처리 
     */
    async checkThreadRead(requestParameters: CheckThreadReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonLong> {
        const response = await this.checkThreadReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 새소식 목록 가져오기
     * 새소식 목록 가져오기 
     */
    async findTopThreadsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListThreadDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/threads`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListThreadDtoFromJSON(jsonValue));
    }

    /**
     * 새소식 목록 가져오기
     * 새소식 목록 가져오기 
     */
    async findTopThreads(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListThreadDto> {
        const response = await this.findTopThreadsRaw(initOverrides);
        return await response.value();
    }

}
