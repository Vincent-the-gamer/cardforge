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
        [WaterMark.YearOfTheHydra]: computed(() => t("year-of-the-hydra")),
        [WaterMark.VoyageToTheSunkenCity]: computed(() => t("voyage-to-the-sunken-city")),
        [WaterMark.ThroneOfTheTides]: computed(() => t("throne-of-the-tides")),
        [WaterMark.MurderAtCastleNathria]: computed(() => t("murder-at-castle-nathria")),
        [WaterMark.TheMawAndDisorder]: computed(() => t("the-maw-and-disorder")),
        [WaterMark.PathOfArthas]: computed(() => t("path-of-arthas")),
        [WaterMark.MarchOfTheLichKing]: computed(() => t("march-of-the-lich-king")),
        [WaterMark.ReturnToNaxxramas]: computed(() => t("return-to-naxxramas"))
    }

    return watermarkMap
}