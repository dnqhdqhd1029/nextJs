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
 * @interface EditSharePolicyMediaListDto
 */
export interface EditSharePolicyMediaListDto {
    /**
     * 미디어목록 ID 리스트
     * @type {Array<number>}
     * @memberof EditSharePolicyMediaListDto
     */
    mediaListIdList: Array<number>;
    /**
     * 공유설정
     * @type {string}
     * @memberof EditSharePolicyMediaListDto
     */
    shareCode: string;
}

/**
 * Check if a given object implements the EditSharePolicyMediaListDto interface.
 */
export function instanceOfEditSharePolicyMediaListDto(value: object): value is EditSharePolicyMediaListDto {
    if (!('mediaListIdList' in value) || value['mediaListIdList'] === undefined) return false;
    if (!('shareCode' in value) || value['shareCode'] === undefined) return false;
    return true;
}

export function EditSharePolicyMediaListDtoFromJSON(json: any): EditSharePolicyMediaListDto {
    return EditSharePolicyMediaListDtoFromJSONTyped(json, false);
}

export function EditSharePolicyMediaListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): EditSharePolicyMediaListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'mediaListIdList': json['mediaListIdList'],
        'shareCode': json['shareCode'],
    };
}

export function EditSharePolicyMediaListDtoToJSON(value?: EditSharePolicyMediaListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'mediaListIdList': value['mediaListIdList'],
        'shareCode': value['shareCode'],
    };
}

