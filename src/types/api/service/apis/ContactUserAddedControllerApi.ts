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
  BaseResponseCommonContactUserAddedDto,
  BaseResponseCommonString,
  RequestContactUserAddedDto,
} from '../models/index';
import {
    BaseResponseCommonContactUserAddedDtoFromJSON,
    BaseResponseCommonContactUserAddedDtoToJSON,
    BaseResponseCommonStringFromJSON,
    BaseResponseCommonStringToJSON,
    RequestContactUserAddedDtoFromJSON,
    RequestContactUserAddedDtoToJSON,
} from '../models/index';

export interface AddContactJournalistRequest {
    requestContactUserAddedDto: RequestContactUserAddedDto;
}

export interface AddContactMediaRequest {
    requestContactUserAddedDto: RequestContactUserAddedDto;
}

export interface DeleteContactRequest {
    id: number;
}

export interface GetContactJournalistRequest {
    id: number;
}

export interface GetContactMediaRequest {
    id: number;
}

/**
 * 
 */
export class ContactUserAddedControllerApi extends runtime.BaseAPI {

    /**
     * 언론인에 개인적 연락처 추가/수정
     * 언론인 개인적 연락처 추가/수정
     */
    async addContactJournalistRaw(requestParameters: AddContactJournalistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['requestContactUserAddedDto'] == null) {
            throw new runtime.RequiredError(
                'requestContactUserAddedDto',
                'Required parameter "requestContactUserAddedDto" was null or undefined when calling addContactJournalist().'
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
            path: `/v1/svc/contact/journalist`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RequestContactUserAddedDtoToJSON(requestParameters['requestContactUserAddedDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 언론인에 개인적 연락처 추가/수정
     * 언론인 개인적 연락처 추가/수정
     */
    async addContactJournalist(requestParameters: AddContactJournalistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.addContactJournalistRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 미디어에 개인적 연락처 추가/수정
     * 미디어 개인적 연락처 추가/수정
     */
    async addContactMediaRaw(requestParameters: AddContactMediaRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['requestContactUserAddedDto'] == null) {
            throw new runtime.RequiredError(
                'requestContactUserAddedDto',
                'Required parameter "requestContactUserAddedDto" was null or undefined when calling addContactMedia().'
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
            path: `/v1/svc/contact/media`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RequestContactUserAddedDtoToJSON(requestParameters['requestContactUserAddedDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 미디어에 개인적 연락처 추가/수정
     * 미디어 개인적 연락처 추가/수정
     */
    async addContactMedia(requestParameters: AddContactMediaRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.addContactMediaRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 개인적 연락처 삭제하기, 같은 회사 사람 것만 삭제 가능
     * 미디어/언론인 개인적 연락처 삭제하기
     */
    async deleteContactRaw(requestParameters: DeleteContactRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteContact().'
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
            path: `/v1/svc/contact/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 개인적 연락처 삭제하기, 같은 회사 사람 것만 삭제 가능
     * 미디어/언론인 개인적 연락처 삭제하기
     */
    async deleteContact(requestParameters: DeleteContactRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.deleteContactRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 언론인에 개인적 연락처 정보 가져오기
     * 언론인 개인적 연락처 정보 가져오기
     */
    async getContactJournalistRaw(requestParameters: GetContactJournalistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonContactUserAddedDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getContactJournalist().'
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
            path: `/v1/svc/contact/journalist/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonContactUserAddedDtoFromJSON(jsonValue));
    }

    /**
     * 언론인에 개인적 연락처 정보 가져오기
     * 언론인 개인적 연락처 정보 가져오기
     */
    async getContactJournalist(requestParameters: GetContactJournalistRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonContactUserAddedDto> {
        const response = await this.getContactJournalistRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 미디어에 개인적 연락처 정보 가져오기
     * 미디어 개인적 연락처 정보 가져오기
     */
    async getContactMediaRaw(requestParameters: GetContactMediaRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonContactUserAddedDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getContactMedia().'
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
            path: `/v1/svc/contact/media/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonContactUserAddedDtoFromJSON(jsonValue));
    }

    /**
     * 미디어에 개인적 연락처 정보 가져오기
     * 미디어 개인적 연락처 정보 가져오기
     */
    async getContactMedia(requestParameters: GetContactMediaRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonContactUserAddedDto> {
        const response = await this.getContactMediaRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
