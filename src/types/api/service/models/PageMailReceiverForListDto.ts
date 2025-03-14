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
import type { PageableObject } from './PageableObject';
import {
    PageableObjectFromJSON,
    PageableObjectFromJSONTyped,
    PageableObjectToJSON,
} from './PageableObject';
import type { MailReceiverForListDto } from './MailReceiverForListDto';
import {
    MailReceiverForListDtoFromJSON,
    MailReceiverForListDtoFromJSONTyped,
    MailReceiverForListDtoToJSON,
} from './MailReceiverForListDto';
import type { SortObject } from './SortObject';
import {
    SortObjectFromJSON,
    SortObjectFromJSONTyped,
    SortObjectToJSON,
} from './SortObject';

/**
 * 
 * @export
 * @interface PageMailReceiverForListDto
 */
export interface PageMailReceiverForListDto {
    /**
     * 
     * @type {number}
     * @memberof PageMailReceiverForListDto
     */
    totalElements?: number;
    /**
     * 
     * @type {number}
     * @memberof PageMailReceiverForListDto
     */
    totalPages?: number;
    /**
     * 
     * @type {boolean}
     * @memberof PageMailReceiverForListDto
     */
    first?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof PageMailReceiverForListDto
     */
    last?: boolean;
    /**
     * 
     * @type {number}
     * @memberof PageMailReceiverForListDto
     */
    size?: number;
    /**
     * 
     * @type {Array<MailReceiverForListDto>}
     * @memberof PageMailReceiverForListDto
     */
    content?: Array<MailReceiverForListDto>;
    /**
     * 
     * @type {number}
     * @memberof PageMailReceiverForListDto
     */
    number?: number;
    /**
     * 
     * @type {SortObject}
     * @memberof PageMailReceiverForListDto
     */
    sort?: SortObject;
    /**
     * 
     * @type {number}
     * @memberof PageMailReceiverForListDto
     */
    numberOfElements?: number;
    /**
     * 
     * @type {PageableObject}
     * @memberof PageMailReceiverForListDto
     */
    pageable?: PageableObject;
    /**
     * 
     * @type {boolean}
     * @memberof PageMailReceiverForListDto
     */
    empty?: boolean;
}

/**
 * Check if a given object implements the PageMailReceiverForListDto interface.
 */
export function instanceOfPageMailReceiverForListDto(value: object): value is PageMailReceiverForListDto {
    return true;
}

export function PageMailReceiverForListDtoFromJSON(json: any): PageMailReceiverForListDto {
    return PageMailReceiverForListDtoFromJSONTyped(json, false);
}

export function PageMailReceiverForListDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageMailReceiverForListDto {
    if (json == null) {
        return json;
    }
    return {
        
        'totalElements': json['totalElements'] == null ? undefined : json['totalElements'],
        'totalPages': json['totalPages'] == null ? undefined : json['totalPages'],
        'first': json['first'] == null ? undefined : json['first'],
        'last': json['last'] == null ? undefined : json['last'],
        'size': json['size'] == null ? undefined : json['size'],
        'content': json['content'] == null ? undefined : ((json['content'] as Array<any>).map(MailReceiverForListDtoFromJSON)),
        'number': json['number'] == null ? undefined : json['number'],
        'sort': json['sort'] == null ? undefined : SortObjectFromJSON(json['sort']),
        'numberOfElements': json['numberOfElements'] == null ? undefined : json['numberOfElements'],
        'pageable': json['pageable'] == null ? undefined : PageableObjectFromJSON(json['pageable']),
        'empty': json['empty'] == null ? undefined : json['empty'],
    };
}

export function PageMailReceiverForListDtoToJSON(value?: PageMailReceiverForListDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'totalElements': value['totalElements'],
        'totalPages': value['totalPages'],
        'first': value['first'],
        'last': value['last'],
        'size': value['size'],
        'content': value['content'] == null ? undefined : ((value['content'] as Array<any>).map(MailReceiverForListDtoToJSON)),
        'number': value['number'],
        'sort': SortObjectToJSON(value['sort']),
        'numberOfElements': value['numberOfElements'],
        'pageable': PageableObjectToJSON(value['pageable']),
        'empty': value['empty'],
    };
}

