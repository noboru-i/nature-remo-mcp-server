import { z } from "zod";
import { natureRemoRequest, buildUrl } from "../common/request.js";

export const OperateAirconOptions = z.object({
    applianceId: z.string(),
    airDirection: z.string().optional(),
    airDirectionH: z.string().optional(),
    airVolume: z.string().optional(),
    button: z.string().optional(),
    operationMode: z.string().optional(),
    temperature: z.string().optional(),
    temperatureUnit: z.string().optional(),
    count: z.number().default(1),
});

export const OperateAirconSchema = OperateAirconOptions;

export async function operateAircon(params: z.infer<typeof OperateAirconSchema>) {
    const { applianceId, airDirection, airDirectionH, airVolume, button, operationMode, temperature, temperatureUnit, count } = params;

    const formData = new FormData();
    if (airDirection) formData.append("air_direction", airDirection);
    if (airDirectionH) formData.append("air_direction_h", airDirectionH);
    if (airVolume) formData.append("air_volume", airVolume);
    if (button) formData.append("button", button);
    if (operationMode) formData.append("operation_mode", operationMode);
    if (temperature) formData.append("temperature", temperature);
    if (temperatureUnit) formData.append("temperature_unit", temperatureUnit);

    for (let i = 0; i < count; i++) {
        await natureRemoRequest(
            buildUrl(`https://api.nature.global/1/appliances/${applianceId}/aircon_settings`, {}),
            {
                method: "POST",
                body: formData,
            }
        );
    }
}
