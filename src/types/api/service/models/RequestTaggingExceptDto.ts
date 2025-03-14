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
 * @interface RequestTaggingExceptDto
 */
export interface RequestTaggingExceptDto {
    /**
     * 구분값 : NEWS(뉴스) / ACTION(활동) / NEWSWIRE(뉴스와이어) 구분값 
     * @type {string}
     * @memberof RequestTaggingExceptDto
     */
    category: string;
    /**
     * 태그ID 목록
     * @type {Array<number>}
     * @memberof RequestTaggingExceptDto
     */
    tagIdList: Array<number>;
    /**
     * newsId / actionId / nwReleaseId 등 대상 id 값 목록
     * @type {Array<number>}
     * @memberof RequestTaggingExceptDto
     */
    targetIdList: Array<number>;
}

/**
 * Check if a given object implements the RequestTaggingExceptDto interface.
 */
export function instanceOfRequestTaggingExceptDto(value: object): value is RequestTaggingExceptDto {
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('tagIdList' in value) || value['tagIdList'] === undefined) return false;
    if (!('targetIdList' in value) || value['targetIdList'] === undefined) return false;
    return true;
}

export function RequestTaggingExceptDtoFromJSON(json: any): RequestTaggingExceptDto {
    return RequestTaggingExceptDtoFromJSONTyped(json, false);
}

export function RequestTaggingExceptDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestTaggingExceptDto {
    if (json == null) {
        return json;
    }
    return {
        
        'category': json['category'],
        'tagIdList': json['tagIdList'],
        'targetIdList': json['targetIdList'],
    };
}

export function RequestTaggingExceptDtoToJSON(value?: RequestTaggingExceptDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'category': value['category'],
        'tagIdList': value['tagIdList'],
        'targetIdList': value['targetIdList'],
    };
}

