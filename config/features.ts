import { AppFeatures } from "@contexts/app-context";

export const FEATURES = {
    ADVANCED_SEARCH: "advancedSearch",
}

export const DEFAULT_FEATURES: AppFeatures = {
    [FEATURES.ADVANCED_SEARCH]: false,
}