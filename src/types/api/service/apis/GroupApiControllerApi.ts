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


import * as runtime from '../runtime';
import type {
  BaseResponseCommonBoolean,
  BaseResponseCommonGroupDto,
  BaseResponseCommonListGroupSimpleDto,
  BaseResponseCommonPageGroupDto,
  BaseResponseCommonString,
  CheckDeleteUserInGroupDto,
  CheckGroupNameDto,
  CreateGroupDto,
  CreateGroupUsersDto,
  GroupUsersDto,
  PageableDto,
  SearchGroupDto,
} from '../models/index';
import {
    BaseResponseCommonBooleanFromJSON,
    BaseResponseCommonBooleanToJSON,
    BaseResponseCommonGroupDtoFromJSON,
    BaseResponseCommonGroupDtoToJSON,
    BaseResponseCommonListGroupSimpleDtoFromJSON,
    BaseResponseCommonListGroupSimpleDtoToJSON,
    BaseResponseCommonPageGroupDtoFromJSON,
    BaseResponseCommonPageGroupDtoToJSON,
    BaseResponseCommonStringFromJSON,
    BaseResponseCommonStringToJSON,
    CheckDeleteUserInGroupDtoFromJSON,
    CheckDeleteUserInGroupDtoToJSON,
    CheckGroupNameDtoFromJSON,
    CheckGroupNameDtoToJSON,
    CreateGroupDtoFromJSON,
    CreateGroupDtoToJSON,
    CreateGroupUsersDtoFromJSON,
    CreateGroupUsersDtoToJSON,
    GroupUsersDtoFromJSON,
    GroupUsersDtoToJSON,
    PageableDtoFromJSON,
    PageableDtoToJSON,
    SearchGroupDtoFromJSON,
    SearchGroupDtoToJSON,
} from '../models/index';

export interface AddGroupRequest {
    createGroupDto: CreateGroupDto;
}

export interface AddUsersInGroupRequest {
    groupUsersDto: GroupUsersDto;
}

export interface CheckDeleteUsersInGroupRequest {
    request: CheckDeleteUserInGroupDto;
}

export interface CheckGroupNameRequest {
    checkGroupNameDto: CheckGroupNameDto;
}

export interface CreateGroupAddUsersRequest {
    createGroupUsersDto: CreateGroupUsersDto;
}

export interface DeleteGroupRequest {
    id: number;
}

export interface DeleteUsersInGroupRequest {
    groupUsersDto: GroupUsersDto;
}

export interface GetGroupInfoActiveUsersRequest {
    id: number;
}

export interface GetGroupInfosRequest {
    id: number;
}

export interface ModifyGroupRequest {
    id: number;
    createGroupDto: CreateGroupDto;
}

export interface SearchGroupsRequest {
    searchGroupDto: SearchGroupDto;
    pageableDto: PageableDto;
}

export interface UpdateAllUsersInGroupRequest {
    groupUsersDto: GroupUsersDto;
}

/**
 * 
 */
export class GroupApiControllerApi extends runtime.BaseAPI {

    /**
     * 그룹사용 가능한 회사내 그룹 생성
     * 그룹 추가
     */
    async addGroupRaw(requestParameters: AddGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonGroupDto>> {
        if (requestParameters['createGroupDto'] == null) {
            throw new runtime.RequiredError(
                'createGroupDto',
                'Required parameter "createGroupDto" was null or undefined when calling addGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateGroupDtoToJSON(requestParameters['createGroupDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonGroupDtoFromJSON(jsonValue));
    }

    /**
     * 그룹사용 가능한 회사내 그룹 생성
     * 그룹 추가
     */
    async addGroup(requestParameters: AddGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonGroupDto> {
        const response = await this.addGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 선택한 그룹에 사용자 추가
     * 기존 그룹에 사용자 추가
     */
    async addUsersInGroupRaw(requestParameters: AddUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['groupUsersDto'] == null) {
            throw new runtime.RequiredError(
                'groupUsersDto',
                'Required parameter "groupUsersDto" was null or undefined when calling addUsersInGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GroupUsersDtoToJSON(requestParameters['groupUsersDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 선택한 그룹에 사용자 추가
     * 기존 그룹에 사용자 추가
     */
    async addUsersInGroup(requestParameters: AddUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.addUsersInGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 사용자는 최소 하나 이상의 그룹에 속해 있어야 함. 제거 가능한지 여부를 return
     * 그룹에 사용자 제거 가능 확인
     */
    async checkDeleteUsersInGroupRaw(requestParameters: CheckDeleteUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonBoolean>> {
        if (requestParameters['request'] == null) {
            throw new runtime.RequiredError(
                'request',
                'Required parameter "request" was null or undefined when calling checkDeleteUsersInGroup().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['request'] != null) {
            queryParameters['request'] = requestParameters['request'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/users/check/delete`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonBooleanFromJSON(jsonValue));
    }

    /**
     * 사용자는 최소 하나 이상의 그룹에 속해 있어야 함. 제거 가능한지 여부를 return
     * 그룹에 사용자 제거 가능 확인
     */
    async checkDeleteUsersInGroup(requestParameters: CheckDeleteUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonBoolean> {
        const response = await this.checkDeleteUsersInGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹을 추가 변경 할 때 그룹명 존재하는지 확인
     * 그룹명 중복 확인
     */
    async checkGroupNameRaw(requestParameters: CheckGroupNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['checkGroupNameDto'] == null) {
            throw new runtime.RequiredError(
                'checkGroupNameDto',
                'Required parameter "checkGroupNameDto" was null or undefined when calling checkGroupName().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/checkname`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CheckGroupNameDtoToJSON(requestParameters['checkGroupNameDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 그룹을 추가 변경 할 때 그룹명 존재하는지 확인
     * 그룹명 중복 확인
     */
    async checkGroupName(requestParameters: CheckGroupNameRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.checkGroupNameRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹을 생성하고, 기존 사용자를 그룹에 포함시킴
     * 새로운 그룹 추가 및 기존 사용자를 그룹에 소속 시킴
     */
    async createGroupAddUsersRaw(requestParameters: CreateGroupAddUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['createGroupUsersDto'] == null) {
            throw new runtime.RequiredError(
                'createGroupUsersDto',
                'Required parameter "createGroupUsersDto" was null or undefined when calling createGroupAddUsers().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/create/add/users`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateGroupUsersDtoToJSON(requestParameters['createGroupUsersDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 그룹을 생성하고, 기존 사용자를 그룹에 포함시킴
     * 새로운 그룹 추가 및 기존 사용자를 그룹에 소속 시킴
     */
    async createGroupAddUsers(requestParameters: CreateGroupAddUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.createGroupAddUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹내 회원이 없는 경우 삭제 가능
     * 그룹 삭제
     */
    async deleteGroupRaw(requestParameters: DeleteGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling deleteGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 그룹내 회원이 없는 경우 삭제 가능
     * 그룹 삭제
     */
    async deleteGroup(requestParameters: DeleteGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.deleteGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹내 사용자 제거
     * 그룹에 사용자 삭제
     */
    async deleteUsersInGroupRaw(requestParameters: DeleteUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['groupUsersDto'] == null) {
            throw new runtime.RequiredError(
                'groupUsersDto',
                'Required parameter "groupUsersDto" was null or undefined when calling deleteUsersInGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/users`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: GroupUsersDtoToJSON(requestParameters['groupUsersDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 그룹내 사용자 제거
     * 그룹에 사용자 삭제
     */
    async deleteUsersInGroup(requestParameters: DeleteUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.deleteUsersInGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 회원 추가시 회사내 그룹ID 선택하기 위해 사용, 선택한 그룹ID를 회원 추가시 파라미터로 보냄
     * 그룹 목록 - 로그인한 사용자 회사내 그룹목록
     */
    async getCompanyGroupsRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonListGroupSimpleDto>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonListGroupSimpleDtoFromJSON(jsonValue));
    }

    /**
     * 회원 추가시 회사내 그룹ID 선택하기 위해 사용, 선택한 그룹ID를 회원 추가시 파라미터로 보냄
     * 그룹 목록 - 로그인한 사용자 회사내 그룹목록
     */
    async getCompanyGroups(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonListGroupSimpleDto> {
        const response = await this.getCompanyGroupsRaw(initOverrides);
        return await response.value();
    }

    /**
     * 그룹 정보와 그룹에 속한 활성(Active) 회원정보 가져오기
     * 그룹 정보 및 그룹에 속한 활성(Active) 회원정보
     */
    async getGroupInfoActiveUsersRaw(requestParameters: GetGroupInfoActiveUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonGroupDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getGroupInfoActiveUsers().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/{id}/active`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonGroupDtoFromJSON(jsonValue));
    }

    /**
     * 그룹 정보와 그룹에 속한 활성(Active) 회원정보 가져오기
     * 그룹 정보 및 그룹에 속한 활성(Active) 회원정보
     */
    async getGroupInfoActiveUsers(requestParameters: GetGroupInfoActiveUsersRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonGroupDto> {
        const response = await this.getGroupInfoActiveUsersRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹 정보와 그룹에 속한 모든 회원정보 가져오기
     * 그룹 정보 및 그룹에 속한 모든 회원정보
     */
    async getGroupInfosRaw(requestParameters: GetGroupInfosRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonGroupDto>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling getGroupInfos().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonGroupDtoFromJSON(jsonValue));
    }

    /**
     * 그룹 정보와 그룹에 속한 모든 회원정보 가져오기
     * 그룹 정보 및 그룹에 속한 모든 회원정보
     */
    async getGroupInfos(requestParameters: GetGroupInfosRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonGroupDto> {
        const response = await this.getGroupInfosRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹명 변경
     * 그룹명 변경
     */
    async modifyGroupRaw(requestParameters: ModifyGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonString>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling modifyGroup().'
            );
        }

        if (requestParameters['createGroupDto'] == null) {
            throw new runtime.RequiredError(
                'createGroupDto',
                'Required parameter "createGroupDto" was null or undefined when calling modifyGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: CreateGroupDtoToJSON(requestParameters['createGroupDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonStringFromJSON(jsonValue));
    }

    /**
     * 그룹명 변경
     * 그룹명 변경
     */
    async modifyGroup(requestParameters: ModifyGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonString> {
        const response = await this.modifyGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 그룹을 다양한 조건으로 검색, 정열시 사용
     * 그룹 목록 - 검색,정열 사용시
     */
    async searchGroupsRaw(requestParameters: SearchGroupsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonPageGroupDto>> {
        if (requestParameters['searchGroupDto'] == null) {
            throw new runtime.RequiredError(
                'searchGroupDto',
                'Required parameter "searchGroupDto" was null or undefined when calling searchGroups().'
            );
        }

        if (requestParameters['pageableDto'] == null) {
            throw new runtime.RequiredError(
                'pageableDto',
                'Required parameter "pageableDto" was null or undefined when calling searchGroups().'
            );
        }

        const queryParameters: any = {};

        if (requestParameters['searchGroupDto'] != null) {
            queryParameters['searchGroupDto'] = requestParameters['searchGroupDto'];
        }

        if (requestParameters['pageableDto'] != null) {
            queryParameters['pageableDto'] = requestParameters['pageableDto'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonPageGroupDtoFromJSON(jsonValue));
    }

    /**
     * 그룹을 다양한 조건으로 검색, 정열시 사용
     * 그룹 목록 - 검색,정열 사용시
     */
    async searchGroups(requestParameters: SearchGroupsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonPageGroupDto> {
        const response = await this.searchGroupsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * 선택한 그룹에 전체 사용자를 전달받은 사용자 목록으로 갱신한다.
     * 기존 그룹에 전체 사용자 갱신
     */
    async updateAllUsersInGroupRaw(requestParameters: UpdateAllUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BaseResponseCommonBoolean>> {
        if (requestParameters['groupUsersDto'] == null) {
            throw new runtime.RequiredError(
                'groupUsersDto',
                'Required parameter "groupUsersDto" was null or undefined when calling updateAllUsersInGroup().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("accessToken", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/svc/groups/users/updateall`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GroupUsersDtoToJSON(requestParameters['groupUsersDto']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BaseResponseCommonBooleanFromJSON(jsonValue));
    }

    /**
     * 선택한 그룹에 전체 사용자를 전달받은 사용자 목록으로 갱신한다.
     * 기존 그룹에 전체 사용자 갱신
     */
    async updateAllUsersInGroup(requestParameters: UpdateAllUsersInGroupRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BaseResponseCommonBoolean> {
        const response = await this.updateAllUsersInGroupRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
