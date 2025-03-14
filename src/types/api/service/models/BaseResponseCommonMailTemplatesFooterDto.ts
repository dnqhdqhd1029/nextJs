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
import type { MailTemplatesFooterDto } from './MailTemplatesFooterDto';
import {
    MailTemplatesFooterDtoFromJSON,
    MailTemplatesFooterDtoFromJSONTyped,
    MailTemplatesFooterDtoToJSON,
} from './MailTemplatesFooterDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonMailTemplatesFooterDto
 */
export interface BaseResponseCommonMailTemplatesFooterDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonMailTemplatesFooterDto
     */
    status?: string;
    /**
     * 
     * @type {MailTemplatesFooterDto}
     * @memberof BaseResponseCommonMailTemplatesFooterDto
     */
    data?: MailTemplatesFooterDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonMailTemplatesFooterDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonMailTemplatesFooterDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonMailTemplatesFooterDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonMailTemplatesFooterDto interface.
 */
export function instanceOfBaseResponseCommonMailTemplatesFooterDto(value: object): value is BaseResponseCommonMailTemplatesFooterDto {
    return true;
}

export function BaseResponseCommonMailTemplatesFooterDtoFromJSON(json: any): BaseResponseCommonMailTemplatesFooterDto {
    return BaseResponseCommonMailTemplatesFooterDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonMailTemplatesFooterDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonMailTemplatesFooterDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : MailTemplatesFooterDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonMailTemplatesFooterDtoToJSON(value?: BaseResponseCommonMailTemplatesFooterDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': MailTemplatesFooterDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

