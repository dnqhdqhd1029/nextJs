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
 * @interface ModifyTagDto
 */
export interface ModifyTagDto {
    /**
     * 태그
     * @type {string}
     * @memberof ModifyTagDto
     */
    name: string;
}

/**
 * Check if a given object implements the ModifyTagDto interface.
 */
export function instanceOfModifyTagDto(value: object): value is ModifyTagDto {
    if (!('name' in value) || value['name'] === undefined) return false;
    return true;
}

export function ModifyTagDtoFromJSON(json: any): ModifyTagDto {
    return ModifyTagDtoFromJSONTyped(json, false);
}

export function ModifyTagDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModifyTagDto {
    if (json == null) {
        return json;
    }
    return {
        
        'name': json['name'],
    };
}

export function ModifyTagDtoToJSON(value?: ModifyTagDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'name': value['name'],
    };
}

