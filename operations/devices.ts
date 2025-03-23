import { z } from "zod";
import { natureRemoRequest, buildUrl } from "../common/request.js";

export const ListDevicesOptions = z.object({
});


export const ListDevicesSchema = ListDevicesOptions;

export async function listDevices(params: z.infer<typeof ListDevicesSchema>) {
    return natureRemoRequest(buildUrl("https://api.nature.global/1/devices", {}));
}
