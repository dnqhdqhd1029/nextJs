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
 * @interface AddDelNewsAndPrDto
 */
export interface AddDelNewsAndPrDto {
    /**
     * 클립북 ID 목록
     * @type {Array<number>}
     * @memberof AddDelNewsAndPrDto
     */
    clipBookIdList: Array<number>;
    /**
     * News ID 배열 또는 보도자료ID 배열
     * @type {Array<number>}
     * @memberof AddDelNewsAndPrDto
     */
    newsIdList?: Array<number>;
    /**
     * 일반 클립북인 경우 필요, 기사의 YYYYMM 목록
     * @type {Array<string>}
     * @memberof AddDelNewsAndPrDto
     */
    newsIndexList?: Array<string>;
    /**
     * 보도자료ID 배열
     * @type {Array<number>}
     * @memberof AddDelNewsAndPrDto
     */
    prIdList?: Array<number>;
}

/**
 * Check if a given object implements the AddDelNewsAndPrDto interface.
 */
export function instanceOfAddDelNewsAndPrDto(value: object): value is AddDelNewsAndPrDto {
    if (!('clipBookIdList' in value) || value['clipBookIdList'] === undefined) return false;
    return true;
}

export function AddDelNewsAndPrDtoFromJSON(json: any): AddDelNewsAndPrDto {
    return AddDelNewsAndPrDtoFromJSONTyped(json, false);
}

export function AddDelNewsAndPrDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddDelNewsAndPrDto {
    if (json == null) {
        return json;
    }
    return {
        
        'clipBookIdList': json['clipBookIdList'],
        'newsIdList': json['newsIdList'] == null ? undefined : json['newsIdList'],
        'newsIndexList': json['newsIndexList'] == null ? undefined : json['newsIndexList'],
        'prIdList': json['prIdList'] == null ? undefined : json['prIdList'],
    };
}

export function AddDelNewsAndPrDtoToJSON(value?: AddDelNewsAndPrDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'clipBookIdList': value['clipBookIdList'],
        'newsIdList': value['newsIdList'],
        'newsIndexList': value['newsIndexList'],
        'prIdList': value['prIdList'],
    };
}

