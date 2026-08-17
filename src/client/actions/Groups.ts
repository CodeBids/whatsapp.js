import type {
  ApproveGroupJoinRequestsResponse,
  CreateGroupPayload,
  CreateGroupResponse,
  GroupDetails,
  GroupInviteLinkResponse,
  GroupSuccessResponse,
  ListGroupJoinRequestsResponse,
  ListGroupsParams,
  ListGroupsResponse,
  RejectGroupJoinRequestsResponse,
  RemoveGroupParticipantsResponse,
  UpdateGroupPayload,
} from "../../types"
import { WhatsAppApiException } from "../../errors/Messages"
import type { Client } from "../Client"

const MAX_SUBJECT_LENGTH = 128
const MAX_DESCRIPTION_LENGTH = 2048
const MAX_PARTICIPANTS_PER_REMOVE_CALL = 8

/**
 * Manages WhatsApp groups: creation, settings, invite links, join requests, and participant
 * removal. Requires the business phone number to be an Official Business Account (OBA)
 * operating on the Cloud API. Groups are invite-only — there's no "add participant" endpoint;
 * people join via an invite link or by having their join request approved.
 */
export class GroupManager {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  private validateSubject(subject: string): void {
    if (!subject) {
      throw new WhatsAppApiException("subject is required", 0)
    }
    if (subject.length > MAX_SUBJECT_LENGTH) {
      throw new WhatsAppApiException(`subject must be ${MAX_SUBJECT_LENGTH} characters or less`, 0)
    }
  }

  private validateDescription(description?: string): void {
    if (description && description.length > MAX_DESCRIPTION_LENGTH) {
      throw new WhatsAppApiException(`description must be ${MAX_DESCRIPTION_LENGTH} characters or less`, 0)
    }
  }

  /**
   * Creates a new group. The invite link isn't ready synchronously — it arrives via the
   * `group_lifecycle_update` webhook once the group finishes being created.
   * @param payload Group subject (required), description, and join approval mode
   * @returns The new group's ID
   */
  async create(payload: CreateGroupPayload): Promise<CreateGroupResponse> {
    this.validateSubject(payload.subject)
    this.validateDescription(payload.description)

    return this.client.makeApiRequest<CreateGroupResponse>("groups", "POST", {
      messaging_product: "whatsapp",
      subject: payload.subject,
      ...(payload.description ? { description: payload.description } : {}),
      ...(payload.joinApprovalMode ? { join_approval_mode: payload.joinApprovalMode } : {}),
    })
  }

  /**
   * Lists groups the business phone number is part of.
   * @param params Pagination options
   * @returns The list of groups
   */
  async list(params: ListGroupsParams = {}): Promise<ListGroupsResponse> {
    const query = new URLSearchParams()

    if (params.limit) query.set("limit", String(params.limit))
    if (params.after) query.set("after", params.after)
    if (params.before) query.set("before", params.before)

    const queryString = query.toString()

    return this.client.makeApiRequest<ListGroupsResponse>(
      queryString ? `groups?${queryString}` : "groups",
      "GET",
    )
  }

  /**
   * Gets details for a single group.
   * @param groupId Group ID
   * @param fields Fields to request (defaults to Meta's standard set when omitted)
   * @returns The group details
   */
  async get(groupId: string, fields?: string[]): Promise<GroupDetails> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    const defaultFields = [
      "id",
      "messaging_product",
      "subject",
      "description",
      "creation_timestamp",
      "suspended",
      "total_participant_count",
      "join_approval_mode",
    ]

    const query = new URLSearchParams({ fields: (fields ?? defaultFields).join(",") })

    return this.client.makeGraphRequest<GroupDetails>(`${groupId}?${query.toString()}`, "GET")
  }

  /**
   * Updates a group's subject, description and/or profile picture.
   * @param groupId Group ID
   * @param updates Fields to update
   * @returns API response
   */
  async update(groupId: string, updates: UpdateGroupPayload): Promise<GroupSuccessResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    if (updates.subject === undefined && updates.description === undefined && !updates.profilePicture) {
      throw new WhatsAppApiException("Provide at least a subject, description or profilePicture to update", 0)
    }

    if (updates.subject !== undefined) this.validateSubject(updates.subject)
    if (updates.description !== undefined) this.validateDescription(updates.description)

    if (updates.profilePicture) {
      const extraFields: Record<string, string> = {}
      if (updates.subject !== undefined) extraFields.subject = updates.subject
      if (updates.description !== undefined) extraFields.description = updates.description

      return this.client.updateGroupProfilePicture<GroupSuccessResponse>(groupId, updates.profilePicture, extraFields)
    }

    return this.client.makeGraphRequest<GroupSuccessResponse>(groupId, "POST", {
      messaging_product: "whatsapp",
      ...(updates.subject !== undefined ? { subject: updates.subject } : {}),
      ...(updates.description !== undefined ? { description: updates.description } : {}),
    })
  }

  /**
   * Deletes a group.
   * @param groupId Group ID
   * @returns API response
   */
  async delete(groupId: string): Promise<GroupSuccessResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    return this.client.makeGraphRequest<GroupSuccessResponse>(groupId, "DELETE")
  }

  /**
   * Gets a group's current invite link.
   * @param groupId Group ID
   * @returns The invite link
   */
  async getInviteLink(groupId: string): Promise<GroupInviteLinkResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    return this.client.makeGraphRequest<GroupInviteLinkResponse>(`${groupId}/invite_link`, "GET")
  }

  /**
   * Invalidates the current invite link and issues a new one.
   * @param groupId Group ID
   * @returns The new invite link
   */
  async resetInviteLink(groupId: string): Promise<GroupInviteLinkResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    return this.client.makeGraphRequest<GroupInviteLinkResponse>(`${groupId}/invite_link`, "POST", {
      messaging_product: "whatsapp",
    })
  }

  /**
   * Removes participants from a group (up to 8 per call).
   * @param groupId Group ID
   * @param waIds WhatsApp IDs of the participants to remove
   * @returns API response
   */
  async removeParticipants(groupId: string, waIds: string[]): Promise<RemoveGroupParticipantsResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    if (!waIds || waIds.length === 0) {
      throw new WhatsAppApiException("At least one participant is required", 0)
    }

    if (waIds.length > MAX_PARTICIPANTS_PER_REMOVE_CALL) {
      throw new WhatsAppApiException(`A maximum of ${MAX_PARTICIPANTS_PER_REMOVE_CALL} participants can be removed per call`, 0)
    }

    return this.client.makeGraphRequest<RemoveGroupParticipantsResponse>(`${groupId}/participants`, "DELETE", {
      messaging_product: "whatsapp",
      participants: waIds.map((user) => ({ user })),
    })
  }

  /**
   * Lists pending join requests for a group with `join_approval_mode: "approval_required"`.
   * @param groupId Group ID
   * @returns The list of pending join requests
   */
  async getJoinRequests(groupId: string): Promise<ListGroupJoinRequestsResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }

    return this.client.makeGraphRequest<ListGroupJoinRequestsResponse>(`${groupId}/join_requests`, "GET")
  }

  /**
   * Approves pending join requests.
   * @param groupId Group ID
   * @param joinRequestIds IDs of the join requests to approve
   * @returns Which requests were approved, and which failed
   */
  async approveJoinRequests(groupId: string, joinRequestIds: string[]): Promise<ApproveGroupJoinRequestsResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }
    if (!joinRequestIds || joinRequestIds.length === 0) {
      throw new WhatsAppApiException("At least one join request ID is required", 0)
    }

    return this.client.makeGraphRequest<ApproveGroupJoinRequestsResponse>(`${groupId}/join_requests`, "POST", {
      messaging_product: "whatsapp",
      join_requests: joinRequestIds,
    })
  }

  /**
   * Rejects pending join requests.
   * @param groupId Group ID
   * @param joinRequestIds IDs of the join requests to reject
   * @returns Which requests were rejected, and which failed
   */
  async rejectJoinRequests(groupId: string, joinRequestIds: string[]): Promise<RejectGroupJoinRequestsResponse> {
    if (!groupId) {
      throw new WhatsAppApiException("groupId is required", 0)
    }
    if (!joinRequestIds || joinRequestIds.length === 0) {
      throw new WhatsAppApiException("At least one join request ID is required", 0)
    }

    return this.client.makeGraphRequest<RejectGroupJoinRequestsResponse>(`${groupId}/join_requests`, "DELETE", {
      messaging_product: "whatsapp",
      join_requests: joinRequestIds,
    })
  }
}
