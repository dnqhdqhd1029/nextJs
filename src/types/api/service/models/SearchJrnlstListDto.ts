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
 * @interface SearchJrnlstListDto
 */
export interface SearchJrnlstListDto {
    /**
     * 언론인목록 Title
     * @type {string}
     * @memberof SearchJrnlstListDto
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof SearchJrnlstListDto
     */
    shareCode?: string;
    /**
     * 그룹 ID
     * @type {number}
     * @memberof SearchJrnlstListDto
     */
    groupId: number;
    /**
     * 
     * @type {number}
     * @memberof SearchJrnlstListDto
     */
    ownerId?: number;
}

/**
 * Check if a given object implements the SearchJrnlstListDto interface.
 */
export function instanceOfSearchJrnlstListDto(value: object): value is SearchJrnlstListDto {
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    return true;
}

export function SearchJrnlstListDtoFromJSON(json: any): SearchJrnlstListDto {
    return SearchJrnlstListDtoFromJSONTyped(json, false);
}

export function SearchJrnlstListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchJrnlstListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        'shareCode': json['shareCode'] == null ? undefined : json['shareCode'],
        'groupId': json['groupId'],
        'ownerId': json['ownerId'] == null ? undefined : json['ownerId'],
    };
}

export function SearchJrnlstListDtoToJSON(value?: SearchJrnlstListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'shareCode': value['shareCode'],
        'groupId': value['groupId'],
        'ownerId': value['ownerId'],
    };
}

