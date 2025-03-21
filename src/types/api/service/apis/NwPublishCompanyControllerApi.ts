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
  BaseResponseCommonListNwPublishCompanyForList,
  BaseResponseCommonLong,
  RequestNwPublishCompanyDto,
  SearchNameDto,
} from '../models/index';
import {
    BaseResponseCommonListNwPublishCompanyForListFromJSON,
    BaseResponseCommonListNwPublishCompanyForListToJSON,
    BaseResponseCommonLongFromJSON,
    BaseResponseCommonLongToJSON,
    RequestNwPublishCompanyDtoFromJSON,
    RequestNwPublishCompanyDtoToJSON,
    SearchNameDtoFromJSON,
    SearchNameDtoToJSON,
} from '../models/index';

export interface FindPublishCompanyAutoComplateRequest {
    requestDto: SearchNameDto;
}

export interface PublishCompanySaveRequest {
    requestNwPublishCompanyDto: RequestNwPublishCompanyDto;
}

/**
 * 
 */
export class NwPublishCompanyControllerApi extends runtime.BaseAPI {

    /**
     * 발표회사 자동완성 목록
     * 발표회사 자동완성 목록
     */
    async findPublishCompanyAutoComplateRaw(requestParameters: FindPublishCompanyAutoComplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListNwPublishCompanyForList>> {
        if (requestParameters['requestDto'] == null) {
            throw new runtime.RequiredError(
                'requestDto',
                'Required parameter "requestDto" was null or undefined when calling findPublishCompanyAutoComplate().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['requestDto'] != null) {
            queryParameters['requestDto'] = requestParameters['requestDto'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/publish/company/autocomplete`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListNwPublishCompanyForListFromJSON(jsonValue));
    }

    /**
     * 발표회사 자동완성 목록
     * 발표회사 자동완성 목록
     */
    async findPublishCompanyAutoComplate(requestParameters: FindPublishCompanyAutoComplateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListNwPublishCompanyForList> {
        const response = await this.findPublishCompanyAutoComplateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 발표회사 추가 하기
     * 발표회사 추가 하기
     */
    async publishCompanySaveRaw(requestParameters: PublishCompanySaveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonLong>> {
        if (requestParameters['requestNwPublishCompanyDto'] == null) {
            throw new runtime.RequiredError(
                'requestNwPublishCompanyDto',
                'Required parameter "requestNwPublishCompanyDto" was null or undefined when calling publishCompanySave().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/publish/company`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RequestNwPublishCompanyDtoToJSON(requestParameters['requestNwPublishCompanyDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonLongFromJSON(jsonValue));
    }

    /**
     * 발표회사 추가 하기
     * 발표회사 추가 하기
     */
    async publishCompanySave(requestParameters: PublishCompanySaveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonLong> {
        const response = await this.publishCompanySaveRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
