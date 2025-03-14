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
import type { PageJournalistDto } from './PageJournalistDto';
import {
    PageJournalistDtoFromJSON,
    PageJournalistDtoFromJSONTyped,
    PageJournalistDtoToJSON,
} from './PageJournalistDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonPageJournalistDto
 */
export interface BaseResponseCommonPageJournalistDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageJournalistDto
     */
    status?: string;
    /**
     * 
     * @type {PageJournalistDto}
     * @memberof BaseResponseCommonPageJournalistDto
     */
    data?: PageJournalistDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageJournalistDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonPageJournalistDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonPageJournalistDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonPageJournalistDto interface.
 */
export function instanceOfBaseResponseCommonPageJournalistDto(value: object): value is BaseResponseCommonPageJournalistDto {
    return true;
}

export function BaseResponseCommonPageJournalistDtoFromJSON(json: any): BaseResponseCommonPageJournalistDto {
    return BaseResponseCommonPageJournalistDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonPageJournalistDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonPageJournalistDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : PageJournalistDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonPageJournalistDtoToJSON(value?: BaseResponseCommonPageJournalistDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': PageJournalistDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

