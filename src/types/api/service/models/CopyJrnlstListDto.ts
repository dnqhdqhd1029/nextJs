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
 * @interface CopyJrnlstListDto
 */
export interface CopyJrnlstListDto {
    /**
     * 원본 언론인목록 ID
     * @type {number}
     * @memberof CopyJrnlstListDto
     */
    jrnlstListId: number;
    /**
     * 타이틀
     * @type {string}
     * @memberof CopyJrnlstListDto
     */
    title: string;
    /**
     * 프로젝트ID
     * @type {number}
     * @memberof CopyJrnlstListDto
     */
    projectId?: number;
    /**
     * 복사할 그룹 Id
     * @type {number}
     * @memberof CopyJrnlstListDto
     */
    groupId: number;
    /**
     * 공유 설정
     * @type {string}
     * @memberof CopyJrnlstListDto
     */
    shareCode?: string;
}

/**
 * Check if a given object implements the CopyJrnlstListDto interface.
 */
export function instanceOfCopyJrnlstListDto(value: object): value is CopyJrnlstListDto {
    if (!('jrnlstListId' in value) || value['jrnlstListId'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    return true;
}

export function CopyJrnlstListDtoFromJSON(json: any): CopyJrnlstListDto {
    return CopyJrnlstListDtoFromJSONTyped(json, false);
}

export function CopyJrnlstListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CopyJrnlstListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'jrnlstListId': json['jrnlstListId'],
        'title': json['title'],
        'projectId': json['projectId'] == null ? undefined : json['projectId'],
        'groupId': json['groupId'],
        'shareCode': json['shareCode'] == null ? undefined : json['shareCode'],
    };
}

export function CopyJrnlstListDtoToJSON(value?: CopyJrnlstListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'jrnlstListId': value['jrnlstListId'],
        'title': value['title'],
        'projectId': value['projectId'],
        'groupId': value['groupId'],
        'shareCode': value['shareCode'],
    };
}

