<template>
  <k-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <k-tab-pane label="User" name="user">User</k-tab-pane>
    <k-tab-pane label="Config" name="config">Config</k-tab-pane>
    <k-tab-pane label="Role" name="role">Role</k-tab-pane>
    <k-tab-pane label="Task" name="task">Task</k-tab-pane>
    <k-tab-pane label="Log" name="log">Log</k-tab-pane>
    <k-tab-pane label="Reports" name="reports">Reports</k-tab-pane>
    <k-tab-pane label="Settings" name="settings">Settings</k-tab-pane>
    <k-tab-pane label="Notifications" name="notifications">Notifications</k-tab-pane>
    <k-tab-pane label="Analytics" name="analytics">Analytics</k-tab-pane>
    <k-tab-pane label="Projects" name="projects">Projects</k-tab-pane>
    <k-tab-pane label="Teams" name="teams">Teams</k-tab-pane>
    <k-tab-pane label="Messages" name="messages">Messages</k-tab-pane>
    <k-tab-pane label="Activity" name="activity">Activity</k-tab-pane>
    <k-tab-pane label="Documents" name="documents">Documents</k-tab-pane>
    <k-tab-pane label="Integrations" name="integrations">Integrations</k-tab-pane>
    <k-tab-pane label="Security" name="security">Security</k-tab-pane>
    <k-tab-pane label="Billing" name="billing">Billing</k-tab-pane>
    <k-tab-pane label="Support" name="support">Support</k-tab-pane>
    <k-tab-pane label="Feedback" name="feedback">Feedback</k-tab-pane>
    <k-tab-pane label="FAQ" name="faq">FAQ</k-tab-pane>
    <k-tab-pane label="Help" name="help">Help</k-tab-pane>
    <k-tab-pane label="Terms" name="terms">Terms</k-tab-pane>
    <k-tab-pane label="Privacy" name="privacy">Privacy</k-tab-pane>
    <k-tab-pane label="About" name="about">About</k-tab-pane>
    <k-tab-pane label="Contact" name="contact">Contact</k-tab-pane>
    <k-tab-pane label="Legal" name="legal">Legal</k-tab-pane>
    <k-tab-pane label="Resources" name="resources">Resources</k-tab-pane>
  </k-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
