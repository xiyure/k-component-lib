---
layout: page
gitChangelog: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: './avatar.jpg',
    name: 'Admin',
    title: '创造者',
    links: [
      { icon: 'github', link: 'https://github.com' },
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      认识我们的团队
    </template>
    <template #lead>
      KSW Design 是一个专注于高质量图标组件开发的创新项目。我们的团队由经验丰富的设计师和技术专家组成，致力于为移动应用、网页、桌面应用和品牌提供精美的图标设计。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
