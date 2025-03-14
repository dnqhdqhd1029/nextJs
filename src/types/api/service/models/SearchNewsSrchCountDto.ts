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
 * @interface SearchNewsSrchCountDto
 */
export interface SearchNewsSrchCountDto {
    /**
     * 그룹 ID
     * @type {number}
     * @memberof SearchNewsSrchCountDto
     */
    groupId: number;
}

/**
 * Check if a given object implements the SearchNewsSrchCountDto interface.
 */
export function instanceOfSearchNewsSrchCountDto(value: object): value is SearchNewsSrchCountDto {
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    return true;
}

export function SearchNewsSrchCountDtoFromJSON(json: any): SearchNewsSrchCountDto {
    return SearchNewsSrchCountDtoFromJSONTyped(json, false);
}

export function SearchNewsSrchCountDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SearchNewsSrchCountDto {
    if (json == null) {
        return json;
    }
    return {
        
        'groupId': json['groupId'],
    };
}

export function SearchNewsSrchCountDtoToJSON(value?: SearchNewsSrchCountDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'groupId': value['groupId'],
    };
}

