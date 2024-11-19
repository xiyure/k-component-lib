<template>
  <div class="warpper">
    <p class="title gh">组件展示台</p>
  </div>
  <div :style="{height: '600px', overflow: 'auto'}">
    <k-menu-view
      ref="menuView"
      :options="viewOptions"
      default-active="option1"
      @select="(a) => console.log(a)"
    >
      <template #header>Header</template>
      <template #main>Main</template>
      <template #footer>Footer</template>
  </k-menu-view>
  </div>
  <k-button text @click="ssss"><IconAdd /></k-button>
  <k-tag
    text-color="#2882ff"
    :style="{
      background: '#fff',
      color: '#2882ff'
    }"
    round
  >标签</k-tag>
  <k-input-number></k-input-number>
  <k-button type="success" main @click="showAFilter">show filter</k-button>
  <div class="comp-list" id="comp-list">
    <p>Button Component</p>
    <k-button
      type="success"
      size="base"
      secondary
      @click.native="fn"
    >
      click
    </k-button>
    <hr>
    <p>Tab Component</p>
    <k-tabs
      v-model="activeName"
    >
      <k-tab-pane v-for="index in 30" :name="'tab'+index" :disabled="index ===3">
        Curren tab is tab{{ index }}
        <template #label>
          <IconAdd />
          <span>tab{{ index }}</span>
        </template>
      </k-tab-pane>
      <!-- <k-tab-pane label="tab1" name="tab1">
        Curren tab is tab2
      </k-tab-pane>
      <k-tab-pane label="tab2" :icon="Edit" name="tab2">
        Curren tab is tab2
      </k-tab-pane>
      <k-tab-pane label="tab3" name="tab3">
        Curren tab is tab3
      </k-tab-pane> -->
    </k-tabs>
    <hr>
    <p>Input Component</p>
    <k-input
      ref="myInput"
      class="test"
      v-model="content"
      @change="fr"
      :prefix-icon="Edit"
      clearable
      placeholder="请输入文字"
    >
      <template #prepend>prepend</template>
      <template #append>append</template>
    </k-input>
    <hr>
    <p>InputNumber Component</p>
    <k-input-number
      ref="myInputNumber"
      v-model="count"
      @change="fr"
      width="200px"
      placeholder="请输入数字"
      :step="3"
      :precision="2"
      stepStrictly
    >
      <template #increase-icon>
        <Star />
      </template>
      <template #decrease-icon><Delete /></template>
    </k-input-number>
    <hr>
    <k-pagination :total="1000" :page-size="20" :page-sizes="[10, 20, 30, 40]" />
    <hr>
    <p>Switch Component</p>
    <k-switch
      v-model="isSwitch"
      switchOnColor="#f60"
      switchOffColor="#7e343a"
      active-text="on"
      inactive-text="off"
      inline-prompt
    ></k-switch>
    <hr>
    <p>Radio/Checkbox Component</p>
    <div>
      <k-radio-group v-model="radioValue" @change="radioChange" color="chartreuse">
        <k-radio :value="1" color="pink">option1</k-radio>
        <k-radio :value="2">option2</k-radio>
      </k-radio-group>
      <k-checkbox-group v-model="checkboxValue" :color="customColor" @change="fr">
        <k-checkbox label="1" value="option1" :indeterminate="isSwitch"></k-checkbox>
        <k-checkbox label="2" value="option2" color="skyblue" strict>2</k-checkbox>
        <k-checkbox label="3" value="option3" color="#f60" strict></k-checkbox>
        <k-checkbox label="4" value="option4" color="green"></k-checkbox>
      </k-checkbox-group>
      <k-checkbox v-model="isLoading" label="1" :value="2" :indeterminate="isSwitch" color="red"></k-checkbox>
    </div>
    <hr> 
    <p>Select Component</p>
    <k-select v-model="selectValue" @change="selectChange"> 
      <k-option-group label="first">
        <k-option
          v-for="item, index in options"
          :label="item.label"
          :value="item.value"
          :key="index"
      />
      </k-option-group>
      <k-option-group label="second">
        <k-option
          v-for="item, index in options"
          :label="item.label"
          :value="item.value"
          :key="index"
      />
      </k-option-group>
    </k-select>
    <p>Cascader Component</p>
    <k-cascader
      v-model="cascaderValue"
      :options="cascaderOptions"
      :props="propsConfig"
      collapse-tags
    ></k-cascader>
    <hr>
    <p>DatePicker Component</p>
    <k-date-picker
      v-model="date"
      popper-class="as"
      type="datetimerange"
      value-format="YYYY-MM-DD HH:mm:ss"
      @change="fr"
    >
    </k-date-picker>
    <hr>
    <p>Upload Component</p>
    <k-upload
      ref="uploadRef"
      v-model="fileList"
      action="http://localhost:3000/upload"
      :auto-upload="false"
      :on-preview="() => console.log('preview')"
      :on-remove="() => console.log('remove')"
      :on-success="() => console.log('success')"
      :on-error="() => console.log('error')"
      :on-exceed="() => console.log('exceed')"
      :on-change="() => console.log('change')"
      :on-progress="() => console.log('progress')"
    >
      <template #tip>
        文件大小不能超过50kb
      </template>
    </k-upload>
    <hr>
    <p>Transfer Component</p>
    <k-transfer
      v-model="transferData"
      :data="originData"
      :default-keys="[4]"
      :props="{
        key: 'key1'
      }"
      size="sm"
      @change="dataChange"
      @left-check-change="checkChange"
      @right-check-change="checkChange"
    ></k-transfer>
    <hr>
    <p>Operate Component</p>
    <k-operate
      :data="ass"
      :total="9999"
      :hide-on-click="false"
      @close="() => console.log('close operate')"
    ></k-operate>
    <hr>
    <p>Tag Component</p>
    <k-tag type="danger" point>Default</k-tag>
    <k-tag type="success" size="sm" point>Small</k-tag>
    <hr>
    <p>Popover Component</p>
    <span v-popover="yuRef">787878</span>
    <k-button @click="() => vi = !vi">1111</k-button>
    <k-popover
      ref="yuRef"
      :visible="vi"
      title="popover"
      :auto-close="5000"
      virtual-triggering
      persistent
    >
      <template #reference>
        <k-button main>popover</k-button>
      </template>
      My first popover
    </k-popover>
    <hr>
    <p>Popconfirm Component</p>
    <k-popconfirm
      title="Are you sure to delete data?"
      placement="bottom"
    >
      <template #reference>
        <k-button @click="() => console.log('popconfirm')" type="success">popconfirm</k-button>
      </template>
    </k-popconfirm>
    <hr>
    <p>Result Component</p>
    <k-result status="success" title="操作成功" sub-title="提交成功，请继续操作"></k-result>
    <p>Empty Component</p>
    <k-empty :image-size="100">
      <template #description>暂无数据</template>
      <k-button main>去添加</k-button>
    </k-empty>
    <p>Dialog Component</p>
    <k-dialog
      v-model="visible"
      title="数据分析"
      :before-close="a"
    >
      <el-form
        ref="myForm"
        :model="formData"
        label-width="80px"
        label-position="right"
        :rules="rules"
      >
        <el-form-item ref="myNameItem" label="姓名" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <k-form-item label="性别" prop="sex">
          <k-select v-model="formData.sex" :teleported="false">
            <k-option label="男" value="male"></k-option>
            <k-option label="女" value="female"></k-option>
          </k-select>
        </k-form-item>
        <k-form-item label="年龄" prop="age">
          <k-input v-model="formData.age"></k-input>
        </k-form-item>
        <k-form-item label="简述" prop="desc">
          <k-input v-model="formData.desc" ></k-input>
        </k-form-item>
        <k-form-item>
          <k-button main @click="submit(myForm)">submit</k-button>
          <k-button secondary @click="sds(myNameItem)">check</k-button>
        </k-form-item>
      </el-form>
      <template #footer>
        <div :style="{display: 'flex', justifyContent: 'flex-end'}">
          <k-button secondary>取消</k-button>
          <k-button main>确定</k-button>
        </div>
      </template>
    </k-dialog>
    <hr>
    <p>Tooltip Component</p>
    <k-button main @click="showTooltip">show tooltip</k-button>
    <k-tooltip
      ref="myTooltip"
      width="170px"
      type="danger"
    >
      <template #content>This is my first tooltip</template>
    </k-tooltip>
    <hr>
    <p>Filter Component</p>
    <k-filter
      ref="myFilter"
      :options="data"
      :data="tableData.slice(0, 5)"
      filter-key="field"
      children-field="group"
      :border="false"
      @confirm="(conditionInfo, data) => console.log(conditionInfo, data)"
    >
    </k-filter>
    <hr>
    <p>Table Component</p>
    <k-button main @click="testTable">test table</k-button>
    <k-table
      ref="tableRef"
      :data="tableData.slice(0, 5)"
      :column-config="{resizable: true}"
      :edit-config="{ mode: 'cell', trigger: 'click', showIcon: true }"
      :filter-config="{
        confirmButtonText: 'Ok',
        resetButtonText: 'Cancel'
      }"
      :sort-config="{}"
      auto-resize
      show-overflow
      align="center"
      @cell-click="(a) => console.log(a)"
      @hide-column="(a) => console.log(a)"
      @filter-change="(a) => console.log(a)"
      @clear-filter="(a) => console.log(a)"
      @desc-change="(a, b) => console.log(a, b)"
    >
      <k-table-column type="checkbox" width="60"></k-table-column>
      <k-table-column type="seq" width="60"></k-table-column>
      <k-table-column field="name" sortable :show-column-menu="true" desc="this is personal real name" title="Name" width="200" :edit-render="{}">
        <template #edit>
          <k-input></k-input>
        </template>
      </k-table-column>
      <k-table-column :show-column-menu="true" field="sex" title="Sex" width="200" :filters="sexOptions" :filter-multiple="false"></k-table-column>
      <k-table-column field="age" title="Age" width="200" :filters="ageOptions" :filter-method="filterAge" sortable></k-table-column>
      <k-column-group title="其他">
        <k-table-column field="role" title="Role" width="80"></k-table-column>
        <k-table-column field="address" title="Address"></k-table-column>
      </k-column-group>
    </k-table>
    <hr>
    <p>Drawer Component</p>
    <k-button main @click="closeDrawer">show drawer</k-button>
    <k-drawer
      ref="myDrawer"
      v-model="visible1"
      title="数据分析"
      @open="() => console.log(visible1)"
    >
      This is my first drawer component!
      <p><k-button main @click="closeDrawer">close drawer</k-button></p>
    </k-drawer>
    <hr>
    <p>Form Component</p>
    <k-form
      ref="myForm"
      :model="formData"
      label-width="80px"
      :rules="rules"
      label-position="top"
    >
      <k-form-item ref="myNameItem" label="姓名" prop="name">
        <k-input v-model="formData.name"></k-input>
      </k-form-item>
      <k-form-item label="性别" prop="sex">
        <k-input v-model="formData.sex"></k-input>
      </k-form-item>
      <k-form-item label="年龄" prop="age">
        <k-input v-model="formData.age"></k-input>
      </k-form-item>
      <k-form-item label="简述" prop="desc">
        <k-input v-model="formData.desc" @keyup.enter.native="() => console.log('简述')"></k-input>
      </k-form-item>
      <k-form-item>
        <k-checkbox label="111" value="1111">111</k-checkbox>
        <k-button main @click="submit(myForm)">submit</k-button>
        <k-button secondary @click="sds(myNameItem)">check</k-button>
      </k-form-item>
    </k-form>
    <hr>
    <p>Step Component</p>
    <k-steps
      :active="active"
      align-center
      :height="30"
      capsule
    >
    </k-steps>
    <k-steps :active="active" align-center :height="30">
      <k-step
        v-for="(item, index) in stepStatus"
        :key="index"
        :title="item.title"
        :description="item.description"
        :status="item.status"
        :color="item.color"
        :icon="item.icon"
      >
        <template v-if="item.text !== undefined" #title>
          <span :style="{ display: 'flex', alignItems: 'center' }">
            <span v-if="item.text">{{ item.text }}</span>
            <component
              :style="{
                width: '20px',
                height: '20px',
                backgroundColor: item.color,
                marginRight: '5px',
              }"
              v-else
              :is="item.icon"
            />
            <span>{{ item.title }}</span>
          </span>
        </template>
      </k-step>
    </k-steps>
    <k-button main :style="{ marginTop: '10px' }" @click="nextStep(5)">next</k-button>
    <hr />
    <p>Collapse Component</p>
    <k-collapse v-model="activeCollapse" @change="collapseChange" accordion>
      <k-collapse-item name="collapse1" title="collapse1">
        <template #title>标题</template>
        111
      </k-collapse-item>
      <k-collapse-item name="collapse2" title="collapse2">222</k-collapse-item>
      <k-collapse-item name="collapse3" title="collapse3">333</k-collapse-item>
    </k-collapse>
    <hr>
    <p>View Component</p>
    <div style="height: 400px">
      <k-view
        default-active="free"
        :collapse="false"
        :data="viewData"
        @change="(value) => console.log('change', value)"
        @remove="(value) => console.log('remove', value)"
        @refresh="() => console.log('refresh')"
        @drag="(value) => console.log('drag', value)"
        @visible="handleVisible"
      >
        <template #label="{ data }">
          <k-tag :color="data.color" size="sm" text-color="#000" point>{{ data.label }}</k-tag>
        </template>
        <template #all>all</template>
        <template #free>free</template>
        <template #active>active</template>
        <template #outline>outline</template>
        <template #destory>destory</template>
        <template #production1>production1</template>
        <template #production2>production2</template>
        default
      </k-view>
    </div>
    <hr>
    <p>Badge Component</p>
    <k-badge :value="badgeCount" :max="100">
      <k-button main @click="() => badgeCount--">123</k-button>
    </k-badge>
    <hr>
    <p>Timeline Component</p>
    <k-timeline :show-line="true">
      <k-timeline-item
        v-for="item in timelineData"
        :timestamp="item.timestamp"
        :color="item.color"
        :hollow="item.hollow"
      >
        {{ item.content }}
      </k-timeline-item>
    </k-timeline>
    <k-button main @click="() => {timelineData[1].color='pink';timelineData[1].hollow=true}">change</k-button>
    <hr>
    <p>Calendar Component</p>
    <div :style="{height: '500px'}">
      <k-calendar v-model="calendarDate" :schedule="scheduleContent" adaptive show-lunar>
      </k-calendar>
    </div>
    <hr>
    <p>Tree Component</p>
    <k-tree
      ref="kTRef"
      :data="treeData"
      :props="props"
      show-checkbox
    >
    </k-tree>
    <k-button @click="sdsd">click</k-button>
    <hr>
    <p>Dropdown Component</p>
    <K-dropdown
      ref="myDropdown"
      trigger="click"
      title="Click Here"
      @command="(command) => console.log(command)"
      @click="() => console.log(111)"
    >
      <k-dropdown-item command="a" @click="console.log('click Action 1')">Action 1</k-dropdown-item>
      <k-dropdown-item command="b" @click="console.log('click Action 2')">Action 2</k-dropdown-item>
      <k-dropdown-item command="c" @click="console.log('click a')">Action 3</k-dropdown-item>
      <k-dropdown-item command="d" disabled>Action 4</k-dropdown-item>
      <k-dropdown-item command="e" @click="console.log('click Action 5')" divided>Action 5</k-dropdown-item>
    </k-dropdown>
    <hr>
    <p>Tree-Table Component</p>
    <div :style="{height: '500px'}">
      <k-tree-table
        ref="treeTableRef"
        :data="tableData"
        min-height="200px"
        :column="column"
        :show-column-menu="false"
        :use-tree="false"
        :show-search-input="true"
        :show-size-control="true"
        :show-transfer="true"
        :show-refresh="true"
        :show-filter="true"
        :simple="false"
        :tree-config="{ parentField: 'parentId' }"
        size="mini"
        :edit-config="{ mode: 'cell', trigger: 'click', showIcon: true }"
        :checkbox-config="{ showHeader: true, reserve: true, checkRowKeys: [], checkAll: false, 
        }"
        :row-config="{ isCurrent: true, keyField: 'id', currentMethod: sdf }"
        :column-config="{resizable: true}"
        border
        :tooltip-config="{ theme: 'dark'}"
        :show-page="true"
        :show-overflow="true"
        :show-header-tools="true"
        show-batch-operation
        :on-transfer-change="(a) => console.log(a)"
        :batch-operations="ass"
        :expand-config="{ reserve: true }"
        :show-description="true"
        :filter-options="ageOptions"
        :show-drag-column="false"
        :cell-click-toggle-highlight="true"
        :sort-config="{multiple: true, chronological: true}"
        :pagination-config="{total: 100}"
      >

      </k-tree-table>
      <!-- <k-tree-table
        ref="treeTableRef"
        :data="tableData"
        min-height="200px"
        :column="column"
        :show-column-menu="false"
        :use-tree="false"
        :show-search-input="true"
        :show-size-control="true"
        :show-transfer="true"
        :show-refresh="true"
        :show-filter="true"
        :simple="false"
        :tree-config="{ parentField: 'parentId' }"
        size="mini"
        :edit-config="{ mode: 'cell', trigger: 'click', showIcon: true }"
        :checkbox-config="{ showHeader: true, reserve: true, checkRowKeys: [], checkAll: false, 
        }"
        :row-config="{ isCurrent: true, keyField: 'id', currentMethod: sdf }"
        :column-config="{resizable: true}"
        border
        :tooltip-config="{ theme: 'dark'}"
        :show-page="true"
        :show-overflow="true"
        :show-header-tools="true"
        show-batch-operation
        :on-transfer-change="(a) => console.log(a)"
        :batch-operations="ass"
        :expand-config="{ reserve: true }"
        :show-description="true"
        :scroll-y="{ gt: 0, enabled: true }"
        :filter-options="ageOptions"
        :show-drag-column="false"
        :cell-click-toggle-highlight="true"
        :sort-config="{multiple: true, chronological: true}"
        :pagination-config="{total: 100}"
        @server-paging="(a) => console.log(a)"
        @size-change="(a) => console.log(a)"
        @change="(a) => console.log('change,', a)"
        @remote-query="(a) => console.log(a)"
        @cell-click="(a) => {}"
        @drag-end="ty"
        @hide-column="(col) => console.log(col)"
        @highlight-clear="(a) => console.log(a.id)"
        @advanced-filter-clear="(a) => console.log('advanced-filter-clear', a)"
        @advanced-filter-confirm="(a) => console.log('advanced-filter-confirm', a)"
        :advanced-filter-config="{
          filterAll: false,
          exclude: [],
          remote: ['id'],
          ignoreCase: true,
          filterColumns:[
            {
              title: 'Age',
              field: 'age',
              dataType: 'number',
              options: [
                {
                  label: '22',
                  value: 22
                },
                {
                label: '23',
                value: 23
              },
              {
                label: '24',
                value: 24
              },
              {
                label: '25',
                value: 25
              }
              ]
            },
            {
              title: 'Sex',
              field: 'sex',
              dataType: 'string',
              options: [
                {
                  label: '男',
                  value: 'Man'
                },
                {
                  label: '女',
                  value: 'Women'
                }
              ]
            },
            {
                title: 'num',
                field: 'num',
                dataType: 'number',
                options: [
                  {label: '已发布', value: 0},
                  {label: '未发布', value: 1}
                ]
              }
          ]
        }"
        align="center"
      >
        <template #age-edit="{ row }">
          <k-input v-model="row.age"></k-input>
        </template>
        <template #address>
          <k-button-container>
            <k-button type="success" main @click="() => console.log('删除')">删除</k-button>
            <k-button type="danger" main @click="() => console.log('更新')">更新</k-button>
            <k-button type="warning" main @click="() => console.log('编辑')">编辑</k-button>
            <k-button type="info" main @click="() => console.log('回退')">回退</k-button>
            <k-button type="primary" main @click="() => console.log('选择')">选择</k-button>
          </k-button-container>
        </template>
      </k-tree-table> -->
    </div>
    <!-- <KButton @click="() => isChange = !isChange">{{ isChange? '关闭' : '打开' }}</KButton> -->
    <k-button main @click="changeTrd">reduce table data</k-button>
    <!-- <k-button secondary @click="sdfs">1111</k-button> -->
    <k-button @click="getData">Load Data</k-button>
    <k-button @click="cache">cache</k-button>
    <hr>
    <!-- <vxe-table
      :data="tableData1"
      :row-config="{keyField: 'id'}"
      :tree-config="{transform: true, parentField: 'parentId'}"
      :checkbox-config="{checkRowKeys: [], showHeader: true, reserve: true}"
    >
      <vxe-column v-for="item in column1" v-bind="item"></vxe-column>
    </vxe-table> -->
    <hr>
    <p>Tree_Transfer Component</p>
    <k-tree-transfer
      :data="treeTransferData"
      :default-data="[10000, 24577]"
      :titles="['可选菜单', '已选菜单']"
      use-tree
      label="name"
      :icon="(row) => {
        if (row.name === 'Test4') {
          return 'IconAdd';
        }
        return 'IconSystemTypeWindowsColor'
      }"
      expand-icon="IconFolderOpen"
      expand-icon-color="#f60"
      collapse-icon-color="red"
      icon-color="green"
      collapse-icon="IconFolderClose"
      drag
      @sort="(a) => console.log(a)"
      @change="(a) => console.log(1)"
  >
  </k-tree-transfer>
  </div>
</template>

<script setup lang="tsx">
import { reactive, ref, shallowRef, provide, watch, computed, nextTick, onMounted } from 'vue';
import { Edit, Star, Delete, Eleme } from '@element-plus/icons-vue';
import { IconAdd } from 'ksw-vue-icon';
import { KRadio, KColorPicker, KMenuView, KRadioGroup, KMessage, KTag, KFilter, KButton, KTree, KTreeTable, KTable, KInput } from '@ksware/ksw-ux';

function handleVisible(visible: boolean) {
  console.log(visible);
}
const viewOptions = [
  {
    title: 'Option1',
    index: 'option1',
    icon: 'IconAdd',
    disabled: false,
    children: [
      {
        title: 'Option1-1',
        index: 'option1-1',
        children: [
          {
            title: 'Option1-1-1',
            index: 'option1-1-1',
            disabled: false,
            icon: 'IconFilter'
          },
          {
            title: 'Option1-1-2',
            index: 'option1-1-2',
            disabled: false,
            icon: 'IconRanking'
          },
          {
            title: 'Option1-1-3',
            index: 'option1-1-3',
            disabled: false,
            icon: 'IconOrganization'
          },
        ],
        disabled: false
      },
      {
        title: 'Option1-2',
        index: 'option1-2',
        disabled: false
      },
      {
        title: 'Option1-3',
        index: 'option1-3',
        disabled: false
      },
    ]
  },
  {
    title: 'Option2',
    index: 'option2',
    disabled: false,
    icon: 'IconFlow'
  },
  {
    title: 'Option3',
    index: 'option3',
    disabled: false,
    icon: 'IconSystemTypeWindowsColor'
  }
  
]
const yuRef = ref();
const vi = ref(false);

const myTooltip = ref();
function showTooltip() {
  console.log(myTooltip.value)
  myTooltip.value.onOpen()
}
const JsonColumns = ref([
  {
    title: 'Caption',
    field: 'caption',
    treeNode: true
  }
])
const color = ref('#f60');
const ou = ref({
  total: 5
})
const visiblesd = ref(false);
function showAFilter() {
  visiblesd.value = true;
}
function kj() {
  return <k-button v-ksw_tooltip="12343" main onClick={() => console.log(111)}><span style={{ color: '#fff', FontSiz: '12px' }}>12343</span></k-button>
}
function wewqew() {
  column.value = column.value.slice(0, 2);
}
function ty({ data }) {
  console.log(data)
  tableData1.value = data;
}
const columnPro = [
  {
    title: 'Id',
    field: 'id',
    width: '50px',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    render: ({ row }) => {
      return <span style={{ color: 'green' }}>{ row.name}</span>
    }
  },
  {
    title: 'Role',
    field: 'role',
    dataType: 'string'
  },
  {
    title: 'Other1',
    field: 'other1',
    group: [
      {
        title: 'Other2',
        field: 'other2',
        group: [
          {
            title: 'Age',
            field: 'age',
            dataType: 'number',
            showIcon: true,
            __folder: true
          },
          {
            title: 'Sex',
            field: 'sex',
            dataType: 'string',
            render: ({ row }) => {
              return <span style={{ color: 'red' }}>{ row.sex}</span>
            }
          }
        ]
      },
      {
        title: 'Address',
        field: 'address',
        dataType: 'string'
      },
    ]
  }
]
const tableDatas = ref([
  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
  { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['1'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' }
])
const sexList1 = ref([
  { label: '', value: '' },
  { label: '男', value: '1' },
  { label: '女', value: '0' }
])
function sdf(a) {
  const row = a.row;
  if (row.id === 3) {
    return true
  }
  return false
}
const formatSex = (value) => {
  if (value === '1') {
    return '男'
  }
  if (value === '0') {
    return '女'
  }
  return ''
}
const formatMultiSex = (values) => {
  if (values) {
    return values.map(val => formatSex(val)).join(',')
  }
  return ''
}
const selectData = ref([]);
function sdfs() {
  const data = treeTableRef.value.tableInstance?.getTableData();
  console.log(data)
}
const myFilter = ref();
const checkRowKeys = ref([1,2,3])
function loadData() {
  treeTableRef.value.tableInstance.loadData(tableData.slice(0, 10));
}
const treeTransferData = ref([ 
  { id: 10000, pid: null, name: 'Test11111111111111111111111', nodeType: 0, disabled: true},
  { id: 10050, pid: null, name: 'Test2222222222222222222222222'},
  { id: 24300, pid: 10050, name: 'Test3'},
  { id: 20045, pid: 24300, name: 'Test4'},
  { id: 10053, pid: 24300, name: 'Test5'},
  { id: 24330, pid: 10053, name: 'Test6'},
  { id: 21011, pid: 10053, name: 'Test7'},
  { id: 22200, pid: 10053, name: 'Test8'},
  { id: 23666, pid: null, name: 'Test9'},
  { id: 23677, pid: 23666, name: 'Test10'},
  { id: 23671, pid: 23677, name: 'Test11'},
  { id: 23672, pid: 23677, name: 'Test12'},
  { id: 23688, pid: 23666, name: 'Test13'},
  { id: 23681, pid: 23688, name: 'Test14'},
  { id: 23682, pid: 23688, name: 'Test15'},
  { id: 24555, pid: null, name: 'Test16'},
  { id: 24566, pid: 24555, name: 'Test17'},
  { id: 24577, pid: 24555, name: 'Test18'}
])
const asds = ref([24577, 24566, 23682, 23681, 23672, 23671, 22200, 21011, 10000, 20045, 24330])
function changeDefaultData() {
  asds.value = [10000];
}
const myDropdown = ref()
// window.addEventListener('keydown', (event) => {
//   if (event.code === 'Enter') {
//     console.log(myForm.value.resetFields())
//   }
// })
const aw = ref('');
const currentIndex = ref(2);
function sw() {
  showTour.value = true;
}
const flag = ref(true)
const tableRef1 = ref();
async function getData() {
 const cols = treeTableRef.value.getColumns()
 console.log(cols)
}
function cache() {
  const data = treeTableRef.value.getHeaderControllerData();
  localStorage.setItem('headerData', JSON.stringify(data));
}
async function getDefaultTransferData() {
  return new Promise((resolve) => {
    const data = JSON.parse(localStorage.getItem('headerData') ?? '');
    resolve(data);
  })
}
async function asda() {
  await treeTableRef.value.clearCheckboxRow?.()
  // const row = {id: 1004, name: 'zhj', role: 'Develop', sex: 'Man', age: 24, address: 'ChenZhou'};
  // const row2 = {id: 1005, name: 'zyy', role: 'Develop', sex: 'Woman', age: 24, address: 'ChenZhou'};
  // await treeTableRef.value.insertAt(row);
}
const treeTableRef = ref();
const tableData = reactive([
  { id: 1, name: 'Test11111111111111111111111111111111111111111111111111111111111111111111', role: 'Develop', sex: 'Man', age: 28, address: 'test abc', icon: 'IconFolderOpen',
    iconStyle: {
      empty: false,
      color: '#f60',
      size: 20
    } },
  { id: 2, name: 'Test2', role: 'Test', sex: 'Women', age: '28', address: 'Guangzhou', icon: 'IconFolderOpen',
    iconStyle: {
      empty: false,
      color: '#f60',
      size: 16
    } },
  { id: 3, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', icon: 'IconFolderOpen',
    iconStyle: {
      empty: false,
      color: '#f60',
      size: 16
    } },
  { id: 4, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 5, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 6, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 7, name: 'Test99', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 8, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 9, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 11, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 12, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 13, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 14, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 15, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 16, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 17, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 18, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 19, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 20, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 21, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 22, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 23, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 24, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 25, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 26, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 27, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 28, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 29, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 30, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 31, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 32, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 33, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 34, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 35, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 36, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 37, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 38, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 39, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 40, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
  { id: 41, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 42, name: 'Test2', role: 'Test', sex: 'Women', age: 42, address: 'Guangzhou' },
  { id: 43, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 44, name: 'Test4', role: 'Designer', sex: 'Women', age: 18, address: 'Shanghai' },
  { id: 45, name: 'Test5', role: 'Develop', sex: 'Man', age: 39, address: 'test abc' },
  { id: 46, name: 'Test6', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 47, name: 'Test7', role: 'PM', sex: 'Man', age: 9, address: 'Shanghai' },
  { id: 48, name: 'Test8', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
]);
const rte = ref();
let trd = ref(tableData.slice(0, 50));
const newData = JSON.parse(JSON.stringify(trd.value));
newData[0].id = 'nb666';

async function changeTrd() {
  const aa = tableData1.value.find(item => item.id === 24300)
  const row = [
    { id: 'r903', name: 'ZHJ', role: 'Designer', sex: 'Man', age: 24, address: 'ChenZhou', parentId: undefined },
    { id: 'jk00', name: 'ZHJ', role: 'Designer', sex: 'Man', age: 24, address: 'ChenZhou', parentId: 10050 }
  ];
  treeTableRef.value.insert(row, aa);
  
}
for (let i = 0; i < 40000; i++) {
  const item = JSON.parse(JSON.stringify(tableData[i % 48]));
  item.id = i + 49;
  tableData.push(item)
}
const style = {
  color: 'green'
}
const column = ref([
  {
    title: 'Id',
    type: 'seq',
    width: '50',
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    sortable: true,
    cellRender: {},
    dataType: 'string',
  },
  {
    title: 'Role',
    field: 'role',
    showIcon: true,
    dataType: 'string',
    formatter: ({cellValue, row, column}) => {
      return `${cellValue}-${column.field}`;
    },
    align: 'center',
    showOverflow: true
  },
  {
    title: 'Sex',
    field: 'sex',
    dataType: 'string',
    formatter: ({cellValue, row, column}) => {
      return cellValue === 'Man' ? '男' : '女';
    },
    align: 'left'
  },
  {
    title: 'Age',
    field: 'age',
    dataType: 'number',
    showIcon: false,
    __folder: false,
    align: 'right',
    editRender: {},
    showOverflow: true
  },
  {
    title: 'Address',
    field: 'address',
    dataType: 'string',
  },
])
const isChange = ref(false);
const column1 = [
  {
    title: 'zhjjk',
    type: 'checkbox',
    width: '50px'
  },
  {
    title: 'Id',
    field: 'id',
    width: '100px',
    treeNode: true,
    showIcon: true,
    showColumnMenu: false,
    dataType: 'number'
  },
  {
    title: 'Name',
    field: 'name',
    editRender: { autofocus: '#my_input' },
    renderEdit() {
      return <input id='my_input'></input>
    },
    dataType: 'string'
  },
  {
    title: 'Type',
    field: 'type'
  },
  {
    title: 'Size',
    field: 'sizes'
  },
  {
    title: 'Date',
    field: 'date'
  }
]
let tableData1 = ref([
  { id: '1000011111111111111111111111111111111111111111111111111111111111111111', parentId: null, name: 'Test1', type: 'mp3', sizes: 1024, date: '2020-08-01', 
  icon: 'IconFolderOpen', iconStyle: {color: '#f60'}},
  { id: 10050, hasChild: true, parentId: null, name: 'Test2', type: 'mp4', sizes: null, date: '2021-04-01', __folder: true, iconStyle: {color: '#f60'}},
  { id: 24300, parentId: 10050, hasChild: false, name: 'Test3', type: 'avi', sizes: 1024, date: '2020-03-01', __folder: true, iconStyle: {color: '#f60'} },
  { id: 20045, parentId: 24300, name: 'Test4', type: 'html', sizes: 600, date: '2021-04-01' },
  { id: 10053, parentId: 24300, name: 'Test5', type: 'avi', sizes: null, date: '2021-04-01' },
  { id: 24330, parentId: 10053, name: 'Test6', type: 'txt', sizes: 25, date: '2021-10-01' },
  { id: 21011, parentId: 10053, name: 'Test7', type: 'pdf', sizes: 512, date: '2020-01-01' },
  { id: 22200, parentId: 10053, name: 'Test8', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23666, parentId: null, name: 'Test9', type: 'xlsx', sizes: 2048, date: '2020-11-01' },
  { id: 23677, parentId: 23666, name: 'Test10', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23671, parentId: 23677, name: 'Test11', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23672, parentId: 23677, name: 'Test12', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23688, parentId: 23666, name: 'Test13', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23681, parentId: 23688, name: 'Test14', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 23682, parentId: 23688, name: 'Test15', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 24555, parentId: null, name: 'Test16', type: 'avi', sizes: 224, date: '2020-10-01' },
  { id: 24566, parentId: 24555, name: 'Test17', type: 'js', sizes: 1024, date: '2021-06-01' },
  { id: 24577, parentId: 24555, name: 'Test18', type: 'js', sizes: 1024, date: '2021-06-01' }
])
tableData1.value = [];
for (let i = 0; i< 2000; i++) {
  const parentId = i % 6;
  const row = {
    id: i,
    parentId: i <= 5 ? null : parentId,
    name: `Test${i}`,
    type: 'mp3',
    sizes: 1024,
    date: '2020-08-01'
  }
  tableData1.value.push(row)
}
rte.value = tableData1.value.map(item => item.id);
const showTour = ref(false);
const steps = [
  {
    element: '#step1',
    popover: {
      title: 'step1',
      description: 'This is step1',
    }
  },
  {
    element: '#step2',
    popover: {
      title: 'step2',
      description: 'This is step2'
    }
  },
  {
    element: '#step3',
    popover: {
      title: 'step3',
      description: 'This is step3'
    }
  }
]
const kTRef = ref();
function sdsd() {
  console.log(kTRef.value?.getCheckedNodes())
}
const getKey = (prefix: string, id: number) => {
  return `${prefix}-${id}`
}
const createData = (
  maxDeep: number,
  maxChildren: number,
  minNodesNumber: number,
  deep = 1,
  key = 'node'
) => {
  let id = 0
  return Array.from({ length: minNodesNumber })
    .fill(deep)
    .map(() => {
      const childrenNumber =
        deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
      const nodeKey = getKey(key, ++id)
      return {
        id: nodeKey,
        label: nodeKey,
        children: childrenNumber
          ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
          : undefined,
      }
    })
}

const props = {
  value: 'id',
  label: 'label',
  children: 'children',
}
const treeData = createData(4, 30, 40);

const calendarDate = ref(new Date());
const scheduleContent = [
  { date: '2024/11-27', content: ['上班'] },
  { date: '2024-11-20', content: ['聚餐', '上班', '午休', '追剧', '喂猫', '打游戏', '学习', '洗漱', '就寝']},
  { date: '2024-11-11', content: ['双十一'] }
]
const timelineData = ref([
  {
    timestamp: '2024/05/20',
    content: '11111',
    hollow: true
  },
  {
    timestamp: '2024/05/21',
    content: '22222',
    color: '#2882FF'
  },
  {
    timestamp: '2024/05/22',
    content: '33333',
    color: 'purple',
    hollow: true
  },
  {
    timestamp: '2024/05/23',
    content: '44444',
    color: 'red',
    hollow: false
  },
  {
    timestamp: '2024/05/24',
    content: '55555',
    color: 'green',
    hollow: true
  }
]);
const viewData = reactive([
  {
    label: '全部',
    value: 'all',
    count: 10000,
    color: ''
  },
  {
    label: '活跃',
    value: 'active',
    count: 7750,
    color: '#2882FF'
  },
  {
    label: '空闲',
    value: 'free',
    count: 1274,
    color: '#69B4FF'
  },
  {
    label: '离线',
    value: 'outline',
    count: 679,
    color: '#6B7280'
  },
  {
    label: '停用',
    value: 'destory',
    count: 297,
    color: '#EF4444'
  },
  {
    label: '产品一部',
    value: 'production1',
    count: 524,
    custom: true,
    color: ''
  },
  {
    label: '产品二部',
    value: 'production2',
    count: 472,
    custom: true,
    color: ''
  },
  {
    label: '产品三部',
    value: 'production3',
    count: 356,
    custom: true,
    color: ''
  }

])
const customColor = ref('#f60')
const badgeCount = ref(10);
const active = ref(0);
const activeCollapse = ref('');
function collapseChange(e:any) {
  console.log(e,'------', activeCollapse.value);
}
const stepStatus = shallowRef([
  {
    title: 'step1',
    description: 'this is step1',
    status: '',
    icon: 'IconAdd'
  },
  {
    title: 'step2',
    description: 'this is step2',
    status: '',
  },
  {
    title: 'step3',
    description: 'this is step3',
    status: '',
    icon: Star,
    text: '1.'
  },
  {
    title: 'step4',
    description: 'this is step4',
    status: ''
  },
  {
    title: 'step5',
    description: 'this is step5',
    status: ''
  },
]);
function nextStep(max) {
  if (active.value > max -1) {
    active.value = 0;
    return;
  }
  // if (active.value >= 2) {
  //   stepStatus.value[active.value].status = 'error';
  // }
  if (active.value === 2) {
    stepStatus.value[active.value].text = '';
  }
  active.value++;
}
const myForm = ref();
const myNameItem = ref(null);
const formData = ref({
  name: '',
  sex: '',
  age: '',
  desc: ''
})
function sds(form) {
  console.log(form.size);
  console.log(form.validateMessage);
  console.log(form.validateState);
}
async function submit(form) {
  const res = await form.validate((valid:any) => {
    if (valid) {
      console.log(formData.value)
    } else {
      console.log('submit error');
    }
  })
  console.log(res)
}
const rules = ref<any>({
  name: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'blur',
    }
  ],
  sex: [
    {
      required: true,
      message: '请输入性别',
      trigger: 'blur',
    }
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'blur',
    }
  ],
  desc: [
    {
      required: true,
      message: '请输入简述',
      trigger: 'blur',
    }
  ],
});
const myDrawer = ref<any>(null);
const tableRef = ref(null);
const k = ref(false)
let i = 0;
const isShowTable = ref(true);
async function testTable() {
  const tableInstance = tableRef.value?.tableInstance;
  if (i === 0) {
    await tableInstance.openFilter('sex');
    i++
  } else if (i === 1) {
    await tableInstance.openFilter('age');
    i++;
  } else if (i === 2) {
    await tableInstance.closeFilter('sex');
    i++;
  } else {
    await tableInstance.closeFilter('age');
    i = 0;
  }
}
const sexOptions = ref([
  {
    label: '男',
    value: 'Man'
  },
  {
    label: '女',
    value: 'Women'
  }
]);
const ageOptions = [
  {
    label: '大于10',
    value: 10
  },
  {
    label: '大于20',
    value: 20
  },
  {
    label: '大于30',
    value: 30
  },
  {
    label: '大于40',
    value: 40
  },
];

const filterData = ref([]);
const visible = ref(false);
const visible1 = ref(false);
function closeDrawer() {
  if (!visible1.value) {
    visible1.value = true;
    return
  }
  myDrawer.value.handleClose();
}
function a(done) {
  console.log('弹窗即将关闭');
  done()
}
function filterAge({value, row}) {
  return row.age >= value;
}
const type = ref('warning');
function ssss() {
  visible.value = true;
  type.value = 'success';
  KMessage.success({
    message: 'success'
  });
  KMessage.error({
    message: 'error'
  });
  KMessage.warning({
    message: 'warning'
  });
  const info = KMessage.info({
    message: 'info'
  });
}
const data = reactive([
  {
    field: 'name',
    title: 'name',
    dataType: 'string'
  },
  {
    field: 'age',
    title: 'age',
    dataType: 'number',
    options: [
      {
        label: '22',
        value: 22
      },
      {
        label: '32',
        value: 32
      }
    ]
  },
  {
    field: 'sex',
    title: 'sex',
    dataType: 'string'
  },
  {
    field: 'date',
    title: 'date',
    dataType: 'date'
  },
]);
const ass = [
  {
    label: '添加',
    handler: () => {
      console.log('添加')
    }
  },
  {
    label: '删除',
    handler: () => {
      console.log('删除')
    }
  },
  {
    label: '更新',
    disabled: true,
    handler: () => {
      console.log('更新')
    }
  },
  {
    label: '使能',
    handler: () => {
      console.log('使能')
    }
  },
  {
    label: '检测',
    handler: () => {
      console.log('检测')
    }
  },
  {
    label: '禁用',
    handler: () => {
      console.log('禁用')
    }
  },
  {
    label: '返回',
    handler: () => {
      console.log('返回')
    }
  },
  {
    label: '解禁',
    disabled: true,
    handler: () => {
      console.log('解禁')
    }
  },
  {
    label: '回显',
    handler: () => {
      console.log('回显')
    }
  },
]
const isLoading = ref(false);
const isSwitch = ref(true);
const content = ref('');
const count = ref(0);
const myInputNumber = ref<any>(null);
const myInput = ref<any>(null);
const radioValue = ref(2);
const checkboxValue = ref(['option1', 'option2', 'option3', 'option4']);
const selectValue = ref('');
const date = ref('');
const transferData = ref([
  {label: 'sourceData1', key1: 1},
  {label: 'sourceData2', key1: 2}
]);
const originData = ref([
  {label: 'sourceData1', key1: 1},
  {label: 'sourceData2', key1: 3},
  {label: 'sourceData3', key1: 2},
  {label: 'sourceData4', key1: 4},
  {label: 'sourceData5', key1: 5}
]);

const options = ref([
  {
    label: 'option1',
    value: 1
  },
  {
    label: 'option2',
    value: 2
  },
  {
    label: 'option3',
    value: 3
  },
  {
    label: 'option4',
    value: 4
  },
  {
    label: 'option5',
    value: 5
  },
]);
const cascaderValue = ref([]);
const fileList = ref([
]);
const cascaderOptions = [
  {
    label: 'first',
    value: 'first',
    children: [
      {
        label: 'one',
        value: 'one'
      },
      {
        label: 'two',
        value: 'two'
      },
      {
        label: 'three',
        value: 'three'
      },
      {
        label: 'four',
        value: 'four'
      },
      {
        label: 'five',
        value: 'five'
      }
    ]
  },
  {
    label: 'second',
    value: 'second',
    children: [
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      },
      {
        label: '3',
        value: '3'
      },
      {
        label: '4',
        value: '4'
      },
      {
        label: '5',
        value: '5'
      },
    ]
  }
];
let id = 0;
const propsConfig = {
  multiple: true,
  label: 'label',
  value: 'value',
  children: 'children',
  lazy: false,
  lazyLoad(node:any, resolve:any) {
    const { level } = node;
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map(() => ({
        value: ++id,
        label: `Option - ${id}`,
        leaf: level >= 3,
      }))
      resolve(nodes);
    }, 1000);
  }
}

const fn = () => {
  isLoading.value = !isLoading.value;
  activeName.value = 'tab20';
  content.value = 'zhj nb 666';
  myInputNumber.value.focus();
  isSwitch.value = true;
  customColor.value = 'purple'
}

const fr = (value:any) => {
  console.log(value);
}

const removeTab = (name:string) => {
  console.log(name);
}

function checkChange() {
  // console.log(arr, moveData);
}
function dataChange() {
  // console.log(arr, d, moveData);
}

const timelineRef = ref(null);
const timelineItemRef = ref(null);
const transferRef =  ref(null);
const caption = ref(null);
const treeSelectRef =  ref(null);
const tagRef = ref(null);
function testExpose() {
  visible.value = true;
}

let activeName = ref('tab2');
const tabClick = () => {};
const radioChange = () => {}
function selectChange() {}
const uploadRef = ref(null);
</script>
<style scoped>
.warpper {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: wheat;
}
.k-tree-transfer {
  width: 100%
}
.comp-list {
  margin-top: 10px;
}
.test :deep() .el-input-group__append {
  color: #FFF;
  border-radius: 5px;
  background-color: rgb(14, 47, 233);
}
.k-upload {
  width: 300px;
}
.upload_inner {
  display: flex;
}
</style>
<style>
.sa {
  background-color: skyblue;
}
.sa li {
  color: crimson !important;
}
.sa li.is-hovering {
  background-color: chartreuse;
}
.as {
  border: 1px red solid !important;
}
.main1-btn {
  margin-left: 20px;
}
.ere {
  display: flex;
  width: 100%;
}
.k-tabs {
  height: 300px;
}
.vf1 {
  flex: 1;
}
.circle {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: green;
}
</style>
