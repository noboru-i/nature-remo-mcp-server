import { z } from "zod";
import { natureRemoRequest, buildUrl } from "../common/request.js";

export const ListAppliancesOptions = z.object({
});

export const ListAppliancesSchema = ListAppliancesOptions;

export async function listAppliances(params: z.infer<typeof ListAppliancesSchema>) {
    return natureRemoRequest(buildUrl("https://api.nature.global/1/appliances", {}));
}