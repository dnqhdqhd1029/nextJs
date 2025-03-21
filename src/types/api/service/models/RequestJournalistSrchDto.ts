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
 * @interface RequestJournalistSrchDto
 */
export interface RequestJournalistSrchDto {
    /**
     * 그룹 ID, 공유 대상이 이그룹인 경우에 조건으로 처리
     * @type {number}
     * @memberof RequestJournalistSrchDto
     */
    groupId: number;
}

/**
 * Check if a given object implements the RequestJournalistSrchDto interface.
 */
export function instanceOfRequestJournalistSrchDto(value: object): value is RequestJournalistSrchDto {
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    return true;
}

export function RequestJournalistSrchDtoFromJSON(json: any): RequestJournalistSrchDto {
    return RequestJournalistSrchDtoFromJSONTyped(json, false);
}

export function RequestJournalistSrchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestJournalistSrchDto {
    if (json == null) {
        return json;
    }
    return {
        
        'groupId': json['groupId'],
    };
}

export function RequestJournalistSrchDtoToJSON(value?: RequestJournalistSrchDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'groupId': value['groupId'],
    };
}

