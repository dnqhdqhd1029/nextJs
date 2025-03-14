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
 * @interface SaveSharePolicyDto
 */
export interface SaveSharePolicyDto {
    /**
     * 언론인,미디어 목록
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    list?: string;
    /**
     * 언론인,미디어 맞춤 검색
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    jrnlstMediaSrch?: string;
    /**
     * 클립북
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    clipbook?: string;
    /**
     * 모니터링
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    news_search?: string;
    /**
     * 프로젝트
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    project?: string;
    /**
     * 활동(노트,약속,전화,문의)
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    action?: string;
    /**
     * 이메일,보도자료,뉴스와이어 배포
     * @type {string}
     * @memberof SaveSharePolicyDto
     */
    distribute?: string;
}

/**
 * Check if a given object implements the SaveSharePolicyDto interface.
 */
export function instanceOfSaveSharePolicyDto(value: object): value is SaveSharePolicyDto {
    return true;
}

export function SaveSharePolicyDtoFromJSON(json: any): SaveSharePolicyDto {
    return SaveSharePolicyDtoFromJSONTyped(json, false);
}

export function SaveSharePolicyDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SaveSharePolicyDto {
    if (json == null) {
        return json;
    }
    return {
        
        'list': json['list'] == null ? undefined : json['list'],
        'jrnlstMediaSrch': json['jrnlstMediaSrch'] == null ? undefined : json['jrnlstMediaSrch'],
        'clipbook': json['clipbook'] == null ? undefined : json['clipbook'],
        'news_search': json['news_search'] == null ? undefined : json['news_search'],
        'project': json['project'] == null ? undefined : json['project'],
        'action': json['action'] == null ? undefined : json['action'],
        'distribute': json['distribute'] == null ? undefined : json['distribute'],
    };
}

export function SaveSharePolicyDtoToJSON(value?: SaveSharePolicyDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'list': value['list'],
        'jrnlstMediaSrch': value['jrnlstMediaSrch'],
        'clipbook': value['clipbook'],
        'news_search': value['news_search'],
        'project': value['project'],
        'action': value['action'],
        'distribute': value['distribute'],
    };
}

