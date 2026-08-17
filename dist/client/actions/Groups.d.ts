import type { ApproveGroupJoinRequestsResponse, CreateGroupPayload, CreateGroupResponse, GroupDetails, GroupInviteLinkResponse, GroupSuccessResponse, ListGroupJoinRequestsResponse, ListGroupsParams, ListGroupsResponse, RejectGroupJoinRequestsResponse, RemoveGroupParticipantsResponse, UpdateGroupPayload } from "../../types";
import type { Client } from "../Client";
/**
 * Manages WhatsApp groups: creation, settings, invite links, join requests, and participant
 * removal. Requires the business phone number to be an Official Business Account (OBA)
 * operating on the Cloud API. Groups are invite-only — there's no "add participant" endpoint;
 * people join via an invite link or by having their join request approved.
 */
export declare class GroupManager {
    private client;
    constructor(client: Client);
    private validateSubject;
    private validateDescription;
    /**
     * Creates a new group. The invite link isn't ready synchronously — it arrives via the
     * `group_lifecycle_update` webhook once the group finishes being created.
     * @param payload Group subject (required), description, and join approval mode
     * @returns The new group's ID
     */
    create(payload: CreateGroupPayload): Promise<CreateGroupResponse>;
    /**
     * Lists groups the business phone number is part of.
     * @param params Pagination options
     * @returns The list of groups
     */
    list(params?: ListGroupsParams): Promise<ListGroupsResponse>;
    /**
     * Gets details for a single group.
     * @param groupId Group ID
     * @param fields Fields to request (defaults to Meta's standard set when omitted)
     * @returns The group details
     */
    get(groupId: string, fields?: string[]): Promise<GroupDetails>;
    /**
     * Updates a group's subject, description and/or profile picture.
     * @param groupId Group ID
     * @param updates Fields to update
     * @returns API response
     */
    update(groupId: string, updates: UpdateGroupPayload): Promise<GroupSuccessResponse>;
    /**
     * Deletes a group.
     * @param groupId Group ID
     * @returns API response
     */
    delete(groupId: string): Promise<GroupSuccessResponse>;
    /**
     * Gets a group's current invite link.
     * @param groupId Group ID
     * @returns The invite link
     */
    getInviteLink(groupId: string): Promise<GroupInviteLinkResponse>;
    /**
     * Invalidates the current invite link and issues a new one.
     * @param groupId Group ID
     * @returns The new invite link
     */
    resetInviteLink(groupId: string): Promise<GroupInviteLinkResponse>;
    /**
     * Removes participants from a group (up to 8 per call).
     * @param groupId Group ID
     * @param waIds WhatsApp IDs of the participants to remove
     * @returns API response
     */
    removeParticipants(groupId: string, waIds: string[]): Promise<RemoveGroupParticipantsResponse>;
    /**
     * Lists pending join requests for a group with `join_approval_mode: "approval_required"`.
     * @param groupId Group ID
     * @returns The list of pending join requests
     */
    getJoinRequests(groupId: string): Promise<ListGroupJoinRequestsResponse>;
    /**
     * Approves pending join requests.
     * @param groupId Group ID
     * @param joinRequestIds IDs of the join requests to approve
     * @returns Which requests were approved, and which failed
     */
    approveJoinRequests(groupId: string, joinRequestIds: string[]): Promise<ApproveGroupJoinRequestsResponse>;
    /**
     * Rejects pending join requests.
     * @param groupId Group ID
     * @param joinRequestIds IDs of the join requests to reject
     * @returns Which requests were rejected, and which failed
     */
    rejectJoinRequests(groupId: string, joinRequestIds: string[]): Promise<RejectGroupJoinRequestsResponse>;
}
