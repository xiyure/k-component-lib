---
layout: page
# gitChangelog: false
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
const members = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/16713018?v=4',
    name: '唐清伟',
    title: 'UX & Developer',
    links: [
      { icon: 'github', link: 'https://github.com/xiyure' },
    ] 
  },
]

const members1 = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/100740223?v=4',
    name: '周韩杰',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/xiyure' },
    ] 
  },
]

const members2 = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/31064651?v=4',
    name: '董行健',
    title: 'UX Desinger',
    links: [
      { icon: 'github', link: 'https://github.com/sengoku-f' },
    ]
  },
]



const members3 = [
  {
    avatar: 'https://avatars.githubusercontent.com/u/186795303?v=4',
    name: '莫启健',
    title: 'Developer',
    links: [
      { icon: 'github', link: 'https://github.com/QijianMo' },
    ]
  },
]

</script>

<VPTeamPage class="flex flex-col justify-center items-center">
  <VPTeamPageTitle>
    <template #title>
      关于我们
    </template>
    <template #lead>
      <div style="text-indent: 2em; text-align: justify;">KSW-UX 是金智维产品一部开发的一个前端组件库，旨在通过模块化的解决方案来降低冗余的生产成本。该项目集成了多种业务组件，专为企业级产品的开发而设计，以满足日益增长的用户体验需求。</div>
      <div style="text-indent: 2em; text-align: justify;">随着企业对用户体验的重视程度不断提升，KSW-UX 通过大量项目实践和总结，逐步形成了一个完善的设计体系。这一设计体系不仅提高了开发效率，还确保了组件的一致性和可复用性，从而为企业级产品提供了更高水平的用户体验。</div>
    </template>
  </VPTeamPageTitle>
<div class="grid grid-cols-2 gap-4 w-fit">
<VPTeamMembers
    :members="members"
    class="!m-0 !p-0"
  />
<VPTeamMembers
    :members="members1"
    class="!m-0 !p-0"
  />
<VPTeamMembers
    :members="members2"
    class="!m-0 !p-0"
  />
<VPTeamMembers
    :members="members3"
    class="!m-0 !p-0"
  />
</div>
</VPTeamPage>
