import { WaterMark } from "@/datatypes/card";
import { ComputedRef, computed } from "vue";
import { useI18n } from "vue-i18n";

export default function useWaterMarkMap() {
    const { t } = useI18n()
    // watermark map 水印类型和名称映射
    const watermarkMap: Record<WaterMark, ComputedRef<string>> = {
        [WaterMark.None]: computed(() => t("none")),
        [WaterMark.YearOfTheWolf]: computed(() => t("year-of-the-wolf")),
        [WaterMark.FestivalOfLegends]: computed(() => t("festival-of-legends")),
        [WaterMark.Audiopocalypse]: computed(() => t("audiopocalypse")),
        [WaterMark.Titans]: computed(() => t("titans")),
    }

    return watermarkMap
}