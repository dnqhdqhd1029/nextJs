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
import type { UserDtoForGroup } from './UserDtoForGroup';
import {
    UserDtoForGroupFromJSON,
    UserDtoForGroupFromJSONTyped,
    UserDtoForGroupToJSON,
} from './UserDtoForGroup';
import type { ActionDto } from './ActionDto';
import {
    ActionDtoFromJSON,
    ActionDtoFromJSONTyped,
    ActionDtoToJSON,
} from './ActionDto';

/**
 * 
 * @export
 * @interface MailingDto
 */
export interface MailingDto {
    /**
     * 
     * @type {number}
     * @memberof MailingDto
     */
    mailingId?: number;
    /**
     * 
     * @type {number}
     * @memberof MailingDto
     */
    companyId?: number;
    /**
     * 
     * @type {number}
     * @memberof MailingDto
     */
    groupId?: number;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    shareCode?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    category?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    titleForManage?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    body?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    state?: string;
    /**
     * 
     * @type {number}
     * @memberof MailingDto
     */
    total_receivers?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MailingDto
     */
    isDefaultTemplate?: boolean;
    /**
     * 
     * @type {number}
     * @memberof MailingDto
     */
    mailTemplateId?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MailingDto
     */
    sendNow?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MailingDto
     */
    includeUser?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MailingDto
     */
    flagAttachContactInfo?: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof MailingDto
     */
    extraMails?: Array<string>;
    /**
     * 
     * @type {ActionDto}
     * @memberof MailingDto
     */
    action?: ActionDto;
    /**
     * 
     * @type {UserDtoForGroup}
     * @memberof MailingDto
     */
    register?: UserDtoForGroup;
    /**
     * 
     * @type {UserDtoForGroup}
     * @memberof MailingDto
     */
    updater?: UserDtoForGroup;
    /**
     * 
     * @type {UserDtoForGroup}
     * @memberof MailingDto
     */
    owner?: UserDtoForGroup;
    /**
     * 
     * @type {UserDtoForGroup}
     * @memberof MailingDto
     */
    sender?: UserDtoForGroup;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    dueAt?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    startAt?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    endAt?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    regisAt?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    updateAt?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    sendRequestAt?: string;
    /**
     * 
     * @type {string}
     * @memberof MailingDto
     */
    cuType?: string;
}

/**
 * Check if a given object implements the MailingDto interface.
 */
export function instanceOfMailingDto(value: object): value is MailingDto {
    return true;
}

export function MailingDtoFromJSON(json: any): MailingDto {
    return MailingDtoFromJSONTyped(json, false);
}

export function MailingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): MailingDto {
    if (json == null) {
        return json;
    }
    return {
        
        'mailingId': json['mailingId'] == null ? undefined : json['mailingId'],
        'companyId': json['companyId'] == null ? undefined : json['companyId'],
        'groupId': json['groupId'] == null ? undefined : json['groupId'],
        'shareCode': json['shareCode'] == null ? undefined : json['shareCode'],
        'category': json['category'] == null ? undefined : json['category'],
        'title': json['title'] == null ? undefined : json['title'],
        'titleForManage': json['titleForManage'] == null ? undefined : json['titleForManage'],
        'body': json['body'] == null ? undefined : json['body'],
        'state': json['state'] == null ? undefined : json['state'],
        'total_receivers': json['total_receivers'] == null ? undefined : json['total_receivers'],
        'isDefaultTemplate': json['isDefaultTemplate'] == null ? undefined : json['isDefaultTemplate'],
        'mailTemplateId': json['mailTemplateId'] == null ? undefined : json['mailTemplateId'],
        'sendNow': json['sendNow'] == null ? undefined : json['sendNow'],
        'includeUser': json['includeUser'] == null ? undefined : json['includeUser'],
        'flagAttachContactInfo': json['flagAttachContactInfo'] == null ? undefined : json['flagAttachContactInfo'],
        'extraMails': json['extraMails'] == null ? undefined : json['extraMails'],
        'action': json['action'] == null ? undefined : ActionDtoFromJSON(json['action']),
        'register': json['register'] == null ? undefined : UserDtoForGroupFromJSON(json['register']),
        'updater': json['updater'] == null ? undefined : UserDtoForGroupFromJSON(json['updater']),
        'owner': json['owner'] == null ? undefined : UserDtoForGroupFromJSON(json['owner']),
        'sender': json['sender'] == null ? undefined : UserDtoForGroupFromJSON(json['sender']),
        'dueAt': json['dueAt'] == null ? undefined : json['dueAt'],
        'startAt': json['startAt'] == null ? undefined : json['startAt'],
        'endAt': json['endAt'] == null ? undefined : json['endAt'],
        'regisAt': json['regisAt'] == null ? undefined : json['regisAt'],
        'updateAt': json['updateAt'] == null ? undefined : json['updateAt'],
        'sendRequestAt': json['sendRequestAt'] == null ? undefined : json['sendRequestAt'],
        'cuType': json['cuType'] == null ? undefined : json['cuType'],
    };
}

export function MailingDtoToJSON(value?: MailingDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'mailingId': value['mailingId'],
        'companyId': value['companyId'],
        'groupId': value['groupId'],
        'shareCode': value['shareCode'],
        'category': value['category'],
        'title': value['title'],
        'titleForManage': value['titleForManage'],
        'body': value['body'],
        'state': value['state'],
        'total_receivers': value['total_receivers'],
        'isDefaultTemplate': value['isDefaultTemplate'],
        'mailTemplateId': value['mailTemplateId'],
        'sendNow': value['sendNow'],
        'includeUser': value['includeUser'],
        'flagAttachContactInfo': value['flagAttachContactInfo'],
        'extraMails': value['extraMails'],
        'action': ActionDtoToJSON(value['action']),
        'register': UserDtoForGroupToJSON(value['register']),
        'updater': UserDtoForGroupToJSON(value['updater']),
        'owner': UserDtoForGroupToJSON(value['owner']),
        'sender': UserDtoForGroupToJSON(value['sender']),
        'dueAt': value['dueAt'],
        'startAt': value['startAt'],
        'endAt': value['endAt'],
        'regisAt': value['regisAt'],
        'updateAt': value['updateAt'],
        'sendRequestAt': value['sendRequestAt'],
        'cuType': value['cuType'],
    };
}

