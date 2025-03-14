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
 * @interface ResponseSearchCountDto
 */
export interface ResponseSearchCountDto {
    /**
     * 
     * @type {number}
     * @memberof ResponseSearchCountDto
     */
    mediaSrchCount?: number;
    /**
     * 
     * @type {number}
     * @memberof ResponseSearchCountDto
     */
    journalistSrchCount?: number;
}

/**
 * Check if a given object implements the ResponseSearchCountDto interface.
 */
export function instanceOfResponseSearchCountDto(value: object): value is ResponseSearchCountDto {
    return true;
}

export function ResponseSearchCountDtoFromJSON(json: any): ResponseSearchCountDto {
    return ResponseSearchCountDtoFromJSONTyped(json, false);
}

export function ResponseSearchCountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseSearchCountDto {
    if (json == null) {
        return json;
    }
    return {
        
        'mediaSrchCount': json['mediaSrchCount'] == null ? undefined : json['mediaSrchCount'],
        'journalistSrchCount': json['journalistSrchCount'] == null ? undefined : json['journalistSrchCount'],
    };
}

export function ResponseSearchCountDtoToJSON(value?: ResponseSearchCountDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'mediaSrchCount': value['mediaSrchCount'],
        'journalistSrchCount': value['journalistSrchCount'],
    };
}

