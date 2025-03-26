import { z } from "zod";
import { natureRemoRequest, buildUrl } from "../common/request.js";

export const OperateAirconOptions = z.object({
    applianceId: z.string(),
    temperature: z.string().optional(),
    operationMode: z.string().optional(),
    airVolume: z.string().optional(),
    airDirection: z.string().optional(),
});

export const OperateAirconSchema = OperateAirconOptions;

export async function operateAircon(params: z.infer<typeof OperateAirconSchema>) {
    const { applianceId, temperature, operationMode, airVolume, airDirection } = params;

    const formData = new FormData();
    if (temperature) formData.append("temperature", temperature);
    if (operationMode) formData.append("operation_mode", operationMode);
    if (airVolume) formData.append("air_volume", airVolume);
    if (airDirection) formData.append("air_direction", airDirection);

    return natureRemoRequest(
        buildUrl(`https://api.nature.global/1/appliances/${applianceId}/aircon_settings`, {}),
        {
            method: "POST",
            body: formData,
        }
    );
}