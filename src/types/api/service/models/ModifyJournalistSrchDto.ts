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
 * @interface ModifyJournalistSrchDto
 */
export interface ModifyJournalistSrchDto {
    /**
     * 
     * @type {string}
     * @memberof ModifyJournalistSrchDto
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof ModifyJournalistSrchDto
     */
    shareCode?: string;
    /**
     * 
     * @type {string}
     * @memberof ModifyJournalistSrchDto
     */
    shareTargetCode?: string;
    /**
     * 
     * @type {number}
     * @memberof ModifyJournalistSrchDto
     */
    groupId?: number;
    /**
     * 전체 검색조건 저장
     * @type {string}
     * @memberof ModifyJournalistSrchDto
     */
    conditions?: string;
    /**
     * 소유자ID
     * @type {number}
     * @memberof ModifyJournalistSrchDto
     */
    ownerId?: number;
}

/**
 * Check if a given object implements the ModifyJournalistSrchDto interface.
 */
export function instanceOfModifyJournalistSrchDto(value: object): value is ModifyJournalistSrchDto {
    return true;
}

export function ModifyJournalistSrchDtoFromJSON(json: any): ModifyJournalistSrchDto {
    return ModifyJournalistSrchDtoFromJSONTyped(json, false);
}

export function ModifyJournalistSrchDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModifyJournalistSrchDto {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        'shareCode': json['shareCode'] == null ? undefined : json['shareCode'],
        'shareTargetCode': json['shareTargetCode'] == null ? undefined : json['shareTargetCode'],
        'groupId': json['groupId'] == null ? undefined : json['groupId'],
        'conditions': json['conditions'] == null ? undefined : json['conditions'],
        'ownerId': json['ownerId'] == null ? undefined : json['ownerId'],
    };
}

export function ModifyJournalistSrchDtoToJSON(value?: ModifyJournalistSrchDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'shareCode': value['shareCode'],
        'shareTargetCode': value['shareTargetCode'],
        'groupId': value['groupId'],
        'conditions': value['conditions'],
        'ownerId': value['ownerId'],
    };
}

