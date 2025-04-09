import { z } from "zod";
import { natureRemoRequest, buildUrl } from "../common/request.js";

export const OperateTvOptions = z.object({
    applianceId: z.string(),
    button: z.string(),
    count: z.number().default(1),
});

export const OperateTvSchema = OperateTvOptions;

export async function operateTv(params: z.infer<typeof OperateTvSchema>) {
    const { applianceId, button, count } = params;

    const formData = new FormData();
    formData.append("button", button);

    for (let i = 0; i < count; i++) {
        await natureRemoRequest(
            buildUrl(`https://api.nature.global/1/appliances/${applianceId}/tv`, {}),
            {
                method: "POST",
                body: formData,
            }
        );
    }
}
