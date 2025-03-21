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
 * @interface RequestNewsSrchDto
 */
export interface RequestNewsSrchDto {
    /**
     * 그룹 ID, 공유 대상이 이그룹인 경우에 조건으로 처리
     * @type {number}
     * @memberof RequestNewsSrchDto
     */
    groupId: number;
}

/**
 * Check if a given object implements the RequestNewsSrchDto interface.
 */
export function instanceOfRequestNewsSrchDto(value: object): value is RequestNewsSrchDto {
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    return true;
}

export function RequestNewsSrchDtoFromJSON(json: any): RequestNewsSrchDto {
    return RequestNewsSrchDtoFromJSONTyped(json, false);
}

export function RequestNewsSrchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestNewsSrchDto {
    if (json == null) {
        return json;
    }
    return {
        
        'groupId': json['groupId'],
    };
}

export function RequestNewsSrchDtoToJSON(value?: RequestNewsSrchDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'groupId': value['groupId'],
    };
}

