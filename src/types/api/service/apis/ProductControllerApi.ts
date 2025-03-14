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
  BaseResponseCommonListProductCountPriceDto,
  BaseResponseCommonListProductForSimpleDto,
} from '../models/index';
import {
    BaseResponseCommonListProductCountPriceDtoFromJSON,
    BaseResponseCommonListProductCountPriceDtoToJSON,
    BaseResponseCommonListProductForSimpleDtoFromJSON,
    BaseResponseCommonListProductForSimpleDtoToJSON,
} from '../models/index';

export interface GetSubProductPriceListRequest {
    id: number;
}

/**
 * 
 */
export class ProductControllerApi extends runtime.BaseAPI {

    /**
     * 구매 신청 가능한 메인 상품 목록 가져오기
     * 구매 신청 가능한 메인 상품 목록 가져오기
     */
    async getGeneralProductListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListProductForSimpleDto>> {
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
            path: `/v1/svc/sales/product/list`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListProductForSimpleDtoFromJSON(jsonValue));
    }

    /**
     * 구매 신청 가능한 메인 상품 목록 가져오기
     * 구매 신청 가능한 메인 상품 목록 가져오기
     */
    async getGeneralProductList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListProductForSimpleDto> {
        const response = await this.getGeneralProductListRaw(initOverrides);
        return await response.value();
    }

    /**
     * 부가서비스 목록 가져오기
     * 부가서비스 목록 가져오기
     */
    async getSubProductListToAddRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListProductForSimpleDto>> {
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
            path: `/v1/svc/additions/product`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListProductForSimpleDtoFromJSON(jsonValue));
    }

    /**
     * 부가서비스 목록 가져오기
     * 부가서비스 목록 가져오기
     */
    async getSubProductListToAdd(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListProductForSimpleDto> {
        const response = await this.getSubProductListToAddRaw(initOverrides);
        return await response.value();
    }

    /**
     * 부가서비스 구매 묶음 목록(수량, 단가, 가격) 가져오기
     * 부가서비스 구매 묶음 목록 가져오기
     */
    async getSubProductPriceListRaw(requestParameters: GetSubProductPriceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListProductCountPriceDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getSubProductPriceList().'
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
            path: `/v1/svc/additions/product/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListProductCountPriceDtoFromJSON(jsonValue));
    }

    /**
     * 부가서비스 구매 묶음 목록(수량, 단가, 가격) 가져오기
     * 부가서비스 구매 묶음 목록 가져오기
     */
    async getSubProductPriceList(requestParameters: GetSubProductPriceListRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListProductCountPriceDto> {
        const response = await this.getSubProductPriceListRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
