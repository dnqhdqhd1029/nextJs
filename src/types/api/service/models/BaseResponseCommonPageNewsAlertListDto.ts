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
import type { PageNewsAlertListDto } from './PageNewsAlertListDto';
import {
    PageNewsAlertListDtoFromJSON,
    PageNewsAlertListDtoFromJSONTyped,
    PageNewsAlertListDtoToJSON,
} from './PageNewsAlertListDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPageNewsAlertListDto
 */
export interface BaseResponseCommonPageNewsAlertListDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageNewsAlertListDto
     */
    status?: string;
    /**
     * 
     * @type {PageNewsAlertListDto}
     * @memberof BaseResponseCommonPageNewsAlertListDto
     */
    data?: PageNewsAlertListDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageNewsAlertListDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPageNewsAlertListDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageNewsAlertListDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPageNewsAlertListDto interface.
 */
export function instanceOfBaseResponseCommonPageNewsAlertListDto(value: object): value is BaseResponseCommonPageNewsAlertListDto {
    return true;
}

export function BaseResponseCommonPageNewsAlertListDtoFromJSON(json: any): BaseResponseCommonPageNewsAlertListDto {
    return BaseResponseCommonPageNewsAlertListDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPageNewsAlertListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPageNewsAlertListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PageNewsAlertListDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPageNewsAlertListDtoToJSON(value?: BaseResponseCommonPageNewsAlertListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PageNewsAlertListDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

