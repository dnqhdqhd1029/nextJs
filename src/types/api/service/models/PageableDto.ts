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
 * @interface PageableDto
 */
export interface PageableDto {
    /**
     * 페이지 번호
     * @type {number}
     * @memberof PageableDto
     */
    page: number;
    /**
     * 페이지 사이즈
     * @type {number}
     * @memberof PageableDto
     */
    size: number;
    /**
     * 정렬 sample: ["name!desc"] ["regisAt!desc"] 
     * @type {Array<string>}
     * @memberof PageableDto
     */
    sort?: Array<string>;
}

/**
 * Check if a given object implements the PageableDto interface.
 */
export function instanceOfPageableDto(value: object): value is PageableDto {
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('size' in value) || value['size'] === undefined) return false;
    return true;
}

export function PageableDtoFromJSON(json: any): PageableDto {
    return PageableDtoFromJSONTyped(json, false);
}

export function PageableDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageableDto {
    if (json == null) {
        return json;
    }
    return {
        
        'page': json['page'],
        'size': json['size'],
        'sort': json['sort'] == null ? undefined : json['sort'],
    };
}

export function PageableDtoToJSON(value?: PageableDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'page': value['page'],
        'size': value['size'],
        'sort': value['sort'],
    };
}

