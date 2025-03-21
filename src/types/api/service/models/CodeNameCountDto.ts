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
 * @interface CodeNameCountDto
 */
export interface CodeNameCountDto {
    /**
     * 
     * @type {string}
     * @memberof CodeNameCountDto
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof CodeNameCountDto
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof CodeNameCountDto
     */
    count?: number;
}

/**
 * Check if a given object implements the CodeNameCountDto interface.
 */
export function instanceOfCodeNameCountDto(value: object): value is CodeNameCountDto {
    return true;
}

export function CodeNameCountDtoFromJSON(json: any): CodeNameCountDto {
    return CodeNameCountDtoFromJSONTyped(json, false);
}

export function CodeNameCountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CodeNameCountDto {
    if (json == null) {
        return json;
    }
    return {
        
        'code': json['code'] == null ? undefined : json['code'],
        'name': json['name'] == null ? undefined : json['name'],
        'count': json['count'] == null ? undefined : json['count'],
    };
}

export function CodeNameCountDtoToJSON(value?: CodeNameCountDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'code': value['code'],
        'name': value['name'],
        'count': value['count'],
    };
}

