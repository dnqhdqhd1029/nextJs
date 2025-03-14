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
 * @interface CommonCodeDto
 */
export interface CommonCodeDto {
    /**
     * 
     * @type {number}
     * @memberof CommonCodeDto
     */
    commonCodeId?: number;
    /**
     * 
     * @type {number}
     * @memberof CommonCodeDto
     */
    parentId?: number;
    /**
     * 
     * @type {string}
     * @memberof CommonCodeDto
     */
    parentCode?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonCodeDto
     */
    code?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonCodeDto
     */
    language?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonCodeDto
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof CommonCodeDto
     */
    note?: string;
    /**
     * 
     * @type {boolean}
     * @memberof CommonCodeDto
     */
    def?: boolean;
    /**
     * 
     * @type {number}
     * @memberof CommonCodeDto
     */
    weight?: number;
    /**
     * 
     * @type {number}
     * @memberof CommonCodeDto
     */
    count?: number;
}

/**
 * Check if a given object implements the CommonCodeDto interface.
 */
export function instanceOfCommonCodeDto(value: object): value is CommonCodeDto {
    return true;
}

export function CommonCodeDtoFromJSON(json: any): CommonCodeDto {
    return CommonCodeDtoFromJSONTyped(json, false);
}

export function CommonCodeDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommonCodeDto {
    if (json == null) {
        return json;
    }
    return {
        
        'commonCodeId': json['commonCodeId'] == null ? undefined : json['commonCodeId'],
        'parentId': json['parentId'] == null ? undefined : json['parentId'],
        'parentCode': json['parentCode'] == null ? undefined : json['parentCode'],
        'code': json['code'] == null ? undefined : json['code'],
        'language': json['language'] == null ? undefined : json['language'],
        'name': json['name'] == null ? undefined : json['name'],
        'note': json['note'] == null ? undefined : json['note'],
        'def': json['def'] == null ? undefined : json['def'],
        'weight': json['weight'] == null ? undefined : json['weight'],
        'count': json['count'] == null ? undefined : json['count'],
    };
}

export function CommonCodeDtoToJSON(value?: CommonCodeDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'commonCodeId': value['commonCodeId'],
        'parentId': value['parentId'],
        'parentCode': value['parentCode'],
        'code': value['code'],
        'language': value['language'],
        'name': value['name'],
        'note': value['note'],
        'def': value['def'],
        'weight': value['weight'],
        'count': value['count'],
    };
}

