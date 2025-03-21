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
  BaseResponseCommonListCommonCodeDto,
  BaseResponseCommonListPreLoadCommonCodeDto,
  BaseResponseCommonString,
  RequestCommonCodeDto,
  RequestPreLoadCommonCodeDto,
} from '../models/index';
import {
    BaseResponseCommonListCommonCodeDtoFromJSON,
    BaseResponseCommonListCommonCodeDtoToJSON,
    BaseResponseCommonListPreLoadCommonCodeDtoFromJSON,
    BaseResponseCommonListPreLoadCommonCodeDtoToJSON,
    BaseResponseCommonStringFromJSON,
    BaseResponseCommonStringToJSON,
    RequestCommonCodeDtoFromJSON,
    RequestCommonCodeDtoToJSON,
    RequestPreLoadCommonCodeDtoFromJSON,
    RequestPreLoadCommonCodeDtoToJSON,
} from '../models/index';

export interface FindCommonCodeValueRequest {
    requestDto: RequestCommonCodeDto;
}

export interface FindCommonCodeValueNoUserRequest {
    requestDto: RequestCommonCodeDto;
}

export interface PreLoadCommonCodeValueRequest {
    requestDto: RequestPreLoadCommonCodeDto;
}

/**
 * 
 */
export class CommonCodeControllerApi extends runtime.BaseAPI {

    /**
     * 코드값 가져오기, parentCommonCodeId는 MEDIA_SUB_TYPE 미디어세부유형 조회시 MEDIA_TYPE의 commonCodeId. 그외에는 설정 필요 없음
     * 공통 코드 목록 가져오기
     */
    async findCommonCodeValueRaw(requestParameters: FindCommonCodeValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListCommonCodeDto>> {
        if (requestParameters['requestDto'] == null) {
            throw new runtime.RequiredError(
                'requestDto',
                'Required parameter "requestDto" was null or undefined when calling findCommonCodeValue().'
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
            path: `/v1/svc/commoncode`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListCommonCodeDtoFromJSON(jsonValue));
    }

    /**
     * 코드값 가져오기, parentCommonCodeId는 MEDIA_SUB_TYPE 미디어세부유형 조회시 MEDIA_TYPE의 commonCodeId. 그외에는 설정 필요 없음
     * 공통 코드 목록 가져오기
     */
    async findCommonCodeValue(requestParameters: FindCommonCodeValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListCommonCodeDto> {
        const response = await this.findCommonCodeValueRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 코드값 가져오기, parentCommonCodeId 는 사용 안함
     * 공통 코드 목록 가져오기(비회원용)
     */
    async findCommonCodeValueNoUserRaw(requestParameters: FindCommonCodeValueNoUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListCommonCodeDto>> {
        if (requestParameters['requestDto'] == null) {
            throw new runtime.RequiredError(
                'requestDto',
                'Required parameter "requestDto" was null or undefined when calling findCommonCodeValueNoUser().'
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
            path: `/v1/svc/nouser/commoncode`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListCommonCodeDtoFromJSON(jsonValue));
    }

    /**
     * 코드값 가져오기, parentCommonCodeId 는 사용 안함
     * 공통 코드 목록 가져오기(비회원용)
     */
    async findCommonCodeValueNoUser(requestParameters: FindCommonCodeValueNoUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListCommonCodeDto> {
        const response = await this.findCommonCodeValueNoUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Health Check 용, NKS 에서 서비스가 살아있는지 확인하는 용도
     * Health Check 용
     */
    async healthCheckRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
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
            path: `/v1/svc/nouser/healthcheck`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * Health Check 용, NKS 에서 서비스가 살아있는지 확인하는 용도
     * Health Check 용
     */
    async healthCheck(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.healthCheckRaw(initOverrides);
        return await response.value();
    }

    /**
     * 미리 로드해 놓을 공통 코드 목록 가져오기
     * 미리 로드해 놓을 공통 코드 목록 가져오기
     */
    async preLoadCommonCodeValueRaw(requestParameters: PreLoadCommonCodeValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListPreLoadCommonCodeDto>> {
        if (requestParameters['requestDto'] == null) {
            throw new runtime.RequiredError(
                'requestDto',
                'Required parameter "requestDto" was null or undefined when calling preLoadCommonCodeValue().'
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
            path: `/v1/svc/commoncode/preload`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListPreLoadCommonCodeDtoFromJSON(jsonValue));
    }

    /**
     * 미리 로드해 놓을 공통 코드 목록 가져오기
     * 미리 로드해 놓을 공통 코드 목록 가져오기
     */
    async preLoadCommonCodeValue(requestParameters: PreLoadCommonCodeValueRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListPreLoadCommonCodeDto> {
        const response = await this.preLoadCommonCodeValueRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
