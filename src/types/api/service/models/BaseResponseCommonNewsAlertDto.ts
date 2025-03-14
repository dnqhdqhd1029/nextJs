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
import type { MessageDto } from './MessageDto';
import {
    MessageDtoFromJSON,
    MessageDtoFromJSONTyped,
    MessageDtoToJSON,
} from './MessageDto';
import type { NewsAlertDto } from './NewsAlertDto';
import {
    NewsAlertDtoFromJSON,
    NewsAlertDtoFromJSONTyped,
    NewsAlertDtoToJSON,
} from './NewsAlertDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonNewsAlertDto
 */
export interface BaseResponseCommonNewsAlertDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonNewsAlertDto
     */
    status?: string;
    /**
     * 
     * @type {NewsAlertDto}
     * @memberof BaseResponseCommonNewsAlertDto
     */
    data?: NewsAlertDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonNewsAlertDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonNewsAlertDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonNewsAlertDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonNewsAlertDto interface.
 */
export function instanceOfBaseResponseCommonNewsAlertDto(value: object): value is BaseResponseCommonNewsAlertDto {
    return true;
}

export function BaseResponseCommonNewsAlertDtoFromJSON(json: any): BaseResponseCommonNewsAlertDto {
    return BaseResponseCommonNewsAlertDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonNewsAlertDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonNewsAlertDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : NewsAlertDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonNewsAlertDtoToJSON(value?: BaseResponseCommonNewsAlertDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': NewsAlertDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

