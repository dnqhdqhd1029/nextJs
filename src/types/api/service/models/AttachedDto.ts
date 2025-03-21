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
 * @interface AttachedDto
 */
export interface AttachedDto {
    /**
     * 
     * @type {number}
     * @memberof AttachedDto
     */
    attachedId?: number;
    /**
     * 
     * @type {string}
     * @memberof AttachedDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachedDto
     */
    path?: string;
    /**
     * 
     * @type {string}
     * @memberof AttachedDto
     */
    objectType?: string;
    /**
     * 
     * @type {number}
     * @memberof AttachedDto
     */
    objectId?: number;
}

/**
 * Check if a given object implements the AttachedDto interface.
 */
export function instanceOfAttachedDto(value: object): value is AttachedDto {
    return true;
}

export function AttachedDtoFromJSON(json: any): AttachedDto {
    return AttachedDtoFromJSONTyped(json, false);
}

export function AttachedDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AttachedDto {
    if (json == null) {
        return json;
    }
    return {
        
        'attachedId': json['attachedId'] == null ? undefined : json['attachedId'],
        'name': json['name'] == null ? undefined : json['name'],
        'path': json['path'] == null ? undefined : json['path'],
        'objectType': json['objectType'] == null ? undefined : json['objectType'],
        'objectId': json['objectId'] == null ? undefined : json['objectId'],
    };
}

export function AttachedDtoToJSON(value?: AttachedDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'attachedId': value['attachedId'],
        'name': value['name'],
        'path': value['path'],
        'objectType': value['objectType'],
        'objectId': value['objectId'],
    };
}

