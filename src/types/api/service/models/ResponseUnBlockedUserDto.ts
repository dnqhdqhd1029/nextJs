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
 * @interface ResponseUnBlockedUserDto
 */
export interface ResponseUnBlockedUserDto {
    /**
     * from Email
     * @type {string}
     * @memberof ResponseUnBlockedUserDto
     */
    from?: string;
    /**
     * to Email
     * @type {string}
     * @memberof ResponseUnBlockedUserDto
     */
    to?: string;
    /**
     * Blocked User key 
     * @type {number}
     * @memberof ResponseUnBlockedUserDto
     */
    blockedUserId?: number;
    /**
     * 수신거부한 날짜
     * @type {string}
     * @memberof ResponseUnBlockedUserDto
     */
    blockedAt?: string;
}

/**
 * Check if a given object implements the ResponseUnBlockedUserDto interface.
 */
export function instanceOfResponseUnBlockedUserDto(value: object): value is ResponseUnBlockedUserDto {
    return true;
}

export function ResponseUnBlockedUserDtoFromJSON(json: any): ResponseUnBlockedUserDto {
    return ResponseUnBlockedUserDtoFromJSONTyped(json, false);
}

export function ResponseUnBlockedUserDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResponseUnBlockedUserDto {
    if (json == null) {
        return json;
    }
    return {
        
        'from': json['from'] == null ? undefined : json['from'],
        'to': json['to'] == null ? undefined : json['to'],
        'blockedUserId': json['blockedUserId'] == null ? undefined : json['blockedUserId'],
        'blockedAt': json['blockedAt'] == null ? undefined : json['blockedAt'],
    };
}

export function ResponseUnBlockedUserDtoToJSON(value?: ResponseUnBlockedUserDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'from': value['from'],
        'to': value['to'],
        'blockedUserId': value['blockedUserId'],
        'blockedAt': value['blockedAt'],
    };
}

