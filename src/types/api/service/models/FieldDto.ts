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
 * @interface FieldDto
 */
export interface FieldDto {
    /**
     * 
     * @type {number}
     * @memberof FieldDto
     */
    fieldId?: number;
    /**
     * 
     * @type {string}
     * @memberof FieldDto
     */
    name?: string;
}

/**
 * Check if a given object implements the FieldDto interface.
 */
export function instanceOfFieldDto(value: object): value is FieldDto {
    return true;
}

export function FieldDtoFromJSON(json: any): FieldDto {
    return FieldDtoFromJSONTyped(json, false);
}

export function FieldDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): FieldDto {
    if (json == null) {
        return json;
    }
    return {
        
        'fieldId': json['fieldId'] == null ? undefined : json['fieldId'],
        'name': json['name'] == null ? undefined : json['name'],
    };
}

export function FieldDtoToJSON(value?: FieldDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'fieldId': value['fieldId'],
        'name': value['name'],
    };
}

