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
 * @interface SortObject
 */
export interface SortObject {
    /**
     * 
     * @type {boolean}
     * @memberof SortObject
     */
    empty?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SortObject
     */
    unsorted?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SortObject
     */
    sorted?: boolean;
}

/**
 * Check if a given object implements the SortObject interface.
 */
export function instanceOfSortObject(value: object): value is SortObject {
    return true;
}

export function SortObjectFromJSON(json: any): SortObject {
    return SortObjectFromJSONTyped(json, false);
}

export function SortObjectFromJSONTyped(json: any, ignoreDiscriminator: boolean): SortObject {
    if (json == null) {
        return json;
    }
    return {
        
        'empty': json['empty'] == null ? undefined : json['empty'],
        'unsorted': json['unsorted'] == null ? undefined : json['unsorted'],
        'sorted': json['sorted'] == null ? undefined : json['sorted'],
    };
}

export function SortObjectToJSON(value?: SortObject | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'empty': value['empty'],
        'unsorted': value['unsorted'],
        'sorted': value['sorted'],
    };
}

