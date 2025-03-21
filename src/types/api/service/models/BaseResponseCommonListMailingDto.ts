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
import type { MailingDto } from './MailingDto';
import {
    MailingDtoFromJSON,
    MailingDtoFromJSONTyped,
    MailingDtoToJSON,
} from './MailingDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonListMailingDto
 */
export interface BaseResponseCommonListMailingDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListMailingDto
     */
    status?: string;
    /**
     * 
     * @type {Array<MailingDto>}
     * @memberof BaseResponseCommonListMailingDto
     */
    data?: Array<MailingDto>;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListMailingDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonListMailingDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonListMailingDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonListMailingDto interface.
 */
export function instanceOfBaseResponseCommonListMailingDto(value: object): value is BaseResponseCommonListMailingDto {
    return true;
}

export function BaseResponseCommonListMailingDtoFromJSON(json: any): BaseResponseCommonListMailingDto {
    return BaseResponseCommonListMailingDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonListMailingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonListMailingDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : ((json['data'] as Array<any>).map(MailingDtoFromJSON)),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonListMailingDtoToJSON(value?: BaseResponseCommonListMailingDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': value['data'] == null ? undefined : ((value['data'] as Array<any>).map(MailingDtoToJSON)),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

