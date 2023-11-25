import { WaterMark } from "@/datatypes/watermark";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default function useWaterMarkMap() {
    const { t } = useI18n()
    // watermark map 水印类型和名称映射
    const watermarkMap = {
        [WaterMark.None]: computed<string>(() => t("none")),
        [WaterMark.YearOfTheWolf]: computed<string>(() => t("year-of-the-wolf")),
        [WaterMark.FestivalOfLegends]: computed<string>(() => t("festival-of-legends")),
        [WaterMark.Audiopocalypse]: computed<string>(() => t("audiopocalypse")),
        [WaterMark.Titans]: computed<string>(() => t("titans")),
    }

    return watermarkMap
}