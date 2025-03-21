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
 * @interface ResponseMediaValuePoint
 */
export interface ResponseMediaValuePoint {
    /**
     * 키값 : 0,10,20,...,90,100
     * @type {string}
     * @memberof ResponseMediaValuePoint
     */
    key?: string;
    /**
     * 키값 백분률의 기준값 
     * @type {number}
     * @memberof ResponseMediaValuePoint
     */
    value?: number;
}

/**
 * Check if a given object implements the ResponseMediaValuePoint interface.
 */
export function instanceOfResponseMediaValuePoint(value: object): value is ResponseMediaValuePoint {
    return true;
}

export function ResponseMediaValuePointFromJSON(json: any): ResponseMediaValuePoint {
    return ResponseMediaValuePointFromJSONTyped(json, false);
}

export function ResponseMediaValuePointFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseMediaValuePoint {
    if (json == null) {
        return json;
    }
    return {
        
        'key': json['key'] == null ? undefined : json['key'],
        'value': json['value'] == null ? undefined : json['value'],
    };
}

export function ResponseMediaValuePointToJSON(value?: ResponseMediaValuePoint | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'key': value['key'],
        'value': value['value'],
    };
}

