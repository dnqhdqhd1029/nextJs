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
  BaseResponseCommonMapStringObject,
  BaseResponseCommonNewAccessTokenDto,
  BaseResponseCommonObject,
  BaseResponseCommonString,
  LoginDto,
} from '../models/index';
import {
    BaseResponseCommonMapStringObjectFromJSON,
    BaseResponseCommonMapStringObjectToJSON,
    BaseResponseCommonNewAccessTokenDtoFromJSON,
    BaseResponseCommonNewAccessTokenDtoToJSON,
    BaseResponseCommonObjectFromJSON,
    BaseResponseCommonObjectToJSON,
    BaseResponseCommonStringFromJSON,
    BaseResponseCommonStringToJSON,
    LoginDtoFromJSON,
    LoginDtoToJSON,
} from '../models/index';

export interface AuthenticateUserRequest {
    loginDto: LoginDto;
}

/**
 * 
 */
export class AuthControllerApi extends runtime.BaseAPI {

    /**
     * ID/Password 
     * 로그인 인증 API
     */
    async authenticateUserRaw(requestParameters: AuthenticateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonObject>> {
        if (requestParameters['loginDto'] == null) {
            throw new runtime.RequiredError(
                'loginDto',
                'Required parameter "loginDto" was null or undefined when calling authenticateUser().'
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
            path: `/v1/auth/signin`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: LoginDtoToJSON(requestParameters['loginDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonObjectFromJSON(jsonValue));
    }

    /**
     * ID/Password 
     * 로그인 인증 API
     */
    async authenticateUser(requestParameters: AuthenticateUserRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonObject> {
        const response = await this.authenticateUserRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 로그아웃 처리를 한다.
     * 로그아웃
     */
    async logoutUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
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
            path: `/v1/auth/signout`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 로그아웃 처리를 한다.
     * 로그아웃
     */
    async logoutUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.logoutUserRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async refreshTokenRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonNewAccessTokenDto>> {
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
            path: `/v1/auth/refreshtoken`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonNewAccessTokenDtoFromJSON(jsonValue));
    }

    /**
     */
    async refreshToken(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonNewAccessTokenDto> {
        const response = await this.refreshTokenRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async validateTokenRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonMapStringObject>> {
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
            path: `/v1/auth/validate`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonMapStringObjectFromJSON(jsonValue));
    }

    /**
     */
    async validateToken(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonMapStringObject> {
        const response = await this.validateTokenRaw(initOverrides);
        return await response.value();
    }

}
