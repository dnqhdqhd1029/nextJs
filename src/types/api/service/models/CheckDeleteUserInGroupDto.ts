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
 * @interface CheckDeleteUserInGroupDto
 */
export interface CheckDeleteUserInGroupDto {
    /**
     * 그룹ID
     * @type {number}
     * @memberof CheckDeleteUserInGroupDto
     */
    groupId: number;
    /**
     * 
     * @type {number}
     * @memberof CheckDeleteUserInGroupDto
     */
    userId?: number;
}

/**
 * Check if a given object implements the CheckDeleteUserInGroupDto interface.
 */
export function instanceOfCheckDeleteUserInGroupDto(value: object): value is CheckDeleteUserInGroupDto {
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    return true;
}

export function CheckDeleteUserInGroupDtoFromJSON(json: any): CheckDeleteUserInGroupDto {
    return CheckDeleteUserInGroupDtoFromJSONTyped(json, false);
}

export function CheckDeleteUserInGroupDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CheckDeleteUserInGroupDto {
    if (json == null) {
        return json;
    }
    return {
        
        'groupId': json['groupId'],
        'userId': json['userId'] == null ? undefined : json['userId'],
    };
}

export function CheckDeleteUserInGroupDtoToJSON(value?: CheckDeleteUserInGroupDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'groupId': value['groupId'],
        'userId': value['userId'],
    };
}

