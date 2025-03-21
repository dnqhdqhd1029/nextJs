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
import type { BlockedUserSimpleDto } from './BlockedUserSimpleDto';
import {
    BlockedUserSimpleDtoFromJSON,
    BlockedUserSimpleDtoFromJSONTyped,
    BlockedUserSimpleDtoToJSON,
} from './BlockedUserSimpleDto';
import type { MessageDto } from './MessageDto';
import {
    MessageDtoFromJSON,
    MessageDtoFromJSONTyped,
    MessageDtoToJSON,
} from './MessageDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonBlockedUserSimpleDto
 */
export interface BaseResponseCommonBlockedUserSimpleDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonBlockedUserSimpleDto
     */
    status?: string;
    /**
     * 
     * @type {BlockedUserSimpleDto}
     * @memberof BaseResponseCommonBlockedUserSimpleDto
     */
    data?: BlockedUserSimpleDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonBlockedUserSimpleDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonBlockedUserSimpleDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonBlockedUserSimpleDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonBlockedUserSimpleDto interface.
 */
export function instanceOfBaseResponseCommonBlockedUserSimpleDto(value: object): value is BaseResponseCommonBlockedUserSimpleDto {
    return true;
}

export function BaseResponseCommonBlockedUserSimpleDtoFromJSON(json: any): BaseResponseCommonBlockedUserSimpleDto {
    return BaseResponseCommonBlockedUserSimpleDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonBlockedUserSimpleDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonBlockedUserSimpleDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : BlockedUserSimpleDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonBlockedUserSimpleDtoToJSON(value?: BaseResponseCommonBlockedUserSimpleDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': BlockedUserSimpleDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

