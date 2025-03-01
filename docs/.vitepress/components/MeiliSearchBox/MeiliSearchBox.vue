<script setup>
import "./style.css";
import { useData, useRoute, useRouter } from "vitepress";
import { onMounted, watch, ref, onUnmounted } from "vue";

const { lang, localeIndex } = useData();
const router = useRouter();
const route = useRoute();

// 默认配置
const defaultTranslations = {
  button: { buttonText: "搜索" },
  modal: {
    searchDocsPlaceHolder: "搜索文档...",
    resetButtonTitle: "重置搜索",
    cancelButtonText: "取消",
    selectText: "选择",
    navigateText: "切换",
    closeText: "关闭",
    poweredByText: "搜索提供",
  },
};

// 从themeConfig获取配置
const { theme } = useData();
const meilisearchConfig = theme.value.meilisearch;

// 搜索实例引用
const searchInstance = ref(null);

// 获取当前语言配置
const getCurrentConfig = () => ({
  host: meilisearchConfig.host,
  apiKey: meilisearchConfig.apiKey,
  indexUid:
    meilisearchConfig.locales?.[localeIndex.value]?.indexUid ||
    meilisearchConfig.indexUid,
  translations:
    meilisearchConfig.locales?.[localeIndex.value]?.translations ||
    meilisearchConfig.translations ||
    defaultTranslations,
});

// 加载搜索器
const loadSearch = async () => {
  if (import.meta.env.SSR) return;
  
  try {
    const { docsearch } = await import("./meilisearch-docsearch/index.js");
    return docsearch
  } catch (e) {
    console.warn('Search disabled:', e)
  }
}

// 初始化搜索
const initSearch = async () => {
  const docsearch = await loadSearch()
  if (!docsearch) return
  
  destroySearch();

  const currentConfig = getCurrentConfig();

  searchInstance.value = docsearch({
    container: "#meilisearch-container",
    ...currentConfig,
  });
};

// 销毁搜索实例
const destroySearch = () => {
  if (searchInstance.value) {
    const searchContainer = document.querySelector("#meilisearch-container");
    if (searchContainer) searchContainer.innerHTML = "";
    searchInstance.value = null;
  }
};

// 生命周期
onMounted(initSearch);
onUnmounted(destroySearch);
watch([localeIndex, lang], initSearch);
</script>

<template>
  <div class="VPNavBarSearch">
    <div id="meilisearch-container" />
  </div>
</template>

<style scoped>
.VPNavBarSearch {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .VPNavBarSearch {
    flex-grow: 1;
    padding-left: 24px;
  }
}

@media (min-width: 960px) {
  .VPNavBarSearch {
    padding-left: 32px;
  }
}
</style>
