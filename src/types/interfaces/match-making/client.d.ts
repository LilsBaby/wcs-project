import { EntityKey } from "../api";

export interface LoginWithCustomIdRequest {
	TitleId?: string;
	CreateAccount: boolean;
	CustomId: string;
	CustomTags?: Record<string, unknown>;
	EncryptedRequest?: string;
	InfoRequestParameters?: GetPlayerCombinedInfoRequestParams;
	PlayerSecret?: string;
}

export interface LoginResult {
	EntityToken: EntityTokenResponse;
	InfoResultPayload: GetPlayerCombinedInfoRequestParams;
	LastLoginTime: string;
	NewlyCreated: boolean;
	PlayFabId: string;
	SessionTicket: string;
	SettingsForUser: UserSettings;
	TreatmentAssignment: TreatmentAssignment;
}

interface EntityTokenResponse {
	Entity: EntityKey;
	EntityToken: string;
	TokenExpiration: string;
}

interface TreatmentAssignment {
	Variables: Array<Variable>;
	Variants: Array<string>;
}

interface Variable {
	Name: string;
	Value: string;
}

interface UserSettings {
	GatherDeviceInfo: boolean;
	GatherFocusInfo: boolean;
	NeedsAttribution: boolean;
}

export interface GetPlayerCombinedInfoRequestParams {
	GetCharacterInventories: boolean;
	GetCharacterList: boolean;
	GetPlayerProfile: boolean;
	GetPlayerStatistics: boolean;
	GetTitleData: boolean;
	GetUserAccountInfo: boolean;
	GetUserData: boolean;
	GetUserInventory: boolean;
	GetUserReadOnlyData: boolean;
	GetUserVirtualCurrency: boolean;
	PlayerStatisticNames: Array<string>;
	ProfileConstraints: PlayerProfileViewConstraints;
	TitleDataKeys: Array<string>;
	UserDataKeys: Array<string>;
	UserReadOnlyDataKeys: Array<string>;
}

export interface PlayerProfileViewConstraints {
	ShowAvatarUrl: boolean;
	ShowBannedUntil: boolean;
	ShowCampaignAttributions: boolean;
	ShowContactEmailAddresses: boolean;
	ShowCreated: boolean;
	ShowDisplayName: boolean;
	ShowExperimentVariants: boolean;
	ShowLastLogin: boolean;
	ShowLinkedAccounts: boolean;
	ShowLocations: boolean;
	ShowMemberships: boolean;
	ShowOrigination: boolean;
	ShowPushNotificationRegistrations: boolean;
	ShowStatistics: boolean;
	ShowTags: boolean;
	ShowTotalValueToDateInUsd: boolean;
	ShowValuesToDate: boolean;
}
