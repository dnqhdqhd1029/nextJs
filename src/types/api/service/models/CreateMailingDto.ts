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
 * @interface CreateMailingDto
 */
export interface CreateMailingDto {
    /**
     * 유형 - MAILING(이메일), PRESS_RELEASE(보도자료배포), NEWSWIRE_RELEASE(뉴스와이어배포) 
     * @type {string}
     * @memberof CreateMailingDto
     */
    category: string;
    /**
     * 즉시발송 여부
     * @type {boolean}
     * @memberof CreateMailingDto
     */
    sendNow: boolean;
    /**
     * 예약시간 연
     * @type {string}
     * @memberof CreateMailingDto
     */
    year?: string;
    /**
     * 월
     * @type {string}
     * @memberof CreateMailingDto
     */
    month?: string;
    /**
     * 일
     * @type {string}
     * @memberof CreateMailingDto
     */
    day?: string;
    /**
     * 시
     * @type {string}
     * @memberof CreateMailingDto
     */
    hour?: string;
    /**
     * 분
     * @type {string}
     * @memberof CreateMailingDto
     */
    min?: string;
    /**
     * 사용자 시간대, 공통코드 - TIMEZONE 
     * @type {string}
     * @memberof CreateMailingDto
     */
    timezone?: string;
    /**
     * 그룹ID
     * @type {number}
     * @memberof CreateMailingDto
     */
    groupId: number;
    /**
     * 공유설정
     * @type {string}
     * @memberof CreateMailingDto
     */
    shareCode: string;
    /**
     * 기본 템플릿 사용 여부
     * @type {boolean}
     * @memberof CreateMailingDto
     */
    isDefaultTemplate?: boolean;
    /**
     * 템플릿 ID
     * @type {number}
     * @memberof CreateMailingDto
     */
    mailTemplateId?: number;
    /**
     * 배포명, 유형이 PRESS_RELEASE(보도자료배포)에만 사용
     * @type {string}
     * @memberof CreateMailingDto
     */
    titleForManage?: string;
    /**
     * 제목
     * @type {string}
     * @memberof CreateMailingDto
     */
    title?: string;
    /**
     * 내용
     * @type {string}
     * @memberof CreateMailingDto
     */
    body?: string;
    /**
     * 나에게 보냄 여부, 유형이 PRESS_RELEASE(보도자료배포)에만 사용
     * @type {boolean}
     * @memberof CreateMailingDto
     */
    includeUser?: boolean;
    /**
     * 연락처 정보 표시
     * @type {boolean}
     * @memberof CreateMailingDto
     */
    flagAttachContactInfo?: boolean;
    /**
     * 관련 언론인ID 배열
     * @type {Array<number>}
     * @memberof CreateMailingDto
     */
    journalistIdList?: Array<number>;
    /**
     * 관련 미디어ID 배열
     * @type {Array<number>}
     * @memberof CreateMailingDto
     */
    mediaIdList?: Array<number>;
    /**
     * 관련 언론인목록ID 배열
     * @type {Array<number>}
     * @memberof CreateMailingDto
     */
    jrnstListIdList?: Array<number>;
    /**
     * 관련 미디어목록ID 배열
     * @type {Array<number>}
     * @memberof CreateMailingDto
     */
    mediaListIdList?: Array<number>;
    /**
     * 받는 메일 추가
     * @type {Array<string>}
     * @memberof CreateMailingDto
     */
    extraMailList?: Array<string>;
    /**
     * 관련 태그ID 배열
     * @type {Array<number>}
     * @memberof CreateMailingDto
     */
    tagIdList?: Array<number>;
    /**
     * 관련 미디어자료실 파일ID 배열
     * @type {Array<number>}
     * @memberof CreateMailingDto
     */
    mediaFileIdList?: Array<number>;
}

/**
 * Check if a given object implements the CreateMailingDto interface.
 */
export function instanceOfCreateMailingDto(value: object): value is CreateMailingDto {
    if (!('category' in value) || value['category'] === undefined) return false;
    if (!('sendNow' in value) || value['sendNow'] === undefined) return false;
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    if (!('shareCode' in value) || value['shareCode'] === undefined) return false;
    return true;
}

export function CreateMailingDtoFromJSON(json: any): CreateMailingDto {
    return CreateMailingDtoFromJSONTyped(json, false);
}

export function CreateMailingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateMailingDto {
    if (json == null) {
        return json;
    }
    return {
        
        'category': json['category'],
        'sendNow': json['sendNow'],
        'year': json['year'] == null ? undefined : json['year'],
        'month': json['month'] == null ? undefined : json['month'],
        'day': json['day'] == null ? undefined : json['day'],
        'hour': json['hour'] == null ? undefined : json['hour'],
        'min': json['min'] == null ? undefined : json['min'],
        'timezone': json['timezone'] == null ? undefined : json['timezone'],
        'groupId': json['groupId'],
        'shareCode': json['shareCode'],
        'isDefaultTemplate': json['isDefaultTemplate'] == null ? undefined : json['isDefaultTemplate'],
        'mailTemplateId': json['mailTemplateId'] == null ? undefined : json['mailTemplateId'],
        'titleForManage': json['titleForManage'] == null ? undefined : json['titleForManage'],
        'title': json['title'] == null ? undefined : json['title'],
        'body': json['body'] == null ? undefined : json['body'],
        'includeUser': json['includeUser'] == null ? undefined : json['includeUser'],
        'flagAttachContactInfo': json['flagAttachContactInfo'] == null ? undefined : json['flagAttachContactInfo'],
        'journalistIdList': json['journalistIdList'] == null ? undefined : json['journalistIdList'],
        'mediaIdList': json['mediaIdList'] == null ? undefined : json['mediaIdList'],
        'jrnstListIdList': json['jrnstListIdList'] == null ? undefined : json['jrnstListIdList'],
        'mediaListIdList': json['mediaListIdList'] == null ? undefined : json['mediaListIdList'],
        'extraMailList': json['extraMailList'] == null ? undefined : json['extraMailList'],
        'tagIdList': json['tagIdList'] == null ? undefined : json['tagIdList'],
        'mediaFileIdList': json['mediaFileIdList'] == null ? undefined : json['mediaFileIdList'],
    };
}

export function CreateMailingDtoToJSON(value?: CreateMailingDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'category': value['category'],
        'sendNow': value['sendNow'],
        'year': value['year'],
        'month': value['month'],
        'day': value['day'],
        'hour': value['hour'],
        'min': value['min'],
        'timezone': value['timezone'],
        'groupId': value['groupId'],
        'shareCode': value['shareCode'],
        'isDefaultTemplate': value['isDefaultTemplate'],
        'mailTemplateId': value['mailTemplateId'],
        'titleForManage': value['titleForManage'],
        'title': value['title'],
        'body': value['body'],
        'includeUser': value['includeUser'],
        'flagAttachContactInfo': value['flagAttachContactInfo'],
        'journalistIdList': value['journalistIdList'],
        'mediaIdList': value['mediaIdList'],
        'jrnstListIdList': value['jrnstListIdList'],
        'mediaListIdList': value['mediaListIdList'],
        'extraMailList': value['extraMailList'],
        'tagIdList': value['tagIdList'],
        'mediaFileIdList': value['mediaFileIdList'],
    };
}

