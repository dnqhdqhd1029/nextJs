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
 * @interface RequestShareDto
 */
export interface RequestShareDto {
    /**
     * 제목
     * @type {string}
     * @memberof RequestShareDto
     */
    title: string;
    /**
     * 공유 대상(공통코드 : SHARE_OBJECT - MAILING 활동(이메일), PHONE 활동(전화), NOTE 활동(노트) 등
     * @type {string}
     * @memberof RequestShareDto
     */
    objectType?: string;
    /**
     *  그룹내 메일 받는 회원ID 목록
     * @type {Array<number>}
     * @memberof RequestShareDto
     */
    userIdList?: Array<number>;
    /**
     * 추가 받는 메일 주소
     * @type {Array<string>}
     * @memberof RequestShareDto
     */
    extraMailList?: Array<string>;
    /**
     * 메시지
     * @type {string}
     * @memberof RequestShareDto
     */
    body?: string;
    /**
     * 내용
     * @type {string}
     * @memberof RequestShareDto
     */
    content: string;
    /**
     * 공유Link
     * @type {string}
     * @memberof RequestShareDto
     */
    link: string;
}

/**
 * Check if a given object implements the RequestShareDto interface.
 */
export function instanceOfRequestShareDto(value: object): value is RequestShareDto {
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('content' in value) || value['content'] === undefined) return false;
    if (!('link' in value) || value['link'] === undefined) return false;
    return true;
}

export function RequestShareDtoFromJSON(json: any): RequestShareDto {
    return RequestShareDtoFromJSONTyped(json, false);
}

export function RequestShareDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestShareDto {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'],
        'objectType': json['objectType'] == null ? undefined : json['objectType'],
        'userIdList': json['userIdList'] == null ? undefined : json['userIdList'],
        'extraMailList': json['extraMailList'] == null ? undefined : json['extraMailList'],
        'body': json['body'] == null ? undefined : json['body'],
        'content': json['content'],
        'link': json['link'],
    };
}

export function RequestShareDtoToJSON(value?: RequestShareDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'title': value['title'],
        'objectType': value['objectType'],
        'userIdList': value['userIdList'],
        'extraMailList': value['extraMailList'],
        'body': value['body'],
        'content': value['content'],
        'link': value['link'],
    };
}

