import Object from "@rbxts/object-utils";
import { HttpService } from "@rbxts/services";
import { TITLE_ID } from "shared/constants";
import { APIResponseBody } from "types/interfaces/api";
import { API_URL_PATH } from "types/util/api";

const API_CALL_ATTEMPTS = 10;
const API_CALL_INTERVAL = 15;
const PRODUCTION_URL = ".playfabapi.com";
const SDK_VERSION_STRING = "RobloxSdk_undefined";

export function GetUrl(urlPath: string): API_URL_PATH {
	const fullURL = `https://${TITLE_ID}.${PRODUCTION_URL}${urlPath}` as API_URL_PATH;
	return fullURL;
}

/**
 * `RequestAPI`
 * Calling an API Post to Playfab API
 *
 * @param UrlPath - The API Url get post from
 * @param ReqBody - Body arguments to be sent to the API
 * @param authKey Token Key
 * @param authValue Token Value
 * @returns
 */
export async function RequestAPI<T extends object>(
	UrlPath: string,
	ReqBody: object,
	authKey?: string,
	authValue?: string,
): Promise<T> {
	const Headers: HttpHeaders = {
		["X-ReportErrorAsSuccess"]: "true",
		["X-PlayFabSDK"]: SDK_VERSION_STRING,
		["Content-Type"]: "application/json",
	} as HttpHeaders;
	const Url = GetUrl(UrlPath);
	const Body = HttpService.JSONEncode({ ...ReqBody, TitleId: TITLE_ID });

	if (authKey && authValue) {
		(Headers as Record<string, string>)[authKey] = authValue;
	}

	const Response = await Promise.retryWithDelay(
		async () => HttpService.RequestAsync({ Url, Method: "POST", Headers, Body }),
		API_CALL_ATTEMPTS,
		API_CALL_INTERVAL,
	);
	print(Response);

	if (!Response) {
		throw `Failed to receive response`;
	}

	const Decoded = HttpService.JSONDecode(Response.Body) as APIResponseBody;
	if (Decoded.code === 400) {
		throw "Bad request";
	}

	if (Decoded && Decoded.code === 200) {
		return Decoded.data as unknown as T;
	} else {
		throw "";
	}
}
