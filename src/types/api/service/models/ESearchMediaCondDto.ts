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
 * Elasticsearch를 이용하여 미디어를 검색할 때 조건을 입력받는 DTO
 * @export
 * @interface ESearchMediaCondDto
 */
export interface ESearchMediaCondDto {
    /**
     * 그룹ID, 미디어 검색 정보에 미디어목록을 추가로 가져오기 위해 입력 받음
     * @type {number}
     * @memberof ESearchMediaCondDto
     */
    groupId: number;
    /**
     * 미디어ID 배열
     * @type {Array<number>}
     * @memberof ESearchMediaCondDto
     */
    mediaIdList?: Array<number>;
    /**
     * 미디어 상위유형 배열 common_code : MEDIA_TYPE 
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    mainCategoryList?: Array<string>;
    /**
     * 미디어유형 배열 common_code : MEDIA_TYPE / MEDIA_SUB_TYPE 
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    categoryList?: Array<string>;
    /**
     * 미디어분야 배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    fieldList?: Array<string>;
    /**
     * 미디어지역 배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    locationList?: Array<string>;
    /**
     * 키워드 배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    keywords?: Array<string>;
    /**
     * 미디어그룹 배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    groupList?: Array<string>;
    /**
     * 미디어 가치
     * @type {string}
     * @memberof ESearchMediaCondDto
     */
    value?: string;
    /**
     * 발행 주기 배열, 공통코드 PUB_CYCLE
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    pubCycleList?: Array<string>;
    /**
     * 결과내 검색
     * @type {string}
     * @memberof ESearchMediaCondDto
     */
    filter?: string;
    /**
     * 결과내 검색 : 미디어유형 배열 common_code : MEDIA_TYPE / MEDIA_SUB_TYPE 
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    filterCategoryList?: Array<string>;
    /**
     * 결과내 검색 : 미디어분야 배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    filterFieldList?: Array<string>;
    /**
     * 결과내 검색 : 미디어지역 배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    filterLocationList?: Array<string>;
    /**
     * 결과내 검색 : 발행 주기 배열, 공통코드 PUB_CYCLE
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    filterPubCycleList?: Array<string>;
    /**
     * 결과내 검색 : 포털 제휴배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    filterPortalList?: Array<string>;
    /**
     * 결과내 검색 : 미디어 가치
     * @type {string}
     * @memberof ESearchMediaCondDto
     */
    filterValue?: string;
    /**
     * 결과내 검색 : 정보 유형(시스템 제공, 개인 추가) common_code : MEDIA_INFO_TYPE,   SYSTEM/USERADD 
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    filterSourceType?: Array<string>;
    /**
     * 언론인목록ID 배열
     * @type {Array<number>}
     * @memberof ESearchMediaCondDto
     */
    jrnlstListId?: Array<number>;
    /**
     * 포털 제휴배열
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    portalList?: Array<string>;
    /**
     * 언어 배열   common_code : LANGUAGE
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    language?: Array<string>;
    /**
     * 정보 유형(시스템 제공, 개인 추가) common_code : MEDIA_INFO_TYPE,   SYSTEM/USERADD 
     * @type {string}
     * @memberof ESearchMediaCondDto
     */
    sourceType?: string;
    /**
     * 프로젝트ID 배열
     * @type {Array<number>}
     * @memberof ESearchMediaCondDto
     */
    projectIdList?: Array<number>;
    /**
     * 기자명 노출  common_code : MEDIA_JRNLIST_NAME_REVEALED_YN
     * @type {string}
     * @memberof ESearchMediaCondDto
     */
    revealedYN?: string;
    /**
     * 차단 여부  common_code : MEDIA_BLOCK_YN
     * @type {string}
     * @memberof ESearchMediaCondDto
     */
    blockYN?: string;
    /**
     * 그룹ID, 차단여부(flagBlock) 조건 입력시 필수 입력
     * @type {number}
     * @memberof ESearchMediaCondDto
     */
    blockGroupId?: number;
    /**
     * 페이지 번호
     * @type {number}
     * @memberof ESearchMediaCondDto
     */
    page: number;
    /**
     * 페이지 사이즈
     * @type {number}
     * @memberof ESearchMediaCondDto
     */
    size: number;
    /**
     * 정렬
     * @type {Array<string>}
     * @memberof ESearchMediaCondDto
     */
    sort?: Array<string>;
}

/**
 * Check if a given object implements the ESearchMediaCondDto interface.
 */
export function instanceOfESearchMediaCondDto(value: object): value is ESearchMediaCondDto {
    if (!('groupId' in value) || value['groupId'] === undefined) return false;
    if (!('page' in value) || value['page'] === undefined) return false;
    if (!('size' in value) || value['size'] === undefined) return false;
    return true;
}

export function ESearchMediaCondDtoFromJSON(json: any): ESearchMediaCondDto {
    return ESearchMediaCondDtoFromJSONTyped(json, false);
}

export function ESearchMediaCondDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): ESearchMediaCondDto {
    if (json == null) {
        return json;
    }
    return {
        
        'groupId': json['groupId'],
        'mediaIdList': json['mediaIdList'] == null ? undefined : json['mediaIdList'],
        'mainCategoryList': json['mainCategoryList'] == null ? undefined : json['mainCategoryList'],
        'categoryList': json['categoryList'] == null ? undefined : json['categoryList'],
        'fieldList': json['fieldList'] == null ? undefined : json['fieldList'],
        'locationList': json['locationList'] == null ? undefined : json['locationList'],
        'keywords': json['keywords'] == null ? undefined : json['keywords'],
        'groupList': json['groupList'] == null ? undefined : json['groupList'],
        'value': json['value'] == null ? undefined : json['value'],
        'pubCycleList': json['pubCycleList'] == null ? undefined : json['pubCycleList'],
        'filter': json['filter'] == null ? undefined : json['filter'],
        'filterCategoryList': json['filterCategoryList'] == null ? undefined : json['filterCategoryList'],
        'filterFieldList': json['filterFieldList'] == null ? undefined : json['filterFieldList'],
        'filterLocationList': json['filterLocationList'] == null ? undefined : json['filterLocationList'],
        'filterPubCycleList': json['filterPubCycleList'] == null ? undefined : json['filterPubCycleList'],
        'filterPortalList': json['filterPortalList'] == null ? undefined : json['filterPortalList'],
        'filterValue': json['filterValue'] == null ? undefined : json['filterValue'],
        'filterSourceType': json['filterSourceType'] == null ? undefined : json['filterSourceType'],
        'jrnlstListId': json['jrnlstListId'] == null ? undefined : json['jrnlstListId'],
        'portalList': json['portalList'] == null ? undefined : json['portalList'],
        'language': json['language'] == null ? undefined : json['language'],
        'sourceType': json['sourceType'] == null ? undefined : json['sourceType'],
        'projectIdList': json['projectIdList'] == null ? undefined : json['projectIdList'],
        'revealedYN': json['revealedYN'] == null ? undefined : json['revealedYN'],
        'blockYN': json['blockYN'] == null ? undefined : json['blockYN'],
        'blockGroupId': json['blockGroupId'] == null ? undefined : json['blockGroupId'],
        'page': json['page'],
        'size': json['size'],
        'sort': json['sort'] == null ? undefined : json['sort'],
    };
}

export function ESearchMediaCondDtoToJSON(value?: ESearchMediaCondDto | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'groupId': value['groupId'],
        'mediaIdList': value['mediaIdList'],
        'mainCategoryList': value['mainCategoryList'],
        'categoryList': value['categoryList'],
        'fieldList': value['fieldList'],
        'locationList': value['locationList'],
        'keywords': value['keywords'],
        'groupList': value['groupList'],
        'value': value['value'],
        'pubCycleList': value['pubCycleList'],
        'filter': value['filter'],
        'filterCategoryList': value['filterCategoryList'],
        'filterFieldList': value['filterFieldList'],
        'filterLocationList': value['filterLocationList'],
        'filterPubCycleList': value['filterPubCycleList'],
        'filterPortalList': value['filterPortalList'],
        'filterValue': value['filterValue'],
        'filterSourceType': value['filterSourceType'],
        'jrnlstListId': value['jrnlstListId'],
        'portalList': value['portalList'],
        'language': value['language'],
        'sourceType': value['sourceType'],
        'projectIdList': value['projectIdList'],
        'revealedYN': value['revealedYN'],
        'blockYN': value['blockYN'],
        'blockGroupId': value['blockGroupId'],
        'page': value['page'],
        'size': value['size'],
        'sort': value['sort'],
    };
}

