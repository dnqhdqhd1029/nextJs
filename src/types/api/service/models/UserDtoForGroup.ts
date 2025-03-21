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
/**
 * 
 * @export
 * @interface UserDtoForGroup
 */
export interface UserDtoForGroup {
    /**
     * 
     * @type {number}
     * @memberof UserDtoForGroup
     */
    userId?: number;
    /**
     * 
     * @type {string}
     * @memberof UserDtoForGroup
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDtoForGroup
     */
    email?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDtoForGroup
     */
    role?: UserDtoForGroupRoleEnum;
    /**
     * 
     * @type {string}
     * @memberof UserDtoForGroup
     */
    nickname?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDtoForGroup
     */
    displayName?: string;
    /**
     * 
     * @type {string}
     * @memberof UserDtoForGroup
     */
    stateCode?: string;
}


/**
 * @export
 */
export const UserDtoForGroupRoleEnum = {
    Admin: 'ADMIN',
    User: 'USER'
} as const;
export type UserDtoForGroupRoleEnum = typeof UserDtoForGroupRoleEnum[keyof typeof UserDtoForGroupRoleEnum];


/**
 * Check if a given object implements the UserDtoForGroup interface.
 */
export function instanceOfUserDtoForGroup(value: object): value is UserDtoForGroup {
    return true;
}

export function UserDtoForGroupFromJSON(json: any): UserDtoForGroup {
    return UserDtoForGroupFromJSONTyped(json, false);
}

export function UserDtoForGroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserDtoForGroup {
    if (json == null) {
        return json;
    }
    return {
        
        'userId': json['userId'] == null ? undefined : json['userId'],
        'name': json['name'] == null ? undefined : json['name'],
        'email': json['email'] == null ? undefined : json['email'],
        'role': json['role'] == null ? undefined : json['role'],
        'nickname': json['nickname'] == null ? undefined : json['nickname'],
        'displayName': json['displayName'] == null ? undefined : json['displayName'],
        'stateCode': json['stateCode'] == null ? undefined : json['stateCode'],
    };
}

export function UserDtoForGroupToJSON(value?: UserDtoForGroup | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'userId': value['userId'],
        'name': value['name'],
        'email': value['email'],
        'role': value['role'],
        'nickname': value['nickname'],
        'displayName': value['displayName'],
        'stateCode': value['stateCode'],
    };
}

