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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ProductCountPriceDto
 */
export interface ProductCountPriceDto {
    /**
     * 수량
     * @type {number}
     * @memberof ProductCountPriceDto
     */
    count?: number;
    /**
     * 단가
     * @type {number}
     * @memberof ProductCountPriceDto
     */
    price?: number;
    /**
     * 가격(부가세 별도)
     * @type {number}
     * @memberof ProductCountPriceDto
     */
    computedPrice?: number;
}

/**
 * Check if a given object implements the ProductCountPriceDto interface.
 */
export function instanceOfProductCountPriceDto(value: object): value is ProductCountPriceDto {
    return true;
}

export function ProductCountPriceDtoFromJSON(json: any): ProductCountPriceDto {
    return ProductCountPriceDtoFromJSONTyped(json, false);
}

export function ProductCountPriceDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductCountPriceDto {
    if (json == null) {
        return json;
    }
    return {
        
        'count': json['count'] == null ? undefined : json['count'],
        'price': json['price'] == null ? undefined : json['price'],
        'computedPrice': json['computedPrice'] == null ? undefined : json['computedPrice'],
    };
}

export function ProductCountPriceDtoToJSON(value?: ProductCountPriceDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'count': value['count'],
        'price': value['price'],
        'computedPrice': value['computedPrice'],
    };
}

