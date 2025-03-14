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
import type { MailTemplateDto } from './MailTemplateDto';
import {
    MailTemplateDtoFromJSON,
    MailTemplateDtoFromJSONTyped,
    MailTemplateDtoToJSON,
} from './MailTemplateDto';

/**
 * 
 * @export
 * @interface BaseResponseCommonMailTemplateDto
 */
export interface BaseResponseCommonMailTemplateDto {
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonMailTemplateDto
     */
    status?: string;
    /**
     * 
     * @type {MailTemplateDto}
     * @memberof BaseResponseCommonMailTemplateDto
     */
    data?: MailTemplateDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonMailTemplateDto
     */
    code?: string;
    /**
     * 
     * @type {MessageDto}
     * @memberof BaseResponseCommonMailTemplateDto
     */
    message?: MessageDto;
    /**
     * 
     * @type {string}
     * @memberof BaseResponseCommonMailTemplateDto
     */
    timestamp?: string;
}

/**
 * Check if a given object implements the BaseResponseCommonMailTemplateDto interface.
 */
export function instanceOfBaseResponseCommonMailTemplateDto(value: object): value is BaseResponseCommonMailTemplateDto {
    return true;
}

export function BaseResponseCommonMailTemplateDtoFromJSON(json: any): BaseResponseCommonMailTemplateDto {
    return BaseResponseCommonMailTemplateDtoFromJSONTyped(json, false);
}

export function BaseResponseCommonMailTemplateDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseResponseCommonMailTemplateDto {
    if (json == null) {
        return json;
    }
    return {
        
        'status': json['status'] == null ? undefined : json['status'],
        'data': json['data'] == null ? undefined : MailTemplateDtoFromJSON(json['data']),
        'code': json['code'] == null ? undefined : json['code'],
        'message': json['message'] == null ? undefined : MessageDtoFromJSON(json['message']),
        'timestamp': json['timestamp'] == null ? undefined : json['timestamp'],
    };
}

export function BaseResponseCommonMailTemplateDtoToJSON(value?: BaseResponseCommonMailTemplateDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'status': value['status'],
        'data': MailTemplateDtoToJSON(value['data']),
        'code': value['code'],
        'message': MessageDtoToJSON(value['message']),
        'timestamp': value['timestamp'],
    };
}

