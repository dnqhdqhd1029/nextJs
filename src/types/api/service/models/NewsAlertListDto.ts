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
import type { ScheduleDisplayDto } from './ScheduleDisplayDto';
import {
    ScheduleDisplayDtoFromJSON,
    ScheduleDisplayDtoFromJSONTyped,
    ScheduleDisplayDtoToJSON,
} from './ScheduleDisplayDto';

/**
 * 
 * @export
 * @interface NewsAlertListDto
 */
export interface NewsAlertListDto {
    /**
     * 알리미 ID
     * @type {number}
     * @memberof NewsAlertListDto
     */
    alertId?: number;
    /**
     * 모니터링 ID
     * @type {number}
     * @memberof NewsAlertListDto
     */
    newsSrchId?: number;
    /**
     * 모니터링 이름
     * @type {string}
     * @memberof NewsAlertListDto
     */
    newsSrchName?: string;
    /**
     * 종료일
     * @type {Date}
     * @memberof NewsAlertListDto
     */
    expireAt?: Date;
    /**
     * 설정일
     * @type {Date}
     * @memberof NewsAlertListDto
     */
    regisAt?: Date;
    /**
     * 소유자 아이디
     * @type {number}
     * @memberof NewsAlertListDto
     */
    ownerId?: number;
    /**
     * 소유자 이름
     * @type {string}
     * @memberof NewsAlertListDto
     */
    ownerName?: string;
    /**
     * 모니터링별 뉴스 알리미 생성 건수
     * @type {number}
     * @memberof NewsAlertListDto
     */
    newsAlertCount?: number;
    /**
     * 
     * @type {ScheduleDisplayDto}
     * @memberof NewsAlertListDto
     */
    schedule?: ScheduleDisplayDto;
}

/**
 * Check if a given object implements the NewsAlertListDto interface.
 */
export function instanceOfNewsAlertListDto(value: object): value is NewsAlertListDto {
    return true;
}

export function NewsAlertListDtoFromJSON(json: any): NewsAlertListDto {
    return NewsAlertListDtoFromJSONTyped(json, false);
}

export function NewsAlertListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewsAlertListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'alertId': json['alertId'] == null ? undefined : json['alertId'],
        'newsSrchId': json['newsSrchId'] == null ? undefined : json['newsSrchId'],
        'newsSrchName': json['newsSrchName'] == null ? undefined : json['newsSrchName'],
        'expireAt': json['expireAt'] == null ? undefined : (new Date(json['expireAt'])),
        'regisAt': json['regisAt'] == null ? undefined : (new Date(json['regisAt'])),
        'ownerId': json['ownerId'] == null ? undefined : json['ownerId'],
        'ownerName': json['ownerName'] == null ? undefined : json['ownerName'],
        'newsAlertCount': json['newsAlertCount'] == null ? undefined : json['newsAlertCount'],
        'schedule': json['schedule'] == null ? undefined : ScheduleDisplayDtoFromJSON(json['schedule']),
    };
}

export function NewsAlertListDtoToJSON(value?: NewsAlertListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'alertId': value['alertId'],
        'newsSrchId': value['newsSrchId'],
        'newsSrchName': value['newsSrchName'],
        'expireAt': value['expireAt'] == null ? undefined : ((value['expireAt']).toISOString()),
        'regisAt': value['regisAt'] == null ? undefined : ((value['regisAt']).toISOString()),
        'ownerId': value['ownerId'],
        'ownerName': value['ownerName'],
        'newsAlertCount': value['newsAlertCount'],
        'schedule': ScheduleDisplayDtoToJSON(value['schedule']),
    };
}

