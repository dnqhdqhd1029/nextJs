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
import type { MediaListDto } from './MediaListDto';
import {
    MediaListDtoFromJSON,
    MediaListDtoFromJSONTyped,
    MediaListDtoToJSON,
} from './MediaListDto';
import type { MailingCountDto } from './MailingCountDto';
import {
    MailingCountDtoFromJSON,
    MailingCountDtoFromJSONTyped,
    MailingCountDtoToJSON,
} from './MailingCountDto';
import type { MediaDto } from './MediaDto';
import {
    MediaDtoFromJSON,
    MediaDtoFromJSONTyped,
    MediaDtoToJSON,
} from './MediaDto';
import type { UserDtoForGroup } from './UserDtoForGroup';
import {
    UserDtoForGroupFromJSON,
    UserDtoForGroupFromJSONTyped,
    UserDtoForGroupToJSON,
} from './UserDtoForGroup';
import type { FileAttachDto } from './FileAttachDto';
import {
    FileAttachDtoFromJSON,
    FileAttachDtoFromJSONTyped,
    FileAttachDtoToJSON,
} from './FileAttachDto';
import type { MailingForActionDto } from './MailingForActionDto';
import {
    MailingForActionDtoFromJSON,
    MailingForActionDtoFromJSONTyped,
    MailingForActionDtoToJSON,
} from './MailingForActionDto';
import type { TagDto } from './TagDto';
import {
    TagDtoFromJSON,
    TagDtoFromJSONTyped,
    TagDtoToJSON,
} from './TagDto';
import type { JrnlstListDto } from './JrnlstListDto';
import {
    JrnlstListDtoFromJSON,
    JrnlstListDtoFromJSONTyped,
    JrnlstListDtoToJSON,
} from './JrnlstListDto';
import type { UserDtoForSimple } from './UserDtoForSimple';
import {
    UserDtoForSimpleFromJSON,
    UserDtoForSimpleFromJSONTyped,
    UserDtoForSimpleToJSON,
} from './UserDtoForSimple';
import type { JournalistDto } from './JournalistDto';
import {
    JournalistDtoFromJSON,
    JournalistDtoFromJSONTyped,
    JournalistDtoToJSON,
} from './JournalistDto';

/**
 * 
 * @export
 * @interface ActionDto
 */
export interface ActionDto {
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    actionId?: number;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    category?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    stateFilter?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    state?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    categoryDisplay?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    stateFilterDisplay?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    stateDisplay?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    dueAt?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ActionDto
     */
    flagSendNow?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    nwReservedAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    nwSendAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    nwPublishAt?: string;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    mailingId?: number;
    /**
     * 
     * @type {MailingForActionDto}
     * @memberof ActionDto
     */
    mailingForAction?: MailingForActionDto;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    nwReleaseId?: number;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    groupId?: number;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    content?: string;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    commentCount?: number;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    shareCode?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ActionDto
     */
    isDeleted?: boolean;
    /**
     * 
     * @type {MailingCountDto}
     * @memberof ActionDto
     */
    mailingCount?: MailingCountDto;
    /**
     * 
     * @type {Array<JournalistDto>}
     * @memberof ActionDto
     */
    journalistList?: Array<JournalistDto>;
    /**
     * 
     * @type {Array<JrnlstListDto>}
     * @memberof ActionDto
     */
    jrnlstListList?: Array<JrnlstListDto>;
    /**
     * 
     * @type {Array<MediaDto>}
     * @memberof ActionDto
     */
    mediaList?: Array<MediaDto>;
    /**
     * 
     * @type {Array<MediaListDto>}
     * @memberof ActionDto
     */
    mediaListList?: Array<MediaListDto>;
    /**
     * 
     * @type {Array<TagDto>}
     * @memberof ActionDto
     */
    tagList?: Array<TagDto>;
    /**
     * 
     * @type {Array<FileAttachDto>}
     * @memberof ActionDto
     */
    fileAttachList?: Array<FileAttachDto>;
    /**
     * 
     * @type {Array<string>}
     * @memberof ActionDto
     */
    extraMailList?: Array<string>;
    /**
     * 
     * @type {UserDtoForSimple}
     * @memberof ActionDto
     */
    owner?: UserDtoForSimple;
    /**
     * 
     * @type {UserDtoForGroup}
     * @memberof ActionDto
     */
    updater?: UserDtoForGroup;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    regisAt?: string;
    /**
     * 
     * @type {string}
     * @memberof ActionDto
     */
    updateAt?: string;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    countTotal?: number;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    countDup?: number;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    countReceiveBlock?: number;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    countSendBlock?: number;
    /**
     * 
     * @type {number}
     * @memberof ActionDto
     */
    countSendError?: number;
}

/**
 * Check if a given object implements the ActionDto interface.
 */
export function instanceOfActionDto(value: object): value is ActionDto {
    return true;
}

export function ActionDtoFromJSON(json: any): ActionDto {
    return ActionDtoFromJSONTyped(json, false);
}

export function ActionDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActionDto {
    if (json == null) {
        return json;
    }
    return {
        
        'actionId': json['actionId'] == null ? undefined : json['actionId'],
        'category': json['category'] == null ? undefined : json['category'],
        'stateFilter': json['stateFilter'] == null ? undefined : json['stateFilter'],
        'state': json['state'] == null ? undefined : json['state'],
        'categoryDisplay': json['categoryDisplay'] == null ? undefined : json['categoryDisplay'],
        'stateFilterDisplay': json['stateFilterDisplay'] == null ? undefined : json['stateFilterDisplay'],
        'stateDisplay': json['stateDisplay'] == null ? undefined : json['stateDisplay'],
        'dueAt': json['dueAt'] == null ? undefined : json['dueAt'],
        'flagSendNow': json['flagSendNow'] == null ? undefined : json['flagSendNow'],
        'nwReservedAt': json['nwReservedAt'] == null ? undefined : json['nwReservedAt'],
        'nwSendAt': json['nwSendAt'] == null ? undefined : json['nwSendAt'],
        'nwPublishAt': json['nwPublishAt'] == null ? undefined : json['nwPublishAt'],
        'mailingId': json['mailingId'] == null ? undefined : json['mailingId'],
        'mailingForAction': json['mailingForAction'] == null ? undefined : MailingForActionDtoFromJSON(json['mailingForAction']),
        'nwReleaseId': json['nwReleaseId'] == null ? undefined : json['nwReleaseId'],
        'groupId': json['groupId'] == null ? undefined : json['groupId'],
        'title': json['title'] == null ? undefined : json['title'],
        'content': json['content'] == null ? undefined : json['content'],
        'commentCount': json['commentCount'] == null ? undefined : json['commentCount'],
        'shareCode': json['shareCode'] == null ? undefined : json['shareCode'],
        'isDeleted': json['isDeleted'] == null ? undefined : json['isDeleted'],
        'mailingCount': json['mailingCount'] == null ? undefined : MailingCountDtoFromJSON(json['mailingCount']),
        'journalistList': json['journalistList'] == null ? undefined : ((json['journalistList'] as Array<any>).map(JournalistDtoFromJSON)),
        'jrnlstListList': json['jrnlstListList'] == null ? undefined : ((json['jrnlstListList'] as Array<any>).map(JrnlstListDtoFromJSON)),
        'mediaList': json['mediaList'] == null ? undefined : ((json['mediaList'] as Array<any>).map(MediaDtoFromJSON)),
        'mediaListList': json['mediaListList'] == null ? undefined : ((json['mediaListList'] as Array<any>).map(MediaListDtoFromJSON)),
        'tagList': json['tagList'] == null ? undefined : ((json['tagList'] as Array<any>).map(TagDtoFromJSON)),
        'fileAttachList': json['fileAttachList'] == null ? undefined : ((json['fileAttachList'] as Array<any>).map(FileAttachDtoFromJSON)),
        'extraMailList': json['extraMailList'] == null ? undefined : json['extraMailList'],
        'owner': json['owner'] == null ? undefined : UserDtoForSimpleFromJSON(json['owner']),
        'updater': json['updater'] == null ? undefined : UserDtoForGroupFromJSON(json['updater']),
        'regisAt': json['regisAt'] == null ? undefined : json['regisAt'],
        'updateAt': json['updateAt'] == null ? undefined : json['updateAt'],
        'countTotal': json['countTotal'] == null ? undefined : json['countTotal'],
        'countDup': json['countDup'] == null ? undefined : json['countDup'],
        'countReceiveBlock': json['countReceiveBlock'] == null ? undefined : json['countReceiveBlock'],
        'countSendBlock': json['countSendBlock'] == null ? undefined : json['countSendBlock'],
        'countSendError': json['countSendError'] == null ? undefined : json['countSendError'],
    };
}

export function ActionDtoToJSON(value?: ActionDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'actionId': value['actionId'],
        'category': value['category'],
        'stateFilter': value['stateFilter'],
        'state': value['state'],
        'categoryDisplay': value['categoryDisplay'],
        'stateFilterDisplay': value['stateFilterDisplay'],
        'stateDisplay': value['stateDisplay'],
        'dueAt': value['dueAt'],
        'flagSendNow': value['flagSendNow'],
        'nwReservedAt': value['nwReservedAt'],
        'nwSendAt': value['nwSendAt'],
        'nwPublishAt': value['nwPublishAt'],
        'mailingId': value['mailingId'],
        'mailingForAction': MailingForActionDtoToJSON(value['mailingForAction']),
        'nwReleaseId': value['nwReleaseId'],
        'groupId': value['groupId'],
        'title': value['title'],
        'content': value['content'],
        'commentCount': value['commentCount'],
        'shareCode': value['shareCode'],
        'isDeleted': value['isDeleted'],
        'mailingCount': MailingCountDtoToJSON(value['mailingCount']),
        'journalistList': value['journalistList'] == null ? undefined : ((value['journalistList'] as Array<any>).map(JournalistDtoToJSON)),
        'jrnlstListList': value['jrnlstListList'] == null ? undefined : ((value['jrnlstListList'] as Array<any>).map(JrnlstListDtoToJSON)),
        'mediaList': value['mediaList'] == null ? undefined : ((value['mediaList'] as Array<any>).map(MediaDtoToJSON)),
        'mediaListList': value['mediaListList'] == null ? undefined : ((value['mediaListList'] as Array<any>).map(MediaListDtoToJSON)),
        'tagList': value['tagList'] == null ? undefined : ((value['tagList'] as Array<any>).map(TagDtoToJSON)),
        'fileAttachList': value['fileAttachList'] == null ? undefined : ((value['fileAttachList'] as Array<any>).map(FileAttachDtoToJSON)),
        'extraMailList': value['extraMailList'],
        'owner': UserDtoForSimpleToJSON(value['owner']),
        'updater': UserDtoForGroupToJSON(value['updater']),
        'regisAt': value['regisAt'],
        'updateAt': value['updateAt'],
        'countTotal': value['countTotal'],
        'countDup': value['countDup'],
        'countReceiveBlock': value['countReceiveBlock'],
        'countSendBlock': value['countSendBlock'],
        'countSendError': value['countSendError'],
    };
}

