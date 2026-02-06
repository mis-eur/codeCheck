<template>
  <div class="encoding-container">
    <!-- 1、头部：显示 ***项目名称 -->
    <header class="encoding-header">
      <div class="project-name">水电工程项目划分编码检查</div>
    </header>

    <!-- 2、中部分为左侧、右侧 -->
    <div class="encoding-content">
      <!-- 3、中部左侧：有一个底部信息显示栏 -->
      <aside class="content-left">
        <div class="left-main">
          <div class="left-header">
            <span class="title">检查列表</span>
            <el-button type="primary" link :disabled="!selectedRow" @click="handleExpand">展开详情</el-button>
          </div>
          <div class="table-wrapper">
            <el-table
              :data="tableData"
              border
              stripe
              highlight-current-row
              height="100%"
              @current-change="handleCurrentChange"
              class="custom-table"
            >
              <el-table-column type="index" label="序号" width="60" align="center" />
              <el-table-column prop="unitProject" label="单位工程" min-width="120" show-overflow-tooltip />
              <el-table-column prop="bimCode" label="BIM模型编码"  show-overflow-tooltip />
              <el-table-column prop="status" label="检查结果" width="100" align="center">
                <template #default="{ row }">
                  <span :class="['status-text', row.statusType]">
                    {{ row.status }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="left-footer">
          本次自动化检查通过率为89%，您可以通过修改问题项提高数据质量。
        </div>
      </aside>

      <!-- 右侧展开铺满 -->
      <main class="content-right">
        <!-- 基础内容层 -->
        <div class="base-content">
          <p></p>
        </div>

        <!-- 悬浮详情层 -->
        <div v-if="showDetail && selectedRow" class="floating-detail">
          <div class="detail-header">
            <el-button type="primary" link @click="handleCollapse">折叠详情</el-button>
          </div>

          <div class="detail-content">
            <el-table :data="detailTableData" border class="custom-table detail-table">
              <el-table-column type="index" label="序号" width="55" align="center" />
              <el-table-column prop="uniqueId" label="唯一ID" width="100" align="center">
                <template #default="{ row }">
                  <div class="unique-id-cell">{{ row.uniqueId }}</div>
                </template>
              </el-table-column>
              <el-table-column label="工程项目码"  align="center">
                <template #default="{ row }">
                  <el-select v-if="isEditing" v-model="row.projectCode" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in allCodes"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                    />
                  </el-select>
                  <span v-else>{{ row.projectCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="工程类别码"  align="center">
                <template #default="{ row }">
                  <el-select v-if="isEditing" v-model="row.categoryCode" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in allCodes"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                    />
                  </el-select>
                  <span v-else>{{ row.categoryCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位工程码"  align="center">
                <template #default="{ row }">
                  <el-select v-if="isEditing" v-model="row.unitCode" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in allCodes"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                    />
                  </el-select>
                  <span v-else>{{ row.unitCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="分部工程码" align="center">
                <template #default="{ row }">
                  <el-select v-if="isEditing" v-model="row.subCode" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in allCodes"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                    />
                  </el-select>
                  <span v-else :class="['status-text', selectedRow?.statusType]">{{ row.subCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单元/分项工程码" align="center" width="130">
                <template #default="{ row }">
                  <el-select v-if="isEditing" v-model="row.itemCode" size="small" placeholder="请选择">
                    <el-option
                      v-for="item in allCodes"
                      :key="item.code"
                      :label="item.code"
                      :value="item.code"
                    />
                  </el-select>
                  <span v-else>{{ row.itemCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="编码确认" width="120" align="center">
                <template #default>
                  <div class="action-buttons">
                    <template v-if="!isEditing">
                      <el-button type="danger" link @click="handleEdit">修改</el-button>
                      <el-button type="primary" link @click="handleDirectConfirm">确认</el-button>
                    </template>
                    <template v-else>
                      <el-button type="primary" link @click="handleConfirm">确认保存</el-button>
                      <el-button link @click="isEditing = false">取消</el-button>
                    </template>
                  </div>
                </template>
              </el-table-column>
            </el-table>

            <div class="rule-description">
              <div class="rule-title">质检规则描述：</div>
              <div class="rule-text">
                依据《湖北秭归抽水蓄能电站工程项目划分及编码手册》中关于项目划分体系、编码规则及附表进行检查：<br />
                1、湖北秭归抽水蓄能电站工程项目类型码为02，顺序号为001；<br />
                2、工程类别码和单位工程码应符合附表1《工程类别码和单位工程划分表》；<br />
                3、分部工程码应符合附表2《分部工程分解表》或附表3《分部工程类别码》；<br />
                4、单元工程码应符合附表4《单元工程类别编码表》；<br />
                5、分项工程码依据葛洲坝提供的《大坝工程下水库大坝单元划分》进行检查。
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import codeSelectData from './codeSelect.json'

/**
 * 编码检查页面组件
 * @description 实现自定义布局：头部(项目名)、左侧(含底部信息栏)、右侧(铺满)
 */

/**
 * 下拉框数据源处理
 * 统一使用 domainEntities.list
 */
const allCodes = codeSelectData.domainEntities.list

interface TableRow {
  unitProject: string
  bimCode: string
  status: string
  statusType: 'success' | 'danger' | 'warning' | 'info'
}

interface DetailRow {
  uniqueId: string
  projectCode: string
  categoryCode: string
  unitCode: string
  subCode: string
  itemCode: string
}

const selectedRow = ref<TableRow | null>(null)
const showDetail = ref(false)
const isEditing = ref(false)
const detailTableData = ref<DetailRow[]>([])

const tableData = ref<TableRow[]>([
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-01010001', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-01010002', status: '未通过', statusType: 'danger' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14010001', status: '未通过', statusType: 'danger' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-10010001', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14010002', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14010003', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14010004', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011001', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011002', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011003', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011004', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011005', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011006', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011007', status: '通过', statusType: 'success' },
  { unitProject: '上库工程山水库', bimCode: '02001-0202-01-01001-14011008', status: '通过', statusType: 'success' },
  { unitProject: '下库工程下水库', bimCode: '02001-0202-01-01001-14011009', status: '通过', statusType: 'success' },
  { unitProject: '电站饮水系统上段工程', bimCode: '02001-0202-01-01XXX-1401XXXX', status: '待补充', statusType: 'warning' },
  { unitProject: '电站饮水系统下段工程', bimCode: '02001-0202-01-01XXX-1401XXXX', status: '待补充', statusType: 'warning' },
  { unitProject: '其他', bimCode: '02001-0202-01-01XXX-1401XXXX', status: '人工确认', statusType: 'info' },
])

/**
 * 处理表格行选择变化
 * @param row 当前选中的行
 */
const handleCurrentChange = (row: TableRow | null) => {
  selectedRow.value = row
  if (showDetail.value) {
    updateDetailData()
  }
}

/**
 * 更新详情数据（根据 bimCode 拆分）
 */
const updateDetailData = () => {
  if (!selectedRow.value) return
  const codes = selectedRow.value.bimCode.split('-')
  detailTableData.value = [{
    uniqueId: '0KPkFYJW\nHDXgSwKp\nhtjbO9',
    projectCode: codes[0] || '',
    categoryCode: codes[1] || '',
    unitCode: codes[2] || '',
    subCode: codes[3] || '',
    itemCode: codes[4] || ''
  }]
  isEditing.value = false
}

/**
 * 处理展开详情按钮点击
 */
const handleExpand = () => {
  if (selectedRow.value) {
    showDetail.value = true
    updateDetailData()
  }
}

/**
 * 处理折叠详情按钮点击
 */
const handleCollapse = () => {
  showDetail.value = false
}

/**
 * 处理修改按钮点击
 */
const handleEdit = () => {
  isEditing.value = true
}

/**
 * 处理确认按钮点击（直接确认）
 */
const handleDirectConfirm = () => {
  if (selectedRow.value) {
    selectedRow.value.status = '人工确认'
    selectedRow.value.statusType = 'info'
    ElMessage.success('已直接变更为人工确认')
  }
}

/**
 * 处理确认保存按钮点击（修改后确认）
 */
const handleConfirm = () => {
  if (selectedRow.value) {
    // 更新左侧列表状态为人工确认
    selectedRow.value.status = '人工确认'
    selectedRow.value.statusType = 'info'
    
    // 更新 bimCode 数据
    const d = detailTableData.value[0]
    if (d) {
      selectedRow.value.bimCode = `${d.projectCode}-${d.categoryCode}-${d.unitCode}-${d.subCode}-${d.itemCode}`
    }
    
    ElMessage.success('保存成功，检查结果已变更为人工确认')
    isEditing.value = false
  }
}
</script>

<style scoped lang="scss">
.encoding-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #f5f7fa;
  box-sizing: border-box;

  .encoding-header {
    height: 50px;
    background-color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border-radius: 4px;

    .project-name {
      font-size: 15px;
      font-weight: bold;
      color: #303133;
    }
  }

  .encoding-content {
    flex: 1;
    display: flex;
    gap: 10px;
    overflow: hidden;

    :deep(.status-text) {
      font-weight: 500;
      &.success { color: #00b578; }
      &.danger { color: #f56c6c; }
      &.warning { color: #e6a23c; }
      &.info { color: #409eff; }
    }

    :deep(.custom-table) {
      --el-table-header-bg-color: #f5f7fa;
      --el-table-header-text-color: #303133;
      --el-table-row-hover-bg-color: #f5f7fa;

      .el-table__header {
        th {
          background-color: var(--el-table-header-bg-color);
          color: var(--el-table-header-text-color);
          font-weight: bold;
          border-bottom: 1px solid #dcdfe6;
        }
      }

      // 条纹样式美化
      &.el-table--striped .el-table__row--striped td {
        background-color: #fafafa;
      }

      // 选中行样式
      &.el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #f5f7fa !important;
      }

      .current-row > td {
        background-color: #ecf5ff !important;
        color: var(--el-color-primary);
      }
    }

    .content-left {
      width: 500px;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 4px;
      overflow: hidden;

      .left-main {
        flex: 1;
        padding: 15px;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .left-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;

          .title {
            font-size: 14px;
            font-weight: bold;
            color: #303133;
          }
        }

        .table-wrapper {
          flex: 1;
          overflow: hidden;
        }
      }

      .left-footer {
        height: 40px;
        background-color: #f0f2f5;
        border-top: 1px solid #dcdfe6;
        display: flex;
        align-items: center;
        padding: 0 15px;
        font-size: 12px;
        color: #606266;
      }
    }

    .content-right {
      flex: 1;
      background-color: #fff;
      border-radius: 4px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;

      .base-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #909399;
      }

      .floating-detail {
        position: absolute;
        top: 0;
        left: 0;
        width: 800px;
        height: 50%;
        background-color: #fff;
        z-index: 10;
        border-right: 1px solid #dcdfe6;
        border-bottom: 1px solid #dcdfe6;
        box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.08);
        padding: 15px;
        display: flex;
        flex-direction: column;
        overflow: hidden;

        .detail-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 10px;
        }

        .detail-content {
          flex: 1;
          overflow: auto;

          .detail-table {
            width: 100%;
            margin-bottom: 20px;

            .unique-id-cell {
              white-space: pre-wrap;
              font-size: 12px;
              line-height: 1.2;
              color: #606266;
            }

            .action-buttons {
              display: flex;
              justify-content: center;
            }
          }

          .rule-description {
            background-color: #e8f5e9;
            padding: 15px;
            border-radius: 4px;
            color: #303133;
            font-size: 14px;
            line-height: 1.8;

            .rule-title {
              font-weight: bold;
              margin-bottom: 8px;
            }

            .rule-text {
              color: #606266;
            }
          }
        }
      }
    }
  }
}
</style>
